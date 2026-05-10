import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Before you code, plan! Algorithms describe steps in plain English; flowcharts draw them with boxes and arrows.",
    objectives: [
      "Write a step-by-step algorithm.",
      "Identify standard flowchart symbols.",
      "Draw a flowchart for a small problem.",
    ],
    duration: "25 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🧠 Algorithm", body: "A finite, ordered set of steps that solves a problem. Example to add two numbers: read A, read B, sum=A+B, print sum, stop." },
      { heading: "🧭 Flowchart Symbols", body: "Standard shapes:", bullets: [
        "Oval — Start / Stop",
        "Parallelogram — Input / Output",
        "Rectangle — Process",
        "Diamond — Decision (Yes/No)",
        "Arrow — Flow direction",
      ] },
      { heading: "✅ Properties of a Good Algorithm", body: "Clear, finite, has input/output, effective and unambiguous." },
      { heading: "🔁 Loops in flowcharts", body: "Use a decision diamond — if condition true, loop back, else continue." },
      { heading: "💡 Tip", body: "Plan with paper first. Coding becomes 10× easier!" },
    ],
  },
  images: {
    items: [
      { emoji: "⭕", caption: "Start/Stop oval." },
      { emoji: "🔷", caption: "Decision diamond." },
      { emoji: "▭", caption: "Process box." },
      { emoji: "▱", caption: "Input/Output." },
      { emoji: "➡️", caption: "Flow arrow." },
      { emoji: "🧠", caption: "Plan first!" },
    ],
  },
  activities: {
    items: [
      { title: "Brush teeth algorithm 🪥", steps: ["List 5 steps to brush.", "Number them.", "Check no step is missing."] },
      { title: "Even or Odd 🔢", steps: ["Algorithm: read N, if N%2=0 print Even else Odd.", "Draw flowchart with diamond."] },
      { title: "Largest of two ⬆️", steps: ["Read A, B.", "If A>B print A else print B."] },
      { title: "Sum 1-10 🔁", steps: ["Use loop in flowchart.", "Variable s, i.", "Repeat until i>10."] },
      { title: "Login flow 🔐", steps: ["Draw a flowchart for username + password check."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Algorithm is a set of…", options: ["Pictures", "Steps", "Cells", "Languages"], answerIndex: 1 },
      { type: "fill", question: "Decision symbol is a ___.", answer: "diamond" },
      { type: "tf", question: "Oval marks Start or Stop.", answer: true },
      { type: "mcq", question: "Input/Output uses…", options: ["Rectangle", "Parallelogram", "Circle", "Triangle"], answerIndex: 1 },
      { type: "fill", question: "Arrows show ___ of control.", answer: "flow" },
      { type: "mcq", question: "Process box shape is…", options: ["Diamond", "Oval", "Rectangle", "Hexagon"], answerIndex: 2 },
      { type: "tf", question: "Algorithms must be infinite.", answer: false },
      { type: "fill", question: "Plan first, then ___.", answer: "code" },
      { type: "mcq", question: "Diamond has how many exits typically?", options: ["1", "2 (yes/no)", "3", "4"], answerIndex: 1 },
      { type: "tf", question: "Flowcharts use standard symbols.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Best symbol for 'A>B?'?", options: ["Rectangle", "Diamond", "Oval", "Parallelogram"], answerIndex: 1 },
      { type: "mcq", question: "Algorithm to add 2 numbers requires…", options: ["1 step", "Inputs, process, output", "Only output", "No order"], answerIndex: 1 },
      { type: "tf", question: "An algorithm must have finite steps.", answer: true },
      { type: "fill", question: "Start and Stop use the ___ shape.", answer: "oval" },
      { type: "mcq", question: "'Print result' uses…", options: ["Diamond", "Parallelogram", "Oval", "Hexagon"], answerIndex: 1 },
      { type: "mcq", question: "Loop in flowchart uses…", options: ["Decision + back arrow", "Two ovals", "Two rectangles", "No symbol"], answerIndex: 0 },
      { type: "tf", question: "A good algorithm must be ambiguous.", answer: false },
      { type: "fill", question: "Plan + draw before writing ___.", answer: "code" },
      { type: "mcq", question: "Process step uses…", options: ["Rectangle", "Diamond", "Oval", "Parallelogram"], answerIndex: 0 },
      { type: "tf", question: "Algorithms can be language-independent.", answer: true },
    ],
  },
};
export default content;
