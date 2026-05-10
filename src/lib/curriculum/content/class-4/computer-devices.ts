import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Computer devices help us put data IN, get results OUT and move data around. Let's meet the most common ones.",
    objectives: [
      "Classify devices as input, output or both.",
      "Identify scanner, webcam, projector and printer.",
      "Match each device to its everyday use.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "📥 Input Devices", body: "Send data INTO the computer.", bullets: [
        "Keyboard — types text",
        "Mouse — points and clicks",
        "Microphone — records sound",
        "Webcam — captures video",
        "Scanner — copies a paper into the computer",
        "Joystick — for games",
      ] },
      { heading: "📤 Output Devices", body: "Show or play results FROM the computer.", bullets: [
        "Monitor — shows pictures",
        "Speaker / headphones — play sound",
        "Printer — prints on paper",
        "Projector — shows on a wall",
        "Plotter — prints big drawings/maps",
      ] },
      { heading: "🔁 Both Input & Output", body: "Some devices do BOTH:", bullets: [
        "Touch screen", "Modem", "Network card", "Headset (mic + speaker)",
      ] },
      { heading: "💡 Did you know?", body: "A barcode scanner reads black-white lines on products and sends the price to the computer." },
    ],
  },
  images: {
    items: [
      { emoji: "📷", caption: "Webcam — input." },
      { emoji: "🎤", caption: "Microphone — input." },
      { emoji: "📠", caption: "Scanner — input." },
      { emoji: "🖨️", caption: "Printer — output." },
      { emoji: "📽️", caption: "Projector — output." },
      { emoji: "🎧", caption: "Headset — both!" },
    ],
  },
  activities: {
    items: [
      { title: "Sort the devices 🗂️", steps: ["List 8 devices.", "Make 3 columns: Input / Output / Both.", "Put each in the right column."] },
      { title: "Daily devices 🏠", steps: ["Walk around your home.", "Find 5 input/output devices.", "Note what each is used for."] },
      { title: "Webcam wave 👋", steps: ["Open the camera app.", "Wave at the webcam.", "Notice your video on screen."] },
      { title: "Print test 🖨️", steps: ["Open Notepad.", "Type your name.", "Print it (or print preview)."] },
      { title: "Match game 🎯", steps: ["Match: Joystick → games, Mic → voice, Speaker → sound, Printer → paper."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Webcam is which kind?", options: ["Input", "Output", "Both", "None"], answerIndex: 0 },
      { type: "mcq", question: "Projector is which kind?", options: ["Input", "Output", "Both", "None"], answerIndex: 1 },
      { type: "mcq", question: "Touch screen is which kind?", options: ["Input only", "Output only", "Both", "None"], answerIndex: 2 },
      { type: "mcq", question: "Plotter prints ____.", options: ["small text", "big drawings/maps", "movies", "songs"], answerIndex: 1 },
      { type: "tf", question: "Joystick is mostly used for games.", answer: true },
      { type: "tf", question: "Speaker is an input device.", answer: false },
      { type: "tf", question: "Headset has both microphone and speaker.", answer: true },
      { type: "fill", question: "Scanner copies ______ into the computer.", answer: "paper" },
      { type: "fill", question: "Printer puts work onto ______.", answer: "paper" },
      { type: "fill", question: "Microphone takes in ______.", answer: "sound" },
      { type: "short", question: "Name two devices that are both input and output.", modelAnswer: "Touch screen and Headset." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which is NOT an input device?", options: ["Mouse", "Scanner", "Speaker", "Microphone"], answerIndex: 2 },
      { type: "mcq", question: "Which is NOT an output device?", options: ["Monitor", "Speaker", "Printer", "Joystick"], answerIndex: 3 },
      { type: "mcq", question: "Barcode reader sends the ____ to the computer.", options: ["price", "song", "movie", "weather"], answerIndex: 0 },
      { type: "mcq", question: "Projector shows pictures on a ____.", options: ["plate", "wall/screen", "fridge", "table"], answerIndex: 1 },
      { type: "mcq", question: "Plotter is best for printing ____.", options: ["small letters", "maps and big drawings", "songs", "videos"], answerIndex: 1 },
      { type: "mcq", question: "Touch screen does ____.", options: ["only input", "only output", "both input and output", "neither"], answerIndex: 2 },
      { type: "mcq", question: "Modem is used to ____.", options: ["print", "scan", "connect to internet", "play games"], answerIndex: 2 },
      { type: "tf", question: "Webcam is an output device.", answer: false },
      { type: "tf", question: "Speakers and headphones are output devices.", answer: true },
      { type: "fill", question: "______ is used to record voice.", answer: "Microphone" },
    ],
  },
  lab: { type: "none" },
};
export default content;
