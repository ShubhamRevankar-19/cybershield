const CS={k:"cybershield_v1",
get(){let d={};try{d=JSON.parse(localStorage.getItem(this.k))||{}}catch(e){}return{modules:[],quizzes:[],scenario:0,game:0,days:[],...d}},
set(f){const d=this.get();f(d);const t=new Date().toDateString();if(!d.days.includes(t))d.days.push(t);try{localStorage.setItem(this.k,JSON.stringify(d))}catch(e){}},
reset(){try{localStorage.removeItem(this.k)}catch(e){}},
streak(d){let n=0,c=new Date();while(d.days.includes(c.toDateString())){n++;c.setDate(c.getDate()-1)}return n},
score(d){return Math.min(100,d.modules.length*4+Math.max(0,...d.quizzes)*3+d.scenario*4+d.game)},
overall(d){return Math.min(100,d.modules.length*6+(d.quizzes.length?20:0)+(d.scenario?10:0)+(d.game?10:0))}};
window.addEventListener("load",()=>{const el=document.getElementById("dash");if(!el)return;const d=CS.get(),o=CS.overall(d),s=CS.score(d);
const set=(i,v)=>document.getElementById(i).textContent=v;
set("pct",o+"%");set("mods",d.modules.length+"/10");set("qz",d.quizzes.length);set("stk",CS.streak(d)+" Days");set("sc",s+"/100");
setTimeout(()=>{document.getElementById("bar").style.width=o+"%";document.getElementById("bar2").style.width=s+"%"},150);
["bar","bar2"].forEach((b,i)=>document.getElementById(b).parentElement.setAttribute("aria-valuenow",i?s:o));
const n=MODULES.findIndex((m,i)=>!d.modules.includes(i));
if(n<0){set("nt","All modules complete");set("nd","Great work! Retake the quiz to keep your skills sharp.")}else{set("nt",MODULES[n][0]);set("nd",MODULES[n][1]);document.getElementById("nl").href="learn.html#m"+n}});
