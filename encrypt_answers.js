// Encrypts answers.js -> answers.enc.js so the staff answer key can only be opened with the admin password.
// Usage: node encrypt_answers.js "<admin password>"      (answers.js is a local build file; never commit it)
const fs = require("fs"), { webcrypto: c } = require("crypto");
(async () => {
  const pw = process.argv[2]; if (!pw || pw.length < 10) { console.error("Give a strong password (10+ chars)"); process.exit(1); }
  const plain = new TextEncoder().encode(fs.readFileSync("answers.js", "utf8"));
  const salt = c.getRandomValues(new Uint8Array(16)), iv = c.getRandomValues(new Uint8Array(12));
  const base = await c.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
  const key = await c.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
  const ct = new Uint8Array(await c.subtle.encrypt({ name: "AES-GCM", iv }, key, plain));
  const b64 = u => Buffer.from(u).toString("base64");
  fs.writeFileSync("answers.enc.js", "window.PP_ENC = " + JSON.stringify({ v: 1, iter: 250000, salt: b64(salt), iv: b64(iv), ct: b64(ct) }) + ";\n");
  console.log("answers.enc.js written", ct.length, "bytes");
})();
