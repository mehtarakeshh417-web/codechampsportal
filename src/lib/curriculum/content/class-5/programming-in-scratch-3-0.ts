import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Use Scratch 3.0 blocks to add events, loops, conditions and variables — the foundations of programming.",
    objectives: [
      "Trigger code with event blocks.",
      "Use repeat and forever loops.",
      "Create and use variables.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🟧 What is Scratch?", body: "Scratch is a free block-based language by MIT. You drag puzzle-shaped blocks to make code." },
      { heading: "⚡ Events", body: "Yellow blocks start your script.", bullets: [
        "When 🚩 clicked", "When key pressed", "When sprite clicked",
      ] },
      { heading: "🔁 Loops (Control)", body: "Orange blocks repeat code.", bullets: [
        "repeat 10 — runs 10 times", "forever — runs always", "if … then — condition",
      ] },
      { heading: "📦 Variables", body: "Make a variable to remember a number, e.g., score. Set, change or show it on stage." },
      { heading: "🧠 Tip", body: "Plan first: what should happen, when and how often?" },
    ],
  },
  images: {
    items: [
      { emoji: "🟧", caption: "Scratch logo." },
      { emoji: "🟨", caption: "Event block." },
      { emoji: "🟧", caption: "Repeat loop." },
      { emoji: "🟦", caption: "Motion block." },
      { emoji: "📦", caption: "Variable: score." },
      { emoji: "🚩", caption: "Green flag start." },
    ],
  },
  activities: {
    items: [
      { title: "Bouncing Cat 🐱", steps: ["When 🚩 clicked.", "forever → move 10 → if on edge, bounce."] },
      { title: "Counter 🔢", steps: ["Make variable 'count'.", "When space pressed → change count by 1."] },
      { title: "Catch Game 🎯", steps: ["Make sprite fall.", "If touching player → change score by 1."] },
      { title: "Square Drawing 🟪", steps: ["Use Pen extension.", "repeat 4 → move 100 → turn 90."] },
      { title: "Greeting 👋", steps: ["When 🚩 → ask 'Name?' → say 'Hi ' join answer."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Yellow blocks are…", options: ["Motion", "Events", "Looks", "Sound"], answerIndex: 1 },
      { type: "fill", question: "A loop repeats ___.", answer: "blocks" },
      { type: "tf", question: "Forever block runs once.", answer: false },
      { type: "mcq", question: "Variable can store…", options: ["A number", "A picture", "A sound", "A sprite"], answerIndex: 0 },
      { type: "fill", question: "Click the green ___ to run code.", answer: "flag" },
      { type: "mcq", question: "Repeat 5 will run code…", options: ["Once", "5 times", "Forever", "Never"], answerIndex: 1 },
      { type: "tf", question: "Scratch was made by MIT.", answer: true },
      { type: "fill", question: "If…then is an example of a ___.", answer: "condition" },
      { type: "mcq", question: "Move 10 steps belongs to…", options: ["Motion", "Events", "Sound", "Variables"], answerIndex: 0 },
      { type: "tf", question: "You can make your own variables.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Which starts a script?", options: ["Repeat", "When 🚩 clicked", "If touching", "Move 10"], answerIndex: 1 },
      { type: "mcq", question: "Forever block…", options: ["Runs once", "Never runs", "Runs always", "Stops sprite"], answerIndex: 2 },
      { type: "tf", question: "Variables can change during the game.", answer: true },
      { type: "fill", question: "To draw a square, repeat ___ times.", answer: "4" },
      { type: "mcq", question: "If sprite touches edge, use…", options: ["if on edge bounce", "wait 1 sec", "change costume", "play sound"], answerIndex: 0 },
      { type: "mcq", question: "Score is a typical…", options: ["Variable", "Sprite", "Stage", "Sound"], answerIndex: 0 },
      { type: "tf", question: "Repeat is a Control block.", answer: true },
      { type: "fill", question: "Block-based language by MIT is ___.", answer: "Scratch" },
      { type: "mcq", question: "ask block belongs to…", options: ["Sensing", "Motion", "Looks", "Pen"], answerIndex: 0 },
      { type: "tf", question: "Events are yellow puzzle blocks.", answer: true },
    ],
  },
  lab: { type: "scratch", instructions: "Build a bouncing cat with a score that increases every time you press space." },
};
export default content;
