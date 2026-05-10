import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Sprites can move in many ways — walk, jump, glide, turn, point in a direction. Let's make ours dance!",
    objectives: [
      "Use 'move', 'turn' and 'glide' blocks.",
      "Make a sprite walk back and forth.",
      "Combine motion with looks and sound.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🟦 Motion blocks", body: "All movement uses BLUE blocks.", bullets: [
        "Move 10 steps — moves forward",
        "Turn ↻ 15 degrees — rotate clockwise",
        "Turn ↺ 15 degrees — rotate anticlockwise",
        "Go to x: 0 y: 0 — go to centre",
        "Glide 1 sec to x: 100 y: 50 — smooth movement",
      ] },
      { heading: "What are X and Y?", body: "The stage uses x (left-right) and y (up-down). x = 0 and y = 0 is the centre." },
      { heading: "Walk back and forth 🚶‍♂️", body: "Use a 'forever' loop with: move 10 → if on edge bounce. The cat will walk and turn at edges." },
      { heading: "Glide vs Move", body: "MOVE is instant. GLIDE is slow and smooth — like sliding on ice." },
      { heading: "💡 Tip", body: "Combine motion with 'next costume' (Looks) to make the cat actually walk like an animation!" },
    ],
  },
  images: {
    items: [
      { emoji: "🚶", caption: "Move + next costume = walking." },
      { emoji: "🔄", caption: "Turn — rotate the sprite." },
      { emoji: "🛷", caption: "Glide — smooth movement." },
      { emoji: "📐", caption: "X and Y on the stage." },
      { emoji: "🎯", caption: "Go to a specific x, y." },
      { emoji: "♾️", caption: "Forever loop — keep moving." },
    ],
  },
  activities: {
    items: [
      { title: "Walking cat 🚶", steps: ["Use 'forever' + 'move 10' + 'next costume' + 'wait 0.1' + 'if on edge bounce'.", "Click flag — the cat walks!"] },
      { title: "Spin party 💫", steps: ["Use 'turn 15 degrees' inside a forever loop."] },
      { title: "Glide square 🟦", steps: ["Glide to (100,0), then (100,100), then (0,100), then (0,0)."] },
      { title: "Dance combo 💃", steps: ["Combine move + turn + play sound.", "Make the cat dance for 5 seconds."] },
      { title: "Race two sprites 🏁", steps: ["Add two sprites.", "Make them both move on flag click.", "First to the right edge wins!"] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Motion blocks are which colour?", options: ["Blue", "Yellow", "Green", "Pink"], answerIndex: 0 },
      { type: "mcq", question: "Center of stage is x=0 and y=____.", options: ["0", "100", "50", "200"], answerIndex: 0 },
      { type: "mcq", question: "Which block makes smooth movement?", options: ["Move", "Glide", "Turn", "Wait"], answerIndex: 1 },
      { type: "mcq", question: "Which loop runs forever?", options: ["Repeat 10", "Forever", "If", "Wait"], answerIndex: 1 },
      { type: "tf", question: "X axis is up-down.", answer: false, explanation: "X is left-right. Y is up-down." },
      { type: "tf", question: "Glide is slower than Move.", answer: true },
      { type: "tf", question: "If on edge bounce makes sprite turn at edges.", answer: true },
      { type: "fill", question: "Move 10 steps moves the sprite ______.", answer: "forward" },
      { type: "fill", question: "Turn 90 degrees changes the ______.", answer: "direction" },
      { type: "fill", question: "______ loop runs without stopping.", answer: "Forever" },
      { type: "short", question: "How do you make a sprite look like it's walking?", modelAnswer: "Combine 'move' with 'next costume' inside a loop." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Glide block needs a ____ value.", options: ["time and position", "colour", "name", "sound"], answerIndex: 0 },
      { type: "mcq", question: "Which block makes the sprite go to centre?", options: ["go to x:0 y:0", "move 10", "glide 5", "turn 30"], answerIndex: 0 },
      { type: "mcq", question: "X = 100 means sprite is ____.", options: ["high", "right of centre", "left of centre", "below centre"], answerIndex: 1 },
      { type: "mcq", question: "Which block helps the sprite NOT walk off screen?", options: ["wait", "if on edge bounce", "stop", "next costume"], answerIndex: 1 },
      { type: "mcq", question: "Motion + costume change = ____.", options: ["typing", "walking animation", "sound", "rotation"], answerIndex: 1 },
      { type: "mcq", question: "Y = 100 means sprite is ____.", options: ["above centre", "below centre", "left of centre", "right of centre"], answerIndex: 0 },
      { type: "mcq", question: "Repeat 5 means do the inside ____ times.", options: ["1", "2", "5", "10"], answerIndex: 2 },
      { type: "tf", question: "Forever block has an empty top.", answer: false },
      { type: "tf", question: "We can have multiple motion blocks in one script.", answer: true },
      { type: "fill", question: "Y axis controls ______ position.", answer: "vertical" },
    ],
  },
  lab: { type: "scratch", instructions: "Open the Scratch-like editor and combine motion + costumes for a walking sprite." },
};
export default content;
