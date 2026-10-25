/* AUTO-BUILT by build_answers.py - do not edit by hand. Staff answer key for Python Pathways. */
window.PPAnswers = (function(){

// Unlimited practice generators. Each: {id, make() -> params, q(p) -> {title, task, hints, starter, tests, sample}}
// Expected answers are computed here in JS; checks run in Python via the harness helpers.
const R = {
  int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
  pick: a => a[Math.floor(Math.random() * a.length)],
  shuffle: a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  sample: (a, k) => R.shuffle(a).slice(0, k),
  list: (n, a, b) => Array.from({length: n}, () => R.int(a, b))
};
function py(v) {
  if (v === null || v === undefined) return "None";
  if (v === true) return "True";
  if (v === false) return "False";
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : String(v);
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(py).join(", ") + "]";
  if (v.__tuple) return "(" + v.__tuple.map(py).join(", ") + (v.__tuple.length === 1 ? "," : "") + ")";
  if (v.__dict) return "{" + v.__dict.map(([k, x]) => py(k) + ": " + py(x)).join(", ") + "}";
  return "{" + Object.keys(v).map(k => JSON.stringify(k) + ": " + py(v[k])).join(", ") + "}";
}
const T = a => ({__tuple: a});
const D = pairs => ({__dict: pairs});
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const c = s => "<code>" + esc(s) + "</code>";
const pre = s => "<pre>" + esc(s) + "</pre>";
// check-building helpers
const callStr = (name, args) => name + "(" + args.map(py).join(", ") + ")";
const eqLine = (name, args, exp) => "eq(" + callStr(name, args) + ", " + py(exp) + ", " + JSON.stringify(callStr(name, args)) + ")";
const fnCheck = (name, cases, extra) => 'need("' + name + '")\n' + (extra ? extra + "\n" : "") + cases.map(([a, e]) => eqLine(name, a, e)).join("\n");
const lines = arr => "lines_are(" + py(arr.map(String)) + ")";
const uses = (t, m) => "uses(" + JSON.stringify(t) + ", " + JSON.stringify(m) + ")";
const ST = "# Write your code below\n";
const FN = (sig) => "def " + sig + ":\n    # your code here\n    pass\n";

const WORDS = ["apple", "rocket", "pizza", "dragon", "planet", "guitar", "tiger", "laptop", "garden", "window", "pencil", "castle", "banana", "falcon", "jungle", "camera", "orange", "puzzle", "school", "summer"];
const NAMES = ["Ali", "Sara", "Omar", "Mia", "Leo", "Ava", "Zain", "Noor", "Adam", "Lina", "Yusuf", "Hana", "Sam", "Ella", "Rami", "Tia", "Fatima", "Ahmed", "Layla", "Hamza", "Maya", "Karim", "Aisha", "Ethan", "Sofia", "Ibrahim", "Chloe", "Rayan", "Amira", "Lucas", "Zara", "Daniel", "Mariam", "Nikhil", "Priya", "Jonas", "Elena", "Tariq", "Yara", "Mateo", "Huda", "Kai", "Salma", "Arjun", "Nadia", "Felix", "Reem", "Oscar", "Dana", "Hugo"];
const PHRASES = ["Coding is cool", "I love Python", "Today is a great day", "Practice makes progress", "Hello from Dubai", "Robots are awesome", "Never give up", "Learning every day", "Keep calm and code on", "Maths is magic"];
/* Grade themes: practice questions use words and phrases suited to each grade, and number sizes grow with the grade. */
let LV = 1;
const THEMES = {
  "6": {words: ["puppy", "kitten", "banana", "mango", "football", "rocket", "pizza", "dragon", "robot", "unicorn", "pencil", "rainbow", "castle", "dolphin", "panda", "cookie", "comic", "balloon", "jungle", "pirate", "parrot", "tractor", "cupcake", "penguin", "sandcastle", "spaceship", "teddy", "waffle", "scooter", "popcorn", "koala", "jellyfish", "treehouse", "lollipop", "dinosaur", "firework", "kangaroo", "pancake", "snowman", "volcano", "octopus", "hamster", "bicycle", "giraffe", "sunflower", "lemonade", "crayon", "hedgehog", "marble", "starfish", "pickle", "tiger", "camel", "falcon", "rabbit", "dragonfly", "notebook", "sneaker", "pumpkin", "bubble"],
        phrases: ["I love coding", "Pandas are cute", "Robots can dance", "Pizza is yummy", "Coding is fun", "Dragons can fly", "My cat can code", "Rainbows are bright", "Let's go on an adventure", "Cookies make me happy", "Penguins love ice", "My dog likes to dance", "Camels walk in the desert", "I can ride a scooter", "Pancakes are tasty", "Dinosaurs were huge", "Koalas sleep a lot", "Snowmen melt in Dubai", "Giraffes have long necks", "My robot loves pizza", "The moon is shining", "I built a sandcastle", "Octopuses have eight arms", "Sunflowers love sunshine", "Falcons fly very fast", "Bubbles float away", "Popcorn goes pop", "Rabbits hop around", "Our class is awesome", "Unicorns love rainbows", "Hamsters run on wheels", "I drew a dragon", "Lemonade is sweet", "The jungle is noisy", "Starfish live in the sea", "Pirates hide treasure", "Fireworks light the sky", "Pumpkins are orange", "Treehouses are fun", "My teddy is brave"]},
  "7": {words: ["planet", "galaxy", "comet", "guitar", "stadium", "trophy", "volcano", "satellite", "drummer", "marathon", "penalty", "orbit", "asteroid", "referee", "festival", "tennis", "cricket", "piano", "meteor", "league", "skateboard", "telescope", "nebula", "quarterback", "dribble", "stopwatch", "goalkeeper", "spaceport", "eclipse", "marathoner", "drumbeat", "headphones", "rollercoaster", "lighthouse", "snowboard", "basketball", "astronaut", "glacier", "hurricane", "jetpack", "racetrack", "captain", "medal", "rover", "playlist", "volleyball", "sprinter", "trumpet", "meteorite", "lunar", "pitch", "tournament", "sunset", "safari", "canyon", "rapids", "summit", "harbour"],
        phrases: ["Reach for the stars", "Teamwork wins games", "Practice makes progress", "Music moves me", "Space is endless", "Every goal counts", "Volcanoes are powerful", "Keep your eye on the ball", "The crowd goes wild", "Explore the galaxy", "Astronauts float in space", "Champions never quit", "The rover explores Mars", "Train hard and play fair", "The final whistle blows", "Sprinters run like wind", "Music fills the stadium", "Mountains are worth climbing", "Every match is a lesson", "Comets have icy tails", "Skaters love the ramp", "The captain leads the team", "Gold medals take effort", "Rockets need fuel", "The band plays tonight", "Snowboarding is thrilling", "Eclipses are rare", "Safaris are exciting", "The goalkeeper saves it", "Headphones on, world off", "Lighthouses guide ships", "The summit is close", "Hurricanes are powerful", "Practice beats talent", "Basketball needs teamwork", "Telescopes see far", "Jetpacks would be cool", "The race starts now", "Glaciers move slowly", "Sunsets in the desert"]},
  "8": {words: ["algorithm", "network", "database", "sensor", "drone", "circuit", "startup", "podcast", "firewall", "pixel", "bandwidth", "browser", "keyboard", "server", "robotics", "encryption", "gadget", "hologram", "console", "download", "compiler", "protocol", "dataset", "prototype", "blockchain", "interface", "variable", "pipeline", "satellite", "cybersecurity", "analytics", "automation", "framework", "processor", "spreadsheet", "wireless", "sandbox", "password", "username", "bluetooth", "microchip", "terminal", "emulator", "dashboard", "smartwatch", "augmented", "virtual", "bitrate", "cache", "cloud", "router", "widget", "sprint", "backlog", "debugger", "interpreter", "metadata", "prompt", "syntax", "upload"],
        phrases: ["Code the future", "Data tells a story", "Think like an engineer", "Debugging builds patience", "Innovation starts here", "Secure your passwords", "Build it, test it, ship it", "Technology changes the world", "Logic beats luck", "Design with users in mind", "Clean code is kind code", "Test before you trust", "Data needs context", "Every bug teaches something", "Privacy matters online", "Automate the boring stuff", "Simple beats clever", "Measure twice, code once", "Think in algorithms", "The cloud is just computers", "Errors are clues", "Users come first", "Iterate and improve", "Code is a team sport", "Strong passwords save accounts", "Comments help future you", "Small steps, big projects", "Version control saves time", "Logic is a superpower", "Ideas need prototypes", "Read the error message", "Security is everyone's job", "Learn by building", "Sensors collect data", "Robots follow instructions", "Good design is invisible", "Keep your software updated", "Questions lead to answers", "Data can change minds", "Build things that matter"]}
};
function setGradeTheme(g){
  const t = THEMES[String(g)] || THEMES["7"];
  LV = {"6": 0, "7": 1, "8": 2}[String(g)] ?? 1;
  WORDS.splice(0, WORDS.length, ...t.words);
  PHRASES.splice(0, PHRASES.length, ...t.phrases);
}
const ORD = ["first", "second", "third", "fourth", "fifth"];
const PAIRS = [["Pass", "Fail"], ["Tall", "Short"], ["Big", "Small"], ["Hot", "Cold"], ["Fast", "Slow"], ["High", "Low"]];
const isPrime = n => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
const sum = a => a.reduce((x, y) => x + y, 0);

const GEN = {
beginner: [
 // L1 print
 [{id: "b1a", make: () => ({p: R.pick(PHRASES)}),
   q: P => ({title: "Print a sentence", task: "Use " + c("print()") + " to show exactly:" + pre(P.p), hints: ["Put the sentence inside quotes, inside the brackets.", "print(\"" + esc(P.p) + "\")"], starter: ST, tests: [{in: [], check: lines([P.p])}]})},
  {id: "b1b", make: () => ({w: R.sample(WORDS, R.int(2, 3))}),
   q: P => ({title: "Print " + P.w.length + " lines", task: "Print these words, each on its own line:" + pre(P.w.join("\n")), hints: ["Each print() makes a new line, so you need " + P.w.length + " print lines.", "Start with: print(\"" + P.w[0] + "\")"], starter: ST, tests: [{in: [], check: lines(P.w)}]})}],
 // L2 maths & variables
 [{id: "b2a", make: () => { const op = R.pick(["+", "-", "*"]); let a = R.int(5 + 5 * LV, 20 + 30 * LV), b = R.int(2, 9 + 3 * LV); return {a, b, op}; },
   q: P => { const r = P.op === "+" ? P.a + P.b : P.op === "-" ? P.a - P.b : P.a * P.b; return {title: "Python calculator", task: "Make Python work out and print " + c(P.a + " " + P.op + " " + P.b) + ". Don't type the answer yourself!", hints: ["Numbers don't need quotes. Put the sum inside print().", "print(" + P.a + " " + P.op + " " + P.b + ")"], starter: ST, tests: [{in: [], check: uses(P.op, "Use the " + P.op + " sign so Python does the maths.") + "\n" + lines([r])}]}; }},
  {id: "b2b", make: () => ({v: R.pick(["coins", "points", "cakes", "books", "stars"]), n: R.int(3, 10 + 10 * LV), k: R.int(2, 5 + 2 * LV)}),
   q: P => ({title: "Variable maths", task: "Make a variable called " + c(P.v) + " that stores " + c(P.n) + ". Then print " + c(P.v) + " multiplied by " + P.k + ".", hints: ["First line: " + P.v + " = " + P.n, "print(" + P.v + " * " + P.k + ")"], starter: ST, tests: [{in: [], check: 'need_var("' + P.v + '", ' + P.n + ')\nif "' + P.v + '*" not in code.replace(" ", ""): fail("Multiply the variable: ' + P.v + ' * ' + P.k + '")\n' + lines([P.n * P.k])}]})}],
 // L3 text variables
 [{id: "b3a", make: () => { const [a, b] = R.sample(WORDS, 2); return {a, b}; },
   q: P => ({title: "Join two words", task: "Make " + c("first = \"" + P.a + "\"") + " and " + c("second = \"" + P.b + "\"") + ". Print them joined with a space between:" + pre(P.a + " " + P.b), hints: ["Join with + and add a space in quotes: \" \"", "print(first + \" \" + second)"], starter: ST, tests: [{in: [], check: 'need_var("first", ' + py(P.a) + ')\nneed_var("second", ' + py(P.b) + ")\n" + lines([P.a + " " + P.b])}]})},
  {id: "b3b", make: () => ({x: R.int(10 + 10 * LV, 40 + 40 * LV), y: R.int(2, 9 + 10 * LV)}),
   q: P => ({title: "Take away with variables", task: "Make " + c("x = " + P.x) + " and " + c("y = " + P.y) + ". Print " + c("x - y") + " using the variables.", hints: ["Two variables, then print the subtraction.", "print(x - y)"], starter: ST, tests: [{in: [], check: 'need_var("x", ' + P.x + ')\nneed_var("y", ' + P.y + ')\nif "x-y" not in code.replace(" ", ""): fail("Print x - y using the variables.")\n' + lines([P.x - P.y])}]})},
  {id: "b3c", make: () => ({n: R.pick(NAMES), f: R.pick(["pizza", "mango", "pasta", "sushi", "tacos"])}),
   q: P => ({title: "Build a sentence", task: "Make " + c("name = \"" + P.n + "\"") + " and " + c("food = \"" + P.f + "\"") + ". Use + to print:" + pre(P.n + " likes " + P.f), hints: ["Remember the spaces inside the quotes: \" likes \"", "print(name + \" likes \" + food)"], starter: ST, tests: [{in: [], check: 'need_var("name", ' + py(P.n) + ')\nneed_var("food", ' + py(P.f) + ")\n" + lines([P.n + " likes " + P.f])}]})}],
 // L4 text tricks
 [{id: "b4a", make: () => ({w: R.pick(["Yo", "Go", "La", "Hey", "Boom"]), n: R.int(2, 5)}),
   q: P => ({title: "Repeat it", task: "Use " + c("*") + " to print " + c(P.w) + " " + P.n + " times on one line:" + pre(P.w.repeat(P.n)), hints: ["Text * number repeats the text.", "print(\"" + P.w + "\" * " + P.n + ")"], starter: ST, tests: [{in: [], check: uses("*", "Use * to repeat the text.") + "\n" + lines([P.w.repeat(P.n)])}]})},
  {id: "b4b", make: () => ({w: R.pick(WORDS.concat(["Dubai", "Python", "elephant", "computer", "happiness"]))}),
   q: P => ({title: "Count the letters", task: "Make " + c("word = \"" + P.w + "\"") + " and print how many letters it has using " + c("len()") + ".", hints: ["Put the variable inside len().", "print(len(word))"], starter: ST, tests: [{in: [], check: 'need_var("word", ' + py(P.w) + ")\n" + uses("len(", "Use len() to count.") + "\n" + lines([P.w.length])}]})},
  {id: "b4c", make: () => ({w: R.pick(["hello", "Python", "DUBAI", "School", "rocket", "MiXeD"]), up: Math.random() < 0.5}),
   q: P => ({title: P.up ? "Make it CAPITALS" : "make it small", task: "Make " + c("word = \"" + P.w + "\"") + " and print it in " + (P.up ? "CAPITAL letters" : "small (lower case) letters") + ".", hints: ["Use " + (P.up ? ".upper()" : ".lower()") + " after the variable name.", "print(word" + (P.up ? ".upper()" : ".lower()") + ")"], starter: ST, tests: [{in: [], check: 'need_var("word", ' + py(P.w) + ")\n" + uses(P.up ? ".upper()" : ".lower()", "Use " + (P.up ? ".upper()" : ".lower()")) + "\n" + lines([P.up ? P.w.toUpperCase() : P.w.toLowerCase()])}]})}],
 // L5 f-strings, int, input
 [{id: "b5a", make: () => ({pet: R.pick(["cat", "dog", "parrot", "rabbit", "fish"]), n: R.pick(NAMES), age: R.int(1, 12)}),
   q: P => ({title: "f-string sentence", task: "Make " + c("pet = \"" + P.pet + "\"") + ", " + c("name = \"" + P.n + "\"") + " and " + c("age = " + P.age) + ". Use an f-string to print:" + pre("My " + P.pet + " " + P.n + " is " + P.age), hints: ["f\"...\" with the variables in {curly brackets}.", "print(f\"My {pet} {name} is {age}\")"], starter: ST, tests: [{in: [], check: 'if \'f"\' not in code and "f\'" not in code: fail("Use an f-string: put f before the quotes.")\nneed_var("pet", ' + py(P.pet) + ')\nneed_var("age", ' + P.age + ")\n" + lines(["My " + P.pet + " " + P.n + " is " + P.age])}]})},
  {id: "b5b", make: () => ({g: R.pick(["Welcome", "Hi", "Good morning", "Hey there", "Salaam"]), a: R.sample(NAMES, 2)}),
   q: P => ({title: "Greeting machine", task: "Ask the user for their name with " + c("input()") + ". Then print a greeting. If they type " + c(P.a[0]) + ", print:" + pre(P.g + ", " + P.a[0] + "!"), hints: ["name = input(\"Name? \")", "print(\"" + P.g + ", \" + name + \"!\")"], starter: ST, sample: P.a[0], tests: P.a.map(n => ({in: [n], check: lines([P.g + ", " + n + "!"])}))})},
  {id: "b5c", make: () => ({n: R.int(2, 15 + 20 * LV), k: R.int(5, 20 + 30 * LV)}),
   q: P => ({title: "Text to number", task: "Make " + c("text = \"" + P.n + "\"") + " (text, with quotes). Turn it into a number with " + c("int()") + " and print it plus " + P.k + ".", hints: ["int(text) gives the number " + P.n + ".", "print(int(text) + " + P.k + ")"], starter: ST, tests: [{in: [], check: 'need_var("text", ' + py(String(P.n)) + ")\n" + uses("int(", "Use int() to convert.") + "\n" + lines([P.n + P.k])}]})}],
 // L6 input + if
 [{id: "b6a", make: () => { const pr = R.pick(PAIRS); const t = R.int(10, 80); return {pr, t}; },
   q: P => ({title: "Decide: " + P.pr[0] + " or " + P.pr[1], task: "Ask for a number. If it is <b>more than " + P.t + "</b> print " + c(P.pr[0]) + ", otherwise print " + c(P.pr[1]) + ".", hints: ["n = int(input(\"Number: \")) then if n > " + P.t + ":", "if n > " + P.t + ":\n    print(\"" + P.pr[0] + "\")\nelse:\n    print(\"" + P.pr[1] + "\")"], starter: ST, sample: String(P.t + 5),
     tests: [P.t + R.int(1, 9), P.t, P.t - R.int(1, 9)].map(v => ({in: [String(v)], check: lines([v > P.t ? P.pr[0] : P.pr[1]])}))})},
  {id: "b6b", make: () => ({k: R.pick([3, 4, 5, 6, 7, 9, 10])}),
   q: P => ({title: "Divisible by " + P.k + "?", task: "Ask for a whole number. Print " + c("Yes") + " if it divides exactly by " + P.k + ", otherwise print " + c("No") + ".<br><i>Tip: use % to get the remainder.</i>", hints: ["A number divides exactly when n % " + P.k + " == 0", "if n % " + P.k + " == 0:\n    print(\"Yes\")\nelse:\n    print(\"No\")"], starter: ST, sample: String(P.k * 3),
     tests: [P.k * R.int(2, 9), P.k * R.int(2, 9) + 1, 0].map(v => ({in: [String(v)], check: lines([v % P.k === 0 ? "Yes" : "No"])}))})}],
 // L7 elif / and / for
 [{id: "b7a", make: () => { const a = R.int(60, 90), b = R.int(30, a - 10); return {a, b, w: R.pick([["Gold", "Silver", "Bronze"], ["Expert", "Good", "Beginner"], ["High", "Medium", "Low"]])}; },
   q: P => ({title: "Three levels", task: "Ask for a score. Print:<br>" + c(P.w[0]) + " if it is " + P.a + " or more<br>" + c(P.w[1]) + " if it is " + P.b + " or more<br>" + c(P.w[2]) + " otherwise", hints: ["if / elif / else, from the highest down. >= means \"or more\".", "if s >= " + P.a + ":\n    print(\"" + P.w[0] + "\")\nelif s >= " + P.b + ":\n    print(\"" + P.w[1] + "\")\nelse:\n    print(\"" + P.w[2] + "\")"], starter: ST, sample: String(P.a),
     tests: [P.a, P.a + 3, P.b, P.b + 1, P.b - 1].map(v => ({in: [String(v)], check: lines([v >= P.a ? P.w[0] : v >= P.b ? P.w[1] : P.w[2]])}))})},
  {id: "b7b", make: () => { const lo = R.int(5, 30); return {lo, hi: lo + R.int(5, 20)}; },
   q: P => ({title: "In range?", task: "Ask for a number. Print " + c("In range") + " if it is between " + P.lo + " and " + P.hi + " (including both), otherwise " + c("Out of range") + ".", hints: ["Two checks joined with and.", "if n >= " + P.lo + " and n <= " + P.hi + ":"], starter: ST, sample: String(P.lo),
     tests: [P.lo, P.hi, P.lo + 1, P.lo - 1, P.hi + 1].map(v => ({in: [String(v)], check: lines([v >= P.lo && v <= P.hi ? "In range" : "Out of range"])}))})},
  {id: "b7c", make: () => { const a = R.int(1, 10); return {a, b: a + R.int(3, 6)}; },
   q: P => ({title: "Loop from " + P.a + " to " + P.b, task: "Use a for loop to print the numbers " + P.a + " to " + P.b + ", each on its own line.", hints: ["range stops BEFORE the second number, so use " + (P.b + 1) + ".", "for n in range(" + P.a + ", " + (P.b + 1) + "):\n    print(n)"], starter: ST, tests: [{in: [], check: uses("for", "Use a for loop.") + "\n" + lines(Array.from({length: P.b - P.a + 1}, (_, i) => P.a + i))}]})}],
 // L8 loops
 [{id: "b8a", make: () => ({p: R.pick(["Go team!", "Hooray!", "Python rocks!", "Well done!"]), n: R.int(2, 6)}),
   q: P => ({title: "Repeat " + P.n + " times", task: "Use a loop to print " + c(P.p) + " " + P.n + " times.", hints: ["range(" + P.n + ") repeats " + P.n + " times.", "for i in range(" + P.n + "):\n    print(\"" + P.p + "\")"], starter: ST, tests: [{in: [], check: uses("for", "Use a for loop.") + "\n" + lines(Array(P.n).fill(P.p))}]})},
  {id: "b8b", make: () => { const s = R.int(2, 5), a = R.int(0, 10); return {a, s, b: a + s * R.int(3, 5)}; },
   q: P => { const out = []; for (let i = P.a; i <= P.b; i += P.s) out.push(i); return {title: "Count in " + P.s + "s", task: "Print the numbers from " + P.a + " to " + P.b + ", counting in steps of " + P.s + ":" + pre(out.join("\n")), hints: ["range(start, stop, step), and stop must be past " + P.b + ".", "for n in range(" + P.a + ", " + (P.b + 1) + ", " + P.s + "):\n    print(n)"], starter: ST, tests: [{in: [], check: 'if "for" not in code and "while" not in code: fail("Use a loop.")\n' + lines(out)}]}; }},
  {id: "b8c", make: () => { const a = R.int(1, 5 + 5 * LV); return {a, b: a + R.int(4 + 2 * LV, 8 + 6 * LV)}; },
   q: P => { let t = 0; for (let i = P.a; i <= P.b; i++) t += i; return {title: "Add " + P.a + " to " + P.b, task: "Use a loop to add up all the whole numbers from " + P.a + " to " + P.b + ", then print the total once.", hints: ["total = 0 before the loop, add inside, print after.", "total = 0\nfor n in range(" + P.a + ", " + (P.b + 1) + "):\n    total = total + n\nprint(total)"], starter: ST, tests: [{in: [], check: uses("for", "Use a for loop.") + "\n" + lines([t])}]}; }}],
 // L9 while & lists
 [{id: "b9a", make: () => ({n: R.int(3, 8), w: R.pick(["Go!", "Lift off!", "Ready!", "Time's up!"])}),
   q: P => ({title: "While countdown", task: "Use a while loop to count down from " + P.n + " to 1, then print " + c(P.w) + ".", hints: ["count = " + P.n + " then while count > 0:", "Inside the loop: print(count) then count = count - 1"], starter: ST, tests: [{in: [], check: uses("while", "Use a while loop.") + "\n" + lines(Array.from({length: P.n}, (_, i) => P.n - i).concat([P.w]))}]})},
  {id: "b9b", make: () => { const L = R.sample(WORDS, 5); return {L, i: R.int(0, 4)}; },
   q: P => ({title: "Pick from a list", task: "Make " + c("items = " + py(P.L)) + " and print the <b>" + ORD[P.i] + "</b> item.<br><i>Remember: counting starts at 0!</i>", hints: ["The " + ORD[P.i] + " item is at position " + P.i + ".", "print(items[" + P.i + "])"], starter: ST, tests: [{in: [], check: 'need_var("items", ' + py(P.L) + ")\n" + lines([P.L[P.i]])}]})},
  {id: "b9c", make: () => ({L: R.sample(NAMES, R.int(3, 5)), g: R.pick(["Hi", "Hello", "Well done"])}),
   q: P => ({title: "Loop through a list", task: "Make " + c("names = " + py(P.L)) + ". Use a for loop to print " + c(P.g + " <name>") + " for each one, e.g." + pre(P.g + " " + P.L[0]), hints: ["for name in names:", "    print(\"" + P.g + " \" + name)"], starter: ST, tests: [{in: [], check: 'need_var("names", ' + py(P.L) + ")\n" + uses("for", "Use a for loop.") + "\n" + lines(P.L.map(n => P.g + " " + n))}]})}],
 // L10 append & functions
 [{id: "b10a", make: () => ({L: R.sample(WORDS, R.int(2, 4)), v: R.pick(["bag", "basket", "box", "team"])}),
   q: P => ({title: "Fill the " + P.v, task: "Start with " + c(P.v + " = []") + ". Use " + c(".append()") + " to add " + P.L.map(x => c("\"" + x + "\"")).join(", ") + " in that order, then print the list.", hints: [P.v + ".append(\"" + P.L[0] + "\") adds one item.", "One append line per item, then print(" + P.v + ")"], starter: ST, tests: [{in: [], check: uses(".append(", "Use .append()") + '\nneed_var("' + P.v + '", ' + py(P.L) + ")\n" + lines(["[" + P.L.map(x => "'" + x + "'").join(", ") + "]"])}]})},
  {id: "b10b", make: () => { const op = R.pick(["+", "*", "-"]); return {op, k: R.int(2, 12), name: R.pick(["magic", "machine", "boost", "change"])}; },
   q: P => { const f = n => P.op === "+" ? n + P.k : P.op === "*" ? n * P.k : n - P.k; const word = P.op === "+" ? "adds " + P.k + " to" : P.op === "*" ? "multiplies by " + P.k : "takes " + P.k + " away from"; const args = [R.int(1, 20), 0, R.int(21, 50)];
     return {title: "Function: " + P.name, task: "Create a function " + c(P.name + "(n)") + " that <b>returns</b> the number after it " + word + " it.<br>" + c(P.name + "(" + args[0] + ")") + " → " + c(f(args[0])), hints: ["def " + P.name + "(n): with return inside.", "    return n " + P.op + " " + P.k], starter: ST, tests: [{in: [], check: fnCheck(P.name, args.map(a => [[a], f(a)]))}]}; }},
  {id: "b10c", make: () => ({fn: R.pick(["cheer", "shout", "sing", "wave"]), p: R.pick(["Yay!", "Woohoo!", "La la la!", "Hello!"]), n: R.int(2, 4)}),
   q: P => ({title: "Call it " + P.n + " times", task: "Create a function " + c(P.fn + "()") + " that prints " + c(P.p) + ". Then <b>call</b> it " + P.n + " times.", hints: ["def " + P.fn + "():\n    print(\"" + P.p + "\")", "Then write " + P.fn + "() on " + P.n + " lines (not indented), or use a loop."], starter: ST, tests: [{in: [], check: 'need("' + P.fn + '")\n' + lines(Array(P.n).fill(P.p))}]})}],
],
intermediate: [
 // L1 functions return
 [{id: "i1a", make: () => ({op: R.pick(["*", "+", "-"]), k: R.int(2, 15)}),
   q: P => { const nm = (P.op === "*" ? "times_" : P.op === "+" ? "plus_" : "minus_") + P.k; const f = n => P.op === "*" ? n * P.k : P.op === "+" ? n + P.k : n - P.k; const a = [R.int(1, 30), 0, -R.int(1, 9)];
     return {title: nm, task: "Create " + c(nm + "(n)") + " that returns " + c("n " + P.op + " " + P.k) + ".", hints: ["def " + nm + "(n):", "    return n " + P.op + " " + P.k], starter: FN(nm + "(n)"), tests: [{in: [], check: fnCheck(nm, a.map(x => [[x], f(x)]))}]}; }},
  {id: "i1b", make: () => ({k: R.int(5, 100), cmp: R.pick([">", "<", ">="])}),
   q: P => { const word = {">": "bigger than", "<": "smaller than", ">=": "at least"}[P.cmp]; const nm = {">": "over_", "<": "under_", ">=": "at_least_"}[P.cmp] + P.k; const f = n => P.cmp === ">" ? n > P.k : P.cmp === "<" ? n < P.k : n >= P.k;
     return {title: nm, task: "Create " + c(nm + "(n)") + " that returns " + c("True") + " if n is " + word + " " + P.k + ", otherwise " + c("False") + ".", hints: ["A comparison is already True/False.", "return n " + P.cmp + " " + P.k], starter: FN(nm + "(n)"), tests: [{in: [], check: fnCheck(nm, [P.k - 1, P.k, P.k + 1, P.k + 20].map(x => [[x], f(x)]))}]}; }},
  {id: "i1c", make: () => ({t: R.pick(["area", "perimeter", "average_of_two"])}),
   q: P => { const f = {area: (a, b) => a * b, perimeter: (a, b) => 2 * (a + b), average_of_two: (a, b) => (a + b) / 2}[P.t]; const desc = {area: "the area of a rectangle (width × height)", perimeter: "the perimeter of a rectangle (2 × (width + height))", average_of_two: "the average of the two numbers"}[P.t]; const cases = [[R.int(2, 9), R.int(2, 9)], [R.int(10, 20), R.int(1, 9)], [R.int(1, 5), R.int(1, 5)]];
     return {title: P.t, task: "Create " + c(P.t + "(a, b)") + " that returns " + desc + ".", hints: ["def " + P.t + "(a, b): and return the formula.", "return " + {area: "a * b", perimeter: "2 * (a + b)", average_of_two: "(a + b) / 2"}[P.t]], starter: FN(P.t + "(a, b)"), tests: [{in: [], check: fnCheck(P.t, cases.map(x => [x, f(...x)]))}]}; }}],
 // L2 loops over lists/text
 [{id: "i2a", make: () => ({L: R.pick("aeiorstnlm".split(""))}),
   q: P => { const f = s => s.toLowerCase().split("").filter(x => x === P.L).length; const nm = "count_" + P.L; const cs = R.sample(["Banana bread", "Mississippi", "TOMATO soup", "a lot of letters", "Rest in the sun", "hello there", "Llamas love lemons", "Terrible traffic"], 3).concat([""]);
     return {title: "Count the " + P.L + "s", task: "Create " + c(nm + "(text)") + " that returns how many times the letter " + c(P.L) + " appears. Count capitals too!", hints: ["Loop through text.lower() and count matches.", "count = 0\nfor ch in text.lower():\n    if ch == \"" + P.L + "\":\n        count += 1\nreturn count"], starter: FN(nm + "(text)"), tests: [{in: [], check: fnCheck(nm, cs.map(s => [[s], f(s)]))}]}; }},
  {id: "i2b", make: () => ({k: R.int(3, 15)}),
   q: P => { const nm = "sum_over_" + P.k; const f = a => sum(a.filter(x => x > P.k)); const cs = [R.list(6, 0, 25), R.list(5, 0, 25), [], [P.k]];
     return {title: nm, task: "Create " + c(nm + "(nums)") + " that adds up only the numbers in the list that are <b>bigger than " + P.k + "</b>.", hints: ["total = 0, loop, and only add when n > " + P.k + ".", "for n in nums:\n    if n > " + P.k + ":\n        total += n"], starter: FN(nm + "(nums)"), tests: [{in: [], check: fnCheck(nm, cs.map(a => [[a], f(a)]))}]}; }},
  {id: "i2c", make: () => ({}),
   q: P => { const cs = [R.list(3, 1, 9), R.list(4, 1, 6), [], [R.int(2, 9)]]; const f = a => a.reduce((x, y) => x * y, 1);
     return {title: "Multiply them all", task: "Create " + c("product(nums)") + " that multiplies all the numbers together. An empty list gives " + c("1") + ".", hints: ["Start at 1, not 0!", "result = 1\nfor n in nums:\n    result *= n\nreturn result"], starter: FN("product(nums)"), tests: [{in: [], check: fnCheck("product", cs.map(a => [[a], f(a)]))}]}; }}],
 // L3 strings & logic
 [{id: "i3a", make: () => { const [a, b] = R.pick([[2, 5], [3, 4], [2, 7], [3, 5], [4, 6]]); const [wa, wb] = R.pick([["Ping", "Pong"], ["Zip", "Zap"], ["Tick", "Tock"], ["Fizz", "Buzz"]]); return {a, b, wa, wb, n: R.int(12, 20)}; },
   q: P => { const out = []; for (let i = 1; i <= P.n; i++) out.push(i % P.a === 0 && i % P.b === 0 ? P.wa + P.wb : i % P.a === 0 ? P.wa : i % P.b === 0 ? P.wb : String(i));
     return {title: P.wa + P.wb, task: "Print the numbers 1 to " + P.n + ", but for multiples of " + P.a + " print " + c(P.wa) + ", for multiples of " + P.b + " print " + c(P.wb) + ", and for multiples of both print " + c(P.wa + P.wb) + ".", hints: ["Check 'both' first: i % " + P.a + " == 0 and i % " + P.b + " == 0", "Use if / elif / elif / else inside for i in range(1, " + (P.n + 1) + "):"], starter: ST, tests: [{in: [], check: lines(out)}]}; }},
  {id: "i3b", make: () => ({k: R.int(3, 6)}),
   q: P => { const nm = "long_words"; const f = s => s.split(/\s+/).filter(w => w && w.length > P.k).length; const cs = ["the elephant ate a pineapple", "I like to code in Python", "short", "Programming is incredibly rewarding"];
     return {title: "Long words", task: "Create " + c(nm + "(text)") + " that returns how many words in the text have <b>more than " + P.k + "</b> letters.", hints: ["text.split() gives the words.", "return len([w for w in text.split() if len(w) > " + P.k + "])"], starter: FN(nm + "(text)"), tests: [{in: [], check: fnCheck(nm, cs.map(s => [[s], f(s)]))}]}; }},
  {id: "i3c", make: () => ({}),
   q: P => { const cs = ["Apple", "banana", "Orange", "kiwi", "egg", "Umbrella"]; const f = s => "aeiou".includes(s[0].toLowerCase());
     return {title: "Starts with a vowel?", task: "Create " + c("starts_with_vowel(word)") + " that returns True if the word starts with a, e, i, o or u (capital or small).", hints: ["word[0] is the first letter. Use .lower().", "return word[0].lower() in \"aeiou\""], starter: FN("starts_with_vowel(word)"), tests: [{in: [], check: fnCheck("starts_with_vowel", cs.map(s => [[s], f(s)]))}]}; }}],
 // L4 list building
 [{id: "i4a", make: () => ({k: R.int(2, 9), n: R.int(5, 10)}),
   q: P => { const L = Array.from({length: P.n}, (_, i) => (i + 1) * P.k);
     return {title: "Multiples of " + P.k, task: "Use a list comprehension to make a variable " + c("multiples") + " holding the first " + P.n + " multiples of " + P.k + ": " + c(py(L.slice(0, 3)).replace("]", ", ...]")), hints: ["[x * " + P.k + " for x in range(1, ...)]", "multiples = [x * " + P.k + " for x in range(1, " + (P.n + 1) + ")]"], starter: ST, tests: [{in: [], check: 'if not ("[" in code and " for " in code): fail("Use a list comprehension.")\nneed_var("multiples", ' + py(L) + ")"}]}; }},
  {id: "i4b", make: () => ({k: R.int(2, 6), mode: R.pick(["div", "big"]), t: R.int(10, 40)}),
   q: P => { const nm = P.mode === "div" ? "divisible_by_" + P.k : "bigger_than_" + P.t; const f = a => a.filter(x => P.mode === "div" ? x % P.k === 0 : x > P.t); const cs = [R.list(8, 1, 50), R.list(6, 1, 50), []];
     return {title: nm, task: "Create " + c(nm + "(nums)") + " that returns a new list of only the numbers " + (P.mode === "div" ? "that divide exactly by " + P.k : "bigger than " + P.t) + ", in the same order.", hints: ["A list comprehension with if on the end.", "return [n for n in nums if " + (P.mode === "div" ? "n % " + P.k + " == 0" : "n > " + P.t) + "]"], starter: FN(nm + "(nums)"), tests: [{in: [], check: fnCheck(nm, cs.map(a => [[a], f(a)]))}]}; }},
  {id: "i4c", make: () => ({}),
   q: P => { const cs = [R.list(5, 1, 20), [R.int(1, 9), R.int(1, 9)], []]; const f = a => a.length ? Math.max(...a) - Math.min(...a) : 0;
     return {title: "Spread of a list", task: "Create " + c("spread(nums)") + " that returns the biggest number minus the smallest. An empty list returns " + c("0") + ".", hints: ["max() and min() help. Check for an empty list first.", "if not nums:\n    return 0\nreturn max(nums) - min(nums)"], starter: FN("spread(nums)"), tests: [{in: [], check: fnCheck("spread", cs.map(a => [[a], f(a)]))}]}; }}],
 // L5 dicts
 [{id: "i5a", make: () => { const sets = [[["cat", "meow"], ["dog", "woof"], ["cow", "moo"], ["duck", "quack"]], [["red", "stop"], ["green", "go"], ["amber", "wait"]], [["Egypt", "Cairo"], ["Kenya", "Nairobi"], ["India", "New Delhi"], ["Spain", "Madrid"]], [["pen", 3], ["ruler", 5], ["glue", 7]]]; const s = R.pick(sets); return {s, k: R.pick(s)[0], v: R.pick(["info", "lookup", "data"])}; },
   q: P => ({title: "Look it up", task: "Make a dictionary " + c(P.v) + " with these pairs:<br>" + P.s.map(([a, b]) => c(py(a)) + " → " + c(py(b))).join("<br>") + "<br>Then print the value for " + c(py(P.k)) + " using the dictionary.", hints: [P.v + " = {" + py(P.s[0][0]) + ": " + py(P.s[0][1]) + ", ...}", "print(" + P.v + "[" + py(P.k) + "])"], starter: ST, tests: [{in: [], check: 'need_var("' + P.v + '", ' + py(D(P.s)) + ")\n" + uses(P.v + "[", "Look it up from the dictionary.") + "\n" + lines([P.s.find(x => x[0] === P.k)[1]])}]})},
  {id: "i5b", make: () => ({}),
   q: P => { const cs = [R.sample(WORDS, 6), ["ant", "apple", "bee"], []]; const f = a => { const d = []; a.forEach(w => { const e = d.find(x => x[0] === w[0]); if (e) e[1]++; else d.push([w[0], 1]); }); return D(d); };
     return {title: "Count first letters", task: "Create " + c("first_letters(words)") + " that returns a dictionary counting how many words start with each letter.<br>" + c("first_letters([\"ant\", \"apple\", \"bee\"])") + " → " + c("{\"a\": 2, \"b\": 1}"), hints: ["counts = {} then counts[w[0]] = counts.get(w[0], 0) + 1", "Loop: for w in words:"], starter: FN("first_letters(words)"), tests: [{in: [], check: fnCheck("first_letters", cs.map(a => [[a], f(a)]))}]}; }},
  {id: "i5c", make: () => { const a = R.int(75, 95), b = R.int(50, a - 10); return {a, b}; },
   q: P => { const f = s => s >= P.a ? "Distinction" : s >= P.b ? "Pass" : "Retry"; const cs = [P.a, P.a + 2, P.b, P.a - 1, P.b - 1, 0];
     return {title: "Result label", task: "Create " + c("result(score)") + " that returns " + c("\"Distinction\"") + " for " + P.a + " or more, " + c("\"Pass\"") + " for " + P.b + " or more, otherwise " + c("\"Retry\"") + ".", hints: ["if / elif / else with >=", "if score >= " + P.a + ":\n    return \"Distinction\"\nelif score >= " + P.b + ":\n    return \"Pass\"\nreturn \"Retry\""], starter: FN("result(score)"), tests: [{in: [], check: fnCheck("result", cs.map(s => [[s], f(s)]))}]}; }}],
 // L6 searching & digits
 [{id: "i6a", make: () => ({}),
   q: P => { const cs = [R.list(5, 1, 30), [R.int(1, 9)], [4, 1, 1, 7]]; const f = a => a.indexOf(Math.min(...a));
     return {title: "Where is the smallest?", task: "Create " + c("index_of_min(nums)") + " that returns the position of the smallest number (the first one if there's a tie).", hints: ["Track the best position: best = 0, then loop through range(1, len(nums)).", "if nums[i] < nums[best]: best = i"], starter: FN("index_of_min(nums)"), tests: [{in: [], check: fnCheck("index_of_min", cs.map(a => [[a], f(a)]))}]}; }},
  {id: "i6b", make: () => ({t: R.pick(["count_digits", "digit_product"])}),
   q: P => { const f = n => P.t === "count_digits" ? String(n).length : String(n).split("").reduce((x, d) => x * +d, 1); const cs = [R.int(100, 9999), R.int(1, 9), R.int(10000, 99999)];
     return {title: P.t, task: P.t === "count_digits" ? "Create " + c("count_digits(n)") + " that returns how many digits a whole number has." : "Create " + c("digit_product(n)") + " that multiplies the digits of a whole number together. " + c("digit_product(234)") + " → " + c("24"), hints: ["str(n) turns it into text you can loop through.", P.t === "count_digits" ? "return len(str(n))" : "result = 1\nfor d in str(n):\n    result *= int(d)"], starter: FN(P.t + "(n)"), tests: [{in: [], check: fnCheck(P.t, cs.map(n => [[n], f(n)]))}]}; }},
  {id: "i6c", make: () => ({}),
   q: P => { const L = R.sample(WORDS, 5); const cs = [[L, L[2]], [L, L[0]], [L, "zebra"], [[], "a"]]; const f = (a, t) => a.indexOf(t);
     return {title: "Find it", task: "Create " + c("find(items, target)") + " that returns the position of target in the list, or " + c("-1") + " if it isn't there. Try it with a loop!", hints: ["for i in range(len(items)): and return i when items[i] == target.", "After the loop: return -1"], starter: FN("find(items, target)"), tests: [{in: [], check: fnCheck("find", cs.map(x => [x, f(...x)]))}]}; }}],
 // L7 sequences & primes
 [{id: "i7a", make: () => ({a: R.int(1, 10), d: R.int(2, 7)}),
   q: P => { const f = n => Array.from({length: n}, (_, i) => P.a + i * P.d);
     return {title: "Number pattern", task: "Create " + c("pattern(n)") + " that returns the first n numbers of the pattern that starts at " + P.a + " and goes up by " + P.d + " each time: " + c(f(4).join(", ") + ", ..."), hints: ["Start at " + P.a + " and add " + P.d + " each loop.", "return [" + P.a + " + i * " + P.d + " for i in range(n)]"], starter: FN("pattern(n)"), tests: [{in: [], check: fnCheck("pattern", [5, 1, 0, 8].map(n => [[n], f(n)]))}]}; }},
  {id: "i7b", make: () => ({}),
   q: P => { const f = n => { let c = 0; for (let i = 2; i <= n; i++) if (isPrime(i)) c++; return c; }; const cs = [R.int(10, 50), 2, 1, R.int(51, 100)];
     return {title: "Count the primes", task: "Create " + c("count_primes(n)") + " that returns how many prime numbers there are from 2 up to n (including n).", hints: ["Write an is_prime helper first.", "return len([x for x in range(2, n + 1) if is_prime(x)])"], starter: FN("count_primes(n)"), tests: [{in: [], check: fnCheck("count_primes", cs.map(n => [[n], f(n)]))}]}; }},
  {id: "i7c", make: () => ({}),
   q: P => { const f = n => Array.from({length: n}, (_, i) => i + 1).filter(d => n % d === 0); const cs = [R.pick([12, 18, 20, 24, 30, 36]), R.pick([7, 11, 13]), 1];
     return {title: "All the factors", task: "Create " + c("factors(n)") + " that returns a list of all the numbers that divide exactly into n, smallest first.", hints: ["Check every number from 1 to n.", "return [d for d in range(1, n + 1) if n % d == 0]"], starter: FN("factors(n)"), tests: [{in: [], check: fnCheck("factors", cs.map(n => [[n], f(n)]))}]}; }}],
 // L8 cleaning data
 [{id: "i8a", make: () => ({}),
   q: P => { const cs = ["I love Python", "one", "the quick brown fox", ""]; const f = s => s.split(/\s+/).filter(Boolean).reverse().join(" ");
     return {title: "Reverse the words", task: "Create " + c("reverse_words(text)") + " that returns the words in reverse order.<br>" + c("reverse_words(\"I love Python\")") + " → " + c("\"Python love I\""), hints: ["split() → reverse → join", "return \" \".join(text.split()[::-1])"], starter: FN("reverse_words(text)"), tests: [{in: [], check: fnCheck("reverse_words", cs.map(s => [[s], f(s)]))}]}; }},
  {id: "i8b", make: () => ({}),
   q: P => { const cs = [R.list(8, 1, 5), [], R.sample(WORDS, 3).concat(R.sample(WORDS, 3))]; const f = a => new Set(a).size;
     return {title: "How many different?", task: "Create " + c("count_unique(items)") + " that returns how many <b>different</b> items are in the list.", hints: ["A set removes repeats.", "return len(set(items))"], starter: FN("count_unique(items)"), tests: [{in: [], check: fnCheck("count_unique", cs.map(a => [[a], f(a)]))}]}; }},
  {id: "i8c", make: () => ({}),
   q: P => { const cs = ["  hello WORLD  ", "PYTHON", "mixed Case words"]; const f = s => s.trim().split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(" ");
     return {title: "Tidy the name", task: "Create " + c("tidy(text)") + " that removes extra spaces at the start and end, and makes each word start with a capital and the rest small.<br>" + c("tidy(\"  hello WORLD  \")") + " → " + c("\"Hello World\""), hints: [".strip() removes outside spaces; .capitalize() fixes each word.", "return \" \".join(w.capitalize() for w in text.split())"], starter: FN("tidy(text)"), tests: [{in: [], check: fnCheck("tidy", cs.map(s => [[s], f(s)]))}]}; }}],
 // L9 nested & errors
 [{id: "i9a", make: () => ({}),
   q: P => { const g = Array.from({length: R.int(2, 4)}, () => R.list(R.int(2, 4), 0, 9)); const cs = [g, [[5]], []]; const f = gr => gr.map(sum);
     return {title: "Row totals", task: "Create " + c("row_totals(grid)") + " that returns a list with the total of each row.<br>" + c("row_totals([[1, 2], [3, 4]])") + " → " + c("[3, 7]"), hints: ["Loop through the rows and sum each one.", "return [sum(row) for row in grid]"], starter: FN("row_totals(grid)"), tests: [{in: [], check: fnCheck("row_totals", cs.map(a => [[a], f(a)]))}]}; }},
  {id: "i9b", make: () => ({k: R.int(-1, 0) === 0 ? 0 : -1}),
   q: P => { const cs = [String(R.int(1, 99)), "hello", "", "-" + R.int(1, 9)]; const f = s => /^-?\d+$/.test(s) ? parseInt(s, 10) : P.k;
     return {title: "Safe number", task: "Create " + c("safe_int(text)") + " that returns the text as a whole number, or " + c(P.k) + " if it isn't a valid number. Use try / except!", hints: ["try: return int(text)", "except ValueError:\n    return " + P.k], starter: FN("safe_int(text)"), tests: [{in: [], check: fnCheck("safe_int", cs.map(s => [[s], f(s)]))}]}; }},
  {id: "i9c", make: () => ({u: R.pick(["km", "kg", "m", "L"]), d: R.int(1, 3)}),
   q: P => { const vals = [R.int(1, 50) + 0.5, R.int(1, 20), 3.14159]; const f = v => v.toFixed(P.d) + " " + P.u;
     return {title: "Format with units", task: "Create " + c("label(value)") + " that returns the value with exactly " + P.d + " decimal place" + (P.d > 1 ? "s" : "") + " followed by " + c(" " + P.u) + ".<br>" + c("label(" + vals[1] + ")") + " → " + c(py(f(vals[1]))), hints: ["Use an f-string with :." + P.d + "f", "return f\"{value:." + P.d + "f} " + P.u + "\""], starter: FN("label(value)"), tests: [{in: [], check: fnCheck("label", [[[vals[1]], f(vals[1])], [[3.14159], f(3.14159)], [[0], f(0)]])}]}; }}],
 // L10 sorting & project
 [{id: "i10a", make: () => ({t: R.pick(["desc", "last"])}),
   q: P => { if (P.t === "desc") { const cs = [R.list(6, 1, 50), []]; return {title: "Biggest first", task: "Create " + c("biggest_first(nums)") + " that returns the numbers sorted from biggest to smallest.", hints: ["sorted() has a reverse option.", "return sorted(nums, reverse=True)"], starter: FN("biggest_first(nums)"), tests: [{in: [], check: fnCheck("biggest_first", cs.map(a => [[a], a.slice().sort((x, y) => y - x)]))}]}; }
     const cs = [["banana", "kiwi", "apple", "plum"], ["cab", "abc", "bca"]]; const f = a => a.slice().sort((x, y) => x[x.length - 1] < y[y.length - 1] ? -1 : x[x.length - 1] > y[y.length - 1] ? 1 : 0);
     return {title: "Sort by last letter", task: "Create " + c("by_last_letter(words)") + " that sorts the words by their <b>last</b> letter (keep the original order for ties).", hints: ["Use key= with a lambda.", "return sorted(words, key=lambda w: w[-1])"], starter: FN("by_last_letter(words)"), tests: [{in: [], check: fnCheck("by_last_letter", cs.map(a => [[a], f(a)]))}]}; }},
  {id: "i10b", make: () => ({}),
   q: P => { const ns = R.sample(NAMES, 4); const sc = R.sample([3, 5, 7, 9, 11, 13, 15], 4); const d = {}; ns.forEach((n, i) => d[n] = sc[i]); const low = ns[sc.indexOf(Math.min(...sc))];
     return {title: "Lowest scorer", task: "Create " + c("lowest_scorer(scores)") + " that returns the <b>name</b> with the lowest score from a dictionary of name: score.", hints: ["Loop through scores.items() and remember the lowest.", "return min(scores, key=scores.get)"], starter: FN("lowest_scorer(scores)"), tests: [{in: [], check: fnCheck("lowest_scorer", [[[d], low], [[{"Solo": 4}], "Solo"]])}]}; }},
  {id: "i10c", make: () => ({pct: R.pick([10, 20, 25, 50])}),
   q: P => { const prices = {"pen": 4, "book": 20, "bag": 50}; const f = cart => { let t = 0; Object.keys(cart).forEach(k => t += cart[k] * prices[k]); return t * (100 - P.pct) / 100; }; const cs = [{"pen": R.int(1, 5), "book": R.int(1, 3)}, {"bag": 1}, {}];
     return {title: "Sale day", task: "Everything is " + P.pct + "% off! Create " + c("sale_total(cart, prices)") + " that works out the total cost (quantity × price for each item) and returns it after taking " + P.pct + "% off.", hints: ["Work out the full total first, then multiply by " + ((100 - P.pct) / 100) + ".", "total = sum(qty * prices[item] for item, qty in cart.items())\nreturn total * " + ((100 - P.pct) / 100)], starter: FN("sale_total(cart, prices)"), tests: [{in: [], check: 'need("sale_total")\nprices = ' + py(prices) + "\n" + cs.map(cc => "eq(sale_total(" + py(cc) + ", prices), " + py(f(cc)) + ", " + JSON.stringify("sale_total(" + py(cc) + ", prices)") + ")").join("\n")}]}; }}],
],
advanced: [
 // L1 text analysis
 [{id: "a1a", make: () => ({}),
   q: P => { const cs = ["hello world", "aabbbcc", "Mississippi", "abc"]; const f = s => { const m = {}; s.replace(/ /g, "").split("").forEach(ch => m[ch] = (m[ch] || 0) + 1); const best = Math.max(...Object.values(m)); return Object.keys(m).filter(k => m[k] === best).sort()[0]; };
     return {title: "Most common character", task: "Create " + c("most_common_char(text)") + " that returns the character that appears most often (ignore spaces). If there's a tie, return the one that comes first alphabetically.", hints: ["Count with a dictionary, find the biggest count.", "return min(ch for ch in counts if counts[ch] == best)"], starter: FN("most_common_char(text)"), tests: [{in: [], check: fnCheck("most_common_char", cs.map(s => [[s], f(s)]))}]}; }},
  {id: "a1b", make: () => ({k: R.int(2, 13)}),
   q: P => { const f = s => s.replace(/[a-z]/g, ch => String.fromCharCode((ch.charCodeAt(0) - 97 + P.k) % 26 + 97)).replace(/[A-Z]/g, ch => String.fromCharCode((ch.charCodeAt(0) - 65 + P.k) % 26 + 65)); const cs = ["abc", "Hello, World!", "xyz", "Secret Agent 7"];
     return {title: "Shift by " + P.k, task: "Create " + c("encode(text)") + " that shifts every letter " + P.k + " places along the alphabet (wrapping z→a), keeps capitals, and leaves other characters alone.", hints: ["chr((ord(ch) - ord('a') + " + P.k + ") % 26 + ord('a'))", "Handle .islower(), .isupper() and everything else separately."], starter: FN("encode(text)"), tests: [{in: [], check: fnCheck("encode", cs.map(s => [[s], f(s)]))}]}; }},
  {id: "a1c", make: () => ({}),
   q: P => { const cs = [["Tom Marvolo", "Mot Ravlomo"], ["silent", "listen"], ["apple", "papel"], ["aab", "abb"]]; const f = (a, b) => a.toLowerCase().replace(/ /g, "").split("").sort().join("") === b.toLowerCase().replace(/ /g, "").split("").sort().join("");
     return {title: "Same letters?", task: "Create " + c("same_letters(a, b)") + " that returns True if both texts use exactly the same letters the same number of times (ignore spaces and capitals).", hints: ["Normalise then compare sorted letters.", "clean = lambda s: sorted(s.lower().replace(\" \", \"\"))"], starter: FN("same_letters(a, b)"), tests: [{in: [], check: fnCheck("same_letters", cs.map(x => [x, f(...x)]))}]}; }}],
 // L2 recursion
 [{id: "a2a", make: () => ({}),
   q: P => { const cs = [R.int(100, 99999), 7, 0]; const f = n => String(n).split("").reduce((x, d) => x + +d, 0);
     return {title: "Recursive digit sum", task: "Create " + c("digit_sum(n)") + " <b>using recursion</b> (it must call itself, no loops).<br>" + c("digit_sum(472)") + " → " + c("13"), hints: ["Base case: if n < 10 return n.", "return n % 10 + digit_sum(n // 10)"], starter: FN("digit_sum(n)"), tests: [{in: [], check: fnCheck("digit_sum", cs.map(n => [[n], f(n)]), 'if code.count("digit_sum(") < 2: fail("digit_sum should call itself (recursion).")\nif "for " in code or "while " in code: fail("Try it with recursion instead of a loop.")')}]}; }},
  {id: "a2b", make: () => ({}),
   q: P => { const cs = [["ab", 3], ["Hi", 1], ["x", 0]]; const f = (s, n) => s.repeat(n);
     return {title: "Recursive repeat", task: "Create " + c("repeat(text, n)") + " that returns text repeated n times, <b>using recursion</b> (no * and no loops).", hints: ["Base case: n == 0 gives \"\".", "return text + repeat(text, n - 1)"], starter: FN("repeat(text, n)"), tests: [{in: [], check: fnCheck("repeat", cs.map(x => [x, f(...x)]), 'if code.count("repeat(") < 2: fail("repeat should call itself (recursion).")\nif "*" in code: fail("Try it without *, using recursion.")')}]}; }},
  {id: "a2c", make: () => ({}),
   q: P => { const cs = [[1, [2, [3, [4, 5]]]], [], [[[[7]]]]]; const f = a => { let t = 0; const w = x => Array.isArray(x) ? x.forEach(w) : t += x; w(a); return t; };
     return {title: "Deep sum", task: "Create " + c("deep_sum(items)") + " that adds up every number in a list, even numbers inside lists inside lists.<br>" + c("deep_sum([1, [2, [3]]])") + " → " + c("6"), hints: ["If an item is a list, call deep_sum on it.", "total += deep_sum(x) if isinstance(x, list) else x"], starter: FN("deep_sum(items)"), tests: [{in: [], check: fnCheck("deep_sum", cs.map(a => [[a], f(a)]))}]}; }}],
 // L3 algorithms
 [{id: "a3a", make: () => ({}),
   q: P => { const cs = [R.list(7, 1, 60), [], [3, 3, 1]]; const f = a => a.slice().sort((x, y) => y - x);
     return {title: "Sort it yourself", task: "Create " + c("sort_desc(nums)") + " that returns the numbers from biggest to smallest <b>without</b> using sorted() or .sort().", hints: ["Selection sort: repeatedly find the biggest remaining number.", "a = nums[:] then swap a[i] with the biggest of a[i:]"], starter: FN("sort_desc(nums)"), tests: [{in: [], check: fnCheck("sort_desc", cs.map(a => [[a], f(a)]), 'if "sorted(" in code or ".sort(" in code: fail("Write the sort yourself, without sorted() or .sort().")')}]}; }},
  {id: "a3b", make: () => ({}),
   q: P => { const cs = [[[1, 2], [3, 4]], [[1, 2, 3], [4, 5, 6]], [[7]]]; const f = g => g[0].map((_, i) => g.map(r => r[i]).reverse());
     return {title: "Rotate the grid", task: "Create " + c("rotate(grid)") + " that rotates a grid 90° clockwise.<br>" + c("rotate([[1, 2], [3, 4]])") + " → " + c("[[3, 1], [4, 2]]"), hints: ["New row i = column i read from the bottom up.", "return [[row[i] for row in grid[::-1]] for i in range(len(grid[0]))]"], starter: FN("rotate(grid)"), tests: [{in: [], check: fnCheck("rotate", cs.map(g => [[g], f(g)]))}]}; }},
  {id: "a3c", make: () => ({}),
   q: P => { const cs = [R.sample([4, 9, 2, 17, 11, 6, 23, 15], 6), [5, 5, 3], [1, 2]]; const f = a => { const u = Array.from(new Set(a)).sort((x, y) => y - x); return u.length > 1 ? u[1] : null; };
     return {title: "Second biggest", task: "Create " + c("second_biggest(nums)") + " that returns the second biggest <b>different</b> number, or " + c("None") + " if there isn't one.", hints: ["Remove repeats with set() first.", "u = sorted(set(nums), reverse=True)\nreturn u[1] if len(u) > 1 else None"], starter: FN("second_biggest(nums)"), tests: [{in: [], check: fnCheck("second_biggest", cs.concat([[8]]).map(a => [[a], f(a)]))}]}; }}],
 // L4 sort keys, sets, comprehensions
 [{id: "a4a", make: () => ({}),
   q: P => { const cs = [R.sample(WORDS, 6), ["bb", "a", "ab", "c"]]; const f = a => a.slice().sort((x, y) => x.length - y.length || (x < y ? -1 : x > y ? 1 : 0));
     return {title: "Length then A–Z", task: "Create " + c("tidy_sort(words)") + " that sorts words by length (shortest first), and alphabetically when lengths are equal.", hints: ["The key can be a tuple.", "return sorted(words, key=lambda w: (len(w), w))"], starter: FN("tidy_sort(words)"), tests: [{in: [], check: fnCheck("tidy_sort", cs.map(a => [[a], f(a)]))}]}; }},
  {id: "a4b", make: () => ({t: R.pick(["only_first", "not_both"])}),
   q: P => { const a = R.list(6, 1, 12), b = R.list(6, 1, 12); const f = (x, y) => { const X = new Set(x), Y = new Set(y); const r = P.t === "only_first" ? [...X].filter(v => !Y.has(v)) : [...X].filter(v => !Y.has(v)).concat([...Y].filter(v => !X.has(v))); return r.sort((p, q) => p - q); };
     return {title: P.t, task: "Create " + c(P.t + "(a, b)") + " that returns a sorted list of the numbers " + (P.t === "only_first" ? "in a but <b>not</b> in b" : "in a or b but <b>not both</b>") + " (no repeats).", hints: ["Sets: - is difference, ^ is 'not both'.", "return sorted(set(a) " + (P.t === "only_first" ? "-" : "^") + " set(b))"], starter: FN(P.t + "(a, b)"), tests: [{in: [], check: fnCheck(P.t, [[a, b], [[1, 2], [1, 2]], [[], [3]]].map(x => [x, f(...x)]))}]}; }},
  {id: "a4c", make: () => ({}),
   q: P => { const cs = [R.sample(WORDS, 3), []]; const f = a => D(a.map(w => [w, w.length]));
     return {title: "Word lengths", task: "Create " + c("lengths(words)") + " that returns a dictionary of each word and its length, using a <b>dictionary comprehension</b>.", hints: ["{key: value for w in words}", "return {w: len(w) for w in words}"], starter: FN("lengths(words)"), tests: [{in: [], check: fnCheck("lengths", cs.map(a => [[a], f(a)]), 'if "{" not in code or " for " not in code: fail("Use a dictionary comprehension.")')}]}; }}],
 // L5 grouping & compression
 [{id: "a5a", make: () => ({}),
   q: P => { const cs = [R.sample(WORDS, 7), []]; const f = a => { const d = []; a.forEach(w => { const e = d.find(x => x[0] === w[0]); if (e) e[1].push(w); else d.push([w[0], [w]]); }); return D(d); };
     return {title: "Group by first letter", task: "Create " + c("group_first(words)") + " that returns a dictionary: first letter → list of words starting with it (original order).", hints: ["setdefault(key, []).append(word)", "groups.setdefault(w[0], []).append(w)"], starter: FN("group_first(words)"), tests: [{in: [], check: fnCheck("group_first", cs.map(a => [[a], f(a)]))}]}; }},
  {id: "a5b", make: () => ({k: R.int(2, 4)}),
   q: P => { const nm = "chunks_of_" + P.k; const cs = [R.list(R.int(5, 9), 1, 9), [], R.list(P.k, 1, 9)]; const f = a => { const r = []; for (let i = 0; i < a.length; i += P.k) r.push(a.slice(i, i + P.k)); return r; };
     return {title: "Chunks of " + P.k, task: "Create " + c(nm + "(items)") + " that splits a list into smaller lists of " + P.k + " (the last one may be shorter).", hints: ["Slice with a step: range(0, len(items), " + P.k + ")", "return [items[i:i + " + P.k + "] for i in range(0, len(items), " + P.k + ")]"], starter: FN(nm + "(items)"), tests: [{in: [], check: fnCheck(nm, cs.map(a => [[a], f(a)]))}]}; }},
  {id: "a5c", make: () => ({}),
   q: P => { const cs = ["aaabccdddd", "", "abc", "zzzzzzzzzzzz"]; const f = s => s.replace(/(.)\1*/g, m => m.length > 1 ? m[0] + m.length : m[0]);
     return {title: "Smart compression", task: "Create " + c("squash(text)") + ": like run-length encoding, but a letter that appears once is written <b>without</b> a 1.<br>" + c("squash(\"aaabccdddd\")") + " → " + c("\"a3bc2d4\""), hints: ["Track the current letter and its count.", "Add letter + (str(count) if count > 1 else \"\")"], starter: FN("squash(text)"), tests: [{in: [], check: fnCheck("squash", cs.map(s => [[s], f(s)]))}]}; }}],
 // L6 validation & number systems
 [{id: "a6a", make: () => { const a = R.int(4, 6); return {a, b: a + R.int(4, 8)}; },
   q: P => { const f = s => s.length >= P.a && s.length <= P.b && /^[A-Za-z][A-Za-z0-9]*$/.test(s); const cs = ["coder1", "1coder", "ab", "a".repeat(P.b + 1), "Cool_Kid", "Zara" + "x".repeat(P.a)];
     return {title: "Valid username", task: "Create " + c("valid_username(name)") + " that returns True only if: it is " + P.a + " to " + P.b + " characters long, starts with a letter, and contains only letters and digits.", hints: ["name[0].isalpha() and name.isalnum()", "return " + P.a + " <= len(name) <= " + P.b + " and name[0].isalpha() and name.isalnum()"], starter: FN("valid_username(name)"), tests: [{in: [], check: fnCheck("valid_username", cs.map(s => [[s], f(s)]))}]}; }},
  {id: "a6b", make: () => ({t: R.pick(["to_binary", "from_binary"])}),
   q: P => { if (P.t === "to_binary") { const cs = [R.int(2, 255), 0, 1, R.int(256, 1000)]; return {title: "To binary", task: "Create " + c("to_binary(n)") + " that returns n written in binary as text, <b>without</b> using bin().<br>" + c("to_binary(6)") + " → " + c("\"110\""), hints: ["Keep taking n % 2 and dividing by 2.", "Build the text backwards: bits = str(n % 2) + bits; n //= 2"], starter: FN("to_binary(n)"), tests: [{in: [], check: fnCheck("to_binary", cs.map(n => [[n], n.toString(2)]), 'if "bin(" in code or "format(" in code: fail("Do it without bin() or format().")')}]}; }
     const cs = ["110", "0", "11111111", "1010"]; return {title: "From binary", task: "Create " + c("from_binary(bits)") + " that turns binary text into a number, <b>without</b> int(bits, 2).<br>" + c("from_binary(\"110\")") + " → " + c("6"), hints: ["For each bit: value = value * 2 + int(bit)", "value = 0\nfor b in bits:\n    value = value * 2 + int(b)"], starter: FN("from_binary(bits)"), tests: [{in: [], check: fnCheck("from_binary", cs.map(s => [[s], parseInt(s, 2)]), 'if ", 2)" in code.replace(" ", "").replace(",2)", ", 2)"): fail("Do it without int(bits, 2).")')}]}; }},
  {id: "a6c", make: () => ({}),
   q: P => { const cs = ["(a+b)*c", "((x)", ")(", "", "(())()"]; const f = s => { let d = 0; for (const ch of s) { if (ch === "(") d++; else if (ch === ")") { d--; if (d < 0) return false; } } return d === 0; };
     return {title: "Balanced brackets", task: "Create " + c("balanced(text)") + " that returns True if every ( has a matching ) in the right order.", hints: ["Keep a counter: +1 for (, -1 for ). It must never go below 0.", "At the end the counter must be 0."], starter: FN("balanced(text)"), tests: [{in: [], check: fnCheck("balanced", cs.map(s => [[s], f(s)]))}]}; }}],
 // L7 text stats & classes
 [{id: "a7a", make: () => ({cls: R.pick([["Cow", "Moo"], ["Duck", "Quack"], ["Lion", "Roar"], ["Owl", "Hoot"]])}),
   q: P => { const [C, S] = P.cls; const n = R.pick(NAMES);
     return {title: "Class " + C, task: "Create a class " + c(C) + " with a " + c("name") + " and a method " + c("speak()") + " that returns " + c("\"<name> says " + S + "!\"") + ".", hints: ["def __init__(self, name): self.name = name", "def speak(self): return f\"{self.name} says " + S + "!\""], starter: ST, tests: [{in: [], check: 'K = need("' + C + '")\nk = K(' + py(n) + ")\neq(k.name, " + py(n) + ", " + JSON.stringify(C + "(" + py(n) + ").name") + ")\neq(k.speak(), " + py(n + " says " + S + "!") + ", " + JSON.stringify(C + "(" + py(n) + ").speak()") + ")"}]}; }},
  {id: "a7b", make: () => ({}),
   q: P => { const cs = ["The elephant walked slowly.", "Hi, I am here!", "a bb cc"]; const f = s => { const ws = s.replace(/[.,!?]/g, "").split(/\s+/).filter(Boolean); let b = ws[0]; ws.forEach(w => { if (w.length > b.length) b = w; }); return b; };
     return {title: "Longest word", task: "Create " + c("longest_word(text)") + " that returns the longest word, ignoring . , ! ? (if there's a tie, the first one).", hints: ["Remove punctuation, split, then track the longest.", "Use > not >= so the first one wins ties."], starter: FN("longest_word(text)"), tests: [{in: [], check: fnCheck("longest_word", cs.map(s => [[s], f(s)]))}]}; }},
  {id: "a7c", make: () => ({s: R.int(0, 10), st: R.int(1, 5)}),
   q: P => ({title: "Counter class", task: "Create a class " + c("Counter") + " that starts at " + c("value") + " = " + P.s + ". " + c("increment()") + " adds " + P.st + " to value, and " + c("reset()") + " sets it back to " + P.s + ".", hints: ["self.value = " + P.s + " in __init__", "def increment(self): self.value += " + P.st], starter: ST, tests: [{in: [], check: 'C = need("Counter")\nk = C()\neq(k.value, ' + P.s + ', "a new Counter\'s value")\nk.increment()\nk.increment()\neq(k.value, ' + (P.s + 2 * P.st) + ', "value after 2 increments")\nk.reset()\neq(k.value, ' + P.s + ', "value after reset()")'}]})}],
 // L8 OOP & generators
 [{id: "a8a", make: () => ({t: R.pick(["Square", "Cuboid"])}),
   q: P => { if (P.t === "Square") { const s = R.int(2, 12); return {title: "Square class", task: "Create a class " + c("Square") + " made with a side length, with methods " + c("area()") + " and " + c("perimeter()") + ".", hints: ["self.side = side", "area: side * side, perimeter: 4 * side"], starter: ST, tests: [{in: [], check: 'S = need("Square")\neq(S(' + s + ').area(), ' + s * s + ', "Square(' + s + ').area()")\neq(S(' + s + ').perimeter(), ' + 4 * s + ', "Square(' + s + ').perimeter()")'}]}; }
     const [a, b, d] = [R.int(2, 9), R.int(2, 9), R.int(2, 9)]; return {title: "Cuboid class", task: "Create a class " + c("Cuboid") + " made with length, width and height, with methods " + c("volume()") + " and " + c("surface_area()") + ".", hints: ["volume = l * w * h", "surface area = 2 * (l*w + l*h + w*h)"], starter: ST, tests: [{in: [], check: 'C = need("Cuboid")\nk = C(' + a + ", " + b + ", " + d + ')\neq(k.volume(), ' + a * b * d + ', "Cuboid(' + a + ", " + b + ", " + d + ').volume()")\neq(k.surface_area(), ' + 2 * (a * b + a * d + b * d) + ', "Cuboid(' + a + ", " + b + ", " + d + ').surface_area()")'}]}; }},
  {id: "a8b", make: () => ({s: R.pick([["Triangle", 3], ["Pentagon", 5], ["Hexagon", 6], ["Octagon", 8]])}),
   q: P => { const [N, k] = P.s;
     return {title: "Shapes family", task: "Create a class " + c("Shape") + " with a method " + c("sides()") + " that returns 0, and a method " + c("describe()") + " that returns " + c("f\"I have {self.sides()} sides\"") + ". Then create " + c(N) + " that <b>inherits</b> from Shape and overrides " + c("sides()") + " to return " + k + ".", hints: ["class " + N + "(Shape):", "Only sides() needs overriding. describe() is inherited and will use the new sides()!"], starter: ST, tests: [{in: [], check: 'S = need("Shape")\nK = need("' + N + '")\nif not issubclass(K, S): fail("' + N + ' should inherit from Shape.")\neq(S().sides(), 0, "Shape().sides()")\neq(K().describe(), "I have ' + k + ' sides", "' + N + '().describe()")'}]}; }},
  {id: "a8c", make: () => ({k: R.int(2, 9)}),
   q: P => { const nm = "multiples_of_" + P.k;
     return {title: "Generator: multiples of " + P.k, task: "Create a generator " + c(nm + "(n)") + " that <b>yields</b> the first n multiples of " + P.k + ".<br>" + c("list(" + nm + "(3))") + " → " + c(py([P.k, 2 * P.k, 3 * P.k])), hints: ["Use yield inside a loop.", "for i in range(1, n + 1):\n    yield i * " + P.k], starter: FN(nm + "(n)"), tests: [{in: [], check: uses("yield", "Use yield.") + '\nf = need("' + nm + '")\n' + [5, 0, 1].map(n => "eq(list(f(" + n + ")), " + py(Array.from({length: n}, (_, i) => (i + 1) * P.k)) + ', "list(' + nm + "(" + n + '))")').join("\n")}]}; }}],
 // L9 flexible functions & parsing
 [{id: "a9a", make: () => ({t: R.pick(["biggest", "average"])}),
   q: P => { const cs = [[3, 9, 4], [R.int(1, 20)], [2, 4, 6, 8]]; const f = a => P.t === "biggest" ? Math.max(...a) : sum(a) / a.length;
     return {title: P.t + "(*nums)", task: "Create " + c(P.t + "(*nums)") + " that takes any number of numbers and returns the " + (P.t === "biggest" ? "biggest" : "average") + ". With no numbers, return " + c("None") + ".", hints: ["*nums collects everything into a tuple.", "if not nums:\n    return None"], starter: FN(P.t + "(*nums)"), tests: [{in: [], check: 'need("' + P.t + '")\n' + cs.map(a => "eq(" + P.t + "(" + a.join(", ") + "), " + py(f(a)) + ', "' + P.t + "(" + a.join(", ") + ')")').join("\n") + "\neq(" + P.t + '(), None, "' + P.t + '()")'}]}; }},
  {id: "a9b", make: () => ({sep: R.pick([",", ";", "|"])}),
   q: P => { const L = R.list(R.int(3, 6), 1, 50); const s = L.join(P.sep); const cs = [s, "5", "10" + P.sep + "20"];
     return {title: "Add up the text", task: "Create " + c("total(text)") + " that takes numbers separated by " + c(P.sep) + " and returns their total.<br>" + c("total(\"" + L.slice(0, 3).join(P.sep) + "\")") + " → " + c(sum(L.slice(0, 3))), hints: ["text.split(\"" + P.sep + "\") gives a list of number-texts.", "return sum(int(x) for x in text.split(\"" + P.sep + "\"))"], starter: FN("total(text)"), tests: [{in: [], check: fnCheck("total", cs.map(t => [[t], sum(t.split(P.sep).map(Number))]))}]}; }},
  {id: "a9c", make: () => ({}),
   q: P => { const t = () => String(R.int(0, 59)).padStart(2, "0") + ":" + String(R.int(0, 59)).padStart(2, "0"); const cs = [t(), "00:00", t(), "10:05"]; const f = s => { const [m, x] = s.split(":").map(Number); return m * 60 + x; };
     return {title: "Stopwatch seconds", task: "Create " + c("to_seconds(time)") + " that turns " + c("\"mm:ss\"") + " into total seconds.<br>" + c("to_seconds(\"02:30\")") + " → " + c("150"), hints: ["m, s = time.split(\":\")", "return int(m) * 60 + int(s)"], starter: FN("to_seconds(time)"), tests: [{in: [], check: fnCheck("to_seconds", cs.map(s => [[s], f(s)]))}]}; }}],
 // L10 efficient algorithms & projects
 [{id: "a10a", make: () => ({s: R.pick([[1, 2], [1, 3], [2, 3]])}),
   q: P => { const [a, b] = P.s; const memo = {}; const f = n => { if (n === 0) return 1; if (n < 0) return 0; if (memo[n] != null) return memo[n]; return memo[n] = f(n - a) + f(n - b); }; const big = 70;
     return {title: "Climbing stairs", task: "You can climb a staircase " + a + " or " + b + " steps at a time. Create " + c("ways(n)") + " that returns how many different ways there are to climb n steps. It must be <b>fast</b>: " + c("ways(" + big + ")") + " must finish instantly!", hints: ["ways(n) = ways(n - " + a + ") + ways(n - " + b + "). ways(0) is 1, and negative steps give 0.", "Store answers in a dictionary (memoisation), or build up a list from 0 to n."], starter: FN("ways(n)"), tests: [{in: [], check: fnCheck("ways", [0, 5, 10, big].map(n => [[n], f(n)]))}]}; }},
  {id: "a10b", make: () => { const a = R.int(80, 90), b = R.int(60, 75); return {a, b}; },
   q: P => { const ns = R.sample(NAMES, 4); const sc = [P.a + 2, P.a, P.b, P.b - 5]; const d = {}; ns.forEach((n, i) => d[n] = sc[i]); const g = s => s >= P.a ? "A" : s >= P.b ? "B" : "C"; const exp = {}; ns.forEach((n, i) => exp[n] = g(sc[i]));
     return {title: "Grade book", task: "Create " + c("grade_book(scores)") + " that takes a dictionary name → score and returns a new dictionary name → grade: " + c("\"A\"") + " for " + P.a + "+, " + c("\"B\"") + " for " + P.b + "+, otherwise " + c("\"C\"") + ".", hints: ["Write a small helper that turns one score into a grade.", "return {name: grade(s) for name, s in scores.items()}"], starter: FN("grade_book(scores)"), tests: [{in: [], check: fnCheck("grade_book", [[[d], exp], [[{}], {}]])}]}; }},
  {id: "a10c", make: () => ({}),
   q: P => { const f = n => { let r = [1]; for (let i = 0; i < n; i++) { const nr = [1]; for (let j = 0; j < r.length - 1; j++) nr.push(r[j] + r[j + 1]); nr.push(1); r = nr; } return r; }; const cs = [0, 1, 4, R.int(5, 9)];
     return {title: "One row of Pascal", task: "Create " + c("pascal_row(n)") + " that returns row n of Pascal's triangle (row 0 is " + c("[1]") + ", row 2 is " + c("[1, 2, 1]") + ").", hints: ["Start with [1] and build the next row n times.", "row = [1] + [row[i] + row[i + 1] for i in range(len(row) - 1)] + [1]"], starter: FN("pascal_row(n)"), tests: [{in: [], check: fnCheck("pascal_row", cs.map(n => [[n], f(n)]))}]}; }}],
]};



/* Model answers for every exercise type. SOL[id](P, Q, N) returns Python code.
   P = the exercise's random settings, Q = the exercise, N = the function name in the exercise. */
const pyv = v => py(v);
const SOL = {
// ---------- Beginner ----------
b1a: P => `print(${pyv(P.p)})`,
b1b: P => P.w.map(w => `print(${pyv(w)})`).join("\n"),
b2a: P => `print(${P.a} ${P.op} ${P.b})`,
b2b: P => `${P.v} = ${P.n}\nprint(${P.v} * ${P.k})`,
b3a: P => `first = ${pyv(P.a)}\nsecond = ${pyv(P.b)}\nprint(first + " " + second)`,
b3b: P => `x = ${P.x}\ny = ${P.y}\nprint(x - y)`,
b3c: P => `name = ${pyv(P.n)}\nfood = ${pyv(P.f)}\nprint(name + " likes " + food)`,
b4a: P => `print(${pyv(P.w)} * ${P.n})`,
b4b: P => `word = ${pyv(P.w)}\nprint(len(word))`,
b4c: P => `word = ${pyv(P.w)}\nprint(word.${P.up ? "upper" : "lower"}())`,
b5a: P => `pet = ${pyv(P.pet)}\nname = ${pyv(P.n)}\nage = ${P.age}\nprint(f"My {pet} {name} is {age}")`,
b5b: P => `name = input()\nprint(${pyv(P.g + ", ")} + name + "!")`,
b5c: P => `text = "${P.n}"\nprint(int(text) + ${P.k})`,
b6a: P => `n = int(input())\nif n > ${P.t}:\n    print(${pyv(P.pr[0])})\nelse:\n    print(${pyv(P.pr[1])})`,
b6b: P => `n = int(input())\nif n % ${P.k} == 0:\n    print("Yes")\nelse:\n    print("No")`,
b7a: P => `s = int(input())\nif s >= ${P.a}:\n    print(${pyv(P.w[0])})\nelif s >= ${P.b}:\n    print(${pyv(P.w[1])})\nelse:\n    print(${pyv(P.w[2])})`,
b7b: P => `n = int(input())\nif n >= ${P.lo} and n <= ${P.hi}:\n    print("In range")\nelse:\n    print("Out of range")`,
b7c: P => `for n in range(${P.a}, ${P.b + 1}):\n    print(n)`,
b8a: P => `for i in range(${P.n}):\n    print(${pyv(P.p)})`,
b8b: P => `for n in range(${P.a}, ${P.b + 1}, ${P.s}):\n    print(n)`,
b8c: P => `total = 0\nfor n in range(${P.a}, ${P.b + 1}):\n    total = total + n\nprint(total)`,
b9a: P => `count = ${P.n}\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint(${pyv(P.w)})`,
b9b: P => `items = ${pyv(P.L)}\nprint(items[${P.i}])`,
b9c: P => `names = ${pyv(P.L)}\nfor name in names:\n    print(${pyv(P.g + " ")} + name)`,
b10a: P => `${P.v} = []\n` + P.L.map(x => `${P.v}.append(${pyv(x)})`).join("\n") + `\nprint(${P.v})`,
b10b: P => `def ${P.name}(n):\n    return n ${P.op} ${P.k}`,
b10c: P => `def ${P.fn}():\n    print(${pyv(P.p)})\n\n` + Array(P.n).fill(P.fn + "()").join("\n"),
// ---------- Intermediate ----------
i1a: (P, Q, N) => `def ${N}(n):\n    return n ${P.op} ${P.k}`,
i1b: (P, Q, N) => `def ${N}(n):\n    return n ${P.cmp} ${P.k}`,
i1c: (P, Q, N) => `def ${N}(a, b):\n    return ` + {area: "a * b", perimeter: "2 * (a + b)", average_of_two: "(a + b) / 2"}[P.t],
i2a: (P, Q, N) => `def ${N}(text):\n    count = 0\n    for ch in text.lower():\n        if ch == "${P.L}":\n            count += 1\n    return count`,
i2b: (P, Q, N) => `def ${N}(nums):\n    total = 0\n    for n in nums:\n        if n > ${P.k}:\n            total += n\n    return total`,
i2c: (P, Q, N) => `def ${N}(nums):\n    result = 1\n    for n in nums:\n        result *= n\n    return result`,
i3a: P => `for i in range(1, ${P.n + 1}):\n    if i % ${P.a} == 0 and i % ${P.b} == 0:\n        print(${pyv(P.wa + P.wb)})\n    elif i % ${P.a} == 0:\n        print(${pyv(P.wa)})\n    elif i % ${P.b} == 0:\n        print(${pyv(P.wb)})\n    else:\n        print(i)`,
i3b: (P, Q, N) => `def ${N}(text):\n    count = 0\n    for w in text.split():\n        if len(w) > ${P.k}:\n            count += 1\n    return count`,
i3c: (P, Q, N) => `def ${N}(word):\n    return word[0].lower() in "aeiou"`,
i4a: P => `multiples = [x * ${P.k} for x in range(1, ${P.n + 1})]\nprint(multiples)`,
i4b: (P, Q, N) => `def ${N}(nums):\n    return [n for n in nums if ${P.mode === "div" ? "n % " + P.k + " == 0" : "n > " + P.t}]`,
i4c: (P, Q, N) => `def ${N}(nums):\n    if not nums:\n        return 0\n    return max(nums) - min(nums)`,
i5a: P => `${P.v} = {` + P.s.map(([a, b]) => pyv(a) + ": " + pyv(b)).join(", ") + `}\nprint(${P.v}[${pyv(P.k)}])`,
i5b: (P, Q, N) => `def ${N}(words):\n    counts = {}\n    for w in words:\n        first = w[0]\n        counts[first] = counts.get(first, 0) + 1\n    return counts`,
i5c: (P, Q, N) => `def ${N}(score):\n    if score >= ${P.a}:\n        return "Distinction"\n    elif score >= ${P.b}:\n        return "Pass"\n    return "Retry"`,
i6a: (P, Q, N) => `def ${N}(nums):\n    best = 0\n    for i in range(len(nums)):\n        if nums[i] < nums[best]:\n            best = i\n    return best`,
i6b: (P, Q, N) => P.t === "count_digits" ? `def ${N}(n):\n    return len(str(n))` : `def ${N}(n):\n    result = 1\n    for d in str(n):\n        result *= int(d)\n    return result`,
i6c: (P, Q, N) => `def ${N}(items, target):\n    for i in range(len(items)):\n        if items[i] == target:\n            return i\n    return -1`,
i7a: (P, Q, N) => `def ${N}(n):\n    return [${P.a} + i * ${P.d} for i in range(n)]`,
i7b: (P, Q, N) => `def is_prime(x):\n    if x < 2:\n        return False\n    for d in range(2, int(x ** 0.5) + 1):\n        if x % d == 0:\n            return False\n    return True\n\ndef ${N}(n):\n    return len([x for x in range(2, n + 1) if is_prime(x)])`,
i7c: (P, Q, N) => `def ${N}(n):\n    return [d for d in range(1, n + 1) if n % d == 0]`,
i8a: (P, Q, N) => `def ${N}(text):\n    return " ".join(text.split()[::-1])`,
i8b: (P, Q, N) => `def ${N}(items):\n    return len(set(items))`,
i8c: (P, Q, N) => `def ${N}(text):\n    return " ".join(w.capitalize() for w in text.split())`,
i9a: (P, Q, N) => `def ${N}(grid):\n    return [sum(row) for row in grid]`,
i9b: (P, Q, N) => `def ${N}(text):\n    try:\n        return int(text)\n    except ValueError:\n        return ${P.k}`,
i9c: (P, Q, N) => `def ${N}(value):\n    return f"{value:.${P.d}f} ${P.u}"`,
i10a: (P, Q, N) => P.t === "desc" ? `def ${N}(nums):\n    return sorted(nums, reverse=True)` : `def ${N}(words):\n    return sorted(words, key=lambda w: w[-1])`,
i10b: (P, Q, N) => `def ${N}(scores):\n    return min(scores, key=scores.get)`,
i10c: (P, Q, N) => `def ${N}(cart, prices):\n    total = 0\n    for item, qty in cart.items():\n        total += qty * prices[item]\n    return total * ${(100 - P.pct) / 100}`,
// ---------- Advanced ----------
a1a: (P, Q, N) => `def ${N}(text):\n    counts = {}\n    for ch in text:\n        if ch != " ":\n            counts[ch] = counts.get(ch, 0) + 1\n    best = max(counts.values())\n    return min(ch for ch in counts if counts[ch] == best)`,
a1b: (P, Q, N) => `def ${N}(text):\n    out = ""\n    for ch in text:\n        if ch.islower():\n            out += chr((ord(ch) - 97 + ${P.k}) % 26 + 97)\n        elif ch.isupper():\n            out += chr((ord(ch) - 65 + ${P.k}) % 26 + 65)\n        else:\n            out += ch\n    return out`,
a1c: (P, Q, N) => `def ${N}(a, b):\n    clean = lambda s: sorted(s.lower().replace(" ", ""))\n    return clean(a) == clean(b)`,
a2a: (P, Q, N) => `def ${N}(n):\n    if n < 10:\n        return n\n    return n % 10 + ${N}(n // 10)`,
a2b: (P, Q, N) => `def ${N}(text, n):\n    if n <= 0:\n        return ""\n    return text + ${N}(text, n - 1)`,
a2c: (P, Q, N) => `def ${N}(items):\n    total = 0\n    for x in items:\n        if isinstance(x, list):\n            total += ${N}(x)\n        else:\n            total += x\n    return total`,
a3a: (P, Q, N) => `def ${N}(nums):\n    a = nums[:]\n    for i in range(len(a)):\n        big = i\n        for j in range(i + 1, len(a)):\n            if a[j] > a[big]:\n                big = j\n        a[i], a[big] = a[big], a[i]\n    return a`,
a3b: (P, Q, N) => `def ${N}(grid):\n    return [[row[i] for row in grid[::-1]] for i in range(len(grid[0]))]`,
a3c: (P, Q, N) => `def ${N}(nums):\n    u = sorted(set(nums), reverse=True)\n    return u[1] if len(u) > 1 else None`,
a4a: (P, Q, N) => `def ${N}(words):\n    return sorted(words, key=lambda w: (len(w), w))`,
a4b: (P, Q, N) => P.t === "only_first" ? `def ${N}(a, b):\n    return sorted(set(a) - set(b))` : `def ${N}(a, b):\n    return sorted(set(a) ^ set(b))`,
a4c: (P, Q, N) => `def ${N}(words):\n    return {w: len(w) for w in words}`,
a5a: (P, Q, N) => `def ${N}(words):\n    groups = {}\n    for w in words:\n        groups.setdefault(w[0], []).append(w)\n    return groups`,
a5b: (P, Q, N) => `def ${N}(items):\n    return [items[i:i + ${P.k}] for i in range(0, len(items), ${P.k})]`,
a5c: (P, Q, N) => `def ${N}(text):\n    out = ""\n    i = 0\n    while i < len(text):\n        j = i\n        while j < len(text) and text[j] == text[i]:\n            j += 1\n        count = j - i\n        out += text[i] + (str(count) if count > 1 else "")\n        i = j\n    return out`,
a6a: (P, Q, N) => `def ${N}(name):\n    return ${P.a} <= len(name) <= ${P.b} and name[0].isalpha() and name.isalnum() and name.isascii()`,
a6b: (P, Q, N) => P.t === "to_binary" ? `def ${N}(n):\n    if n == 0:\n        return "0"\n    bits = ""\n    while n > 0:\n        bits = str(n % 2) + bits\n        n //= 2\n    return bits` : `def ${N}(bits):\n    value = 0\n    for b in bits:\n        value = value * 2 + int(b)\n    return value`,
a6c: (P, Q, N) => `def ${N}(text):\n    depth = 0\n    for ch in text:\n        if ch == "(":\n            depth += 1\n        elif ch == ")":\n            depth -= 1\n            if depth < 0:\n                return False\n    return depth == 0`,
a7a: P => `class ${P.cls[0]}:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return f"{self.name} says ${P.cls[1]}!"`,
a7b: (P, Q, N) => `def ${N}(text):\n    for ch in ".,!?":\n        text = text.replace(ch, "")\n    best = ""\n    for w in text.split():\n        if len(w) > len(best):\n            best = w\n    return best`,
a7c: P => `class Counter:\n    def __init__(self):\n        self.value = ${P.s}\n\n    def increment(self):\n        self.value += ${P.st}\n\n    def reset(self):\n        self.value = ${P.s}`,
a8a: P => P.t === "Square" ? `class Square:\n    def __init__(self, side):\n        self.side = side\n\n    def area(self):\n        return self.side * self.side\n\n    def perimeter(self):\n        return 4 * self.side` : `class Cuboid:\n    def __init__(self, l, w, h):\n        self.l, self.w, self.h = l, w, h\n\n    def volume(self):\n        return self.l * self.w * self.h\n\n    def surface_area(self):\n        return 2 * (self.l * self.w + self.l * self.h + self.w * self.h)`,
a8b: P => `class Shape:\n    def sides(self):\n        return 0\n\n    def describe(self):\n        return f"I have {self.sides()} sides"\n\nclass ${P.s[0]}(Shape):\n    def sides(self):\n        return ${P.s[1]}`,
a8c: (P, Q, N) => `def ${N}(n):\n    for i in range(1, n + 1):\n        yield i * ${P.k}`,
a9a: (P, Q, N) => P.t === "biggest" ? `def ${N}(*nums):\n    if not nums:\n        return None\n    return max(nums)` : `def ${N}(*nums):\n    if not nums:\n        return None\n    return sum(nums) / len(nums)`,
a9b: (P, Q, N) => `def ${N}(text):\n    return sum(int(x) for x in text.split(${pyv(P.sep)}))`,
a9c: (P, Q, N) => `def ${N}(time):\n    m, s = time.split(":")\n    return int(m) * 60 + int(s)`,
a10a: (P, Q, N) => `def ${N}(n, memo={}):\n    if n == 0:\n        return 1\n    if n < 0:\n        return 0\n    if n not in memo:\n        memo[n] = ${N}(n - ${P.s[0]}) + ${N}(n - ${P.s[1]})\n    return memo[n]`,
a10b: (P, Q, N) => `def ${N}(scores):\n    result = {}\n    for name, s in scores.items():\n        if s >= ${P.a}:\n            result[name] = "A"\n        elif s >= ${P.b}:\n            result[name] = "B"\n        else:\n            result[name] = "C"\n    return result`,
a10c: (P, Q, N) => `def ${N}(n):\n    row = [1]\n    for _ in range(n):\n        row = [1] + [row[i] + row[i + 1] for i in range(len(row) - 1)] + [1]\n    return row`,
};
function answerFor(g, P, Q){
  const m = /def\s+([A-Za-z_]\w*)\s*\(/.exec(Q.starter || "") || /c\("?([A-Za-z_]\w*)\(/.exec("");
  let N = Q.fname || (m && m[1]);
  if (!N){ const t = /<code>([A-Za-z_]\w*)\(/.exec(Q.task || ""); N = t ? t[1] : "solution"; }
  const f = SOL[g.id];
  return f ? f(P, Q, N) : null;
}

const LESSONS = {"beginner": [{"title": "Talking to the computer", "goal": "Use print() to make Python show words on the screen."}, {"title": "Maths and variables", "goal": "Make Python do sums, and store values in variables."}, {"title": "Variables with words and numbers", "goal": "Store text in variables and join it together."}, {"title": "Text tricks", "goal": "Repeat text, count letters and change capitals."}, {"title": "f-strings and asking questions", "goal": "Build sentences with f-strings, turn text into numbers and use input()."}, {"title": "Making decisions", "goal": "Use if and else to make your program choose what to do."}, {"title": "Smarter decisions and your first loop", "goal": "Use elif and 'and' for several choices, then repeat code with a for loop."}, {"title": "Loops that count and add", "goal": "Repeat actions, count in steps and add up totals with loops."}, {"title": "While loops and lists", "goal": "Repeat while something is true, and store many items in a list."}, {"title": "Growing lists and making functions", "goal": "Add to lists and write your own functions."}], "intermediate": [{"title": "Functions that return answers", "goal": "Write functions that take inputs and return results."}, {"title": "Looping through lists and text", "goal": "Use loops to total lists and examine text letter by letter."}, {"title": "Logic puzzles with strings and loops", "goal": "Combine conditions, string methods and loops to solve classic puzzles."}, {"title": "Building lists quickly", "goal": "Use list comprehensions to create and filter lists."}, {"title": "Dictionaries", "goal": "Store and look up data with keys and values."}, {"title": "Searching and number crunching", "goal": "Track positions in lists and pull numbers apart."}, {"title": "Sequences and primes", "goal": "Generate number sequences and test numbers with loops."}, {"title": "Cleaning up data", "goal": "Tidy text, remove repeats and return several values."}, {"title": "Nested data and handling errors", "goal": "Work with lists inside lists, catch errors and format numbers."}, {"title": "Sorting and a mini project", "goal": "Sort with keys, find the best item and combine everything in a project."}], "advanced": [{"title": "Analysing text", "goal": "Count characters, compare words and transform text with character codes."}, {"title": "Ciphers and recursion", "goal": "Reuse functions, and write functions that call themselves."}, {"title": "Classic algorithms", "goal": "Implement searching and sorting algorithms, and reshape grids."}, {"title": "Sort keys, sets and comprehensions", "goal": "Sort by several rules, and use sets and dictionary comprehensions."}, {"title": "Grouping and compression", "goal": "Group data into dictionaries and write an encoder and decoder."}, {"title": "Validation and Roman numerals", "goal": "Check rules with any(), and convert between number systems."}, {"title": "Text statistics and classes", "goal": "Find the most common word, then design your own classes."}, {"title": "Inheritance and generators", "goal": "Extend classes with inheritance, and create values on demand with yield."}, {"title": "Flexible functions and game logic", "goal": "Accept any number of arguments, parse text and check game boards."}, {"title": "Efficient algorithms and a final project", "goal": "Build sequences row by row, make slow code fast, and finish a project."}]};
return {GEN, setGradeTheme, answerFor, LESSONS, SOL};
})();
