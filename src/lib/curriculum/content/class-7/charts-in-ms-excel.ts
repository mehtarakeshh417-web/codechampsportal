import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Charts turn numbers into pictures. Learn the main chart types in Excel and when to use each.",
    objectives: [
      "Insert column, bar, line and pie charts.",
      "Format chart elements (title, legend, labels).",
      "Choose the right chart for the data.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "📊 Why Charts?", body: "Pictures reveal patterns and trends faster than columns of numbers." },
      { heading: "🎨 Common Chart Types", body: "Pick by purpose:", bullets: [
        "Column / Bar — compare categories",
        "Line — show trend over time",
        "Pie / Doughnut — parts of a whole",
        "Scatter — relationship between two variables",
        "Area — cumulative trend",
      ] },
      { heading: "🛠️ Insert", body: "Select data → Insert → Recommended Charts." },
      { heading: "🖋️ Format", body: "Click chart → Chart Design / Format. Add title, axis titles, data labels, change style." },
      { heading: "💡 Tip", body: "Use Pie only when categories add up to a whole." },
    ],
  },
  images: {
    items: [
      { emoji: "📊", caption: "Column chart." },
      { emoji: "📈", caption: "Line chart." },
      { emoji: "🥧", caption: "Pie chart." },
      { emoji: "🍩", caption: "Doughnut chart." },
      { emoji: "🟪", caption: "Bar chart." },
      { emoji: "🔵", caption: "Scatter chart." },
    ],
  },
  activities: {
    items: [
      { title: "Class marks chart 📊", steps: ["Type 5 students + marks.", "Insert → Column chart."] },
      { title: "Trend over months 📈", steps: ["Type Jan-Jun + sales.", "Insert → Line."] },
      { title: "Budget pie 🥧", steps: ["Categories + spending.", "Insert → Pie."] },
      { title: "Style it 🖋️", steps: ["Add chart title.", "Add data labels.", "Change colour scheme."] },
      { title: "Best chart? 🤔", steps: ["For 'population over years' → choose chart.", "Justify."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Best for trend over time?", options: ["Pie", "Line", "Bar", "Doughnut"], answerIndex: 1 },
      { type: "fill", question: "Charts are inserted from the ___ tab.", answer: "Insert" },
      { type: "tf", question: "Pie shows parts of a whole.", answer: true },
      { type: "mcq", question: "Compare items easily?", options: ["Column", "Pie", "Scatter", "Area"], answerIndex: 0 },
      { type: "fill", question: "Bar chart bars are ___.", answer: "horizontal" },
      { type: "mcq", question: "Two-variable relationship?", options: ["Pie", "Scatter", "Doughnut", "Bar"], answerIndex: 1 },
      { type: "tf", question: "Legend explains the colors.", answer: true },
      { type: "fill", question: "Title text appears at the ___ of chart.", answer: "top" },
      { type: "mcq", question: "Doughnut is similar to…", options: ["Bar", "Pie", "Line", "Scatter"], answerIndex: 1 },
      { type: "tf", question: "Charts cannot be edited after insert.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Daily temperature → use…", options: ["Pie", "Line", "Doughnut", "Bar"], answerIndex: 1 },
      { type: "mcq", question: "Survey results % → use…", options: ["Line", "Scatter", "Pie", "Area"], answerIndex: 2 },
      { type: "tf", question: "Column chart bars are vertical.", answer: true },
      { type: "fill", question: "Insert → Recommended ___.", answer: "Charts" },
      { type: "mcq", question: "Which chart needs categories that add to 100%?", options: ["Pie", "Bar", "Line", "Scatter"], answerIndex: 0 },
      { type: "mcq", question: "Add labels via…", options: ["Format painter", "Chart Elements (+)", "Sort", "Filter"], answerIndex: 1 },
      { type: "tf", question: "Scatter is best for time series.", answer: false },
      { type: "fill", question: "Charts update if ___ changes.", answer: "data" },
      { type: "mcq", question: "Bar chart is good for…", options: ["Long category names", "Trends", "Whole-part", "Two-variable"], answerIndex: 0 },
      { type: "tf", question: "You can change chart type after creation.", answer: true },
    ],
  },
  lab: { type: "sheets", instructions: "Build a small dataset and try column, line and pie charts on it." },
};
export default content;
