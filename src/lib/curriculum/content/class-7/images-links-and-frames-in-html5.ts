import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Make web pages richer with images, hyperlinks and inline frames (iframes).",
    objectives: [
      "Use <img> with sizing attributes.",
      "Build internal, external and email links.",
      "Embed pages with <iframe>.",
    ],
    duration: "30 min",
    difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🖼️ Images", body: "<img src=\"pic.jpg\" alt=\"…\" width=\"300\" height=\"200\"> — self-closing tag." },
      { heading: "🔗 Links", body: "<a href=\"…\">. Variants:", bullets: [
        "External: href=\"https://google.com\"",
        "Internal: href=\"about.html\"",
        "Anchor: href=\"#section1\"",
        "Email: href=\"mailto:me@x.com\"",
        "Open in new tab: target=\"_blank\"",
      ] },
      { heading: "🪟 iframe", body: "<iframe src=\"https://example.com\" width=\"600\" height=\"400\"></iframe> embeds another page." },
      { heading: "🛡️ Accessibility", body: "Always supply alt for images and meaningful link text (avoid 'click here')." },
      { heading: "💡 Image map (advanced)", body: "<map> + <area> create clickable regions on an image." },
    ],
  },
  images: {
    items: [
      { emoji: "🖼️", caption: "<img> tag." },
      { emoji: "🔗", caption: "<a> link." },
      { emoji: "🪟", caption: "<iframe> embed." },
      { emoji: "📧", caption: "mailto: link." },
      { emoji: "🆕", caption: "target=_blank." },
      { emoji: "🛡️", caption: "alt text matters." },
    ],
  },
  activities: {
    items: [
      { title: "Photo card 🖼️", steps: ["<img src='profile.jpg' alt='me' width='200'>", "Wrap in <a> linking to your page."] },
      { title: "Email me 📧", steps: ["<a href='mailto:me@x.com'>Email</a>"] },
      { title: "Anchor jump ⛓️", steps: ["Create section with id='top'.", "Link 'Back to top' with #top."] },
      { title: "Embed YouTube 🪟", steps: ["Use <iframe> with the share URL.", "Set width 560, height 315."] },
      { title: "Open new tab 🆕", steps: ["Add target='_blank' to a link.", "Test in browser."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Image tag is…", options: ["<image>", "<img>", "<picture>", "<src>"], answerIndex: 1 },
      { type: "fill", question: "Alt text is for ___.", answer: "accessibility" },
      { type: "tf", question: "<img> has a closing tag.", answer: false },
      { type: "mcq", question: "Email link uses…", options: ["http:", "mail:", "mailto:", "email:"], answerIndex: 2 },
      { type: "fill", question: "Open link in new tab: target='___'.", answer: "_blank" },
      { type: "mcq", question: "Embed external page with…", options: ["<embed>", "<iframe>", "<frame>", "<obj>"], answerIndex: 1 },
      { type: "tf", question: "href specifies the link destination.", answer: true },
      { type: "fill", question: "Anchor on same page uses ___.", answer: "#" },
      { type: "mcq", question: "Image width attribute…", options: ["px only", "Any number (px)", "Percent only", "None"], answerIndex: 1 },
      { type: "tf", question: "iframes can be styled with CSS.", answer: true },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Best link text?", options: ["Click here", "Read pricing details", "Here", "More"], answerIndex: 1 },
      { type: "mcq", question: "iframe primary attribute is…", options: ["href", "src", "alt", "type"], answerIndex: 1 },
      { type: "tf", question: "Images can be linked.", answer: true },
      { type: "fill", question: "Image clickable regions use <map> and ___.", answer: "area" },
      { type: "mcq", question: "Anchor link target id syntax is…", options: ["@id", "#id", ".id", "id:"], answerIndex: 1 },
      { type: "mcq", question: "Browsers may block iframes for…", options: ["Style", "Security", "Speed", "SEO"], answerIndex: 1 },
      { type: "tf", question: "alt is optional and unimportant.", answer: false },
      { type: "fill", question: "<a target='_blank'> opens in new ___.", answer: "tab" },
      { type: "mcq", question: "Image sizing attributes are…", options: ["width/height", "size", "scale", "ratio"], answerIndex: 0 },
      { type: "tf", question: "External link starts with http(s)://", answer: true },
    ],
  },
  lab: { type: "html", instructions: "Build a portfolio page with images, internal nav links, an email link and an embedded iframe." },
};
export default content;
