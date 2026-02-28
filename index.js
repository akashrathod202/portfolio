 
/* ── LOADER ── */
let lp=0;const lpg=document.getElementById('lpg'),lsub=document.getElementById('lsub'),loader=document.getElementById('loader'),lfillT=document.getElementById('lfillT');
const msgs=['Compiling...','Loading assets...','Almost done...','Welcome!'];let mi=0;
const lt=setInterval(()=>{
  lp+=Math.floor(Math.random()*11)+4;if(lp>=100){lp=100;clearInterval(lt);setTimeout(()=>{loader.style.opacity='0';loader.style.visibility='hidden'},700)}
  lpg.style.right=(100-lp)+'%';
  lfillT.style.clipPath=`inset(0 ${100-lp}% 0 0)`;
  if(mi<msgs.length&&lp>mi*26){lsub.textContent=msgs[mi++]}
},85);

/* ── CURSOR ── */
const cur=document.getElementById('cur'),curO=document.getElementById('curO');
let cx=0,cy=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{cx=e.clientX;cy=e.clientY;cur.style.left=cx+'px';cur.style.top=cy+'px'});
(function rc(){rx+=(cx-rx)*.11;ry+=(cy-ry)*.11;curO.style.left=rx+'px';curO.style.top=ry+'px';requestAnimationFrame(rc)})();
document.querySelectorAll('a,button,.bc,.pcard,.edu-card,.tcard,.slink,.tl-item,.qst,.plnk').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

/* ── CARD MOUSE GLOW ── */
document.querySelectorAll('.bc,.pcard').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
    card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
  });
});

/* ── PROJECT CARD 3D TILT ── */
document.querySelectorAll('.pcard').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const rx2=(e.clientX-r.left)/r.width-.5,ry2=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`translateY(-10px) rotateX(${-ry2*5}deg) rotateY(${rx2*5}deg)`;
    card.style.transition='transform .05s,box-shadow .3s,border-color .3s';
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='';card.style.transition='transform .55s cubic-bezier(0.16,1,0.3,1),box-shadow .4s,border-color .3s'});
});

/* ── SCROLL PROGRESS ── */
window.addEventListener('scroll',()=>{
  document.getElementById('prog').style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';
  let active='';['about','skills','projects','journey','contact'].forEach(id=>{const el=document.getElementById(id);if(el&&window.scrollY>=el.offsetTop-200)active=id});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+active));
  document.querySelectorAll('.di').forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+active));
  const btt=document.getElementById('btt');
  if(btt){const show=window.scrollY>500;btt.style.opacity=show?'1':'0';btt.style.transform=show?'translateY(0)':'translateY(12px)'}
},{passive:true});

/* ── REVEAL ── */
const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('vis');
      e.target.querySelectorAll('.bar-fill').forEach(b=>b.style.width=b.dataset.w+'%');
    }
  });
},{threshold:.1});
document.querySelectorAll('.rv,.rvl,.rvr,.tli').forEach((el,i)=>{
  el.style.transitionDelay=(i%5)*.1+'s';obs.observe(el);
});

/* ── SKILL BARS ── */
const skObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.bar-fill').forEach(b=>b.style.width=b.dataset.w+'%')})},{threshold:.1});
const sk=document.getElementById('skills');if(sk)skObs.observe(sk);

/* ── TECH STAGGER ── */
const tcObs=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.tcard').forEach((c,i)=>{
        c.style.opacity='0';c.style.transform='translateY(22px) scale(.95)';
        c.style.transition=`opacity .5s ${i*.045}s,transform .5s ${i*.045}s`;
        requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.opacity='1';c.style.transform=''}));
      });
      tcObs.unobserve(e.target);
    }
  });
},{threshold:.08});
const tg=document.querySelector('.tech-grid');if(tg)tcObs.observe(tg);

/* ── COUNTERS ── */
function animCtr(el){const t=parseInt(el.dataset.t);const s=Math.max(1,Math.floor(t/45));let c=0;const i=setInterval(()=>{c=Math.min(c+s,t);el.textContent=c;if(c>=t)clearInterval(i)},20)}
const coObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.counter').forEach(animCtr);coObs.unobserve(e.target)}})},{threshold:.4});
const hs=document.querySelector('.bc-intro');if(hs)coObs.observe(hs);

/* ── MOBILE NAV ── */
function toggleMob(){document.getElementById('mnav').classList.toggle('open')}
function closeMob(){document.getElementById('mnav').classList.remove('open')}

/* ── FORM ── */
function sendMsg(){
  const n=document.getElementById('fn').value.trim(),
        e=document.getElementById('fe').value.trim(),
        s=document.getElementById('fs').value.trim(),
        m=document.getElementById('fm').value.trim();
  if(!n||!e||!m){alert('Please fill in your name, email, and message.');return;}
  const subject=encodeURIComponent(s||'Portfolio Contact from '+n);
  const body=encodeURIComponent('Name: '+n+'\nEmail: '+e+'\n\n'+m);
  window.location.href='mailto:akashrathod.dev@gmail.com?subject='+subject+'&body='+body;
  document.getElementById('fmsg').style.display='block';
  setTimeout(()=>{document.getElementById('fmsg').style.display='none'},4000);
}

/* ── RESUME DOWNLOAD ── */
function downloadResume(){
  const resumeText=`AKASH RATHOD
Backend Developer · MCA Student
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Pune, Maharashtra, India
📧 akashrathod.dev@gmail.com
💼 linkedin.com/in/iamakash-rathod
🐙 github.com/iamakash-rathod

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Backend engineer and MCA student at D. Y. Patil Institute specialising in 
scalable architecture, REST APIs, and algorithmic problem solving. 250+ DSA 
problems solved on LeetCode. Passionate about building production-ready systems.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MCA — D. Y. Patil Institute, Pune                               2025 – Present
Masters in Computer Applications

BCA — G H Raisoni University                                    2022 – 2025
Bachelor of Computer Applications | CGPA: 8.32

12th — Shri Shivaji Junior College                                       2022
HSC — 86%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Languages     : Python (90%), JavaScript/Node.js (76%), SQL, Bash
Backend       : Express.js, REST APIs, Microservices, JWT Auth, OAuth2
Databases     : MongoDB, PostgreSQL, Redis
DevOps        : Docker, AWS (EC2, S3), Git, CI/CD
Other         : Data Structures & Algorithms (250+ LeetCode), System Design

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
URL Shortener Service                                              Node.js · Redis · MongoDB
• Built a high-performance URL shortener handling 10k+ req/s with Redis caching
• Custom alias support, click analytics, expiry, and REST API

Auth Microservice                                            Node.js · JWT · bcrypt · OAuth2
• Production-ready authentication with JWT rotation and email verification
• Role-based access control and Swagger documentation

Async Task Queue                                               Python · Celery · Redis · Docker
• Distributed task queue for background jobs with retry logic and monitoring
• Dockerized deployment with Redis broker and Flower dashboard

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACHIEVEMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 250+ DSA problems solved on LeetCode (Arrays, Trees, Graphs, DP)
• BCA CGPA: 8.32 | HSC: 86%
• Open to Backend / SDE internship roles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  Open to Internship · Backend · SDE Roles
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  const blob=new Blob([resumeText],{type:'text/plain'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='Akash_Rathod_Resume.txt';
  document.body.appendChild(a);a.click();
  document.body.removeChild(a);URL.revokeObjectURL(url);
  
  // Show toast
  const toast=document.createElement('div');
  toast.style.cssText='position:fixed;bottom:2rem;right:2rem;background:var(--teal);color:#0B0F1A;padding:.75rem 1.5rem;border-radius:12px;font-weight:700;font-size:.85rem;z-index:9999;animation:fadeUp .4s ease';
  toast.textContent='✅ Resume downloaded!';
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),3000);
}
 