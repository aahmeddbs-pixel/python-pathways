// Locks answers.js -> answers.enc.js (vault v2). The staff answer key can then only be opened with the admin password,
// or with the one-time recovery code (used by "Forgot password?" on the admin page).
// Usage: node encrypt_answers.js "<admin password>" ["<recovery code>"]      (omit the code to make a new one; it is printed once)
// answers.js is a local build file; never commit it.
const fs = require("fs"), { webcrypto: c } = require("crypto");
const b64 = u => Buffer.from(u).toString("base64"), enc = s => new TextEncoder().encode(s);
const ITER_PW = 1000000, ITER_RC = 300000, AAD = t => enc("pp-vault-v2|" + t);
const ALPHA = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function newCode(){ let s = ""; while (s.length < 25){ const b = c.getRandomValues(new Uint8Array(1))[0]; if (b < 248) s += ALPHA[b % 31]; } return s.match(/.{5}/g).join("-"); }
const norm = s => String(s).toUpperCase().replace(/[^A-Z0-9]/g, "");
async function kek(secret, salt, iter){ const base = await c.subtle.importKey("raw", enc(secret), "PBKDF2", false, ["deriveKey"]);
  return c.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-512" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]); }
async function wrap(secret, iter, dk, tag){ const salt = c.getRandomValues(new Uint8Array(16)), iv = c.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await c.subtle.encrypt({ name: "AES-GCM", iv, additionalData: AAD(tag) }, await kek(secret, salt, iter), dk));
  return { iter, salt: b64(salt), iv: b64(iv), ct: b64(ct) }; }
(async () => {
  const pw = process.argv[2]; if (!pw || pw.length < 10){ console.error("Give a strong password (10+ chars)"); process.exit(1); }
  const code = process.argv[3] || newCode(); if (norm(code).length !== 25){ console.error("Recovery code must have 25 letters/numbers"); process.exit(1); }
  const plain = enc(fs.readFileSync("answers.js", "utf8"));
  const dk = c.getRandomValues(new Uint8Array(32)), iv = c.getRandomValues(new Uint8Array(12));
  const key = await c.subtle.importKey("raw", dk, "AES-GCM", false, ["encrypt"]);
  const ct = new Uint8Array(await c.subtle.encrypt({ name: "AES-GCM", iv, additionalData: AAD("data") }, key, plain));
  const V = { v: 2, gen: 1, pw: await wrap(pw, ITER_PW, dk, "pw"), rc: await wrap(norm(code), ITER_RC, dk, "rc"), iv: b64(iv), ct: b64(ct) };
  fs.writeFileSync("answers.enc.js", "window.PP_ENC = " + JSON.stringify(V) + ";\n");
  console.log("answers.enc.js written (" + ct.length + " bytes)"); if (!process.argv[3]) console.log("RECOVERY CODE: " + code);
})();
