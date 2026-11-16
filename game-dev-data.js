/* Grade 7 Computer Science · Game Development unit (MakeCode Arcade)
   Shared by the student page (game-dev.html) and the staff dashboard (sisd-design-and-computing/admin.html).
   Holds: the 9-week plan (+ optional week 10), the four stages and their workbook fields, hints and examples,
   the MakeCode Arcade toolkit, the assessment guide, and a read-only renderer for teachers. */
window.GD7 = (function(){
"use strict";
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const words = t => (String(t || "").trim().match(/[A-Za-z0-9À-ɏ'’-]+/g) || []).length;

/* MakeCode Arcade's default 16-colour palette (0 = transparent) */
const PALETTE = ["transparent","#ffffff","#ff2121","#ff93c4","#ff8135","#fff609","#249ca3","#78dc52","#003fad","#87f2ff","#8e2ec4","#a4839f","#5c406c","#e5cdc4","#91463d","#000000"];
const PAL_NAMES = ["Clear","White","Red","Pink","Orange","Yellow","Teal","Green","Blue","Light blue","Purple","Grey-pink","Dark purple","Beige","Brown","Black"];
/* level-map tiles */
const TILES = [
  { k:".", n:"Empty / sky",      c:"#dfe9f7", e:"" },
  { k:"W", n:"Wall / ground",    c:"#5c4033", e:"" },
  { k:"P", n:"Platform",         c:"#8b5a2b", e:"" },
  { k:"S", n:"Player start",     c:"#13a05a", e:"🙂" },
  { k:"G", n:"Goal / exit door", c:"#fff609", e:"🚪" },
  { k:"C", n:"Collectible",      c:"#ffd36b", e:"🪙" },
  { k:"E", n:"Enemy",            c:"#ff8a8a", e:"👾" },
  { k:"H", n:"Hazard (lava, spikes)", c:"#ff2121", e:"🔥" },
  { k:"U", n:"Power-up",         c:"#8e2ec4", e:"⭐" },
  { k:"K", n:"Key / switch",     c:"#87f2ff", e:"🔑" },
  { k:"B", n:"Boss",             c:"#a3172a", e:"👹" },
  { k:"~", n:"Water / slow zone", c:"#249ca3", e:"" }
];
const TILE = {}; TILES.forEach(t => TILE[t.k] = t);
const MAP_SIZES = [[16,12,"16 × 12 (one screen and a bit)"],[24,12,"24 × 12 (side-scroller)"],[32,12,"32 × 12 (long side-scroller)"],[20,20,"20 × 20 (top-down / maze)"]];

/* ---------- the four stages (each has its own super admin switch) ---------- */
const STAGES = [
  { n:1, key:"s1", icon:"💡", name:"Game Idea", weeks:"Weeks 1–2", crit:"A and B",
    intro:"Every real game starts on paper. Before you touch MakeCode, you will research games you like, brainstorm ideas, choose the best one and write a full Game Idea Proposal that someone else could read and picture your game." },
  { n:2, key:"s2", icon:"🗺", name:"Level Design", weeks:"Weeks 3–4", crit:"B",
    intro:"Now design every level in detail: draw the map, place the start, the goal, enemies, hazards and collectibles, and explain what is new and why each level is harder than the one before." },
  { n:3, key:"s3", icon:"🛠", name:"Build & Test", weeks:"Weeks 5–8", crit:"C",
    intro:"Build your game in MakeCode Arcade, following your plan. Test after every change, keep a development diary and a test log, and fix your bugs as you go." },
  { n:4, key:"s4", icon:"🏆", name:"Playtest & Evaluate", weeks:"Week 9 (+ Week 10 showcase)", crit:"D",
    intro:"Let other people play your game. Collect their feedback, make improvements, and judge your game honestly against your own success criteria." }
];

/* ---------- the week-by-week plan ---------- */
const WEEKS = [
  { w:1, s:1, title:"What makes a great game?",
    walt:"We are learning to analyse what makes games fun and how they are built from simple rules.",
    wilf:["I can name at least five game genres and give an example of each","I can describe a game's core loop, goal, controls and how you win or lose","I can analyse two existing games and say what I would borrow"],
    act:["Starter: name a game you love in one sentence: what do you DO over and over? (that's the core loop)","Watch and discuss: genres, goals, rules, feedback (score, sound, lives) and challenge","Open arcade.makecode.com, play two games from the gallery (Platformer, Maze, Shooter…)","Fill in the Research section of your workbook for both games","Plenary: share one thing that makes a game fun and one thing that makes it frustrating"],
    hints:["Fun usually = a clear goal + a challenge that grows + quick feedback (sounds, points, effects).","Look for the core loop: e.g. jump → collect → avoid → reach the door → repeat on a harder level.","Write about what the game DOES, not just 'it's good'. Say why it's good."] },
  { w:2, s:1, title:"Pitch your game",
    walt:"We are learning to develop and justify an original game idea for a target audience.",
    wilf:["I have brainstormed three ideas and justified the one I chose","My proposal explains genre, story, player, controls, how to win and how to lose","I have written at least five success criteria that I can test","I have sketched my main character on the pixel grid"],
    act:["Starter: spin the Idea Generator three times and pick your favourite twist","Brainstorm three different ideas, then choose one and explain why","Write your Game Idea Proposal: every box, in full sentences","Draw your main character on the 16 × 16 pixel grid (MakeCode's real colours)","Write your success criteria and how you will test each one, then submit Stage 1"],
    hints:["Keep it small enough to build in four weeks: three good levels beat ten unfinished ones.","Your pitch should make a friend say 'I want to play that!' in one sentence.","Success criteria must be testable: 'Level 2 has more enemies than Level 1' is testable; 'my game is fun' is not."] },
  { w:3, s:2, title:"Designing great levels",
    walt:"We are learning to design levels that teach, test and then challenge the player.",
    wilf:["I can explain how difficulty should increase from level to level","I have drawn Level 1 and Level 2 on the level grid","Each level lists its objective, enemies, hazards, items and what is new"],
    act:["Starter: what makes the first level of a game different from the last?","Learn: Teach → Test → Challenge, the difficulty curve, signposting the goal, safe spaces","Draw Level 1 on the grid: start, goal, walls, a few collectibles, maybe one enemy","Draw Level 2 and add ONE new idea (a new enemy, hazard, key or power-up)","Peer check: can a partner find the start and the goal on your map in five seconds?"],
    hints:["Level 1 should be almost impossible to lose: it teaches the controls.","Introduce one new thing per level, so the player learns it before it gets hard.","Use collectibles like breadcrumbs: they guide the player towards the goal."] },
  { w:4, s:2, title:"Final level, game flow and code plan",
    walt:"We are learning to plan how our game flows and which code events each level needs.",
    wilf:["I have designed at least three levels in full detail","I have shown the flow of screens from title to win or game over","My code plan lists the 'When… then…' events my game needs","I have a test plan with at least four tests"],
    act:["Starter: put these in order: title screen, game over, Level 1, instructions, you win","Design your final level (Level 3, or a boss or bonus level)","Write your game flow and your code plan as 'When… then…' rules","Write your test plan, check the stage checklist and submit Stage 2"],
    hints:["Every rule in your code plan becomes an event block in MakeCode: on overlap, on button pressed, on countdown end…","A 'When…' is something that happens; a 'then…' is what the game does about it.","Plan how you'll move from one level to the next: usually touching a door tile."] },
  { w:5, s:3, title:"Build: player, movement and Level 1",
    walt:"We are learning to create sprites, controls and a tilemap level in MakeCode Arcade.",
    wilf:["My player sprite moves with the controller","Level 1 is built as a tilemap with walls","The camera follows my player","I have shared my project link and written my first diary entry"],
    act:["Start a new project at arcade.makecode.com and name it with your game title","Create your player (use the sprite you drew in Stage 1) and make it move","Build Level 1 with the tilemap editor; draw walls with the wall tool","Make the camera follow the player; for a platformer add gravity and jumping","Test, then fill in your diary and test log; save your share link"],
    hints:["Toolkit cards: 'Make your player', 'Move with the arrow keys', 'Build a level with a tilemap', 'Platformer gravity and jump'.","Name your tiles clearly in the tile editor (start, door, coin, lava): your code uses those names.","Press the ▶ simulator often: test after every few blocks, not at the end."] },
  { w:6, s:3, title:"Build: enemies, collectibles, score and lives",
    walt:"We are learning to use events, sprite kinds and overlaps to create gameplay.",
    wilf:["Collectibles add to my score when touched","Enemies take a life and behave the way I designed","My game can be won or lost","My test log records what I tested and what I fixed"],
    act:["Starter: which Sprite Kinds will your game need? (Player, Enemy, Food, Projectile, your own?)","Turn coin and enemy tiles into sprites, or create them with code","Add 'on overlap' events: coins → score, enemies → lose a life","Add enemy behaviour: follow, patrol or bounce","Test every event; log at least two tests and any bugs"],
    hints:["Overlaps only work between the right Sprite Kinds: check you set the kind when you create the sprite.","If an enemy takes all your lives at once, destroy it or push the player back when they overlap.","Set lives at the start with 'set life to 3'. At zero lives the game ends by itself."] },
  { w:7, s:3, title:"Build: more levels and power-ups",
    walt:"We are learning to use variables and functions to manage several levels.",
    wilf:["A level variable and a function load each level","Touching the goal takes the player to the next level","Each level is harder in the ways I planned","I have added at least one power-up, key or special feature"],
    act:["Starter: what does a variable called level remember?","Make a 'level' variable and a function that loads the right tilemap","Build Levels 2 and 3 to match your Stage 2 designs","Add a power-up, key, timer or special mechanic","Test every level from start to finish; update your diary and test log"],
    hints:["Toolkit card: 'Go to the next level'. Destroy old enemies and coins before loading a new map.","If you change your design, that's fine: write the change and the reason in your diary.","Play your own game as if you've never seen it: is the goal clear?"] },
  { w:8, s:3, title:"Polish and bug hunt",
    walt:"We are learning to improve the player experience and remove bugs through testing.",
    wilf:["My game has a title screen and instructions","There are sound effects and a win and a lose ending","I have tested every success criterion and fixed my bugs","I have submitted my project link, diary and test log"],
    act:["Starter: 'bug bingo': swap computers and find three bugs in a partner's game in five minutes","Add a title splash, instructions, sounds, animations and effects","Make sure the game can be finished (you win) and lost (game over)","Fix the bugs from your test log; re-test them","Tick your milestones and submit Stage 3"],
    hints:["Polish ideas: camera shake when hit, confetti on win, a sound for every collect.","Re-test a bug after you fix it: write 'Fixed, re-tested ✓' in the log.","Save often and copy your share link again after big changes (it updates automatically when you share again)."] },
  { w:9, s:4, title:"Playtest, improve and evaluate",
    walt:"We are learning to evaluate our game using feedback from real players and our success criteria.",
    wilf:["At least two people have playtested my game and I recorded their feedback","I made improvements because of the feedback","I evaluated every success criterion with evidence","I reflected on what I learned and what I would do next"],
    act:["Starter: what makes feedback useful? (specific, kind, helpful)","Playtest: two classmates play your game without help while you watch quietly and take notes","Record their feedback, then make at least one improvement","Evaluate each success criterion: met, partly met or not met, with evidence","Reflect, add your final link and submit Stage 4"],
    hints:["Don't explain your game while they play: where they get stuck shows you what to improve.","Evidence = what happened in testing: 'Both testers finished Level 1 in under 2 minutes.'","Honest evaluation scores higher than saying everything is perfect."] },
  { w:10, s:4, opt:true, title:"Optional: Arcade showcase and extensions",
    walt:"We are learning to present our product and extend our programming skills.",
    wilf:["I can present my game and explain one technical feature","I have attempted at least one extension challenge"],
    act:["Arcade Day: set up your game, invite classmates to play and vote for awards (Most fun, Best art, Hardest boss)","Extension: add a boss with a health bar, a high-score challenge, a second player or a secret level","Present: show one piece of code you're proud of and explain how it works"],
    hints:["Extensions are in the Toolkit (Health bar, Spawn over time, Power-up).","Explain code with 'When… the game… because…'."] }
];

/* ---------- workbook fields for each stage ---------- */
const GENRES = ["Platformer","Top-down adventure","Maze / escape","Shoot 'em up (space shooter)","Endless runner","Collect-a-thon / arcade","Puzzle","Racing / dodging","Sports","Quiz / educational game","RPG-lite (quests and items)","Other (explain)"];
const LEARNER = ["Inquirer","Knowledgeable","Thinker","Communicator","Principled","Open-minded","Caring","Risk-taker","Balanced","Reflective"];
const BUTTONS = [["up","⬆ Up"],["down","⬇ Down"],["left","⬅ Left"],["right","➡ Right"],["a","Ⓐ A button"],["b","Ⓑ B button"]];
const MILESTONES = ["Project created and named with my game title","Player sprite drawn and moving with the controller","Level 1 built as a tilemap with walls","Camera follows the player (or the game fits on one screen)","Collectibles change the score","Enemies or hazards take a life (or end the game)","At least one enemy moves (follow, patrol or bounce)","A level variable and function switch between levels","At least three levels are playable","A power-up, key, timer or special feature works","Title screen and instructions","Sound effects and/or music","The game can be won (game over: win)","The game can be lost (game over: lose)","Every bug in my test log is fixed or explained"];

const F = {
  s1: [
    { sec:"Research: play and analyse two games", crit:"A", note:"Play two games from the MakeCode Arcade gallery (or games you know). Analyse them like a game designer." },
    { id:"research", type:"rows", label:"Games I analysed", minRows:2, maxRows:3,
      cols:[{id:"game",label:"Game name (and link if you have one)",min:2},{id:"genre",label:"Genre",min:1},{id:"goal",label:"Goal: how do you win?",min:6},{id:"controls",label:"Controls",min:3},{id:"fun",label:"What makes it fun or frustrating?",min:12},{id:"borrow",label:"What will I borrow or do better?",min:10}],
      hint:["Choose one game in the same genre as your idea and one in a different genre.","For 'fun', think: challenge, rewards, surprise, sounds, speed, story.","For 'borrow', be specific: 'the way coins show you which way to go', not 'the coins'."],
      ex:"Game: Pizza Run (MakeCode gallery) · Genre: endless runner · Goal: deliver as many pizzas as possible before you crash · Controls: up and down to change lanes, A to jump · Fun: it gets faster every 10 seconds so it feels exciting, but it's frustrating that you can't see cars coming from far away · Borrow: the speed-up every 10 seconds; I would add a warning arrow before a car appears." },
    { id:"ideas", type:"rows", label:"Brainstorm: three different game ideas", minRows:3, maxRows:3,
      cols:[{id:"idea",label:"Idea in one sentence",min:8}],
      hint:["Use the 🎲 Idea Generator for inspiration, then change it to make it yours.","Make the three ideas really different: different genres or settings.","Each idea: who you are + what you do + why."],
      ex:"1. A turtle swims through a polluted reef collecting rubbish before the timer runs out. 2. A robot escapes a factory maze by finding three keys. 3. A space chef shoots flying vegetables to make soup." },
    { id:"chosenWhy", type:"area", label:"Which idea did you choose, and why is it the best one to build?", min:30,
      hint:["Compare it with the other two: why is it better?","Think about your audience, how fun it is AND whether you can build it in four weeks.","Mention one thing from your research that inspired it."],
      ex:"I chose the turtle reef game because it has a clear goal (collect rubbish) and a clear challenge (the timer and the jellyfish). It suits Grade 5–7 players and teaches them about ocean pollution (SDG 14). It is also realistic to build: a top-down tilemap with coins and enemies, like the maze game I analysed." },
    { sec:"Game Idea Proposal", crit:"B", note:"Write in full sentences. Someone who has never met you should be able to read this and picture your game." },
    { id:"title", type:"text", label:"Game title", min:1, ph:"e.g. Coral Quest" },
    { id:"genre", type:"select", label:"Genre", options:GENRES },
    { id:"genreWhy", type:"area", label:"Why does this genre suit your idea?", min:15, hint:["What does the player do most of the time? Does that match the genre?","Platformers suit jumping and falling; top-down suits exploring and mazes; shooters suit fast reactions."], ex:"A top-down adventure suits Coral Quest because the turtle explores the reef in every direction, not just left and right." },
    { id:"pitch", type:"area", label:"One-sentence pitch (your 'elevator pitch')", min:10, rows:2, hint:["Formula: In [title], you are [hero] who must [goal] while avoiding [danger].","Make it exciting: use strong verbs."], ex:"In Coral Quest you are Tilly the turtle, racing against the tide to clean up your reef before the jellyfish take over." },
    { id:"audience", type:"area", label:"Target audience: who is it for, and why will they enjoy it?", min:15, hint:["Give an age range and what kind of player.","Explain how your choices (difficulty, theme, controls) suit them."], ex:"Players aged 9–13 who like quick, colourful games. The controls are just the arrow keys, Level 1 is easy, and the ocean theme is friendly." },
    { id:"story", type:"area", label:"Story and setting: where is it, who is the hero, why are they doing this?", min:35, hint:["Setting: where and when?","Problem: what has gone wrong?","Motivation: why does the hero care?"], ex:"The game is set on a coral reef near Dubai. A storm has washed rubbish into the sea and the fish are getting sick. Tilly the turtle is the only one fast enough to clean it up before the jellyfish swarm moves in. Each level is a different part of the reef: the shallows, the shipwreck and the deep trench." },
    { id:"hero", type:"area", label:"Player character: name, appearance and abilities", min:20, hint:["What does the hero look like (colours, size)?","What can they do: speed, jump, shoot, dash?","Any weakness?"], ex:"Tilly is a small green turtle with a blue shell. She swims at normal speed, can dash for one second with the A button, and has 3 lives." },
    { id:"controls", type:"controls", label:"Controls: what does each button do?", min:3, hint:["MakeCode Arcade has a D-pad (up, down, left, right) and two buttons: A and B.","Keep controls simple: most great games use only 3–5 controls.","Write 'not used' for buttons you don't need."] },
    { id:"howWin", type:"area", label:"How do you WIN? (the goal of the whole game and of each level)", min:20, hint:["Is there a final goal (e.g. reach the treasure) and a goal per level (e.g. touch the door)?","Is there a score target?"], ex:"In each level you must collect all the rubbish, then swim to the exit gate. You win the game when you finish Level 3 by escaping the trench." },
    { id:"howLose", type:"area", label:"How do you LOSE?", min:15, hint:["Lives, health, a timer, falling, being caught?","What happens when you lose one life: restart the level or keep going?"], ex:"You have 3 lives. Touching a jellyfish loses a life and sends you back to the start of the level. If the 60-second tide timer runs out, it's game over." },
    { id:"scoring", type:"area", label:"Scoring and feedback: how does the player know they are doing well?", min:15, hint:["What gives points? How many?","Sounds, effects, messages?"], ex:"Each piece of rubbish is +1 point with a 'ba-ding' sound. Finishing a level with time left gives +5 bonus points. The screen shakes when you are stung." },
    { id:"loop", type:"area", label:"Core loop: what does the player do over and over?", min:15, hint:["Write it as a cycle: do this → then this → then this → repeat.","The loop is the heart of your game: is it fun to repeat?"], ex:"Explore → spot rubbish → dodge jellyfish → collect → find the gate → next, harder level." },
    { id:"enemies", type:"area", label:"Enemies and obstacles: what are they and how do they behave?", min:20, hint:["For each: name, look, how it moves (still, patrols, follows, shoots) and what it does to the player.","Make enemies different from each other."], ex:"Jellyfish drift up and down slowly (bounce). Crabs follow you when you get close. Sea urchins don't move but sting if you touch them." },
    { id:"items", type:"area", label:"Collectibles and power-ups", min:15, hint:["What can be collected and what does it do?","Power-ups should be rare and exciting."], ex:"Rubbish (+1 point). Sea grass gives a speed boost for 5 seconds. A golden shell gives an extra life (only one per level)." },
    { id:"levelCount", type:"select", label:"How many levels will you build?", options:["3","4","5"] },
    { id:"levelsPlan", type:"area", label:"Level overview: how will the levels get harder?", min:30, hint:["Give each level a name and one sentence.","Explain the difficulty curve: more enemies? faster? less time? new mechanics?"], ex:"Level 1 Shallows: wide open, 2 jellyfish, lots of time. Level 2 Shipwreck: narrow corridors and crabs that follow you. Level 3 Trench: dark, fast jellyfish, less time and a key to find before the exit opens." },
    { id:"sound", type:"area", label:"Look, sound and music", min:12, hint:["Colour scheme, backgrounds, music mood.","Which sound plays for collect, hit, win, lose?"], ex:"Blue and green colours for the reef, dark purple in the trench. Calm music in Level 1, faster music in Level 3. Sounds: ba-ding (collect), zap (hit), power-up (speed boost)." },
    { id:"sdg", type:"area", label:"Optional: does your game connect to a real-world issue or a UN SDG?", min:0, opt:true, hint:["E.g. SDG 13 Climate action, SDG 14 Life below water, SDG 15 Life on land, SDG 4 Quality education.","This is optional, but it makes a game meaningful."], ex:"SDG 14 Life below water: the player learns that rubbish harms sea life." },
    { id:"ethics", type:"checks", label:"Originality and responsibility", options:["My characters and story are my own (no copied characters such as Mario or Sonic)","My game is suitable for Grade 7 players (no gore or unkind content)","I will credit any gallery images or code I reuse","My game is small enough to finish in four weeks of building"], minChecks:4 },
    { sec:"Sketch your main character", crit:"B", note:"Draw your hero on MakeCode's 16 × 16 grid with the real Arcade colours. You can copy it straight into MakeCode later." },
    { id:"sprite", type:"pixel", label:"Main character sprite (16 × 16)", minPix:20 },
    { id:"sprite2", type:"pixel", label:"Optional: an enemy or collectible sprite", minPix:0, opt:true },
    { sec:"Success criteria", crit:"B", note:"Your success criteria are how you will judge your finished game in Week 9. Each one must be something you can TEST." },
    { id:"criteria", type:"rows", label:"Success criteria (at least 5)", minRows:5, maxRows:10,
      cols:[{id:"c",label:"My game will…",min:5},{id:"t",label:"How I will test it",min:5}],
      hint:["Cover different areas: gameplay, levels, controls, look and sound, audience.","Use numbers when you can: '3 levels', 'under 2 minutes', '2 out of 3 testers'.","Avoid 'my game will be fun': instead 'testers rate it 4/5 or more for fun'."],
      ex:"My game will have 3 levels that get harder → play each level and count the enemies and the time limit. · Players will understand the controls without help → watch 2 classmates play and see if they ask how to move." }
  ],
  s2: [
    { sec:"Design every level", crit:"B", note:"Use the grid to draw each level, then explain it in detail. Your number of levels comes from your Stage 1 plan (at least 3)." },
    { id:"levels", type:"levels", label:"Levels" },
    { sec:"Game flow", crit:"B", note:"Show every screen the player sees, in order, and what moves them on." },
    { id:"flow", type:"area", label:"Game flow (title → … → win / game over)", min:25, rows:4, hint:["List every screen with an arrow and what triggers the change.","Include what happens when you lose a life and when you lose all lives."], ex:"Title splash 'Coral Quest' (press A) → instructions → Level 1 Shallows → touch gate → 'Level 2!' splash → Level 2 Shipwreck → touch gate → Level 3 Trench (find key, then gate) → 'You saved the reef!' WIN. Lose a life → back to the level start. 0 lives or timer ends → GAME OVER (lose)." },
    { sec:"Code plan: 'When… then…' rules", crit:"B", note:"Every rule becomes an event in MakeCode. Plan at least 6 rules for your whole game." },
    { id:"codeplan", type:"rows", label:"Code plan", minRows:6, maxRows:16,
      cols:[{id:"when",label:"When… (event)",min:3},{id:"then",label:"…then the game… (what happens)",min:4},{id:"blocks",label:"MakeCode blocks I think I'll use",min:1,opt:true}],
      hint:["Start with: When the game starts… then…","Each collision is a rule: When the player overlaps a coin… then…","Use the Toolkit tab to find the right block names."],
      ex:"When the game starts → show title, set lives to 3, load Level 1 → splash, set life, set tilemap · When player overlaps Rubbish → +1 score, destroy rubbish, play ba-ding → on sprite overlaps · When player touches gate tile → level +1, load next level → on overlap tile, function startLevel" },
    { sec:"Test plan", crit:"B", note:"Plan how you'll prove your game works before you build it." },
    { id:"testplan", type:"rows", label:"Test plan (at least 4 tests)", minRows:4, maxRows:12,
      cols:[{id:"test",label:"What I will test",min:3},{id:"how",label:"How I will test it",min:4},{id:"exp",label:"What should happen (expected result)",min:4}],
      hint:["Test each rule in your code plan.","Include a test for winning and a test for losing.","Expected results must be specific: 'score goes up by 1'."],
      ex:"Collecting rubbish · touch one piece of rubbish · score goes from 0 to 1 and the rubbish disappears." }
  ],
  s3: [
    { sec:"Your MakeCode project", crit:"C", note:"In MakeCode Arcade press Share (top left) → Share Project → copy the link. Paste it here. Share again after big changes." },
    { id:"link", type:"link", label:"MakeCode Arcade share link" },
    { id:"milestones", type:"checks", label:"Build milestones (tick each one that WORKS in your game)", options:MILESTONES, minChecks:9 },
    { sec:"Development diary", crit:"C", note:"One entry for every lesson you build (at least 4). Be specific: name the blocks you used and the problems you solved." },
    { id:"diary", type:"rows", label:"Diary entries", minRows:4, maxRows:16,
      cols:[{id:"date",label:"Date / lesson",min:1},{id:"built",label:"What I built today",min:12},{id:"blocks",label:"Blocks or code I used",min:3},{id:"problem",label:"Problem I had and how I solved it",min:8},{id:"next",label:"Next step",min:3}],
      hint:["Name real blocks: 'on sprite of kind Player overlaps Enemy', 'set tilemap to', 'change score by 1'.","If you changed your plan, say what and why: that counts for Criterion C.","'Next step' helps you start quickly next lesson."],
      ex:"Week 6 · Made rubbish sprites from the rubbish tiles and added the overlap so the score goes up · for element of array of all tiles, on sprite overlaps, change score by 1 · Score went up by 20 at once because the rubbish wasn't destroyed: I added 'destroy otherSprite' · Make the jellyfish bounce up and down." },
    { sec:"Test log", crit:"C", note:"Test after every change. Record failures as well as passes: fixing bugs is what real developers do." },
    { id:"testlog", type:"rows", label:"Test log (at least 6 tests)", minRows:6, maxRows:24,
      cols:[{id:"test",label:"What I tested",min:2},{id:"exp",label:"Expected result",min:3},{id:"act",label:"Actual result",min:2},{id:"pf",label:"Pass / Fail",sel:["Pass","Fail","Fixed, re-tested ✓"]},{id:"fix",label:"Fix (if it failed)",min:0,opt:true}],
      hint:["Use your Stage 2 test plan as a starting point.","When a test fails, write what you changed, then re-test and mark it 'Fixed, re-tested ✓'.","Ask a partner to test too: they find bugs you don't."] },
    { id:"bigbug", type:"area", label:"The hardest bug or problem I solved, and how", min:30, hint:["What went wrong? What did you try first? What finally worked?","What would you do differently next time?"], ex:"My player kept getting stuck inside walls after loading Level 2. I found out I was placing the player before loading the new tilemap. I moved 'place on random start tile' after 'set tilemap' and it worked every time." },
    { id:"changes", type:"area", label:"Changes from my plan, and why", min:20, hint:["Compare your game with your Stage 1 and 2 plans.","Good reasons: playtesting, time, a better idea, a technical limit."], ex:"I removed the crabs from Level 2 because they made the corridors impossible. I replaced them with sea urchins that don't move, which matched my plan for 'harder but fair'." }
  ],
  s4: [
    { sec:"Playtesting", crit:"D", note:"At least two people play your game. Watch quietly, then ask them the questions below." },
    { id:"peers", type:"rows", label:"Playtester feedback (at least 2 testers)", minRows:2, maxRows:5,
      cols:[{id:"who",label:"Tester's first name",min:1},{id:"liked",label:"What they enjoyed",min:6},{id:"confused",label:"What confused or annoyed them",min:4},{id:"bugs",label:"Bugs they found",min:1},{id:"rate",label:"Fun rating",sel:["5 ★★★★★","4 ★★★★","3 ★★★","2 ★★","1 ★"]}],
      hint:["Ask: what was fun? where did you get stuck? what would you change?","Write their exact words when you can.","'None' is fine for bugs if they really found none."] },
    { id:"improve", type:"area", label:"Improvements I made because of the feedback", min:30, hint:["Name the feedback, then what you changed, then whether it worked.","At least one improvement must be done, not just planned."], ex:"Both testers said Level 3 was too dark to see the jellyfish, so I changed the background to dark blue and gave the jellyfish a bright pink outline. When Sara replayed it she could see them easily." },
    { sec:"Evaluate against your success criteria", crit:"D", note:"Your criteria come from Stage 1. Be honest and give evidence from testing." },
    { id:"evaluation", type:"criteria", label:"Success criteria evaluation" },
    { sec:"Reflection", crit:"D", note:"Think like a game developer looking back on a project." },
    { id:"nextVersion", type:"area", label:"If I had two more weeks, I would…", min:20, hint:["Be specific: what feature, what fix, why?","Link it to feedback or a criterion you didn't fully meet."], ex:"I would add a boss octopus at the end of Level 3 with a health bar, because one tester said the ending felt too easy." },
    { id:"impact", type:"area", label:"How well does my game suit its target audience?", min:20, hint:["Use your testers' ratings and comments as evidence.","What would make it better for that audience?"], ex:"My audience was players aged 9–13. Both testers rated it 4/5 and understood the controls straight away, so the controls suit them. Level 3 might be too hard for younger players, so I could add an 'easy mode' with more time." },
    { id:"learner", type:"select", label:"IB learner profile attribute I showed most", options:LEARNER },
    { id:"reflect", type:"area", label:"What did I learn about programming and game design, and how did I show that attribute?", min:35, hint:["Name one programming idea you now understand: events, variables, functions, loops, sprite kinds.","Give an example of when you showed the learner profile attribute."], ex:"I learned how events work: the game is not one long list of steps, it reacts to things like overlaps and button presses. I was a risk-taker when I tried a level variable and a function for the first time, even though it broke my game twice before it worked." },
    { id:"howToPlay", type:"area", label:"How to play (for players at Arcade Day)", min:20, rows:3, hint:["Short and clear: goal, controls, one tip."], ex:"Help Tilly clean the reef! Arrow keys to swim, A to dash. Collect all the rubbish, then reach the gate before the tide timer ends. Tip: sea grass makes you faster." },
    { id:"finalLink", type:"link", label:"Final MakeCode share link" }
  ]
};
const LEVEL_FIELDS = [
  { id:"name", type:"text", label:"Level name", min:1, ph:"e.g. The Shipwreck" },
  { id:"objective", type:"area", label:"Objective: what must the player do to finish this level?", min:12, rows:2 },
  { id:"newThing", type:"area", label:"What is NEW in this level? (a new enemy, hazard, mechanic or skill)", min:8, rows:2 },
  { id:"map", type:"map", label:"Level map" },
  { id:"layout", type:"area", label:"Describe the layout: the route from start to goal, safe areas and tricky parts", min:35, rows:3 },
  { id:"enemies", type:"area", label:"Enemies and hazards: which ones, how many, how they behave", min:15, rows:2 },
  { id:"items", type:"area", label:"Collectibles and power-ups: where and what they do", min:10, rows:2 },
  { id:"loseHere", type:"area", label:"How can the player lose a life or fail in this level?", min:8, rows:2 },
  { id:"difficulty", type:"select", label:"Difficulty (1 = very easy, 5 = very hard)", options:["1","2","3","4","5"] },
  { id:"harder", type:"area", label:"Why is this level harder than the last one? (Level 1: how does it teach the controls?)", min:15, rows:2 },
  { id:"time", type:"select", label:"Time to finish (estimate)", options:["Under 1 minute","1–2 minutes","2–3 minutes","3–5 minutes","Over 5 minutes"] },
  { id:"mood", type:"area", label:"Look and sound: background, colours, music", min:6, rows:2 }
];
const LEVEL_HINTS = {
  objective:["Usually: reach the door, collect everything, survive the timer or defeat the boss.","Can there be more than one condition? e.g. find the key THEN reach the door."],
  newThing:["One new idea per level keeps it fresh: crabs that follow, moving platforms, a key, a time limit.","Level 1: the new thing is the controls themselves."],
  layout:["Imagine you are playing: 'You start bottom-left, go right past the first coins, jump over the lava…'","Where is a safe place to stop? Where is the hardest moment?","Use collectibles to guide the player to the goal."],
  enemies:["Say how many and how they move: 'three jellyfish bouncing up and down'.","Hazards are things that hurt but don't move (lava, spikes)."],
  harder:["More enemies, faster enemies, less time, longer route, smaller platforms, a new mechanic.","Make it fair: harder, but the player should still feel 'I can do it'."]
};
const LEVEL_EX = "Level 2 The Shipwreck · Objective: collect all 8 pieces of rubbish, then reach the gate in the captain's cabin · New: crabs that follow you when you get close · Layout: you start at the ship's front (left). A long corridor with rubbish leads to the hold, where two jellyfish bounce. The cabin is at the top right behind a narrow gap. The safe spot is the empty room in the middle · Harder: corridors are narrow so it's harder to dodge, and there are 2 crabs plus 3 jellyfish (Level 1 had 2 jellyfish).";

/* ---------- MakeCode Arcade toolkit (real block names + JavaScript) ---------- */
const TOOLKIT = [
  { t:"Make your player", tags:["all"], where:"Sprites → set mySprite to sprite [ ] of kind Player", why:"Every game needs a hero. Click the grey box to draw it (or paste the image from your Stage 1 sprite).",
    code:["let hero = sprites.create(img`", "    . . . . 7 7 7 7 . . . .", "    . . . 7 7 7 7 7 7 . . .", "    . . 7 7 f 7 7 f 7 7 . .", "    . . 7 7 7 7 7 7 7 7 . .", "    . . . 7 7 7 7 7 7 . . .", "    . . . . 7 . . 7 . . . .", "`, SpriteKind.Player)"],
    bug:"Nothing shows? Check you dragged the block into 'on start'." },
  { t:"Move with the arrow keys", tags:["top-down","maze","shooter","all"], where:"Controller → move mySprite with buttons vx 100 vy 100", why:"Lets the player steer the hero. Bigger numbers = faster. For a platformer set vy to 0 (gravity does up and down).",
    code:["controller.moveSprite(hero, 100, 100)","hero.setStayInScreen(true)  // only if your game fits on one screen"], bug:"Hero too fast to control? Try 60–80." },
  { t:"Camera follows the player", tags:["platformer","top-down","maze"], where:"Scene → camera follow sprite mySprite", why:"For levels bigger than the screen (160 × 120 pixels).",
    code:["scene.cameraFollowSprite(hero)"], bug:"The screen jumps? Put this once in 'on start', not in a forever loop." },
  { t:"Build a level with a tilemap", tags:["platformer","top-down","maze","all"], where:"Scene → set tilemap to [ ]  (click the grey square to open the tilemap editor)", why:"Draw your Stage 2 map with tiles. Use the wall tool (the brick button) to mark walls the player can't walk through. Give special tiles clear names: start, door, coin, lava.",
    code:["tiles.setCurrentTilemap(tilemap`level1`)","tiles.placeOnRandomTile(hero, assets.tile`start`)"], bug:"Player inside a wall? Place the player AFTER setting the tilemap." },
  { t:"Platformer gravity and jump", tags:["platformer"], where:"Sprites → set mySprite ay to 350 · Controller → on A button pressed · Sprites → is mySprite hitting wall bottom", why:"Gravity (ay) pulls the hero down. Jump only when standing on the ground, so there's no flying.",
    code:["controller.moveSprite(hero, 90, 0)","hero.ay = 350","controller.A.onEvent(ControllerButtonEvent.Pressed, function () {","    if (hero.isHittingTile(CollisionDirection.Bottom)) {","        hero.vy = -180","    }","})"], bug:"Can't reach a platform? Make vy more negative (-200) or the platform lower." },
  { t:"Your own Sprite Kinds", tags:["all"], where:"Sprites → kind dropdown → Add a new kind…", why:"Kinds tell overlaps apart: Player, Enemy, Food, Projectile… Add your own like Coin, Key or PowerUp.",
    code:["namespace SpriteKind {","    export const Coin = SpriteKind.create()","    export const PowerUp = SpriteKind.create()","}"], bug:"Overlap never happens? The sprite was created with a different kind." },
  { t:"Collect coins (overlaps)", tags:["all"], where:"Sprites → on sprite of kind Player overlaps otherSprite of kind Coin · Info → change score by 1 · Sprites → destroy", why:"The basic reward. Always destroy the coin or the score keeps rising.",
    code:["sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {","    info.changeScoreBy(1)","    sprites.destroy(otherSprite)","    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)","})"], bug:"Score goes up by lots? You forgot 'destroy otherSprite'." },
  { t:"Turn tiles into sprites", tags:["platformer","top-down","maze"], where:"Loops → for element value of array · Scene → array of all [tile] locations · Scene → place mySprite on top of value · Scene → set [tile] at location", why:"Draw coins or enemies on your tilemap, then swap each tile for a real sprite.",
    code:["for (let spot of tiles.getTilesByType(assets.tile`coinTile`)) {","    let coin = sprites.create(img`","        . 5 5 .","        5 5 5 5","        . 5 5 .","    `, SpriteKind.Coin)","    tiles.placeOnTile(coin, spot)","    tiles.setTileAt(spot, assets.tile`transparency16`)","}"], bug:"Run this AFTER setting the tilemap, once per level." },
  { t:"Enemies that chase", tags:["top-down","maze","shooter"], where:"Sprites → set myEnemy follow mySprite with speed 30", why:"Simple chasing behaviour. Slow speeds feel fair; fast speeds feel scary.",
    code:["let ghost = sprites.create(img`", "    . 1 1 .", "    1 f 1 f", "    1 1 1 1", "`, SpriteKind.Enemy)","tiles.placeOnRandomTile(ghost, assets.tile`enemyTile`)","ghost.follow(hero, 30)"], bug:"Enemy walks through walls? follow ignores walls in some cases: keep speed low or use patrol instead." },
  { t:"Enemies that patrol (bounce)", tags:["platformer","top-down","maze"], where:"Sprites → set mySprite vx to 40 · Sprites → set mySprite bounce on wall ON", why:"The enemy moves until it hits a wall, then turns round.",
    code:["bat.vx = 40","bat.setBounceOnWall(true)"], bug:"No walls to bounce off? Draw walls with the wall tool in the tilemap editor." },
  { t:"Lose a life when hit", tags:["all"], where:"Sprites → on sprite of kind Player overlaps otherSprite of kind Enemy · Info → change life by -1", why:"Takes a life, destroys the enemy and shakes the screen so the player notices.",
    code:["info.setLife(3)","sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {","    info.changeLifeBy(-1)","    sprites.destroy(otherSprite, effects.disintegrate, 200)","    scene.cameraShake(4, 300)","})"], bug:"All lives lost at once? The enemy stayed on top of you: destroy it or move the player back to the start." },
  { t:"Hazard tiles (lava, spikes)", tags:["platformer","top-down","maze"], where:"Scene → on sprite of kind Player overlaps [tile] at location", why:"Tiles that hurt. Send the player back to the start of the level.",
    code:["scene.onOverlapTile(SpriteKind.Player, assets.tile`lava`, function (sprite, location) {","    info.changeLifeBy(-1)","    tiles.placeOnRandomTile(sprite, assets.tile`start`)","})"], bug:"Use a tile that is NOT a wall, or the player can never touch it." },
  { t:"Countdown timer", tags:["all"], where:"Info → start countdown 60 (s) · Info → on countdown end", why:"Adds pressure. Restart the countdown at the start of each level.",
    code:["info.startCountdown(60)","info.onCountdownEnd(function () {","    game.gameOver(false)","})"], bug:"Without 'on countdown end' the game ends with a normal game over." },
  { t:"Shoot projectiles", tags:["shooter","top-down"], where:"Controller → on A button pressed · Sprites → set projectile to projectile [ ] from mySprite with vx 150 vy 0", why:"For shooters. Then add an overlap: Projectile overlaps Enemy → destroy both, +1 score.",
    code:["controller.A.onEvent(ControllerButtonEvent.Pressed, function () {","    let bolt = sprites.createProjectileFromSprite(img`","        5 5 5 5","    `, hero, 150, 0)","})","sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {","    sprites.destroy(sprite)","    sprites.destroy(otherSprite, effects.fire, 200)","    info.changeScoreBy(1)","})"], bug:"Shooting the wrong way? Use vx -150 for left." },
  { t:"Spawn things over time", tags:["shooter","runner","all"], where:"Game → on game update every 1500 ms · Math → pick random 10 to 150", why:"Endless runners and shooters create new enemies all the time. Auto destroy removes them when they leave the screen.",
    code:["game.onUpdateInterval(1500, function () {","    let rock = sprites.create(img`","        b b b","        b c b","        b b b","    `, SpriteKind.Enemy)","    rock.setPosition(randint(10, 150), 0)","    rock.vy = 50","    rock.setFlag(SpriteFlag.AutoDestroy, true)","})"], bug:"Game slows down? You forgot AutoDestroy, so thousands of sprites pile up." },
  { t:"Go to the next level", tags:["platformer","top-down","maze","all"], where:"Variables → make a variable 'level' · Functions → make a function 'startLevel' · Logic → if / else if · Scene → on sprite of kind Player overlaps [door] at location", why:"The key to a multi-level game. One variable remembers the level; one function loads it.",
    code:["let level = 1","function startLevel () {","    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)","    sprites.destroyAllSpritesOfKind(SpriteKind.Coin)","    if (level == 1) {","        tiles.setCurrentTilemap(tilemap`level1`)","    } else if (level == 2) {","        tiles.setCurrentTilemap(tilemap`level2`)","    } else if (level == 3) {","        tiles.setCurrentTilemap(tilemap`level3`)","    } else {","        game.gameOver(true)","        return","    }","    tiles.placeOnRandomTile(hero, assets.tile`start`)","    game.splash(\"Level \" + level)","}","scene.onOverlapTile(SpriteKind.Player, assets.tile`door`, function (sprite, location) {","    level += 1","    startLevel()","})","startLevel()"], bug:"Skipping levels? The player is still on the door: placing them on the start tile fixes it." },
  { t:"Win and lose", tags:["all"], where:"Game → game over WIN / LOSE · Game → use effect confetti", why:"Every game needs an ending. Win when the last level is done; lose when lives or time run out (lives at zero ends the game by itself).",
    code:["game.setGameOverEffect(true, effects.confetti)","game.gameOver(true)   // you win","game.gameOver(false)  // you lose"], bug:"Older blocks may say 'game over' with a WIN switch: it's the same block." },
  { t:"Title screen and instructions", tags:["all"], where:"Game → splash \" \" · Game → show long text \" \" bottom", why:"First impressions! Put these at the top of 'on start'.",
    code:["scene.setBackgroundColor(9)","game.splash(\"Coral Quest\", \"Press A to start\")","game.showLongText(\"Collect all the rubbish, then reach the gate. Arrow keys to swim, A to dash.\", DialogLayout.Bottom)"], bug:"Text too long? Keep each message under about 80 characters." },
  { t:"Sound effects and music", tags:["all"], where:"Music → play sound [ba ding] in background · Music → play melody … looping", why:"Sound is feedback: every important event should have one.",
    code:["music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)","music.play(music.stringPlayable(\"C E G E C E G C5 \", 140), music.PlaybackMode.LoopingInBackground)"], bug:"Use 'until done' only when you want the game to wait for the sound." },
  { t:"Animate your hero", tags:["all"], where:"Animation → animate mySprite frames [ ] interval 150 loop ON", why:"Two or three frames of walking make the game feel alive.",
    code:["animation.runImageAnimation(hero, assets.animation`heroWalk`, 150, true)"], bug:"Draw the frames in the animation editor (click the frames box)." },
  { t:"Power-up (speed boost)", tags:["all"], where:"Sprites → on overlap (Player, PowerUp) · Controller → move mySprite · Loops → pause 5000 ms", why:"A rare reward that changes how you play for a few seconds.",
    code:["sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {","    sprites.destroy(otherSprite)","    controller.moveSprite(sprite, 160, 160)","    sprite.startEffect(effects.trail, 5000)","    pause(5000)","    controller.moveSprite(sprite, 100, 100)","})"], bug:"'pause' only pauses this event, not the whole game." },
  { t:"Keys and locked doors", tags:["top-down","maze","platformer"], where:"Variables → set hasKey to true · Logic → if hasKey then · Scene → set wall OFF at location", why:"The player must find the key before the exit opens.",
    code:["let hasKey = false","sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {","    hasKey = true","    sprites.destroy(otherSprite)","    hero.sayText(\"Got the key!\", 1000)","})","scene.onOverlapTile(SpriteKind.Player, assets.tile`door`, function (sprite, location) {","    if (hasKey) {","        level += 1","        hasKey = false","        startLevel()","    } else {","        hero.sayText(\"Locked!\", 800)","    }","})"], bug:"Reset hasKey to false when a new level starts." },
  { t:"Boss with a health bar (extension)", tags:["extension"], where:"Extensions (gear ⚙ → Extensions) → search 'status bars' · Status Bars → create status bar", why:"For a final boss: shots lower its health; at zero it's defeated.",
    code:["let boss = sprites.create(img`", "    a a a a", "    a f a f", "    a a a a", "`, SpriteKind.Enemy)","let hp = statusbars.create(20, 4, StatusBarKind.Health)","hp.attachToSprite(boss)","hp.max = 10","hp.value = 10","statusbars.onZero(StatusBarKind.Health, function (status) {","    sprites.destroy(status.spriteAttachedTo(), effects.fire, 500)","    game.gameOver(true)","})"], bug:"Lower hp.value by 1 in your Projectile-overlaps-Enemy event when the enemy is the boss." },
  { t:"Debugging like a developer", tags:["all"], where:"Any block → right-click → Disable Block · ▶ simulator · 🐢 slow-mo (debug) button", why:"Find bugs faster.",
    code:["// 1. Say what you EXPECT, then test ONE change at a time","// 2. Use hero.sayText(\"here!\") to check if an event runs","// 3. Disable a block (right-click) to see if it causes the bug","// 4. Check sprite kinds, tile names and the order of blocks in 'on start'"], bug:"Most bugs are in the ORDER of blocks: check what runs first." }
];
const TOOL_TAGS = [["all","Everything"],["platformer","Platformer"],["top-down","Top-down / adventure"],["maze","Maze"],["shooter","Shooter"],["runner","Runner"],["extension","Extensions"]];

/* ---------- idea generator ---------- */
const IDEA = {
  hero:["a turtle","a robot chef","a lost astronaut","a ninja cat","a desert falcon","a tiny dragon","a delivery drone","a coding wizard","a skateboarding penguin","a camel explorer","a recycling bot","a firefly"],
  goal:["collect lost treasures","escape a crumbling maze","rescue trapped friends","clean up pollution","deliver parcels before the timer ends","find three secret keys","grow a garden","defend a sandcastle","fix a broken spaceship","win a race through the city"],
  place:["a coral reef","a haunted library","an abandoned space station","the Dubai skyline at night","a giant kitchen","a volcano","a frozen island","inside a computer","a jungle temple","a desert oasis"],
  twist:["gravity flips every 10 seconds","the lights go out in every second level","enemies get faster each time you score","you can only jump twice","coins move away from you","the map shrinks over time","you control two characters at once","every power-up has a side effect","you leave a trail that becomes a wall","the timer is your health"]
};
const pick = a => a[Math.floor(Math.random() * a.length)];
function idea(){ return "You are " + pick(IDEA.hero) + " who must " + pick(IDEA.goal) + " in " + pick(IDEA.place) + ", but " + pick(IDEA.twist) + "."; }

/* ---------- MYP assessment guide (student-friendly) ---------- */
const RUBRIC = [
  { c:"A", n:"Inquiring and analysing", st:"Stage 1 (research)", b:[["1–2","I listed a game or two with little explanation."],["3–4","I described two games and some features I could use."],["5–6","I analysed two games, explained what makes them fun and what I would borrow."],["7–8","I analysed games in detail, explained why features work for players, and used this to shape my own idea and audience."]] },
  { c:"B", n:"Developing ideas", st:"Stages 1 and 2 (proposal, sprite, levels, plans)", b:[["1–2","My idea or levels are only partly described."],["3–4","My proposal and some levels are described; some success criteria."],["5–6","Clear proposal, testable success criteria and detailed level designs with maps."],["7–8","Complete, justified proposal; detailed maps for every level with a clear difficulty curve; code plan and test plan that others could follow."]] },
  { c:"C", n:"Creating the solution", st:"Stage 3 (build, diary, test log)", b:[["1–2","Part of the game works; little record of the build."],["3–4","A playable game with some features; a basic diary and log."],["5–6","A playable game that follows most of my plan; regular diary and test log with bugs fixed."],["7–8","An excellent game that follows my plan with justified changes; skilful code (variables, functions, events); thorough diary and test log."]] },
  { c:"D", n:"Evaluating", st:"Stage 4 (playtesting and evaluation)", b:[["1–2","I said whether my game worked."],["3–4","I tested my game and commented on some success criteria."],["5–6","I used feedback from testers, evaluated each criterion with evidence and suggested improvements."],["7–8","I evaluated every criterion with clear evidence, made and explained improvements, and judged the impact on my audience."]] }
];

/* ---------- checks: is a stage ready to submit? ---------- */
function rowsOK(rows, f){ const rs = (rows || []).filter(r => f.cols.some(c => String(r[c.id] || "").trim()));
  const good = rs.filter(r => f.cols.every(c => c.opt || (c.sel ? !!r[c.id] : words(r[c.id]) >= (c.min || 1))));
  return { have: good.length, need: f.minRows || 1 }; }
function pixCount(s){ return String(s || "").split("").filter(ch => ch !== "0" && ch !== ".").length; }
function levelCount(all){ return Math.max(3, parseInt(((all || {}).s1 || {}).levelCount, 10) || 3); }
function critList(all){ return (((all || {}).s1 || {}).criteria || []).filter(r => String(r.c || "").trim()); }
function linkOK(v){ return /^https:\/\/(arcade\.makecode\.com|makecode\.com)\/(\S+)$/i.test(String(v || "").trim()); }
function mapCount(m, k){ return m && m.d ? m.d.split("").filter(x => x === k).length : 0; }
function checks(stageKey, all){
  const d = (all || {})[stageKey] || {}, out = [];
  (F[stageKey] || []).forEach(f => {
    if (f.sec || f.opt) return;
    if (f.type === "text" || f.type === "area"){ const w = words(d[f.id]); out.push({ id:f.id, label:f.label, ok: w >= (f.min || 1), info: f.min > 1 ? w + "/" + f.min + " words" : "" }); }
    else if (f.type === "select"){ out.push({ id:f.id, label:f.label, ok: !!d[f.id] }); }
    else if (f.type === "rows"){ const r = rowsOK(d[f.id], f); out.push({ id:f.id, label:f.label, ok: r.have >= r.need, info: r.have + "/" + r.need + " complete" }); }
    else if (f.type === "checks"){ const n = (d[f.id] || []).length; out.push({ id:f.id, label:f.label, ok: n >= (f.minChecks || 1), info: n + "/" + (f.minChecks || 1) + " ticked" }); }
    else if (f.type === "pixel"){ const n = pixCount(d[f.id]); out.push({ id:f.id, label:f.label, ok: n >= (f.minPix || 1), info: n + " pixels" }); }
    else if (f.type === "controls"){ const c = d[f.id] || {}, n = BUTTONS.filter(b => String(c[b[0]] || "").trim()).length; out.push({ id:f.id, label:f.label, ok: n >= (f.min || 3), info: n + "/6 buttons" }); }
    else if (f.type === "link"){ out.push({ id:f.id, label:f.label, ok: linkOK(d[f.id]) }); }
    else if (f.type === "criteria"){ const L = critList(all), ev = d.evaluation || {}, n = L.filter((r, i) => ev[i] && ev[i].r && words(ev[i].e) >= 10).length;
      out.push({ id:f.id, label:"Every success criterion evaluated with evidence (10+ words)", ok: L.length > 0 && n >= L.length, info: L.length ? n + "/" + L.length : "write your criteria in Stage 1 first" }); }
    else if (f.type === "levels"){
      const need = levelCount(all), lv = d.levels || [];
      for (let i = 0; i < need; i++){ const L = lv[i] || {}; let ok = true, miss = [];
        LEVEL_FIELDS.forEach(x => { if (x.type === "map"){ const m = L.map; if (!(m && mapCount(m, "S") >= 1 && mapCount(m, "G") + mapCount(m, "B") >= 1 && m.d.replace(/[.]/g, "").length >= 15)){ ok = false; miss.push("map with start + goal"); } }
          else if (x.type === "select"){ if (!L[x.id]){ ok = false; miss.push(x.label.split(" (")[0].toLowerCase()); } }
          else if (words(L[x.id]) < (x.min || 1)){ ok = false; miss.push(x.label.split(":")[0].split(" (")[0].toLowerCase()); } });
        out.push({ id:"levels", lv:i, label:"Level " + (i + 1) + " fully designed", ok, info: ok ? "" : "missing: " + miss.slice(0, 3).join(", ") + (miss.length > 3 ? "…" : "") }); }
    }
  });
  return out;
}
function percent(stageKey, all){ const c = checks(stageKey, all); return c.length ? Math.round(c.filter(x => x.ok).length / c.length * 100) : 0; }

/* ---------- read-only views (also used in the staff dashboard) ---------- */
function pixelHTML(s, px){ s = String(s || ""); px = px || 8; if (!s) return "";
  let h = `<div style="display:inline-grid;grid-template-columns:repeat(16,${px}px);border:1px solid #ccd;background:repeating-conic-gradient(#eee 0 25%,#fff 0 50%) 0 0/${px}px ${px}px">`;
  for (let i = 0; i < 256; i++){ const v = parseInt(s[i] || "0", 16) || 0; h += `<i style="width:${px}px;height:${px}px;background:${v ? PALETTE[v] : "transparent"}"></i>`; }
  return h + "</div>"; }
function mapHTML(m, px){ if (!m || !m.d) return "<i>No map drawn</i>"; px = px || 14;
  let h = `<div style="display:inline-grid;grid-template-columns:repeat(${m.w},${px}px);border:2px solid #1B2D4E;max-width:100%;overflow:auto">`;
  for (let i = 0; i < m.w * m.h; i++){ const t = TILE[m.d[i]] || TILE["."]; h += `<i title="${esc(t.n)}" style="width:${px}px;height:${px}px;background:${t.c};font-size:${Math.round(px * .7)}px;line-height:${px}px;text-align:center;font-style:normal;outline:1px solid rgba(0,0,0,.06)">${t.e}</i>`; }
  return h + "</div>"; }
function mapKey(m){ if (!m || !m.d) return ""; return TILES.filter(t => t.k !== "." && mapCount(m, t.k)).map(t => `${t.e || "■"} ${esc(t.n)}: ${mapCount(m, t.k)}`).join(" · "); }
function imgLiteral(s){ s = String(s || ""); let out = "img`\n"; for (let r = 0; r < 16; r++){ let row = "    "; for (let c = 0; c < 16; c++){ const v = parseInt(s[r * 16 + c] || "0", 16) || 0; row += (v ? v.toString(16) : ".") + (c < 15 ? " " : ""); } out += row + "\n"; } return out + "`"; }
const para = t => `<div style="white-space:pre-wrap">${esc(t || "") || "<i style='color:#999'>(empty)</i>"}</div>`;
function fieldHTML(f, d, all){
  const v = d[f.id];
  if (f.type === "rows"){ const rs = (v || []).filter(r => f.cols.some(c => String(r[c.id] || "").trim())); if (!rs.length) return "<i style='color:#999'>(none)</i>";
    return `<table style="border-collapse:collapse;width:100%;font-size:13px"><tr>${f.cols.map(c => `<th style="text-align:left;border:1px solid #ccd;background:#eef1f7;padding:4px 6px">${esc(c.label)}</th>`).join("")}</tr>${rs.map(r => `<tr>${f.cols.map(c => `<td style="border:1px solid #ccd;padding:4px 6px;vertical-align:top;white-space:pre-wrap">${esc(r[c.id] || "")}</td>`).join("")}</tr>`).join("")}</table>`; }
  if (f.type === "checks") return `<ul style="margin:0;padding-left:18px">${f.options.map(o => `<li>${(v || []).indexOf(o) >= 0 ? "✅" : "⬜"} ${esc(o)}</li>`).join("")}</ul>`;
  if (f.type === "pixel") return v ? pixelHTML(v, 9) : "<i style='color:#999'>(not drawn)</i>";
  if (f.type === "controls"){ const c = v || {}; return `<table style="border-collapse:collapse;font-size:13px">${BUTTONS.map(b => `<tr><td style="border:1px solid #ccd;padding:3px 8px;font-weight:700">${b[1]}</td><td style="border:1px solid #ccd;padding:3px 8px">${esc(c[b[0]] || "")}</td></tr>`).join("")}</table>`; }
  if (f.type === "link") return v ? `<a href="${esc(v)}" target="_blank" rel="noopener">${esc(v)}</a>${linkOK(v) ? "" : " <b style='color:#a3172a'>(not a MakeCode link)</b>"}` : "<i style='color:#999'>(no link)</i>";
  if (f.type === "criteria"){ const L = critList(all), ev = v || {}; if (!L.length) return "<i>No criteria</i>";
    return `<table style="border-collapse:collapse;width:100%;font-size:13px"><tr><th style="text-align:left;border:1px solid #ccd;background:#eef1f7;padding:4px 6px">Success criterion</th><th style="border:1px solid #ccd;background:#eef1f7;padding:4px 6px">Result</th><th style="text-align:left;border:1px solid #ccd;background:#eef1f7;padding:4px 6px">Evidence</th></tr>${L.map((r, i) => { const e = ev[i] || {}; return `<tr><td style="border:1px solid #ccd;padding:4px 6px">${esc(r.c)}</td><td style="border:1px solid #ccd;padding:4px 6px;white-space:nowrap">${esc(e.r || "")}</td><td style="border:1px solid #ccd;padding:4px 6px;white-space:pre-wrap">${esc(e.e || "")}</td></tr>`; }).join("")}</table>`; }
  if (f.type === "levels"){ const lv = v || [], n = Math.max(levelCount(all), lv.length);
    let h = ""; for (let i = 0; i < n; i++){ const L = lv[i] || {}; if (!L.name && !(L.map && L.map.d) && i >= levelCount(all)) continue;
      h += `<div style="border:1px solid #ccd;border-left:5px solid #DC2B3E;border-radius:8px;padding:10px 12px;margin:10px 0;page-break-inside:avoid"><h4 style="margin:0 0 6px">Level ${i + 1}: ${esc(L.name || "")} <span style="font-weight:400;color:#5B6782">· difficulty ${esc(L.difficulty || "?")}/5 · ${esc(L.time || "")}</span></h4>
        <div>${mapHTML(L.map, 12)}</div><div style="font-size:12px;color:#5B6782;margin:4px 0 8px">${mapKey(L.map)}</div>
        ${LEVEL_FIELDS.filter(x => x.type === "area").map(x => `<div style="margin-top:6px"><b style="font-size:12.5px;color:#1B2D4E">${esc(x.label)}</b>${para(L[x.id])}</div>`).join("")}</div>`; }
    return h; }
  return para(v);
}
function render(stageKey, all){
  const d = (all || {})[stageKey] || {}; let h = "";
  (F[stageKey] || []).forEach(f => {
    if (f.sec){ h += `<h3 style="margin:16px 0 6px;color:#DC2B3E;font-size:15px;border-bottom:2px solid #eee;padding-bottom:3px">${esc(f.sec)}${f.crit ? ` <span style="font-weight:400;color:#5B6782;font-size:12px">· Criterion ${f.crit}</span>` : ""}</h3>`; return; }
    if (f.opt && !d[f.id]) return;
    h += `<div style="margin:8px 0;page-break-inside:avoid"><div style="font-weight:800;font-size:13px;color:#1B2D4E;margin-bottom:2px">${esc(f.label)}</div>${f.type === "select" ? para(d[f.id]) : fieldHTML(f, d, all)}</div>`;
  });
  return h;
}

return { esc, words, PALETTE, PAL_NAMES, TILES, TILE, MAP_SIZES, STAGES, WEEKS, F, LEVEL_FIELDS, LEVEL_HINTS, LEVEL_EX, BUTTONS, MILESTONES, TOOLKIT, TOOL_TAGS, idea, RUBRIC,
  checks, percent, levelCount, critList, linkOK, mapCount, pixelHTML, mapHTML, mapKey, imgLiteral, render, fieldHTML, SWITCH:"cs7gd" };
})();
