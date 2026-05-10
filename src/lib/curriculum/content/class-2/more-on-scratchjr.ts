import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Now we add more fun to ScratchJr — sounds, scenes, multiple sprites and small stories.",
    objectives: [
      "Add a new sprite and switch between scenes.",
      "Use sound and speech blocks together.",
      "Make a tiny story with 2 sprites.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🐱🐶 Multiple Sprites", body: "We can add MANY sprites to one project. Each sprite has its own block stack and its own job." },
      { heading: "🎬 Scenes (Pages)", body: "A project can have multiple SCENES. We can move sprites from one scene to another, like pages in a story book." },
      { heading: "🎵 Sound Blocks", body: "Green blocks add sound. We can pick a sound or RECORD our own voice." },
      { heading: "💬 Speech Blocks", body: "Purple 'say' block makes a sprite show a speech bubble with our text." },
      { heading: "Repeating Things 🔁", body: "Orange blocks let us REPEAT a job — like 'do these blocks 5 times'." },
      { heading: "💡 Tip", body: "Plan your story on paper FIRST. Then build it block by block." },
    ],
  },
  images: {
    items: [
      { emoji: "🐱", caption: "Sprite 1 — the cat." },
      { emoji: "🐶", caption: "Sprite 2 — the dog." },
      { emoji: "🎬", caption: "Multiple scenes (pages)." },
      { emoji: "🎤", caption: "Record your own sound." },
      { emoji: "💬", caption: "Speech bubble — Say block." },
      { emoji: "🔁", caption: "Repeat block — orange." },
    ],
  },
  activities: {
    items: [
      { title: "Add a friend 🐶", steps: ["Add a second sprite.", "Place it on the other side of the screen."] },
      { title: "Two-page story 📖", steps: ["Make scene 1: cat in a park.", "Add scene 2: cat at home.", "Use 'go to next page' block."] },
      { title: "My voice 🎤", steps: ["Tap the green sound block.", "Record your name.", "Play it on flag tap."] },
      { title: "Hello-world bots 🤖", steps: ["Sprite 1 says 'Hello'.", "Sprite 2 says 'Hi friend!'.", "Add a small wait between them."] },
      { title: "Repeat dance 💃", steps: ["Use the REPEAT block.", "Inside it: hop + turn.", "Set repeat count to 5."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Multiple ____ can be in one ScratchJr project.", options: ["sprites", "computers", "schools", "moms"], answerIndex: 0 },
      { type: "mcq", question: "Pages in a project are also called ____.", options: ["scenes", "tabs", "rooms", "doors"], answerIndex: 0 },
      { type: "mcq", question: "Repeat block is which colour?", options: ["Orange", "Red", "Yellow", "Blue"], answerIndex: 0 },
      { type: "mcq", question: "Speech bubble is made with which colour block?", options: ["Yellow", "Purple", "Green", "Red"], answerIndex: 1 },
      { type: "tf", question: "We can record our own sounds.", answer: true },
      { type: "tf", question: "ScratchJr only allows one sprite.", answer: false },
      { type: "tf", question: "We can plan a story on paper before coding.", answer: true },
      { type: "fill", question: "Green blocks are for ______.", answer: "sound" },
      { type: "fill", question: "______ block plays the same blocks again and again.", answer: "Repeat" },
      { type: "fill", question: "Background changes when we switch a ______.", answer: "scene" },
      { type: "short", question: "Name two things you can do with a second sprite.", modelAnswer: "Make it move and talk to the first sprite." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "How do we move from one scene to another?", options: ["Yellow start block", "'Go to next page' block", "Red stop block", "Blue move block"], answerIndex: 1 },
      { type: "mcq", question: "Which block makes a sprite say something?", options: ["Hop", "Move", "Say", "Stop"], answerIndex: 2 },
      { type: "mcq", question: "Repeat block is found in which colour group?", options: ["Yellow (start)", "Orange (control)", "Red (stop)", "Blue (motion)"], answerIndex: 1 },
      { type: "mcq", question: "If we set repeat to 4, the block runs ____ times.", options: ["1", "2", "4", "10"], answerIndex: 2 },
      { type: "mcq", question: "Recording our voice goes into which block colour?", options: ["Green", "Yellow", "Purple", "Red"], answerIndex: 0 },
      { type: "mcq", question: "ScratchJr was made for very ____ children.", options: ["small", "old", "tall", "shy"], answerIndex: 0 },
      { type: "mcq", question: "What is a SCENE?", options: ["A sprite", "A page in the project", "A button", "A sound"], answerIndex: 1 },
      { type: "tf", question: "Each sprite has its OWN blocks.", answer: true },
      { type: "tf", question: "ScratchJr has typing-based code.", answer: false },
      { type: "fill", question: "Speech bubbles come from ______ blocks.", answer: "purple" },
    ],
  },
  lab: {
    type: "scratch",
    instructions: "Open the Scratch-like editor in the Coding Lab and try multiple sprites + repeat blocks.",
  },
};
export default content;
