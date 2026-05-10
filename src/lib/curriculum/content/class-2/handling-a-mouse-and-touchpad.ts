import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "We can point and click in two ways — using a MOUSE or using a TOUCHPAD on a laptop.",
    objectives: [
      "Hold and use a mouse correctly.",
      "Use a touchpad with one and two fingers.",
      "Do click, double-click, right-click and drag with both.",
    ],
    duration: "20 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🖱️ Mouse Recap", body: "A mouse has 2 buttons and a scroll wheel. Move it on the table to move the pointer on screen." },
      { heading: "What is a Touchpad?", body: "A flat square area below the keyboard on a laptop. We slide our finger on it to move the pointer." },
      { heading: "Touchpad Actions ✋", body: "We can do all mouse actions on a touchpad too.", bullets: [
        "TAP once = click.",
        "TAP twice = double-click.",
        "TAP with TWO fingers = right-click.",
        "Slide TWO fingers = scroll.",
      ] },
      { heading: "💡 Tip", body: "Keep your finger CLEAN and DRY. A wet finger does not work on a touchpad." },
      { heading: "⚠️ Important", body: "Don't tap too hard. Touchpads are very sensitive." },
    ],
  },
  images: {
    items: [
      { emoji: "🖱️", caption: "Wired or wireless mouse." },
      { emoji: "💻", caption: "Laptop with a touchpad." },
      { emoji: "👆", caption: "One-finger tap = click." },
      { emoji: "✌️", caption: "Two-finger tap = right-click." },
      { emoji: "↕️", caption: "Two-finger slide = scroll." },
    ],
  },
  activities: {
    items: [
      { title: "Pointer race 🏁", steps: ["Move pointer to all 4 corners using mouse.", "Repeat using touchpad.", "Time yourself!"] },
      { title: "Two-finger scroll 📜", steps: ["Open a long web page.", "Use two-finger slide to scroll up and down."] },
      { title: "Drag a window 🪟", steps: ["Click and hold the title bar.", "Drag the window to a new place.", "Try once with mouse, once with touchpad."] },
      { title: "Right-click test 🖱️", steps: ["Right-click on the desktop.", "Note what menu appears."] },
      { title: "Cleaning time 🧼", steps: ["Wipe the touchpad gently with a clean cloth.", "Notice how it feels smoother!"] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "A touchpad is found on a ____.", options: ["desktop", "laptop", "fridge", "TV"], answerIndex: 1 },
      { type: "mcq", question: "Tap once on a touchpad means ____.", options: ["double-click", "click", "drag", "scroll"], answerIndex: 1 },
      { type: "mcq", question: "Scroll on touchpad is done with ____.", options: ["one finger", "two fingers", "three fingers", "elbow"], answerIndex: 1 },
      { type: "mcq", question: "Right-click on touchpad = ____ tap.", options: ["one finger", "two fingers", "three fingers", "thumb"], answerIndex: 1 },
      { type: "tf", question: "A wet finger works well on a touchpad.", answer: false },
      { type: "tf", question: "Touchpads are very sensitive.", answer: true },
      { type: "tf", question: "You can scroll using a mouse wheel.", answer: true },
      { type: "fill", question: "A mouse has ______ main buttons.", answer: "2" },
      { type: "fill", question: "Tap twice on a touchpad means ______-click.", answer: "double" },
      { type: "fill", question: "Touchpad is below the ______ on a laptop.", answer: "keyboard" },
      { type: "short", question: "Name two ways to right-click on a laptop.", modelAnswer: "Right mouse button OR two-finger tap on touchpad." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which device replaces the mouse on a laptop?", options: ["Speaker", "Touchpad", "Webcam", "Battery"], answerIndex: 1 },
      { type: "mcq", question: "Which finger usually rests on the LEFT mouse button?", options: ["Thumb", "Index", "Middle", "Ring"], answerIndex: 1 },
      { type: "mcq", question: "Sliding two fingers up on a touchpad ____.", options: ["scrolls up", "scrolls down", "minimizes", "shuts down"], answerIndex: 0 },
      { type: "mcq", question: "Dragging means hold and ____.", options: ["sleep", "move", "stop", "shout"], answerIndex: 1 },
      { type: "mcq", question: "What should you NOT do on a touchpad?", options: ["Tap softly", "Slide finger", "Press too hard", "Clean it"], answerIndex: 2 },
      { type: "mcq", question: "Scroll wheel is found on a ____.", options: ["touchpad", "mouse", "monitor", "speaker"], answerIndex: 1 },
      { type: "tf", question: "We can drag with a touchpad.", answer: true },
      { type: "tf", question: "A wireless mouse has no cable.", answer: true },
      { type: "tf", question: "All laptops have touchpads.", answer: true },
      { type: "fill", question: "Tap once = ______.", answer: "click" },
    ],
  },
  lab: { type: "none" },
};
export default content;
