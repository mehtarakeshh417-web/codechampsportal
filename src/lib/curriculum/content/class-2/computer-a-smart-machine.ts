import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "A computer is called a smart machine because it follows instructions, never gets tired and gives the right answers very fast.",
    objectives: [
      "Tell why a computer is called a smart machine.",
      "List 4 features of a computer.",
      "Compare a computer with a human.",
    ],
    duration: "15 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🤖 What makes it smart?", body: "A computer follows the instructions we give and never makes silly mistakes." },
      { heading: "Features of a Computer", body: "These are the special powers of a computer.", bullets: [
        "⚡ FAST — finishes work in seconds.",
        "🎯 ACCURATE — gives correct answers.",
        "💪 NEVER TIRED — works for many hours.",
        "🧠 GOOD MEMORY — remembers a lot of data.",
        "🔁 CAN REPEAT — does the same job again and again.",
      ] },
      { heading: "What a computer cannot do", body: "A computer is smart but it cannot think on its own. It needs us to tell it what to do." },
      { heading: "💡 Tip", body: "Computer = a machine + our instructions = smart work!" },
    ],
  },
  images: {
    items: [
      { emoji: "⚡", caption: "FAST — works in seconds." },
      { emoji: "🎯", caption: "ACCURATE — never makes silly mistakes." },
      { emoji: "🧠", caption: "GOOD MEMORY — remembers everything." },
      { emoji: "🔁", caption: "Can REPEAT a job many times." },
      { emoji: "💪", caption: "Never gets TIRED." },
    ],
  },
  activities: {
    items: [
      { title: "Speed test ⏱️", steps: ["Add 25+47 in your head.", "Now ask a calculator to do it.", "Who is faster?"], expectedOutcome: "The computer wins!" },
      { title: "Smart vs not-smart 🧩", steps: ["List 3 things a computer can do.", "List 3 things only humans can do."] },
      { title: "Memory game 🧠", steps: ["Try to remember 10 phone numbers.", "Save them on the computer.", "See who remembers all 10."] },
      { title: "Repeat champion 🔁", steps: ["Write your name 50 times by hand.", "Now use copy-paste on a computer.", "Notice the difference!"] },
      { title: "My report 📋", steps: ["Draw a chart of computer features.", "Show it to your family."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "A computer is called a ____ machine.", options: ["smart", "lazy", "broken", "sleepy"], answerIndex: 0 },
      { type: "mcq", question: "Computers are very ____ at work.", options: ["slow", "fast", "tired", "noisy"], answerIndex: 1 },
      { type: "mcq", question: "Which is NOT a feature of a computer?", options: ["Fast", "Accurate", "Can think alone", "Good memory"], answerIndex: 2 },
      { type: "tf", question: "A computer can think on its own.", answer: false },
      { type: "tf", question: "Computers can do the same work many times without getting bored.", answer: true },
      { type: "tf", question: "Computers make many mistakes.", answer: false },
      { type: "fill", question: "Computers have very good ______.", answer: "memory" },
      { type: "fill", question: "Computers do not get ______.", answer: "tired" },
      { type: "fill", question: "Computers give ______ answers.", answer: "accurate" },
      { type: "short", question: "Name two features of a computer.", modelAnswer: "Fast and accurate." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 240,
    questions: [
      { type: "mcq", question: "Why is a computer called smart?", options: ["It follows instructions correctly", "It speaks", "It eats", "It walks"], answerIndex: 0 },
      { type: "mcq", question: "Computers can do same task ____.", options: ["once only", "twice only", "many times", "never"], answerIndex: 2 },
      { type: "mcq", question: "Who gives instructions to the computer?", options: ["Cats", "Trees", "Humans", "Wind"], answerIndex: 2 },
      { type: "mcq", question: "Computers are very accurate, meaning they are ____.", options: ["correct", "wrong", "noisy", "slow"], answerIndex: 0 },
      { type: "mcq", question: "Which feature lets a computer remember data?", options: ["Speed", "Memory", "Colour", "Shape"], answerIndex: 1 },
      { type: "mcq", question: "Computers never feel ____.", options: ["happy", "tired", "blue", "round"], answerIndex: 1 },
      { type: "tf", question: "A computer is faster than a human at counting.", answer: true },
      { type: "tf", question: "A computer can replace a teacher's love and care.", answer: false },
      { type: "tf", question: "Computers can do many jobs at the same time.", answer: true },
      { type: "fill", question: "A computer needs ______ to work.", answer: "instructions" },
    ],
  },
  lab: { type: "none" },
};
export default content;
