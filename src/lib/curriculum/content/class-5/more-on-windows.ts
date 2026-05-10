import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Explore Windows features beyond the desktop — Control Panel, accessories and useful built-in tools that help you customise and use your PC better.",
    objectives: [
      "Open and use the Control Panel.",
      "Identify common Windows accessories.",
      "Personalise the desktop and manage user settings.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🪟 What is Windows?", body: "Windows is an operating system made by Microsoft. It manages files, hardware and apps." },
      { heading: "⚙️ Control Panel", body: "A central place to change settings.", bullets: [
        "Appearance and Personalization", "User Accounts", "Network and Internet",
        "Hardware and Sound", "Programs (install / uninstall)", "Clock and Region",
      ] },
      { heading: "🧰 Windows Accessories", body: "Small free apps that come with Windows.", bullets: [
        "Notepad — plain text", "WordPad — formatted text", "Calculator — math",
        "Snipping Tool — screenshots", "Paint — drawing", "Sticky Notes — reminders",
      ] },
      { heading: "🖼️ Personalising Windows", body: "Right-click the desktop → Personalize to change wallpaper, theme, lock screen and colours." },
      { heading: "💡 Did you know?", body: "Pressing Windows + D shows the desktop instantly!" },
    ],
  },
  images: {
    items: [
      { emoji: "⚙️", caption: "Control Panel icon." },
      { emoji: "🧮", caption: "Calculator accessory." },
      { emoji: "✂️", caption: "Snipping Tool." },
      { emoji: "🗒️", caption: "Notepad — plain text." },
      { emoji: "🖼️", caption: "Personalize the desktop." },
      { emoji: "🔔", caption: "Notification area." },
    ],
  },
  activities: {
    items: [
      { title: "Find the Control Panel 🔎", steps: ["Press Windows key.", "Type 'Control Panel'.", "Open it and list 5 categories you see."] },
      { title: "Take a Screenshot ✂️", steps: ["Open Snipping Tool.", "Click New.", "Drag to capture a region.", "Save as 'shot.png'."] },
      { title: "Change Wallpaper 🖼️", steps: ["Right-click desktop.", "Choose Personalize.", "Pick a new background."] },
      { title: "Quick Calculator 🧮", steps: ["Open Calculator.", "Switch to Scientific mode.", "Compute 25 × 4 + 13."] },
      { title: "Sticky Note 📌", steps: ["Open Sticky Notes.", "Write today's homework.", "Pin it to the desktop."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Which app is used for plain text?", options: ["Notepad", "Paint", "Excel", "PowerPoint"], answerIndex: 0 },
      { type: "mcq", question: "Where do you change Windows settings?", options: ["Control Panel", "Recycle Bin", "Calculator", "Notepad"], answerIndex: 0 },
      { type: "tf", question: "Snipping Tool is used to take screenshots.", answer: true },
      { type: "fill", question: "Windows + ___ shows the desktop.", answer: "D" },
      { type: "mcq", question: "Which is NOT a Windows accessory?", options: ["Notepad", "Calculator", "Photoshop", "Paint"], answerIndex: 2 },
      { type: "tf", question: "WordPad supports formatted text.", answer: true },
      { type: "fill", question: "Right-click desktop → ___ to change wallpaper.", answer: "Personalize" },
      { type: "mcq", question: "Calculator's scientific mode can do…", options: ["Email", "sin/cos", "Drawing", "Printing"], answerIndex: 1 },
      { type: "tf", question: "Sticky Notes save your reminders.", answer: true },
      { type: "mcq", question: "Windows is made by…", options: ["Apple", "Microsoft", "Google", "IBM"], answerIndex: 1 },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Control Panel is used to…", options: ["Play games", "Change settings", "Send email", "Browse web"], answerIndex: 1 },
      { type: "mcq", question: "Best tool to capture part of screen?", options: ["Notepad", "Snipping Tool", "WordPad", "Calculator"], answerIndex: 1 },
      { type: "tf", question: "Notepad can format text with bold.", answer: false },
      { type: "fill", question: "___ is the OS by Microsoft.", answer: "Windows" },
      { type: "mcq", question: "Which is an accessory?", options: ["Sticky Notes", "Chrome", "Word", "Excel"], answerIndex: 0 },
      { type: "mcq", question: "User Accounts are managed in…", options: ["Paint", "Control Panel", "Calculator", "WordPad"], answerIndex: 1 },
      { type: "tf", question: "Personalize lets you change theme.", answer: true },
      { type: "fill", question: "Calculator has Standard and ___ mode.", answer: "Scientific" },
      { type: "mcq", question: "Win+D does what?", options: ["Delete file", "Show desktop", "Open Word", "Lock PC"], answerIndex: 1 },
      { type: "tf", question: "WordPad and Notepad are the same app.", answer: false },
    ],
  },
};
export default content;
