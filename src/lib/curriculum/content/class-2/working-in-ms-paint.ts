import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Now let's learn more tools in MS Paint — shapes, undo, zoom, and how to save and open our drawings.",
    objectives: [
      "Use 5+ tools in Paint with confidence.",
      "Undo a mistake and zoom into a drawing.",
      "Save and open a Paint file.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🛠️ Tools we already know", body: "Pencil, Brush, Fill, Eraser, Text, Shapes, Color box." },
      { heading: "✨ New tools", body: "Some helpful new buttons.", bullets: [
        "↩️ UNDO — go back one step.",
        "↪️ REDO — bring back what was undone.",
        "🔍 ZOOM IN/OUT — see your drawing closer or farther.",
        "🔁 ROTATE — turn shapes left or right.",
        "🪞 FLIP — mirror a shape.",
      ] },
      { heading: "📁 File Menu", body: "Use FILE → New / Open / Save / Save As / Print." },
      { heading: "💾 Save vs Save As", body: "SAVE keeps the file with the same name. SAVE AS lets you give it a NEW name." },
      { heading: "💡 Tip", body: "Save your work every few minutes — never lose a great drawing!" },
    ],
  },
  images: {
    items: [
      { emoji: "↩️", caption: "Undo — fix a mistake." },
      { emoji: "🔍", caption: "Zoom — see closer." },
      { emoji: "🔁", caption: "Rotate the shape." },
      { emoji: "🪞", caption: "Flip — mirror image." },
      { emoji: "💾", caption: "Save your drawing." },
      { emoji: "🖨️", caption: "Print on paper." },
    ],
  },
  activities: {
    items: [
      { title: "Undo race ↩️", steps: ["Draw 5 lines.", "Press Undo 5 times.", "Drawing disappears!"] },
      { title: "Mirror world 🪞", steps: ["Draw half a butterfly.", "Use FLIP to make the other half."] },
      { title: "Zoom and detail 🔍", steps: ["Zoom in.", "Add tiny details to a face you drew."] },
      { title: "Save with two names 💾", steps: ["Save your file as 'art1'.", "Use Save As to also save as 'art2'."] },
      { title: "Mini gallery 🖼️", steps: ["Make 3 different drawings.", "Save each with a different name."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Which tool reverses the last action?", options: ["Redo", "Undo", "Save", "Open"], answerIndex: 1 },
      { type: "mcq", question: "Which menu has the Save option?", options: ["Edit", "File", "View", "Help"], answerIndex: 1 },
      { type: "mcq", question: "Which tool makes the drawing look bigger on screen?", options: ["Brush", "Zoom in", "Undo", "Eraser"], answerIndex: 1 },
      { type: "mcq", question: "FLIP makes a shape ____.", options: ["mirror", "rounder", "darker", "smaller"], answerIndex: 0 },
      { type: "tf", question: "Save As lets us use a new name.", answer: true },
      { type: "tf", question: "Undo and Redo do the same thing.", answer: false },
      { type: "tf", question: "Zoom changes the size of the drawing on paper.", answer: false, explanation: "Zoom only changes how you SEE it on screen." },
      { type: "fill", question: "______ rotates a shape left or right.", answer: "Rotate" },
      { type: "fill", question: "We use ______ to send our drawing to paper.", answer: "Print" },
      { type: "fill", question: "Save is found in the ______ menu.", answer: "File" },
      { type: "short", question: "Why should we save often?", modelAnswer: "So we do not lose our work if the computer closes." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Save As is used when we want a ____.", options: ["new name", "new colour", "new computer", "new pencil"], answerIndex: 0 },
      { type: "mcq", question: "Which key shortcut undoes a step?", options: ["Ctrl+Z", "Ctrl+S", "Ctrl+P", "Ctrl+N"], answerIndex: 0 },
      { type: "mcq", question: "Which key shortcut saves a file?", options: ["Ctrl+Z", "Ctrl+S", "Ctrl+P", "Ctrl+O"], answerIndex: 1 },
      { type: "mcq", question: "Print is used to put work on ____.", options: ["screen", "paper", "wall", "fridge"], answerIndex: 1 },
      { type: "mcq", question: "Which option opens an existing file?", options: ["New", "Open", "Save", "Exit"], answerIndex: 1 },
      { type: "mcq", question: "Zoom Out makes the drawing look ____.", options: ["bigger", "smaller", "darker", "wider"], answerIndex: 1 },
      { type: "mcq", question: "Mirror image is made using ____.", options: ["Rotate", "Flip", "Brush", "Pencil"], answerIndex: 1 },
      { type: "tf", question: "Redo brings back what Undo removed.", answer: true },
      { type: "tf", question: "Paint can save drawings as picture files.", answer: true },
      { type: "fill", question: "______ rotates the picture.", answer: "Rotate" },
    ],
  },
  lab: {
    type: "paint",
    instructions: "Open the Paint editor in the Coding Lab. Try Undo, Redo, Save and Flip.",
  },
};
export default content;
