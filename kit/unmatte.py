#!/usr/bin/env python3
"""
Recover true alpha from two opaque renders of the same frame.

Chrome's --screenshot flag does not preserve alpha on macOS, in either headless
mode, with or without --default-background-color=00000000 (verified). So instead
of shipping a transparent export that silently isn't, the exporter renders each
frame twice, once over black and once over white, and solves for alpha exactly.

For a normal source-over composite of foreground F at coverage a:

    Ck = F*a + 0*(1-a) = F*a          (over black)
    Cw = F*a + 1*(1-a) = F*a + 1 - a  (over white)

Subtracting:

    Cw - Ck = 1 - a     ->     a = 1 - (Cw - Ck)
    F = Ck / a                          (where a > 0)

This is exact, not an approximation, and needs no extra dependency.

Usage:
    kit/unmatte.py over_black.png over_white.png out_rgba.png
"""
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("This needs Pillow.  pip3 install --user Pillow")


def unmatte(black_path, white_path, out_path):
    ck = Image.open(black_path).convert("RGB")
    cw = Image.open(white_path).convert("RGB")
    if ck.size != cw.size:
        sys.exit(f"size mismatch: {ck.size} vs {cw.size}")

    kpx, wpx = ck.load(), cw.load()
    out = Image.new("RGBA", ck.size)
    opx = out.load()
    w, h = ck.size

    for y in range(h):
        for x in range(w):
            kr, kg, kb = kpx[x, y]
            wr, wg, wb = wpx[x, y]

            # One alpha per pixel. Averaging the three channel estimates is
            # steadier than trusting any single one against image noise.
            a = 255 - ((wr - kr) + (wg - kg) + (wb - kb)) / 3.0
            a = 0.0 if a < 0 else (255.0 if a > 255 else a)

            if a < 1.0:
                opx[x, y] = (0, 0, 0, 0)
            else:
                s = 255.0 / a
                opx[x, y] = (
                    min(255, int(kr * s + 0.5)),
                    min(255, int(kg * s + 0.5)),
                    min(255, int(kb * s + 0.5)),
                    int(a + 0.5),
                )

    out.save(out_path)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    unmatte(sys.argv[1], sys.argv[2], sys.argv[3])
