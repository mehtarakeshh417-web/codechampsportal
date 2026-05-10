import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Master Python control flow — if/elif/else, nested conditions, for and while loops, and the range and len helpers.",
    objectives: ["Write nested conditions.", "Loop over lists and strings.", "Use break, continue and else with loops."],
    duration: "30 min", difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🧠 Statements", body: "Python is read top-to-bottom. Statements end at the line break; blocks are defined by indentation." },
      { heading: "❓ Conditional", body: "if / elif / else lets the program choose a path. Conditions return True/False.", bullets: ["Logical ops: and, or, not", "Comparison: == != > < >= <="] },
      { heading: "🔁 for loop", body: "Iterate any sequence: for item in list / for ch in 'word' / for i in range(n)." },
      { heading: "🔄 while loop", body: "Repeat while condition is True. Be sure it eventually becomes False." },
      { heading: "⛔ Loop helpers", body: "break — exit; continue — skip; else — runs when loop completes without break." },
    ],
  },
  images: {
    items: [
      { emoji: "❓", caption: "if/elif/else." }, { emoji: "🔁", caption: "for loop." },
      { emoji: "🔄", caption: "while loop." }, { emoji: "⛔", caption: "break." },
      { emoji: "↩️", caption: "continue." }, { emoji: "📐", caption: "Indentation = block." },
    ],
  },
  activities: {
    items: [
      { title: "Grade calculator 🎓", steps: ["Read marks.", "if >=90 'A' elif >=75 'B' elif >=50 'C' else 'F'."] },
      { title: "Sum digits 🔢", steps: ["n=int(input()); s=0", "while n: s+=n%10; n//=10", "print(s)"] },
      { title: "Vowel counter 🔡", steps: ["For each ch in word, if ch in 'aeiou' increment count."] },
      { title: "Prime check 🧮", steps: ["for i in range(2,n): if n%i==0 break; else print('Prime')."] },
      { title: "Factorial ➗", steps: ["f=1; for i in range(1,n+1): f*=i; print(f)"] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Indented block defines a…", options: ["Comment", "Block", "Variable", "Function"], answerIndex: 1 },
      { type: "fill", question: "Logical AND in Python is ___.", answer: "and" },
      { type: "tf", question: "for can iterate over a string.", answer: true },
      { type: "mcq", question: "range(3,8) length?", options: ["3", "5", "8", "11"], answerIndex: 1 },
      { type: "fill", question: "Skip current iteration: ___.", answer: "continue" },
      { type: "mcq", question: "Loop runs until False is true for…", options: ["if", "while", "for", "elif"], answerIndex: 1 },
      { type: "tf", question: "else with for runs only if no break.", answer: true },
      { type: "fill", question: "Length of list is ___().", answer: "len" },
      { type: "mcq", question: "Which is a comparison operator?", options: ["=", "==", "+", "?"], answerIndex: 1 },
      { type: "tf", question: "elif is short for else if.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "for i in range(1,5): runs how many times?", options: ["3", "4", "5", "6"], answerIndex: 1 },
      { type: "mcq", question: "Best loop when count is unknown?", options: ["for", "while", "if", "switch"], answerIndex: 1 },
      { type: "tf", question: "break exits the innermost loop.", answer: true },
      { type: "fill", question: "Negation operator is ___.", answer: "not" },
      { type: "mcq", question: "Boolean of empty string ''?", options: ["True", "False", "0", "Error"], answerIndex: 1 },
      { type: "mcq", question: "Indent characters typically?", options: ["4 spaces", "2 spaces", "1 tab", "Any"], answerIndex: 0 },
      { type: "tf", question: "while True needs a break to stop.", answer: true },
      { type: "fill", question: "Iterate dictionary: for k in d.___().", answer: "keys" },
      { type: "mcq", question: "if x: runs when…", options: ["x is True/non-zero", "x is None", "x is empty", "Always"], answerIndex: 0 },
      { type: "tf", question: "Python supports nested conditionals.", answer: true },
    ],
  },
  lab: { type: "python", starterCode: "for i in range(1, 21):\n    if i % 2 == 0:\n        print(i)\n", instructions: "Modify to print FizzBuzz for 1..30 (Fizz for 3, Buzz for 5, FizzBuzz for both)." },
};
export default content;
