import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Use queries to ask questions of data, forms for friendly entry and reports for polished output.",
    objectives: ["Build a select query with criteria.", "Create a form using the wizard.", "Generate a printable report."],
    duration: "30 min", difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🔎 Queries", body: "Select Query fetches rows that match criteria. Create → Query Design → add table → add fields → set criteria (e.g., >80)." },
      { heading: "📝 Forms", body: "Forms simplify data entry. Create → Form Wizard → choose fields and layout (Columnar, Tabular, Datasheet)." },
      { heading: "📑 Reports", body: "Reports print neat summaries with grouping/sorting. Create → Report Wizard → choose grouping and sort order." },
      { heading: "🧠 Criteria examples", body: "=\"Anu\", >100, Between 10 And 20, Like 'A*', Is Null." },
      { heading: "💡 Tip", body: "Save queries with prefix qry_, forms frm_, reports rpt_ — easier to find." },
    ],
  },
  images: {
    items: [
      { emoji: "🔎", caption: "Query design." }, { emoji: "📝", caption: "Form layout." },
      { emoji: "📑", caption: "Report preview." }, { emoji: "🧠", caption: "Criteria row." },
      { emoji: "🖨️", caption: "Print report." }, { emoji: "🪄", caption: "Wizards." },
    ],
  },
  activities: {
    items: [
      { title: "Top scorers 🔎", steps: ["Query Students table.", "Criteria on Marks: >=80.", "Run."] },
      { title: "Form wizard 📝", steps: ["Pick Students table.", "Columnar layout.", "Add 2 records via the form."] },
      { title: "Report by class 📑", steps: ["Report wizard.", "Group by Class.", "Sort by Name."] },
      { title: "Names starting A 🅰️", steps: ["Query criteria: Like 'A*'.", "Run."] },
      { title: "Range 📊", steps: ["Marks between 50 And 75.", "Run query."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Best for printable summary?", options: ["Form", "Report", "Query", "Table"], answerIndex: 1 },
      { type: "fill", question: "Selecting matching rows uses a ___.", answer: "query" },
      { type: "tf", question: "Forms make data entry easier.", answer: true },
      { type: "mcq", question: "Like 'A*' matches names…", options: ["Containing A", "Starting with A", "Ending with A", "Equal to A"], answerIndex: 1 },
      { type: "fill", question: "Between 10 ___ 20 is valid criteria.", answer: "And" },
      { type: "mcq", question: "Report wizard can…", options: ["Group", "Sort", "Both", "Neither"], answerIndex: 2 },
      { type: "tf", question: "Queries store data themselves.", answer: false },
      { type: "fill", question: "Form prefix used commonly is ___.", answer: "frm_" },
      { type: "mcq", question: "Empty value criterion?", options: ["Is Null", "Empty", "0", "''"], answerIndex: 0 },
      { type: "tf", question: "Reports can include images and totals.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "To find marks >= 90 use criteria…", options: [">90", ">=90", "=90", "<90"], answerIndex: 1 },
      { type: "mcq", question: "Form layouts include…", options: ["Columnar", "Tabular", "Datasheet", "All"], answerIndex: 3 },
      { type: "tf", question: "Reports can group by a field.", answer: true },
      { type: "fill", question: "Like 'B?n' matches 3-letter words starting with B and ending with ___.", answer: "n" },
      { type: "mcq", question: "Run a query with…", options: ["F5", "Run button", "Ctrl+R", "F2"], answerIndex: 1 },
      { type: "mcq", question: "Best to enter many records?", options: ["Form", "Report", "Macro", "Module"], answerIndex: 0 },
      { type: "tf", question: "Reports can be exported to PDF.", answer: true },
      { type: "fill", question: "Save query as ___ + name (convention).", answer: "qry_" },
      { type: "mcq", question: "Multi-table query needs a…", options: ["Macro", "Relationship", "Form", "Module"], answerIndex: 1 },
      { type: "tf", question: "Form data is stored in the underlying table.", answer: true },
    ],
  },
};
export default content;
