// Re-locks an updated answers.js with the SAME key, so the admin password and recovery code keep working.
// Usage: node reencrypt_answers.js "<admin password OR recovery code>"     (answers.js is a local build file; never commit it)
const fs = require("fs"), { webcrypto: c } = require("crypto");
const enc = s => new TextEncoder().encode(s), b = s => Uint8Array.from(Buffer.from(s, "base64")), b64 = u => Buffer.from(u).toString("base64");
const AAD = t => enc("pp-vault-v2|" + t), norm = s => String(s).toUpperCase().replace(/[^A-Z0-9]/g, "");
(async () => {
  const E = JSON.parse(fs.readFileSync("answers.enc.js", "utf8").replace(/^window\.PP_ENC = /, "").replace(/;\s*$/, ""));
  let dk = null;
  for (const [tag, secret] of [["pw", process.argv[2]], ["rc", norm(process.argv[2] || "")]]){
    try { const base = await c.subtle.importKey("raw", enc(secret), "PBKDF2", false, ["deriveKey"]);
      const k = await c.subtle.deriveKey({ name: "PBKDF2", salt: b(E[tag].salt), iterations: E[tag].iter, hash: "SHA-512" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      dk = new Uint8Array(await c.subtle.decrypt({ name: "AES-GCM", iv: b(E[tag].iv), additionalData: AAD(tag) }, k, b(E[tag].ct))); break; } catch(e){}
  }
  if (!dk){ console.error("Wrong password or recovery code"); process.exit(1); }
  const key = await c.subtle.importKey("raw", dk, "AES-GCM", false, ["encrypt"]), iv = c.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await c.subtle.encrypt({ name: "AES-GCM", iv, additionalData: AAD("data") }, key, enc(fs.readFileSync("answers.js", "utf8"))));
  E.iv = b64(iv); E.ct = b64(ct);
  fs.writeFileSync("answers.enc.js", "window.PP_ENC = " + JSON.stringify(E) + ";\n");
  console.log("answers.enc.js re-locked (" + ct.length + " bytes), same password and recovery code");
})();
