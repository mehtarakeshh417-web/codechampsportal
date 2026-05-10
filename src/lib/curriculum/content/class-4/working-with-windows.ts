import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Windows is the most popular OS. Let's learn the desktop, taskbar, files, folders and how to organise our work.",
    objectives: [
      "Identify desktop, taskbar, Start menu and icons.",
      "Create, rename and delete files and folders.",
      "Use the Recycle Bin to recover deleted items.",
    ],
    duration: "30 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🪟 The Desktop", body: "The big screen we see when Windows starts. It has icons, wallpaper and the taskbar at the bottom." },
      { heading: "Parts of the Desktop", body: "", bullets: [
        "ICONS — small pictures for apps and files",
        "TASKBAR — bar at the bottom",
        "START menu — open apps from here",
        "SYSTEM TRAY — clock, battery, internet icons",
        "RECYCLE BIN — deleted items wait here",
      ] },
      { heading: "📁 Files and Folders", body: "FILES are documents (Word, image, video). FOLDERS hold many files together." },
      { heading: "Common actions", body: "", bullets: [
        "Right-click → New → Folder = make a folder",
        "Right-click → Rename = change name",
        "Right-click → Delete = move to Recycle Bin",
        "Drag-drop = move between folders",
      ] },
      { heading: "🗑️ Recycle Bin", body: "Deleted files go to the Recycle Bin. We can restore them OR empty the bin to delete forever." },
      { heading: "💡 Tip", body: "Always EJECT a pen drive safely before pulling it out." },
    ],
  },
  images: {
    items: [
      { emoji: "🖥️", caption: "Windows desktop." },
      { emoji: "📁", caption: "A folder full of files." },
      { emoji: "📄", caption: "A file (document)." },
      { emoji: "⌚", caption: "Clock in system tray." },
      { emoji: "🗑️", caption: "Recycle Bin." },
      { emoji: "🪟", caption: "Start menu." },
    ],
  },
  activities: {
    items: [
      { title: "Make my folder 📁", steps: ["Right-click on desktop → New → Folder.", "Name it 'My Class 4'."] },
      { title: "Move it 📦", steps: ["Drag a file from Desktop into your new folder."] },
      { title: "Recycle dance 🗑️", steps: ["Make a test file, delete it.", "Open Recycle Bin and restore it."] },
      { title: "Pin to taskbar 📌", steps: ["Right-click any app icon.", "Choose 'Pin to taskbar'."] },
      { title: "Wallpaper change 🖼️", steps: ["Right-click desktop → Personalize.", "Pick a new wallpaper."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Bar at the bottom is the ____.", options: ["title bar", "taskbar", "ribbon", "scrollbar"], answerIndex: 1 },
      { type: "mcq", question: "Deleted files go to ____.", options: ["Folder", "Recycle Bin", "Bin folder", "Trash drive"], answerIndex: 1 },
      { type: "mcq", question: "We open apps from ____.", options: ["Start menu", "Recycle Bin", "Clock", "Wallpaper"], answerIndex: 0 },
      { type: "mcq", question: "Right-click on desktop → New → ____ creates a folder.", options: ["File", "Folder", "Desktop", "Wallpaper"], answerIndex: 1 },
      { type: "tf", question: "Folders can hold many files.", answer: true },
      { type: "tf", question: "Recycle Bin permanently deletes files.", answer: false, explanation: "It only deletes when we empty it." },
      { type: "tf", question: "We can pin apps to the taskbar.", answer: true },
      { type: "fill", question: "Small pictures on desktop are called ______.", answer: "icons" },
      { type: "fill", question: "______ menu lists all our apps.", answer: "Start" },
      { type: "fill", question: "______ Bin holds deleted files.", answer: "Recycle" },
      { type: "short", question: "How do you rename a folder?", modelAnswer: "Right-click → Rename and type a new name." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which is NOT on the desktop?", options: ["Icons", "Wallpaper", "Taskbar", "CPU"], answerIndex: 3 },
      { type: "mcq", question: "Which menu shows clock and battery?", options: ["Start", "System tray", "Recycle Bin", "Title bar"], answerIndex: 1 },
      { type: "mcq", question: "Files are ____.", options: ["folders", "documents/data items", "icons", "menus"], answerIndex: 1 },
      { type: "mcq", question: "Folders hold ____.", options: ["only one file", "many files", "the OS", "the CPU"], answerIndex: 1 },
      { type: "mcq", question: "Restore in Recycle Bin will ____ the file.", options: ["delete", "bring back", "edit", "rename"], answerIndex: 1 },
      { type: "mcq", question: "Empty Recycle Bin will ____.", options: ["restore all", "delete all forever", "rename them", "save them"], answerIndex: 1 },
      { type: "mcq", question: "Right-click usually opens a ____.", options: ["new folder", "menu", "browser", "Word file"], answerIndex: 1 },
      { type: "tf", question: "Taskbar is on the top of the screen by default.", answer: false },
      { type: "tf", question: "Wallpaper is the picture behind icons.", answer: true },
      { type: "fill", question: "______ Bin recovers deleted files.", answer: "Recycle" },
    ],
  },
  lab: { type: "none" },
};
export default content;
