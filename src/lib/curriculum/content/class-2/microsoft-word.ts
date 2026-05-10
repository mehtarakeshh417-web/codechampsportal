import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Microsoft Word is a program where we can type, format and print letters, stories and notes.",
    objectives: [
      "Open MS Word and type text.",
      "Save and open a Word document.",
      "Make text bold, italic and underlined.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "📝 What is MS Word?", body: "MS Word is a WORD PROCESSOR. It lets us type, change, save and print written work — like an electronic notebook." },
      { heading: "How to open Word", body: "Click START → All Programs → Microsoft Office → Word. A blank page opens." },
      { heading: "Parts of the Word Window 🪟", body: "The most useful parts:", bullets: [
        "TITLE BAR — name of the file at top.",
        "RIBBON — coloured tabs (Home, Insert, etc.) with tools.",
        "DOCUMENT AREA — the white page where we type.",
        "STATUS BAR — page number, words count.",
      ] },
      { heading: "✨ Basic Formatting", body: "Make your text look nice using these buttons:", bullets: [
        "B — Bold",
        "I — Italic",
        "U — Underline",
        "Font Size — bigger or smaller letters",
        "Font Colour — red, blue, green and more",
      ] },
      { heading: "💾 Save and Open", body: "FILE → SAVE → choose folder → type name → click SAVE. To open, FILE → OPEN → pick the file." },
      { heading: "💡 Tip", body: "Save with Ctrl + S every few minutes." },
    ],
  },
  images: {
    items: [
      { emoji: "📝", caption: "MS Word — type and format text." },
      { emoji: "🅱️", caption: "Bold text (Ctrl + B)." },
      { emoji: "🆎", caption: "Italic and Underline." },
      { emoji: "🎨", caption: "Change font colour and size." },
      { emoji: "💾", caption: "Save your document." },
      { emoji: "🖨️", caption: "Print your work." },
    ],
  },
  activities: {
    items: [
      { title: "My first letter 💌", steps: ["Open Word.", "Type a letter to your mother.", "Save it as 'letter.docx'."], expectedOutcome: "A saved letter." },
      { title: "Make it bold 🅱️", steps: ["Type your name.", "Select it and press Ctrl+B.", "Try Ctrl+I and Ctrl+U too."] },
      { title: "Big and small 🔡", steps: ["Type 'I am happy'.", "Change font size to 8, then 24, then 36."] },
      { title: "Colour my words 🎨", steps: ["Type 5 colour names.", "Make each word that colour."] },
      { title: "Print preview 🖨️", steps: ["Click File → Print.", "See how your page will look on paper."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "MS Word is used for ____.", options: ["typing", "drawing", "browsing", "calling"], answerIndex: 0 },
      { type: "mcq", question: "Ctrl + S is used to ____.", options: ["save", "open", "print", "close"], answerIndex: 0 },
      { type: "mcq", question: "B button makes text ____.", options: ["bold", "italic", "blue", "big"], answerIndex: 0 },
      { type: "mcq", question: "Where do we type our text?", options: ["Ribbon", "Title bar", "Document area", "Taskbar"], answerIndex: 2 },
      { type: "tf", question: "Word documents can be printed.", answer: true },
      { type: "tf", question: "Ctrl + I is for italic.", answer: true },
      { type: "tf", question: "We cannot change font colour in Word.", answer: false },
      { type: "fill", question: "Ctrl + ______ underlines text.", answer: "U" },
      { type: "fill", question: "MS Word is a ______ processor.", answer: "word" },
      { type: "fill", question: "The coloured tabs in Word are called the ______.", answer: "Ribbon" },
      { type: "short", question: "How do you save a Word file?", modelAnswer: "Click File → Save (or press Ctrl + S)." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "What does Ctrl + B do?", options: ["Bold", "Save", "Print", "Open"], answerIndex: 0 },
      { type: "mcq", question: "Which menu has Print option?", options: ["Home", "File", "View", "Help"], answerIndex: 1 },
      { type: "mcq", question: "Where does the file name appear?", options: ["Title bar", "Ribbon", "Status bar", "Footer"], answerIndex: 0 },
      { type: "mcq", question: "Word file extension is usually ____.", options: [".docx", ".jpg", ".mp3", ".html"], answerIndex: 0 },
      { type: "mcq", question: "The Ribbon has tabs like Home, Insert and ____.", options: ["Layout", "Mouse", "CPU", "RAM"], answerIndex: 0 },
      { type: "mcq", question: "Underline is shown with the letter ____.", options: ["B", "I", "U", "S"], answerIndex: 2 },
      { type: "mcq", question: "Which option starts a new blank document?", options: ["Open", "Save", "New", "Close"], answerIndex: 2 },
      { type: "tf", question: "We can change font size in Word.", answer: true },
      { type: "tf", question: "Word can only be black and white.", answer: false },
      { type: "fill", question: "Ctrl + ______ saves the file.", answer: "S" },
    ],
  },
  lab: {
    type: "word",
    instructions: "Open the Document editor in the Coding Lab to practice typing, bold, italic and saving.",
  },
};
export default content;
