import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "HTML5 is the language of web pages. Tags describe structure: headings, paragraphs, lists, links and images.",
    objectives: [
      "Write a basic HTML5 document.",
      "Use heading, paragraph, list and link tags.",
      "Save and open .html files in a browser.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🌐 HTML Document Skeleton", body: "Every HTML5 page starts with <!DOCTYPE html> followed by <html>, <head>, <body>." },
      { heading: "🏷️ Common Tags", body: "Tags come in pairs: opening and closing.", bullets: [
        "<h1>…</h1> to <h6>…</h6> — headings",
        "<p>…</p> — paragraph",
        "<ul><li></li></ul> — bullet list",
        "<ol><li></li></ol> — numbered list",
        "<a href=\"url\">text</a> — link",
        "<img src=\"file.jpg\" alt=\"…\"> — image (self-closing)",
      ] },
      { heading: "📐 Attributes", body: "Extra info inside the opening tag, e.g., <a href=\"…\">, <img src=\"…\" alt=\"…\">." },
      { heading: "💾 Saving", body: "Save the file with a .html extension (e.g., index.html). Open it with any browser." },
      { heading: "🛡️ Best Practice", body: "Always include alt text on images for accessibility." },
    ],
  },
  images: {
    items: [
      { emoji: "🌐", caption: "HTML5 logo." },
      { emoji: "🏷️", caption: "Tags in pairs." },
      { emoji: "📰", caption: "Headings h1-h6." },
      { emoji: "🔗", caption: "<a> link." },
      { emoji: "🖼️", caption: "<img> tag." },
      { emoji: "💾", caption: "Save as .html." },
    ],
  },
  activities: {
    items: [
      { title: "First Page 🌐", steps: ["Open Notepad.", "Type basic HTML5 skeleton.", "Save as index.html.", "Open in browser."] },
      { title: "About Me 🧑", steps: ["Add <h1>Your Name</h1>.", "Add <p> describing yourself.", "Add a <ul> hobbies list."] },
      { title: "Friend's Link 🔗", steps: ["Add <a href='https://google.com'>Search</a>.", "Click in browser."] },
      { title: "Image gallery 🖼️", steps: ["Place 3 images.", "Use alt text.", "Reload."] },
      { title: "Numbered Steps 🔢", steps: ["Use <ol> for a recipe of 5 steps."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "HTML stands for…", options: ["Hyper Text Markup Language", "High Tech ML", "Hyper Tool ML", "Home Tag Markup"], answerIndex: 0 },
      { type: "fill", question: "Largest heading tag is ___.", answer: "h1" },
      { type: "tf", question: "<img> needs a closing tag.", answer: false },
      { type: "mcq", question: "Bullet list uses…", options: ["<ol>", "<ul>", "<dl>", "<list>"], answerIndex: 1 },
      { type: "fill", question: "Link tag is ___.", answer: "a" },
      { type: "mcq", question: "Document type is…", options: ["<!DOCTYPE html>", "<html5>", "<head>", "<body>"], answerIndex: 0 },
      { type: "tf", question: "alt is an attribute of <img>.", answer: true },
      { type: "fill", question: "Files saved with extension ___.", answer: ".html" },
      { type: "mcq", question: "Numbered list is…", options: ["<ul>", "<ol>", "<li>", "<dl>"], answerIndex: 1 },
      { type: "tf", question: "Tags must always be in pairs.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Where does visible content go?", options: ["<head>", "<body>", "<title>", "<meta>"], answerIndex: 1 },
      { type: "mcq", question: "Smallest heading is…", options: ["h1", "h3", "h6", "h9"], answerIndex: 2 },
      { type: "tf", question: "<a href=\"…\"> creates a link.", answer: true },
      { type: "fill", question: "Self-closing image tag: <img ___ alt=\"\">.", answer: "src" },
      { type: "mcq", question: "Required to start an HTML5 file?", options: ["<!DOCTYPE html>", "<head>", "<title>", "<style>"], answerIndex: 0 },
      { type: "mcq", question: "Which is invalid?", options: ["<p>hi</p>", "<h2>hi</h2>", "<heading>hi</heading>", "<ul></ul>"], answerIndex: 2 },
      { type: "tf", question: "<title> shows in the browser tab.", answer: true },
      { type: "fill", question: "alt text helps with ___.", answer: "accessibility" },
      { type: "mcq", question: "Save webpage as…", options: [".doc", ".html", ".css", ".js"], answerIndex: 1 },
      { type: "tf", question: "<br> is a self-closing tag.", answer: true },
    ],
  },
  lab: { type: "html", instructions: "Build an 'About Me' page with a heading, paragraph, list and an image." },
};
export default content;
