import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Krita is a free, professional digital painting app. Meet its workspace, brushes and basic painting tools.",
    objectives: ["Identify Krita's UI panels.", "Pick and use brush presets.", "Paint a simple sketch with layers."],
    duration: "25 min", difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🎨 What is Krita?", body: "An open-source painting program designed for artists and illustrators. Files use .kra format." },
      { heading: "🪟 Workspace", body: "Toolbox (left), Canvas (center), Brush Presets, Layers, Color panels (right)." },
      { heading: "🖌️ Brush Engines", body: "Pick presets like Basic-1, Pencil-2, Ink, Airbrush. Use [ and ] to change brush size." },
      { heading: "🎨 Color", body: "Foreground/Background squares. X swaps them. Use the color triangle or palette." },
      { heading: "💾 Export", body: "Native: .kra. For sharing: File → Export As → .png / .jpg." },
    ],
  },
  images: {
    items: [
      { emoji: "🎨", caption: "Krita logo." }, { emoji: "🖌️", caption: "Brush presets." },
      { emoji: "🪟", caption: "Workspace." }, { emoji: "🟪", caption: "Color triangle." },
      { emoji: "🧱", caption: "Layers panel." }, { emoji: "💾", caption: "Export PNG." },
    ],
  },
  activities: {
    items: [
      { title: "First sketch ✏️", steps: ["New A4 canvas.", "Pick Pencil-2.", "Sketch a fruit."] },
      { title: "Color it 🎨", steps: ["New layer below sketch.", "Use Bucket Fill tool.", "Pick a bright color."] },
      { title: "Brush sizes 📏", steps: ["Press [ to shrink, ] to enlarge.", "Try smooth strokes."] },
      { title: "Swap colors 🔁", steps: ["Pick FG black, BG white.", "Press X to swap."] },
      { title: "Export PNG 💾", steps: ["File → Export As → art.png."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Krita's native format is…", options: [".krt", ".kra", ".krita", ".png"], answerIndex: 1 },
      { type: "fill", question: "Krita is mainly used for ___ painting.", answer: "digital" },
      { type: "tf", question: "Krita is paid software.", answer: false },
      { type: "mcq", question: "Increase brush size with…", options: ["[", "]", "B", "Z"], answerIndex: 1 },
      { type: "fill", question: "Swap FG/BG colors with key ___.", answer: "X" },
      { type: "mcq", question: "Best to share artwork as image?", options: [".kra", ".png", ".doc", ".xlsx"], answerIndex: 1 },
      { type: "tf", question: "Krita supports layers.", answer: true },
      { type: "fill", question: "Bucket fills with ___ color.", answer: "foreground" },
      { type: "mcq", question: "Brush presets can be…", options: ["Customized", "Only default", "Only black", "Only round"], answerIndex: 0 },
      { type: "tf", question: "Krita is designed for artists.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "What's center of Krita window?", options: ["Brush list", "Canvas", "Menu", "Color"], answerIndex: 1 },
      { type: "mcq", question: "Common pencil preset is…", options: ["Pencil-2", "Inker", "Airbrush", "Spray"], answerIndex: 0 },
      { type: "tf", question: "Krita is open-source.", answer: true },
      { type: "fill", question: "Decrease brush with the ___ key.", answer: "[" },
      { type: "mcq", question: "FG color is the…", options: ["Background", "Foreground", "Outline", "Fill of layer"], answerIndex: 1 },
      { type: "mcq", question: "To export JPG use…", options: ["Save", "Export As", "Print", "Open"], answerIndex: 1 },
      { type: "tf", question: "Krita can do basic animation.", answer: true },
      { type: "fill", question: "Native format extension is .___.", answer: "kra" },
      { type: "mcq", question: "Layer panel is on the…", options: ["Left", "Right", "Top", "Bottom"], answerIndex: 1 },
      { type: "tf", question: "Krita has only round brushes.", answer: false },
    ],
  },
  lab: { type: "paint", instructions: "Practice digital sketching basics in our paint editor — outline first, color second." },
};
export default content;
