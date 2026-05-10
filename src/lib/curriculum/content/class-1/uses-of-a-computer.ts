import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary:
      "Computers help people in many places — at home, at school, in shops, in hospitals and even in the sky! Let's see where computers are used.",
    objectives: [
      "Name 5 places where computers are used.",
      "Tell one job a computer does at each place.",
      "Understand that computers make our work easier and faster.",
    ],
    duration: "15 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      {
        heading: "Computers at Home 🏠",
        body: "We use computers at home for fun and learning.",
        bullets: [
          "Watch cartoons and movies",
          "Play games",
          "Listen to music",
          "Learn new things",
          "Talk to family on video call",
        ],
      },
      {
        heading: "Computers at School 🏫",
        body: "Computers help us study in many ways.",
        bullets: [
          "Smart classrooms with big screens",
          "Drawing and painting on the computer",
          "Practice spellings and maths",
          "Read story books online",
        ],
      },
      {
        heading: "Computers in Shops 🛒",
        body: "Shopkeepers use computers to bill our items and keep a list of things in the shop.",
      },
      {
        heading: "Computers in Hospitals 🏥",
        body: "Doctors use computers to keep patient records, see X-rays and find out what is wrong.",
      },
      {
        heading: "Computers in Banks 🏦",
        body: "Banks use computers to keep our money safe and to give cash from ATMs.",
      },
      {
        heading: "Computers in Travel ✈️",
        body: "Computers book train and plane tickets and even help fly airplanes safely.",
      },
    ],
  },
  images: {
    items: [
      { emoji: "🏠", caption: "At home — for fun, learning and chatting." },
      { emoji: "🏫", caption: "At school — for smart classes and drawing." },
      { emoji: "🛒", caption: "In shops — for billing and stock." },
      { emoji: "🏥", caption: "In hospitals — for patient records." },
      { emoji: "🏦", caption: "In banks — for safe money work." },
      { emoji: "✈️", caption: "In travel — for booking tickets." },
    ],
  },
  activities: {
    items: [
      {
        title: "Spot the computer 🔎",
        steps: [
          "Walk around your home with an elder.",
          "Point at every computer-like device you see.",
          "Make a small list in your notebook.",
        ],
        expectedOutcome: "You can find at least 3 computers around you.",
      },
      {
        title: "Match the place 🧩",
        steps: [
          "On paper, draw a school, a shop and a hospital.",
          "Next to each, draw what the computer does there.",
        ],
      },
      {
        title: "Storytime 📖",
        steps: [
          "Tell a small story to your family: 'A day without computers'.",
          "Try to think of 3 things that would be hard.",
        ],
      },
      {
        title: "Cartoon vote 🎬",
        steps: [
          "Ask 3 family members which cartoon they like to watch on a computer.",
          "Make a small chart of votes.",
        ],
      },
      {
        title: "Thank you note 💌",
        steps: [
          "Draw a thank you card for a computer.",
          "Write one line about how it helps you.",
        ],
        expectedOutcome: "A colourful thank-you card!",
      },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Computers in shops are used for ____.", options: ["billing", "cooking", "sleeping", "running"], answerIndex: 0 },
      { type: "mcq", question: "Doctors in hospitals use computers to ____.", options: ["sing songs", "keep patient records", "wash clothes", "sell toys"], answerIndex: 1 },
      { type: "mcq", question: "We can ____ on a computer at home.", options: ["watch cartoons", "eat food", "drink water", "comb hair"], answerIndex: 0 },
      { type: "tf", question: "Banks use computers to keep our money safe.", answer: true },
      { type: "tf", question: "A computer cannot help us learn.", answer: false, explanation: "Computers help us learn many new things." },
      { type: "tf", question: "Airplanes also use computers.", answer: true },
      { type: "fill", question: "We use a computer at ______ to study and play.", answer: "school" },
      { type: "fill", question: "An ______ machine in a bank gives us money.", answer: "ATM" },
      { type: "fill", question: "Shopkeepers use computers to make a ______.", answer: "bill" },
      { type: "short", question: "Name two things you can do on a computer at home.", modelAnswer: "Watch cartoons and play games." },
    ],
  },
  quiz: {
    passScore: 60,
    timerSeconds: 240,
    questions: [
      { type: "mcq", question: "Where is a computer used to book train tickets?", options: ["At a railway station", "In the kitchen", "In the bathroom", "On the roof"], answerIndex: 0 },
      { type: "mcq", question: "Which place uses computers to make bills?", options: ["Park", "Shop", "Garden", "Beach"], answerIndex: 1 },
      { type: "mcq", question: "At school, computers are used for ____.", options: ["smart classes", "playing football", "sleeping", "eating lunch"], answerIndex: 0 },
      { type: "mcq", question: "Which one is NOT a use of a computer?", options: ["Watching cartoons", "Drawing pictures", "Cooking rice", "Sending email"], answerIndex: 2, explanation: "Computers do not cook food." },
      { type: "mcq", question: "Pilots in airplanes use computers to ____.", options: ["fly safely", "wash clothes", "make tea", "play cricket"], answerIndex: 0 },
      { type: "mcq", question: "Doctors use computers to look at ____.", options: ["X-rays", "shoes", "fruits", "trees"], answerIndex: 0 },
      { type: "tf", question: "Computers help shopkeepers count items quickly.", answer: true },
      { type: "tf", question: "A computer can only be used at home.", answer: false },
      { type: "tf", question: "We can listen to songs on a computer.", answer: true },
      { type: "fill", question: "We can ______ to grandparents on a video call using a computer.", answer: "talk" },
    ],
  },
  lab: { type: "none", instructions: "No coding lab for this topic — try the activities!" },
};

export default content;
