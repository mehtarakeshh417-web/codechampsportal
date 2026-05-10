import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "GIMP is a free image editor. Learn its workspace, tools and how to make basic edits like crop, resize and color adjustments.",
    objectives: [
      "Identify GIMP toolbox tools.",
      "Open, crop and resize images.",
      "Save in different formats.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🖼️ What is GIMP?", body: "GNU Image Manipulation Program — free, open-source image editor (Photoshop alternative)." },
      { heading: "🧰 Workspace", body: "Toolbox (left), Image window (center), Layers/Brushes panels (right), Menu bar on top." },
      { heading: "✂️ Common Tools", body: "Move, Rectangle Select, Crop, Brush, Pencil, Eraser, Bucket Fill, Text, Color Picker." },
      { heading: "📏 Crop & Resize", body: "Image → Canvas Size or Image → Scale Image to resize. Tools → Transform Tools → Crop." },
      { heading: "💾 Export", body: "GIMP saves as .xcf (its own format). To get .jpg / .png use File → Export As." },
    ],
  },
  images: {
    items: [
      { emoji: "🖼️", caption: "GIMP logo." },
      { emoji: "🧰", caption: "Toolbox." },
      { emoji: "✂️", caption: "Crop tool." },
      { emoji: "📏", caption: "Scale image." },
      { emoji: "🎨", caption: "Bucket fill." },
      { emoji: "💾", caption: "Export As JPG." },
    ],
  },
  activities: {
    items: [
      { title: "Open & crop ✂️", steps: ["Open any photo.", "Tools → Crop.", "Drag a rectangle, press Enter."] },
      { title: "Resize 📏", steps: ["Image → Scale Image.", "Set width 800px (height auto).", "Scale."] },
      { title: "Bucket fill 🎨", steps: ["Open new 500×500 white image.", "Pick blue color.", "Bucket fill."] },
      { title: "Add text 🅰️", steps: ["Pick Text tool.", "Click on image, type your name.", "Choose font + color."] },
      { title: "Export PNG 💾", steps: ["File → Export As.", "Type 'art.png'.", "Click Export."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "GIMP stands for…", options: ["GNU Image Manipulation Program", "Good Image Maker", "Graphic Image MP", "General Image Painter"], answerIndex: 0 },
      { type: "tf", question: "GIMP is paid software.", answer: false },
      { type: "fill", question: "GIMP's native format is ___.", answer: ".xcf" },
      { type: "mcq", question: "To save as PNG use…", options: ["Save", "Export As", "Print", "Open"], answerIndex: 1 },
      { type: "fill", question: "Tool to remove pixels is the ___.", answer: "Eraser" },
      { type: "mcq", question: "Resize via…", options: ["Image → Scale Image", "File → Save", "Edit → Cut", "View → Zoom"], answerIndex: 0 },
      { type: "tf", question: "Bucket Fill fills a region with one color.", answer: true },
      { type: "fill", question: "Move tool moves the selected ___.", answer: "layer" },
      { type: "mcq", question: "Crop is in…", options: ["Tools → Transform → Crop", "File menu", "Filters menu", "View menu"], answerIndex: 0 },
      { type: "tf", question: "Color Picker copies a color from the image.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "GIMP is alternative to…", options: ["MS Word", "Photoshop", "Excel", "VLC"], answerIndex: 1 },
      { type: "mcq", question: "Which is NOT a tool?", options: ["Brush", "Pencil", "Calculator", "Eraser"], answerIndex: 2 },
      { type: "tf", question: "Toolbox is on the left side.", answer: true },
      { type: "fill", question: "Type letters using the ___ tool.", answer: "Text" },
      { type: "mcq", question: "To export JPG use…", options: ["Save", "Save As", "Export As", "Print"], answerIndex: 2 },
      { type: "mcq", question: "Image → Scale Image will…", options: ["Crop", "Resize", "Rotate", "Save"], answerIndex: 1 },
      { type: "tf", question: ".xcf is a Photoshop format.", answer: false },
      { type: "fill", question: "Bucket Fill fills with the ___ color.", answer: "foreground" },
      { type: "mcq", question: "Crop reduces…", options: ["File size only", "Image area", "Color", "Layers"], answerIndex: 1 },
      { type: "tf", question: "GIMP supports layers.", answer: true },
    ],
  },
  lab: { type: "paint", instructions: "Sketch and color a simple scene in the in-browser paint editor as a GIMP warm-up." },
};
export default content;
