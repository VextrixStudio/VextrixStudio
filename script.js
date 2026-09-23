const USER="VextrixStudio",$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const root=document.documentElement;
/* ---------- Universal copy (works even where Clipboard API is blocked) ---------- */
function copyText(text,msg="Copied ✓"){
  const fallback=()=>{const t=document.createElement("textarea");t.value=text;t.setAttribute("readonly","");t.style.cssText="position:fixed;top:0;left:0;opacity:0;pointer-events:none";document.body.appendChild(t);t.focus();t.select();t.setSelectionRange(0,text.length);let ok=false;try{ok=document.execCommand("copy")}catch{}t.remove();return ok};
  const done=ok=>{toast(ok?msg:"Press Ctrl+C to copy");if(!ok)prompt("Copy:",text)};
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(()=>done(true),()=>done(fallback()))}else done(fallback());
}
function flashBtn(b,txt="Copied ✓"){if(!b)return;const o=b.dataset.o||(b.dataset.o=b.innerHTML);b.innerHTML=txt;b.classList.add("ok");clearTimeout(b._t);b._t=setTimeout(()=>{b.innerHTML=o;b.classList.remove("ok")},1600)}

/* ---------- Theme ---------- */
const saved=localStorage.getItem("theme");if(saved)root.dataset.theme=saved;
$("#theme").onclick=()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";localStorage.setItem("theme",root.dataset.theme)};

/* ---------- Monochrome dot background ---------- */
const c=$("#dots"),ctx=c.getContext("2d");let W,H,t=0,m={x:innerWidth/2,y:innerHeight/2},tg={...m};
const rs=()=>{const d=devicePixelRatio;W=c.width=innerWidth*d;H=c.height=innerHeight*d;c.style.width=innerWidth+"px";c.style.height=innerHeight+"px"};rs();addEventListener("resize",rs);
addEventListener("pointermove",e=>{tg.x=e.clientX;tg.y=e.clientY});
(function draw(){
  t+=.012;m.x+=(tg.x-m.x)*.06;m.y+=(tg.y-m.y)*.06;
  const d=devicePixelRatio,g=30*d,R=Math.max(W,H)*.32,col=getComputedStyle(root).getPropertyValue("--dot");
  ctx.clearRect(0,0,W,H);
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){
    const dx=(x-m.x*d)/1.5,dy=y-m.y*d;let s=Math.max(0,1-Math.hypot(dx,dy)/R);s*=s;
    const wave=(Math.sin(t+x*.004+y*.006)+1)*.5;
    const r=(.7+s*4.5+wave*.4)*d,a=.12+s*.55+wave*.05;
    ctx.fillStyle=`rgba(${col},${a})`;ctx.beginPath();ctx.arc(x,y,r,0,6.283);ctx.fill();
  }
  requestAnimationFrame(draw);
})();

/* ---------- Hero: letters + typing + clock ---------- */
const h1=$(".split");h1.innerHTML=[...h1.textContent].map((ch,i)=>`<span class="ch" style="animation-delay:${i*.06}s">${ch===" "?"&nbsp;":ch}</span>`).join("");
const words=["effortless.","fast.","premium.","accessible.","built to convert."];
(async function typeLoop(){const el=$("#rot");let i=0;const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
 while(true){const s=words[i++%words.length];for(let k=1;k<=s.length;k++){el.textContent=s.slice(0,k);await w(70+Math.random()*60)}await w(1800);for(let k=s.length;k>=0;k--){el.textContent=s.slice(0,k);await w(35)}await w(300)}})();
const clock=()=>$("#clock").textContent=new Date().toLocaleTimeString("en-US",{timeZone:"America/Los_Angeles",hour:"2-digit",minute:"2-digit"})+" PT";clock();setInterval(clock,30000);
$("#year").textContent=new Date().getFullYear();

/* ---------- Marquee ---------- */
const mq=["UI Design","Web Development","TypeScript","React","Landing Pages","Design Systems","Performance","Accessibility","Responsive"];
$("#track").innerHTML=[...mq,...mq].map(w=>`<span>${w}</span>`).join("");

/* ---------- Stack (monochrome icons) ---------- */
const ico={
 ts:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h20v20H2zm11.3 10.3v-1.6H7v1.6h2.3V19h1.8v-6.7zm.8 5.9c.5.3 1.4.8 2.8.8 1.8 0 3-.9 3-2.4 0-1.4-.8-2-2.3-2.6-.9-.4-1.3-.6-1.3-1.1 0-.4.3-.7.9-.7s1.1.3 1.4.6l1-1.2c-.5-.5-1.3-.9-2.4-.9-1.6 0-2.7 1-2.7 2.3 0 1.3.9 2 2.2 2.5 1 .4 1.4.6 1.4 1.2 0 .5-.4.8-1.1.8-.9 0-1.6-.4-2.1-.9z"/></svg>',
 js:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M10 9v6.5a2 2 0 0 1-3.5 1M18 10a2 2 0 0 0-3.5.5c0 2.5 4 1.5 4 4a2 2 0 0 1-3.8.8"/></svg>',
 react:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="1.8" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>',
 next:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 16V8l8 10M15 8v5"/></svg>',
 html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
 css:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 3l1.6 17L12 22l6.4-2L20 3z"/><path d="M8 8h8l-.5 6-3.5 1-3.5-1-.2-2"/></svg>',
 tw:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11c1.5-4 4-5 6.5-4s3 3 5.5 3c2 0 3-1 4-2-1.5 4-4 5-6.5 4s-3-3-5.5-3c-2 0-3 1-4 2zm0 6c1.5-4 4-5 6.5-4s3 3 5.5 3c2 0 3-1 4-2"/></svg>',
 node:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 8v8"/></svg>',
 git:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="9" r="2"/><path d="M6 8v8M18 11c0 4-6 3-11 6"/></svg>',
 figma:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 2h6a3.5 3.5 0 0 1 0 7H9a3.5 3.5 0 0 1 0-7zM9 9h6a3.5 3.5 0 1 1 0 7H9zM9 16a3.5 3.5 0 1 0 3.5 3.5V16z"/></svg>',
 vercel:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l10 18H2z"/></svg>',
 perf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>'};
const stack=[["ts","TypeScript 5","primary"],["react","React 19","UI"],["next","Next.js 16","framework"],["js","JavaScript","core"],["html","HTML5","markup"],["css","CSS3","styling"],["tw","Tailwind 4","utility"],["node","Node.js","runtime"],["figma","Figma","UI design"],["git","Git","control"],["vercel","Vercel","deploy"],["perf","Lighthouse","performance"]];
const REAL={ts:"typescript",react:"react",next:"nextdotjs",js:null,html:null,css:null,tw:"tailwindcss",node:"nodedotjs",figma:"figma",git:"git",vercel:"vercel",perf:"lighthouse"};
const stackIcon=k=>{const r=REAL[k],src=r&&(window.ICONS||{})[r];return src?`<img src="${src}" class="si" alt="">`:ico[k]};
$("#stackgrid").innerHTML=stack.map(([k,n,s])=>`<div>${stackIcon(k)}<span>${n}</span><small>${s}</small></div>`).join("");

/* ---------- Contributions ---------- */


/* ---------- Projects ---------- */
const FALLBACK=[
 {name:"antonioconstruccion",language:"TypeScript",homepage:"https://antonioenriquezconstruction.com",html_url:"https://github.com/VextrixStudio/antonioconstruccion",stargazers_count:1,created_at:"2026-05-27T17:29:14Z",pushed_at:"2026-06-28T17:26:25Z",langs:{TypeScript:212931,CSS:665,JavaScript:559}},
 {name:"vellium",language:"TypeScript",homepage:null,html_url:"https://github.com/VextrixStudio/vellium",stargazers_count:0,created_at:"2026-05-29T15:43:19Z",pushed_at:"2026-05-29T15:43:19Z",langs:{TypeScript:235755,CSS:3086,JavaScript:559}}];
const INFO={
 antonioconstruccion:{title:"Antonio Enríquez Construction",desc:"A premium digital platform for a California construction company. “Technical Blueprint” visual language: native dark mode, cinematic typography and an engineering grid.",feat:["Estimate Engine v2.1 with dynamic logic and ROI","Gallery with laser-scanner effect","Instant contact via SMS / WhatsApp"],tags:["Next.js","TypeScript","Tailwind","Vercel"],role:"Design + Development",big:"Building<br>legacies."},
 vellium:{title:"Vellium",desc:"My own web app built with Next.js 16 and React 19. Full authentication system, sidebar dashboard and a keyboard-first experience.",feat:["Auth: sign-up, login, verification and reset","Command palette + shortcuts overlay","Light/dark theme and settings"],tags:["Next.js 16","React 19","Tailwind 4","TS 5"],role:"Own product",big:"Vellium<br>App."}};
const pretty=n=>n.replace(/[-_]/g," ").replace(/\b\w/g,l=>l.toUpperCase());
const fmt=s=>new Date(s).toLocaleDateString("en-US",{month:"short",year:"numeric"});
const LC={TypeScript:"var(--fg)",CSS:"color-mix(in srgb,var(--fg) 55%,transparent)",JavaScript:"color-mix(in srgb,var(--fg) 25%,transparent)"};

function render(repos){
  $("#projects").innerHTML=repos.map((r,i)=>{const d=INFO[r.name]||{title:pretty(r.name),desc:r.description||"A Vextrix Studio project.",tags:[r.language||"Web"],role:"Development",big:pretty(r.name)};
   const host=r.homepage?r.homepage.replace(/https?:\/\//,""):`github.com/${USER}/${r.name}`;
   return `<article class="proj reveal">
    <div class="shot"><div class="scan"></div><div class="browser"><div class="b-top"><i></i><i></i><i></i><span>${host}</span></div>
     <div class="b-body"><div class="l" style="width:30%"></div><div class="t">${d.big}</div><div class="l" style="width:70%"></div><div class="l" style="width:50%"></div><div class="g"><div></div><div></div><div></div></div></div></div></div>
    <div class="info"><span class="num">${String(i+1).padStart(2,"0")} / ${String(repos.length).padStart(2,"0")}</span>
     <h3>${d.title}</h3><p>${d.desc}</p>${d.feat?`<ul class="feat">${d.feat.map(f=>`<li>${f}</li>`).join("")}</ul>`:""}<div class="tags">${d.tags.map(x=>`<span>${x}</span>`).join("")}</div>
     <div class="meta"><div><small>Role</small><b>${d.role}</b></div><div><small>Year</small><b>${fmt(r.created_at)}</b></div><div><small>Stars</small><b>★ ${r.stargazers_count}</b></div></div>
     <div class="links">${r.homepage?`<a class="btn primary magnetic" href="${r.homepage}" target="_blank">Visit site ↗</a>`:""}<a class="btn magnetic" href="${r.html_url}" target="_blank">Source code</a></div></div>
   </article>`}).join("");
  $$("#projects .reveal").forEach(e=>io.observe(e));bindMagnetic();
  $("#s-repos").dataset.to=repos.length;
  const tot={};repos.forEach(r=>Object.entries(r.langs||{}).forEach(([k,v])=>tot[k]=(tot[k]||0)+v));
  const sum=Object.values(tot).reduce((a,b)=>a+b,0)||1,ent=Object.entries(tot).sort((a,b)=>b[1]-a[1]);
  const ts=tot.TypeScript?Math.round(tot.TypeScript/sum*100):0;$("#s-ts").dataset.to=ts;$("#s-ts").textContent=ts;$("#bytes").textContent=(sum/1024).toFixed(0)+" KB of code";
  $("#langbar").innerHTML=ent.map(([k,v])=>`<div data-w="${v/sum*100}" style="background:${LC[k]||"var(--mut)"}"></div>`).join("");
  $("#langlist").innerHTML=ent.map(([k,v])=>`<li><i style="background:${LC[k]||"var(--mut)"}"></i><b>${k}</b>${(v/sum*100).toFixed(1)}%</li>`).join("");
  for(let i=cmdItems.length-1;i>=0;i--)if(cmdItems[i].s==="project")cmdItems.splice(i,1);cmdItems.push(...repos.map(r=>({l:(INFO[r.name]||{}).title||pretty(r.name),s:"project",a:()=>open(r.homepage||r.html_url)})));
}
const FB_COMMITS=[{r:"antonioconstruccion",m:"feat: sitio web Antonio Construccion completo",d:"2026-06-28T17:26:18Z"},{r:"vellium",m:"Update",d:"2026-06-25T23:57:29Z"},{r:"vellium",m:"Update",d:"2026-06-25T22:15:12Z"},{r:"antonioconstruccion",m:"Add social media links to media page",d:"2026-06-25T21:05:32Z"},{r:"antonioconstruccion",m:"Add social media links to media page",d:"2026-06-25T21:03:40Z"},{r:"vellium",m:"Initial commit",d:"2026-05-29T15:43:19Z"}];
let lastSync=0,firstLoad=true;
async function load(){
  let repos=FALLBACK,commits=[],live=false;
  try{
    const rs=await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=100`).then(r=>{if(!r.ok)throw 0;return r.json()});
    repos=rs.filter(r=>!r.fork);live=true;
    await Promise.all(repos.map(async r=>{
      try{r.langs=await fetch(r.languages_url).then(x=>x.json())}catch{r.langs={}}
      try{const cm=await fetch(`https://api.github.com/repos/${USER}/${r.name}/commits?per_page=100`).then(x=>x.json());if(Array.isArray(cm))commits.push(...cm.map(c=>({r:r.name,m:c.commit.message.split("\n")[0],d:c.commit.author.date,sha:c.sha.slice(0,7),url:c.html_url})))}catch{}
    }));
    repos.sort((a,b)=>b.stargazers_count-a.stargazers_count||new Date(b.pushed_at)-new Date(a.pushed_at));
  }catch{}
  if(!commits.length)commits=FB_COMMITS;
  commits.sort((a,b)=>new Date(b.d)-new Date(a.d));
  if(firstLoad){render(repos);firstLoad=false}
  // real contributions (last 78 days)
  const days={};commits.forEach(c=>{const k=c.d.slice(0,10);days[k]=(days[k]||0)+1});
  let ref=new Date();const recent=commits.some(c=>Date.now()-new Date(c.d)<78*864e5);if(!recent&&commits[0])ref=new Date(commits[0].d);
  let html="",count=0;for(let i=77;i>=0;i--){const d=new Date(ref-i*864e5).toISOString().slice(0,10),n=days[d]||0;count+=n;html+=`<i title="${d}: ${n} commit${n==1?"":"s"}" style="opacity:${n?Math.min(1,.3+n*.25):.08}"></i>`}
  $("#contrib").innerHTML=html;const sc=$("#s-commits");sc.dataset.to=count;if(sc.closest(".in"))sc.textContent=count;
  $("#events").innerHTML=commits.slice(0,8).map((e,i)=>`<a class="ev" ${e.url?`href="${e.url}" target="_blank"`:""} style="animation-delay:${i*.08}s"><span class="h">${e.sha||"·······"}</span><span><b>${e.r}</b> <span class="muted">— ${e.m.slice(0,60)}</span></span><small>${ago(e.d)}</small></a>`).join("")+`<div class="ev" style="animation-delay:.9s"><span class="h">$</span><span class="caret"></span></div>`;
  lastSync=Date.now();$("#sync").dataset.live=live?1:0;tickSync();
}
function ago(d){const s=(Date.now()-new Date(d))/1e3;if(s<3600)return Math.round(s/60)+" min";if(s<86400)return Math.round(s/3600)+" h";if(s<2592000)return Math.round(s/86400)+" d";return new Date(d).toLocaleDateString("en-US",{day:"numeric",month:"short"})}
function tickSync(){if(!lastSync)return;const s=Math.round((Date.now()-lastSync)/1e3);$("#sync").innerHTML=`<i class="pulse"></i> ${$("#sync").dataset.live==1?"live":"offline"} · ${s<5?"now":s+"s ago"}`}
setInterval(tickSync,1000);setInterval(load,120000);

/* ---------- Reveal + counters + bars ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("in");
  e.target.querySelectorAll("[data-to]").forEach(n=>{const to=+n.dataset.to;let v=0;const st=setInterval(()=>{v+=Math.max(1,to/30);n.textContent=Math.min(to,Math.round(v));if(v>=to)clearInterval(st)},30)});
  e.target.querySelectorAll("[data-w]").forEach(b=>b.style.width=b.dataset.w+"%");io.unobserve(e.target)}),{threshold:.15});
$$(".reveal").forEach(e=>io.observe(e));

/* ---------- Active nav ---------- */
const secs=[...$$("main section[id]")];
addEventListener("scroll",()=>{const y=scrollY+200;let cur="";secs.forEach(s=>{if(s.offsetTop<=y)cur=s.id});$$("#menu a").forEach(a=>a.classList.toggle("act",a.getAttribute("href")==="#"+cur))},{passive:true});
$("#burger").onclick=()=>$("#menu").classList.toggle("open");$$("#menu a").forEach(a=>a.onclick=()=>$("#menu").classList.remove("open"));

/* ---------- Bento spotlight + tilt ---------- */
$$(".tilt").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;el.style.setProperty("--mx",x+"px");el.style.setProperty("--my",y+"px");el.style.transform=`perspective(900px) rotateX(${(y/r.height-.5)*-4}deg) rotateY(${(x/r.width-.5)*4}deg)`});el.addEventListener("pointerleave",()=>el.style.transform="")});

/* ---------- Cursor + magnetic buttons ---------- */
const cur=$("#cursor");let cx=0,cy=0,px=0,py=0;addEventListener("pointermove",e=>{cx=e.clientX;cy=e.clientY});
(function lp(){px+=(cx-px)*.2;py+=(cy-py)*.2;cur.style.left=px+"px";cur.style.top=py+"px";requestAnimationFrame(lp)})();
document.addEventListener("pointerover",e=>cur.classList.toggle("big",!!e.target.closest("a,button")));
function bindMagnetic(){$$(".magnetic").forEach(b=>{if(b._m)return;b._m=1;b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener("pointerleave",()=>b.style.transform="")})}bindMagnetic();

/* ---------- Command palette ⌘K ---------- */
const go=id=>()=>$(id).scrollIntoView({behavior:"smooth"});
const cmdItems=[{l:"Home",s:"navigate",a:go("#inicio")},{l:"Work",s:"navigate",a:go("#trabajo")},{l:"About",s:"navigate",a:go("#sobre")},{l:"Stack",s:"navigate",a:go("#stack")},{l:"Process",s:"navigate",a:go("#proceso")},{l:"Contact",s:"navigate",a:go("#contacto")},{l:"Toggle theme",s:"action",a:()=>$("#theme").click()},{l:"Open GitHub",s:"link",a:()=>open("https://github.com/"+USER)},{l:"Copy email",s:"action",a:()=>copyMail()},{l:"Copy portfolio link",s:"action",a:()=>{copyText(location.href,"Link copied ✓")}}];
const K=$("#cmdk"),KI=$("#cmdkIn"),KL=$("#cmdkList");let sel=0,list=[];
function kr(){const q=KI.value.toLowerCase();list=cmdItems.filter(i=>i.l.toLowerCase().includes(q));sel=Math.min(sel,Math.max(0,list.length-1));KL.innerHTML=list.map((i,n)=>`<li class="${n===sel?"sel":""}" data-n="${n}">${i.l}<small>${i.s}</small></li>`).join("")||`<li>No results</li>`}
const ko=()=>{K.classList.add("open");KI.value="";sel=0;kr();setTimeout(()=>KI.focus(),10)},kc=()=>K.classList.remove("open");
$("#openK").onclick=ko;K.onclick=e=>{if(e.target===K)kc()};
KL.onclick=e=>{const li=e.target.closest("li[data-n]");if(li){kc();list[li.dataset.n].a()}};
KI.oninput=()=>{sel=0;kr()};
addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();K.classList.contains("open")?kc():ko()}
 if(!K.classList.contains("open"))return;if(e.key==="Escape")kc();if(e.key==="ArrowDown"){sel=(sel+1)%list.length;kr()}if(e.key==="ArrowUp"){sel=(sel-1+list.length)%list.length;kr()}if(e.key==="Enter"&&list[sel]){kc();list[sel].a()}});

/* ---------- Toast + form ---------- */
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
const EMAIL="vextrixstudio@outlook.com";
const copyMail=()=>copyText(EMAIL,"Email copied ✓");
$("#copyMail").onclick=e=>{copyMail();flashBtn(e.currentTarget)};
let topic="Website";$$("#topics button").forEach(b=>b.onclick=()=>{$$("#topics button").forEach(x=>x.classList.remove("on"));b.classList.add("on");topic=b.textContent});
$("#msg").oninput=e=>$("#cnt").textContent=e.target.value.length+" / 1500";
$("#form").onsubmit=async e=>{
  e.preventDefault();const f=e.target,b=$("#sendBtn");if(f._honey.value)return;
  b.classList.add("loading");b.firstChild.textContent="Sending ";
  const data={name:f.name.value,email:f.email.value,type:topic,message:f.message.value,_subject:`Portfolio · ${topic} · ${f.name.value}`,_template:"table",_captcha:"false"};
  try{
    const r=await fetch(`https://formsubmit.co/ajax/${EMAIL}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)}).then(r=>r.json());
    if(String(r.success)!=="true")throw 0;
    toast(`Thanks ${data.name}! Message sent ✓`);f.reset();$("#cnt").textContent="0 / 1500";
  }catch{
    location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(data._subject)}&body=${encodeURIComponent(data.message+"\n\n— "+data.name+" ("+data.email+")")}`;
    toast("Opening your email app…");
  }
  b.classList.remove("loading");b.firstChild.textContent="Send message →";
};

load();

/* ---------- Loader ---------- */
(()=>{let p=0;const st=setInterval(()=>{p+=Math.random()*18+6;if(p>=100){p=100;clearInterval(st);setTimeout(()=>{$("#loader").classList.add("done");document.body.classList.add("ready")},250)}$("#ldbar").style.width=p+"%";$("#ldnum").textContent=String(Math.floor(p)).padStart(3,"0")},90)})();
/* ---------- Progress bar + back to top ---------- */
addEventListener("scroll",()=>{const p=scrollY/(document.body.scrollHeight-innerHeight);$("#progress").style.width=p*100+"%";$("#topBtn").classList.toggle("show",scrollY>800)},{passive:true});
$("#topBtn").onclick=()=>scrollTo({top:0,behavior:"smooth"});
/* ---------- Headings: word reveal + scramble ---------- */
$$(".sec-head h2").forEach(h=>{h.innerHTML=h.innerHTML.split("<br>").map(l=>l.split(" ").map(w=>`<span class="word"><span>${w}</span></span>`).join(" ")).join("<br>")});
$$(".sec-head h2 .word>span").forEach((s,i)=>s.style.transitionDelay=(i%6)*.07+"s");
const CH="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/—";
function scramble(el){const o=el.dataset.o||(el.dataset.o=el.textContent);let f=0;const st=setInterval(()=>{el.textContent=o.split("").map((c,i)=>i<f/2||c===" "?c:CH[Math.random()*CH.length|0]).join("");if(++f>o.length*2)clearInterval(st)},25)}
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){scramble(e.target);so.unobserve(e.target)}}));$$(".eyebrow").forEach(e=>so.observe(e));
$$("#menu a").forEach(a=>a.addEventListener("mouseenter",()=>scramble(a)));
/* ---------- Shortcuts ---------- */
addEventListener("keydown",e=>{if(e.target.matches("input,textarea")||e.metaKey||e.ctrlKey||$("#cmdk").classList.contains("open")||$("#vs").classList.contains("open"))return;
 const k=e.key.toLowerCase(),K=$("#keys");
 if(k==="escape")K.classList.remove("open");
 if(e.key==="?")K.classList.toggle("open");if(k==="t")$("#theme").click();if(k==="1")go("#trabajo")();if(k==="2")go("#sobre")();if(k==="c")go("#contacto")();if(k==="e")copyMail();if(k==="u")scrollTo({top:0,behavior:"smooth"})});
$("#keys").onclick=e=>{if(e.target.id==="keys")e.target.classList.remove("open")};
cmdItems.push({l:"View keyboard shortcuts",s:"help",a:()=>$("#keys").classList.add("open")});
/* ---------- Hero parallax ---------- */
addEventListener("scroll",()=>{const y=scrollY;if(y<innerHeight){$(".split").style.transform=`translateY(${y*.25}px)`;$(".split").style.opacity=1-y/innerHeight*1.1}},{passive:true});

/* =================== IDE EN VIVO =================== */
const HL=src=>{const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
 const re=/(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("[^"\n]*"?|'[^'\n]*'?|`[^`]*`?)|(<\/?[A-Za-z][\w.]*)|\b(import|from|export|default|const|let|return|function|async|await|if|else|type|interface|new|true|false|null)\b|\b(\d+(?:\.\d+)?)\b|([A-Za-z_]\w*)(?=\()|([a-zA-Z-]+)(?==)|([{}()[\];,.=>])/g;
 let out="",last=0,m;while((m=re.exec(src))){out+=esc(src.slice(last,m.index));const t=esc(m[0]);
  out+=m[1]?`<span class="t-cm">${t}</span>`:m[2]?`<span class="t-str">${t}</span>`:m[3]?`<span class="t-tag">${t}</span>`:m[4]?`<span class="t-kw">${t}</span>`:m[5]?`<span class="t-num">${t}</span>`:m[6]?`<span class="t-fn">${t}</span>`:m[7]?`<span class="t-attr">${t}</span>`:`<span class="t-pun">${t}</span>`;last=re.lastIndex}
 return out+esc(src.slice(last))};

const PROJECTS=[
{name:"antonio-construction",url:"antonioenriquezconstruction.com",
 tree:["▾ app","  layout.tsx","  page.tsx","  globals.css","▾ components","  Hero.tsx","  Estimate.tsx","  Works.tsx","package.json"],
 files:[
 {f:"Hero.tsx",t:"  Hero.tsx",step:1,code:`// Hero — "Technical Blueprint" style
import { Button } from "@/ui/button";

export default function Hero() {
  return (
    <section className="grid-blueprint">
      <h1 className="tracking-tighter">
        Building legacies.
      </h1>
      <p>Technical precision in California.</p>
      <Button href="/estimate">Get a quote</Button>
    </section>
  );
}`},
 {f:"Estimate.tsx",t:"  Estimate.tsx",step:2,code:`// Estimate Engine v2.1 — calculates ROI
const MATERIALS = { stucco: 1.04, oak: 1.08, marble: 1.15 };

export function roi(value: number, m: keyof typeof MATERIALS) {
  const gain = value * MATERIALS[m] - value;
  return Math.round(gain);
}

// roi(500000, "marble") → 75000`}],
 term:["$ npm run build","▲ Next.js 16.2","  Creating an optimized production build…","  ✓ Compiled successfully in 4.2s","  ✓ Linting and checking types","  ✓ Generating static pages (12/12)","$ vercel --prod","  🔍 Inspect: vercel.com/naruluciteam","  ✓ Production: antonioenriquezconstruction.com"],
 prev:{brand:"ANTONIO",h:"Building<br>legacies.",p:"Technical precision and craftsmanship.",b:"Get a quote →"}},
{name:"vellium",url:"vellium.vercel.app",
 tree:["▾ app","  ▾ auth","    login/page.tsx","  ▾ home","    page.tsx","▾ components","  command-palette.tsx","  sidebar.tsx","package.json"],
 files:[
 {f:"command-palette.tsx",t:"  command-palette.tsx",step:1,code:`"use client";
import { useEffect, useState } from "react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return open ? <Dialog items={commands} /> : null;
}`},
 {f:"login/page.tsx",t:"    login/page.tsx",step:2,code:`// Auth — login with verification
export default function Login() {
  return (
    <form action={signIn} className="auth-card">
      <Input name="email" type="email" />
      <Input name="password" type="password" />
      <Button type="submit">Sign in</Button>
    </form>
  );
}`}],
 term:["$ npm run build","▲ Next.js 16.2.9 · React 19","  ✓ Compiled successfully in 3.1s","  ✓ Checking types (TypeScript 5)","  ✓ Route /home  /auth/login  /auth/register","$ vercel --prod","  ✓ Production: vellium.vercel.app"],
 prev:{brand:"VELLIUM",h:"Your space,<br>zero friction.",p:"⌘K for everything. Fast by design.",b:"Create account →"}}];

let ideRun=0,ideSpeed=1,ideIdx=0;
let idePaused=false;
const sleep=async ms=>{let left=ms/ideSpeed;while(left>0){await new Promise(r=>setTimeout(r,Math.min(left,50)));if(!idePaused)left-=50}};
async function runIDE(){
 const run=++ideRun,P=PROJECTS[ideIdx%PROJECTS.length],alive=()=>run===ideRun;
 const code=$("#code"),gut=$("#gutter"),term=$("#term"),prev=$("#prev"),steps=$$("#ideSteps li"),status=$("#ideStatus");
 const setStep=n=>steps.forEach((s,i)=>s.className=i<n?"done":i===n?"doing":"");
 $("#ideProj").textContent=P.name;term.innerHTML="";code.innerHTML="";gut.innerHTML="";$("#ideTabs").innerHTML="";
 prev.innerHTML='<div class="prev-empty mono">Esperando build…</div>';$("#prevDot").className="";$("#prevUrl").textContent="localhost:3000";$("#stDeploy").textContent="▲ Vercel";
 // 1. plan: file tree appears
 setStep(0);status.textContent="Jonatan is planning the structure…";
 $("#ideTree").innerHTML=P.tree.map((t,i)=>`<li class="${t.includes("▾")?"dir":""}" style="animation-delay:${i*.08/ideSpeed}s">${t.replace(/ /g,"&nbsp;")}</li>`).join("");
 await sleep(1400);if(!alive())return;
 for(const F of P.files){
  setStep(F.step);
  $$("#ideTree li").forEach(li=>li.classList.toggle("act",li.textContent.replace(/\u00a0/g," ")===F.t));
  $$("#ideTabs span").forEach(s=>s.classList.remove("on"));
  $("#ideTabs").insertAdjacentHTML("beforeend",`<span class="on">${F.f}</span>`);
  status.textContent=`Jonatan is typing ${F.f}…`;
  let txt="";const src=F.code;
  for(let i=0;i<src.length;i++){
   if(!alive())return;
   txt+=src[i];
   // human-like pauses
   const ch=src[i];let d=ch==="\n"?120:ch===" "?18:22+Math.random()*28;
   if(ch==="\n"&&Math.random()<.15)d=500;
   // typo humano ocasional
   if(/[a-z]/.test(ch)&&Math.random()<.012){code.innerHTML=HL(txt+"x")+'<span class="cur"></span>';await sleep(160);code.innerHTML=HL(txt)+'<span class="cur"></span>';await sleep(120)}
   const lines=txt.split("\n");
   code.innerHTML=HL(txt)+'<span class="cur"></span>';
   gut.innerHTML=lines.map((_,k)=>k+1).join("<br>");
   $("#stLine").textContent=`Ln ${lines.length}, Col ${lines.at(-1).length+1}`;
   await sleep(d);
  }
  status.textContent="Saved ✓";await sleep(900);code.innerHTML=HL(txt);
 }
 // build
 setStep(3);status.textContent="Compiling…";
 for(const l of P.term){if(!alive())return;const isCmd=l.startsWith("$");
  if(isCmd){const div=document.createElement("div");div.className="p";term.appendChild(div);for(let k=1;k<=l.length;k++){div.textContent=l.slice(0,k);await sleep(35)}}
  else{term.insertAdjacentHTML("beforeend",`<div class="${l.includes("✓")?"ok":""}">${l}</div>`);await sleep(l.includes("✓")?450:250)}
  term.scrollTop=term.scrollHeight;
  if(l.includes("Compiled")){const v=P.prev;prev.innerHTML=`<div class="pv-nav pv"><b>${v.brand}</b><span>Home · Work · Contact</span></div><div class="pv-h pv" style="animation-delay:.1s">${v.h}</div><div class="pv-p pv" style="animation-delay:.25s">${v.p}</div><span class="pv-btn pv" style="animation-delay:.4s">${v.b}</span><div class="pv-g pv" style="animation-delay:.55s"><div></div><div></div></div>`;$("#prevDot").className="live"}
 }
 // deploy
 setStep(4);await sleep(600);if(!alive())return;setStep(5);
 $("#prevUrl").textContent=P.url;$("#stDeploy").textContent="▲ Production ✓";status.textContent="Project delivered ✓";
 prev.insertAdjacentHTML("beforeend",`<div class="deployed"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l10 18H2z"/></svg><div><b>Delivered to client</b><br><span class="muted">${P.url}</span></div></div>`);
 toast(`▲ ${P.name} deployed to production`);
 status.textContent="Project delivered ✓ — press Next project or Replay";
}
let ideStarted=false;
function setPlayUI(){const b=$("#idePlay");const M=n=>`<span class="mi f notranslate" translate="no" aria-hidden="true">${n}</span>`;b.innerHTML=!ideStarted?M("play_arrow")+" Play":idePaused?M("play_arrow")+" Resume":M("pause")+" Pause";$("#ideBox").classList.toggle("paused",idePaused&&ideStarted);$("#ideStatus").dataset.p=idePaused?1:0}
function ideStart(){ideStarted=true;idePaused=false;$("#ideCover").classList.add("gone");setPlayUI();runIDE()}
$("#ideCover").onclick=ideStart;
$("#idePlay").onclick=()=>{if(!ideStarted)return ideStart();idePaused=!idePaused;setPlayUI()};
$("#ideReplay").onclick=()=>{if(!ideStarted)return ideStart();idePaused=false;setPlayUI();runIDE()};
$("#ideNext").onclick=()=>{ideIdx++;if(!ideStarted)return ideStart();idePaused=false;setPlayUI();runIDE()};
$("#ideStop").onclick=()=>{ideRun++;ideStarted=false;idePaused=false;$("#ideCover").classList.remove("gone");setPlayUI()};
new IntersectionObserver(es=>{if(!es[0].isIntersecting&&ideStarted&&!idePaused){idePaused=true;setPlayUI()}},{threshold:0}).observe($("#ideBox"));
setPlayUI();
$("#ideSpeed").onclick=e=>{ideSpeed=ideSpeed===1?2:ideSpeed===2?4:1;$("#spdT").textContent=`Speed ${ideSpeed}×`};
cmdItems.push({l:"Watch live IDE",s:"navigate",a:()=>{go("#ide")();setTimeout(()=>{if(!ideStarted)ideStart()},700)}});

/* ---------- Bento: self-typing config.ts ---------- */
(()=>{const pre=$(".b-code code");const src=`// jonatan.config.ts
export const dev = {
  name: "Jonatan A",
  studio: "Vextrix Studio",
  stack: ["Next.js", "React", "TS"],
  email: "vextrixstudio@outlook.com",
  coffee: Infinity,
};`;pre.innerHTML="";let done=false;
 new IntersectionObserver(async es=>{if(!es[0].isIntersecting||done)return;done=true;for(let i=1;i<=src.length;i++){pre.innerHTML=HL(src.slice(0,i))+'<span class="cur"></span>';await new Promise(r=>setTimeout(r,25))}},{threshold:.4}).observe(pre)})();

/* ---------- Typing loader ---------- */
(()=>{const n=$(".ld-name"),s="JONATAN A";n.textContent="";let i=0;const st=setInterval(()=>{n.textContent=s.slice(0,++i);if(i>=s.length)clearInterval(st)},70)})();

/* =================== DEV TO DEV — VS Code replica =================== */
const I=k=>(window.ICONS||{})[k]||"";
const MONO=new Set(["prisma","nodedotjs","tailwindcss_","vercel","nextdotjs","github","git","figma","dribbble","claude","githubcopilot","googlefonts","lighthouse","typescript","react","vscodium","anthropic"]);
const img=(k,cls="")=>I(k)?`<img src="${I(k)}" class="${cls} ${MONO.has(k)?"si":""}" alt="">`:"";
const EXT=[
{ic:"vesper",n:"Vesper",pub:"Rauno Freiberg",id:"raunofreiberg.vesper",dl:"9.5K",v:"0.0.39",cat:"Themes",d:"Peppermint and orange flavored dark theme for VS Code.",u:"My main theme. It's minimal and almost monochrome — fewer loud colors means less eye strain during long sessions. It's the look this whole portfolio is inspired by.",how:["Ctrl+K Ctrl+T → pick Vesper","Pair it with Geist Mono at 14px","Turn off bracket colorization for a cleaner look"]},
{ic:"prettier-vscode",n:"Prettier - Code formatter",pub:"Prettier",id:"esbenp.prettier-vscode",dl:"9.2M",v:"12.4.0",cat:"Formatters",d:"Code formatter using Prettier.",u:"I never format by hand. With format-on-save, I hit Ctrl+S and the whole file lines up — same style across every project.",how:["Set it as the default formatter","Enable editor.formatOnSave","Add a .prettierrc to each repo"]},
{ic:"vscode-eslint",n:"ESLint",pub:"Microsoft",id:"dbaeumer.vscode-eslint",dl:"6.0M",v:"3.0.34",cat:"Linters",d:"Integrates ESLint JavaScript into VS Code.",u:"Catches bugs before they ship. I use Next.js's eslint-config-next and fix every warning before I commit.",how:["Auto-fix on save with codeActionsOnSave","Keep the Problems panel at 0","Run npm run lint before pushing"]},
{ic:"errorlens",n:"Error Lens",pub:"Alexander",id:"usernamehw.errorlens",dl:"1.1M",v:"3.28.0",cat:"Linters",d:"Improve highlighting of errors, warnings and other language diagnostics.",u:"Errors show up right on the line — no hovering needed. It's the extension that saves me the most time.",how:["Works instantly with ESLint + TypeScript","I keep it on for errors and warnings"]},
{ic:"vscode-tailwindcss",n:"Tailwind CSS IntelliSense",pub:"Tailwind Labs",id:"bradlc.vscode-tailwindcss",dl:"2.5M",v:"0.16.0",cat:"Programming Languages",d:"Intelligent Tailwind CSS tooling for VS Code.",u:"Essential with Tailwind 4. I type tracking- and it shows every option with its real CSS value on hover.",how:["Hover a class to see the CSS","Autocomplete for custom theme tokens","Flags conflicting classes"]},
{ic:"pretty-ts-errors",n:"Pretty TypeScript Errors",pub:"yoavbls",id:"yoavbls.pretty-ts-errors",dl:"475K",v:"0.8.7",cat:"Programming Languages",d:"Make TypeScript errors prettier and more human-readable.",u:"TypeScript errors can be a wall of text. This turns them into clean, formatted messages so I see exactly what's missing.",how:["Hover any TS error","Click types to jump to their definition"]},
{ic:"gitlens",n:"GitLens — Git supercharged",pub:"GitKraken",id:"eamodio.gitlens",dl:"16.8M",v:"2026.9",cat:"SCM Providers",d:"Supercharge Git within VS Code.",u:"I see who changed each line, when and why — without leaving the editor. Great for reviewing history and rolling back.",how:["Inline blame on the current line","File History to compare versions","Commit graph for branches"]},
{ic:"auto-rename-tag",n:"Auto Rename Tag",pub:"Jun Han",id:"formulahendry.auto-rename-tag",dl:"588K",v:"0.1.10",cat:"Other",d:"Auto rename paired HTML/XML tag.",u:"In JSX I change <div> to <section> and the closing tag updates itself. Small thing, huge time saver.",how:["Works in HTML, JSX and TSX"]},
{ic:"material-icon-theme",n:"Material Icon Theme",pub:"Philipp Kief",id:"pkief.material-icon-theme",dl:"6.1M",v:"5.38.1",cat:"Themes",d:"Material Design icons for Visual Studio Code.",u:"Clear icons for every file and folder. I find files much faster in big Next.js projects with lots of routes.",how:["Set as file icon theme","Folder icons for app/, components/, lib/"]},
{ic:"githubcopilot",n:"GitHub Copilot",pub:"GitHub",id:"GitHub.copilot",dl:"40M+",v:"latest",cat:"AI",d:"Your AI pair programmer.",u:"I use it for boilerplate and repetitive patterns — never blindly. I read every suggestion before hitting Tab.",how:["Tab to accept, Esc to skip","Ctrl+I for inline chat","Write a clear comment first, then let it suggest"]},
{ic:"vscode-thunder-client",n:"Thunder Client",pub:"Ranga Vadhineni",id:"rangav.vscode-thunder-client",dl:"5M+",v:"2.41.3",cat:"Testing",d:"Lightweight REST API client for VS Code.",u:"I test my Next.js API routes without leaving the editor — no Postman needed.",how:["Save requests per project","Environment variables for dev/prod"]},
{ic:"vscode-import-cost",n:"Import Cost",pub:"Wix",id:"wix.vscode-import-cost",dl:"4M+",v:"3.3.0",cat:"Performance",d:"Display the size of imported packages inline.",u:"Before adding a library, I see how many KB it adds. Keeps my sites fast.",how:["Watch for red numbers","Prefer tree-shakeable imports"]},
{ic:"code-spell-checker",n:"Code Spell Checker",pub:"Street Side Software",id:"streetsidesoftware.code-spell-checker",dl:"10M+",v:"4.9.3",cat:"Linters",d:"Spelling checker for source code.",u:"Catches typos in UI text before clients see them. Supports English and Spanish.",how:["Add the Spanish dictionary","Add project words to cspell.json"]},
{ic:"todo-tree",n:"Todo Tree",pub:"Gruntfuggly",id:"gruntfuggly.todo-tree",dl:"4M+",v:"0.0.215",cat:"Productivity",d:"Show TODO and FIXME comments in a tree view.",u:"I leave TODOs while building and clear the whole list before delivery.",how:["TODO: / FIXME: tags","Zero TODOs before shipping"]},
{ic:"path-intellisense",n:"Path Intellisense",pub:"Christian Kohler",id:"christian-kohler.path-intellisense",dl:"15M+",v:"2.8.0",cat:"Productivity",d:"Autocompletes filenames.",u:"No more broken imports — it autocompletes every path as I type.",how:["Works with @/ aliases"]},
{ic:"prisma",n:"Prisma",pub:"Prisma",id:"Prisma.prisma",dl:"5M+",v:"latest",cat:"Programming Languages",d:"Syntax, formatting and autocomplete for Prisma schemas.",u:"For my full-stack path: modeling databases with Prisma + PostgreSQL.",how:["Format schema on save","npx prisma studio to browse data"]},
{ic:"console-ninja",n:"Console Ninja",pub:"Wallaby.js",id:"wallabyjs.console-ninja",dl:"544K",v:"1.0.540",cat:"Debuggers",d:"console.log output and runtime errors right next to your code.",u:"Quick debugging without opening DevTools. The log value appears inline next to the line that printed it.",how:["Just run npm run dev","Hover a value to expand objects"]}];
const TOOLS=[
{ic:"vscodium",n:"VS Code",pub:"Editor",d:"My main editor for everything.",u:"Everything happens here. Shortcuts I use constantly: Ctrl+P open file, Ctrl+Shift+P commands, Alt+↑↓ move lines, Ctrl+D multi-select.",how:["Ctrl+P — open files","Ctrl+Shift+P — command palette","Ctrl+D — select next match"]},
{ic:"nextdotjs",n:"Next.js",pub:"Framework",d:"The React framework I build almost everything with.",u:"App Router, server components and folder-based routing. Vellium runs on Next.js 16 with React 19.",how:["npx create-next-app@latest","App Router + TypeScript + Tailwind"]},
{ic:"vercel",n:"Vercel",pub:"Deploy",d:"Where my projects go live.",u:"Every push to GitHub creates a preview URL. I send it to clients so they can watch progress in real time.",how:["Connect repo → auto deploys","Preview URL per branch","Custom domains in one click"]},
{ic:"github",n:"GitHub",pub:"Code hosting",d:"Where all my code and its history live.",u:"One repo per project, small descriptive commits. Profile: github.com/VextrixStudio.",how:["Conventional commits","README for every project"]},
{ic:"tailwindcss",n:"Tailwind CSS",pub:"Styling",d:"Utility-first CSS.",u:"I style directly in markup. Tailwind 4 with zinc/neutral palettes for the monochrome look.",how:["zinc-950 for dark backgrounds","tracking-tighter for big headings"]},
{ic:"typescript",n:"TypeScript",pub:"Language",d:"JavaScript with types.",u:"~99% of my code is TypeScript. Types catch mistakes before the browser does.",how:["strict: true always","Type props, never any"]},
{ic:"figma",n:"Figma",pub:"Design",d:"I design interfaces before coding them.",u:"Quick wireframes, then colors and typography before writing a single line.",how:["Wireframe → UI → code"]},
{ic:"googlefonts",n:"Geist + Geist Mono",pub:"Typography",d:"Vercel's typeface. Clean and modern.",u:"Loaded with next/font in projects and used in my editor too.",how:["import { GeistSans } from 'geist/font/sans'"]},
{ic:"claude",n:"AI assistants",pub:"AI",d:"A pair programmer, not a replacement.",u:"I keep AGENTS.md / CLAUDE.md files in my repos with project rules so AI follows my style and stack.",how:["Project rules in AGENTS.md","Review every line it writes"]},
{ic:"dribbble",n:"Dribbble + Mobbin",pub:"Inspiration",d:"References from top designers and real apps.",u:"Before designing, I look at how real products solve the same problem and adapt the best ideas.",how:["Save references per project"]}];
const TIPS=[
{ph:"⌘K",n:"Command palette everywhere",pub:"UX tip",d:"A ⌘K search makes any app faster to use.",u:"I add one to my projects — Vellium and this portfolio. Close this window and press ⌘K to try it.",how:["Keyboard-first navigation","Fuzzy search your routes"]},
{ph:"✓",n:"Conventional commits",pub:"Git tip",d:"feat:, fix:, style:, refactor: at the start of every commit.",u:"The history reads like a clean changelog, and it's easy to find when something changed.",how:["feat: add contact form","fix: mobile nav overflow"]},
{ic:"lighthouse",n:"Performance first",pub:"Tip",d:"Optimize images, fonts and JS before launch.",u:"I use next/image and next/font and check Lighthouse before every delivery.",how:["Aim for 95+ on Lighthouse","Lazy-load below the fold"]},
{ph:"1px",n:"Borders over shadows",pub:"Design tip",d:"Thin 1px borders look sharper than heavy shadows.",u:"The Vercel/Linear look: #1f1f1f borders on black, generous spacing, tight letter-spacing on headings.",how:["letter-spacing: -0.04em on headings","One accent: white"]}];
const SETTINGS=`{
  // Theme & font
  "workbench.colorTheme": "Vesper",
  "workbench.iconTheme": "material-icon-theme",
  "editor.fontFamily": "Geist Mono, monospace",
  "editor.fontSize": 14,
  "editor.lineHeight": 1.7,
  // Auto formatting
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  // Clean UI
  "editor.minimap.enabled": false,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.smoothScrolling": true,
  "editor.bracketPairColorization.enabled": false,
  "files.autoSave": "onFocusChange"
}`;
const icon=(x,cls="")=>x.ic&&I(x.ic)?img(x.ic,cls):`<span class="ph ${cls}">${x.ph||x.n[0]}</span>`;
// Teaser
$("#dtIcons").innerHTML=[...EXT.map(x=>x.ic),"nextdotjs","vercel","github"].map(k=>img(k)).join("");
$("#dtList").innerHTML=EXT.slice(0,6).map((x,i)=>`<div class="dt-row" style="animation-delay:${i*.08}s">${img(x.ic)}<div><b>${x.n}</b><small>${x.pub}</small></div></div>`).join("");
// Replica
let vsView="ext",vsSel=0;const DATA={ext:EXT,tools:TOOLS,tips:TIPS};
const HEAD={ext:"EXTENSIONS: INSTALLED",tools:"TOOLS I USE",tips:"TIPS FOR DEVS",files:"EXPLORER",settings:"SETTINGS"};
function vsList(){
  const q=$("#vsQ").value.toLowerCase();$("#vsSideH").textContent=HEAD[vsView];
  if(vsView==="files"||vsView==="settings"){$("#vsList").innerHTML=`<div class="vs-grp">JONATAN-SETUP</div>`+["settings.json","extensions.json","README.md"].map((f,i)=>`<div class="vs-item ${i===0?"on":""}" data-f="${f}"><div><b>${f}</b><p>.vscode/${f}</p></div></div>`).join("");return}
  const L=DATA[vsView].map((x,i)=>({...x,i})).filter(x=>(x.n+x.d+x.pub).toLowerCase().includes(q));
  $("#vsList").innerHTML=`<div class="vs-grp">${vsView==="ext"?"INSTALLED":"ALL"} · ${L.length}</div>`+L.map(x=>`<div class="vs-item ${x.i===vsSel?"on":""}" data-i="${x.i}">${icon(x)}<div><b>${x.n}</b><p>${x.d}</p><small><span>${x.pub}</span>${x.dl?`<span>↓ ${x.dl}</span>`:""}</small></div></div>`).join("");
}
function vsPage(){
  const P=$("#vsPage");P.style.animation="none";P.offsetHeight;P.style.animation="";P.scrollTop=0;
  if(vsView==="files"||vsView==="settings"){
    $("#vsTabs").innerHTML=`<span class="on">{ } settings.json</span>`;
    const lines=SETTINGS.split("\n");
    P.innerHTML=`<div class="xp-btns" style="margin-bottom:20px"><button class="btn primary" id="cpSet">Copy settings.json</button><button class="btn" id="dlSet">Download</button></div><div class="set-code"><div class="gut">${lines.map((_,i)=>i+1).join("\n")}</div><div id="setC"></div></div>`;
    (async()=>{const el=$("#setC");for(let i=0;i<=SETTINGS.length;i+=3){if(!$("#setC"))return;el.innerHTML=HL(SETTINGS.slice(0,i))+'<span class="cur"></span>';await new Promise(r=>setTimeout(r,8))}el.innerHTML=HL(SETTINGS)})();
    $("#cpSet").onclick=e=>{copyText(SETTINGS,"settings.json copied ✓");flashBtn(e.currentTarget)};$("#dlSet").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([SETTINGS],{type:"application/json"}));a.download="settings.json";a.click();toast("settings.json downloaded ✓")};return}
  const x=DATA[vsView][vsSel];if(!x)return;
  $("#vsTabs").innerHTML=`<span class="on">${x.ic?img(x.ic):""}${vsView==="ext"?"Extension: ":""}${x.n}</span>`;
  const cmd=x.id?`code --install-extension ${x.id}`:"";
  P.innerHTML=`<div class="xp-head">${icon(x)}<div style="min-width:0">
     <h3>${x.n}${x.id?`<code>${x.id}</code>`:""}</h3>
     <div class="xp-meta"><b>${x.pub}</b>${x.dl?`<span>↓ ${x.dl} installs</span><span>★★★★★</span><span>v${x.v}</span>`:`<span>${vsView==="tools"?"Tool":"Tip"}</span>`}</div>
     <p class="xp-desc">${x.d}</p>
     <div class="xp-btns">${x.id?`<button class="btn primary" data-cp="${cmd}">Copy install command</button><a class="btn" href="https://marketplace.visualstudio.com/items?itemName=${x.id}" target="_blank">Marketplace ↗</a>`:""}${vsView==="ext"?`<a class="btn" href="vscode:extension/${x.id}">Open in VS Code</a>`:""}</div></div></div>
   <div class="xp-tabs mono"><span class="on" data-t="xpD">DETAILS</span><span data-t="xpH">HOW I USE IT</span>${cmd?'<span data-t="xpI">INSTALL</span>':""}</div>
   <div class="xp-body" id="xpD"><div>
     <h4 id="xpH">How I use it</h4><p class="xp-quote">"${x.u}"</p>
     ${x.how?`<h4>My workflow</h4><ul>${x.how.map(h=>`<li>${h}</li>`).join("")}</ul>`:""}
     ${cmd?`<h4 id="xpI">Install</h4><div class="xp-cmd mono"><code>${cmd}</code><button data-cp="${cmd}">Copy</button></div>`:""}
   </div><aside class="xp-aside">
     ${x.cat?`<div><h5>Categories</h5><span class="chip">${x.cat}</span></div>`:""}
     <div><h5>Info</h5><dl>${x.id?`<dt>Identifier</dt><dd class="mono" style="font-size:.66rem">${x.id}</dd><dt>Version</dt><dd>${x.v}</dd>`:""}<dt>Type</dt><dd>${x.pub}</dd><dt>Used by</dt><dd>Jonatan A</dd></dl></div>
     <div><h5>Rating</h5><span class="chip">Must-have</span></div>
   </aside></div>`;
}
$("#vsList").onclick=e=>{const it=e.target.closest(".vs-item");if(!it)return;if(it.dataset.i!=null){vsSel=+it.dataset.i;vsList();vsPage()}$(".vs-side").classList.remove("show")};
$("#vsPage").onclick=e=>{const b=e.target.closest("[data-cp]");if(b){copyText(b.dataset.cp,"Install command copied ✓");flashBtn(b);return}
 const t=e.target.closest(".xp-tabs span");if(t){$$(".xp-tabs span").forEach(s=>s.classList.remove("on"));t.classList.add("on");const tg=$("#"+t.dataset.t);tg&&tg.scrollIntoView({behavior:"smooth",block:"start"})}};
$$("#vsAct button").forEach(b=>b.onclick=()=>{const same=b.dataset.v===vsView;$$("#vsAct button").forEach(x=>x.classList.remove("on"));b.classList.add("on");vsView=b.dataset.v;vsSel=0;$("#vsQ").value="";
  $("#vsQ").placeholder=vsView==="ext"?"Search Extensions in Marketplace":"Search…";vsList();vsPage();if(innerWidth<960)$(".vs-side").classList.toggle("show",!same||!$(".vs-side").classList.contains("show"))});
$("#vsQ").oninput=vsList;
$("#vsCount").textContent=EXT.length;$("#vsStat").textContent=EXT.length+" extensions installed";
const vsOpen=()=>{$("#vs").classList.add("open");document.body.classList.add("vs-lock");vsList();vsPage();if(innerWidth<960)$(".vs-side").classList.add("show")};
const vsClose=()=>{$("#vs").classList.remove("open");document.body.classList.remove("vs-lock")};
$("#openVS").onclick=vsOpen;$("#vsClose").onclick=vsClose;$("#vsX").onclick=vsClose;$("#vs").onclick=e=>{if(e.target.id==="vs")vsClose()};
addEventListener("keydown",e=>{if(!$("#vs").classList.contains("open"))return;if(e.key==="Escape")vsClose();
 if((e.key==="ArrowDown"||e.key==="ArrowUp")&&!e.target.matches("input")&&DATA[vsView]){e.preventDefault();const n=DATA[vsView].length;vsSel=(vsSel+(e.key==="ArrowDown"?1:-1)+n)%n;vsList();vsPage()}});

/* =================== FAQ =================== */
const FAQ=[["How much does a project cost?","It depends on scope. You get a clear, fixed quote before we start — no hidden costs. Email me and I'll reply within 24 h."],
["How long does it take?","A landing page takes about 1 week, a website 2–3 weeks and a full-stack app 4–8 weeks."],
["Can I see progress?","Yes. I share a Vercel preview link that updates with every change."],
["Will I own the site?","Yes. You get the code, the domain and all access. It's all yours."],
["Do you work with clients outside California?","Yes, I work remotely with clients anywhere, in English or Spanish."],
["What happens after launch?","I offer support and maintenance for changes, improvements and new sections."]];
$("#faqList").innerHTML=FAQ.map(([q,a])=>`<div class="fq reveal"><button>${q}<i>+</i></button><div><p>${a}</p></div></div>`).join("");
$$(".fq button").forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("open"));

/* re-observar nuevos elementos */
$$(".reveal:not(.in)").forEach(e=>io.observe(e));
cmdItems.push({l:"Services",s:"navigate",a:go("#servicios")},{l:"My story",s:"navigate",a:go("#historia")},{l:"Dev to Dev — open VS Code",s:"devs",a:()=>vsOpen()},{l:"FAQ",s:"navigate",a:go("#faq")},{l:"Copy settings.json",s:"action",a:()=>{copyText(SETTINGS,"settings.json copied ✓")}});
$$(".sec-head h2").forEach(h=>{if(h.querySelector(".word"))return;h.innerHTML=h.innerHTML.split("<br>").map(l=>l.split(" ").map(w=>`<span class="word"><span>${w}</span></span>`).join(" ")).join("<br>")});
$$(".tilt").forEach(el=>{if(el._t)return;el._t=1;el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;el.style.setProperty("--mx",x+"px");el.style.setProperty("--my",y+"px")})});

/* =================== LIQUID GLASS interactions =================== */
(()=>{
 const sel=".nav,.btn,.pill,.b,.svc,.dev-teaser,.proj,.icon,.kbd-btn,.story-card,.how-r,.langs,.terminal,.cmdk-box,.socials,.hero-meta";
 document.addEventListener("pointermove",e=>{const el=e.target.closest&&e.target.closest(sel);if(!el)return;const r=el.getBoundingClientRect();el.style.setProperty("--gx",(e.clientX-r.left)+"px");el.style.setProperty("--gy",(e.clientY-r.top)+"px")},{passive:true});
 // liquid sliding indicator in nav
 const nav=$("#menu"),blob=document.createElement("span");blob.className="nav-blob";nav.prepend(blob);
 const place=a=>{if(!a||innerWidth<960){blob.style.opacity=0;return}blob.style.opacity=1;blob.style.left=a.offsetLeft+"px";blob.style.width=a.offsetWidth+"px"};
 const active=()=>nav.querySelector("a.act");
 nav.querySelectorAll("a").forEach(a=>a.addEventListener("mouseenter",()=>place(a)));
 nav.addEventListener("mouseleave",()=>place(active()));
 addEventListener("scroll",()=>{if(!nav.matches(":hover"))place(active())},{passive:true});
 addEventListener("resize",()=>place(active()));
 setTimeout(()=>place(active()||nav.querySelector("a")),1500);
 // subtle wobble on glass buttons when clicked
 document.addEventListener("pointerdown",e=>{const b=e.target.closest(".btn,.icon,.pill,.top-btn");if(!b)return;b.animate([{transform:"scale(1)"},{transform:"scale(.94,.9)"},{transform:"scale(1.04,1.02)"},{transform:"scale(1)"}],{duration:450,easing:"cubic-bezier(.3,1.5,.5,1)"})});
})();

/* ===================== v10 features ===================== */
// menu bar clock + actions
const mbTick=()=>{$("#mbDate").textContent=new Date().toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})};mbTick();setInterval(mbTick,15000);
$$("[data-go]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();$(el.dataset.go).scrollIntoView({behavior:"smooth"})}));
$("#mbDev").onclick=()=>vsOpen();$("#mbSearch").onclick=()=>ko();
if(navigator.getBattery)navigator.getBattery().then(b=>{const u=()=>{const l=b.level,ic=b.charging?"battery_charging_full":["battery_0_bar","battery_1_bar","battery_2_bar","battery_3_bar","battery_4_bar","battery_5_bar","battery_6_bar","battery_full"][Math.round(l*7)];$("#mbBatt .mi").textContent=ic;$("#mbPct").textContent=Math.round(l*100)+"%"};u();b.onlevelchange=u;b.onchargingchange=u});
// dock: magnification + actions + active
(()=>{const dock=$("#dock"),items=[...dock.querySelectorAll("a")];
 dock.addEventListener("pointermove",e=>{items.forEach(a=>{const r=a.getBoundingClientRect(),d=Math.abs(e.clientX-(r.left+r.width/2));a.style.setProperty("--s",Math.max(1,1.55-d/140).toFixed(3))})});
 dock.addEventListener("pointerleave",()=>items.forEach(a=>a.style.setProperty("--s",1)));
 items.forEach(a=>a.addEventListener("click",()=>{a.classList.remove("bounce");void a.offsetWidth;a.classList.add("bounce");const act=a.dataset.act;if(act==="vs")vsOpen();if(act==="cmdk")ko();if(act==="theme")$("#theme").click()}));
 addEventListener("scroll",()=>{dock.classList.toggle("show",scrollY>innerHeight*.6);const y=scrollY+innerHeight/2;let cur=null;items.forEach(a=>{const g=a.dataset.go&&$(a.dataset.go);if(g&&g.offsetTop<=y)cur=a});items.forEach(a=>a.classList.toggle("here",a===cur))},{passive:true});
})();
// pricing
/* Pricing model: my cost = hours x $20/h (time + tools). Price = cost / (1 - 0.43) -> 43% profit margin */
const COST_HR=20,MARGIN=.43,price=h=>Math.round(h*COST_HR/(1-MARGIN)/10)*10-1;
const fmt$=n=>n.toLocaleString("en-US");
const PLANS={
 web:[{n:"Landing",h:12,u:"one-time",d:"One focused page to launch or promote.",t:"~1 week",f:["1 custom-designed page","Mobile-first & responsive","Contact / WhatsApp buttons","Basic SEO + analytics","Deploy on Vercel + domain setup"]},
      {n:"Business",h:30,u:"one-time",pop:1,d:"Full website for a growing business.",t:"2–3 weeks",f:["Up to 6 pages","Custom UI + animations","Project gallery / portfolio","Technical SEO + sitemap","Contact form to your email","30 days of free support"]},
      {n:"Premium",h:58,u:"one-time",d:"High-end site like Antonio Construction.",t:"3–4 weeks",f:["Up to 12 pages","Interactive tool (quote calculator)","Advanced animations","Blog or CMS","Performance 95+ Lighthouse","60 days of free support"]}],
 app:[{n:"MVP",h:80,u:"starting",d:"Validate your idea fast.",t:"3–4 weeks",f:["Auth (sign-up, login, reset)","Up to 5 core screens","Database + API","Responsive dashboard","Deploy + handoff"]},
      {n:"Product",h:150,u:"starting",pop:1,d:"A full web app like Vellium.",t:"6–8 weeks",f:["Everything in MVP","Command palette + shortcuts","Roles & settings","Payments (Stripe)","Emails & notifications","60 days of support"]},
      {n:"Custom",p:"Let's talk",u:"",d:"Complex platforms and integrations.",t:"Scoped per project",f:["Custom architecture","Third-party integrations","Admin panels","Ongoing development","Priority support"]}],
 care:[{n:"Basic",h:1.2,u:"/ month",d:"Keep your site safe and online.",t:"Monthly",f:["Uptime monitoring","Security & dependency updates","Monthly backup","Email support"]},
       {n:"Growth",h:3.5,u:"/ month",pop:1,d:"Keep improving every month.",t:"Monthly",f:["Everything in Basic","2 hours of changes / month","Performance checks","Monthly SEO report","48h response time"]},
       {n:"Pro",h:9,u:"/ month",d:"Your on-demand developer.",t:"Monthly",f:["Everything in Growth","6 hours of changes / month","New features & sections","Priority 24h response","Monthly strategy call"]}]};
Object.values(PLANS).flat().forEach(p=>{if(p.h)p.p=fmt$(price(p.h))});
function renderPlans(k){$("#plans").innerHTML=PLANS[k].map((p,i)=>`<div class="plan ${p.pop?"pop":""}" style="animation-delay:${i*.08}s"><h4>${p.n}</h4><p class="pd">${p.d}</p><div class="pp"><b>${/\d/.test(p.p)?"$"+p.p:p.p}</b><span>${p.u}</span></div><span class="pt mono">⏱ ${p.t}</span><ul>${p.f.map(f=>`<li>${f}</li>`).join("")}</ul><button class="btn ${p.pop?"primary":""}" data-plan="${k}|${p.n}">Choose ${p.n} →</button></div>`).join("")}
function segMove(){const on=$("#planSeg button.on"),pill=$("#planSeg .seg-pill");pill.style.left=on.offsetLeft+"px";pill.style.width=on.offsetWidth+"px"}
$$("#planSeg button").forEach(b=>b.onclick=()=>{$$("#planSeg button").forEach(x=>x.classList.remove("on"));b.classList.add("on");segMove();renderPlans(b.dataset.p)});
renderPlans("web");setTimeout(segMove,50);addEventListener("resize",segMove);
function prefill(topicName,msg){go("#contacto")();const map={"Websites":"Website","Web apps":"Web app","Care plans":"Other"};$$("#topics button").forEach(x=>x.classList.toggle("on",x.textContent===topicName));topic=topicName;const m=$("#msg");m.value=msg;m.dispatchEvent(new Event("input"));setTimeout(()=>$("#form [name=name]").focus({preventScroll:true}),900);toast("Form pre-filled ✓")}
$("#plans").onclick=e=>{const b=e.target.closest("[data-plan]");if(!b)return;const [k,n]=b.dataset.plan.split("|");const t={web:"Website",app:"Web app",care:"Other"}[k];prefill(t,`Hi Jonatan! I'm interested in the ${n} plan (${ {web:"Websites",app:"Web apps",care:"Care plans"}[k] }).\n\nAbout my project: `)};
// estimator
const P=h=>Math.round(h*COST_HR/(1-MARGIN)/10)*10;
const OPTS=[{id:"type",l:"Project type",sel:[["Landing page",price(12)],["Business website",price(30)],["Premium website",price(58)],["Web app (MVP)",price(80)]]},
 {id:"pages",l:"Extra pages",sub:`$${P(2.5)} each`,sel:[["0",0],["2",P(5)],["5",P(12.5)],["10",P(25)]]},
 {id:"anim",l:"Advanced animations",sub:"Scroll, 3D, micro-interactions",p:P(8)},{id:"cms",l:"Blog / CMS",sub:"Edit content yourself",p:P(10)},
 {id:"calc",l:"Interactive tool",sub:"Quote calculator, configurator",p:P(14)},{id:"auth",l:"User accounts",sub:"Login & profiles",p:P(18)},
 {id:"pay",l:"Online payments",sub:"Stripe checkout",p:P(15)},{id:"es",l:"Bilingual (EN / ES)",sub:"Two languages",p:P(6)},{id:"rush",l:"Rush delivery",sub:"Half the time",p:0,pct:.25}];
const CS={type:0,pages:0};
$("#calcOpts").innerHTML=OPTS.map(o=>o.sel?`<label class="opt"><div>${o.l}${o.sub?`<br><small>${o.sub}</small>`:""}</div><div class="r"><select data-o="${o.id}">${o.sel.map((s,i)=>`<option value="${i}">${s[0]}</option>`).join("")}</select></div></label>`:`<div class="opt" data-o="${o.id}"><div>${o.l}<br><small>${o.sub}</small></div><div class="r"><span>${o.pct?"+25%":"+$"+o.p}</span><i class="sw"></i></div></div>`).join("");
let calcShown=0;
function calcRun(){let t=0,list=[];OPTS.forEach(o=>{if(o.sel){const s=o.sel[CS[o.id]||0];t+=s[1];list.push(o.l+": "+s[0])}else if(CS[o.id]&&!o.pct){t+=o.p;list.push(o.l)}});if(CS.rush){t*=1.25;list.push("Rush delivery")}t=Math.round(t/10)*10;
 const w=[1,2.5,3.5,4][CS.type||0]*(CS.rush?.5:1)+(CS.auth||CS.pay?1.5:0);$("#calcTime").textContent=`Estimated time: ~${Math.ceil(w)} week${Math.ceil(w)>1?"s":""}`;
 const from=calcShown,st=performance.now();(function an(n){const k=Math.min(1,(n-st)/500),v=Math.round(from+(t-from)*(1-Math.pow(1-k,3)));$("#calcTotal").textContent=v.toLocaleString("en-US");if(k<1)requestAnimationFrame(an)})(st);calcShown=t;$("#calcSend").dataset.sum=list.join("\n• ");$("#calcSend").dataset.t=t}
$$("#calcOpts select").forEach(s=>s.onchange=()=>{CS[s.dataset.o]=+s.value;calcRun()});
$$("#calcOpts .opt[data-o]").forEach(o=>o.onclick=()=>{o.classList.toggle("on");CS[o.dataset.o]=o.classList.contains("on");calcRun()});
calcRun();
$("#calcSend").onclick=e=>{const b=e.currentTarget;prefill(CS.type==3?"Web app":"Website",`Hi Jonatan! I used your estimator (~$${(+b.dataset.t).toLocaleString("en-US")}):\n• ${b.dataset.sum}\n\nAbout my project: `)};
cmdItems.push({l:"Pricing",s:"navigate",a:go("#planes")},{l:"The Studio",s:"navigate",a:go("#estudio")},{l:"Estimate my project",s:"tool",a:()=>$(".calc").scrollIntoView({behavior:"smooth"})});
$$(".reveal:not(.in)").forEach(e=>io.observe(e));
$$(".sec-head h2").forEach(h=>{if(h.querySelector(".word"))return;h.innerHTML=h.innerHTML.split("<br>").map(l=>l.split(" ").map(w=>`<span class="word"><span>${w}</span></span>`).join(" ")).join("<br>")});

/* theme icon sync */
const syncThemeIcon=()=>{const d=root.dataset.theme==="dark";$$('#theme .mi,.dock a[data-act="theme"] .mi').forEach(i=>i.textContent=d?"light_mode":"dark_mode")};
syncThemeIcon();$("#theme").addEventListener("click",()=>setTimeout(syncThemeIcon,0));

/* ===== Protect icons, logo & code from auto-translate (Google/Chrome/Edge/Safari) ===== */
(()=>{const S='.mi,.vx-logo,#code,#term,.gutter,pre,code,kbd,.dd-ic,.xp-cmd,.set-code,.vs-tabs,.mono.h,.ev .h';
 const lock=root=>{(root.querySelectorAll?root:document).querySelectorAll(S).forEach(el=>{el.setAttribute("translate","no");el.classList.add("notranslate")})};
 lock(document);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches&&n.matches(S)){n.setAttribute("translate","no");n.classList.add("notranslate")}lock(n)}}))).observe(document.body,{childList:true,subtree:true});})();

/* ===== Dock: hide while scrolling down, show on scroll up / pause ===== */
(()=>{let ly=scrollY,t;const d=$("#dock");addEventListener("scroll",()=>{const y=scrollY;if(y>innerHeight*.6){d.classList.toggle("hide",y>ly+4);clearTimeout(t);t=setTimeout(()=>d.classList.remove("hide"),900)}ly=y},{passive:true})})();
