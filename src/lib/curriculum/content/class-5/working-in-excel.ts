import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Use formulas and basic functions in Excel to add, average, find max/min and count cells.",
    objectives: [
      "Write formulas that begin with =.",
      "Use SUM, AVERAGE, MAX, MIN, COUNT.",
      "Copy formulas with the fill handle.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🧮 Formulas", body: "Every formula starts with =. Operators: + - * / ^.", bullets: [
        "=2+3 → 5", "=A1*B1 → multiplies cells", "=(A1+B1)/2 → average of two",
      ] },
      { heading: "⚡ Functions", body: "Built-in shortcuts:", bullets: [
        "=SUM(A1:A5) — total", "=AVERAGE(A1:A5) — mean",
        "=MAX(A1:A5) / =MIN(A1:A5) — biggest / smallest",
        "=COUNT(A1:A5) — count of numbers",
      ] },
      { heading: "🪄 Fill Handle", body: "Drag the small square at a cell's bottom-right to copy a formula across rows or columns." },
      { heading: "🔒 References", body: "A1 changes when copied (relative). $A$1 stays fixed (absolute)." },
      { heading: "💡 Tip", body: "Press Alt+= to AutoSum a column instantly!" },
    ],
  },
  images: {
    items: [
      { emoji: "➕", caption: "SUM function." },
      { emoji: "📏", caption: "AVERAGE." },
      { emoji: "⬆️", caption: "MAX." },
      { emoji: "⬇️", caption: "MIN." },
      { emoji: "🔢", caption: "COUNT." },
      { emoji: "🪄", caption: "Fill handle drag." },
    ],
  },
  activities: {
    items: [
      { title: "Total Marks ➕", steps: ["Type marks in B2:B6.", "In B7 type =SUM(B2:B6).", "Press Enter."] },
      { title: "Average Score 📏", steps: ["In B8 type =AVERAGE(B2:B6).", "Format to 1 decimal."] },
      { title: "Top Scorer ⬆️", steps: ["In B9 type =MAX(B2:B6).", "Highlight cell yellow."] },
      { title: "AutoSum ⚡", steps: ["Click B10.", "Press Alt + =.", "Press Enter."] },
      { title: "Fill across 🪄", steps: ["Make =SUM(B2:B6) in B7.", "Drag fill handle to C7, D7.", "Watch references update."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "A formula always begins with…", options: ["=", "+", "$", "#"], answerIndex: 0 },
      { type: "fill", question: "=SUM(A1:A5) gives the ___.", answer: "total" },
      { type: "tf", question: "AVERAGE returns the largest value.", answer: false },
      { type: "mcq", question: "MAX(2,8,5) = ?", options: ["2", "5", "8", "15"], answerIndex: 2 },
      { type: "fill", question: "MIN(4,9,2) = ___.", answer: "2" },
      { type: "mcq", question: "Operator for multiply is…", options: ["x", "*", "•", "·"], answerIndex: 1 },
      { type: "tf", question: "Fill handle copies a formula across cells.", answer: true },
      { type: "fill", question: "Absolute reference uses the ___ sign.", answer: "$" },
      { type: "mcq", question: "AutoSum shortcut is…", options: ["Alt+=", "Ctrl+S", "Ctrl+A", "Shift+="], answerIndex: 0 },
      { type: "tf", question: "COUNT counts text cells.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "=AVERAGE(2,4,6) = ?", options: ["3", "4", "6", "12"], answerIndex: 1 },
      { type: "mcq", question: "Which is a function?", options: ["SUM", "PLUS", "ADD", "TOTAL"], answerIndex: 0 },
      { type: "tf", question: "Formulas can include cell references.", answer: true },
      { type: "fill", question: "=MAX(A1:A5) finds the ___.", answer: "largest" },
      { type: "mcq", question: "$A$1 is an example of…", options: ["Relative ref", "Absolute ref", "Mixed ref", "Range"], answerIndex: 1 },
      { type: "mcq", question: "=SUM(1,2,3) = ?", options: ["3", "6", "9", "1"], answerIndex: 1 },
      { type: "tf", question: "MIN returns the smallest number.", answer: true },
      { type: "fill", question: "Drag the small box at a cell corner — that's the ___ ___.", answer: "fill handle" },
      { type: "mcq", question: "COUNT(A1:A10) counts cells with…", options: ["Numbers", "Text", "Empty", "Colors"], answerIndex: 0 },
      { type: "tf", question: "Pressing Alt+= inserts AutoSum.", answer: true },
    ],
  },
  lab: { type: "sheets", instructions: "In a marks sheet, use SUM, AVERAGE, MAX, MIN to compute total/average/highest/lowest." },
};
export default content;
