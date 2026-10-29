"""Rebuild the staff answer key from index.html + answers-sol.js, then encrypt it.
answers-sol.js and answers.js are private and are NOT stored in this public repo (see .gitignore).
To get them back:  node decrypt_answers.js "<admin password>"   (recreates answers.js, which contains the SOL code)
After editing:      python3 build_answers.py  then  node encrypt_answers.js "<admin password>"  and commit only answers.enc.js"""
import json, re
s = open("index.html", encoding="utf-8").read()
# exercise generators live in the first <script> block
a = s.index("<script>") + len("<script>")
gen = s[a:s.index("</script>", a)]
gen = gen.replace('if (typeof module !== "undefined") module.exports = {GEN, R, py, setGradeTheme};', "")
i = s.index("const DATA = ") + len("const DATA = ")
data, _ = json.JSONDecoder().raw_decode(s[i:])
lessons = {lv: [{"title": L["title"], "goal": L.get("goal", "")} for L in data["lessons"][lv]] for lv in data["lessons"]}
lad = open("ladders.js", encoding="utf-8").read()   # public exercise ladders (Exercise 1-10 per lesson)
sol = open("answers-sol.js", encoding="utf-8").read()
out = ("/* AUTO-BUILT by build_answers.py - do not edit by hand. Staff answer key for Python Pathways. */\n"
       "window.PPAnswers = (function(){\n" + gen + "\n" + lad + "\n" + sol +
       "\nconst LESSONS = " + json.dumps(lessons) + ";\n"
       "return {GEN, LADDER, L_STAGES, setGradeTheme, answerFor, LESSONS, SOL};\n})();\n")
open("answers.js", "w", encoding="utf-8").write(out)
print("answers.js", len(out), "bytes")
