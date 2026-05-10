import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Move beyond SUM and AVERAGE. Use IF, COUNTIF, ROUND and date functions to make Excel work hard for you.",
    objectives: [
      "Use IF for decisions.",
      "Use COUNTIF and SUMIF for filtered totals.",
      "Round numbers and use NOW/TODAY.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "❓ IF Function", body: "=IF(test, value_if_true, value_if_false). Example: =IF(A1>=35, \"Pass\", \"Fail\")" },
      { heading: "🔢 COUNTIF / SUMIF", body: "Count or add only when a condition is true.", bullets: [
        "=COUNTIF(B2:B10, \">90\")",
        "=SUMIF(A2:A10, \"Apple\", B2:B10)",
      ] },
      { heading: "📐 ROUND, INT, MOD", body: "=ROUND(3.456, 2) → 3.46, =INT(7.9) → 7, =MOD(10,3) → 1" },
      { heading: "📅 Date Functions", body: "=TODAY() — current date, =NOW() — date & time, =YEAR(A1)" },
      { heading: "🔗 Concatenate", body: "=A1 & \" \" & B1 — joins first name and last name with a space." },
    ],
  },
  images: {
    items: [
      { emoji: "❓", caption: "IF logic." },
      { emoji: "🧮", caption: "COUNTIF examples." },
      { emoji: "📐", caption: "ROUND & INT." },
      { emoji: "📅", caption: "TODAY()." },
      { emoji: "🔗", caption: "Concatenate names." },
      { emoji: "📊", caption: "Smart spreadsheet." },
    ],
  },
  activities: {
    items: [
      { title: "Pass/Fail ❓", steps: ["Type marks in B2:B6.", "In C2: =IF(B2>=35,\"Pass\",\"Fail\").", "Drag down."] },
      { title: "Top scorers 🏆", steps: ["In D1: =COUNTIF(B2:B6,\">90\")."] },
      { title: "Sales by item 🛒", steps: ["Type items A2:A10, sales B2:B10.", "=SUMIF(A2:A10,\"Apple\",B2:B10)."] },
      { title: "Round it 📐", steps: ["Type 12.6789 in A1.", "In B1: =ROUND(A1,2)."] },
      { title: "Today's date 📅", steps: ["In any cell: =TODAY().", "Press F9 to refresh."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "IF returns…", options: ["One value always", "True or false branch", "Sum of cells", "Date"], answerIndex: 1 },
      { type: "fill", question: "=COUNTIF(B2:B6,\">50\") counts cells with value greater than ___.", answer: "50" },
      { type: "tf", question: "TODAY() shows current date.", answer: true },
      { type: "mcq", question: "ROUND(3.46,1) = ?", options: ["3", "3.4", "3.5", "3.46"], answerIndex: 2 },
      { type: "fill", question: "Concatenate uses the ___ symbol.", answer: "&" },
      { type: "mcq", question: "MOD(10,3) = ?", options: ["3", "1", "0", "10"], answerIndex: 1 },
      { type: "tf", question: "SUMIF adds only matching rows.", answer: true },
      { type: "fill", question: "INT(7.9) = ___.", answer: "7" },
      { type: "mcq", question: "NOW() shows…", options: ["Date", "Time", "Date & Time", "Year"], answerIndex: 2 },
      { type: "tf", question: "IF can be nested inside another IF.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "=IF(5>3,\"Yes\",\"No\") = ?", options: ["Yes", "No", "5", "3"], answerIndex: 0 },
      { type: "mcq", question: "Which counts cells matching condition?", options: ["SUM", "COUNTIF", "AVERAGE", "MAX"], answerIndex: 1 },
      { type: "tf", question: "ROUND can round to decimals.", answer: true },
      { type: "fill", question: "=YEAR(\"2025-05-10\") returns ___.", answer: "2025" },
      { type: "mcq", question: "Which function joins text?", options: ["JOIN", "CONCAT / &", "MERGE", "ADD"], answerIndex: 1 },
      { type: "mcq", question: "=SUMIF(A:A,\"Pen\",B:B) sums B where A is…", options: ["Any", "Pen", "Pencil", "Empty"], answerIndex: 1 },
      { type: "tf", question: "TODAY() updates daily.", answer: true },
      { type: "fill", question: "=MOD(20,6) = ___.", answer: "2" },
      { type: "mcq", question: "INT removes the…", options: ["Sign", "Decimal", "Whole part", "Cell"], answerIndex: 1 },
      { type: "tf", question: "IF can return text or numbers.", answer: true },
    ],
  },
  lab: { type: "sheets", instructions: "Build a marks sheet with IF (Pass/Fail), COUNTIF (above 90) and ROUND for averages." },
};
export default content;
