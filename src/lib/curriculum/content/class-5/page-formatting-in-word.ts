import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Learn to set page size, orientation, margins, headers, footers and page numbers to make documents look professional.",
    objectives: [
      "Adjust margins, orientation and page size.",
      "Add headers, footers and page numbers.",
      "Insert page breaks and watermarks.",
    ],
    duration: "30 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "📐 Page Setup", body: "Layout tab → Page Setup group lets you set:", bullets: [
        "Margins — Normal, Narrow, Wide, Custom",
        "Orientation — Portrait or Landscape",
        "Size — A4, Letter, Legal",
      ] },
      { heading: "📑 Headers & Footers", body: "Insert tab → Header / Footer. Repeats text on every page. Useful for title, author or chapter name." },
      { heading: "🔢 Page Numbers", body: "Insert → Page Number → choose Top/Bottom and a style." },
      { heading: "✂️ Page Break", body: "Press Ctrl+Enter to start a new page anywhere in the document." },
      { heading: "💧 Watermark", body: "Design tab → Watermark. Adds a faded image/text behind content (e.g., DRAFT)." },
      { heading: "💡 Tip", body: "Always Print Preview (Ctrl+P) before printing!" },
    ],
  },
  images: {
    items: [
      { emoji: "📄", caption: "Portrait orientation." },
      { emoji: "🖼️", caption: "Landscape orientation." },
      { emoji: "🔢", caption: "Page numbers." },
      { emoji: "📑", caption: "Header bar at top." },
      { emoji: "💧", caption: "Watermark behind text." },
      { emoji: "🖨️", caption: "Print preview." },
    ],
  },
  activities: {
    items: [
      { title: "Make a Magazine Page 📰", steps: ["Set orientation Landscape.", "Margins: Narrow.", "Add header 'My Magazine'.", "Add page number bottom-right."] },
      { title: "Add a Watermark 💧", steps: ["Open a draft document.", "Design → Watermark → DRAFT.", "Print preview."] },
      { title: "Two-page Story 📖", steps: ["Type a story.", "Insert page break midway (Ctrl+Enter).", "Add page numbers."] },
      { title: "Custom Margins 📐", steps: ["Layout → Margins → Custom.", "Set top/bottom 1\".", "Set left/right 1.25\"."] },
      { title: "Footer with Date 📅", steps: ["Insert footer.", "Add automatic date field.", "Save and print preview."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Landscape page is…", options: ["Tall", "Wide", "Square", "Round"], answerIndex: 1 },
      { type: "fill", question: "Headers appear at the ___ of every page.", answer: "top" },
      { type: "tf", question: "Footer is at the bottom of the page.", answer: true },
      { type: "mcq", question: "Default page size in India is usually…", options: ["A4", "Letter", "Legal", "A3"], answerIndex: 0 },
      { type: "fill", question: "Press Ctrl + ___ for a page break.", answer: "Enter" },
      { type: "mcq", question: "A faded background image/text is called…", options: ["Border", "Watermark", "Header", "Footer"], answerIndex: 1 },
      { type: "tf", question: "Margins are the white space around text.", answer: true },
      { type: "fill", question: "Print preview shortcut is Ctrl + ___.", answer: "P" },
      { type: "mcq", question: "Page numbers are added from…", options: ["Home tab", "Insert tab", "View tab", "File tab"], answerIndex: 1 },
      { type: "tf", question: "Portrait is wider than tall.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Which tab has Margins option?", options: ["Home", "Layout", "View", "References"], answerIndex: 1 },
      { type: "mcq", question: "DRAFT in faded text is a…", options: ["Footer", "Header", "Watermark", "Border"], answerIndex: 2 },
      { type: "tf", question: "Page break starts a new page.", answer: true },
      { type: "fill", question: "Wide-style page is called ___.", answer: "Landscape" },
      { type: "mcq", question: "Header repeats on…", options: ["Only first page", "Every page", "No page", "Last page"], answerIndex: 1 },
      { type: "mcq", question: "Margins Narrow makes…", options: ["More text per page", "Less text", "Bold text", "Italic text"], answerIndex: 0 },
      { type: "tf", question: "Footer can show page numbers.", answer: true },
      { type: "fill", question: "Insert → ___ → Bottom of Page adds numbers.", answer: "Page Number" },
      { type: "mcq", question: "Portrait orientation is…", options: ["Wider", "Taller", "Square", "Round"], answerIndex: 1 },
      { type: "tf", question: "A4 and Letter are the same size.", answer: false },
    ],
  },
  lab: { type: "word", instructions: "Create a 2-page document with custom margins, header, footer and a watermark." },
};
export default content;
