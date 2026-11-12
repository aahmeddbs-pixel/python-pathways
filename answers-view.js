/* Python Pathways: per-student "exercises and exact answers" view for staff pages.
   Uses the staff answer key (window.PPAnswers, unlocked with the admin password or a teacher's key)
   and the values each student's progress records for every exercise, so the answer shown is the
   answer to that student's own version of the task, including their personal function name.
   Everything that comes from a student's device is shown as plain text, never as HTML. */
window.PPAnswerView = (function(){
"use strict";
const PATH_NAMES = { beginner:"Beginner", intermediate:"Intermediate", advanced:"Advanced", dp_beginner:"IB DP Beginner", dp_intermediate:"IB DP Intermediate", dp_advanced:"IB DP Advanced" };
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const plain = h => String(h || "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|div|li|pre)>/gi, "\n").replace(/<[^>]*>/g, "")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/\n{3,}/g, "\n\n").trim();
const CSS = `.ppav{margin-top:14px}.ppav details.les{border:1px solid #D8DEEA;border-radius:10px;padding:8px 12px;margin-top:8px;background:#fff}
.ppav details.les>summary{font-weight:800;cursor:pointer}.ppav .ex{border-top:1px solid #E9EDF5;padding:10px 0}.ppav .ex:first-of-type{border-top:0}
.ppav .hd{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-weight:800}.ppav .pl{font-size:.75rem;font-weight:800;border-radius:99px;padding:1px 8px;background:#E9EDF5;color:#1B2D4E}
.ppav .pl.ok{background:#E3F4EA;color:#1E6B45}.ppav .pl.no{background:#FFF2DC;color:#8A4B00}.ppav .tk{white-space:pre-wrap;color:#3d4d6b;font-size:.9rem;margin:6px 0}
.ppav pre{white-space:pre-wrap;background:#13213b;color:#e8edf6;border-radius:8px;padding:10px 12px;font:13px/1.45 Menlo,Consolas,monospace;margin:6px 0;overflow:auto}
.ppav pre.mine{background:#f4f6fa;color:#16223A;border:1px solid #D8DEEA}.ppav .lbl{font-size:.78rem;font-weight:800;color:#5B6782;text-transform:uppercase;letter-spacing:.05em;margin-top:6px}
.ppav .note{font-size:.85rem;color:#8A4B00;background:#FFF2DC;border-radius:8px;padding:6px 10px;margin-top:6px}.ppav .cp{font:inherit;font-size:.8rem;border:1px solid #D8DEEA;background:#fff;border-radius:8px;padding:2px 9px;cursor:pointer;margin-left:6px}`;
function style(){ if (document.getElementById("ppavCss")) return; const s = document.createElement("style"); s.id = "ppavCss"; s.textContent = CSS; document.head.appendChild(s); }

function item(A, path, o, label, isPractice){
  const st = o.ok ? `<span class="pl ok">✓ solved</span>` : (o.c ? `<span class="pl no">${o.c} check${o.c === 1 ? "" : "s"}, not solved yet</span>` : `<span class="pl">not tried yet</span>`);
  let ex = null, note = "";
  if (o.q == null && !isPractice) note = "This record is from before exact answers were added. It updates the next time the student signs in.";
  else { try { ex = A.exactAnswer(path, o); } catch(e){ ex = null; } }
  if (ex && ex.missing) note = "This version of the exercise was set before exact answers were recorded" + (o.code ? ": the student's own code is shown below" : "") + ". New exercises always show the exact answer.";
  const title = (ex && ex.title) || o.t || "";
  const task = o.tk ? plain(o.tk) : ex && ex.task ? plain(ex.task) : "";
  const ans = ex && !ex.missing ? ex.answer : null;
  const id = "a" + Math.random().toString(36).slice(2, 9);
  return `<div class="ex"><div class="hd"><span>${esc(label)}${title ? ": " + esc(title) : ""}</span>${st}${o.h ? `<span class="pl">${o.h} hint${o.h === 1 ? "" : "s"}</span>` : ""}</div>
    ${task ? `<div class="tk">${esc(task)}</div>` : ""}
    ${o.code ? `<div class="lbl">Student's code${o.ok ? " (passed)" : " (latest attempt)"}</div><pre class="mine">${esc(o.code)}</pre>` : ""}
    ${ans != null ? `<details${o.ok ? "" : " open"}><summary class="lbl" style="cursor:pointer">Exact answer for this student <button type="button" class="cp" data-copy="${id}">Copy</button></summary><pre id="${id}">${esc(ans)}</pre></details>` : ""}
    ${note ? `<div class="note">${esc(note)}</div>` : ""}</div>`;
}
/* snap = the student's latest progress record ({paths:{level:{lessons:{n:{title, core, prac, pcur}}}}}) */
function render(snap, A, only){
  style();
  if (!A || !A.exactAnswer) return `<div class="ppav"><p class="note">The answer key is locked. Sign in with the admin password (or as an approved teacher) to see the answers.</p></div>`;
  if (!snap || !snap.paths || !Object.keys(snap.paths).length) return `<div class="ppav"><p class="note">No exercises recorded yet.</p></div>`;
  let h = "";
  Object.keys(snap.paths).forEach(path => {
    if (only && only.path && only.path !== path) return;
    const P = snap.paths[path], nums = Object.keys(P.lessons || {}).map(Number).filter(n => !(only && only.lesson) || n === +only.lesson).sort((a, b) => a - b);
    if (!nums.length) return;
    const lastActive = n => { const L = P.lessons[n]; return Math.max(0, ...(L.core || []).map(x => x.at || 0), ...Object.keys(L.days || {}).map(d => Date.parse(d) || 0)); };
    const open = nums.slice().sort((a, b) => lastActive(b) - lastActive(a))[0];
    h += `<h3 style="margin-top:14px">${esc(PATH_NAMES[path] || path)}</h3>`;
    nums.forEach(n => {
      const L = P.lessons[n], core = L.core || [], done = core.filter(x => x.ok).length;
      h += `<details class="les"${n === open ? " open" : ""}><summary>Lesson ${n}: ${esc(L.title || "")} · ${done}/${core.length} exercises${L.pcur ? " · practising" : ""}</summary>` +
        core.map((o, i) => item(A, path, o, "Exercise " + (i + 1), false)).join("") +
        (L.pcur ? item(A, path, Object.assign({ ok:false }, L.pcur), "Current practice question", true) : "") +
        ((L.prac || []).length ? (() => { const withAns = L.prac.filter(x => x.g && x.P), older = L.prac.filter(x => !(x.g && x.P));
          return `<div class="ex"><div class="hd"><span>Practice questions solved: ${L.prac.length}</span></div>${older.length ? `<div class="tk">${withAns.length ? "Earlier: " : ""}${esc(older.slice(-8).map(x => x.t).join(" · "))}</div>` : ""}</div>` +
            withAns.map((x, i) => item(A, path, Object.assign({ ok:true }, x), "Practice question " + (L.prac.length - withAns.length + i + 1), true)).join(""); })() : "") +
        `</details>`;
    });
  });
  if (!h) return `<div class="ppav"><p class="note">This student has no exercises recorded for that choice yet.</p></div>`;
  return `<div class="ppav">${h}</div>`;
}
function bind(root){
  root.querySelectorAll("[data-copy]").forEach(b => b.onclick = e => { e.preventDefault(); e.stopPropagation();
    const pre = root.querySelector("#" + b.dataset.copy); try { navigator.clipboard.writeText(pre ? pre.textContent : ""); b.textContent = "Copied"; setTimeout(() => b.textContent = "Copy", 1500); } catch(x){} });
}
/* Every task in a lesson with its answer (not tied to a student): the worked example, the three lesson exercises,
   then every kind of question the lesson's exercises and practice are made from, each with a full example and its exact answer.
   Students get their own numbers, words and function names, but the method and the answer's shape are identical. */
let DATA = null;
async function lessonData(){
  if (DATA) return DATA;
  try { const t = await (await fetch("/python-pathways/index.html?v=" + Date.now(), { cache:"no-store" })).text(), i = t.indexOf("const DATA = ") + 13, j = t.indexOf("\n", i);
    DATA = JSON.parse(t.slice(i, j).replace(/;\s*$/, "")); } catch(e){ DATA = null; }
  return DATA;
}
function sample(A, path, g, grade){
  try { if (A.setGradeTheme) A.setGradeTheme(String(grade || "")); } catch(e){}
  for (let k = 0; k < 6; k++){
    try { const P = g.make(), Q = g.q(P), ex = A.exactAnswer(path, { g: g.id, P, gr: String(grade || ""), t: Q.title, tk: Q.task });
      if (ex && !ex.missing && ex.answer != null) return { title: ex.title || Q.title, task: ex.task || Q.task, answer: ex.answer, hints: Q.hints || [] }; } catch(e){}
  }
  return null;
}
const card = (tag, title, task, answer, extra) => {
  const id = "a" + Math.random().toString(36).slice(2, 9);
  return `<div class="ex"><div class="hd"><span class="pl">${esc(tag)}</span><span>${esc(title || "")}</span>${extra || ""}</div>
    ${task ? `<div class="tk">${esc(plain(task))}</div>` : ""}
    <div class="lbl">Answer <button type="button" class="cp" data-copy="${id}">Copy</button></div><pre id="${id}">${esc(answer)}</pre></div>`;
};
async function lessonAll(A, path, n, grade){
  style();
  if (!A || !A.exactAnswer || !A.LESSONS) return `<div class="ppav"><p class="note">The answer key is locked. The super admin opens it by signing in once; teachers then get it automatically the next time they sign in.</p></div>`;
  const L = (A.LESSONS[path] || [])[n - 1]; if (!L) return "";
  const D = await lessonData(), DL = D && D.lessons && D.lessons[path] && D.lessons[path][n - 1];
  let h = `<div class="ppav" data-path="${esc(path)}" data-lesson="${n}" data-grade="${esc(grade || "")}">`;
  if (DL && DL.example) h += `<details class="les" open><summary>Example (worked example from the lesson)</summary><div class="ex"><div class="lbl">Example code <button type="button" class="cp" data-copy="exm${n}">Copy</button></div><pre id="exm${n}">${esc(DL.example)}</pre></div></details>`;
  const fixed = ((A.FIXED || {})[path] || []);
  h += `<details class="les" open><summary>Exercise 1, 2 and 3</summary>` + (L.ex || []).map((q, k) => { const F = fixed[q - 1]; return F ? card("Exercise " + (k + 1), F.t, F.task, F.a) : ""; }).join("") + `</details>`;
  const gens = ((A.GEN || {})[path] || [])[n - 1] || [];
  h += `<details class="les" open><summary>Practice: every kind of question in this lesson (${gens.length})</summary><p class="muted small" style="margin:6px 0 0">Exercises and practice questions are made from these. Each student gets different numbers, words and a personal function name (e.g. <code>total_fox27</code>), but the answer is written the same way. Press <b>New example</b> for another one.</p>`;
  gens.forEach((g, i) => { const x = sample(A, path, g, grade);
    h += `<div class="ppav-g" data-g="${i}">` + (x ? card("Question type " + (i + 1), x.title, x.task, x.answer, `<button type="button" class="cp" data-new="${i}">🔄 New example</button>`) : `<div class="ex"><div class="note">No example available for question type ${i + 1}.</div></div>`) + `</div>`; });
  h += `</details></div>`;
  return h;
}
function bindAll(root, A){
  bind(root);
  root.querySelectorAll("[data-new]").forEach(b => b.onclick = e => { e.preventDefault(); e.stopPropagation();
    const box = b.closest(".ppav"), path = box.dataset.path, n = +box.dataset.lesson, i = +b.dataset.new, g = (((A.GEN || {})[path] || [])[n - 1] || [])[i];
    const x = g && sample(A, path, g, box.dataset.grade); if (!x) return;
    const wrap = b.closest(".ppav-g"); wrap.innerHTML = card("Question type " + (i + 1), x.title, x.task, x.answer, `<button type="button" class="cp" data-new="${i}">🔄 New example</button>`); bindAll(wrap, A); });
}
return { render, bind, plain, lessonAll, bindAll };
})();
