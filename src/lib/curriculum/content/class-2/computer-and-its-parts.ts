import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "A computer is made of many parts. Some parts take INPUT, some show OUTPUT, and the CPU does the thinking in the middle.",
    objectives: [
      "Group computer parts into INPUT and OUTPUT.",
      "Identify CPU as the part that processes data.",
      "Name 6 parts of a computer.",
    ],
    duration: "20 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🧩 Three Groups", body: "Every computer part belongs to one of three groups.", bullets: [
        "INPUT — gives data to the computer (keyboard, mouse, microphone).",
        "PROCESSING — the brain (CPU).",
        "OUTPUT — shows the result (monitor, speakers, printer).",
      ] },
      { heading: "🖱️ Mouse and ⌨️ Keyboard", body: "Both are INPUT parts. Mouse points and clicks. Keyboard types letters and numbers." },
      { heading: "🖥️ Monitor", body: "An OUTPUT device. Shows pictures, videos and words." },
      { heading: "📦 CPU — Central Processing Unit", body: "The 'brain' of the computer. It thinks and gives orders to other parts." },
      { heading: "🔊 Speakers", body: "OUTPUT device — gives us sound." },
      { heading: "🖨️ Printer", body: "OUTPUT device — puts our work onto paper." },
      { heading: "💡 Tip", body: "INPUT goes IN. OUTPUT comes OUT. CPU is the boss in between!" },
    ],
  },
  images: {
    items: [
      { emoji: "⌨️", caption: "Keyboard — INPUT." },
      { emoji: "🖱️", caption: "Mouse — INPUT." },
      { emoji: "📦", caption: "CPU — Processing (brain)." },
      { emoji: "🖥️", caption: "Monitor — OUTPUT." },
      { emoji: "🔊", caption: "Speakers — OUTPUT." },
      { emoji: "🖨️", caption: "Printer — OUTPUT." },
    ],
  },
  activities: {
    items: [
      { title: "Sort the parts 📦", steps: ["Write 6 parts on slips of paper.", "Place each in INPUT or OUTPUT pile."], expectedOutcome: "All slips sorted correctly." },
      { title: "Trace the path ➡️", steps: ["Draw an arrow: keyboard → CPU → monitor.", "Explain it to a friend."] },
      { title: "Label challenge 🏷️", steps: ["Look at a real PC.", "Stick small notes naming each part."] },
      { title: "What's missing? 🔎", steps: ["Imagine a computer without a monitor.", "List 3 things you cannot do."] },
      { title: "Speaker test 🔊", steps: ["Play a song.", "Cover and uncover the speaker.", "Hear the difference."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Which part is the brain?", options: ["Mouse", "CPU", "Monitor", "Speaker"], answerIndex: 1 },
      { type: "mcq", question: "Which is an INPUT device?", options: ["Speaker", "Printer", "Keyboard", "Monitor"], answerIndex: 2 },
      { type: "mcq", question: "Which is an OUTPUT device?", options: ["Keyboard", "Monitor", "Mouse", "Microphone"], answerIndex: 1 },
      { type: "mcq", question: "Speakers give us ______.", options: ["pictures", "sound", "smell", "taste"], answerIndex: 1 },
      { type: "tf", question: "A printer is an output device.", answer: true },
      { type: "tf", question: "A microphone is an output device.", answer: false, explanation: "Microphone is INPUT — it takes our voice in." },
      { type: "tf", question: "CPU does the processing.", answer: true },
      { type: "fill", question: "______ is used to type letters.", answer: "Keyboard" },
      { type: "fill", question: "The ______ shows the screen output.", answer: "monitor" },
      { type: "fill", question: "A ______ prints work on paper.", answer: "printer" },
      { type: "short", question: "Name two output devices.", modelAnswer: "Monitor and Printer." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "What stands between INPUT and OUTPUT?", options: ["Cables", "CPU (Processing)", "Mouse", "Plug"], answerIndex: 1 },
      { type: "mcq", question: "Which one of these is NOT an input device?", options: ["Keyboard", "Mouse", "Microphone", "Speaker"], answerIndex: 3 },
      { type: "mcq", question: "Microphone is used to give ______ to the computer.", options: ["pictures", "voice", "videos", "money"], answerIndex: 1 },
      { type: "mcq", question: "Which part stores our work even after switching off (long term)?", options: ["RAM", "Monitor", "Hard disk", "Mouse"], answerIndex: 2 },
      { type: "mcq", question: "Which device shows MOVING pictures?", options: ["Monitor", "Printer", "Mouse", "Keyboard"], answerIndex: 0 },
      { type: "mcq", question: "Computer + monitor + keyboard + mouse together is called a ____.", options: ["TV", "computer system", "phone", "calculator"], answerIndex: 1 },
      { type: "tf", question: "Without an output device we cannot see results.", answer: true },
      { type: "tf", question: "All input devices show pictures.", answer: false },
      { type: "tf", question: "Headphones are output devices.", answer: true },
      { type: "fill", question: "CPU stands for Central ______ Unit.", answer: "Processing" },
    ],
  },
  lab: { type: "none" },
};
export default content;
