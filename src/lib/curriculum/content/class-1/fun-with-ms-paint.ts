import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary:
      "MS Paint is a fun program where we can draw, paint and colour using the computer. No paper, no mess — just fun!",
    objectives: [
      "Open and close MS Paint.",
      "Use the pencil, brush, eraser and fill tools.",
      "Draw simple shapes and colour them.",
    ],
    duration: "20 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      {
        heading: "🎨 What is MS Paint?",
        body: "MS Paint is a drawing program made for computers. It comes free with Windows. We can draw lines, shapes and pictures and colour them.",
      },
      {
        heading: "How to Open MS Paint",
        body: "Click the START button → All Programs → Accessories → Paint. A blank white canvas opens — your drawing paper!",
      },
      {
        heading: "Main Tools 🛠️",
        body: "These tools are our crayons and pencils on the computer.",
        bullets: [
          "✏️ PENCIL — draw thin lines.",
          "🖌️ BRUSH — paint thick strokes.",
          "🧽 ERASER — rub out mistakes.",
          "🪣 FILL WITH COLOR — fill a shape with one click.",
          "🅰️ TEXT — type words on the picture.",
          "🔷 SHAPES — draw circle, square, star and more.",
        ],
      },
      {
        heading: "Colour Box 🎨",
        body: "At the top of Paint there is a row of colours. Click any colour, then draw — your line will be in that colour!",
      },
      {
        heading: "💡 Save Your Work",
        body: "Click File → Save. Give your picture a name. Now you can open it later!",
      },
      {
        heading: "🎯 Fun Fact",
        body: "MS Paint has been on Windows computers for more than 35 years!",
      },
    ],
  },
  images: {
    items: [
      { emoji: "🎨", caption: "MS Paint icon." },
      { emoji: "✏️", caption: "Pencil tool — thin lines." },
      { emoji: "🖌️", caption: "Brush tool — thick strokes." },
      { emoji: "🪣", caption: "Fill tool — fill colour with one click." },
      { emoji: "🧽", caption: "Eraser — rub out mistakes." },
      { emoji: "🔷", caption: "Shapes — circles, squares, stars and more." },
    ],
  },
  activities: {
    items: [
      {
        title: "Draw a sun ☀️",
        steps: [
          "Open MS Paint.",
          "Pick the BRUSH tool and yellow colour.",
          "Draw a circle and add small lines around it.",
          "Use FILL to colour the inside yellow.",
        ],
        expectedOutcome: "A bright yellow sun!",
      },
      {
        title: "My house 🏠",
        steps: [
          "Use SHAPES → square for the wall.",
          "Use SHAPES → triangle for the roof.",
          "Add a small square for the door and 2 windows.",
          "Colour them with the FILL tool.",
        ],
      },
      {
        title: "Rainbow time 🌈",
        steps: [
          "Pick the BRUSH tool.",
          "Draw 7 curved lines on top of each other.",
          "Use a different colour for each line.",
        ],
      },
      {
        title: "My name in Paint 🅰️",
        steps: [
          "Click the TEXT tool (A).",
          "Click on the canvas and type your name.",
          "Pick a fun colour for your name.",
        ],
      },
      {
        title: "Erase challenge 🧽",
        steps: [
          "Draw any messy doodle.",
          "Use the ERASER to clean half of it.",
          "Then redraw something nicer in the empty space.",
        ],
      },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "MS Paint is used for ______.", options: ["typing letters", "drawing pictures", "playing songs", "watching videos"], answerIndex: 1 },
      { type: "mcq", question: "Which tool fills a closed shape with colour?", options: ["Pencil", "Brush", "Fill with Color", "Eraser"], answerIndex: 2 },
      { type: "mcq", question: "Which tool is used to remove a mistake?", options: ["Brush", "Eraser", "Pencil", "Text"], answerIndex: 1 },
      { type: "mcq", question: "Which tool draws thin lines?", options: ["Pencil", "Brush", "Fill", "Shapes"], answerIndex: 0 },
      { type: "tf", question: "We can save our Paint pictures.", answer: true },
      { type: "tf", question: "MS Paint is only black and white.", answer: false, explanation: "MS Paint has many colours!" },
      { type: "tf", question: "The Text tool lets us type words on a drawing.", answer: true },
      { type: "fill", question: "MS Paint has a ______ box at the top to pick colours.", answer: "color" },
      { type: "fill", question: "The ______ tool paints with thick strokes.", answer: "brush" },
      { type: "fill", question: "We use ______ tools to draw squares, circles and stars.", answer: "shapes" },
      { type: "short", question: "Name two tools in MS Paint.", modelAnswer: "Pencil and Brush (or Eraser, Fill, Text, Shapes)." },
    ],
  },
  quiz: {
    passScore: 60,
    timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which menu has the Save option?", options: ["Help", "Edit", "File", "View"], answerIndex: 2 },
      { type: "mcq", question: "Which tool helps draw a perfect circle?", options: ["Pencil", "Brush", "Shapes", "Eraser"], answerIndex: 2 },
      { type: "mcq", question: "Which tool would you use to colour the whole sky blue?", options: ["Pencil", "Fill with Color", "Eraser", "Text"], answerIndex: 1 },
      { type: "mcq", question: "The white area where we draw is called the ______.", options: ["canvas", "page", "screen", "window"], answerIndex: 0 },
      { type: "mcq", question: "Which tool puts letters on a drawing?", options: ["Brush", "Text", "Pencil", "Fill"], answerIndex: 1 },
      { type: "mcq", question: "MS Paint comes free with which operating system?", options: ["Windows", "Linux only", "Android", "iOS"], answerIndex: 0 },
      { type: "mcq", question: "Which tool gives a thicker line than a pencil?", options: ["Eraser", "Brush", "Text", "Fill"], answerIndex: 1 },
      { type: "tf", question: "We can change the colour of the pencil.", answer: true },
      { type: "tf", question: "Once a Paint picture is closed, it cannot be opened again.", answer: false },
      { type: "fill", question: "The ______ tool removes parts of the drawing.", answer: "eraser" },
    ],
  },
  lab: {
    type: "paint",
    instructions: "Open the Paint editor in the Coding Lab to practice drawing.",
  },
};

export default content;
