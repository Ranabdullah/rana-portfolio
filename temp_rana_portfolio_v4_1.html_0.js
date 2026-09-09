
// ===================================================
// SMART IMAGE FILTER ENGINE
// Analyses brightness, saturation, and color temperature
// of each image pixel-by-pixel via Canvas, then applies
// a tailored CSS filter: contrast, saturate, brightness,
// sepia micro-wash — unique per photo.
// ===================================================
(function(){
  const _canvas = document.createElement('canvas');
  const _ctx = _canvas.getContext('2d');

  // Analyse a loaded <img> element, returns { brightness, saturation, warmth }
  // Each value 0–1. Uses 16×16 downsampled analysis for speed.
  function analyseImage(img){
    const W = 16, H = 16;
    _canvas.width = W; _canvas.height = H;
    try {
      _ctx.drawImage(img, 0, 0, W, H);
      const d = _ctx.getImageData(0, 0, W, H).data;
      let totalL = 0, totalS = 0, totalR = 0, totalG = 0, totalB = 0;
      const px = W * H;
      for(let i = 0; i < d.length; i += 4){
        const r = d[i]/255, g = d[i+1]/255, b = d[i+2]/255;
        const mx = Math.max(r,g,b), mn = Math.min(r,g,b), delta = mx - mn;
        const l = (mx + mn) / 2;
        const s = delta === 0 ? 0 : delta / (1 - Math.abs(2*l - 1));
        totalL += l; totalS += s;
        totalR += r; totalG += g; totalB += b;
      }
      return {
        brightness: totalL / px,           // 0 = black, 1 = white
        saturation: totalS / px,           // 0 = grey, 1 = vivid
        warmth: (totalR/px - totalB/px),   // positive = warm, negative = cool
        r: totalR/px, g: totalG/px, b: totalB/px
      };
    } catch(e){
      return null; // cross-origin or tainted canvas
    }
  }

  // Compute a tailored CSS filter string from analysis data
  function computeFilter(a){
    if(!a) return 'contrast(1.08) saturate(1.18) brightness(1.02)';

    const { brightness: L, saturation: S, warmth: W } = a;

    // --- Brightness correction ---
    // Very dark images: lift them up. Very bright: pull back slightly.
    let brightnessF = 1.0;
    if(L < 0.15) brightnessF = 1.18;
    else if(L < 0.28) brightnessF = 1.10;
    else if(L < 0.42) brightnessF = 1.05;
    else if(L > 0.78) brightnessF = 0.96;
    else if(L > 0.65) brightnessF = 0.99;
    else brightnessF = 1.02;

    // --- Contrast correction ---
    // Low contrast (flat/foggy/washed): boost contrast
    // Very high saturation + high brightness: gentle touch
    let contrastF = 1.08;
    if(L > 0.72 && S < 0.14) contrastF = 1.14; // faded bright → punch it
    else if(L < 0.2) contrastF = 1.05;           // very dark: don't over-crush
    else if(S > 0.55) contrastF = 1.06;           // already vivid: gentle

    // --- Saturation correction ---
    // Greyed/muted images: big saturation boost
    // Already vivid: just a nudge
    let saturateF = 1.18;
    if(S < 0.06) saturateF = 1.45;       // near-greyscale: bring colour life
    else if(S < 0.14) saturateF = 1.35;
    else if(S < 0.25) saturateF = 1.26;
    else if(S < 0.38) saturateF = 1.18;
    else if(S < 0.55) saturateF = 1.10;
    else saturateF = 1.05;               // already highly saturated

    // --- Warm/cool micro tone ---
    // Slightly warm images get a tiny sepia kiss (+richness)
    // Cool/blue images get a very slight hue-rotate to pop blues
    let sepiaF = 0;
    let hueF = 0;
    if(W > 0.12) sepiaF = 0.06;          // warm tones: micro golden kiss
    else if(W > 0.06) sepiaF = 0.03;
    else if(W < -0.1) hueF = -6;        // cool/blue: subtle hue rotation
    else if(W < -0.05) hueF = -3;

    // Build filter string
    let f = `contrast(${contrastF.toFixed(3)}) saturate(${saturateF.toFixed(3)}) brightness(${brightnessF.toFixed(3)})`;
    if(sepiaF > 0) f += ` sepia(${sepiaF.toFixed(2)})`;
    if(hueF !== 0) f += ` hue-rotate(${hueF}deg)`;

    return f;
  }

  // Apply smart filter to a single image element
  function applySmartFilter(img){
    if(!img.complete || !img.naturalWidth) return;
    img.classList.add('img-smart-filter');
    const a = analyseImage(img);
    img.style.filter = computeFilter(a);
  }

  // Process all images currently in the DOM + watch for new ones via MutationObserver
  function processAll(){
    document.querySelectorAll(
      '.g-card img, #showcaseImg, #lbImg, .sc-card-thumb, .lb-dock-thumb img'
    ).forEach(img => {
      if(img.complete && img.naturalWidth){
        applySmartFilter(img);
      } else {
        img.addEventListener('load', function(){ applySmartFilter(this); }, { once: true });
      }
    });
  }

  // MutationObserver — auto-handles dynamically injected images (gallery cards, dock strip, etc.)
  const _observer = new MutationObserver(function(mutations){
    for(const m of mutations){
      for(const node of m.addedNodes){
        if(node.nodeType !== 1) continue;
        const imgs = node.tagName === 'IMG' ? [node] : Array.from(node.querySelectorAll('img'));
        imgs.forEach(img => {
          if(img.complete && img.naturalWidth){
            applySmartFilter(img);
          } else {
            img.addEventListener('load', function(){ applySmartFilter(this); }, { once: true });
          }
        });
      }
    }
  });

  // Patch src setter so when JS sets img.src, we reapply filter after load
  const _origSrcDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    set(val){
      _origSrcDesc.set.call(this, val);
      if(val && (
        this.id === 'showcaseImg' || this.id === 'lbImg' ||
        this.classList.contains('sc-card-thumb') ||
        this.closest?.('.lb-dock-thumb')
      )){
        if(this.complete && this.naturalWidth){
          applySmartFilter(this);
        } else {
          this.addEventListener('load', function(){ applySmartFilter(this); }, { once: true });
        }
      }
    },
    get(){ return _origSrcDesc.get.call(this); }
  });

  // Start
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      processAll();
      _observer.observe(document.body, { childList: true, subtree: true });
    });
  } else {
    processAll();
    _observer.observe(document.body, { childList: true, subtree: true });
  }

  window._smartFilter = { analyse: analyseImage, compute: computeFilter, apply: applySmartFilter, refresh: processAll };
})();


// ===================================================
// MOBILE HAMBURGER NAV
// ===================================================
(function(){
  function initMobileNav(){
    const nav = document.querySelector('nav');
    if(!nav) return;
    const navLinks = nav.querySelector('.nav-links');
    if(!navLinks) return;

    // Don't re-init
    if(document.getElementById('mobileMenuBtn')) return;

    // Create hamburger button
    const btn = document.createElement('button');
    btn.id = 'mobileMenuBtn';
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    btn.style.display = 'none';

    // Create close button inside nav overlay
    const closeBtn = document.createElement('button');
    closeBtn.id = 'navMobileClose';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close menu');
    navLinks.appendChild(closeBtn);

    nav.appendChild(btn);

    function openMenu(){
      navLinks.classList.add('mobile-open');
      btn.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu(){
      navLinks.classList.remove('mobile-open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      if(navLinks.classList.contains('mobile-open')) closeMenu();
      else openMenu();
    });
    closeBtn.addEventListener('click', closeMenu);

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });

    // Check if mobile
    function checkMobile(){
      if(window.innerWidth <= 767){
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
        closeMenu();
      }
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();

