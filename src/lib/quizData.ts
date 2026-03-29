// Quiz questions for curriculum topics - MCQ format with 4 options each

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number; // 0-3
}

export interface TopicQuiz {
  topicId: string;
  questions: QuizQuestion[];
}

const quizzes: TopicQuiz[] = [
  // Class 5 - MS Word Page Formatting
  {
    topicId: "c5-word-pf",
    questions: [
      { id: "q1", question: "Where do you find page formatting options in MS Word?", options: ["Home tab", "Page Layout tab", "Insert tab", "View tab"], correctIndex: 1 },
      { id: "q2", question: "What is the blank space around content called?", options: ["Border", "Margin", "Padding", "Indent"], correctIndex: 1 },
      { id: "q3", question: "Which orientation makes the page wider than tall?", options: ["Portrait", "Landscape", "Square", "Custom"], correctIndex: 1 },
      { id: "q4", question: "What is a watermark in MS Word?", options: ["A border around text", "A faded background image or text", "A type of font", "A page number"], correctIndex: 1 },
      { id: "q5", question: "How many columns can you split text into in MS Word?", options: ["Only 1", "Up to 3", "Up to 13", "Unlimited"], correctIndex: 2 },
    ],
  },
  // Class 5 - PPT Animation
  {
    topicId: "c5-ppt-anim",
    questions: [
      { id: "q1", question: "What does animation in PowerPoint do?", options: ["Change font colors", "Add movement to objects", "Delete slides", "Print slides"], correctIndex: 1 },
      { id: "q2", question: "Which animation type makes an object appear on a slide?", options: ["Exit", "Entrance", "Emphasis", "Motion Path"], correctIndex: 1 },
      { id: "q3", question: "What is a transition in PowerPoint?", options: ["Text formatting", "Effect between slides", "A type of chart", "A slide layout"], correctIndex: 1 },
      { id: "q4", question: "Where do you find the Animation tab?", options: ["In the menu bar", "In the ribbon at the top", "In the status bar", "In the taskbar"], correctIndex: 1 },
      { id: "q5", question: "What type of media can you insert in PowerPoint?", options: ["Only images", "Only videos", "Audio and video", "Only text"], correctIndex: 2 },
    ],
  },
  // Class 5 - Excel Intro
  {
    topicId: "c5-excel-intro",
    questions: [
      { id: "q1", question: "What is the intersection of a row and column called?", options: ["Table", "Cell", "Sheet", "Range"], correctIndex: 1 },
      { id: "q2", question: "Which bar shows the content of a selected cell?", options: ["Status bar", "Menu bar", "Formula bar", "Title bar"], correctIndex: 2 },
      { id: "q3", question: "How are columns labeled in Excel?", options: ["By numbers", "By letters", "By symbols", "By colors"], correctIndex: 1 },
      { id: "q4", question: "What is a workbook in Excel?", options: ["A single cell", "A single row", "A file containing worksheets", "A chart"], correctIndex: 2 },
      { id: "q5", question: "How do you select an entire row?", options: ["Click column header", "Click row number", "Press Ctrl+A", "Double-click a cell"], correctIndex: 1 },
    ],
  },
  // Class 5 - Scratch Programming
  {
    topicId: "c5-scratch-prog",
    questions: [
      { id: "q1", question: "What is Scratch used for?", options: ["Writing essays", "Creating animations and games", "Browsing the internet", "Making spreadsheets"], correctIndex: 1 },
      { id: "q2", question: "What are the colored blocks in Scratch called?", options: ["Widgets", "Code blocks", "Sprites", "Costumes"], correctIndex: 1 },
      { id: "q3", question: "What is a Sprite in Scratch?", options: ["A background image", "A character or object", "A sound effect", "A variable"], correctIndex: 1 },
      { id: "q4", question: "What does the 'repeat' block do?", options: ["Deletes code", "Runs code multiple times", "Stops the program", "Changes costume"], correctIndex: 1 },
      { id: "q5", question: "What is a variable in Scratch?", options: ["A type of sprite", "A storage for data values", "A sound clip", "A costume change"], correctIndex: 1 },
    ],
  },
  // Class 1 - Computer Parts
  {
    topicId: "c1-comp-basics-parts",
    questions: [
      { id: "q1", question: "Which part of the computer shows pictures and words?", options: ["Keyboard", "Mouse", "Monitor", "CPU"], correctIndex: 2 },
      { id: "q2", question: "What do we use to type letters and numbers?", options: ["Mouse", "Monitor", "Keyboard", "Speaker"], correctIndex: 2 },
      { id: "q3", question: "Which device do we use to click on things?", options: ["Keyboard", "Mouse", "Printer", "Scanner"], correctIndex: 1 },
      { id: "q4", question: "What is CPU also called?", options: ["Brain of computer", "Heart of computer", "Eyes of computer", "Ears of computer"], correctIndex: 0 },
      { id: "q5", question: "Which device gives us a printed copy?", options: ["Monitor", "Speaker", "Printer", "Mouse"], correctIndex: 2 },
    ],
  },
  // Class 1 - Paint
  {
    topicId: "c1-creativity-paint",
    questions: [
      { id: "q1", question: "What tool do we use to draw lines in Paint?", options: ["Eraser", "Pencil", "Fill color", "Text"], correctIndex: 1 },
      { id: "q2", question: "What does the eraser tool do?", options: ["Draws shapes", "Removes drawings", "Fills color", "Types text"], correctIndex: 1 },
      { id: "q3", question: "Which tool fills an area with color?", options: ["Pencil", "Brush", "Fill with color", "Line"], correctIndex: 2 },
      { id: "q4", question: "What shapes can you draw in Paint?", options: ["Only circles", "Only squares", "Rectangle, circle, triangle and more", "No shapes"], correctIndex: 2 },
      { id: "q5", question: "How do you save your drawing?", options: ["Press Delete", "Click File > Save", "Close the window", "Press Escape"], correctIndex: 1 },
    ],
  },
  // Class 3 - Input Output
  {
    topicId: "c3-hardware-io",
    questions: [
      { id: "q1", question: "Which of these is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correctIndex: 2 },
      { id: "q2", question: "Which of these is an output device?", options: ["Mouse", "Scanner", "Microphone", "Monitor"], correctIndex: 3 },
      { id: "q3", question: "A scanner is used to:", options: ["Print documents", "Scan images into computer", "Play music", "Type text"], correctIndex: 1 },
      { id: "q4", question: "Speakers are used to:", options: ["Input data", "Display images", "Output sound", "Store data"], correctIndex: 2 },
      { id: "q5", question: "A webcam is an example of:", options: ["Output device", "Input device", "Storage device", "Processing device"], correctIndex: 1 },
    ],
  },
  // Class 6 - Python Basics
  {
    topicId: "c6-python-basics",
    questions: [
      { id: "q1", question: "Who created Python?", options: ["Bill Gates", "Guido van Rossum", "Mark Zuckerberg", "Elon Musk"], correctIndex: 1 },
      { id: "q2", question: "What function displays output in Python?", options: ["display()", "show()", "print()", "output()"], correctIndex: 2 },
      { id: "q3", question: "Which symbol is used for comments in Python?", options: ["//", "/*", "#", "--"], correctIndex: 2 },
      { id: "q4", question: "What is a variable in Python?", options: ["A fixed number", "A container to store data", "A type of loop", "A function name"], correctIndex: 1 },
      { id: "q5", question: "Which data type stores text in Python?", options: ["int", "float", "str", "bool"], correctIndex: 2 },
    ],
  },
  // Class 6 - HTML Basics
  {
    topicId: "c6-html-basics",
    questions: [
      { id: "q1", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], correctIndex: 0 },
      { id: "q2", question: "Which tag is used for the largest heading?", options: ["<h6>", "<h1>", "<heading>", "<head>"], correctIndex: 1 },
      { id: "q3", question: "Which tag creates a paragraph?", options: ["<para>", "<text>", "<p>", "<paragraph>"], correctIndex: 2 },
      { id: "q4", question: "What does the <img> tag do?", options: ["Creates a link", "Inserts an image", "Makes text bold", "Creates a list"], correctIndex: 1 },
      { id: "q5", question: "Which tag creates a link?", options: ["<link>", "<href>", "<a>", "<url>"], correctIndex: 2 },
    ],
  },
  // Class 6 - AI Basics
  {
    topicId: "c6-ai-basics",
    questions: [
      { id: "q1", question: "What does AI stand for?", options: ["Automated Internet", "Artificial Intelligence", "Advanced Information", "Auto Input"], correctIndex: 1 },
      { id: "q2", question: "Which of these uses AI?", options: ["Calculator", "Voice assistants like Alexa", "Light bulb", "Paper notebook"], correctIndex: 1 },
      { id: "q3", question: "What is Machine Learning?", options: ["Teaching machines to learn from data", "Building machines", "Using machines for farming", "Repairing computers"], correctIndex: 0 },
      { id: "q4", question: "Which technology helps self-driving cars?", options: ["HTML", "MS Word", "Artificial Intelligence", "Paint"], correctIndex: 2 },
      { id: "q5", question: "What is a chatbot?", options: ["A robot that walks", "A program that chats with humans", "A gaming console", "A type of virus"], correctIndex: 1 },
    ],
  },
  // Class 6 - Excel Formulas
  {
    topicId: "c6-excel-formulas",
    questions: [
      { id: "q1", question: "What symbol starts every formula in Excel?", options: ["#", "=", "@", "$"], correctIndex: 1 },
      { id: "q2", question: "Which function adds numbers in Excel?", options: ["ADD()", "SUM()", "TOTAL()", "PLUS()"], correctIndex: 1 },
      { id: "q3", question: "What does AVERAGE() calculate?", options: ["Total sum", "Mean value", "Maximum value", "Minimum value"], correctIndex: 1 },
      { id: "q4", question: "COUNT() function counts:", options: ["Letters only", "Cells with numbers", "Empty cells", "Colors"], correctIndex: 1 },
      { id: "q5", question: "MAX() returns the:", options: ["Smallest number", "Average number", "Largest number", "First number"], correctIndex: 2 },
    ],
  },
];

export const getQuizForTopic = (topicId: string): QuizQuestion[] | null => {
  const quiz = quizzes.find((q) => q.topicId === topicId);
  return quiz ? quiz.questions : null;
};
