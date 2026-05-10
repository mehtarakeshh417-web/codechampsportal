import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Lists organize items vertically; tables organize data into rows and columns. Learn HTML tags for both.",
    objectives: [
      "Use <ul>, <ol>, <li> and <dl>.",
      "Build tables with <table>, <tr>, <td>, <th>.",
      "Merge cells with rowspan/colspan.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "📋 Lists", body: "Three list types:", bullets: [
        "<ul> — unordered (bullets)",
        "<ol> — ordered (numbers; type=\"A\" or type=\"i\" for letters/Roman)",
        "<dl><dt><dd> — description list",
      ] },
      { heading: "🧮 Tables", body: "<table> contains <tr> rows. Inside rows: <th> for headers, <td> for cells." },
      { heading: "↔️ Spans", body: "colspan=\"2\" merges across columns; rowspan=\"2\" merges down rows." },
      { heading: "🎨 Style", body: "Use border, padding, background-color in CSS for nice tables." },
      { heading: "💡 Best practice", body: "Use tables only for tabular data, NOT for page layout." },
    ],
  },
  images: {
    items: [
      { emoji: "📋", caption: "Bullet list." },
      { emoji: "🔢", caption: "Numbered list." },
      { emoji: "🧮", caption: "Table grid." },
      { emoji: "↔️", caption: "colspan." },
      { emoji: "↕️", caption: "rowspan." },
      { emoji: "🎨", caption: "Styled table." },
    ],
  },
  activities: {
    items: [
      { title: "Hobbies list 📋", steps: ["Make <ul> with 5 hobbies.", "Then change to <ol>."] },
      { title: "Glossary 📘", steps: ["Use <dl><dt>HTML</dt><dd>HyperText…</dd></dl>.", "Add 3 terms."] },
      { title: "Marks table 🧮", steps: ["3×4 table.", "Header row with <th>.", "Add border:1 in CSS."] },
      { title: "Merge cells ↔️", steps: ["Use colspan='3' for a header.", "Use rowspan='2' for a name column."] },
      { title: "Style with CSS 🎨", steps: ["table { border-collapse:collapse; }", "td,th { padding:6px; border:1px solid #999; }"] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Bullet list tag is…", options: ["<ol>", "<ul>", "<li>", "<dl>"], answerIndex: 1 },
      { type: "fill", question: "Numbered list uses ___.", answer: "ol" },
      { type: "tf", question: "<dl> is a description list.", answer: true },
      { type: "mcq", question: "Header cell tag is…", options: ["<td>", "<th>", "<tr>", "<table>"], answerIndex: 1 },
      { type: "fill", question: "Row tag is ___.", answer: "tr" },
      { type: "mcq", question: "Merge across columns?", options: ["rowspan", "colspan", "merge", "wide"], answerIndex: 1 },
      { type: "tf", question: "Tables are best used for page layout.", answer: false },
      { type: "fill", question: "Cell padding is set with the ___ property.", answer: "padding" },
      { type: "mcq", question: "<li> belongs inside…", options: ["<table>", "<ul> or <ol>", "<dl>", "<form>"], answerIndex: 1 },
      { type: "tf", question: "<th> is bold and centered by default.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Roman numerals on ordered list?", options: ["type='A'", "type='i'", "type='1'", "type='disc'"], answerIndex: 1 },
      { type: "mcq", question: "Cell tag is…", options: ["<td>", "<tc>", "<cell>", "<tr>"], answerIndex: 0 },
      { type: "tf", question: "rowspan merges cells vertically.", answer: true },
      { type: "fill", question: "Definition term tag inside <dl> is ___.", answer: "dt" },
      { type: "mcq", question: "border-collapse: collapse joins…", options: ["Cells", "Borders", "Rows", "Headers"], answerIndex: 1 },
      { type: "mcq", question: "Inside <table> rows go in…", options: ["<tr>", "<tc>", "<td>", "<dl>"], answerIndex: 0 },
      { type: "tf", question: "<ul> shows bullets by default.", answer: true },
      { type: "fill", question: "Merge cells across cols: ___='2'.", answer: "colspan" },
      { type: "mcq", question: "Description data tag is…", options: ["<dd>", "<dt>", "<dl>", "<def>"], answerIndex: 0 },
      { type: "tf", question: "<th> can use colspan.", answer: true },
    ],
  },
  lab: { type: "html", instructions: "Build a marks page using a styled table with header row and rowspan/colspan." },
};
export default content;
