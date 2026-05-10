import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary:
      "The mouse is a small, round device that helps us point, click and drag things on the screen. Let's learn how to use it!",
    objectives: [
      "Hold the mouse the right way.",
      "Do a left-click, right-click and double-click.",
      "Move and drag things using the mouse.",
    ],
    duration: "15 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      {
        heading: "🖱️ What is a Mouse?",
        body: "A computer mouse is a small input device. It is called a 'mouse' because it looks like a real mouse with a long tail (the cable).",
      },
      {
        heading: "Parts of the Mouse",
        body: "A simple mouse has three main parts.",
        bullets: [
          "LEFT BUTTON — the most used button.",
          "RIGHT BUTTON — used to open special menus.",
          "SCROLL WHEEL — to move pages up and down.",
        ],
      },
      {
        heading: "How to Hold the Mouse 👋",
        body: "Place your hand softly on top of the mouse. Index finger on the LEFT button, middle finger on the RIGHT button. Don't squeeze it!",
      },
      {
        heading: "Mouse Actions",
        body: "There are 4 main mouse actions.",
        bullets: [
          "CLICK — press the left button once.",
          "DOUBLE-CLICK — press the left button two times quickly.",
          "RIGHT-CLICK — press the right button once.",
          "DRAG — hold left button and move the mouse.",
        ],
      },
      {
        heading: "💡 Tip",
        body: "When you move the mouse, an arrow on the screen also moves. This arrow is called the POINTER or CURSOR.",
      },
    ],
  },
  images: {
    items: [
      { emoji: "🖱️", caption: "A simple computer mouse." },
      { emoji: "👆", caption: "Index finger on the LEFT button." },
      { emoji: "🖲️", caption: "Some mice are round and wireless." },
      { emoji: "➡️", caption: "The pointer (arrow) on the screen." },
      { emoji: "👇", caption: "Press once = click. Press twice fast = double-click." },
    ],
  },
  activities: {
    items: [
      {
        title: "Mouse hand pose 🤚",
        steps: [
          "Pick up your mouse.",
          "Place index finger on left, middle on right.",
          "Show your friend or teacher and check.",
        ],
        expectedOutcome: "You can hold the mouse correctly.",
      },
      {
        title: "Pointer race 🏁",
        steps: [
          "Move the mouse so the pointer reaches each corner of the screen.",
          "Try to do all 4 corners in 10 seconds.",
        ],
      },
      {
        title: "Click practice 👆",
        steps: [
          "Open MS Paint.",
          "Use single click to pick a colour.",
          "Use double-click to open a tool window.",
        ],
      },
      {
        title: "Drag the icon ✋",
        steps: [
          "On the desktop, click and HOLD an icon.",
          "Move it to a new place.",
          "Let go of the button.",
        ],
        expectedOutcome: "The icon moves to the new spot — that's dragging!",
      },
      {
        title: "Right-click hunt 🔎",
        steps: [
          "Right-click on the desktop.",
          "Read the menu that opens.",
          "Close the menu by clicking somewhere else.",
        ],
      },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "The mouse is a ______ device.", options: ["pointing", "cooking", "writing", "singing"], answerIndex: 0 },
      { type: "mcq", question: "Which button is used most of the time?", options: ["Left", "Right", "Scroll", "None"], answerIndex: 0 },
      { type: "mcq", question: "Pressing the left button twice quickly is called ______.", options: ["click", "right-click", "double-click", "drag"], answerIndex: 2 },
      { type: "mcq", question: "The arrow on the screen is called ______.", options: ["pointer", "finger", "rope", "tail"], answerIndex: 0 },
      { type: "tf", question: "The mouse is an output device.", answer: false, explanation: "The mouse is an INPUT device." },
      { type: "tf", question: "We can drag things with the mouse.", answer: true },
      { type: "tf", question: "Right-click opens a special menu.", answer: true },
      { type: "fill", question: "The wheel between the buttons is called the ______ wheel.", answer: "scroll" },
      { type: "fill", question: "We click the ______ button to open a special menu.", answer: "right" },
      { type: "fill", question: "Holding the left button and moving the mouse is called ______.", answer: "drag" },
      { type: "short", question: "Name two actions you can do with a mouse.", modelAnswer: "Click and double-click (or drag, right-click)." },
    ],
  },
  quiz: {
    passScore: 60,
    timerSeconds: 300,
    questions: [
      { type: "mcq", question: "How many main buttons does a simple mouse have?", options: ["1", "2", "3", "4"], answerIndex: 1 },
      { type: "mcq", question: "Which finger goes on the LEFT mouse button?", options: ["Thumb", "Index", "Little", "Ring"], answerIndex: 1 },
      { type: "mcq", question: "What moves on the screen when we move the mouse?", options: ["Music", "Pointer", "Window", "CPU"], answerIndex: 1 },
      { type: "mcq", question: "What is dragging?", options: ["Pressing the right button", "Clicking once", "Holding left button and moving", "Switching off"], answerIndex: 2 },
      { type: "mcq", question: "Why is the mouse called a 'mouse'?", options: ["Because it eats cheese", "Because it looks like a small animal with a tail", "Because it squeaks", "Because it is grey"], answerIndex: 1 },
      { type: "mcq", question: "Double-click is used to ______ files.", options: ["open", "delete", "type", "print"], answerIndex: 0 },
      { type: "mcq", question: "The scroll wheel is used to ______.", options: ["move the page up and down", "type letters", "switch off", "play music"], answerIndex: 0 },
      { type: "tf", question: "We should hold the mouse very tightly.", answer: false, explanation: "Hold the mouse softly, never squeeze." },
      { type: "tf", question: "A wireless mouse does not have a cable.", answer: true },
      { type: "fill", question: "Pressing the left button once is called a ______.", answer: "click" },
    ],
  },
  lab: { type: "none", instructions: "Try mouse actions in MS Paint. Open Paint from the Coding Lab if available." },
};

export default content;
