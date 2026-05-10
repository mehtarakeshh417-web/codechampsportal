import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary:
      "The keyboard has many keys. We use it to type letters, numbers and even smiley faces. Let's learn the most important keys!",
    objectives: [
      "Recognise alphabet, number and special keys.",
      "Type your name on the keyboard.",
      "Use the spacebar, enter and backspace keys.",
    ],
    duration: "20 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      {
        heading: "⌨️ What is a Keyboard?",
        body: "A keyboard is an INPUT device with many small buttons called KEYS. We type text and numbers using these keys.",
      },
      {
        heading: "Types of Keys",
        body: "Keys are grouped together by what they do.",
        bullets: [
          "ALPHABET KEYS — A to Z, used to type letters.",
          "NUMBER KEYS — 0 to 9, used to type numbers.",
          "SPACEBAR — the longest key, gives a space between words.",
          "ENTER KEY — moves to a new line.",
          "BACKSPACE — removes the last letter you typed.",
          "SHIFT KEY — for capital letters and symbols.",
          "ARROW KEYS — move the cursor up, down, left, right.",
        ],
      },
      {
        heading: "Where is each key?",
        body: "Alphabet keys are in the middle. Numbers are in a row at the top. Spacebar is at the bottom — it is the longest key on the keyboard!",
      },
      {
        heading: "💡 Tip — Capital Letters",
        body: "To type a capital letter, hold SHIFT and press the alphabet key together.",
      },
      {
        heading: "🎯 Did you know?",
        body: "Most keyboards in the world start with QWERTY in the top alphabet row. That's why they are called QWERTY keyboards.",
      },
    ],
  },
  images: {
    items: [
      { emoji: "⌨️", caption: "A computer keyboard with many keys." },
      { emoji: "🔤", caption: "Alphabet keys A to Z." },
      { emoji: "🔢", caption: "Number keys 0 to 9." },
      { emoji: "␣", caption: "The Spacebar — the longest key." },
      { emoji: "↩️", caption: "Enter key — go to a new line." },
      { emoji: "⬅️", caption: "Backspace — erase the last letter." },
    ],
  },
  activities: {
    items: [
      {
        title: "Type your name 📝",
        steps: [
          "Open MS Word or any text editor.",
          "Type the alphabets of your name one by one.",
          "Save the file with your name.",
        ],
        expectedOutcome: "Your name appears on the screen!",
      },
      {
        title: "Find that key 🔍",
        steps: [
          "Teacher will call out a key (Shift, Enter, etc).",
          "Find it on the keyboard and point to it.",
        ],
      },
      {
        title: "Spacebar song 🎵",
        steps: [
          "Type: I love my school",
          "Use the spacebar between every word.",
          "Read aloud what you typed.",
        ],
      },
      {
        title: "Capital letter race 🅰️",
        steps: [
          "Type the small letters a, b, c, d.",
          "Now hold SHIFT and type A, B, C, D.",
        ],
        expectedOutcome: "You can type both small and capital letters.",
      },
      {
        title: "Backspace clean-up 🧹",
        steps: [
          "Type: appplee",
          "Use BACKSPACE to remove extra letters and make it 'apple'.",
        ],
      },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "The keyboard is used to ______.", options: ["type", "draw", "print", "scan"], answerIndex: 0 },
      { type: "mcq", question: "How many alphabet keys are there?", options: ["10", "20", "26", "30"], answerIndex: 2 },
      { type: "mcq", question: "Which key is the longest on the keyboard?", options: ["Enter", "Spacebar", "Shift", "Tab"], answerIndex: 1 },
      { type: "mcq", question: "Which key is used to remove the last letter?", options: ["Enter", "Spacebar", "Backspace", "Shift"], answerIndex: 2 },
      { type: "tf", question: "The keyboard is an output device.", answer: false, explanation: "The keyboard is an INPUT device." },
      { type: "tf", question: "We use the Shift key to type capital letters.", answer: true },
      { type: "tf", question: "Number keys are at the bottom of the keyboard.", answer: false, explanation: "Number keys are in a row at the TOP." },
      { type: "fill", question: "There are ______ number keys (0 to 9).", answer: "10" },
      { type: "fill", question: "The ______ key takes us to a new line.", answer: "enter" },
      { type: "fill", question: "Hold ______ + a letter to type a capital letter.", answer: "shift" },
      { type: "short", question: "Name three special keys on the keyboard.", modelAnswer: "Enter, Spacebar, Shift (or Backspace)." },
    ],
  },
  quiz: {
    passScore: 60,
    timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which key gives space between two words?", options: ["Enter", "Shift", "Spacebar", "Tab"], answerIndex: 2 },
      { type: "mcq", question: "Which keys are A to Z called?", options: ["Number keys", "Alphabet keys", "Function keys", "Arrow keys"], answerIndex: 1 },
      { type: "mcq", question: "Which key has a left-pointing arrow and erases letters?", options: ["Enter", "Backspace", "Shift", "Caps Lock"], answerIndex: 1 },
      { type: "mcq", question: "What does the Enter key do?", options: ["Adds a space", "Moves to a new line", "Erases a letter", "Switches off"], answerIndex: 1 },
      { type: "mcq", question: "Which keys move the cursor in 4 directions?", options: ["Number keys", "Arrow keys", "Function keys", "Symbols"], answerIndex: 1 },
      { type: "mcq", question: "How many number keys are usually on top of a keyboard?", options: ["5", "8", "10", "12"], answerIndex: 2 },
      { type: "mcq", question: "Which keyboard is most common?", options: ["ABCDEF", "QWERTY", "ZXCVBN", "AZERTY"], answerIndex: 1 },
      { type: "tf", question: "Backspace deletes letters to the left.", answer: true },
      { type: "tf", question: "We can type symbols using the Shift key with number keys.", answer: true },
      { type: "fill", question: "The ______ key starts a new paragraph.", answer: "enter" },
    ],
  },
  lab: { type: "none", instructions: "Practice typing in any text editor. Try the Word editor in the Coding Lab." },
};

export default content;
