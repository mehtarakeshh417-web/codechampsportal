import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Memory remembers data. Storage keeps data even after the computer is switched off. Let's see different kinds.",
    objectives: [
      "Tell the difference between RAM and ROM.",
      "Identify primary vs secondary storage.",
      "Compare HDD, SSD, pen drive and CD/DVD.",
    ],
    duration: "30 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🧠 Two kinds of memory", body: "", bullets: [
        "PRIMARY memory — fast, inside the CPU box (RAM and ROM)",
        "SECONDARY memory — slower but bigger and permanent (hard disk, pen drive)",
      ] },
      { heading: "RAM vs ROM", body: "", bullets: [
        "RAM — Random Access Memory. Holds work being done NOW. Erases when off.",
        "ROM — Read Only Memory. Has fixed instructions to start computer. Cannot change easily.",
      ] },
      { heading: "💾 Storage Devices", body: "", bullets: [
        "Hard Disk (HDD) — large, inside computer",
        "Solid State Drive (SSD) — fast modern drive",
        "Pen drive (USB) — small, portable",
        "CD/DVD — round shiny discs",
        "Memory card — used in cameras and phones",
      ] },
      { heading: "Units of Storage", body: "Smallest to biggest:", bullets: [
        "Bit → Byte → KB → MB → GB → TB",
      ] },
      { heading: "💡 Tip", body: "1 KB = 1024 bytes, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB." },
    ],
  },
  images: {
    items: [
      { emoji: "🧠", caption: "RAM — temporary working memory." },
      { emoji: "📜", caption: "ROM — fixed startup instructions." },
      { emoji: "🗄️", caption: "Hard disk drive (HDD)." },
      { emoji: "⚡", caption: "SSD — fast solid-state drive." },
      { emoji: "🔌", caption: "Pen drive — portable storage." },
      { emoji: "💿", caption: "CD/DVD — optical discs." },
    ],
  },
  activities: {
    items: [
      { title: "Storage hunt 🔎", steps: ["Find 3 storage devices around you.", "Note size (GB/TB) of each."] },
      { title: "Unit ladder 🪜", steps: ["Write the units in order: bit → TB.", "Stick on your wall as a chart."] },
      { title: "RAM vs ROM table 📋", steps: ["Make a 2-column table.", "Write 3 differences."] },
      { title: "Pen drive transfer 🔌", steps: ["Copy a small picture from PC to pen drive.", "Eject safely."] },
      { title: "Math fun 🧮", steps: ["If 1 song = 5 MB, how many songs fit in 1 GB?"], expectedOutcome: "About 200 songs." },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "RAM stands for ____.", options: ["Random Access Memory", "Read Always Memory", "Run And Move", "Random All Mode"], answerIndex: 0 },
      { type: "mcq", question: "ROM stands for ____.", options: ["Right On Mode", "Read Only Memory", "Random Order Mode", "Read Once More"], answerIndex: 1 },
      { type: "mcq", question: "Which is faster — RAM or hard disk?", options: ["RAM", "Hard disk", "Same", "None"], answerIndex: 0 },
      { type: "mcq", question: "Pen drive uses ____ port.", options: ["USB", "HDMI", "VGA", "Audio"], answerIndex: 0 },
      { type: "tf", question: "Data in RAM is lost when computer is off.", answer: true },
      { type: "tf", question: "ROM data stays even when off.", answer: true },
      { type: "tf", question: "1 KB = 1024 bytes.", answer: true },
      { type: "fill", question: "1 MB = ______ KB.", answer: "1024" },
      { type: "fill", question: "Smallest unit is ______.", answer: "bit" },
      { type: "fill", question: "Memory cards are used in ______ and phones.", answer: "cameras" },
      { type: "short", question: "Why is RAM called temporary memory?", modelAnswer: "Because it loses its data when the computer is switched off." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which is primary memory?", options: ["Hard disk", "Pen drive", "RAM", "DVD"], answerIndex: 2 },
      { type: "mcq", question: "Which is secondary memory?", options: ["RAM", "ROM", "Hard disk", "Cache"], answerIndex: 2 },
      { type: "mcq", question: "1 GB = ____ MB.", options: ["100", "1000", "1024", "512"], answerIndex: 2 },
      { type: "mcq", question: "Which is faster — HDD or SSD?", options: ["HDD", "SSD", "Same", "Depends on colour"], answerIndex: 1 },
      { type: "mcq", question: "Which is biggest unit here?", options: ["KB", "MB", "GB", "TB"], answerIndex: 3 },
      { type: "mcq", question: "8 bits = 1 ____.", options: ["KB", "byte", "MB", "GB"], answerIndex: 1 },
      { type: "mcq", question: "Memory card is also called ____.", options: ["SD card", "Pen drive", "Hard disk", "ROM"], answerIndex: 0 },
      { type: "tf", question: "ROM data can be easily changed.", answer: false },
      { type: "tf", question: "SSD has no moving parts.", answer: true },
      { type: "fill", question: "Bit → Byte → KB → MB → GB → ______.", answer: "TB" },
    ],
  },
  lab: { type: "none" },
};
export default content;
