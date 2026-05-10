import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Python is an easy, popular language. Learn variables, data types, input/output and basic operators.",
    objectives: [
      "Run a Python program.",
      "Use variables and data types.",
      "Take input and print output.",
    ],
    duration: "30 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🐍 What is Python?", body: "An easy-to-read, interpreted language. Used in web, data science, AI and games." },
      { heading: "🖨️ print()", body: "Shows output. Example: print(\"Hello\") → Hello" },
      { heading: "📦 Variables", body: "Containers for data. No declaration needed.", bullets: [
        "name = \"Anu\"  — string",
        "age  = 13      — integer (int)",
        "pi   = 3.14    — float",
        "ok   = True    — boolean (bool)",
      ] },
      { heading: "⌨️ input()", body: "Reads text from user. Convert with int() or float() if needed: age = int(input(\"Age? \"))" },
      { heading: "➕ Operators", body: "+ - * / // % ** for math, == != > < >= <= for comparison." },
    ],
  },
  images: {
    items: [
      { emoji: "🐍", caption: "Python logo." },
      { emoji: "🖨️", caption: "print()." },
      { emoji: "📦", caption: "Variables." },
      { emoji: "⌨️", caption: "input()." },
      { emoji: "➕", caption: "Operators." },
      { emoji: "💡", caption: "Beginner-friendly!" },
    ],
  },
  activities: {
    items: [
      { title: "Hello Python 👋", steps: ["Open Python lab.", "Type print('Hello, world!').", "Run."] },
      { title: "Add two numbers ➕", steps: ["a = int(input('a: '))", "b = int(input('b: '))", "print(a+b)"] },
      { title: "Greeting 🧑", steps: ["name = input('Name? ')", "print('Hi', name)"] },
      { title: "Area of rectangle 📏", steps: ["L,W = float(input()), float(input())", "print(L*W)"] },
      { title: "Operator zoo 🐾", steps: ["Try 7//2, 7%2, 2**8 in print()."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Function to print is…", options: ["echo()", "print()", "show()", "out()"], answerIndex: 1 },
      { type: "fill", question: "input() returns a ___.", answer: "string" },
      { type: "tf", question: "Python is interpreted.", answer: true },
      { type: "mcq", question: "Convert string to int with…", options: ["int()", "str()", "float()", "bool()"], answerIndex: 0 },
      { type: "fill", question: "True / False is the ___ type.", answer: "bool" },
      { type: "mcq", question: "7 // 2 = ?", options: ["3", "3.5", "4", "1"], answerIndex: 0 },
      { type: "tf", question: "Variables need a type declaration.", answer: false },
      { type: "fill", question: "Power operator is ___.", answer: "**" },
      { type: "mcq", question: "x = 'hi' creates a…", options: ["int", "float", "string", "bool"], answerIndex: 2 },
      { type: "tf", question: "Comparison == returns True/False.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "10 % 3 = ?", options: ["1", "3", "0", "10"], answerIndex: 0 },
      { type: "mcq", question: "Output of print(2**3)?", options: ["6", "8", "23", "9"], answerIndex: 1 },
      { type: "tf", question: "input() pauses for the user.", answer: true },
      { type: "fill", question: "3.14 is a ___.", answer: "float" },
      { type: "mcq", question: "Comment in Python starts with…", options: ["//", "#", "--", "/*"], answerIndex: 1 },
      { type: "mcq", question: "Which is invalid name?", options: ["x1", "_total", "1x", "name_"], answerIndex: 2 },
      { type: "tf", question: "print() always adds a newline.", answer: true },
      { type: "fill", question: "Boolean values are True and ___.", answer: "False" },
      { type: "mcq", question: "Python files end with…", options: [".py", ".pyt", ".pn", ".pl"], answerIndex: 0 },
      { type: "tf", question: "Variable name can start with a digit.", answer: false },
    ],
  },
  lab: { type: "python", starterCode: "name = input('Your name? ')\nprint('Hello,', name)\n", instructions: "Run the starter, then add a calculation that prints the next year's age." },
};
export default content;
