/* Python Pathways: live class leaderboard.
   Every 5 minutes of a lesson each student sees the class ranking (same grade + teacher, signed in for the same lesson).
   Points for the lesson: every task completed (exercise or practice question) in this lesson is worth
   1 (Beginner), 1.5 (Intermediate) or 2 (Advanced). After 45 minutes: the final top three.
   Classmates' scores travel through the Python Pathways Sync sheet as small rows: first name + initial, level, tasks. */
(function(){
"use strict";
const T = /[?&]lbtest=1/.test(location.search);          // test mode: one "minute" lasts 3 seconds
const MIN = T ? 3000 : 60000, EVERY = 5, LESSON = 45;
const WEIGHT = { beginner:1, intermediate:1.5, advanced:2, dp_beginner:1, dp_intermediate:1.5, dp_advanced:2 };
const LEVEL = { beginner:"Beginner", intermediate:"Intermediate", advanced:"Advanced", dp_beginner:"Beginner", dp_intermediate:"Intermediate", dp_advanced:"Advanced" };
let S = null, lastTop = [], posted = -1, postAt = 0, popOpen = false;

const L = () => window.PPLive || null;
const P = () => { try { return L() ? L().profile() : null; } catch(e){ return null; } };
const solved = () => { try { return L() ? L().solved() : 0; } catch(e){ return 0; } };
const day = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
function hash(s){ let h = 2166136261; for (const ch of String(s)){ h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
const escH = t => String(t).replace(/[&<>"]/g, c => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;"}[c]));
function short(name){ const w = String(name || "Student").trim().split(/\s+/); return w[0] + (w.length > 1 ? " " + w[w.length - 1][0].toUpperCase() + "." : ""); }
const fmt = n => (Math.round(n * 10) / 10).toString();
const weight = p => WEIGHT[p] || 1;

/* a lesson starts at sign-in; signing in again within the lesson carries on the same one */
function begin(pf){
  const key = "pyl_lb|" + String(pf.email || pf.name).toLowerCase() + "|" + pf.path;
  let s = null, isNew = false; try { s = JSON.parse(localStorage.getItem(key)); } catch(e){}
  if (!s || s.day !== day() || Date.now() - s.start > LESSON * MIN + 5 * MIN){ s = { day: day(), start: Date.now(), base: solved(), shown: 0 }; isNew = true; }
  s.key = key; s.who = pf; S = s; posted = -1; lastTop = s.lastTop || []; save(); post(true);
  if (isNew) setTimeout(align, T ? 500 : 8000);
}
/* a student who signs in late joins the class's lesson clock (the earliest classmate who started up to 40 minutes ago) */
async function align(){
  if (!S) return; const mine = S.key, list = await ranking(); if (!S || S.key !== mine) return;
  const first = Math.min(S.start, ...list.map(r => r.s || S.start));
  if (first < S.start){ S.start = first; S.shown = Math.floor((Date.now() - first) / MIN / EVERY) * EVERY; save(); }
}
function save(){ if (!S) return; try { const { who, key, ...keep } = S; keep.lastTop = lastTop; localStorage.setItem(S.key, JSON.stringify(keep)); } catch(e){} }
const tasks = () => Math.max(0, solved() - S.base);
const group = () => hash([S.who.grade, S.who.teacher, S.day].join("|"));
const me = () => hash(String(S.who.email || S.who.name).toLowerCase());
function myRow(){ return { id: me(), n: short(S.who.name), p: S.who.path, t: tasks(), s: S.start, u: Date.now() }; }

function post(force){
  if (!S || !window.PPSync || !PPSync.boardPost) return;
  const t = tasks(); if (!force && (t === posted || Date.now() - postAt < 15000)) return;
  posted = t; postAt = Date.now();
  try { PPSync.boardPost(group() + "." + me(), JSON.stringify(myRow())); } catch(e){}
}

async function ranking(){
  const rows = {}; rows[me()] = myRow();
  try { if (window.PPSync && PPSync.boardRead){
    const got = await Promise.race([PPSync.boardRead(group() + "."), new Promise(r => setTimeout(() => r({}), 15000))]);
    Object.keys(got).forEach(k => { try { const o = JSON.parse(got[k]); const id = k.split(".").pop();
      if (id !== me() && o && Math.abs((o.s || 0) - S.start) < 40 * MIN) rows[id] = Object.assign(o, { id }); } catch(e){} });
  } } catch(e){}
  return Object.values(rows).map(r => Object.assign(r, { pts: (r.t || 0) * weight(r.p) }))
    .sort((a, b) => b.pts - a.pts || (b.t || 0) - (a.t || 0) || (a.u || 0) - (b.u || 0));
}

function css(){
  if (document.getElementById("lbCss")) return;
  const st = document.createElement("style"); st.id = "lbCss";
  st.textContent = `
.lb-bg{position:fixed;inset:0;background:rgba(27,45,78,.6);display:flex;align-items:center;justify-content:center;z-index:65;padding:16px;animation:lbIn .25s ease}
.lb{background:#fff;border-radius:18px;max-width:460px;width:100%;text-align:center;border-top:8px solid #DC2B3E;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:Arial,sans-serif;color:#1B2D4E;overflow:hidden}
.lb-head{background:#1B2D4E;color:#fff;padding:16px 20px 14px}.lb-head h2{margin:0;font-size:22px}.lb-head p{margin:6px 0 0;font-size:14px;opacity:.9}
.lb-pod{display:flex;align-items:flex-end;justify-content:center;gap:10px;padding:20px 16px 6px}
.lb-col{flex:1;max-width:130px}.lb-col .nm{font-weight:bold;font-size:15px;margin-bottom:4px;word-break:break-word}.lb-col .pt{font-size:13px;margin-bottom:6px}
.lb-col .lv{display:inline-block;font-size:11px;background:#eef1f6;border-radius:8px;padding:2px 6px;margin-bottom:6px}
.lb-step{border-radius:10px 10px 0 0;color:#fff;font-size:28px;font-weight:bold;display:flex;align-items:flex-start;justify-content:center;padding-top:8px}
.lb-1 .lb-step{background:#f5b000;height:96px}.lb-2 .lb-step{background:#9aa5b8;height:72px}.lb-3 .lb-step{background:#c47a3a;height:56px}
.lb-new{display:inline-block;background:#13a05a;color:#fff;font-size:10px;border-radius:6px;padding:1px 5px;margin-left:4px;vertical-align:middle}
.lb-rest{padding:4px 20px 0;font-size:14px}.lb-rest div{display:flex;justify-content:space-between;border-bottom:1px solid #eef1f6;padding:6px 2px}
.lb-me{margin:12px 20px 0;background:#fdecee;border-radius:10px;padding:10px;font-size:14px}
.lb-msg{padding:12px 20px 0;font-size:15px;font-weight:bold;color:#DC2B3E}
.lb-btn{margin:14px 0 18px;background:#DC2B3E;color:#fff;border:0;border-radius:10px;padding:10px 26px;font-size:15px;font-weight:bold;cursor:pointer}
.lb-final .lb-head{background:linear-gradient(135deg,#1B2D4E,#DC2B3E)}
@keyframes lbIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}`;
  document.head.appendChild(st);
}

async function show(min){
  if (!S || popOpen) return;
  const final = min >= LESSON; popOpen = true;
  post(true); await new Promise(r => setTimeout(r, T ? 300 : 2500));   // give my latest score a moment to land
  if (!S){ popOpen = false; return; }
  const list = await ranking(), top = list.slice(0, 3);
  /* first name only; add the surname initial only when two or more classmates share that first name */
  const first = r => String(r.n || "Student").split(" ")[0], same = {};
  list.forEach(r => { const k = first(r).toLowerCase(); same[k] = (same[k] || 0) + 1; });
  list.forEach(r => { r.n = same[first(r).toLowerCase()] > 1 ? (r.n || "Student") : first(r); });
  const myPos = list.findIndex(r => r.id === me()) + 1, mine = list[myPos - 1];
  const fresh = id => lastTop.length && !lastTop.includes(id);
  css();
  const col = (r, i) => !r ? '<div class="lb-col"></div>' :
    '<div class="lb-col lb-' + (i + 1) + '"><div class="nm">' + escH(r.n) + (r.id === me() ? " (you)" : "") + (!final && fresh(r.id) ? '<span class="lb-new">NEW</span>' : "") + '</div>' +
    '<div class="lv">' + escH(LEVEL[r.p] || "") + '</div><div class="pt">' + fmt(r.pts) + ' pts · ' + (r.t || 0) + ' task' + (r.t === 1 ? "" : "s") + '</div>' +
    '<div class="lb-step">' + ["🥇", "🥈", "🥉"][i] + '</div></div>';
  const rest = final ? "" : list.slice(3, 5).map((r, i) => '<div><span>' + (i + 4) + '. ' + escH(r.n) + (r.id === me() ? " (you)" : "") + '</span><b>' + fmt(r.pts) + ' pts</b></div>').join("");
  const left = LESSON - min, moved = !final && lastTop.length && top.some(r => fresh(r.id));
  const head = final ? "🏆 Final top three for the lesson!" : "🎉 Leaderboard: " + min + " minutes in";
  const sub = final ? "Well done everyone! Brilliant effort today." : (moved ? "The top three has changed! " : "Congratulations, well done! ") + left + " minutes to go.";
  const msg = final ? "" : list.length > 3 ? "It's anybody's game! Every task counts." : "Keep going, every task counts!";
  const meLine = !mine ? "" : myPos <= 3 ? (final ? "Amazing, you finished in the top three! 🎉" : "You're in the top three, keep it up!")
    : "You are <b>" + myPos + (["th","st","nd","rd"][myPos % 10 > 3 || [11,12,13].includes(myPos % 100) ? 0 : myPos % 10]) + "</b> with <b>" + fmt(mine.pts) + " pts</b>. " + (final ? "Great work today!" : "You can still climb!");
  const bg = document.createElement("div"); bg.className = "lb-bg"; bg.setAttribute("role", "dialog"); bg.setAttribute("aria-label", "Class leaderboard");
  bg.innerHTML = '<div class="lb' + (final ? " lb-final" : "") + '"><div class="lb-head"><h2>' + head + '</h2><p>' + sub + '</p></div>' +
    '<div class="lb-pod">' + col(top[1], 1) + col(top[0], 0) + col(top[2], 2) + '</div>' +
    (rest ? '<div class="lb-rest">' + rest + '</div>' : "") + (msg ? '<div class="lb-msg">' + msg + '</div>' : "") +
    (meLine ? '<div class="lb-me">' + meLine + '</div>' : "") +
    '<div style="font-size:12px;color:#6b7690;margin-top:10px">Points: Beginner 1 · Intermediate 1.5 · Advanced 2 per task</div>' +
    '<button class="lb-btn">' + (final ? "Well done! 🎉" : "Back to work 💪") + '</button></div>';
  const close = () => { clearTimeout(auto); bg.remove(); popOpen = false; };
  bg.querySelector(".lb-btn").onclick = close; bg.onclick = e => { if (e.target === bg) close(); };
  const auto = setTimeout(close, final ? 30000 : (T ? 4000 : 15000));
  document.body.appendChild(bg);
  try { L().confetti(); if (final) setTimeout(() => L().confetti(), 900); } catch(e){}
  try { L().sfx("house"); } catch(e){}
  try { if (L()){ const say = L().say, first = top[0] && top[0].id === me();
    say(final ? (myPos && myPos <= 3 ? "Amazing! You finished in the top three. Well done!" : "Well done everyone! Here is the final top three.")
      : first ? "You're top of the leaderboard! Keep it up!" : moved ? "The leaderboard has changed. It's anybody's game!" : "Leaderboard time! Well done, keep going!", 400); } } catch(e){}
  lastTop = top.map(r => r.id); save();
}

function tick(){
  const pf = P();
  let ready = false; try { ready = !!(L() && L().ready()); } catch(e){}
  if (!pf || !pf.path || !ready){ S = null; return; }                         // signed out, or not in Computer Science
  if (!S || S.who.email !== pf.email || S.who.name !== pf.name || S.who.path !== pf.path) begin(pf); else S.who = pf;
  post(false);
  const min = Math.floor((Date.now() - S.start) / MIN);
  if (S.shown < LESSON && min >= EVERY && !popOpen){
    const due = Math.min(LESSON, Math.floor(min / EVERY) * EVERY);
    if (due > S.shown){ S.shown = due; save(); show(due); }
  }
}
setInterval(tick, T ? 500 : 5000);
window.PPLeaderboard = { show: m => S && show(m || EVERY), state: () => S, ranking: () => S && ranking() };
})();
