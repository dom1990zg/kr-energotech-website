const heroTitles={
  en:'POWERING<br><span class="gold">PROGRESS</span><br>WITH PRECISION',
  hr:'POKRE&Cacute;EMO<br><span class="gold">NAPREDAK</span><br>S PRECIZNOS&Cacute;U',
  de:'ENERGIE<br><span class="gold">MIT</span><br>PRAZISION',
  ar:'<span class="gold">\u0646\u064f\u062d\u0631\u0651\u0643</span><br>\u0627\u0644\u062a\u0642\u062f\u0645<br>\u0628\u062f\u0642\u0629'
};
let lang='en';
function setLang(l){
  lang=l;
  const t=T[l];
  const rtl=l==='ar';
  document.documentElement.lang=l;
  document.documentElement.dir=rtl?'rtl':'ltr';
  document.body.dir=rtl?'rtl':'ltr';
  document.getElementById('heroTitle').innerHTML=heroTitles[l];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(t[k]!==undefined){
      if(el.tagName==='INPUT'||el.tagName==='TEXTAREA') el.placeholder=t[k];
      else if(el.tagName==='OPTION') el.textContent=t[k];
      else if(el.tagName==='BUTTON') el.textContent=t[k];
      else el.innerHTML=t[k];
    }
  });
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.textContent===l.toUpperCase()));
}
window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>50));
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}
const obs=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('visible'),i*80);});
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
var FURL='https'+'://formspree'+'.io/f/mzdjweov';
async function handleSubmit(e){
  e.preventDefault();
  const form=e.target;
  const btn=document.getElementById('submitBtn');
  const t=T[lang];
  const succ=document.getElementById('formSuccess');
  const err=document.getElementById('formError');
  succ.style.display='none';
  err.style.display='none';
  btn.textContent='...';
  btn.disabled=true;
  try{
    const res=await fetch(FURL,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    if(res.ok){
      form.style.display='none';
      succ.textContent=t.form_success;
      succ.className='form-status success';
      succ.style.display='block';
    } else {
      btn.disabled=false;
      btn.textContent=t.form_submit;
      err.textContent=t.form_error;
      err.className='form-status error';
      err.style.display='block';
    }
  } catch(ex){
    btn.disabled=false;
    btn.textContent=t.form_submit;
    err.textContent=t.form_error;
    err.className='form-status error';
    err.style.display='block';
  }
}
(function(){
  var e='info'+'@'+'kr-exp.com';
  var el=document.getElementById('contactEmail');
  var lnk=document.getElementById('contactEmailLink');
  var fel=document.getElementById('footerEmail');
  if(el) el.textContent=e;
  if(lnk) lnk.href='mailto:'+e;
  if(fel){fel.href='mailto:'+e; fel.textContent=e;}
})();
