import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "An Operating System (OS) is the most important software. It runs the computer and lets us use other apps.",
    objectives: [
      "Define an Operating System.",
      "Name 3 popular operating systems.",
      "List the main jobs of an OS.",
    ],
    duration: "20 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🪟 What is an OS?", body: "An OPERATING SYSTEM is the boss of the computer. It controls hardware and lets us run apps." },
      { heading: "Popular Operating Systems", body: "", bullets: [
        "Windows — most used in homes and schools",
        "macOS — used in Apple computers",
        "Linux — used in servers and by techies",
        "Android — used in mobile phones",
        "iOS — used in iPhones",
      ] },
      { heading: "Main jobs of an OS", body: "", bullets: [
        "Start the computer when we press the power button",
        "Manage files and folders",
        "Run apps like Word and Chrome",
        "Connect us to printers, internet and other devices",
        "Show the desktop, icons and taskbar",
      ] },
      { heading: "💡 Did you know?", body: "Without an OS, the computer would just be a metal box. The OS makes it useful!" },
    ],
  },
  images: {
    items: [
      { emoji: "🪟", caption: "Windows OS." },
      { emoji: "🍎", caption: "macOS — Apple computers." },
      { emoji: "🐧", caption: "Linux — penguin mascot." },
      { emoji: "🤖", caption: "Android — phones." },
      { emoji: "📁", caption: "OS manages files and folders." },
      { emoji: "🖥️", caption: "OS shows the desktop." },
    ],
  },
  activities: {
    items: [
      { title: "OS spy 🔎", steps: ["Find what OS your home computer/phone uses.", "Write its name and version."] },
      { title: "Boot watch ⏱️", steps: ["Press the power button.", "Time how long it takes for desktop to appear.", "That whole time is the OS starting!"] },
      { title: "Icon hunt 🏠", steps: ["List 5 icons on your desktop.", "Open one and close it."] },
      { title: "Mascot art 🎨", steps: ["Draw the mascot of Linux (penguin) and macOS (apple)."] },
      { title: "Compare ✨", steps: ["Make a 3x3 chart comparing Windows, macOS and Linux on: Maker, Logo, Used in."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "OS stands for ____.", options: ["Office Set", "Operating System", "Open Save", "Orange Server"], answerIndex: 1 },
      { type: "mcq", question: "Which is an OS?", options: ["Chrome", "Linux", "Word", "Excel"], answerIndex: 1 },
      { type: "mcq", question: "Mac computers use ____.", options: ["Windows", "Linux", "macOS", "Android"], answerIndex: 2 },
      { type: "mcq", question: "Phones often use ____ or iOS.", options: ["Linux", "Android", "Windows", "macOS"], answerIndex: 1 },
      { type: "tf", question: "An OS is application software.", answer: false },
      { type: "tf", question: "Without OS, we cannot run other apps.", answer: true },
      { type: "tf", question: "Linux's mascot is a penguin.", answer: true },
      { type: "fill", question: "Most home PCs use ______.", answer: "Windows" },
      { type: "fill", question: "iPhones use ______.", answer: "iOS" },
      { type: "fill", question: "OS manages ______ and folders.", answer: "files" },
      { type: "short", question: "Give two jobs of an OS.", modelAnswer: "Run apps and manage files." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which is NOT an OS?", options: ["Windows", "Linux", "Excel", "Android"], answerIndex: 2 },
      { type: "mcq", question: "OS is which type of software?", options: ["Application", "System", "Both", "Neither"], answerIndex: 1 },
      { type: "mcq", question: "Which company makes Windows?", options: ["Apple", "Microsoft", "Google", "Samsung"], answerIndex: 1 },
      { type: "mcq", question: "Which OS is FREE and open-source?", options: ["macOS", "Windows", "Linux", "iOS"], answerIndex: 2 },
      { type: "mcq", question: "Android phones are made by ____.", options: ["Apple only", "Many companies", "Microsoft only", "Sony only"], answerIndex: 1 },
      { type: "mcq", question: "When you turn on the computer, the ____ loads first.", options: ["browser", "OS", "Word", "music"], answerIndex: 1 },
      { type: "mcq", question: "Which device usually runs iOS?", options: ["iPhone", "Galaxy phone", "Lenovo laptop", "Dell PC"], answerIndex: 0 },
      { type: "tf", question: "macOS only runs on Apple computers.", answer: true },
      { type: "tf", question: "Without an OS the computer is useless.", answer: true },
      { type: "fill", question: "Linux is famous for its ______ mascot.", answer: "penguin" },
    ],
  },
  lab: { type: "none" },
};
export default content;
