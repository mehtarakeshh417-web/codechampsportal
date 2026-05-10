import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Scratch 3.0 is a friendly programming tool. We snap colourful blocks together to make games, animations and stories.",
    objectives: [
      "Open Scratch 3.0 and meet the screen layout.",
      "Drag a block into the script area.",
      "Run a simple script using the green flag.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🟧 What is Scratch?", body: "Scratch is a free coding tool by MIT. Instead of typing code, we drag and drop colourful BLOCKS." },
      { heading: "Screen Layout", body: "The Scratch window has 4 main areas:", bullets: [
        "STAGE — top right, where the cat performs",
        "BLOCKS PALETTE — left, all the blocks grouped by colour",
        "SCRIPT AREA — middle, where we drop blocks",
        "SPRITE LIST — bottom right, all sprites",
      ] },
      { heading: "Block Categories 🎨", body: "Scratch blocks are grouped:", bullets: [
        "Motion (blue) — move, turn, go to",
        "Looks (purple) — say, change colour",
        "Sound (pink) — play sound",
        "Events (yellow) — when flag clicked",
        "Control (orange) — wait, repeat, if",
      ] },
      { heading: "🚩 Green Flag", body: "Click the GREEN FLAG above the stage to RUN your script. The RED OCTAGON stops it." },
      { heading: "💡 Tip", body: "Always start your script with a yellow EVENT block — otherwise it won't know when to begin." },
    ],
  },
  images: {
    items: [
      { emoji: "🟧", caption: "Scratch logo and editor." },
      { emoji: "🐱", caption: "Default sprite — Scratch cat." },
      { emoji: "🚩", caption: "Green flag — start the script." },
      { emoji: "🛑", caption: "Red octagon — stop." },
      { emoji: "🟦", caption: "Blue blocks — Motion." },
      { emoji: "🟨", caption: "Yellow blocks — Events." },
    ],
  },
  activities: {
    items: [
      { title: "Open and explore 🔎", steps: ["Open Scratch 3.0.", "Find the stage, palette, script area and sprite list."] },
      { title: "Move 10 steps 🚶", steps: ["From Motion, drag 'move 10 steps'.", "Click it.", "Watch the cat move."] },
      { title: "Hello with the flag 🚩", steps: ["Drag 'when flag clicked'.", "Snap 'say Hello' under it.", "Click the green flag."] },
      { title: "Sound time 🔊", steps: ["Drag 'play sound meow'.", "Run it with the green flag."] },
      { title: "Stop test 🛑", steps: ["Click the red octagon to stop.", "Notice how the cat stops."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Scratch is made by ____.", options: ["Apple", "MIT", "Google", "Sony"], answerIndex: 1 },
      { type: "mcq", question: "We RUN a Scratch script with the ____.", options: ["red square", "green flag", "blue circle", "yellow star"], answerIndex: 1 },
      { type: "mcq", question: "Motion blocks are which colour?", options: ["Blue", "Yellow", "Purple", "Pink"], answerIndex: 0 },
      { type: "mcq", question: "Which area shows the cat performing?", options: ["Palette", "Stage", "Script area", "Sprite list"], answerIndex: 1 },
      { type: "tf", question: "Scratch needs typing of code.", answer: false },
      { type: "tf", question: "We start scripts with Events block.", answer: true },
      { type: "tf", question: "Scratch is free to use.", answer: true },
      { type: "fill", question: "______ flag runs the script.", answer: "Green" },
      { type: "fill", question: "Stage shows the ______ output.", answer: "visual" },
      { type: "fill", question: "Yellow blocks are ______ blocks.", answer: "Events" },
      { type: "short", question: "Name two block categories.", modelAnswer: "Motion and Looks." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "What does the red octagon do?", options: ["start", "stop", "save", "delete"], answerIndex: 1 },
      { type: "mcq", question: "Which colour blocks make sounds?", options: ["Pink", "Blue", "Green", "Yellow"], answerIndex: 0 },
      { type: "mcq", question: "Looks blocks are which colour?", options: ["Blue", "Purple", "Yellow", "Pink"], answerIndex: 1 },
      { type: "mcq", question: "Where do we drop the blocks to make a script?", options: ["Stage", "Palette", "Script area", "Sprite list"], answerIndex: 2 },
      { type: "mcq", question: "Which block is used to repeat instructions?", options: ["Move", "Repeat", "Say", "Wait"], answerIndex: 1 },
      { type: "mcq", question: "Default sprite is the ____.", options: ["dog", "cat", "fish", "bird"], answerIndex: 1 },
      { type: "mcq", question: "Scratch 3.0 runs in a ____.", options: ["calculator", "browser", "TV", "phone only"], answerIndex: 1 },
      { type: "tf", question: "We can add many sprites in one project.", answer: true },
      { type: "tf", question: "Yellow blocks are for movement.", answer: false },
      { type: "fill", question: "Repeat block is in the ______ category.", answer: "Control" },
    ],
  },
  lab: { type: "scratch", instructions: "Open the Scratch-like editor in the Coding Lab to try block coding." },
};
export default content;
