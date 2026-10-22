
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
