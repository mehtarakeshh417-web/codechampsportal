import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary:
      "A computer has many parts that work together. Let's meet the four main parts: monitor, CPU, keyboard and mouse.",
    objectives: [
      "Name the four main parts of a computer.",
      "Tell one job each part does.",
      "Identify each part in a real computer.",
    ],
    duration: "20 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      {
        heading: "🖥️ Monitor",
        body: "The monitor looks like a TV. It shows us pictures, videos, words and games.",
        bullets: ["It is the OUTPUT part — it gives us things to see.", "Without a monitor we cannot see what the computer is doing."],
      },
      {
        heading: "📦 CPU (Central Processing Unit)",
        body: "The CPU is the brain of the computer. It thinks, calculates and tells other parts what to do.",
        bullets: ["It is hidden inside a box.", "It makes the computer FAST and SMART."],
      },
      {
        heading: "⌨️ Keyboard",
        body: "The keyboard has buttons called keys. We use it to TYPE letters, numbers and symbols.",
        bullets: ["It is an INPUT part — we give input to the computer."],
      },
      {
        heading: "🖱️ Mouse",
        body: "The mouse is small and round. We use it to point and click on the screen.",
        bullets: ["It is also an INPUT part.", "Move it on the table — the arrow on the screen moves too!"],
      },
      {
        heading: "🔊 Speakers (extra)",
        body: "Speakers let us HEAR sound, music and voices from the computer.",
      },
      {
        heading: "💡 Did you know?",
        body: "Input parts SEND things to the computer. Output parts SHOW or PLAY things from the computer.",
      },
    ],
  },
  images: {
    items: [
      { emoji: "🖥️", caption: "Monitor — shows pictures and words." },
      { emoji: "📦", caption: "CPU — the brain of the computer." },
      { emoji: "⌨️", caption: "Keyboard — for typing letters and numbers." },
      { emoji: "🖱️", caption: "Mouse — for pointing and clicking." },
      { emoji: "🔊", caption: "Speakers — for hearing sound." },
      { emoji: "🖨️", caption: "Printer — for printing on paper." },
    ],
  },
  activities: {
    items: [
      {
        title: "Find the part 🔍",
        steps: [
          "Look at a real or picture of a computer.",
          "Point to the monitor, CPU, keyboard and mouse one by one.",
          "Say the name of each part loudly.",
        ],
        expectedOutcome: "You can name all 4 main parts.",
      },
      {
        title: "Label me! 🏷️",
        steps: [
          "Draw a computer on paper.",
          "Write the name of each part with an arrow.",
        ],
      },
      {
        title: "Input or Output? 🎯",
        steps: [
          "Take 4 small papers.",
          "Write a part name on each: monitor, CPU, keyboard, mouse.",
          "Put them in two groups: INPUT and OUTPUT.",
        ],
        expectedOutcome: "Keyboard + Mouse → INPUT. Monitor → OUTPUT. CPU → both!",
      },
      {
        title: "Mime time 🎭",
        steps: [
          "Without speaking, act like a part of the computer.",
          "Let your friends guess which part you are.",
        ],
      },
      {
        title: "Color the parts 🎨",
        steps: [
          "Print or draw a computer outline.",
          "Colour the monitor blue, CPU yellow, keyboard green, mouse red.",
        ],
      },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Which part is the brain of the computer?", options: ["Monitor", "Mouse", "CPU", "Keyboard"], answerIndex: 2 },
      { type: "mcq", question: "Which part shows us pictures?", options: ["Monitor", "Keyboard", "CPU", "Speaker"], answerIndex: 0 },
      { type: "mcq", question: "Which part is used to TYPE?", options: ["Mouse", "Keyboard", "Monitor", "CPU"], answerIndex: 1 },
      { type: "mcq", question: "We use the ______ to point and click.", options: ["mouse", "keyboard", "speaker", "printer"], answerIndex: 0 },
      { type: "tf", question: "The CPU is the brain of the computer.", answer: true },
      { type: "tf", question: "A keyboard is used to listen to music.", answer: false, explanation: "Speakers are used to listen to music." },
      { type: "tf", question: "We can hear sound from speakers.", answer: true },
      { type: "fill", question: "The ______ shows pictures, videos and words.", answer: "monitor" },
      { type: "fill", question: "The ______ has many keys to type.", answer: "keyboard" },
      { type: "fill", question: "The ______ is used to point and click.", answer: "mouse" },
      { type: "short", question: "Name the four main parts of a computer.", modelAnswer: "Monitor, CPU, Keyboard, Mouse." },
    ],
  },
  quiz: {
    passScore: 60,
    timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which is an OUTPUT part of a computer?", options: ["Keyboard", "Mouse", "Monitor", "Microphone"], answerIndex: 2 },
      { type: "mcq", question: "Which is an INPUT part of a computer?", options: ["Monitor", "Speaker", "Keyboard", "Printer"], answerIndex: 2 },
      { type: "mcq", question: "Which part looks like a TV?", options: ["CPU", "Monitor", "Mouse", "Keyboard"], answerIndex: 1 },
      { type: "mcq", question: "Where is the CPU usually kept?", options: ["Inside a box", "On the wall", "Under a chair", "In the bag"], answerIndex: 0 },
      { type: "mcq", question: "Which part has alphabet keys?", options: ["Mouse", "Keyboard", "Monitor", "Speaker"], answerIndex: 1 },
      { type: "mcq", question: "Which part of a computer makes the arrow on screen move?", options: ["Mouse", "Speaker", "Printer", "Monitor"], answerIndex: 0 },
      { type: "mcq", question: "The CPU is also called the ______ of the computer.", options: ["face", "brain", "leg", "tail"], answerIndex: 1 },
      { type: "tf", question: "Without a monitor we can still see the computer's pictures.", answer: false },
      { type: "tf", question: "A keyboard and a mouse are both INPUT parts.", answer: true },
      { type: "fill", question: "Speakers help us to ______ sound.", answer: "hear" },
    ],
  },
  lab: { type: "none", instructions: "Practice naming parts on a real computer instead of using a coding lab." },
};

export default content;
