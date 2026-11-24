/* Python Pathways: SISD end-of-level certificates (Beginner, Intermediate, Advanced and the IB DP levels).
   A student who finishes every exercise in a level gets a "Download certificate" button. The certificate is drawn
   on a canvas and saved as a one-page A4 landscape PDF (no extra libraries needed). */
(function(){
  const NAVY = "#1B2D4E", RED = "#DC2B3E", INK = "#16223A", MUTED = "#5B6782", LINE = "#D8DEEA", SOFT = "#9AA7C2";
  const METAL = { b: ["#E7B48A", "#B87333", "#7A4A1E", "BRONZE"], i: ["#E4E9EF", "#8E9AA8", "#5C6775", "SILVER"], a: ["#F7E08A", "#C9A227", "#8A6A0C", "GOLD"] };
  const TIER = p => /advanced/.test(p) ? "a" : /intermediate/.test(p) ? "i" : "b";
  const SKILLS = {
    beginner: "print, variables, decisions and loops", intermediate: "functions, lists and dictionaries", advanced: "algorithms, recursion and classes",
    dp_beginner: "data types, strings, selection, loops, functions, lists, exceptions and files",
    dp_intermediate: "2D lists, stacks, queues, searching, sorting, Big O and classes",
    dp_advanced: "recursion, inheritance, polymorphism, linked lists, binary search trees and ADTs" };
  const VERB = { b: "to write working Python programs.", i: "to solve coding puzzles with well-organised Python code.", a: "to design and build complete Python programs." };
  const CODE = { b: ['print("Level complete!")', "# Beginner \u2713"], i: ["for skill in level:", "    mastered(skill)  # \u2713"], a: ["class Programmer:", '    level = "Advanced"  # \u2713'] };
  const LEVEL_WORD = { b: "Beginner", i: "Intermediate", a: "Advanced" };

  function levelProg(p){ return p === profile.path && prog ? prog : load("pyl_" + p + "_" + slug(profile.name), null); }
  function levelStats(p){
    const pr = levelProg(p) || { lessons:{} }, ls = DATA.lessons[p] || []; let total = 0, solved = 0;
    ls.forEach((L, i) => { const s = pr.lessons && pr.lessons[i + 1]; L.ex.forEach(q => { total++; if (s && s.solved && s.solved[q]) solved++; }); });
    return { total, solved, points: Math.max(0, solved * POINTS_EACH - (pr.spent || 0)) };
  }
  function doneAt(p){
    profile.certAt = profile.certAt || {};
    if (!profile.certAt[p]){ profile.certAt[p] = (profile.lvlCheered && profile.lvlCheered[p]) || Date.now(); try { saveAccount(profile); } catch(e){} }
    return profile.certAt[p];
  }
  function certNo(p, at){
    let h = 7; const s = (profile.email || profile.name || "") + "|" + p; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return "PP-" + (/^dp_/.test(p) ? "DP" : "") + TIER(p).toUpperCase() + "-" + new Date(at).getFullYear() + "-" + String(h % 10000).padStart(4, "0");
  }

  /* ---------- drawing (all sizes in mm on an A4 landscape page) ---------- */
  const W = 297, H = 210, PX = 8;   // 8 px per mm: 2376 \u00d7 1680 px
  function draw(p){
    const t = TIER(p), m = METAL[t], st = levelStats(p), at = doneAt(p), dp = /^dp_/.test(p);
    const cv = document.createElement("canvas"); cv.width = W * PX; cv.height = H * PX;
    const x = cv.getContext("2d"); x.scale(PX, PX); x.textBaseline = "alphabetic";
    const font = (w, s, f) => x.font = w + " " + s + "px " + (f || "Arial, Helvetica, sans-serif");
    const rr = (a, b, w, h, r) => { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); };
    const spaced = (txt, a, b, sp) => { for (const ch of txt){ x.fillText(ch, a, b); a += x.measureText(ch).width + sp; } return a; };
    x.fillStyle = "#fff"; x.fillRect(0, 0, W, H);
    // left band
    x.fillStyle = NAVY; x.fillRect(0, 0, 30, H * .62); x.fillStyle = RED; x.fillRect(0, H * .62, 30, H * .38);
    x.save(); x.translate(15, H / 2); x.rotate(-Math.PI / 2); x.fillStyle = "#fff"; font("900", 4.6);
    const band = dp ? "PYTHON PATHWAYS \u00b7 IB DP" : "PYTHON PATHWAYS"; let bw = 0; for (const ch of band) bw += x.measureText(ch).width + 2.2;
    spaced(band, -bw / 2, 1.6, 2.2); x.restore();
    // frames
    x.strokeStyle = NAVY; x.lineWidth = 2.2; rr(39.1, 10.1, 246.8, 188.8, 3); x.stroke();
    x.strokeStyle = m[1]; x.lineWidth = .6; rr(42.5, 13.5, 240, 182, 1.5); x.stroke();
    // code comment, top right
    x.fillStyle = SOFT; font("400", 3.2, "Menlo, Consolas, monospace"); x.textAlign = "right";
    x.fillText(CODE[t][0], 277, 21); x.fillText(CODE[t][1], 277, 25.8); x.textAlign = "left";
    // header
    const L = 50; x.fillStyle = RED; rr(L, 25, 24, 11, 2); x.fill();
    x.fillStyle = "#fff"; font("900", 6.2); x.textAlign = "center"; x.fillText("SISD", L + 12, 32.8); x.textAlign = "left";
    x.fillStyle = NAVY; font("700", 4.1); x.fillText("Swiss International Scientific School in Dubai", L + 29, 30);
    x.fillStyle = MUTED; font("400", 3.4); x.fillText("Computer Science \u00b7 SISD Design and Computing", L + 29, 34.6);
    // titles
    x.fillStyle = RED; font("900", 3.7); spaced("CERTIFICATE OF ACHIEVEMENT", L, 52, 1.1);
    const lvName = PATHS[p].name.replace(/\s*\(.*\)\s*$/, "");
    x.fillStyle = NAVY; font("900", 10.6); x.fillText("Python Pathways:", L, 63.5);
    x.fillStyle = m[2]; x.fillText(lvName, L, 75);
    // name
    x.fillStyle = MUTED; font("400", 4.2); x.fillText("This certifies that", L, 87);
    let ns = 11.6; font("700", ns); while (x.measureText(profile.name).width > 160 && ns > 7){ ns -= .4; font("700", ns); }
    x.fillStyle = INK; x.fillText(profile.name, L, 99.5);
    x.strokeStyle = LINE; x.lineWidth = .5; x.beginPath(); x.moveTo(L, 103.5); x.lineTo(L + 172, 103.5); x.stroke();
    // what they did (bold parts, wrapped)
    const segs = [["has completed all " + st.total + " exercises in the ", 0], [lvName, 1], [" level of Python Pathways, showing they can use ", 0], [SKILLS[p] || SKILLS[t === "a" ? "advanced" : t === "i" ? "intermediate" : "beginner"], 1], [" " + VERB[t], 0]];
    const words = []; segs.forEach(([s, b]) => s.split(/(\s+)/).forEach(w => { if (w) words.push([w, b]); }));
    let cx = L, cy = 112, maxW = 172, lh = 6.4; x.fillStyle = INK;
    words.forEach(([w, b]) => { font(b ? "700" : "400", 4.25); const ww = x.measureText(w).width;
      if (/^\s+$/.test(w)){ if (cx > L) cx += ww; return; }
      if (cx + ww > L + maxW){ cx = L; cy += lh; }
      x.fillStyle = b ? NAVY : INK; x.fillText(w, cx, cy); cx += ww; });
    // stat boxes
    const boxes = [["Grade " + (profile.grade || ""), "GRADE"], [st.solved + " / " + st.total, "EXERCISES COMPLETE"], [st.points.toLocaleString("en-GB"), "POINTS EARNED"],
      [new Date(at).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }), "DATE COMPLETED"]];
    let bx = L, by = cy + 8;
    boxes.forEach(([v, k]) => { font("700", 3); const kw = x.measureText(k).width + k.length * .25; font("700", 5.3); const bw2 = Math.max(36, x.measureText(v).width + 8, kw + 8);
      x.strokeStyle = LINE; x.lineWidth = .4; rr(bx, by, bw2, 15, 2.5); x.stroke();
      x.fillStyle = NAVY; x.fillText(v, bx + 4, by + 7.3); x.fillStyle = MUTED; font("700", 3); spaced(k, bx + 4, by + 11.8, .25); bx += bw2 + 4; });
    // medal + ribbons
    const sx = 251, sy = 79, R = 23;
    x.fillStyle = RED; x.beginPath(); x.moveTo(sx - 11, sy + 15); x.lineTo(sx - 1, sy + 15); x.lineTo(sx - 1, sy + 41); x.lineTo(sx - 6, sy + 36); x.lineTo(sx - 11, sy + 41); x.closePath(); x.fill();
    x.fillStyle = NAVY; x.beginPath(); x.moveTo(sx + 1, sy + 15); x.lineTo(sx + 11, sy + 15); x.lineTo(sx + 11, sy + 41); x.lineTo(sx + 6, sy + 36); x.lineTo(sx + 1, sy + 41); x.closePath(); x.fill();
    x.save(); x.shadowColor = "rgba(0,0,0,.2)"; x.shadowBlur = 3 * PX; x.shadowOffsetY = .8 * PX;
    const g = x.createRadialGradient(sx - 8, sy - 9, 2, sx, sy, R); g.addColorStop(0, m[0]); g.addColorStop(.55, m[1]); g.addColorStop(1, m[2]);
    x.fillStyle = g; x.beginPath(); x.arc(sx, sy, R, 0, Math.PI * 2); x.fill(); x.restore();
    x.strokeStyle = "rgba(255,255,255,.75)"; x.lineWidth = .5; x.setLineDash([1.4, 1]); x.beginPath(); x.arc(sx, sy, R - 3, 0, Math.PI * 2); x.stroke(); x.setLineDash([]);
    x.textAlign = "center"; x.fillStyle = "#fff"; x.shadowColor = "rgba(0,0,0,.3)"; x.shadowBlur = .8 * PX;
    font("900", dp ? 3 : 3.3); x.fillText((dp ? "IB DP " : "") + LEVEL_WORD[t].toUpperCase(), sx, sy - 4.5);
    font("900", 7, "Menlo, Consolas, monospace"); x.fillText(">_ py", sx, sy + 3.5);
    font("700", 2.7); x.fillText(m[3], sx, sy + 8.5); x.shadowBlur = 0; x.shadowColor = "transparent"; x.textAlign = "left";
    // signature
    const teacher = profile.teacher || "Mr. Ahmed";
    x.fillStyle = NAVY; font("400", 7.6, '"Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive'); x.fillText(teacher, L, 180);
    x.strokeStyle = NAVY; x.lineWidth = .4; x.beginPath(); x.moveTo(L, 183); x.lineTo(L + 62, 183); x.stroke();
    x.fillStyle = INK; font("700", 3.6); x.fillText(teacher, L, 187.5);
    x.fillStyle = MUTED; font("400", 3.6); x.fillText("Computer Science teacher", L, 191.8);
    x.fillStyle = SOFT; font("400", 3.1); x.textAlign = "right"; x.fillText("Certificate no. " + certNo(p, at), 277, 186.5); x.fillText("sisd.ae", 277, 191); x.textAlign = "left";
    return cv;
  }

  /* ---------- a one-page PDF holding the certificate as a JPEG ---------- */
  function pdfFromCanvas(cv){
    const b64 = cv.toDataURL("image/jpeg", .93).split(",")[1], bin = atob(b64), img = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) img[i] = bin.charCodeAt(i);
    const enc = s => new TextEncoder().encode(s), pw = 841.89, ph = 595.28;
    const content = "q " + pw + " 0 0 " + ph + " 0 0 cm /Im0 Do Q";
    const parts = [], offs = []; let len = 0; const push = u => { parts.push(u); len += u.length; };
    push(enc("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n"));
    const obj = (n, body, stream) => { offs[n] = len; push(enc(n + " 0 obj\n" + body + (stream ? "\nstream\n" : "\nendobj\n"))); if (stream){ push(stream); push(enc("\nendstream\nendobj\n")); } };
    obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
    obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
    obj(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + pw + " " + ph + "] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");
    obj(4, "<< /Type /XObject /Subtype /Image /Width " + cv.width + " /Height " + cv.height + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + img.length + " >>", img);
    obj(5, "<< /Length " + content.length + " >>", enc(content));
    const xref = len; let t = "xref\n0 6\n0000000000 65535 f \n"; for (let n = 1; n <= 5; n++) t += String(offs[n]).padStart(10, "0") + " 00000 n \n";
    push(enc(t + "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF"));
    return new Blob(parts, { type: "application/pdf" });
  }

  async function download(p){
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch(e){}
    const blob = pdfFromCanvas(draw(p)), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "SISD Python Pathways " + PATHS[p].name.replace(/\s*\(.*\)\s*$/, "") + " certificate - " + profile.name + ".pdf";
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    try { sfx("unlock"); } catch(e){}
  }

  /* certificate buttons next to "Save my progress file": one per level up to the one they're on.
     Grey and locked until every exercise in that level is solved; green and clickable once it is. */
  window.ppCertButtons = function(row, chain){
    const old = document.getElementById("certRow"); if (old) old.remove();
    const exp = document.getElementById("exportBtn"); let box = document.getElementById("certBtns");
    if (!box && exp){ box = document.createElement("span"); box.id = "certBtns"; box.style.cssText = "display:inline-flex;flex-wrap:wrap;gap:8px"; (exp.nextElementSibling && exp.nextElementSibling.tagName === "SPAN" ? exp.nextElementSibling : exp).insertAdjacentElement("afterend", box); }
    const upto = Math.max(0, chain.indexOf(profile.path)), levels = chain.slice(0, upto + 1), done = chain.filter(p => levelDone(p));
    if (box){
      box.innerHTML = levels.map(p => { const nm = PATHS[p].name.replace(/\s*\(.*\)\s*$/, ""), ok = levelDone(p), st = levelStats(p);
        return ok ? '<button class="btn" data-cert="' + p + '" style="background:#1E8A55;border-color:#1E8A55;color:#fff" title="Download your ' + nm + ' certificate (PDF)">\ud83c\udfc5 ' + nm + ' certificate</button>'
          : '<button class="btn" disabled style="background:#E3E7EE;border-color:#E3E7EE;color:#5B6782;cursor:not-allowed;opacity:1" title="Finish every exercise in ' + nm + ' to unlock your certificate (' + st.solved + ' of ' + st.total + ' done)">\ud83d\udd12 ' + nm + ' certificate (' + st.solved + '/' + st.total + ')</button>'; }).join("");
      box.querySelectorAll("[data-cert]").forEach(b => b.onclick = () => download(b.dataset.cert));
    }
    done.forEach(doneAt);
    // the last level has no "next level" pop-up, so congratulate once here
    done.filter(p => !LEVEL_NEXT[p]).forEach(p => {
      profile.certCheered = profile.certCheered || {}; if (profile.certCheered[p]) return;
      profile.certCheered[p] = Date.now(); try { saveAccount(profile); } catch(e){}
      const bg = document.createElement("div"), nm = PATHS[p].name.replace(/\s*\(.*\)\s*$/, ""); bg.className = "modal-bg";
      bg.innerHTML = '<div class="modal" style="text-align:center"><div style="font-size:3rem">\ud83c\udfc6</div><h2>You finished ' + nm + '!</h2><p style="margin-top:8px">Every exercise is done. Download your SISD certificate.</p><div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap"><button class="btn" id="cOk" style="background:#C9A227">\ud83c\udfc5 Download my certificate</button><button class="btn ghost" id="cNo">Later</button></div></div>';
      document.body.appendChild(bg);
      bg.querySelector("#cOk").onclick = () => { download(p); bg.remove(); }; bg.querySelector("#cNo").onclick = () => bg.remove();
    });
  };
  window.ppCertDownload = download;
})();
