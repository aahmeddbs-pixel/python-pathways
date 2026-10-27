// Recreates answers.js (the readable staff answer key) from answers.enc.js, for editing locally.
// Usage: node decrypt_answers.js "<admin password>"   -> writes answers.js (NEVER commit answers.js or answers-sol.js)
const fs = require("fs"), { webcrypto: c } = require("crypto");
(async () => {
  const pw = process.argv[2], E = JSON.parse(fs.readFileSync("answers.enc.js", "utf8").replace(/^window\.PP_ENC = /, "").replace(/;\s*$/, ""));
  const b = s => Uint8Array.from(Buffer.from(s, "base64"));
  const base = await c.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
  const key = await c.subtle.deriveKey({ name: "PBKDF2", salt: b(E.salt), iterations: E.iter, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  fs.writeFileSync("answers.js", new TextDecoder().decode(await c.subtle.decrypt({ name: "AES-GCM", iv: b(E.iv) }, key, b(E.ct))));
  console.log("answers.js recreated");
})();
