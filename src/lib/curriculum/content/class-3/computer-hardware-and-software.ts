import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Hardware is what we can TOUCH. Software is what we cannot touch — the programs running inside.",
    objectives: [
      "Tell the difference between hardware and software.",
      "Give examples of each.",
      "Name 3 system and 3 application software.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "💻 Hardware", body: "All physical parts of a computer that we can TOUCH and SEE.", bullets: [
        "Monitor", "Keyboard", "Mouse", "CPU box", "Printer", "Speakers", "Hard disk",
      ] },
      { heading: "📀 Software", body: "Programs and apps that run on the computer. We can SEE them on screen but NOT touch.", bullets: [
        "Windows (operating system)", "MS Word", "Google Chrome", "Games", "Scratch",
      ] },
      { heading: "Two Types of Software", body: "", bullets: [
        "SYSTEM software — runs the computer (e.g., Windows, Linux, macOS).",
        "APPLICATION software — does a specific job (e.g., Word, Paint, Chrome).",
      ] },
      { heading: "💡 Tip", body: "Hardware needs software to be useful. Software needs hardware to run. They are best friends!" },
      { heading: "⚠️ Important", body: "Never download software from unknown places — it may harm the computer." },
    ],
  },
  images: {
    items: [
      { emoji: "🖥️", caption: "Hardware — touchable parts." },
      { emoji: "💿", caption: "Software — programs on a disc." },
      { emoji: "🪟", caption: "System software — Windows." },
      { emoji: "📝", caption: "Application — MS Word." },
      { emoji: "🎮", caption: "Games are application software." },
      { emoji: "🤝", caption: "Hardware + Software work together." },
    ],
  },
  activities: {
    items: [
      { title: "Touch test ✋", steps: ["Make a list of 5 things in your room.", "Mark each as Hardware or Software."] },
      { title: "Software hunt 🔍", steps: ["Open the START menu.", "Write down 5 software (apps) you see."] },
      { title: "Match game 🎯", steps: ["List: Mouse, Word, Chrome, Speaker, Windows.", "Sort each into Hardware or Software."] },
      { title: "System vs Application 📋", steps: ["Make 2 columns.", "Put 3 examples in each column."] },
      { title: "Poster time 🎨", steps: ["Make a colourful poster: 'Hardware vs Software'.", "Hang it in your study area."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Which is hardware?", options: ["Word", "Mouse", "Chrome", "Windows"], answerIndex: 1 },
      { type: "mcq", question: "Which is software?", options: ["Monitor", "CPU", "Paint", "Speaker"], answerIndex: 2 },
      { type: "mcq", question: "Windows is which type?", options: ["Hardware", "System software", "Application software", "Game"], answerIndex: 1 },
      { type: "mcq", question: "MS Word is ____.", options: ["hardware", "system software", "application software", "printer"], answerIndex: 2 },
      { type: "tf", question: "We can touch software.", answer: false },
      { type: "tf", question: "Hardware and software work together.", answer: true },
      { type: "tf", question: "Games are application software.", answer: true },
      { type: "fill", question: "We can ______ hardware but not software.", answer: "touch" },
      { type: "fill", question: "______ software runs the whole computer.", answer: "System" },
      { type: "fill", question: "Chrome is an ______ software.", answer: "application" },
      { type: "short", question: "Give one example of system software and one application software.", modelAnswer: "System: Windows. Application: MS Word." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which one is NOT hardware?", options: ["Keyboard", "Mouse", "Excel", "Printer"], answerIndex: 2 },
      { type: "mcq", question: "Which is NOT software?", options: ["Word", "Chrome", "Speaker", "Windows"], answerIndex: 2 },
      { type: "mcq", question: "Operating System is a type of ____ software.", options: ["application", "system", "drawing", "music"], answerIndex: 1 },
      { type: "mcq", question: "Software that does ONE special job is ____.", options: ["system", "application", "hardware", "memory"], answerIndex: 1 },
      { type: "mcq", question: "Which is an example of an OS?", options: ["MS Word", "Linux", "Paint", "Chrome"], answerIndex: 1 },
      { type: "mcq", question: "Hardware needs ____ to do useful work.", options: ["paper", "software", "wires only", "humans only"], answerIndex: 1 },
      { type: "mcq", question: "Pen drive is ____.", options: ["hardware", "software", "both", "neither"], answerIndex: 0 },
      { type: "tf", question: "Windows is application software.", answer: false },
      { type: "tf", question: "Chrome is used to browse the internet.", answer: true },
      { type: "fill", question: "Linux is a type of ______ software.", answer: "system" },
    ],
  },
  lab: { type: "none" },
};
export default content;
