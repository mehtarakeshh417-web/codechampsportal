import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Animations and transitions make slide shows magical. Let's add motion, sound and timing to our slides.",
    objectives: [
      "Add transitions between slides.",
      "Animate text and pictures.",
      "Set timing and order of animations.",
    ],
    duration: "30 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "✨ Transitions", body: "Effects when moving from one slide to the next. Examples: Fade, Push, Wipe, Reveal." },
      { heading: "Adding a Transition", body: "Transitions tab → pick effect → Apply to All (or just one slide)." },
      { heading: "🎬 Animations", body: "Effects on text, pictures or shapes WITHIN a slide.", bullets: [
        "ENTRANCE — how it appears (Fly In, Fade)",
        "EMPHASIS — while it stays (Pulse, Spin)",
        "EXIT — how it leaves",
      ] },
      { heading: "Order and Timing", body: "Use Animation Pane to change order, timing and trigger (on click vs after previous)." },
      { heading: "🔊 Sound", body: "Insert tab → Audio. Add background music or button click sounds." },
      { heading: "💡 Tip", body: "Use animations to grab attention — but don't overdo it. Too many = distracting!" },
    ],
  },
  images: {
    items: [
      { emoji: "✨", caption: "Slide transition effect." },
      { emoji: "🎬", caption: "Animation on text." },
      { emoji: "▶️", caption: "Entrance, emphasis, exit." },
      { emoji: "⏱️", caption: "Set timing and duration." },
      { emoji: "🔊", caption: "Add audio to slides." },
      { emoji: "🎯", caption: "Use Animation Pane to reorder." },
    ],
  },
  activities: {
    items: [
      { title: "Fade everything 🌫️", steps: ["Add Fade transition.", "Click Apply to All slides."] },
      { title: "Fly-in title ✈️", steps: ["Pick a title.", "Add 'Fly In' entrance.", "Run the slide show."] },
      { title: "Animation order 🎯", steps: ["Add 3 bullets, animate each.", "Use Animation Pane to reorder them."] },
      { title: "Background music 🎵", steps: ["Insert > Audio > Audio on My PC.", "Choose a small song.", "Set 'Play in background'."] },
      { title: "Magic show ✨", steps: ["Make a 5-slide show with different transition + animation per slide."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Effect BETWEEN slides is called ____.", options: ["transition", "animation", "design", "theme"], answerIndex: 0 },
      { type: "mcq", question: "Effect ON a slide object is called ____.", options: ["transition", "animation", "ribbon", "layout"], answerIndex: 1 },
      { type: "mcq", question: "Apply to All applies a transition to ____.", options: ["one slide", "all slides", "two slides", "no slide"], answerIndex: 1 },
      { type: "mcq", question: "Which is NOT a kind of animation?", options: ["Entrance", "Emphasis", "Exit", "Eat"], answerIndex: 3 },
      { type: "tf", question: "We can play a sound during a transition.", answer: true },
      { type: "tf", question: "Animations cannot be reordered.", answer: false },
      { type: "tf", question: "Too many animations distract the audience.", answer: true },
      { type: "fill", question: "Effects between slides are ______.", answer: "transitions" },
      { type: "fill", question: "Use Animation ______ to reorder effects.", answer: "Pane" },
      { type: "fill", question: "Background ______ plays through all slides.", answer: "music" },
      { type: "short", question: "What is the difference between transition and animation?", modelAnswer: "Transition is between slides. Animation is on objects inside a slide." },
    ],
  },
  quiz: {
    passScore: 60, timerSeconds: 300,
    questions: [
      { type: "mcq", question: "Fly In is which type of animation?", options: ["Entrance", "Emphasis", "Exit", "Transition"], answerIndex: 0 },
      { type: "mcq", question: "Pulse is which type?", options: ["Entrance", "Emphasis", "Exit", "Transition"], answerIndex: 1 },
      { type: "mcq", question: "Which menu has Transitions?", options: ["Home", "Transitions", "View", "Insert"], answerIndex: 1 },
      { type: "mcq", question: "Animations are added from the ____ tab.", options: ["Animations", "Insert", "Home", "Design"], answerIndex: 0 },
      { type: "mcq", question: "Audio is inserted from ____.", options: ["Insert", "Home", "Animations", "View"], answerIndex: 0 },
      { type: "mcq", question: "Trigger 'On Click' means animation runs ____.", options: ["automatically", "when we click", "after slide ends", "never"], answerIndex: 1 },
      { type: "mcq", question: "Trigger 'After Previous' means animation runs ____.", options: ["before previous", "after previous one ends", "on key press", "never"], answerIndex: 1 },
      { type: "tf", question: "We can change duration of a transition.", answer: true },
      { type: "tf", question: "Animations always play in the order added.", answer: false },
      { type: "fill", question: "Animation pane lets us change ______ and timing.", answer: "order" },
    ],
  },
  lab: { type: "none" },
};
export default content;
