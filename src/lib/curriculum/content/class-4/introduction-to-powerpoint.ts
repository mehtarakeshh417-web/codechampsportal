import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "PowerPoint helps us make slide shows — for projects, talks and storytelling. Let's create our first one!",
    objectives: [
      "Open PowerPoint and add slides.",
      "Add title, text and pictures to slides.",
      "Run a slide show using F5.",
    ],
    duration: "30 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "📽️ What is PowerPoint?", body: "Microsoft PowerPoint is presentation software. Each page is called a SLIDE. Together they make a SLIDE SHOW." },
      { heading: "Parts of the Window", body: "", bullets: [
        "SLIDE PANE — big slide in the middle",
        "SLIDE LIST — small slides on the left",
        "RIBBON — Home, Insert, Design tabs",
        "NOTES — write speaker notes at the bottom",
      ] },
      { heading: "Add a New Slide", body: "Home → New Slide. Pick a layout (Title, Title+Content, Two Content, Blank)." },
      { heading: "Adding things 🎨", body: "Insert pictures, shapes, charts, videos and even YouTube links." },
      { heading: "▶️ Run the Slide Show", body: "Press F5 or Slide Show → From Beginning. Use spacebar or arrow keys to move." },
      { heading: "💡 Tip", body: "Less is more — keep each slide simple and clean. Use big text and few words." },
    ],
  },
  images: {
    items: [
      { emoji: "📽️", caption: "PowerPoint icon." },
      { emoji: "📑", caption: "A slide with title and content." },
      { emoji: "➕", caption: "New slide button." },
      { emoji: "🖼️", caption: "Insert pictures into slides." },
      { emoji: "▶️", caption: "F5 starts the slide show." },
      { emoji: "🎨", caption: "Design tab — pick themes." },
    ],
  },
  activities: {
    items: [
      { title: "About me 👦", steps: ["Make a title slide with your name.", "Add a slide with your hobbies.", "Run the show with F5."] },
      { title: "Picture story 🖼️", steps: ["Add 3 slides.", "Insert one picture per slide.", "Add a caption under each."] },
      { title: "Theme makeover 🎨", steps: ["Click Design tab.", "Try 3 different themes.", "Pick the prettiest one."] },
      { title: "Bullet list 📋", steps: ["Add a slide.", "Type 5 bullet points about your favourite animal."] },
      { title: "End slide ✨", steps: ["Add a final slide that says 'Thank you!'", "Make it big and colourful."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Each page in PowerPoint is a ____.", options: ["sheet", "slide", "page", "block"], answerIndex: 1 },
      { type: "mcq", question: "F5 starts the ____.", options: ["save", "print", "slide show", "spell check"], answerIndex: 2 },
      { type: "mcq", question: "We add a new slide from the ____ tab.", options: ["Home", "Insert", "Design", "View"], answerIndex: 0 },
      { type: "mcq", question: "Themes are picked from the ____ tab.", options: ["Home", "Insert", "Design", "View"], answerIndex: 2 },
      { type: "tf", question: "We can insert pictures in slides.", answer: true },
      { type: "tf", question: "PowerPoint is for typing essays only.", answer: false },
      { type: "tf", question: "Notes are for the speaker, not the audience.", answer: true },
      { type: "fill", question: "PowerPoint files end in ______.", answer: ".pptx" },
      { type: "fill", question: "Slide pane shows the ______ slide.", answer: "current" },
      { type: "fill", question: "Slide show key is ______.", answer: "F5" },
      { type: "short", question: "Why use PowerPoint?", modelAnswer: "To present ideas, projects and stories using slides." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Which is NOT a slide layout?", options: ["Title", "Title + Content", "Two Content", "Calculator"], answerIndex: 3 },
      { type: "mcq", question: "Spacebar in slide show ____.", options: ["goes back", "goes forward", "exits", "opens menu"], answerIndex: 1 },
      { type: "mcq", question: "Esc key during slide show ____.", options: ["exits", "moves forward", "saves", "opens menu"], answerIndex: 0 },
      { type: "mcq", question: "Where do speaker notes appear?", options: ["On the slide", "Below the slide", "Above the slide", "Right of slide"], answerIndex: 1 },
      { type: "mcq", question: "Which tab has Themes?", options: ["Home", "Insert", "Design", "View"], answerIndex: 2 },
      { type: "mcq", question: "PowerPoint is part of ____.", options: ["MS Office", "Adobe", "Apple", "Google only"], answerIndex: 0 },
      { type: "mcq", question: "Slide list shows ____ versions of slides.", options: ["smaller", "bigger", "rotated", "blue"], answerIndex: 0 },
      { type: "tf", question: "We can add videos to slides.", answer: true },
      { type: "tf", question: "Themes change colours and fonts at once.", answer: true },
      { type: "fill", question: "Each slide is shown in the ______ pane.", answer: "slide" },
    ],
  },
  lab: { type: "none", instructions: "Open PowerPoint or any slide editor and try the activities above." },
};
export default content;
