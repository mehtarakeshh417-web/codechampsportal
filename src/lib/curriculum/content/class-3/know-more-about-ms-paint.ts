import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Let's go deeper into MS Paint — selecting parts of a drawing, copying, pasting, resizing and using more shapes.",
    objectives: [
      "Use Select, Copy, Cut and Paste in Paint.",
      "Resize and crop images.",
      "Add text with different fonts and sizes.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "✂️ Select tool", body: "Use the SELECT tool to choose a part of your drawing — rectangle or free-form shape." },
      { heading: "📋 Copy / Cut / Paste", body: "Once selected:", bullets: [
        "COPY (Ctrl+C) — keeps original, makes a copy",
        "CUT (Ctrl+X) — removes original",
        "PASTE (Ctrl+V) — places it somewhere",
      ] },
      { heading: "📏 Resize", body: "Drag the corner handles to make the selection bigger or smaller." },
      { heading: "✂️ Crop", body: "Cut the picture down to just the selected part." },
      { heading: "🅰️ Text Tool", body: "Click TEXT, draw a box, then choose font, size and colour for typing words on the picture." },
      { heading: "🔷 More Shapes", body: "Paint has many shapes — circle, oval, triangle, star, heart, arrow and more." },
      { heading: "💡 Tip", body: "Use Copy + Paste to make many of the same flower or star quickly." },
    ],
  },
  images: {
    items: [
      { emoji: "✂️", caption: "Select and Cut." },
      { emoji: "📋", caption: "Copy and Paste." },
      { emoji: "📏", caption: "Resize using corner handles." },
      { emoji: "🅰️", caption: "Text tool with fonts." },
      { emoji: "⭐", caption: "Stars, hearts and arrows in Shapes." },
      { emoji: "🌻", caption: "Many flowers using copy-paste." },
    ],
  },
  activities: {
    items: [
      { title: "Garden of stars ⭐", steps: ["Draw one star.", "Select + Copy + Paste it 10 times.", "Move them around to make a sky."] },
      { title: "Big and small 📏", steps: ["Draw a balloon.", "Resize it small, then big.", "Place 5 balloons of different sizes."] },
      { title: "Crop the photo 🖼️", steps: ["Open any picture.", "Select just the face area.", "Use Crop to keep only that."] },
      { title: "Title my drawing 🅰️", steps: ["Add a Text box at the top.", "Type a name for your drawing in big bold letters."] },
      { title: "Shape museum 🎭", steps: ["Use 6 different shapes.", "Make a robot, a flower or a face from them."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Which key is for Copy?", options: ["Ctrl+X", "Ctrl+C", "Ctrl+V", "Ctrl+S"], answerIndex: 1 },
      { type: "mcq", question: "Which key is for Paste?", options: ["Ctrl+X", "Ctrl+C", "Ctrl+V", "Ctrl+P"], answerIndex: 2 },
      { type: "mcq", question: "Which key is for Cut?", options: ["Ctrl+C", "Ctrl+X", "Ctrl+V", "Ctrl+S"], answerIndex: 1 },
      { type: "mcq", question: "Which tool lets us pick part of a drawing?", options: ["Pencil", "Brush", "Select", "Eraser"], answerIndex: 2 },
      { type: "tf", question: "Crop removes the un-selected part.", answer: true },
      { type: "tf", question: "Resize changes the picture size on screen only.", answer: false, explanation: "Resize actually changes the drawing." },
      { type: "tf", question: "Copy makes the original disappear.", answer: false },
      { type: "fill", question: "______ tool lets us type text on a drawing.", answer: "Text" },
      { type: "fill", question: "Drag corner handles to ______ a shape.", answer: "resize" },
      { type: "fill", question: "Ctrl + ______ pastes the copied part.", answer: "V" },
      { type: "short", question: "How will you make 10 same flowers quickly?", modelAnswer: "Draw one, select it, copy, then paste 9 times." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Cut + Paste is used when we want to ____.", options: ["duplicate", "move", "delete", "save"], answerIndex: 1 },
      { type: "mcq", question: "Crop is used to ____.", options: ["keep only the selected part", "duplicate", "save", "print"], answerIndex: 0 },
      { type: "mcq", question: "Which tool lets us draw a perfect circle?", options: ["Pencil", "Shapes", "Brush", "Text"], answerIndex: 1 },
      { type: "mcq", question: "Free-form selection lets us pick ____.", options: ["only rectangles", "any irregular shape", "only circles", "nothing"], answerIndex: 1 },
      { type: "mcq", question: "Which key combo cuts the selection?", options: ["Ctrl+X", "Ctrl+C", "Ctrl+V", "Ctrl+Z"], answerIndex: 0 },
      { type: "mcq", question: "Text tool is shown by which letter?", options: ["A", "B", "C", "T"], answerIndex: 0 },
      { type: "mcq", question: "Which is NOT a Paint shape?", options: ["Star", "Heart", "Arrow", "Phone"], answerIndex: 3 },
      { type: "tf", question: "Pasted item can be moved to a new place.", answer: true },
      { type: "tf", question: "Resize lets us change height and width.", answer: true },
      { type: "fill", question: "Ctrl + ______ copies the selection.", answer: "C" },
    ],
  },
  lab: { type: "paint", instructions: "Open the Paint editor in the Coding Lab and try Select, Copy, Paste and Crop." },
};
export default content;
