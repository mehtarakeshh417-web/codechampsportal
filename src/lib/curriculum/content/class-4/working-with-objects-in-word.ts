import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Word lets us add pictures, shapes, WordArt, tables and SmartArt to make documents more interesting.",
    objectives: [
      "Insert and resize a picture.",
      "Add shapes and WordArt.",
      "Insert a small table and type into it.",
    ],
    duration: "30 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🖼️ Insert Picture", body: "Insert tab → Pictures → choose from your computer or online. Drag the corners to resize." },
      { heading: "🔷 Shapes", body: "Insert tab → Shapes → pick a circle, arrow, star, etc. Click and drag on the page." },
      { heading: "✨ WordArt", body: "Decorative text styles. Insert tab → WordArt → pick a style → type your words." },
      { heading: "📊 Tables", body: "Insert tab → Table → pick rows and columns. Click in any cell to type." },
      { heading: "🧠 SmartArt", body: "Pre-made diagrams like cycle, list, hierarchy. Insert tab → SmartArt." },
      { heading: "💡 Tip", body: "Click an object once to select, twice to edit, drag handles to resize." },
    ],
  },
  images: {
    items: [
      { emoji: "🖼️", caption: "Insert a picture." },
      { emoji: "🔷", caption: "Insert shapes." },
      { emoji: "✨", caption: "WordArt — fancy text." },
      { emoji: "📊", caption: "Table with rows & columns." },
      { emoji: "🧠", caption: "SmartArt diagrams." },
      { emoji: "🔲", caption: "Drag corner handles to resize." },
    ],
  },
  activities: {
    items: [
      { title: "Picture poster 🎨", steps: ["Insert any picture.", "Resize and centre it.", "Add a caption below."] },
      { title: "Star shapes ⭐", steps: ["Insert 5 stars of different sizes.", "Fill each with a different colour."] },
      { title: "WordArt name ✨", steps: ["Add WordArt with your name.", "Change the colour and shape."] },
      { title: "Class table 📋", steps: ["Insert a 2x4 table.", "Add Name and Age of 3 friends."] },
      { title: "Cycle SmartArt 🔄", steps: ["Insert a Cycle SmartArt.", "Type 4 stages of water (rain → river → sea → cloud)."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Pictures are inserted from the ____ tab.", options: ["Home", "Insert", "View", "File"], answerIndex: 1 },
      { type: "mcq", question: "Decorative text in Word is called ____.", options: ["WordArt", "Bold", "Italic", "ClipArt"], answerIndex: 0 },
      { type: "mcq", question: "A 3x4 table has ____ rows and ____ columns.", options: ["3, 4", "4, 3", "12, 12", "7, 7"], answerIndex: 0 },
      { type: "mcq", question: "Which one shows pre-made diagrams?", options: ["Shapes", "WordArt", "SmartArt", "Tables"], answerIndex: 2 },
      { type: "tf", question: "We can resize a picture in Word.", answer: true },
      { type: "tf", question: "Tables cannot have colour in Word.", answer: false },
      { type: "tf", question: "We can rotate shapes in Word.", answer: true },
      { type: "fill", question: "Insert > ______ adds a circle or arrow.", answer: "Shapes" },
      { type: "fill", question: "Cells in a table are arranged in rows and ______.", answer: "columns" },
      { type: "fill", question: "______ Art shows fancy text.", answer: "Word" },
      { type: "short", question: "How will you insert a 2x3 table?", modelAnswer: "Insert tab → Table → drag to highlight 2 rows and 3 columns." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which is NOT inserted in Word?", options: ["Picture", "Shape", "Table", "Operating system"], answerIndex: 3 },
      { type: "mcq", question: "WordArt is found under ____.", options: ["Home", "Insert", "View", "File"], answerIndex: 1 },
      { type: "mcq", question: "A box in a table is called a ____.", options: ["row", "column", "cell", "tab"], answerIndex: 2 },
      { type: "mcq", question: "Cycle, Hierarchy, List are ____ types.", options: ["WordArt", "SmartArt", "Shapes", "Pictures"], answerIndex: 1 },
      { type: "mcq", question: "Resize handles are at the ____ of an object.", options: ["centre", "corners and edges", "top only", "right only"], answerIndex: 1 },
      { type: "mcq", question: "Which is NOT a shape?", options: ["Star", "Arrow", "Heart", "Page"], answerIndex: 3 },
      { type: "mcq", question: "We can type inside ____.", options: ["pictures", "shapes", "tables", "all of these"], answerIndex: 3 },
      { type: "tf", question: "WordArt can be used as a heading.", answer: true },
      { type: "tf", question: "SmartArt is only black and white.", answer: false },
      { type: "fill", question: "Insert > ______ adds a row-column grid.", answer: "Table" },
    ],
  },
  lab: { type: "word", instructions: "Open the Document editor in the Coding Lab. Try inserting a table, picture and WordArt." },
};
export default content;
