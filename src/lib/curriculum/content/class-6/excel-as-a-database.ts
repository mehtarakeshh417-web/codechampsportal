import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Treat an Excel sheet like a database — sort, filter, validate and look up records quickly.",
    objectives: [
      "Sort and filter data lists.",
      "Apply data validation.",
      "Use VLOOKUP for lookups.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🗃️ Database Vibes", body: "Each row = one record, each column = one field. The first row should be headers." },
      { heading: "🔼 Sort", body: "Data → Sort. Choose column and order (A-Z or Z-A)." },
      { heading: "🪣 Filter", body: "Data → Filter adds drop-downs in headers. Show only what you need (e.g., Class = 6)." },
      { heading: "✅ Data Validation", body: "Data → Data Validation. Restrict input — e.g., only numbers 0-100, or pick from a list." },
      { heading: "🔎 VLOOKUP", body: "=VLOOKUP(lookup, range, col_index, FALSE). Example: find a student's marks from their roll number." },
    ],
  },
  images: {
    items: [
      { emoji: "🗃️", caption: "Records & fields." },
      { emoji: "🔼", caption: "Sort A→Z." },
      { emoji: "🪣", caption: "Filter dropdowns." },
      { emoji: "✅", caption: "Data validation." },
      { emoji: "🔎", caption: "VLOOKUP magic." },
      { emoji: "📋", caption: "Headers row." },
    ],
  },
  activities: {
    items: [
      { title: "Sort marks 🔼", steps: ["Make a marks table.", "Data → Sort by Marks Z→A.", "Save."] },
      { title: "Filter Class 6 🪣", steps: ["Data → Filter.", "Click Class header → tick only 6."] },
      { title: "Validate marks ✅", steps: ["Select B2:B20.", "Data → Validation → Whole, between 0-100."] },
      { title: "VLOOKUP demo 🔎", steps: ["Roll in F1.", "=VLOOKUP(F1,A2:C20,3,FALSE).", "Type any roll → marks appear."] },
      { title: "Drop-down list 📋", steps: ["Data Validation → List.", "Source: A,B,C,D,F.", "Pick a grade from drop-down."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "A row in a database is a…", options: ["Field", "Record", "Cell", "Header"], answerIndex: 1 },
      { type: "fill", question: "Filter is in the ___ tab.", answer: "Data" },
      { type: "tf", question: "Sort can be A-Z or Z-A.", answer: true },
      { type: "mcq", question: "VLOOKUP last argument FALSE means…", options: ["Approximate", "Exact match", "No match", "Column index"], answerIndex: 1 },
      { type: "fill", question: "First row of a table should be ___.", answer: "headers" },
      { type: "mcq", question: "Data Validation can…", options: ["Sort data", "Restrict input", "Print", "Format"], answerIndex: 1 },
      { type: "tf", question: "Filter hides rows that don't match.", answer: true },
      { type: "fill", question: "VLOOKUP looks ___.", answer: "vertically" },
      { type: "mcq", question: "Drop-down list is created via…", options: ["Sort", "Filter", "Data Validation", "Print"], answerIndex: 2 },
      { type: "tf", question: "Sorting changes only the active cell.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Each column in a table is a…", options: ["Record", "Field", "Cell", "Sheet"], answerIndex: 1 },
      { type: "mcq", question: "Best to find marks for a roll no?", options: ["IF", "VLOOKUP", "SUM", "AVERAGE"], answerIndex: 1 },
      { type: "tf", question: "VLOOKUP needs the lookup column on the LEFT.", answer: true },
      { type: "fill", question: "Restrict cell input via ___ ___.", answer: "data validation" },
      { type: "mcq", question: "Filter dropdown appears in…", options: ["Header row", "Last row", "Footer", "Title bar"], answerIndex: 0 },
      { type: "mcq", question: "Sort by multiple columns is…", options: ["Impossible", "Possible (Sort dialog)", "Use Filter", "Use IF"], answerIndex: 1 },
      { type: "tf", question: "VLOOKUP returns column to the LEFT of lookup.", answer: false },
      { type: "fill", question: "Data → Filter adds ___ to headers.", answer: "dropdowns" },
      { type: "mcq", question: "List validation source is a…", options: ["Range or comma list", "Single cell", "Function", "Color"], answerIndex: 0 },
      { type: "tf", question: "Sorted data prints exactly as displayed.", answer: true },
    ],
  },
  lab: { type: "sheets", instructions: "Build a student database. Sort by marks, filter by class, add validation 0-100, and a VLOOKUP." },
};
export default content;
