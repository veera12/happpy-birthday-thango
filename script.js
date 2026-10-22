
const heartBox=document.getElementById('hearts');
for(let i=0;i<28;i++){const s=document.createElement('span');s.className='heart';s.textContent=['♥','♡','❤'][i%3];s.style.left=Math.random()*100+'%';s.style.bottom=(-10-Math.random()*40)+'px';s.style.animationDelay=(Math.random()*8)+'s';s.style.animationDuration=(7+Math.random()*8)+'s';s.style.fontSize=(8+Math.random()*12)+'px';heartBox.appendChild(s)}
function unlock(){
 const n=(document.getElementById('nick').value.trim().toLowerCase()) || "chlo", p=(document.getElementById('pass').value.trim()) || "26082019";
 const names=['thango','chlo','ammu','thangamaiyilu','alagi','keethis','keerthi','peacock'];
 if(names.includes(n)&&p==='26082019'){document.getElementById('login').classList.add('login-out');document.body.classList.remove('lock');document.getElementById('main').classList.add('ready');setTimeout(()=>document.getElementById('login').remove(),1200)}
 else document.getElementById('error').textContent='Hmm… namma secret correct-aa enter pannu ❤️';
}
document.getElementById('pass').addEventListener('keydown',e=>{if(e.key==='Enter')unlock()});
addEventListener('scroll',()=>{let h=document.documentElement.scrollHeight-innerHeight;document.getElementById('progress').style.width=(scrollY/h*100)+'%'});
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
document.querySelectorAll('.visual.visual-blur').forEach(box => {
 box.addEventListener('click', () => box.classList.toggle('revealed'));
 if (!box.querySelector('.visual-bg')) {
  const mainImg = box.querySelector('img');
  if (mainImg) {
   const bg = document.createElement('img');
   bg.className = 'visual-bg';
   bg.src = mainImg.src;
   bg.alt = '';
   bg.setAttribute('aria-hidden', 'true');
   box.insertBefore(bg, mainImg);
   mainImg.classList.add('visual-fit');
  }
 }
});
document.querySelectorAll('.photo.photo-blur').forEach(box => {
 if (!box.querySelector('.photo-bg')) {
  const mainImg = box.querySelector('img:not(.photo-bg)');
  if (mainImg) {
   const bg = document.createElement('img');
   bg.className = 'photo-bg';
   bg.src = mainImg.src;
   bg.alt = '';
   bg.setAttribute('aria-hidden', 'true');
   box.insertBefore(bg, mainImg);
   mainImg.classList.add('photo-fit');
  }
 }
});
document.querySelectorAll('.photo, .visual').forEach(box => {
 box.querySelectorAll('img').forEach(img => {
  const onError = () => { img.style.display = 'none'; };
  if (img.complete) {
   if (img.naturalWidth === 0 && img.src && !img.src.endsWith('/')) onError();
  } else {
   img.addEventListener('error', onError);
  }
 });
});
const bVideo = document.getElementById('birthdayVideo');
const soundBtn = document.getElementById('soundToggle');
const fsBtn = document.getElementById('fsToggle');
const screenBox = document.querySelector('.cinema-screen');
const videoGate = document.getElementById('videoGate');
let isGateOpened = false;

function spawnHeartBurst(x, y) {
 if (!screenBox) return;
 const hearts = ['💖', '❤️', '💕', '💗', '✨', '💍'];
 for (let i = 0; i < 24; i++) {
  const p = document.createElement('span');
  p.className = 'gate-burst-heart';
  p.textContent = hearts[i % hearts.length];
  p.style.left = (x || (screenBox.clientWidth / 2)) + 'px';
  p.style.top = (y || (screenBox.clientHeight / 2)) + 'px';
  const angle = (Math.PI * 2 * i) / 24 + (Math.random() * 0.4 - 0.2);
  const dist = 70 + Math.random() * 170;
  const tx = Math.cos(angle) * dist + 'px';
  const ty = (Math.sin(angle) * dist - 30) + 'px';
  const rot = (Math.random() * 80 - 40) + 'deg';
  const scale = (0.8 + Math.random() * 0.8).toFixed(2);
  p.style.setProperty('--tx', tx);
  p.style.setProperty('--ty', ty);
  p.style.setProperty('--rot', rot);
  p.style.setProperty('--scale', scale);
  screenBox.appendChild(p);
  setTimeout(() => p.remove(), 1400);
 }
}

function openGateAndPlay(e) {
 if (isGateOpened) return;
 isGateOpened = true;

 let clickX = screenBox ? screenBox.clientWidth / 2 : 200;
 let clickY = screenBox ? screenBox.clientHeight / 2 : 200;
 if (e && e.clientX && screenBox) {
  const rect = screenBox.getBoundingClientRect();
  clickX = e.clientX - rect.left;
  clickY = e.clientY - rect.top;
 }

 if (videoGate) {
  videoGate.classList.add('opened');
  spawnHeartBurst(clickX, clickY);
  setTimeout(() => {
   videoGate.style.display = 'none';
  }, 1300);
 }

 if (bVideo) {
  bVideo.play().catch(() => {});
  if (screenBox) screenBox.classList.remove('paused');
 }
}

if (videoGate) {
 videoGate.addEventListener('click', openGateAndPlay);
}

if (bVideo) {
 const vObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
   if (!isGateOpened) {
    bVideo.pause();
    return;
   }
   if (entry.isIntersecting) {
    bVideo.play().catch(() => {});
    if (screenBox) screenBox.classList.remove('paused');
   } else {
    bVideo.pause();
    if (screenBox) screenBox.classList.add('paused');
   }
  });
 }, { threshold: 0.35 });
 vObs.observe(bVideo);

 if (screenBox) {
  screenBox.addEventListener('click', (e) => {
   if (e.target.closest('.cinema-btn') || e.target.closest('#videoGate')) return;
   if (!isGateOpened) return;
   if (bVideo.paused) {
    bVideo.play();
    screenBox.classList.remove('paused');
   } else {
    bVideo.pause();
    screenBox.classList.add('paused');
   }
  });
 }
 if (soundBtn) {
  soundBtn.addEventListener('click', (e) => {
   e.stopPropagation();
   bVideo.muted = !bVideo.muted;
   if (bVideo.muted) {
    soundBtn.innerHTML = '<span class="icon">🔇</span> <span class="label">Sound</span>';
    soundBtn.style.borderColor = '';
    soundBtn.style.background = '';
   } else {
    soundBtn.innerHTML = '<span class="icon">🔊</span> <span class="label">Mute</span>';
    soundBtn.style.borderColor = 'var(--pink)';
    soundBtn.style.background = 'rgba(240, 154, 170, 0.25)';
   }
  });
 }
 if (fsBtn) {
  fsBtn.addEventListener('click', (e) => {
   e.stopPropagation();
   if (!document.fullscreenElement) {
    if (bVideo.requestFullscreen) bVideo.requestFullscreen();
    else if (bVideo.webkitRequestFullscreen) bVideo.webkitRequestFullscreen();
   } else {
    if (document.exitFullscreen) document.exitFullscreen();
   }
  });
 }
}

const marqueeEl = document.querySelector('.marquee');
if (marqueeEl) {
 let marqueePaused = false;
 marqueeEl.addEventListener('click', () => {
  marqueePaused = !marqueePaused;
  marqueeEl.querySelectorAll('.marquee-group').forEach(grp => {
   grp.style.animationPlayState = marqueePaused ? 'paused' : 'running';
  });
 });
}

// --- Full-Screen Birthday Sparkling Celebration Engine ---
const bdayOverlay = document.getElementById('bdayCelebration');
const bdayCanvas = document.getElementById('bdayCanvas');
const bdayBurstBtn = document.getElementById('bdayBurstBtn');
const bdayDismissBtn = document.getElementById('bdayDismissBtn');
const bdayCornerClose = document.getElementById('bdayCornerClose');
const replayBdayBtn = document.getElementById('replayBdayBtn');

let bdayCtx = null;
let bdayAnimId = null;
let bdayRockets = [];
let bdaySparks = [];
let bdayGlitters = [];
let bdayWishes = [];
let isCelebrationRunning = false;
let hasAutoTriggeredBday = false;
let autoRocketTimer = null;

const bdayColors = [
 '#ffd700', '#ffccd5', '#f09aaa', '#ffffff', '#ffe699',
 '#ff4d79', '#e5c18c', '#ff8da1', '#fff2b2', '#ff2a6d'
];
const bdayWishEmojis = ['💖', '✨', '🎂', '👑', '🦚', '💕', '🎉', '🥳', '⭐', '❤️'];

function drawDiamondSparkle(ctx, x, y, size, color, alpha, rot = 0) {
 ctx.save();
 ctx.translate(x, y);
 if (rot) ctx.rotate(rot);
 ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

 // Outer vibrant glow
 ctx.fillStyle = color;
 ctx.shadowBlur = Math.max(6, size * 2.2);
 ctx.shadowColor = color;

 // Primary 4-pointed Star Spikes
 ctx.beginPath();
 ctx.moveTo(0, -size);
 ctx.quadraticCurveTo(0, 0, size, 0);
 ctx.quadraticCurveTo(0, 0, 0, size);
 ctx.quadraticCurveTo(0, 0, -size, 0);
 ctx.quadraticCurveTo(0, 0, 0, -size);
 ctx.closePath();
 ctx.fill();

 // Secondary 4-pointed Diagonal Rays
 ctx.rotate(Math.PI / 4);
 const s2 = size * 0.45;
 ctx.beginPath();
 ctx.moveTo(0, -s2);
 ctx.quadraticCurveTo(0, 0, s2, 0);
 ctx.quadraticCurveTo(0, 0, 0, s2);
 ctx.quadraticCurveTo(0, 0, -s2, 0);
 ctx.quadraticCurveTo(0, 0, 0, -s2);
 ctx.closePath();
 ctx.fill();

 // Bright solid white core
 ctx.fillStyle = '#ffffff';
 ctx.shadowBlur = 4;
 ctx.shadowColor = '#ffffff';
 ctx.beginPath();
 ctx.arc(0, 0, Math.max(1.2, size * 0.28), 0, Math.PI * 2);
 ctx.fill();

 ctx.restore();
}

function initBdayCanvas() {
 if (!bdayCanvas) return;
 bdayCtx = bdayCanvas.getContext('2d');
 resizeBdayCanvas();
 window.addEventListener('resize', resizeBdayCanvas);

 // Populate 90 full-screen ambient diamond sparkles
 bdayGlitters = [];
 for (let i = 0; i < 90; i++) {
  bdayGlitters.push({
   x: Math.random() * window.innerWidth,
   y: Math.random() * window.innerHeight,
   size: 4 + Math.random() * 8,
   speedY: 0.25 + Math.random() * 0.75,
   speedX: (Math.random() - 0.5) * 0.5,
   alpha: 0.3 + Math.random() * 0.7,
   rot: Math.random() * Math.PI,
   rotSpeed: (Math.random() - 0.5) * 0.04,
   pulse: Math.random() * Math.PI * 2,
   color: bdayColors[Math.floor(Math.random() * bdayColors.length)]
  });
 }
}

function resizeBdayCanvas() {
 if (!bdayCanvas) return;
 const dpr = Math.min(window.devicePixelRatio || 1, 2);
 bdayCanvas.width = window.innerWidth * dpr;
 bdayCanvas.height = window.innerHeight * dpr;
 bdayCanvas.style.width = window.innerWidth + 'px';
 bdayCanvas.style.height = window.innerHeight + 'px';
 if (bdayCtx) {
  bdayCtx.setTransform(1, 0, 0, 1, 0, 0);
  bdayCtx.scale(dpr, dpr);
 }
}

function spawnRocket(startX, targetX, targetY) {
 if (!bdayCanvas) return;
 const sx = startX || (Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1);
 const tx = targetX || (sx + (Math.random() * 140 - 70));
 const ty = targetY || (Math.random() * (window.innerHeight * 0.42) + window.innerHeight * 0.1);
 const angle = Math.atan2(ty - window.innerHeight, tx - sx);
 const speed = 13 + Math.random() * 4;

 bdayRockets.push({
  x: sx,
  y: window.innerHeight,
  vx: Math.cos(angle) * speed,
  vy: Math.sin(angle) * speed,
  targetY: ty,
  color: bdayColors[Math.floor(Math.random() * bdayColors.length)],
  trail: []
 });
}

function explodeRocket(x, y, baseColor) {
 const count = 75 + Math.floor(Math.random() * 35);
 for (let i = 0; i < count; i++) {
  const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.3 - 0.15);
  const speed = Math.random() * 6 + 1.5;
  bdaySparks.push({
   x: x,
   y: y,
   vx: Math.cos(angle) * speed,
   vy: Math.sin(angle) * speed,
   alpha: 1,
   decay: 0.011 + Math.random() * 0.013,
   gravity: 0.08,
   size: 3 + Math.random() * 4.5,
   rot: Math.random() * Math.PI,
   rotSpeed: (Math.random() - 0.5) * 0.1,
   isStar: Math.random() > 0.4,
   color: Math.random() > 0.25 ? baseColor : bdayColors[Math.floor(Math.random() * bdayColors.length)]
  });
 }

 if (Math.random() > 0.2) {
  bdayWishes.push({
   x: x + (Math.random() * 40 - 20),
   y: y,
   vy: -1.2 - Math.random() * 1.6,
   vx: (Math.random() - 0.5) * 0.8,
   alpha: 1,
   text: bdayWishEmojis[Math.floor(Math.random() * bdayWishEmojis.length)],
   size: 22 + Math.floor(Math.random() * 14)
  });
 }
}

function launchCelebrationBursts(amount = 4) {
 if (!bdayCanvas) return;
 for (let i = 0; i < amount; i++) {
  setTimeout(() => {
   const step = (window.innerWidth * 0.8) / (amount + 1);
   const sx = window.innerWidth * 0.1 + step * (i + 1) + (Math.random() * 40 - 20);
   spawnRocket(sx, sx + (Math.random() * 60 - 30), Math.random() * (window.innerHeight * 0.38) + window.innerHeight * 0.1);
  }, i * 260);
 }
}

function updateAndDrawBdayCanvas() {
 if (!bdayCtx || !bdayCanvas) return;

 const dpr = Math.min(window.devicePixelRatio || 1, 2);
 bdayCtx.save();
 bdayCtx.setTransform(1, 0, 0, 1, 0, 0);
 bdayCtx.clearRect(0, 0, bdayCanvas.width, bdayCanvas.height);
 bdayCtx.restore();

 // 1. Draw 90 Full-Screen Sparkling Stars
 for (let i = 0; i < bdayGlitters.length; i++) {
  const g = bdayGlitters[i];
  g.y += g.speedY;
  g.x += g.speedX;
  g.rot += g.rotSpeed;
  g.pulse += 0.05;
  const curAlpha = Math.max(0.25, Math.min(1, g.alpha + Math.sin(g.pulse) * 0.35));

  if (g.y > window.innerHeight + 15) {
   g.y = -15;
   g.x = Math.random() * window.innerWidth;
  }

  drawDiamondSparkle(bdayCtx, g.x, g.y, g.size, g.color, curAlpha, g.rot);
 }

 // 2. Rockets
 for (let i = bdayRockets.length - 1; i >= 0; i--) {
  const r = bdayRockets[i];
  r.trail.push({ x: r.x, y: r.y });
  if (r.trail.length > 7) r.trail.shift();

  r.x += r.vx;
  r.y += r.vy;
  r.vy += 0.04;

  bdayCtx.save();
  bdayCtx.strokeStyle = r.color;
  bdayCtx.lineWidth = 3;
  bdayCtx.shadowBlur = 14;
  bdayCtx.shadowColor = r.color;
  bdayCtx.beginPath();
  for (let t = 0; t < r.trail.length; t++) {
   const p = r.trail[t];
   if (t === 0) bdayCtx.moveTo(p.x, p.y);
   else bdayCtx.lineTo(p.x, p.y);
  }
  bdayCtx.stroke();
  bdayCtx.restore();

  drawDiamondSparkle(bdayCtx, r.x, r.y, 6, '#ffffff', 1, 0);

  if (r.y <= r.targetY || r.vy >= 0) {
   explodeRocket(r.x, r.y, r.color);
   bdayRockets.splice(i, 1);
  }
 }

 // 3. Sparks with Diamond Rays
 for (let i = bdaySparks.length - 1; i >= 0; i--) {
  const s = bdaySparks[i];
  s.x += s.vx;
  s.y += s.vy;
  s.vy += s.gravity;
  s.vx *= 0.985;
  s.rot += s.rotSpeed;
  s.alpha -= s.decay;

  if (s.alpha <= 0) {
   bdaySparks.splice(i, 1);
   continue;
  }

  if (s.isStar) {
   drawDiamondSparkle(bdayCtx, s.x, s.y, s.size, s.color, s.alpha, s.rot);
  } else {
   bdayCtx.save();
   bdayCtx.globalAlpha = s.alpha;
   bdayCtx.fillStyle = s.color;
   bdayCtx.shadowBlur = 10;
   bdayCtx.shadowColor = s.color;
   bdayCtx.beginPath();
   bdayCtx.arc(s.x, s.y, s.size * 0.65, 0, Math.PI * 2);
   bdayCtx.fill();
   bdayCtx.fillStyle = '#ffffff';
   bdayCtx.beginPath();
   bdayCtx.arc(s.x, s.y, s.size * 0.3, 0, Math.PI * 2);
   bdayCtx.fill();
   bdayCtx.restore();
  }
 }

 // 4. Floating Wish Emojis
 for (let i = bdayWishes.length - 1; i >= 0; i--) {
  const w = bdayWishes[i];
  w.x += w.vx;
  w.y += w.vy;
  w.alpha -= 0.008;

  if (w.alpha <= 0 || w.y < -40) {
   bdayWishes.splice(i, 1);
   continue;
  }

  bdayCtx.save();
  bdayCtx.globalAlpha = w.alpha;
  bdayCtx.font = `${w.size}px serif`;
  bdayCtx.shadowBlur = 14;
  bdayCtx.shadowColor = 'rgba(240, 154, 170, 0.9)';
  bdayCtx.fillText(w.text, w.x, w.y);
  bdayCtx.restore();
 }

 if (isCelebrationRunning || bdaySparks.length > 0 || bdayRockets.length > 0) {
  bdayAnimId = requestAnimationFrame(updateAndDrawBdayCanvas);
 }
}

function startCelebration() {
 if (!bdayOverlay) return;
 initBdayCanvas();
 bdayOverlay.classList.add('active');
 bdayOverlay.setAttribute('aria-hidden', 'false');
 isCelebrationRunning = true;

 if (!bdayAnimId) {
  bdayAnimId = requestAnimationFrame(updateAndDrawBdayCanvas);
 }

 launchCelebrationBursts(5);

 if (autoRocketTimer) clearInterval(autoRocketTimer);
 autoRocketTimer = setInterval(() => {
  if (isCelebrationRunning && Math.random() > 0.25) {
   spawnRocket();
  }
 }, 1200);
}

function closeCelebration() {
 if (!bdayOverlay) return;
 bdayOverlay.classList.remove('active');
 bdayOverlay.setAttribute('aria-hidden', 'true');
 if (autoRocketTimer) {
  clearInterval(autoRocketTimer);
  autoRocketTimer = null;
 }
 setTimeout(() => {
  isCelebrationRunning = false;
 }, 3000);
}

function triggerCelebrationOnce() {
 if (hasAutoTriggeredBday) return;
 hasAutoTriggeredBday = true;
 startCelebration();
}

// Tap anywhere on screen during celebration to burst sparks!
window.addEventListener('click', (e) => {
 if (!isCelebrationRunning) return;
 if (e.target.closest('.bday-banner') || e.target.closest('#replayBdayBtn')) return;
 explodeRocket(e.clientX, e.clientY, bdayColors[Math.floor(Math.random() * bdayColors.length)]);
});

if (bdayBurstBtn) {
 bdayBurstBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  launchCelebrationBursts(6);
 });
}
if (bdayDismissBtn) {
 bdayDismissBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  closeCelebration();
 });
}
if (bdayCornerClose) {
 bdayCornerClose.addEventListener('click', (e) => {
  e.stopPropagation();
  closeCelebration();
 });
}
if (replayBdayBtn) {
 replayBdayBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startCelebration();
 });
}

const footerSection = document.querySelector('footer');
if (footerSection) {
 const footerObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    triggerCelebrationOnce();
   }
  });
 }, { threshold: 0.1 });
 footerObs.observe(footerSection);
}

window.addEventListener('scroll', () => {
 const scrollPos = window.innerHeight + window.scrollY;
 const pageHeight = document.documentElement.scrollHeight;
 if (pageHeight - scrollPos < 140) {
  triggerCelebrationOnce();
 }
}, { passive: true });

window.addEventListener('touchend', () => {
 const scrollPos = window.innerHeight + window.scrollY;
 const pageHeight = document.documentElement.scrollHeight;
 if (pageHeight - scrollPos < 220) {
  triggerCelebrationOnce();
 }
}, { passive: true });
