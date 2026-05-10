import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Make PowerPoint presentations come alive with charts, sound, video, animations and slide transitions.",
    objectives: [
      "Insert charts, audio and video.",
      "Apply animations to objects.",
      "Use transitions between slides.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "📊 Charts", body: "Insert → Chart. Choose bar, pie, line. Edit data in the mini Excel that opens." },
      { heading: "🎵 Audio & 🎬 Video", body: "Insert → Audio / Video. Add background music or a tutorial video to your slide." },
      { heading: "✨ Animations", body: "Animations tab. Make text/images Appear, Fly In, Fade or Bounce on click." },
      { heading: "🔁 Transitions", body: "Transitions tab. Effect that plays BETWEEN slides — Fade, Push, Wipe, Morph." },
      { heading: "🎯 Tip", body: "Use animations sparingly — too many distract from your message." },
    ],
  },
  images: {
    items: [
      { emoji: "📊", caption: "Pie chart slide." },
      { emoji: "🎵", caption: "Audio inserted." },
      { emoji: "🎬", caption: "Video on slide." },
      { emoji: "✨", caption: "Animated text." },
      { emoji: "🔁", caption: "Slide transition." },
      { emoji: "🎯", caption: "Polished deck." },
    ],
  },
  activities: {
    items: [
      { title: "Pie Chart Slide 📊", steps: ["New slide.", "Insert → Chart → Pie.", "Type 4 categories with numbers."] },
      { title: "Add a Song 🎵", steps: ["Insert → Audio → My PC.", "Pick a music file.", "Play in slideshow."] },
      { title: "Animate Title ✨", steps: ["Click title.", "Animations → Fly In.", "Preview."] },
      { title: "Cool Transition 🔁", steps: ["Select 3 slides.", "Transitions → Fade.", "Apply to All."] },
      { title: "Mini Movie 🎬", steps: ["Insert short video.", "Resize to fill slide.", "Run slideshow."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Pie chart shows…", options: ["Time series", "Parts of a whole", "Map", "Text"], answerIndex: 1 },
      { type: "tf", question: "Transitions play BETWEEN slides.", answer: true },
      { type: "fill", question: "Animations are applied to ___.", answer: "objects" },
      { type: "mcq", question: "To insert music use…", options: ["Insert → Audio", "Home → Bold", "Design → Theme", "View → Zoom"], answerIndex: 0 },
      { type: "tf", question: "Bar chart uses bars to compare values.", answer: true },
      { type: "fill", question: "Slide transition tab is called ___.", answer: "Transitions" },
      { type: "mcq", question: "Fly In is a type of…", options: ["Transition", "Animation", "Chart", "Theme"], answerIndex: 1 },
      { type: "tf", question: "Videos cannot be added in PowerPoint.", answer: false },
      { type: "mcq", question: "Apply same transition to all slides via…", options: ["Apply to All", "Save All", "Copy", "Print"], answerIndex: 0 },
      { type: "fill", question: "Charts data is edited in a mini ___.", answer: "Excel" },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Best chart for percentages of a whole?", options: ["Line", "Pie", "Bar", "Area"], answerIndex: 1 },
      { type: "mcq", question: "Where do you add animations?", options: ["Animations tab", "Home tab", "View tab", "File tab"], answerIndex: 0 },
      { type: "tf", question: "A transition affects a single object.", answer: false },
      { type: "fill", question: "___ tab inserts charts and media.", answer: "Insert" },
      { type: "mcq", question: "Which is NOT an animation?", options: ["Fade", "Fly In", "Bounce", "A4"], answerIndex: 3 },
      { type: "mcq", question: "Audio insert allows…", options: ["Music files", "Excel sheet", "PDF", "Database"], answerIndex: 0 },
      { type: "tf", question: "Morph is a slide transition.", answer: true },
      { type: "fill", question: "Avoid too many ___ — they distract.", answer: "animations" },
      { type: "mcq", question: "Line chart is best for…", options: ["Trends over time", "Maps", "Single value", "Photos"], answerIndex: 0 },
      { type: "tf", question: "Charts cannot be edited after insertion.", answer: false },
    ],
  },
};
export default content;
