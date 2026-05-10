import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "CSS styles HTML — colors, fonts, layout. Selectors target elements, properties set the look.",
    objectives: [
      "Add CSS in inline, internal and external ways.",
      "Use selectors (element, class, id).",
      "Style colors, fonts and spacing.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🎨 What is CSS?", body: "Cascading Style Sheets — controls how HTML looks." },
      { heading: "📍 Where to write CSS?", body: "Three ways:", bullets: [
        "Inline: <p style=\"color:red\">",
        "Internal: <style> in <head>",
        "External: a separate file linked with <link rel=\"stylesheet\" href=\"style.css\">",
      ] },
      { heading: "🎯 Selectors", body: "Pick which elements to style:", bullets: [
        "p — every <p>",
        ".note — every element with class=\"note\"",
        "#main — element with id=\"main\"",
      ] },
      { heading: "🧰 Common Properties", body: "color, background-color, font-family, font-size, padding, margin, border, text-align." },
      { heading: "📦 Box Model", body: "Every element = content + padding + border + margin." },
    ],
  },
  images: {
    items: [
      { emoji: "🎨", caption: "CSS3 logo." },
      { emoji: "📍", caption: "Inline / Internal / External." },
      { emoji: "🎯", caption: "Selectors." },
      { emoji: "📦", caption: "Box model." },
      { emoji: "🅰️", caption: "Fonts & color." },
      { emoji: "🖌️", caption: "Style your page." },
    ],
  },
  activities: {
    items: [
      { title: "Style headings 🅰️", steps: ["Add internal CSS.", "h1 { color: blue; text-align:center; }"] },
      { title: "External stylesheet 📄", steps: ["Create style.css.", "Link in HTML head.", "Move all rules into it."] },
      { title: "Class selector 🎯", steps: ["Add class='note' to <p>.", ".note { background: yellow; padding: 8px; }"] },
      { title: "Box model demo 📦", steps: ["div { padding:10px; margin:20px; border:2px solid red; }"] },
      { title: "Color palette 🎨", steps: ["Try names, hex, rgb.", "Compare results."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "CSS stands for…", options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Sheet", "Coded Style Set"], answerIndex: 0 },
      { type: "fill", question: "External stylesheet is linked with the ___ tag.", answer: "link" },
      { type: "tf", question: "Inline CSS uses the style attribute.", answer: true },
      { type: "mcq", question: ".btn selects elements with…", options: ["id=btn", "class=btn", "tag btn", "color btn"], answerIndex: 1 },
      { type: "fill", question: "# selects an element by ___.", answer: "id" },
      { type: "mcq", question: "Property for text color is…", options: ["color", "font-color", "text-color", "fg"], answerIndex: 0 },
      { type: "tf", question: "padding is INSIDE the border.", answer: true },
      { type: "fill", question: "Box model: content + padding + border + ___.", answer: "margin" },
      { type: "mcq", question: "Internal CSS goes inside…", options: ["<style>", "<script>", "<body>", "<link>"], answerIndex: 0 },
      { type: "tf", question: "CSS controls only fonts.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Best for big sites?", options: ["Inline", "Internal", "External", "Random"], answerIndex: 2 },
      { type: "mcq", question: "Hex color #ff0000 is…", options: ["Green", "Red", "Blue", "Black"], answerIndex: 1 },
      { type: "tf", question: "margin is OUTSIDE the border.", answer: true },
      { type: "fill", question: "Center text via text-align: ___.", answer: "center" },
      { type: "mcq", question: ".intro { } targets…", options: ["id intro", "class intro", "tag intro", "color intro"], answerIndex: 1 },
      { type: "mcq", question: "Inline style example?", options: ["style.css link", "<p style=\"…\">", "<style> tag", "<script> tag"], answerIndex: 1 },
      { type: "tf", question: "rgb(255,0,0) is red.", answer: true },
      { type: "fill", question: "Selector for id 'main' is ___main.", answer: "#" },
      { type: "mcq", question: "Box model order outward?", options: ["content,border,padding,margin", "content,padding,border,margin", "margin,border,padding,content", "padding,content,border,margin"], answerIndex: 1 },
      { type: "tf", question: "External CSS keeps HTML clean.", answer: true },
    ],
  },
  lab: { type: "html", instructions: "Style your 'About Me' page with internal and external CSS — colors, fonts and box model." },
};
export default content;
