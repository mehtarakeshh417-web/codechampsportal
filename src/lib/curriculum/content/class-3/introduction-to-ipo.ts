import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "IPO stands for Input → Process → Output. It is the cycle that every computer task follows.",
    objectives: [
      "Define Input, Process and Output.",
      "Identify the IPO cycle in everyday examples.",
      "Draw a simple IPO diagram.",
    ],
    duration: "20 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🔄 The IPO Cycle", body: "Every computer task has 3 parts: INPUT, PROCESS, OUTPUT.", bullets: [
        "INPUT — data we give to the computer.",
        "PROCESS — the computer works on the data.",
        "OUTPUT — result we receive.",
      ] },
      { heading: "Examples in real life", body: "We can see IPO everywhere.", bullets: [
        "Calculator: numbers (input) → add (process) → answer (output).",
        "Printer: file (input) → print (process) → paper (output).",
        "Music player: song click (input) → play (process) → sound (output).",
      ] },
      { heading: "🍞 Even cooking is IPO", body: "Bread + butter (input) → spread + toast (process) → toast (output)!" },
      { heading: "💡 Tip", body: "Whenever you ask a computer to do something, picture the IPO cycle." },
    ],
  },
  images: {
    items: [
      { emoji: "⌨️", caption: "Input — keyboard, mouse, mic." },
      { emoji: "📦", caption: "Process — done by CPU." },
      { emoji: "🖥️", caption: "Output — monitor, printer, speaker." },
      { emoji: "🔄", caption: "Cycle: Input → Process → Output." },
      { emoji: "🧮", caption: "Calculator example of IPO." },
    ],
  },
  activities: {
    items: [
      { title: "IPO chart 📊", steps: ["Draw 3 boxes labelled Input, Process, Output.", "Fill them for a calculator."] },
      { title: "Real life IPO 🍕", steps: ["Pick any daily activity (brushing teeth, cooking).", "Find its input, process and output."] },
      { title: "Match the device 🎯", steps: ["List 5 devices.", "Write what input/output each one uses."] },
      { title: "Story IPO 📖", steps: ["Write a 4-line story about a printer.", "Show input/process/output in your story."] },
      { title: "Class quiz time ❓", steps: ["Make 3 IPO questions for a friend.", "Take turns answering."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "IPO stands for ____.", options: ["In Print Out", "Input Process Output", "Inside Press Off", "Indian Post Office"], answerIndex: 1 },
      { type: "mcq", question: "The CPU is part of the ____ stage.", options: ["Input", "Process", "Output", "Storage"], answerIndex: 1 },
      { type: "mcq", question: "A printer is part of which stage?", options: ["Input", "Output", "Process", "All"], answerIndex: 1 },
      { type: "mcq", question: "A microphone is part of which stage?", options: ["Input", "Output", "Process", "Power"], answerIndex: 0 },
      { type: "tf", question: "Output comes BEFORE Process.", answer: false },
      { type: "tf", question: "Without input the computer has nothing to process.", answer: true },
      { type: "tf", question: "We can have IPO in real life too.", answer: true },
      { type: "fill", question: "Data we give to the computer is called ______.", answer: "input" },
      { type: "fill", question: "Result we get from the computer is ______.", answer: "output" },
      { type: "fill", question: "Working on the data is the ______ stage.", answer: "process" },
      { type: "short", question: "Give one IPO example from cooking.", modelAnswer: "Eggs (input) → frying (process) → omelette (output)." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "What is the correct order in IPO?", options: ["Process-Input-Output", "Output-Process-Input", "Input-Process-Output", "Input-Output-Process"], answerIndex: 2 },
      { type: "mcq", question: "Which device gives Input?", options: ["Printer", "Speaker", "Keyboard", "Monitor"], answerIndex: 2 },
      { type: "mcq", question: "Which device gives Output?", options: ["Mouse", "Mic", "Keyboard", "Monitor"], answerIndex: 3 },
      { type: "mcq", question: "Process is done by which part?", options: ["CPU", "Mouse", "Cable", "Speaker"], answerIndex: 0 },
      { type: "mcq", question: "Calculator: 4 + 5 → 9. What is 9?", options: ["Input", "Process", "Output", "Power"], answerIndex: 2 },
      { type: "mcq", question: "Calculator: pressing buttons is ____.", options: ["Input", "Output", "Process", "Memory"], answerIndex: 0 },
      { type: "tf", question: "IPO has 4 stages.", answer: false },
      { type: "tf", question: "Output is the final result.", answer: true },
      { type: "tf", question: "A scanner is an input device.", answer: true },
      { type: "fill", question: "Input → ______ → Output.", answer: "Process" },
    ],
  },
  lab: { type: "none" },
};
export default content;
