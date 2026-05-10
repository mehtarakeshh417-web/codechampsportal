// Sample content for one topic — proves the content-module system works.
// Add more files at src/lib/curriculum/content/<class-slug>/<topic-slug>.ts
// using the same shape (TopicContentBundle).

import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary:
      "A computer is a smart machine that follows our instructions to play, learn, draw and write.",
    objectives: [
      "Tell what a computer is in your own words.",
      "Name three things people do with computers.",
      "Recognise that a computer needs instructions to work.",
    ],
    duration: "15 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      {
        heading: "What is a computer?",
        body: "A computer is an electronic machine. We can give it instructions and it follows them very fast and without making mistakes.",
      },
      {
        heading: "What can a computer do?",
        body: "Computers help us in many ways every day.",
        bullets: [
          "Watch cartoons and videos",
          "Play games",
          "Draw pictures",
          "Type letters and stories",
          "Talk to friends far away",
        ],
      },
      {
        heading: "Why is the computer special?",
        body: "Unlike a toy car, a computer can do many different jobs. The same computer can play a song and also help you draw a picture.",
      },
    ],
  },
  images: {
    items: [
      { emoji: "🖥️", caption: "A desktop computer sits on a table." },
      { emoji: "💻", caption: "A laptop you can carry anywhere." },
      { emoji: "📱", caption: "A tablet is also a kind of computer." },
    ],
  },
  activities: {
    items: [
      {
        title: "Spot the computer!",
        steps: [
          "Look around your home.",
          "Point to anything you think is a computer.",
          "Ask an elder to check your guesses.",
        ],
        expectedOutcome: "You can name at least 2 computers around you.",
      },
      {
        title: "Draw your dream computer",
        steps: [
          "Take paper and crayons.",
          "Draw a computer you would like to have.",
          "Show it to a friend and tell what it can do.",
        ],
      },
    ],
  },
  practice: {
    questions: [
      {
        type: "mcq",
        question: "A computer is a __________ machine.",
        options: ["wooden", "smart", "broken", "sleepy"],
        answerIndex: 1,
        explanation: "A computer is called a smart machine because it follows our instructions.",
      },
      {
        type: "tf",
        question: "A computer can help us draw pictures.",
        answer: true,
      },
      {
        type: "fill",
        question: "We give __________ to a computer to make it work.",
        answer: "instructions",
      },
    ],
  },
  quiz: {
    passScore: 60,
    timerSeconds: 180,
    questions: [
      {
        type: "mcq",
        question: "Which of these is a computer?",
        options: ["A laptop", "A football", "A spoon", "A pencil"],
        answerIndex: 0,
      },
      {
        type: "mcq",
        question: "What does a computer follow?",
        options: ["Songs", "Instructions", "Smells", "Colors"],
        answerIndex: 1,
      },
      {
        type: "tf",
        question: "A computer can make many mistakes when given instructions.",
        answer: false,
        explanation: "A computer is very accurate when it follows instructions.",
      },
      {
        type: "fill",
        question: "A computer is a ________ machine.",
        answer: "smart",
      },
    ],
  },
  lab: {
    type: "none",
    instructions:
      "There is no coding lab for this topic — try the activities tab to practice.",
  },
};

export default content;
