import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Layers help organize art; animation strings frames together. Learn how Krita does both.",
    objectives: ["Manage layers and groups.", "Create a frame-by-frame animation.", "Export animation as GIF/MP4."],
    duration: "30 min", difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🧱 Layers", body: "Stack of transparent sheets. Use Add Paint Layer, Group, Lock, Visibility, Opacity, Blend Mode." },
      { heading: "🎞️ Animation Workspace", body: "Window → Workspace → Animation. Adds Timeline and Animation panels." },
      { heading: "🖼️ Frames", body: "Each timeline cell = one frame. Right-click to insert blank/duplicate frames. Onion-skin shows previous/next frames." },
      { heading: "▶️ Playback", body: "Set FPS in Animation panel (12 or 24 typical). Press Play in Timeline." },
      { heading: "💾 Export", body: "File → Render Animation → Image Sequence (PNG) or Video (needs FFmpeg)." },
    ],
  },
  images: {
    items: [
      { emoji: "🧱", caption: "Layer stack." }, { emoji: "🎞️", caption: "Timeline." },
      { emoji: "🧅", caption: "Onion skin." }, { emoji: "▶️", caption: "Play frames." },
      { emoji: "🖼️", caption: "Frame by frame." }, { emoji: "💾", caption: "Render GIF/MP4." },
    ],
  },
  activities: {
    items: [
      { title: "Two-layer art 🧱", steps: ["Layer 1: sky color.", "Layer 2: outline.", "Toggle visibility."] },
      { title: "4-frame bounce 🎞️", steps: ["Switch to Animation workspace.", "Draw ball at frame 1, 4, 7, 10 — moving down then up."] },
      { title: "Onion skin 🧅", steps: ["Enable Onion Skin.", "Notice ghost frames.", "Refine middle frame."] },
      { title: "Set FPS ⏱️", steps: ["Change FPS to 12.", "Play and observe speed."] },
      { title: "Export GIF 💾", steps: ["Render Animation → Image Sequence.", "Use online tool to combine into GIF."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Each animation cell is a…", options: ["Layer", "Frame", "Pixel", "Brush"], answerIndex: 1 },
      { type: "fill", question: "Onion ___ shows ghost of nearby frames.", answer: "skin" },
      { type: "tf", question: "Krita can do frame-by-frame animation.", answer: true },
      { type: "mcq", question: "Common animation FPS?", options: ["1", "12", "60", "120"], answerIndex: 1 },
      { type: "fill", question: "Stack of art sheets are ___.", answer: "layers" },
      { type: "mcq", question: "Render Animation can output…", options: ["Image sequence", "Video", "Both", "Audio"], answerIndex: 2 },
      { type: "tf", question: "Layers cannot be hidden.", answer: false },
      { type: "fill", question: "Group layers to keep them ___.", answer: "organized" },
      { type: "mcq", question: "Higher FPS makes animation…", options: ["Choppy", "Smoother", "Same", "Smaller"], answerIndex: 1 },
      { type: "tf", question: "Opacity controls layer transparency.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Workspace for animation in Krita?", options: ["Animation", "Painting", "Sketch", "Default"], answerIndex: 0 },
      { type: "mcq", question: "Frame visible above other = top of…", options: ["Timeline", "Layer stack", "Brushes", "Tool list"], answerIndex: 1 },
      { type: "tf", question: "Onion skin helps draw smooth motion.", answer: true },
      { type: "fill", question: "Render video may need ___ installed.", answer: "FFmpeg" },
      { type: "mcq", question: "Duplicate frame action is via…", options: ["Right-click on frame cell", "File menu", "View menu", "Window menu"], answerIndex: 0 },
      { type: "mcq", question: "Layers can have…", options: ["Opacity & blend mode", "Only color", "Only name", "No properties"], answerIndex: 0 },
      { type: "tf", question: "Animation panel shows FPS settings.", answer: true },
      { type: "fill", question: "Locked layer cannot be ___.", answer: "edited" },
      { type: "mcq", question: "GIF is best for…", options: ["Short loops", "Long films", "Spreadsheets", "Print"], answerIndex: 0 },
      { type: "tf", question: "Krita supports vector and raster layers.", answer: true },
    ],
  },
  lab: { type: "paint", instructions: "Sketch a 4-pose bouncing ball storyboard in our paint editor as practice for animation timing." },
};
export default content;
