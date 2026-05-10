import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Go deeper into GIMP — work with layers, apply filters and use selections to edit images like a pro.",
    objectives: [
      "Create and reorder layers.",
      "Apply filters and effects.",
      "Use rectangle, ellipse and free selection.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🧱 Layers", body: "Think of layers as transparent sheets stacked on top of each other. Edit one without touching others." },
      { heading: "➕ Layer ops", body: "Use the Layers panel.", bullets: [
        "New Layer", "Duplicate", "Delete", "Move Up/Down", "Opacity slider", "Blend mode",
      ] },
      { heading: "✨ Filters", body: "Filters menu has ready effects:", bullets: [
        "Blur → Gaussian Blur", "Distorts → Whirl", "Light & Shadow → Drop Shadow",
        "Artistic → Cartoon", "Decor → Add Border",
      ] },
      { heading: "🎯 Selection Tools", body: "Rectangle, Ellipse, Free (lasso), Fuzzy (magic wand). Edit only the selected area." },
      { heading: "💡 Tip", body: "Always work on a duplicate layer so the original stays safe." },
    ],
  },
  images: {
    items: [
      { emoji: "🧱", caption: "Layer stack." },
      { emoji: "✨", caption: "Filters menu." },
      { emoji: "🎯", caption: "Selection tools." },
      { emoji: "🪞", caption: "Blur filter." },
      { emoji: "🖼️", caption: "Drop shadow." },
      { emoji: "🪄", caption: "Magic wand." },
    ],
  },
  activities: {
    items: [
      { title: "Two layers 🧱", steps: ["Open photo.", "Add new transparent layer.", "Draw on top with brush."] },
      { title: "Blur it 🪞", steps: ["Filters → Blur → Gaussian Blur.", "Set radius 10."] },
      { title: "Cutout 🎯", steps: ["Rectangle Select.", "Edit → Copy.", "Paste as new image."] },
      { title: "Drop shadow 🖼️", steps: ["Select an object layer.", "Filters → Light & Shadow → Drop Shadow."] },
      { title: "Magic wand 🪄", steps: ["Pick Fuzzy Select.", "Click sky → only sky selected.", "Fill with new color."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Layers act like…", options: ["Pages", "Transparent sheets", "Folders", "Files"], answerIndex: 1 },
      { type: "fill", question: "Filters menu has ___ effects.", answer: "ready-made" },
      { type: "tf", question: "Each layer can be edited separately.", answer: true },
      { type: "mcq", question: "Magic wand in GIMP is…", options: ["Fuzzy Select", "Rectangle", "Ellipse", "Crop"], answerIndex: 0 },
      { type: "fill", question: "Gaussian ___ softens an image.", answer: "Blur" },
      { type: "mcq", question: "Drop shadow is in…", options: ["Filters → Light & Shadow", "Filters → Blur", "Tools", "View"], answerIndex: 0 },
      { type: "tf", question: "Opacity controls transparency.", answer: true },
      { type: "fill", question: "Layers panel order: top is ___ in front.", answer: "most" },
      { type: "mcq", question: "Best to select irregular shapes?", options: ["Rectangle", "Ellipse", "Free Select", "Crop"], answerIndex: 2 },
      { type: "tf", question: "Filters cannot be undone.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "To edit only one part of image use…", options: ["Selection tool", "Save", "Print", "Zoom"], answerIndex: 0 },
      { type: "mcq", question: "Layer with 50% opacity is…", options: ["Invisible", "Fully visible", "Half transparent", "Empty"], answerIndex: 2 },
      { type: "tf", question: "Filters are non-destructive in GIMP by default.", answer: false },
      { type: "fill", question: "Cartoon effect is in Filters → ___.", answer: "Artistic" },
      { type: "mcq", question: "Move a layer above another via…", options: ["Layers panel arrows", "File menu", "Edit menu", "Tools"], answerIndex: 0 },
      { type: "mcq", question: "Best to add a fancy frame?", options: ["Decor → Add Border", "Crop", "Scale", "Rotate"], answerIndex: 0 },
      { type: "tf", question: "Selections limit what filters affect.", answer: true },
      { type: "fill", question: "Duplicate the layer to keep original ___.", answer: "safe" },
      { type: "mcq", question: "Whirl is a…", options: ["Filter", "Tool", "Layer mode", "Color"], answerIndex: 0 },
      { type: "tf", question: "Fuzzy Select selects by color similarity.", answer: true },
    ],
  },
  lab: { type: "paint", instructions: "Practice multi-layer composition in our paint editor — base, drawing, accents." },
};
export default content;
