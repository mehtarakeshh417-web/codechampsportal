import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Now let's get more done in MS Word — alignment, lists, undo, find/replace and inserting pictures.",
    objectives: [
      "Align text left, center, right or justified.",
      "Make bulleted and numbered lists.",
      "Insert a picture and use Find & Replace.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "📐 Alignment", body: "Choose how the text sits on the page.", bullets: [
        "LEFT — text starts from the left edge",
        "CENTER — middle of the page",
        "RIGHT — sticks to the right edge",
        "JUSTIFY — both edges line up perfectly",
      ] },
      { heading: "• Bulleted Lists / 1. Numbered Lists", body: "Use bullets when order doesn't matter (shopping list). Use numbers when order matters (steps to do something)." },
      { heading: "🔍 Find and Replace", body: "Press Ctrl+F to FIND a word, Ctrl+H to FIND and REPLACE one word with another." },
      { heading: "🖼️ Insert Picture", body: "Insert tab → Pictures → choose file. The picture appears in your document." },
      { heading: "↩️ Undo / Redo", body: "Ctrl+Z = undo. Ctrl+Y = redo. Use them often!" },
      { heading: "💡 Tip", body: "Use 'Justify' alignment to make your paragraphs look neat like a printed book." },
    ],
  },
  images: {
    items: [
      { emoji: "⬅️", caption: "Left aligned text." },
      { emoji: "↔️", caption: "Center aligned text." },
      { emoji: "➡️", caption: "Right aligned text." },
      { emoji: "📋", caption: "Justified text — both sides straight." },
      { emoji: "•", caption: "Bulleted list." },
      { emoji: "🖼️", caption: "Insert a picture." },
    ],
  },
  activities: {
    items: [
      { title: "Alignment art 📐", steps: ["Type 4 lines.", "Make line 1 left, line 2 center, line 3 right, line 4 justified."] },
      { title: "Shopping list 🛒", steps: ["Type 5 items.", "Make a bulleted list of them."] },
      { title: "Steps to brush 🪥", steps: ["Type 5 steps to brush teeth.", "Make a numbered list."] },
      { title: "Replace a word 🔁", steps: ["Type a paragraph using 'cat' 5 times.", "Use Find & Replace to change 'cat' to 'dog'."] },
      { title: "My poster 🎨", steps: ["Insert a picture.", "Add a title above it.", "Center align the title."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Which alignment puts text in the middle?", options: ["Left", "Center", "Right", "Justify"], answerIndex: 1 },
      { type: "mcq", question: "Bulleted lists use ____.", options: ["numbers", "dots", "letters", "shapes"], answerIndex: 1 },
      { type: "mcq", question: "Find shortcut is ____.", options: ["Ctrl+F", "Ctrl+H", "Ctrl+S", "Ctrl+P"], answerIndex: 0 },
      { type: "mcq", question: "Replace shortcut is ____.", options: ["Ctrl+F", "Ctrl+H", "Ctrl+R", "Ctrl+P"], answerIndex: 1 },
      { type: "tf", question: "Justify makes both sides of paragraph straight.", answer: true },
      { type: "tf", question: "Numbered list is used when order matters.", answer: true },
      { type: "tf", question: "We cannot insert pictures in Word.", answer: false },
      { type: "fill", question: "Ctrl + ______ undoes the last action.", answer: "Z" },
      { type: "fill", question: "Pictures are added from the ______ tab.", answer: "Insert" },
      { type: "fill", question: "Right alignment puts text at the ______ side.", answer: "right" },
      { type: "short", question: "When would you use a numbered list?", modelAnswer: "When showing steps in order, like a recipe." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Justified text is straight on ____.", options: ["only left", "only right", "both sides", "no side"], answerIndex: 2 },
      { type: "mcq", question: "Which is best for ranking 1st, 2nd, 3rd?", options: ["bulleted", "numbered", "no list", "table"], answerIndex: 1 },
      { type: "mcq", question: "Ctrl+Z is for ____.", options: ["undo", "redo", "save", "print"], answerIndex: 0 },
      { type: "mcq", question: "Pictures can be inserted from ____.", options: ["Home tab", "Insert tab", "View tab", "Help tab"], answerIndex: 1 },
      { type: "mcq", question: "Find and Replace helps when we want to change a word ____.", options: ["once", "everywhere", "nowhere", "in the title only"], answerIndex: 1 },
      { type: "mcq", question: "Which is NOT an alignment option?", options: ["Left", "Right", "Center", "Diagonal"], answerIndex: 3 },
      { type: "mcq", question: "Ctrl+Y is for ____.", options: ["undo", "redo", "save", "print"], answerIndex: 1 },
      { type: "tf", question: "Bulleted list shows order of items.", answer: false },
      { type: "tf", question: "We can change picture size in Word.", answer: true },
      { type: "fill", question: "______ alignment puts text on the right edge.", answer: "Right" },
    ],
  },
  lab: { type: "word", instructions: "Open the Document editor in the Coding Lab. Try alignment, lists and inserting a picture." },
};
export default content;
