import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "MS Access is a desktop database system. Learn its objects, create a table and add records.",
    objectives: ["Open Access and create a database.", "Design a table with fields and data types.", "Enter records and set a primary key."],
    duration: "30 min", difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🗄️ What is Access?", body: "Microsoft Access is a Relational Database Management System (RDBMS). Files have .accdb extension." },
      { heading: "📦 Database Objects", body: "Six main objects:", bullets: ["Tables — store data", "Queries — fetch data", "Forms — easy data entry", "Reports — printed summary", "Macros — automate tasks", "Modules — VBA code"] },
      { heading: "🧱 Designing a Table", body: "Switch to Design View. Set Field Name, Data Type (Short Text, Number, Date/Time, Yes/No, Currency)." },
      { heading: "🔑 Primary Key", body: "A field that uniquely identifies each record (e.g., RollNo). Click the key icon to set it." },
      { heading: "💾 Save", body: "Save the table with a name (e.g., Students). Switch to Datasheet View to add records." },
    ],
  },
  images: {
    items: [
      { emoji: "🗄️", caption: "Access logo." }, { emoji: "🧱", caption: "Design view." },
      { emoji: "🔑", caption: "Primary key." }, { emoji: "📋", caption: "Datasheet view." },
      { emoji: "📦", caption: "Database objects." }, { emoji: "📝", caption: "Add records." },
    ],
  },
  activities: {
    items: [
      { title: "First DB 🗄️", steps: ["Open Access.", "Blank database → name 'School'."] },
      { title: "Students table 🧱", steps: ["Design view.", "Fields: RollNo (Number), Name (Short Text), DOB (Date), Marks (Number)."] },
      { title: "Set primary key 🔑", steps: ["Click RollNo row → Primary Key icon."] },
      { title: "Add 5 records 📝", steps: ["Switch to Datasheet view.", "Add 5 students."] },
      { title: "Sort & filter 🔼", steps: ["Sort by Marks descending.", "Filter where Marks ≥ 80."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Access stores files with extension…", options: [".accdb", ".xlsx", ".docx", ".pptx"], answerIndex: 0 },
      { type: "fill", question: "RDBMS = Relational ___ Management System.", answer: "Database" },
      { type: "tf", question: "Tables store the actual data.", answer: true },
      { type: "mcq", question: "Unique field in a table is the…", options: ["Foreign key", "Primary key", "Index", "Sort"], answerIndex: 1 },
      { type: "fill", question: "Easy data entry is done with ___.", answer: "Forms" },
      { type: "mcq", question: "Date data type stores…", options: ["Numbers", "Text", "Dates", "Photos"], answerIndex: 2 },
      { type: "tf", question: "Reports are for printing summaries.", answer: true },
      { type: "fill", question: "Switch from Datasheet to ___ view to set field types.", answer: "Design" },
      { type: "mcq", question: "Yes/No type is similar to…", options: ["String", "Boolean", "Date", "Number"], answerIndex: 1 },
      { type: "tf", question: "Macros automate repeating tasks.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Which is NOT an Access object?", options: ["Form", "Query", "Slide", "Report"], answerIndex: 2 },
      { type: "mcq", question: "Primary key must be…", options: ["Empty", "Unique", "Repeated", "Calculated"], answerIndex: 1 },
      { type: "tf", question: "Queries fetch data from tables.", answer: true },
      { type: "fill", question: "Access is made by ___.", answer: "Microsoft" },
      { type: "mcq", question: "Best type for phone number?", options: ["Number", "Short Text", "Date", "Currency"], answerIndex: 1 },
      { type: "mcq", question: "Save a table with…", options: ["Ctrl+P", "Ctrl+S", "Ctrl+N", "Ctrl+O"], answerIndex: 1 },
      { type: "tf", question: "A database can have many tables.", answer: true },
      { type: "fill", question: "Datasheet view shows the table as a ___.", answer: "grid" },
      { type: "mcq", question: "Currency type adds a…", options: ["Symbol", "Picture", "Border", "Index"], answerIndex: 0 },
      { type: "tf", question: "Forms also store data themselves.", answer: false },
    ],
  },
};
export default content;
