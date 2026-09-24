/**
 * RANOVA - Cinematic Storyboard Loader & Side Task HUD Controller
 * Exact 100% Storyboard Replica for ranova.vercel.app | Made by Rana Abdullah
 */

(function () {
  'use strict';

  const STORYBOARD_TIMINGS = {
    slash: 150,     // 0.15s: Signature diagonal slash draws from top-left to bottom-right
    left: 400,      // 0.40s: Left structure slides up into place
    right: 650,     // 0.65s: Right formation unfolds outward from center
    lockSweep: 900, // 0.90s: Full monogram locks together; specular light sweep glides across
    wordmark: 1150, // 1.15s: Wordmark R Λ N O V Λ rises and fades in
    signature: 1400,// 1.40s: "MADE BY RANA ABDULLAH" appears
    holdReady: 1800 // 1.80s: Complete loader state, stable & ready
  };

  class RanovaLoaderEngine {
    constructor() {
      this.screenEl = null;
      this.sideEl = null;
      this.sideLabelEl = null;
      this.sideSubEl = null;
      this.lightSweepEl = null;
      
      this.bootStartTime = Date.now();
      this.isScreenDismissed = false;
      this.isPageDataReady = false;
      this.sweepInterval = null;
      this.sideHideTimeout = null;
      this.sideActiveCounter = 0;

      this.init();
    }

    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.mount());
      } else {
        this.mount();
      }
    }

    mount() {
      this.ensureDOMElements();
      this.runStoryboardSequence();
    }

    ensureDOMElements() {
      // 1. Ensure Fullscreen Screen Loader
      if (!document.getElementById('ranova-screen-loader')) {
        const screenDiv = document.createElement('div');
        screenDiv.id = 'ranova-screen-loader';
        screenDiv.innerHTML = `
          <div class="rnv-central-glow"></div>
          <div class="rnv-pinpoint-star"></div>
          <div class="rnv-stage">
            <div class="rnv-logo-box">
              <div class="rnv-light-sweep" id="rnvLightSweep"></div>
              <svg class="rnv-logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="rnvChromeFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="30%" stop-color="#e2e8f0"/>
                    <stop offset="55%" stop-color="#94a3b8"/>
                    <stop offset="78%" stop-color="#cbd5e1"/>
                    <stop offset="100%" stop-color="#64748b"/>
                  </linearGradient>
                  <linearGradient id="rnvSlashFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="25%" stop-color="#e0f2fe"/>
                    <stop offset="60%" stop-color="#38bdf8"/>
                    <stop offset="100%" stop-color="#0284c7"/>
                  </linearGradient>
                  <radialGradient id="rnvRimGlow" cx="80%" cy="20%" r="50%">
                    <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/>
                  </radialGradient>
                </defs>

                <!-- Part 1: Signature Diagonal Slash (Top-Left to Bottom-Right) -->
                <path class="rnv-slash"
                      d="M 16 19 L 81 81 L 63 81 L 16 34 Z"
                      fill="url(#rnvSlashFill)"
                      stroke="#ffffff"
                      stroke-width="0.8"/>

                <!-- Part 2: Left Structure (Vertical Stem sliding up) -->
                <path class="rnv-left"
                      d="M 16 40 L 29 53 L 29 83 L 16 70 Z"
                      fill="url(#rnvChromeFill)"
                      stroke="rgba(255,255,255,0.75)"
                      stroke-width="0.8"/>

                <!-- Part 3: Right Formation (Curved Bow & Kick) -->
                <path class="rnv-right"
                      d="M 21 17 L 76 17 L 83 26 L 83 48 L 78 56 L 83 63 L 83 75 L 59 51 L 64 51 C 70 51 72 45 72 39 C 72 33 70 29 64 29 L 32 29 Z"
                      fill="url(#rnvChromeFill)"
                      stroke="rgba(255,255,255,0.75)"
                      stroke-width="0.8"/>

                <!-- Rim flare on top right curve -->
                <circle cx="80" cy="22" r="14" fill="url(#rnvRimGlow)" pointer-events="none"/>
              </svg>
            </div>

            <div class="rnv-text-box">
              <div class="rnv-wordmark">
                <span class="rnv-wordmark-letter">R</span>
                <svg viewBox="0 0 16 20" class="rnv-chevron-a">
                  <path d="M 1.5 19 L 8 2.5 L 14.5 19"/>
                </svg>
                <span class="rnv-wordmark-letter">N</span>
                <span class="rnv-wordmark-letter">O</span>
                <span class="rnv-wordmark-letter">V</span>
                <svg viewBox="0 0 16 20" class="rnv-chevron-a">
                  <path d="M 1.5 19 L 8 2.5 L 14.5 19"/>
                </svg>
              </div>
              <span class="rnv-signature">MADE BY RANA ABDULLAH</span>
            </div>
          </div>

          <!-- Rocky Terrain Silhouettes & Water Horizon -->
          <div class="rnv-horizon">
            <div class="rnv-rock-left"></div>
            <div class="rnv-rock-right"></div>
            <div class="rnv-water-reflect"></div>
          </div>
        `;
        document.body.prepend(screenDiv);
      }

      this.screenEl = document.getElementById('ranova-screen-loader');
      this.lightSweepEl = document.getElementById('rnvLightSweep');

      // 2. Ensure Side Task Loading HUD Pill
      if (!document.getElementById('ranova-side-loader')) {
        const sideDiv = document.createElement('div');
        sideDiv.id = 'ranova-side-loader';
        sideDiv.setAttribute('role', 'status');
        sideDiv.setAttribute('aria-live', 'polite');
        sideDiv.innerHTML = `
          <div class="rnv-side-icon-wrap">
            <div class="rnv-side-ring"></div>
            <svg class="rnv-side-logo-svg" viewBox="0 0 100 100" fill="none">
              <path d="M 16 19 L 81 81 L 63 81 L 16 34 Z" fill="#00e5ff"/>
              <path d="M 16 40 L 29 53 L 29 83 L 16 70 Z" fill="#ffffff"/>
              <path d="M 21 17 L 76 17 L 83 26 L 83 48 L 78 56 L 83 63 L 83 75 L 59 51 L 64 51 C 70 51 72 45 72 39 C 72 33 70 29 64 29 L 32 29 Z" fill="#cbd5e1"/>
            </svg>
          </div>
          <div class="rnv-side-content">
            <span class="rnv-side-label" id="rnvSideLabel">Loading...</span>
            <span class="rnv-side-sub" id="rnvSideSub">RANOVA ENGINE</span>
          </div>
          <div class="rnv-side-pip"></div>
        `;
        document.body.appendChild(sideDiv);
      }

      this.sideEl = document.getElementById('ranova-side-loader');
      this.sideLabelEl = document.getElementById('rnvSideLabel');
      this.sideSubEl = document.getElementById('rnvSideSub');
    }

    runStoryboardSequence() {
      if (!this.screenEl) return;

      // 01: Initial State is active by default (faint glow + black screen + reflective water)

      // 02: 0.15s - Diagonal Draw
      setTimeout(() => {
        if (!this.isScreenDismissed && this.screenEl) {
          this.screenEl.classList.add('rnv-step-slash');
        }
      }, STORYBOARD_TIMINGS.slash);

      // 03: 0.40s - Left Structure
      setTimeout(() => {
        if (!this.isScreenDismissed && this.screenEl) {
          this.screenEl.classList.add('rnv-step-left');
        }
      }, STORYBOARD_TIMINGS.left);

      // 04: 0.65s - Right Formation
      setTimeout(() => {
        if (!this.isScreenDismissed && this.screenEl) {
          this.screenEl.classList.add('rnv-step-right');
        }
      }, STORYBOARD_TIMINGS.right);

      // 05: 0.90s - Logo Complete & Specular Sweep
      setTimeout(() => {
        if (!this.isScreenDismissed) {
          this.triggerLightSweep();
        }
      }, STORYBOARD_TIMINGS.lockSweep);

      // 06: 1.15s - Wordmark Appears
      setTimeout(() => {
        if (!this.isScreenDismissed && this.screenEl) {
          this.screenEl.classList.add('rnv-step-wordmark');
        }
      }, STORYBOARD_TIMINGS.wordmark);

      // 07: 1.40s - Signature Text
      setTimeout(() => {
        if (!this.isScreenDismissed && this.screenEl) {
          this.screenEl.classList.add('rnv-step-signature');
        }
      }, STORYBOARD_TIMINGS.signature);

      // 08: 1.80s - Final Hold & Ready
      setTimeout(() => {
        // Start recurring light sweep loop if page data is still pending
        this.startRecurringLoop();

        // If data was already signaled ready, dismiss gracefully
        if (this.isPageDataReady) {
          this.dismissScreen();
        }
      }, STORYBOARD_TIMINGS.holdReady);
    }

    triggerLightSweep() {
      if (!this.lightSweepEl) return;
      this.lightSweepEl.classList.remove('rnv-sweeping');
      // Force DOM reflow
      void this.lightSweepEl.offsetWidth;
      this.lightSweepEl.classList.add('rnv-sweeping');
    }

    startRecurringLoop() {
      if (this.sweepInterval || this.isScreenDismissed) return;
      // "LOOP: BUILD -> HOLD -> LIGHT SWEEP -> REPEAT"
      this.sweepInterval = setInterval(() => {
        if (!this.isScreenDismissed) {
          this.triggerLightSweep();
        } else {
          clearInterval(this.sweepInterval);
          this.sweepInterval = null;
        }
      }, 2800);
    }

    /**
     * Call when initial page assets are loaded. Ensures minimum 1.80s storyboard playback.
     */
    markReady() {
      this.isPageDataReady = true;
      const elapsed = Date.now() - this.bootStartTime;
      const minDuration = STORYBOARD_TIMINGS.holdReady;

      if (elapsed >= minDuration) {
        this.dismissScreen();
      } else {
        const remaining = minDuration - elapsed;
        setTimeout(() => this.dismissScreen(), remaining);
      }
    }

    dismissScreen() {
      if (this.isScreenDismissed || !this.screenEl) return;
      this.isScreenDismissed = true;

      if (this.sweepInterval) {
        clearInterval(this.sweepInterval);
        this.sweepInterval = null;
      }

      this.screenEl.classList.add('ranova-hidden');
      setTimeout(() => {
        if (this.screenEl && this.screenEl.parentNode) {
          this.screenEl.style.display = 'none';
        }
      }, 700);
    }

    /**
     * Show the floating HUD pill on the side for tasks that take time.
     * @param {string} labelText - e.g. "Loading 3D Gallery..."
     * @param {string} [subText] - optional secondary tag, e.g. "PROCESSING"
     */
    showSide(labelText, subText = 'PROCESSING') {
      this.sideActiveCounter++;
      if (this.sideHideTimeout) {
        clearTimeout(this.sideHideTimeout);
        this.sideHideTimeout = null;
      }

      if (!this.sideEl) this.ensureDOMElements();
      if (this.sideLabelEl) this.sideLabelEl.textContent = labelText || 'Loading...';
      if (this.sideSubEl) this.sideSubEl.textContent = subText || 'RANOVA ENGINE';

      this.sideEl.classList.add('rnv-side-active');
    }

    /**
     * Hide the floating side indicator.
     * @param {number} [delayMs=150] - grace period delay
     */
    hideSide(delayMs = 150) {
      this.sideActiveCounter = Math.max(0, this.sideActiveCounter - 1);
      if (this.sideActiveCounter > 0) return;

      if (this.sideHideTimeout) clearTimeout(this.sideHideTimeout);
      this.sideHideTimeout = setTimeout(() => {
        if (this.sideEl && this.sideActiveCounter === 0) {
          this.sideEl.classList.remove('rnv-side-active');
        }
      }, delayMs);
    }

    /**
     * Wrap any asynchronous task or Promise with the side loading sign.
     * @param {string} labelText
     * @param {Promise|Function} task
     * @param {string} [subText]
     * @returns {Promise}
     */
    async task(labelText, task, subText = 'PROCESSING') {
      this.showSide(labelText, subText);
      try {
        if (typeof task === 'function') {
          return await task();
        }
        return await task;
      } finally {
        this.hideSide(200);
      }
    }
  }

  // Expose global instance
  window.RanovaLoader = new RanovaLoaderEngine();

})();
