/* ===== GALLERY LIGHTBOX ===== */
var imgs=[
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/DJI_20250610152954_0005_D_shbojx.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/IMG_3606_cb_nnk5r7.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/DJI_20250610153738_0010_D_agyvpd.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/IMG_0316_saz9gw.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/IMG_0161_n0gqox.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/DJI_20250613115142_0111_D_iyxuho.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/DJI_20250612091010_0068_D_o8yodc.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/DJI_20250610171911_0034_D_poifgu.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/DJI_20250610153508_0008_D_u0atjc.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/IMG_3274_wdhqja.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/IMG_3606_fordwc.jpg',
  'https://res.cloudinary.com/dw0o1zypk/image/upload/w_1600,q_auto,f_auto/IMG_3283_hkhnsu.jpg'
];
var cur=0;

function lbOpen(i){
  cur=i;
  document.getElementById('lightboxImg').src=imgs[i];
  document.getElementById('lightbox').style.display='flex';
  document.body.style.overflow='hidden';
}
function lbClose(){
  document.getElementById('lightbox').style.display='none';
  document.body.style.overflow='';
}
function lbNav(d){
  cur=(cur+d+imgs.length)%imgs.length;
  document.getElementById('lightboxImg').src=imgs[cur];
}

/* click on gallery items */
document.addEventListener('click',function(e){
  var item=e.target.closest('.gallery-item');
  if(item&&item.dataset.idx!==undefined){lbOpen(parseInt(item.dataset.idx));}
  if(e.target.id==='lightbox'){lbClose();}
});

/* keyboard */
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){lbClose();}
  if(e.key==='ArrowLeft'){lbNav(-1);}
  if(e.key==='ArrowRight'){lbNav(1);}
});

/* expose to HTML onclick */
window.closeLightbox=lbClose;
window.changeLightbox=lbNav;
window.openLightbox=lbOpen;

/* ===== NAV SCROLL ===== */
window.addEventListener('scroll',function(){
  var n=document.getElementById('navbar');
  if(n)n.classList.toggle('scrolled',window.scrollY>50);
});

/* ===== MOBILE MENU ===== */
window.toggleMenu=function(){
  var m=document.getElementById('mobileMenu');
  if(m)m.classList.toggle('open');
};

/* ===== EMAIL INJECT ===== */
(function(){
  var e='info'+'@'+'kr-exp.com';
  var a=document.querySelectorAll('.eaddr');
  for(var i=0;i<a.length;i++)a[i].textContent=e;
  var b=document.querySelectorAll('.cemaillink');
  for(var i=0;i<b.length;i++)b[i].href='mailto:'+e;
  var c=document.querySelectorAll('.femail');
  for(var i=0;i<c.length;i++){c[i].href='mailto:'+e;c[i].textContent=e;}
})();

/* ===== CONTACT FORM ===== */
var _form=document.getElementById('contactForm');
if(_form){
  _form.addEventListener('submit',function(ev){
    ev.preventDefault();
    var btn=document.getElementById('submitBtn');
    var succ=document.getElementById('formSuccess');
    var err=document.getElementById('formError');
    if(succ)succ.style.display='none';
    if(err)err.style.display='none';
    if(btn){btn.textContent='...';btn.disabled=true;}
    fetch('https://formspree.io/f/mzdjweov',{method:'POST',body:new FormData(_form),headers:{Accept:'application/json'}})
    .then(function(r){
      if(r.ok){
        _form.style.display='none';
        if(succ){succ.textContent='Message received. We will be in touch shortly.';succ.className='form-status success';succ.style.display='block';}
      }else{
        if(btn){btn.disabled=false;btn.textContent='Send Enquiry';}
        if(err){err.textContent='Error. Please email info@kr-exp.com';err.className='form-status error';err.style.display='block';}
      }
    }).catch(function(){
      if(btn){btn.disabled=false;btn.textContent='Send Enquiry';}
      if(err){err.textContent='Error. Please email info@kr-exp.com';err.className='form-status error';err.style.display='block';}
    });
  });
}

/* ===== LANG SWITCHER ===== */
window.setLang=function(l){
  document.documentElement.lang=l;
  document.documentElement.dir=(l==='ar')?'rtl':'ltr';
};
