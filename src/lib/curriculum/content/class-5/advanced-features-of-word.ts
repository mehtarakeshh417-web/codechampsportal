import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Use tables, styles, mail merge, hyperlinks and find-and-replace to create powerful Word documents.",
    objectives: [
      "Insert and format tables.",
      "Apply styles for consistent look.",
      "Run a basic mail merge.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🧮 Tables", body: "Insert → Table. Choose rows × columns. Use Table Design and Layout tabs to format." },
      { heading: "🎨 Styles", body: "Home → Styles applies a ready-made look (Heading 1, Title, Quote). Updating a style updates ALL text using it." },
      { heading: "📬 Mail Merge", body: "Send the same letter to many people with different names.", bullets: [
        "Mailings → Start Mail Merge → Letters",
        "Select recipients (Excel/CSV)",
        "Insert merge fields like «FirstName»",
        "Finish & Merge → Print or Email",
      ] },
      { heading: "🔗 Hyperlinks", body: "Insert → Link. Connect text to a web page or another document." },
      { heading: "🔍 Find & Replace", body: "Ctrl+H opens Replace. Find a word and replace it everywhere at once." },
    ],
  },
  images: {
    items: [
      { emoji: "🧮", caption: "Insert a table." },
      { emoji: "🎨", caption: "Heading styles." },
      { emoji: "📬", caption: "Mail merge fields." },
      { emoji: "🔗", caption: "Hyperlink." },
      { emoji: "🔁", caption: "Find & Replace." },
      { emoji: "📊", caption: "Formatted table." },
    ],
  },
  activities: {
    items: [
      { title: "Class Timetable 🗓️", steps: ["Insert 6×6 table.", "Type day names + periods.", "Apply table style."] },
      { title: "Apply Styles ✨", steps: ["Type 3 headings.", "Apply Heading 1 to each.", "Change Heading 1 colour — all update."] },
      { title: "Mini Mail Merge 📬", steps: ["Create list of 3 friends in Excel.", "Write a letter in Word.", "Insert «Name» field.", "Finish & Merge."] },
      { title: "Add a Hyperlink 🔗", steps: ["Select word 'Google'.", "Insert → Link → google.com.", "Ctrl+Click to test."] },
      { title: "Replace Words 🔁", steps: ["Open any document.", "Press Ctrl+H.", "Replace 'good' with 'great'."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Tables are inserted from…", options: ["Home", "Insert", "View", "Review"], answerIndex: 1 },
      { type: "tf", question: "Styles keep documents consistent.", answer: true },
      { type: "fill", question: "Mail merge sends one letter to ___ people.", answer: "many" },
      { type: "mcq", question: "Find & Replace shortcut is…", options: ["Ctrl+F", "Ctrl+H", "Ctrl+R", "Ctrl+P"], answerIndex: 1 },
      { type: "tf", question: "Hyperlinks open a web page or file.", answer: true },
      { type: "fill", question: "A table has rows and ___.", answer: "columns" },
      { type: "mcq", question: "Heading 1 is a…", options: ["Style", "Table", "Image", "Border"], answerIndex: 0 },
      { type: "tf", question: "Mail merge needs a data source.", answer: true },
      { type: "mcq", question: "Merge fields look like…", options: ["{name}", "«Name»", "[name]", "$name"], answerIndex: 1 },
      { type: "fill", question: "Mailings tab is used for ___ ___.", answer: "mail merge" },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Best for a timetable?", options: ["Image", "Table", "Hyperlink", "Watermark"], answerIndex: 1 },
      { type: "mcq", question: "Updating a style…", options: ["Updates all text using it", "Only one paragraph", "Nothing", "Deletes text"], answerIndex: 0 },
      { type: "tf", question: "Mail merge needs Excel/CSV recipients.", answer: true },
      { type: "fill", question: "Ctrl+H opens ___ & Replace.", answer: "Find" },
      { type: "mcq", question: "Hyperlink is added via…", options: ["Insert → Link", "Home → Bold", "View → Zoom", "File → Save"], answerIndex: 0 },
      { type: "mcq", question: "Tables can be styled in…", options: ["Table Design tab", "Mailings tab", "View tab", "References tab"], answerIndex: 0 },
      { type: "tf", question: "Find & Replace can replace all at once.", answer: true },
      { type: "fill", question: "Letters → Recipients → Insert ___ Field.", answer: "Merge" },
      { type: "mcq", question: "Heading style helps build…", options: ["Watermark", "Table of Contents", "Mail merge", "Hyperlink"], answerIndex: 1 },
      { type: "tf", question: "Tables can have only 2 columns.", answer: false },
    ],
  },
  lab: { type: "word", instructions: "Create a class timetable using a table, then apply heading styles and a hyperlink." },
};
export default content;
