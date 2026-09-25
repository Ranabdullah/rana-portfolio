(() => {
'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let screen,video,side,count=0,ready=false,finished=false,dismissed=false,timer;
function dismiss(){if(dismissed)return;dismissed=true;clearTimeout(timer);if(video){video.pause();video.removeAttribute('src');video.load();}screen?.remove();try{sessionStorage.setItem('ranova-intro-seen','1');}catch(e){}}
function finish(){finished=true;if(ready)dismiss();}
function mount(){
side=document.createElement('div');side.id='ranova-side-loader';side.setAttribute('role','status');side.innerHTML='<img src="assets/logo-white.png" alt="" width="32" height="32"><span>Loading…</span>';document.body.append(side);
let seen=false;try{seen=!!sessionStorage.getItem('ranova-intro-seen');}catch(e){}
if(seen||reduced||navigator.connection?.saveData){finished=true;return;}
screen=document.createElement('div');screen.id='ranova-screen-loader';screen.innerHTML='<img class="rnv-fallback" src="assets/wordmark-white.png" alt="Ranova"><video muted playsinline preload="auto" aria-hidden="true"></video><div class="rnv-intro-footer"><span role="status">Opening the portfolio…</span><button type="button">Skip intro →</button></div>';
document.body.append(screen);screen.querySelector('button').onclick=dismiss;video=screen.querySelector('video');video.muted=true;video.src='assets/intro.mp4';video.addEventListener('playing',()=>screen?.classList.add('playing'));video.addEventListener('ended',finish);video.addEventListener('error',finish);video.play().catch(finish);timer=setTimeout(dismiss,6500);if(finished&&ready)dismiss();
}
window.RanovaLoader={markReady(){ready=true;if(finished)dismiss();},dismissScreen:dismiss,showSide(label){count++;if(side){side.querySelector('span').textContent=label;side.classList.add('rnv-side-active');}},hideSide(){count=Math.max(0,count-1);if(!count)side?.classList.remove('rnv-side-active');},async task(label,task){this.showSide(label);try{return await(typeof task==='function'?task():task);}finally{this.hideSide();}}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
