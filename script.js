const socials=[
{name:"X",meta:"THOUGHTS / DAILY",url:"https://x.com/naoyasnow",slug:"x",color:"ffffff"},
{name:"Facebook",meta:"PEOPLE / LIFE",url:"http://www.facebook.com/naoyasnow",slug:"facebook",color:"1877F2"},
{name:"Instagram",meta:"IMAGES / MOMENTS",url:"https://www.instagram.com/naoyasnow",slug:"instagram",color:"E4405F"},
{name:"Threads",meta:"CONVERSATIONS",url:"https://www.threads.com/@naoyasnow",slug:"threads",color:"ffffff"},
{name:"mixi2",meta:"COMMUNITY",url:"https://mixi.social/@naoyasnow/portfolio",local:"mixi2"},
{name:"YouTube",meta:"VIDEO / CREATE",url:"https://youtube.com/@naoyasnow",slug:"youtube",color:"FF0000"},
{name:"Spotify",meta:"MUSIC / PODCAST",url:"https://open.spotify.com/user/21xwjdippabfb7wfcpnnwsjqa",slug:"spotify",color:"1DB954"},
{name:"note",meta:"WORDS / IDEAS",url:"https://note.com/naoyasnow",local:"note"},
{name:"GitHub",meta:"CODE / BUILD",url:"https://github.com/naoyasnow",slug:"github",color:"ffffff"},
{name:"Discord",meta:"CHAT / TALK / GAME",url:"https://discord.gg/hnA6butP",slug:"discord",color:"5865F2"}];

const icon=s=>s.local==="mixi2"?"assets/mixi2_Symbol_FullColor.png":s.local==="note"?"assets/icon.png":`https://cdn.simpleicons.org/${s.slug}/${s.color}`;
const list=document.querySelector("#list");
socials.forEach((s,i)=>{const a=document.createElement("a");a.className="card";a.href=s.url;a.target="_blank";a.rel="noopener";a.innerHTML=`<span class="num">${String(i+1).padStart(2,"0")}</span><span class="name">${s.name}</span><span class="meta">${s.meta}</span><span class="icon"><img src="${icon(s)}" alt="${s.name} logo"></span>`;list.appendChild(a)});

const c=document.querySelector("#network"),ctx=c.getContext("2d"),popup=document.querySelector("#popup"),pi=document.querySelector("#popupIcon"),pn=document.querySelector("#popupName"),pm=document.querySelector("#popupMeta"),visit=document.querySelector("#visit");
let W,H,dpr,nodes=[],selected=-1,pt={x:-9999,y:-9999,px:-9999,py:-9999,active:false,down:false};
const acid="#00ffee",fg="#f2f1ed",bg="#090a0c";

function resize(){dpr=Math.min(devicePixelRatio||1,2);W=c.clientWidth;H=c.clientHeight;c.width=W*dpr;c.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);if(nodes.length)return;
const m=W<800,cx=W*(m?.58:.64),cy=H*(m?.52:.53),rx=Math.min(W,H)*(m?.36:.29),ry=Math.min(W,H)*(m?.32:.34);
nodes=socials.map((s,i)=>{const a=i/10*Math.PI*2-Math.PI/2,x=cx+Math.cos(a)*rx*(.76+.22*(i%3)),y=cy+Math.sin(a)*ry*(.74+.18*((i+1)%3));const im=new Image();im.src=icon(s);return{...s,x,y,hx:x,hy:y,vx:0,vy:0,phase:Math.random()*7,image:im}})}

function pos(e){const r=c.getBoundingClientRect();pt.px=pt.x;pt.py=pt.y;pt.x=e.clientX-r.left;pt.y=e.clientY-r.top;pt.active=true}
function hit(x,y){let k=-1,b=70;nodes.forEach((n,i)=>{const d=Math.hypot(x-n.x,y-n.y);if(d<b){b=d;k=i}});return k}
function select(i){if(i<0)return;if(selected===i){window.open(nodes[i].url,"_blank","noopener");return}selected=i;const n=nodes[i];pi.innerHTML=`<img src="${icon(n)}" alt="">`;pn.textContent=n.name;pm.textContent=n.meta;popup.classList.add("show")}
function closePop(){selected=-1;popup.classList.remove("show")}
c.addEventListener("pointermove",pos);
c.addEventListener("pointerdown",e=>{pos(e);pt.down=true;const i=hit(pt.x,pt.y);if(i>=0){select(i);c.setPointerCapture?.(e.pointerId)}else closePop()});
c.addEventListener("pointerup",()=>pt.down=false);c.addEventListener("pointercancel",()=>pt.down=false);c.addEventListener("pointerleave",()=>{if(!pt.down){pt.active=false;pt.x=pt.y=-9999}});
visit.onclick=()=>{if(selected>=0)window.open(nodes[selected].url,"_blank","noopener")};

function physics(){const m=W<800;nodes.forEach((n,i)=>{n.phase+=.004;n.vx+=(n.hx-n.x)*.0015+Math.cos(n.phase+i)*.003;n.vy+=(n.hy-n.y)*.0015+Math.sin(n.phase+i)*.003;
if(pt.active){const d=Math.hypot(pt.x-n.x,pt.y-n.y);if(d<190){const f=(1-d/190)*(m?.055:.025);n.vx-=(pt.x-pt.px)*f;n.vy-=(pt.y-pt.py)*f}}
if(selected===i){n.vx+=(W*.56-n.x)*.0018;n.vy+=(H*.52-n.y)*.0018}n.vx*=.986;n.vy*=.986;n.x+=n.vx;n.y+=n.vy;
const p=m?38:45;if(n.x<p){n.x=p;n.vx=Math.abs(n.vx)*.45}if(n.x>W-p){n.x=W-p;n.vx=-Math.abs(n.vx)*.45}if(n.y<70){n.y=70;n.vy=Math.abs(n.vy)*.45}if(n.y>H-p){n.y=H-p;n.vy=-Math.abs(n.vy)*.45}})}

function draw(t){ctx.clearRect(0,0,W,H);
for(let i=0;i<10;i++)for(let j=i+1;j<10;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<315){ctx.strokeStyle=`rgba(215,255,63,${(1-d/315)*.19})`;ctx.lineWidth=(selected===i||selected===j)?1.2:.65;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
nodes.forEach((n,i)=>{const d=Math.hypot(pt.x-n.x,pt.y-n.y),near=pt.active&&d<105,active=selected===i;
if(active){for(let k=0;k<3;k++){const q=((t/9)+k*18)%70;ctx.beginPath();ctx.arc(n.x,n.y,42+q,0,Math.PI*2);ctx.strokeStyle=`rgba(215,255,63,${(1-q/70)*.18})`;ctx.stroke()}}
if(near||active){ctx.beginPath();ctx.arc(n.x,n.y,active?62:52,0,Math.PI*2);ctx.fillStyle="rgba(215,255,63,.035)";ctx.fill();ctx.strokeStyle="rgba(215,255,63,.2)";ctx.stroke()}
const r=active?43:near?34:29;ctx.beginPath();ctx.arc(n.x,n.y,r,0,Math.PI*2);ctx.fillStyle="rgba(9,10,12,.8)";ctx.fill();ctx.strokeStyle=active||near?acid:"rgba(242,241,237,.48)";ctx.lineWidth=active?1.8:1;ctx.stroke();
if(n.image.complete){const s=active?46:near?37:31;ctx.drawImage(n.image,n.x-s/2,n.y-s/2,s,s)}
if(near||active){ctx.font='500 12px "DM Mono"';ctx.textAlign="center";ctx.textBaseline="top";ctx.fillStyle=acid;ctx.fillText(n.name,n.x,n.y+r+9)}});requestAnimationFrame(draw)}

resize();(function loop(){physics();requestAnimationFrame(loop)})();requestAnimationFrame(draw);window.addEventListener("resize",resize);
