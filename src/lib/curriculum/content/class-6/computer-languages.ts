import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Computers understand only 0s and 1s. Programmers use languages of three types — machine, assembly and high-level — to talk to them.",
    objectives: [
      "Differentiate machine, assembly and high-level languages.",
      "Understand the role of compiler, interpreter and assembler.",
      "Name common high-level languages.",
    ],
    duration: "25 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🔣 Why Languages?", body: "We need a language so humans and computers can communicate. There are three families:" },
      { heading: "1️⃣ Machine Language", body: "Only 0s and 1s. Fastest, but very hard to write." },
      { heading: "2️⃣ Assembly Language", body: "Uses short codes (mnemonics) like ADD, MOV. Needs an assembler to convert to machine code." },
      { heading: "3️⃣ High-Level Languages", body: "Closer to English. Examples: Python, Java, C++, JavaScript. Need a compiler or interpreter.", bullets: [
        "Compiler — translates whole program at once",
        "Interpreter — translates line by line",
      ] },
      { heading: "💡 Did you know?", body: "Python is interpreted; C++ is compiled." },
    ],
  },
  images: {
    items: [
      { emoji: "0️⃣", caption: "Machine code 0/1." },
      { emoji: "📝", caption: "Assembly mnemonics." },
      { emoji: "🐍", caption: "Python (high-level)." },
      { emoji: "☕", caption: "Java." },
      { emoji: "⚙️", caption: "Compiler/Interpreter." },
      { emoji: "💻", caption: "Programmer at work." },
    ],
  },
  activities: {
    items: [
      { title: "Sort the languages 🗂️", steps: ["List: Python, ADD, 1010, Java.", "Group as Machine / Assembly / High-level."] },
      { title: "Compiler vs Interpreter 🔁", steps: ["Make a 2-column table.", "Write 3 differences."] },
      { title: "Hello World 👋", steps: ["Open online Python.", "Type print('Hello').", "Run."] },
      { title: "Mnemonic match 🧠", steps: ["Match ADD, SUB, MOV with their meanings.", "Write a 4-line assembly-style algorithm."] },
      { title: "Language timeline 🕰️", steps: ["Search: when were Python, C, Java made.", "Draw a timeline."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Computer's native language is…", options: ["English", "Machine", "Hindi", "Assembly"], answerIndex: 1 },
      { type: "tf", question: "High-level languages are closer to English.", answer: true },
      { type: "fill", question: "Compiler converts the ___ program at once.", answer: "whole" },
      { type: "mcq", question: "Which is interpreted?", options: ["C", "C++", "Python", "Pascal"], answerIndex: 2 },
      { type: "fill", question: "Assembly uses short codes called ___.", answer: "mnemonics" },
      { type: "mcq", question: "Java is a…", options: ["Machine lang", "Assembly", "High-level", "Mnemonic"], answerIndex: 2 },
      { type: "tf", question: "Interpreter translates line by line.", answer: true },
      { type: "fill", question: "Machine code uses only 0 and ___.", answer: "1" },
      { type: "mcq", question: "Assembler converts assembly to…", options: ["Java", "Machine code", "Python", "Hex"], answerIndex: 1 },
      { type: "tf", question: "Python uses a compiler only.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Fastest for the CPU is…", options: ["Python", "Machine", "Java", "Assembly"], answerIndex: 1 },
      { type: "mcq", question: "Which is high-level?", options: ["Python", "Binary", "Mnemonic", "Hex"], answerIndex: 0 },
      { type: "tf", question: "Compilers make standalone .exe files.", answer: true },
      { type: "fill", question: "Convert assembly using an ___.", answer: "assembler" },
      { type: "mcq", question: "Best for beginners?", options: ["Machine code", "Python", "Assembly", "C"], answerIndex: 1 },
      { type: "mcq", question: "C++ uses a…", options: ["Compiler", "Interpreter", "Translator", "Linker only"], answerIndex: 0 },
      { type: "tf", question: "Mnemonics are used in machine code.", answer: false },
      { type: "fill", question: "JavaScript runs in the ___.", answer: "browser" },
      { type: "mcq", question: "Interpreter translates…", options: ["Whole at once", "Line by line", "Never", "Twice"], answerIndex: 1 },
      { type: "tf", question: "Computers can directly run high-level code.", answer: false },
    ],
  },
};
export default content;
