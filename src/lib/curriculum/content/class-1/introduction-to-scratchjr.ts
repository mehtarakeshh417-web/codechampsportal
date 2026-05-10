import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary:
      "ScratchJr is a colourful app where small kids can make characters jump, dance and tell stories — all without typing any code!",
    objectives: [
      "Tell what ScratchJr is.",
      "Add a sprite (character) and a background.",
      "Use blocks to make a sprite move.",
    ],
    duration: "20 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      {
        heading: "🐱 What is ScratchJr?",
        body: "ScratchJr is a beginner coding app for children aged 5–7. We give instructions to characters using colourful BLOCKS — no need to read or write long code.",
      },
      {
        heading: "What is a Sprite?",
        body: "A SPRITE is the character in ScratchJr. It can be a cat, a dog, a person — anything! We tell sprites what to do.",
      },
      {
        heading: "What is a Background?",
        body: "The BACKGROUND is the picture behind the sprite, like a beach, a city, a jungle or even outer space.",
      },
      {
        heading: "Block Colours 🟦🟨🟥",
        body: "Different coloured blocks do different things.",
        bullets: [
          "🟨 YELLOW — when something starts (like 'when green flag tapped').",
          "🟦 BLUE — movement (move right, jump, turn).",
          "🟪 PURPLE — looks (say something, change size).",
          "🟩 GREEN — sound.",
          "🟥 RED — stop.",
        ],
      },
      {
        heading: "Connecting Blocks 🧱",
        body: "We drag blocks and snap them together — like LEGO! When we tap the green flag, the blocks run one by one.",
      },
      {
        heading: "💡 Fun Fact",
        body: "ScratchJr was made by MIT, a famous university in America, just for small children to learn coding!",
      },
    ],
  },
  images: {
    items: [
      { emoji: "🐱", caption: "Cat — the most famous ScratchJr sprite." },
      { emoji: "🟦", caption: "Blue blocks make sprites move." },
      { emoji: "🟨", caption: "Yellow blocks start a program." },
      { emoji: "🟪", caption: "Purple blocks make sprites talk and change size." },
      { emoji: "🟩", caption: "Green blocks add fun sounds." },
      { emoji: "🚩", caption: "Tap the green flag to RUN the program." },
    ],
  },
  activities: {
    items: [
      {
        title: "Make the cat walk 🐱",
        steps: [
          "Open ScratchJr.",
          "Drag the 'when flag tapped' yellow block.",
          "Snap a 'move right' blue block after it.",
          "Tap the green flag.",
        ],
        expectedOutcome: "The cat walks to the right!",
      },
      {
        title: "Add a background 🌳",
        steps: [
          "Tap the background icon.",
          "Choose any background you like.",
          "Tap OK to set it.",
        ],
      },
      {
        title: "Make the cat jump 🦘",
        steps: [
          "Drag a 'hop' (jump) blue block.",
          "Connect it after the start block.",
          "Tap the green flag.",
        ],
      },
      {
        title: "Make the cat speak 💬",
        steps: [
          "Use a purple 'say hello' block.",
          "Type a small word like 'Hi'.",
          "Run it with the green flag.",
        ],
        expectedOutcome: "The cat shows a speech bubble!",
      },
      {
        title: "Sound time 🔊",
        steps: [
          "Drag a green sound block.",
          "Pick a fun sound or record your own voice.",
          "Connect it to your other blocks and run.",
        ],
      },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "A character in ScratchJr is called a ______.", options: ["sprite", "block", "stage", "tile"], answerIndex: 0 },
      { type: "mcq", question: "Which colour blocks are used for movement?", options: ["Red", "Yellow", "Blue", "Green"], answerIndex: 2 },
      { type: "mcq", question: "What do we tap to RUN a program?", options: ["Red square", "Green flag", "Blue arrow", "Yellow star"], answerIndex: 1 },
      { type: "mcq", question: "What is the picture behind the sprite called?", options: ["Floor", "Background", "Wall", "Stage paint"], answerIndex: 1 },
      { type: "tf", question: "ScratchJr needs us to type long code.", answer: false, explanation: "We just connect coloured blocks." },
      { type: "tf", question: "The cat can hop in ScratchJr.", answer: true },
      { type: "tf", question: "ScratchJr is for very small children.", answer: true },
      { type: "fill", question: "Yellow blocks tell us when something will ______.", answer: "start" },
      { type: "fill", question: "Purple blocks make a sprite ______ (talk).", answer: "say" },
      { type: "fill", question: "Red block is used to ______ the program.", answer: "stop" },
      { type: "short", question: "Name two things you can do with a sprite in ScratchJr.", modelAnswer: "Make it move and make it speak (or jump, change size, play sound)." },
    ],
  },
  quiz: {
    passScore: 60,
    timerSeconds: 300,
    questions: [
      { type: "mcq", question: "ScratchJr is mostly used by children of age ______.", options: ["1-2", "5-7", "15-18", "30+"], answerIndex: 1 },
      { type: "mcq", question: "Blocks in ScratchJr are joined like ______.", options: ["bricks of LEGO", "drops of water", "notes of music", "leaves on a tree"], answerIndex: 0 },
      { type: "mcq", question: "Which colour block plays a sound?", options: ["Yellow", "Green", "Red", "Purple"], answerIndex: 1 },
      { type: "mcq", question: "Which block starts the program when we tap the flag?", options: ["Yellow start block", "Red stop block", "Blue move block", "Purple speak block"], answerIndex: 0 },
      { type: "mcq", question: "Which block makes the sprite stop?", options: ["Green", "Yellow", "Red", "Blue"], answerIndex: 2 },
      { type: "mcq", question: "Which is NOT a sprite in ScratchJr?", options: ["Cat", "Dog", "Person", "CPU"], answerIndex: 3 },
      { type: "mcq", question: "A speech bubble appears when we use a ______ block.", options: ["blue move", "purple say", "green sound", "red stop"], answerIndex: 1 },
      { type: "tf", question: "We can change the background of the stage.", answer: true },
      { type: "tf", question: "We must type code to make the cat move in ScratchJr.", answer: false },
      { type: "fill", question: "ScratchJr was made by ______ (a famous university).", answer: "MIT" },
    ],
  },
  lab: {
    type: "scratch",
    instructions: "Try the Scratch-like editor in the Coding Lab to practice block coding.",
  },
};

export default content;
