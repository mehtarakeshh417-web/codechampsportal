import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Microsoft Excel is a spreadsheet program. Workbooks contain sheets, sheets contain cells. Each cell has an address like A1.",
    objectives: [
      "Identify workbook, worksheet, row, column and cell.",
      "Enter and edit data in a cell.",
      "Save and open a workbook.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "📊 What is Excel?", body: "Excel arranges data in a grid of rows (1, 2, 3…) and columns (A, B, C…). The crossing point is a cell." },
      { heading: "🏷️ Cell Address", body: "A cell is named by Column + Row, e.g., B5 means column B, row 5." },
      { heading: "📁 Workbook vs Worksheet", body: "A Workbook is the whole Excel file. It can hold many Worksheets (tabs at the bottom)." },
      { heading: "✏️ Entering Data", body: "Click a cell, type, press Enter (down) or Tab (right). Edit by double-clicking or using F2." },
      { heading: "💾 Save", body: "File → Save As. Excel files end in .xlsx." },
    ],
  },
  images: {
    items: [
      { emoji: "📊", caption: "Spreadsheet grid." },
      { emoji: "🔠", caption: "Columns are letters." },
      { emoji: "🔢", caption: "Rows are numbers." },
      { emoji: "🎯", caption: "Cell address e.g., B5." },
      { emoji: "📁", caption: "Workbook with sheets." },
      { emoji: "💾", caption: "Save as .xlsx." },
    ],
  },
  activities: {
    items: [
      { title: "First Workbook 📊", steps: ["Open Excel.", "Type your name in A1.", "Type your class in A2.", "Save as 'me.xlsx'."] },
      { title: "Marks Table 🧮", steps: ["Type subjects in A1:A5.", "Type marks in B1:B5.", "Format header row bold."] },
      { title: "Rename Sheet 🏷️", steps: ["Right-click Sheet1 tab.", "Rename to 'Marks'.", "Add a new sheet."] },
      { title: "Cell Hunt 🎯", steps: ["Find what's in cell C3.", "Type a value in D7.", "Press Ctrl+G and jump to A50."] },
      { title: "Auto Fill 🪄", steps: ["Type Mon in A1.", "Drag fill handle down 6 cells.", "See days appear."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "An Excel file is called a…", options: ["Workbook", "Slide", "Document", "Database"], answerIndex: 0 },
      { type: "fill", question: "Crossing of a row and column is a ___.", answer: "cell" },
      { type: "tf", question: "Columns are labelled with numbers.", answer: false },
      { type: "mcq", question: "Cell B5 means…", options: ["Row B, Col 5", "Col B, Row 5", "Sheet B5", "File B5"], answerIndex: 1 },
      { type: "fill", question: "Excel files end with extension ___.", answer: ".xlsx" },
      { type: "mcq", question: "Press ___ to move down after entering data.", options: ["Tab", "Enter", "Esc", "Shift"], answerIndex: 1 },
      { type: "tf", question: "A workbook can hold many worksheets.", answer: true },
      { type: "fill", question: "Edit a cell by pressing ___.", answer: "F2" },
      { type: "mcq", question: "Tab key moves the cursor…", options: ["Up", "Down", "Right", "Left"], answerIndex: 2 },
      { type: "tf", question: "Excel is made by Microsoft.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Rows are labelled with…", options: ["Letters", "Numbers", "Symbols", "Colours"], answerIndex: 1 },
      { type: "mcq", question: "What does C7 refer to?", options: ["Col C, Row 7", "Row C, Col 7", "Sheet C7", "Cell 37"], answerIndex: 0 },
      { type: "tf", question: "Worksheets are tabs at the bottom.", answer: true },
      { type: "fill", question: "Excel arranges data in a ___.", answer: "grid" },
      { type: "mcq", question: "To save a new file use…", options: ["Save As", "Print", "Cut", "Copy"], answerIndex: 0 },
      { type: "mcq", question: "Auto Fill uses the…", options: ["Fill handle", "Print button", "Format painter", "Filter"], answerIndex: 0 },
      { type: "tf", question: ".docx is the Excel extension.", answer: false },
      { type: "fill", question: "F2 lets you ___ a cell.", answer: "edit" },
      { type: "mcq", question: "Worksheet tabs let you…", options: ["Switch sheets", "Print", "Save file", "Bold text"], answerIndex: 0 },
      { type: "tf", question: "Excel is great for calculations.", answer: true },
    ],
  },
  lab: { type: "sheets", instructions: "Create a marks sheet with subjects in column A and marks in column B." },
};
export default content;
