// Recreates answers.js (the readable staff answer key) from answers.enc.js, for editing locally.
// Usage: node decrypt_answers.js "<admin password OR recovery code>"   -> writes answers.js (NEVER commit answers.js or answers-sol.js)
const fs = require("fs"), { webcrypto: c } = require("crypto");
const enc = s => new TextEncoder().encode(s), b = s => Uint8Array.from(Buffer.from(s, "base64")), AAD = t => enc("pp-vault-v2|" + t);
const norm = s => String(s).toUpperCase().replace(/[^A-Z0-9]/g, "");
(async () => {
  const E = JSON.parse(fs.readFileSync("answers.enc.js", "utf8").replace(/^window\.PP_ENC = /, "").replace(/;\s*$/, ""));
  let dk = null;
  for (const [tag, secret] of [["pw", process.argv[2]], ["rc", norm(process.argv[2] || "")]]){
    try { const base = await c.subtle.importKey("raw", enc(secret), "PBKDF2", false, ["deriveKey"]);
      const k = await c.subtle.deriveKey({ name: "PBKDF2", salt: b(E[tag].salt), iterations: E[tag].iter, hash: "SHA-512" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      dk = new Uint8Array(await c.subtle.decrypt({ name: "AES-GCM", iv: b(E[tag].iv), additionalData: AAD(tag) }, k, b(E[tag].ct))); break; } catch(e){}
  }
  if (!dk){ console.error("Wrong password or recovery code"); process.exit(1); }
  const key = await c.subtle.importKey("raw", dk, "AES-GCM", false, ["decrypt"]);
  fs.writeFileSync("answers.js", new TextDecoder().decode(await c.subtle.decrypt({ name: "AES-GCM", iv: b(E.iv), additionalData: AAD("data") }, key, b(E.ct))));
  console.log("answers.js recreated");
})();
