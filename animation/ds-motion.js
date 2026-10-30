/* ============================================================
   DESIGN SYSTEM — shared motion runtime

   One implementation of the things every scene needs: asset loading, easing,
   the metal compositor, and the deterministic driver. Scenes are short files
   that describe a timeline; none of them re-implement this.

   Loaded as a CLASSIC script, not an ES module, on purpose. Chrome blocks
   module imports over file://, and every scene has to run straight off disk
   with no server. Do not "modernise" this to `import`.

   THE COMPOSITOR IS THE POINT. Logos are never redrawn. metal() takes a real
   logo PNG and a real texture PNG and keeps the texture only where the logo's
   own alpha says so, which is why the artwork on screen is the approved file
   lit from behind by the approved texture.

   HOTELINK NOTE: Hotelink has no texture set, so its sting does not call
   metal(). It is kept for a texture the brand may add later. Do not feed it
   a generated gradient in the meantime.
   ============================================================ */

window.DS = (function () {

  // ---- easing ------------------------------------------------------------
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg   = (t, t0, t1) => clamp((t - t0) / (t1 - t0));
  const lerp  = (a, b, p) => a + (b - a) * p;

  const ease = {
    linear:   p => p,
    outExpo:  p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
    inOutCubic: p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    outBack:  p => { const c = 1.70158, u = p - 1;
                     return 1 + (c + 1) * u * u * u + c * u * u; },
    outQuint: p => 1 - Math.pow(1 - p, 5),
  };

  // ---- tokens ------------------------------------------------------------
  // Mirrors styles.css. Canvas cannot read CSS custom properties directly.
  const color = {
    paper: '#F6F2EB', white: '#FFFDF9', ink: '#2A2520', accent: '#2F5C4A',
    accentStrong: '#1F3A30', gold: '#9A7B45', rail: '#1E2723',
  };

  const font = {
    display:  'Literata, Georgia, serif',
    ui:       '"IBM Plex Sans", system-ui, sans-serif',
    wordmark: 'Georgia, "Times New Roman", serif',
  };

  // ---- assets ------------------------------------------------------------
  function load(map) {
    const keys = Object.keys(map);
    return Promise.all(keys.map(k => new Promise((res, rej) => {
      const i = new Image();
      i.onload  = () => res(i);
      i.onerror = () => rej(new Error('missing asset: ' + map[k]));
      i.src = map[k];
    }))).then(imgs => {
      const out = {};
      keys.forEach((k, n) => out[k] = imgs[n]);
      return out;
    });
  }

  // ---- the metal compositor ---------------------------------------------
  const scratch = document.createElement('canvas');
  const sctx    = scratch.getContext('2d');

  /* Draw a window of `texture`, then keep only the pixels where `logo` is
     opaque. `pan` (0..1) slides the sampled window, which is what makes light
     travel through the letterforms. The window keeps the target's aspect so
     the brushed grain is never stretched, and takes about half the texture's
     width so there is real distance to travel. */
  function metal(logo, texture, w, h, pan) {
    scratch.width = w; scratch.height = h;
    sctx.clearRect(0, 0, w, h);

    const tw = texture.naturalWidth, th = texture.naturalHeight;
    const aspect = w / h;
    let sw = tw * 0.5;
    let sh = sw / aspect;
    if (sh > th) { sh = th; sw = sh * aspect; }
    const sx = (tw - sw) * clamp(pan);
    const sy = (th - sh) / 2;

    sctx.drawImage(texture, sx, sy, sw, sh, 0, 0, w, h);
    sctx.globalCompositeOperation = 'destination-in';
    sctx.drawImage(logo, 0, 0, w, h);
    sctx.globalCompositeOperation = 'source-over';
    return scratch;
  }

  // ---- text --------------------------------------------------------------
  /* Canvas text using the real self-hosted faces. Call after fontsReady(). */
  function setFont(ctx, { family = 'display', weight = 700, size = 100,
                          tracking = null } = {}) {
    ctx.font = `${weight} ${size}px ${font[family]}`;
    if ('letterSpacing' in ctx) {
      ctx.letterSpacing = tracking != null ? tracking
                        : (family === 'wordmark' ? '-0.0467em' : '0em');
    }
  }

  function fontsReady() {
    if (!document.fonts) return Promise.resolve();
    // Nudge both faces so they are actually downloaded, not just declared.
    return Promise.all([
      document.fonts.load('500 100px Literata'),
      document.fonts.load('400 100px "IBM Plex Sans"'),
      document.fonts.load('600 100px "IBM Plex Sans"'),
    ]).then(() => document.fonts.ready);
  }

  // ---- the deterministic driver ------------------------------------------
  /* Every scene is a pure function of t, with no accumulated state, so any
     frame renders in isolation. ?t=1.25 renders that instant and holds, which
     is what kit/export-frames.sh walks. Same input, same pixels, every time. */
  function run({ canvas, duration, assets, render, poster = null }) {
    const q    = new URLSearchParams(location.search);
    const ctx  = canvas.getContext('2d');
    const bgKey = q.get('bg');

    const backgrounds = {
      none: null, rail: color.rail, paper: color.paper,
      // Matte pair. Not brand colours: the exporter renders each frame over
      // both and solves for true alpha. See kit/unmatte.py.
      black: '#000000', white: '#FFFFFF',
    };
    // No ?bg at all means the scene's normal opaque ground, NOT "fill nothing".
    // Getting that wrong shows up as a scene rendering over the page's black
    // body colour, which looks deliberate and is not.
    const key = bgKey === null ? 'rail' : bgKey;
    const bg  = key in backgrounds ? backgrounds[key] : backgrounds.rail;

    const api = { ctx, canvas, W: canvas.width, H: canvas.height, bg, q,
                  color, font, metal, setFont, seg, lerp, ease, clamp };

    return fontsReady()
      .then(() => load(assets))
      .then(img => {
        api.img = img;

        const frame = t => {
          ctx.clearRect(0, 0, api.W, api.H);
          if (bg !== null && bg !== undefined) {
            ctx.fillStyle = bg; ctx.fillRect(0, 0, api.W, api.H);
          }
          render(t, api);
        };

        if (q.has('t')) {
          frame(parseFloat(q.get('t')) || 0);
          document.body.dataset.ready = 'true';   // the exporter waits for this
          return;
        }

        // Poster frame first, so a still capture (a Design System card
        // thumbnail, a headless screenshot) does not catch t=0 and render an
        // empty box.
        frame(poster != null ? poster : duration * 0.6);

        let start = null;
        const loop = now => {
          if (start === null) start = now;
          frame(((now - start) / 1000) % duration);
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
        document.addEventListener('click', () => { start = null; });
      })
      .catch(err => {
        // Never silently render an empty frame. A missing asset is a bug to
        // report, not to paper over.
        document.title = 'ASSET ERROR: ' + err.message;
        ctx.fillStyle = '#B00020'; ctx.fillRect(0, 0, api.W, api.H);
        ctx.fillStyle = '#fff'; ctx.font = '40px monospace';
        ctx.fillText(err.message, 80, 120);
      });
  }

  return { clamp, seg, lerp, ease, color, font, load, metal, setFont,
           fontsReady, run };
})();
