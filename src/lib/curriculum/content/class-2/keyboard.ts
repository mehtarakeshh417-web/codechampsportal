import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "The keyboard has many groups of keys. In this lesson we look at each group and learn what it does.",
    objectives: [
      "Identify alphabet, number, function and special keys.",
      "Use Caps Lock, Tab and Shift correctly.",
      "Type a short paragraph with capital letters and spaces.",
    ],
    duration: "20 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "Key Groups", body: "Keys are grouped by their job.", bullets: [
        "ALPHABET KEYS — A to Z.",
        "NUMBER KEYS — 0 to 9 (top row + numpad).",
        "FUNCTION KEYS — F1 to F12 at the very top.",
        "ARROW KEYS — ⬆️ ⬇️ ⬅️ ➡️.",
        "SPECIAL KEYS — Enter, Spacebar, Shift, Ctrl, Alt, Tab, Caps Lock, Backspace, Delete.",
      ] },
      { heading: "🔤 Caps Lock", body: "Press once to type ALL CAPITAL LETTERS. Press again to go back to small letters." },
      { heading: "🆎 Shift", body: "Hold SHIFT + alphabet key for ONE capital letter. Hold SHIFT + number key for symbols like !@#$." },
      { heading: "↹ Tab", body: "Tab key moves the cursor a few spaces forward — used to start paragraphs." },
      { heading: "💡 Numpad", body: "Some keyboards have a small number pad on the right — like a calculator!" },
    ],
  },
  images: {
    items: [
      { emoji: "🔤", caption: "Alphabet keys A to Z." },
      { emoji: "🔢", caption: "Number keys 0 to 9." },
      { emoji: "🆎", caption: "Shift + key = capital letter or symbol." },
      { emoji: "↹", caption: "Tab key — jumps the cursor forward." },
      { emoji: "🅰️", caption: "Caps Lock — locks capital letters." },
      { emoji: "⬅️", caption: "Backspace — erase to the left." },
    ],
  },
  activities: {
    items: [
      { title: "Capital fun 🅰️", steps: ["Type 'hello world' in small letters.", "Now use Shift to type 'Hello World'.", "Now use Caps Lock to type 'HELLO WORLD'."] },
      { title: "Symbol search 🔣", steps: ["Press Shift + 1 to type '!'.", "Try Shift + 2, 3, 4 to see other symbols."] },
      { title: "Tab paragraph 📝", steps: ["Press Tab.", "Type a 2-line story.", "Press Enter and Tab again."] },
      { title: "Arrow walk ⬆️", steps: ["Open a typed paragraph.", "Use arrow keys to move the cursor up, down, left, right."] },
      { title: "Numpad practice 🔢", steps: ["If your keyboard has a numpad, type your phone number using only numpad keys."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Function keys are F1 to ____.", options: ["F8", "F10", "F12", "F20"], answerIndex: 2 },
      { type: "mcq", question: "Caps Lock makes letters ____.", options: ["small", "capital", "italic", "bold"], answerIndex: 1 },
      { type: "mcq", question: "Which key gives spaces?", options: ["Tab", "Spacebar", "Enter", "Shift"], answerIndex: 1 },
      { type: "mcq", question: "Which key starts a new line?", options: ["Tab", "Enter", "Shift", "Ctrl"], answerIndex: 1 },
      { type: "tf", question: "Tab and Spacebar are the same.", answer: false },
      { type: "tf", question: "Shift + 1 gives '!' on most keyboards.", answer: true },
      { type: "tf", question: "Backspace deletes letters to the right.", answer: false, explanation: "Backspace deletes to the LEFT. Delete erases to the right." },
      { type: "fill", question: "There are ______ alphabet keys.", answer: "26" },
      { type: "fill", question: "Arrow keys come in ______ directions.", answer: "4" },
      { type: "fill", question: "______ Lock is used to type all capital letters.", answer: "Caps" },
      { type: "short", question: "Name two special keys.", modelAnswer: "Shift and Enter (or Tab, Caps Lock, Ctrl)." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which key types one capital letter while holding it?", options: ["Caps Lock", "Shift", "Tab", "Ctrl"], answerIndex: 1 },
      { type: "mcq", question: "Which keys move the cursor in 4 directions?", options: ["Function", "Arrow", "Number", "Symbol"], answerIndex: 1 },
      { type: "mcq", question: "F1 to F12 keys are called ____ keys.", options: ["fast", "function", "first", "finger"], answerIndex: 1 },
      { type: "mcq", question: "Numpad looks like a ____.", options: ["TV", "calculator", "phone book", "stove"], answerIndex: 1 },
      { type: "mcq", question: "Which key indents (jumps) the cursor?", options: ["Spacebar", "Tab", "Enter", "Caps"], answerIndex: 1 },
      { type: "mcq", question: "Shift + number key types ____.", options: ["nothing", "a symbol", "a letter", "a sound"], answerIndex: 1 },
      { type: "tf", question: "Caps Lock is a toggle key (turns on/off).", answer: true },
      { type: "tf", question: "Delete key is the same as Backspace.", answer: false },
      { type: "tf", question: "All keyboards have exactly 12 function keys.", answer: true },
      { type: "fill", question: "The longest key is the ______.", answer: "Spacebar" },
    ],
  },
  lab: { type: "none" },
};
export default content;
