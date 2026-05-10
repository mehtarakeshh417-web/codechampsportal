import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Take Python further — make decisions with if/elif/else and repeat code with for and while loops.",
    objectives: [
      "Write if/elif/else conditions.",
      "Use for loops with range().",
      "Use while loops with a condition.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "❓ if / elif / else", body: "Indentation (4 spaces) matters! Example:\n\nif x>0:\n    print('+ve')\nelif x==0:\n    print('zero')\nelse:\n    print('-ve')" },
      { heading: "🔁 for loop", body: "for i in range(5): runs i = 0,1,2,3,4. range(start, stop, step) is flexible." },
      { heading: "🔄 while loop", body: "while condition: repeats until condition becomes False." },
      { heading: "⛔ break / continue", body: "break exits the loop; continue skips to next iteration." },
      { heading: "💡 Tip", body: "Always make sure a while loop's condition will eventually be False — otherwise infinite loop!" },
    ],
  },
  images: {
    items: [
      { emoji: "❓", caption: "if statement." },
      { emoji: "🔁", caption: "for loop." },
      { emoji: "🔄", caption: "while loop." },
      { emoji: "⛔", caption: "break." },
      { emoji: "↩️", caption: "continue." },
      { emoji: "📐", caption: "Indentation matters." },
    ],
  },
  activities: {
    items: [
      { title: "Even or Odd ❓", steps: ["n = int(input())", "print('Even' if n%2==0 else 'Odd')"] },
      { title: "Sum 1-100 ➕", steps: ["s=0", "for i in range(1,101): s+=i", "print(s)"] },
      { title: "Multiplication table 🧮", steps: ["n=int(input())", "for i in range(1,11): print(n,'x',i,'=',n*i)"] },
      { title: "Guess game 🎯", steps: ["secret=7", "while True:\n  g=int(input())\n  if g==secret: break"] },
      { title: "Skip 5s ↩️", steps: ["for i in range(1,11):\n  if i==5: continue\n  print(i)"] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Indent size in Python is usually…", options: ["2", "4", "8", "Tab only"], answerIndex: 1 },
      { type: "fill", question: "range(5) gives 0 to ___.", answer: "4" },
      { type: "tf", question: "elif comes between if and else.", answer: true },
      { type: "mcq", question: "Exits a loop early?", options: ["continue", "exit", "break", "return"], answerIndex: 2 },
      { type: "fill", question: "while ___: runs forever.", answer: "True" },
      { type: "mcq", question: "for i in range(2,8): how many iterations?", options: ["5", "6", "7", "8"], answerIndex: 1 },
      { type: "tf", question: "continue ends the loop.", answer: false },
      { type: "fill", question: "Comparison equal-to operator is ___.", answer: "==" },
      { type: "mcq", question: "Block of if must be…", options: ["Bracketed", "Indented", "Colored", "Brace"], answerIndex: 1 },
      { type: "tf", question: "for can iterate over a list.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "range(1,10,2) gives…", options: ["1,2,3…9", "1,3,5,7,9", "2,4,6,8,10", "1-10"], answerIndex: 1 },
      { type: "mcq", question: "Forever loop?", options: ["for True", "while True", "loop forever", "do while"], answerIndex: 1 },
      { type: "tf", question: "Indentation defines blocks in Python.", answer: true },
      { type: "fill", question: "Skip current iteration: ___.", answer: "continue" },
      { type: "mcq", question: "if x==y is a…", options: ["Loop", "Condition", "Function", "Comment"], answerIndex: 1 },
      { type: "mcq", question: "Sum 1..10 with for loop result?", options: ["50", "55", "100", "110"], answerIndex: 1 },
      { type: "tf", question: "elif can repeat many times.", answer: true },
      { type: "fill", question: "Exit loop with ___.", answer: "break" },
      { type: "mcq", question: "Python uses curly braces for blocks?", options: ["Yes", "No", "Sometimes", "Optional"], answerIndex: 1 },
      { type: "tf", question: "While loop without progress = infinite loop.", answer: true },
    ],
  },
  lab: { type: "python", starterCode: "for i in range(1,11):\n    print(i)\n", instructions: "Modify the loop to print only EVEN numbers from 1 to 20." },
};
export default content;
