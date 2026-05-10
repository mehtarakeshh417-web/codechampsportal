import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Computers store everything as numbers. Learn binary, octal, decimal and hexadecimal — and how to convert between them.",
    objectives: [
      "Identify the four common number systems.",
      "Convert decimal ↔ binary.",
      "Recognize hex digits 0-F.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🔢 The Four Systems", body: "Each has a 'base'.", bullets: [
        "Binary — base 2 (digits 0,1)",
        "Octal — base 8 (0-7)",
        "Decimal — base 10 (0-9)",
        "Hexadecimal — base 16 (0-9, A-F)",
      ] },
      { heading: "🔁 Decimal → Binary", body: "Divide by 2 repeatedly, write remainders bottom-up. e.g., 13 → 1101." },
      { heading: "🔁 Binary → Decimal", body: "Multiply each bit by 2^position (right to left), add. e.g., 1101 = 8+4+0+1 = 13." },
      { heading: "🅰️ Hex digits", body: "A=10, B=11, C=12, D=13, E=14, F=15." },
      { heading: "💡 Why?", body: "Computers use binary because circuits have only ON (1) / OFF (0)." },
    ],
  },
  images: {
    items: [
      { emoji: "0️⃣", caption: "Binary 0/1." },
      { emoji: "8️⃣", caption: "Octal." },
      { emoji: "🔟", caption: "Decimal." },
      { emoji: "#️⃣", caption: "Hexadecimal." },
      { emoji: "💡", caption: "ON/OFF circuits." },
      { emoji: "🧮", caption: "Conversion table." },
    ],
  },
  activities: {
    items: [
      { title: "Convert 25 → binary 🔁", steps: ["25/2=12r1, 12/2=6r0, 6/2=3r0, 3/2=1r1, 1/2=0r1.", "Read upward: 11001."] },
      { title: "Binary → Decimal 🔁", steps: ["Take 1010.", "8+0+2+0 = 10."] },
      { title: "Hex flash 💡", steps: ["Memorize A=10 to F=15.", "Test a friend."] },
      { title: "Octal of 65 🔢", steps: ["65/8=8r1, 8/8=1r0, 1/8=0r1.", "Octal = 101."] },
      { title: "Bit length 📏", steps: ["How many bits to store decimal 100?", "Find smallest 2^n ≥ 100."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Binary uses how many digits?", options: ["2", "8", "10", "16"], answerIndex: 0 },
      { type: "fill", question: "Hex digit A equals decimal ___.", answer: "10" },
      { type: "tf", question: "Decimal base is 10.", answer: true },
      { type: "mcq", question: "Binary 1010 in decimal is…", options: ["8", "10", "12", "16"], answerIndex: 1 },
      { type: "fill", question: "Octal base is ___.", answer: "8" },
      { type: "mcq", question: "Hex F = ?", options: ["10", "14", "15", "16"], answerIndex: 2 },
      { type: "tf", question: "Computers internally use decimal.", answer: false },
      { type: "fill", question: "13 in binary is ___.", answer: "1101" },
      { type: "mcq", question: "Octal does NOT use…", options: ["7", "8", "5", "0"], answerIndex: 1 },
      { type: "tf", question: "Binary 11 = decimal 3.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Convert 8 to binary.", options: ["100", "1000", "111", "1100"], answerIndex: 1 },
      { type: "mcq", question: "Hex 1A = decimal?", options: ["20", "26", "30", "16"], answerIndex: 1 },
      { type: "tf", question: "Binary digits are called bits.", answer: true },
      { type: "fill", question: "Largest hex digit is ___.", answer: "F" },
      { type: "mcq", question: "1111 binary = ?", options: ["7", "15", "16", "31"], answerIndex: 1 },
      { type: "mcq", question: "Octal of decimal 9 is…", options: ["10", "11", "12", "9"], answerIndex: 1 },
      { type: "tf", question: "Hex base = 16.", answer: true },
      { type: "fill", question: "Smallest binary digit is ___.", answer: "0" },
      { type: "mcq", question: "Decimal 16 in hex = ?", options: ["10", "F", "16", "20"], answerIndex: 0 },
      { type: "tf", question: "Octal 17 = decimal 17.", answer: false },
    ],
  },
};
export default content;
