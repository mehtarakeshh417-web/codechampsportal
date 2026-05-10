import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Formatting makes our Word documents look beautiful. Let's learn fonts, sizes, colours, bold/italic/underline and effects.",
    objectives: [
      "Change font name, size and colour.",
      "Apply bold, italic, underline and strikethrough.",
      "Use highlight, superscript and subscript.",
    ],
    duration: "30 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🔤 Font Name and Size", body: "Pick a font like Arial, Calibri or Times New Roman. Pick a size from 8 to 72 (or more)." },
      { heading: "Basic Effects", body: "On the Home tab:", bullets: [
        "B — Bold",
        "I — Italic",
        "U — Underline",
        "S — Strikethrough (line through)",
        "Aa — Change Case",
      ] },
      { heading: "🎨 Font Colour and Highlight", body: "Use the small arrow next to A (font colour) and the marker (highlight) to add colour." },
      { heading: "X² and X₂", body: "Superscript (X²) raises text up. Subscript (X₂) lowers it down. Useful for maths and chemistry." },
      { heading: "Spacing", body: "Change line spacing (1.0, 1.5, 2.0) to make lines closer or farther." },
      { heading: "💡 Tip", body: "Select text FIRST, then click the formatting button." },
    ],
  },
  images: {
    items: [
      { emoji: "🅱️", caption: "Bold text." },
      { emoji: "🅸", caption: "Italic text." },
      { emoji: "🅄", caption: "Underline." },
      { emoji: "🎨", caption: "Font colour & highlight." },
      { emoji: "🆎", caption: "Change Case (upper / lower)." },
      { emoji: "²", caption: "Superscript and Subscript." },
    ],
  },
  activities: {
    items: [
      { title: "Font catwalk 🐱", steps: ["Type your name in 5 different fonts."] },
      { title: "Rainbow word 🌈", steps: ["Type 'RAINBOW'.", "Make each letter a different colour."] },
      { title: "Highlight homework 🖍️", steps: ["Type a small paragraph.", "Highlight the most important word in yellow."] },
      { title: "Maths magic ²", steps: ["Type x²+y² using superscript."] },
      { title: "Case change 🆎", steps: ["Type 'hello world'.", "Use Change Case to make it 'HELLO WORLD'."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Bold makes text ____.", options: ["thick", "thin", "blue", "italic"], answerIndex: 0 },
      { type: "mcq", question: "Strikethrough adds a ____ through text.", options: ["line", "circle", "color", "dot"], answerIndex: 0 },
      { type: "mcq", question: "Superscript text is ____.", options: ["raised up", "lowered down", "underlined", "deleted"], answerIndex: 0 },
      { type: "mcq", question: "Highlight adds ____ behind text.", options: ["colour", "shadow", "border", "italic"], answerIndex: 0 },
      { type: "tf", question: "We must select text before formatting.", answer: true },
      { type: "tf", question: "Italic makes text bigger.", answer: false },
      { type: "tf", question: "Subscript lowers text down.", answer: true },
      { type: "fill", question: "Ctrl + B = ______.", answer: "Bold" },
      { type: "fill", question: "Ctrl + I = ______.", answer: "Italic" },
      { type: "fill", question: "Ctrl + U = ______.", answer: "Underline" },
      { type: "short", question: "Where would you use superscript?", modelAnswer: "In maths or science, like x² or H₂O (subscript)." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which menu is for formatting in Word?", options: ["File", "Home", "View", "Help"], answerIndex: 1 },
      { type: "mcq", question: "Which option gives a coloured background to text?", options: ["Highlight", "Font Colour", "Bold", "Italic"], answerIndex: 0 },
      { type: "mcq", question: "Which is NOT a font?", options: ["Arial", "Calibri", "Underline", "Times New Roman"], answerIndex: 2 },
      { type: "mcq", question: "Change Case can do ____.", options: ["UPPERCASE", "lowercase", "Capitalize", "All of these"], answerIndex: 3 },
      { type: "mcq", question: "Default font size in Word is around ____.", options: ["8", "11", "20", "40"], answerIndex: 1 },
      { type: "mcq", question: "Which key combo makes text italic?", options: ["Ctrl+B", "Ctrl+I", "Ctrl+U", "Ctrl+H"], answerIndex: 1 },
      { type: "mcq", question: "Strikethrough is used to ____ text.", options: ["delete", "cross out", "highlight", "rotate"], answerIndex: 1 },
      { type: "tf", question: "We can change the font of selected text.", answer: true },
      { type: "tf", question: "Highlight and underline are the same.", answer: false },
      { type: "fill", question: "Ctrl + Shift + > makes text ______.", answer: "bigger" },
    ],
  },
  lab: { type: "word", instructions: "Open the Document editor in the Coding Lab and try fonts, colours, bold and superscript." },
};
export default content;
