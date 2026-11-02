/* Python Pathways admin: record your own voice for the videos.
   The video plays (muted) while you read the script, so your recording lines up with it exactly.
   Download the file and upload it to the repository's "voice" folder (or send it to be uploaded):
   students then hear your voice instead of the computer voice. */
(function(){
"use strict";
const $ = id => document.getElementById(id);
const esc = t => String(t == null ? "" : t).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const LEVELS = { beginner:"Beginner", intermediate:"Intermediate", advanced:"Advanced", dp_beginner:"IB DP Beginner", dp_intermediate:"IB DP Intermediate", dp_advanced:"IB DP Advanced" };
const EXTS = ["webm", "m4a", "mp4", "mp3", "ogg"];
const UPLOAD = "https://github.com/aahmeddbs-pixel/python-pathways/upload/main/voice";
let VIDEOS = null;   // [{name, label, src, poster, caps:[[t, text]]}]

async function loadVideos(){
  if (VIDEOS) return VIDEOS;
  const html = await (await fetch("index.html", { cache:"no-store" })).text();
  const grab = (re) => { const m = html.match(re); if (!m) throw new Error("script"); return JSON.parse(m[1]); };
  const concepts = grab(/const CONCEPTS = (\{[\s\S]*?\});\n/);
  const howCaps = grab(/const HOWTO_CAPS = (\[[\s\S]*?\]);\n/), howSay = grab(/const HOWTO_SAY = (\[[\s\S]*?\]);\n/);
  const out = [{ name:"how-it-works", label:"How Python Pathways works (welcome video)", src:"how-it-works.mp4", poster:"how-it-works-poster.jpg", caps: howCaps.map((c, k) => [c[0], howSay[k] || c[1]]) }];
  Object.keys(LEVELS).forEach(lv => (concepts[lv] || []).forEach((c, i) => {
    const n = i + 1, first = (c.caps && c.caps[0] && c.caps[0].text) || c.idea || "";
    out.push({ name: lv + "-" + n, label: LEVELS[lv] + " · Lesson " + n + ": " + first.slice(0, 60) + (first.length > 60 ? "…" : ""), src:"videos/" + lv + "-" + n + ".mp4", poster:"videos/" + lv + "-" + n + ".jpg", caps:(c.caps || []).map(x => [x.t, x.text]) });
  }));
  return (VIDEOS = out);
}
async function existing(name){
  for (const x of EXTS){ try { const r = await fetch("voice/" + name + "." + x, { method:"HEAD", cache:"no-store" }); if (r.ok) return name + "." + x; } catch(e){} }
  return "";
}
function pickMime(){
  const opts = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
  for (const m of opts){ try { if (window.MediaRecorder && MediaRecorder.isTypeSupported(m)) return m; } catch(e){} }
  return "";
}
const extOf = m => /mp4/.test(m) ? "m4a" : /ogg/.test(m) ? "ogg" : "webm";

function build(){
  const box = $("voiceBox"); if (!box || box.dataset.ready) return; box.dataset.ready = "1";
  const body = box.querySelector(".vrBody");
  body.innerHTML = `<p class="small" style="margin:8px 0;padding:8px 12px;border-radius:10px;background:#FFF2DC"><b>New:</b> record all videos for every course in one place, and save them as one file, in the <a href="/sisd-design-and-computing/voice-studio.html" target="_blank" rel="noopener"><b>Voice Studio</b></a>.</p><p class="muted small" style="margin:8px 0">Students hear <b>your own voice</b> on a video once you've recorded it. Choose a video, press <b>Record</b> and read the script out loud while the video plays: the words to say are highlighted at the right moment. Use a quiet room and a headset if you have one.</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><select class="t" id="vrSel" style="max-width:100%;min-width:280px"><option>Loading the videos…</option></select><span id="vrHave" class="small" style="font-weight:700"></span></div>
    <div class="vrGrid" style="display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);gap:14px;margin-top:12px">
      <div><video id="vrVid" playsinline preload="metadata" muted style="width:100%;border-radius:12px;background:#000;display:block"></video>
        <div id="vrCount" style="font-size:2.4rem;font-weight:800;text-align:center;min-height:0"></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
          <button class="btn red" id="vrRec">● Record</button><button class="btn ghost hidden" id="vrStop">■ Stop</button>
          <button class="btn ghost hidden" id="vrPlay">▶ Play back with the video</button><a class="btn green hidden" id="vrDl" download>⬇ Download my recording</a>
        </div>
        <div id="vrMsg" class="small" style="margin-top:8px;font-weight:700"></div></div>
      <div><div class="small" style="font-weight:800;margin-bottom:6px">Script: read each line when it lights up</div><ol id="vrScript" style="margin:0;padding-left:20px;max-height:360px;overflow:auto"></ol></div>
    </div>
    <div id="vrHow" class="hidden" style="margin-top:14px;padding:12px 14px;border-radius:12px;background:#eef1f7">
      <b>Put it on the site (2 minutes):</b>
      <ol style="margin:6px 0 0;padding-left:20px" class="small">
        <li>Press <b>Download my recording</b>. Keep the file name exactly as it is (<b id="vrName"></b>).</li>
        <li>Open <a href="${UPLOAD}" target="_blank" rel="noopener">the voice folder upload page</a> (sign in to GitHub if asked).</li>
        <li>Drag the file onto the page and press <b>Commit changes</b>.</li>
      </ol>
      <p class="small muted" style="margin:6px 0 0">Students hear your voice within a few minutes. Or send the file to Claude and it will be uploaded for you. To replace a recording, upload a new one with the same name.</p></div>`;
  { const st = document.createElement("style"); st.textContent = "#vrScript li{padding:4px 6px;border-radius:8px;margin-bottom:4px;line-height:1.4}#vrScript li.on{background:#FFF2DC;font-weight:700}#vrScript li .tm{color:#5B6782;font-size:.78rem;margin-right:6px}@media(max-width:760px){.vrGrid{grid-template-columns:1fr!important}}"; document.head.appendChild(st); }
  const sel = $("vrSel"), v = $("vrVid"), msg = t => $("vrMsg").innerHTML = t;
  let cur = null, rec = null, chunks = [], stream = null, blobUrl = "", audio = null, recording = false;
  const fmt = s => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  const paintScript = () => { $("vrScript").innerHTML = (cur.caps || []).map((c, i) => `<li data-i="${i}"><span class="tm">${fmt(c[0])}</span>${esc(c[1])}</li>`).join(""); };
  const highlight = () => { if (!cur) return; let k = 0; cur.caps.forEach((c, i) => { if (v.currentTime >= c[0]) k = i; });
    $("vrScript").querySelectorAll("li").forEach((li, i) => { const on = i === k; if (on && !li.classList.contains("on")) li.parentNode.scrollTop = Math.max(0, li.offsetTop - li.parentNode.offsetTop - 40); li.classList.toggle("on", on); }); };
  v.addEventListener("timeupdate", highlight);
  const reset = () => { if (audio){ audio.pause(); audio = null; } if (blobUrl){ URL.revokeObjectURL(blobUrl); blobUrl = ""; }
    ["vrPlay", "vrDl", "vrStop"].forEach(x => $(x).classList.add("hidden")); $("vrHow").classList.add("hidden"); $("vrRec").classList.remove("hidden"); $("vrRec").textContent = "● Record"; msg(""); };
  const choose = async () => {
    reset(); cur = VIDEOS[+sel.value]; v.pause(); v.src = cur.src; v.poster = cur.poster; v.currentTime = 0; paintScript(); highlight();
    $("vrHave").textContent = "Checking…"; const f = await existing(cur.name);
    if (cur === VIDEOS[+sel.value]) $("vrHave").innerHTML = f ? `<span style="color:#1E6B45">✓ Your voice is live on this video (${esc(f)})</span>` : `<span class="muted">Not recorded yet: students hear the computer voice</span>`;
  };
  loadVideos().then(list => { sel.innerHTML = list.map((x, i) => `<option value="${i}">${esc(x.label)}</option>`).join(""); choose(); })
    .catch(() => { sel.innerHTML = "<option>Couldn't load the video list</option>"; });
  sel.onchange = () => { if (!recording) choose(); else sel.value = String(VIDEOS.indexOf(cur)); };
  const finish = () => { if (!recording) return; recording = false; try { rec.stop(); } catch(e){} v.pause(); $("vrStop").classList.add("hidden"); };
  v.addEventListener("ended", finish);
  $("vrStop").onclick = finish;
  $("vrRec").onclick = async () => {
    if (!cur) return;
    if (!window.MediaRecorder || !navigator.mediaDevices){ msg("This browser can't record sound. Use Chrome or Edge on a laptop."); return; }
    reset();
    try { stream = await navigator.mediaDevices.getUserMedia({ audio:{ echoCancellation:true, noiseSuppression:true, autoGainControl:true } }); }
    catch(e){ msg("Allow the microphone when your browser asks, then press Record again."); return; }
    const mime = pickMime(); chunks = [];
    rec = new MediaRecorder(stream, mime ? { mimeType:mime, audioBitsPerSecond:64000 } : undefined);
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      const type = rec.mimeType || mime || "audio/webm", blob = new Blob(chunks, { type }), file = cur.name + "." + extOf(type);
      blobUrl = URL.createObjectURL(blob); $("vrDl").href = blobUrl; $("vrDl").download = file; $("vrName").textContent = file;
      ["vrPlay", "vrDl"].forEach(x => $(x).classList.remove("hidden")); $("vrHow").classList.remove("hidden");
      $("vrRec").classList.remove("hidden"); $("vrRec").textContent = "● Record again";
      msg(`Recorded ${fmt(v.currentTime)}. Press <b>Play back</b> to check it, then <b>Download</b>.`);
    };
    $("vrRec").classList.add("hidden"); sel.disabled = true;
    v.muted = true; v.pause(); v.currentTime = 0; highlight();
    for (const n of ["3", "2", "1"]){ $("vrCount").textContent = n; await new Promise(r => setTimeout(r, 800)); }
    $("vrCount").textContent = ""; sel.disabled = false;
    recording = true; rec.start(250); v.play().catch(() => {}); $("vrStop").classList.remove("hidden");
    msg("🔴 Recording… read each highlighted line. It stops by itself at the end of the video.");
  };
  $("vrPlay").onclick = () => {
    if (!blobUrl) return;
    if (audio && !audio.paused){ audio.pause(); v.pause(); $("vrPlay").textContent = "▶ Play back with the video"; return; }
    audio = audio || new Audio(blobUrl); audio.currentTime = 0; v.currentTime = 0; v.muted = true;
    audio.onended = () => { v.pause(); $("vrPlay").textContent = "▶ Play back with the video"; };
    v.play().catch(() => {}); audio.play().catch(() => {}); $("vrPlay").textContent = "❚❚ Stop playback";
  };
}
document.addEventListener("toggle", e => { if (e.target && e.target.id === "voiceBox" && e.target.open) build(); }, true);
})();
