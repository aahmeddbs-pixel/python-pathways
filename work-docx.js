/* SISD Design and Computing: "Download my work" as a Word document (.docx), made in the browser.
   Shared by Python Pathways and the Game Development unit. Same builder as the Design course report.
   WorkDocx.build({ year, title, name, teacher, unit, blocks:[{k:"h1"|"h2"|"h3"|"lab"|"p"|"note"|"li"|"code"|"table"|"img", ...}] }) → Blob */
(function(){
"use strict";
const XE = t => String(t == null ? "" : t).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c])).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
const CRC32 = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++){ let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return u8 => { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = t[(c ^ u8[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }; })();
function zipStore(files){   // [{name, data:Uint8Array}] → Blob (no compression)
  const te = new TextEncoder(), parts = [], central = []; let off = 0;
  for (const f of files){ const name = te.encode(f.name), d = f.data, crc = CRC32(d);
    const h = new DataView(new ArrayBuffer(30)); h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint32(14, crc, true); h.setUint32(18, d.length, true); h.setUint32(22, d.length, true); h.setUint16(26, name.length, true);
    parts.push(h.buffer, name, d);
    const c = new DataView(new ArrayBuffer(46)); c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint32(16, crc, true); c.setUint32(20, d.length, true); c.setUint32(24, d.length, true); c.setUint16(28, name.length, true); c.setUint32(42, off, true);
    central.push(c.buffer, name); off += 30 + name.length + d.length; }
  const cs = central.reduce((a, b) => a + (b.byteLength || b.length), 0), e = new DataView(new ArrayBuffer(22));
  e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cs, true); e.setUint32(16, off, true);
  return new Blob([...parts, ...central, e.buffer], { type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
}
const imgSize = src => new Promise(res => { const im = new Image(); im.onload = () => res([im.naturalWidth || 800, im.naturalHeight || 600]); im.onerror = () => res([800, 600]); im.src = src; });
async function build(R){
  const te = new TextEncoder(), media = [], rels = [];
  const run = (t, o) => `<w:r>${o ? `<w:rPr>${o}</w:rPr>` : ""}<w:t xml:space="preserve">${XE(t)}</w:t></w:r>`;
  const par = (t, style, o) => `<w:p>${style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : ""}${run(t, o)}</w:p>`;
  let body = "";
  body += `<w:p><w:pPr><w:spacing w:before="3600"/></w:pPr></w:p>` + par(R.year, "Subtitle") + par(R.title, "Title") + par(R.name + (R.teacher ? "  ·  " + R.teacher : ""), null, `<w:sz w:val="26"/>`) + (R.unit !== R.title ? par(R.unit, null, `<w:i/>`) : "") + par(new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" }), null, `<w:color w:val="5B6782"/>`);
  let id = 1;
  for (const b of R.blocks){
    if (b.k === "h1") body += `<w:p><w:r><w:br w:type="page"/></w:r></w:p>` + par(b.t, "Heading1");
    else if (b.k === "h2") body += par(b.t, "Heading2");
    else if (b.k === "h3") body += par(b.t, "Heading3");
    else if (b.k === "p") body += par(b.t);
    else if (b.k === "note") body += par(b.t, "Note");
    else if (b.k === "lab") body += `<w:p><w:pPr><w:keepNext/><w:spacing w:before="120" w:after="40"/></w:pPr>${run(b.t, `<w:b/><w:color w:val="1B2D4E"/>`)}</w:p>`;
    else if (b.k === "li") body += par("•  " + b.t, "ListPara");
    else if (b.k === "code"){ const L = String(b.t == null ? "" : b.t).replace(/\t/g, "    ").split("\n");
      body += `<w:p><w:pPr><w:pStyle w:val="Code"/></w:pPr>${L.map((l, i) => (i ? `<w:r><w:br/></w:r>` : "") + `<w:r><w:t xml:space="preserve">${XE(l)}</w:t></w:r>`).join("")}</w:p>`; }
    else if (b.k === "table"){
      const cell = (t, head) => `<w:tc><w:tcPr>${head ? `<w:shd w:val="clear" w:color="auto" w:fill="1B2D4E"/>` : ""}</w:tcPr><w:p>${run(t, head ? `<w:b/><w:color w:val="FFFFFF"/>` : "")}</w:p></w:tc>`;
      body += `<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${["top","left","bottom","right","insideH","insideV"].map(s => `<w:${s} w:val="single" w:sz="4" w:space="0" w:color="BFC7D5"/>`).join("")}</w:tblBorders><w:tblCellMar><w:left w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr>` +
        `<w:tr><w:trPr><w:tblHeader/></w:trPr>${b.head.map(h => cell(h, true)).join("")}</w:tr>` + b.rows.map(r => `<w:tr>${b.head.map((_, k) => cell(r[k] || "", false)).join("")}</w:tr>`).join("") + `</w:tbl>` + par("");
    } else if (b.k === "img"){
      const m = /^data:image\/(\w+);base64,(.*)$/.exec(b.src || ""); if (!m) continue;
      const ext = m[1] === "png" ? "png" : "jpeg", bin = atob(m[2]), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      const n = media.length + 1, rid = "rIdImg" + n; media.push({ name:`word/media/image${n}.${ext}`, data:u8 }); rels.push(`<Relationship Id="${rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image${n}.${ext}"/>`);
      const [w, h] = await imgSize(b.src), maxW = 6000000, cx = Math.min(maxW, w * 9525), cy = Math.round(cx * h / w), cyMax = 4800000, sc = cy > cyMax ? cyMax / cy : 1, X = Math.round(cx * sc), Yy = Math.round(cy * sc);
      body += `<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${X}" cy="${Yy}"/><wp:docPr id="${id}" name="Picture ${id}"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${id}" name="image${n}.${ext}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${X}" cy="${Yy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>` + par(b.cap, "Caption");
      id++;
    }
  }
  const doc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const st = (id, name, o, p, based) => `<w:style w:type="paragraph"${id === "Normal" ? ' w:default="1"' : ""} w:styleId="${id}"><w:name w:val="${name}"/>${based ? `<w:basedOn w:val="${based}"/>` : ""}<w:qFormat/>${p ? `<w:pPr>${p}</w:pPr>` : ""}<w:rPr>${o}</w:rPr></w:style>`;
  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="22"/><w:color w:val="16223A"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>` +
    st("Normal", "Normal", "") + st("Title", "Title", `<w:b/><w:sz w:val="52"/><w:color w:val="1B2D4E"/>`, `<w:spacing w:after="240"/>`) + st("Subtitle", "Subtitle", `<w:caps/><w:sz w:val="22"/><w:color w:val="DC2B3E"/>`) +
    st("Heading1", "heading 1", `<w:b/><w:sz w:val="36"/><w:color w:val="1B2D4E"/>`, `<w:keepNext/><w:spacing w:before="240" w:after="160"/><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="4" w:color="DC2B3E"/></w:pBdr><w:outlineLvl w:val="0"/>`) +
    st("Heading2", "heading 2", `<w:b/><w:sz w:val="28"/><w:color w:val="1B2D4E"/>`, `<w:keepNext/><w:spacing w:before="280" w:after="100"/><w:outlineLvl w:val="1"/>`) +
    st("Heading3", "heading 3", `<w:b/><w:sz w:val="23"/>`, `<w:keepNext/><w:spacing w:before="180" w:after="60"/><w:outlineLvl w:val="2"/>`) +
    st("Code", "Code", `<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:sz w:val="19"/><w:color w:val="16223A"/>`, `<w:shd w:val="clear" w:color="auto" w:fill="F1F4F9"/><w:pBdr><w:left w:val="single" w:sz="18" w:space="6" w:color="1B6FD1"/></w:pBdr><w:spacing w:before="60" w:after="160" w:line="252" w:lineRule="auto"/><w:ind w:left="170"/>`) +
    st("Note", "Note", `<w:i/><w:sz w:val="19"/><w:color w:val="5B6782"/>`) + st("ListPara", "List Paragraph", "", `<w:ind w:left="360"/><w:spacing w:after="60"/>`) +
    st("Caption", "caption", `<w:i/><w:sz w:val="18"/><w:color w:val="5B6782"/>`, `<w:jc w:val="center"/>`) +
    `<w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont"><w:name w:val="Default Paragraph Font"/><w:uiPriority w:val="1"/><w:semiHidden/></w:style><w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style><w:style w:type="table" w:styleId="TableGrid"><w:name w:val="Table Grid"/><w:basedOn w:val="TableNormal"/><w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tblBorders></w:tblPr></w:style></w:styles>`;
  const files = [
    { name:"[Content_Types].xml", data: te.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`) },
    { name:"_rels/.rels", data: te.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`) },
    { name:"docProps/core.xml", data: te.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${XE(R.title)}</dc:title><dc:creator>${XE(R.name)}</dc:creator></cp:coreProperties>`) },
    { name:"word/_rels/document.xml.rels", data: te.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>${rels.join("")}</Relationships>`) },
    { name:"word/styles.xml", data: te.encode(styles) },
    { name:"word/document.xml", data: te.encode(doc) },
    ...media
  ];
  return zipStore(files);
}
function save(blob, name){ const u = URL.createObjectURL(blob), a = document.createElement("a"); a.href = u; a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(u); a.remove(); }, 2000); }
const fileName = s => String(s || "").replace(/[\\/:*?"<>|]+/g, " ").replace(/\s+/g, " ").trim();
const htmlText = h => { const d = document.createElement("div"); d.innerHTML = String(h || "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|div|li|pre|h\d)>/gi, "\n$&").replace(/<(p|div|li|pre|h\d)(\s[^>]*)?>/gi, "\n$&"); return (d.textContent || "").replace(/\n{3,}/g, "\n\n").trim(); };
window.WorkDocx = { build, save, fileName, htmlText };
})();
