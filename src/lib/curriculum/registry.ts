// Class & topic registry. This is INTENTIONALLY metadata-only.
// Heavy per-topic content is loaded lazily from src/lib/curriculum/content.

import type { ClassMeta, TopicMeta } from "./types";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CLASS_META: Record<number, Omit<ClassMeta, "classNumber" | "classSlug" | "className">> = {
  1:  { emoji: "🧸", description: "First steps with computers",          gradient: "from-pink-400 to-orange-400",   ageRange: "6-7 yrs" },
  2:  { emoji: "🎨", description: "Smart machines and creative play",     gradient: "from-orange-400 to-yellow-400", ageRange: "7-8 yrs" },
  3:  { emoji: "🚀", description: "Hardware, software and Scratch",       gradient: "from-yellow-400 to-lime-400",   ageRange: "8-9 yrs" },
  4:  { emoji: "🪟", description: "Windows, Word and PowerPoint",         gradient: "from-lime-400 to-emerald-400",  ageRange: "9-10 yrs" },
  5:  { emoji: "📊", description: "Excel, Word and Scratch programming",  gradient: "from-emerald-400 to-cyan-400",  ageRange: "10-11 yrs" },
  6:  { emoji: "💻", description: "Programming, GIMP and HTML/CSS",       gradient: "from-cyan-400 to-sky-500",      ageRange: "11-12 yrs" },
  7:  { emoji: "🐍", description: "Python, HTML and number systems",      gradient: "from-sky-500 to-indigo-500",    ageRange: "12-13 yrs" },
  8:  { emoji: "🌐", description: "Networks, Access and Krita",           gradient: "from-indigo-500 to-violet-500", ageRange: "13-14 yrs" },
  9:  { emoji: "🤖", description: "AI, DBMS and web design",              gradient: "from-violet-500 to-fuchsia-500",ageRange: "14-15 yrs" },
  10: { emoji: "🎓", description: "SQL, Python and cloud computing",      gradient: "from-fuchsia-500 to-pink-500",  ageRange: "15-16 yrs" },
};

// Per-class topic titles + emojis. Keep this list short — content lives elsewhere.
const TOPIC_TITLES: Record<number, Array<{ title: string; emoji: string; desc: string }>> = {
  1: [
    { title: "Computer: A Machine",        emoji: "🖥️", desc: "What computers are and how they help us." },
    { title: "Uses of a Computer",         emoji: "🎯", desc: "Everyday places where computers are used." },
    { title: "Parts of a Computer",        emoji: "🧩", desc: "Monitor, CPU, keyboard and mouse." },
    { title: "The Computer Mouse",         emoji: "🖱️", desc: "How to click, drag and double-click." },
    { title: "Using the Keyboard",         emoji: "⌨️", desc: "Keys, typing and the spacebar." },
    { title: "Fun with MS Paint",          emoji: "🎨", desc: "Draw and color in MS Paint." },
    { title: "Introduction to ScratchJr",  emoji: "🐱", desc: "Make characters move with blocks." },
  ],
  2: [
    { title: "Computer: A Smart Machine",     emoji: "🤖", desc: "Why a computer is called smart." },
    { title: "Computer and Its Parts",        emoji: "🧩", desc: "Input, output and processing parts." },
    { title: "Handling a Mouse and Touchpad", emoji: "🖱️", desc: "Mouse + touchpad gestures." },
    { title: "Keyboard",                      emoji: "⌨️", desc: "Letters, numbers and special keys." },
    { title: "Working in MS Paint",           emoji: "🎨", desc: "Tools, shapes and colors in Paint." },
    { title: "Microsoft Word",                emoji: "📝", desc: "Type, save and print documents." },
    { title: "More on ScratchJr",             emoji: "🐱", desc: "Sounds, scenes and stories." },
  ],
  3: [
    { title: "Introduction to IPO",            emoji: "🔄", desc: "Input → Process → Output." },
    { title: "Computer Hardware and Software", emoji: "🛠️", desc: "Physical parts vs programs." },
    { title: "Operating System",               emoji: "🪟", desc: "What an OS does for you." },
    { title: "Know More About MS Paint",       emoji: "🎨", desc: "Advanced Paint tools." },
    { title: "Working in MS Word",             emoji: "📝", desc: "Format and edit text." },
    { title: "Introduction to Scratch 3.0",    emoji: "🟧", desc: "Block-based coding basics." },
    { title: "Movements of a Sprite",          emoji: "🐾", desc: "Move, turn and rotate sprites." },
  ],
  4: [
    { title: "Computer Devices",              emoji: "💾", desc: "Input, output and storage devices." },
    { title: "Memory and Storage Devices",    emoji: "🗄️", desc: "RAM, ROM, HDD, SSD and pen drives." },
    { title: "Working with Windows",          emoji: "🪟", desc: "Files, folders and the desktop." },
    { title: "Text Formatting in Word",       emoji: "✒️", desc: "Bold, italic, fonts and colors." },
    { title: "Working with Objects in Word",  emoji: "🖼️", desc: "Images, shapes and word art." },
    { title: "Introduction to PowerPoint",    emoji: "📽️", desc: "Slides, layouts and themes." },
    { title: "More on PowerPoint",            emoji: "🎬", desc: "Animations and transitions." },
  ],
  5: [
    { title: "More on Windows",               emoji: "🪟", desc: "Control panel and accessories." },
    { title: "Page Formatting in Word",       emoji: "📄", desc: "Margins, headers and footers." },
    { title: "Advanced Features of Word",     emoji: "📑", desc: "Tables, mail merge and styles." },
    { title: "Enhancing a Presentation",      emoji: "✨", desc: "Charts, sounds and videos." },
    { title: "Introduction to Excel",         emoji: "📊", desc: "Workbooks, sheets and cells." },
    { title: "Working in Excel",              emoji: "🧮", desc: "Formulas and basic functions." },
    { title: "Programming in Scratch 3.0",    emoji: "🟧", desc: "Loops, events and variables." },
  ],
  6: [
    { title: "Computer Languages",            emoji: "🔣", desc: "Low-level vs high-level languages." },
    { title: "Formulas and Functions in Excel", emoji: "📈", desc: "SUM, AVERAGE, IF and more." },
    { title: "Excel as a Database",           emoji: "🗃️", desc: "Sort, filter and look up data." },
    { title: "Exploring GIMP",                emoji: "🖌️", desc: "Image editing fundamentals." },
    { title: "Algorithm and Flowchart",       emoji: "🧭", desc: "Plan logic before coding." },
    { title: "Introduction to HTML5",         emoji: "🌐", desc: "Tags, structure and elements." },
    { title: "Introduction to CSS",           emoji: "🎨", desc: "Style web pages." },
  ],
  7: [
    { title: "Number Systems",                       emoji: "🔢", desc: "Binary, octal, decimal, hex." },
    { title: "Charts in MS Excel",                   emoji: "📊", desc: "Bar, pie and line charts." },
    { title: "More on GIMP",                         emoji: "🖌️", desc: "Layers, filters and masks." },
    { title: "Lists and Tables in HTML5",            emoji: "📋", desc: "ul, ol and table tags." },
    { title: "Images, Links, and Frames in HTML5",   emoji: "🔗", desc: "img, a and iframe tags." },
    { title: "Introduction to Python",               emoji: "🐍", desc: "Variables, print and input." },
    { title: "More on Python",                       emoji: "🐍", desc: "If/else and loops." },
    { title: "Robotics",                             emoji: "🤖", desc: "Sensors, motors and logic." },
  ],
  8: [
    { title: "Networking Concepts",              emoji: "🌐", desc: "LAN, WAN and the internet." },
    { title: "Log On to Access",                 emoji: "🗄️", desc: "Intro to MS Access database." },
    { title: "Queries, Forms, and Reports in Access", emoji: "📑", desc: "Query data and build reports." },
    { title: "Introduction to Krita",            emoji: "🖌️", desc: "Digital painting basics." },
    { title: "Layers and Animation in Krita",    emoji: "🎞️", desc: "Frame-by-frame animation." },
    { title: "Statements in Python",             emoji: "🐍", desc: "Conditionals and loops in depth." },
  ],
  9: [
    { title: "Computer Networks and Internet Services", emoji: "🌐", desc: "Email, web, FTP and more." },
    { title: "Cyber Safety and Security",               emoji: "🛡️", desc: "Stay safe online." },
    { title: "Advanced Excel",                          emoji: "📊", desc: "Pivot tables, VLOOKUP." },
    { title: "Introduction to Database Management System", emoji: "🗄️", desc: "Tables, keys and relations." },
    { title: "HTML5 Forms and Multimedia",              emoji: "📝", desc: "Forms, audio and video." },
    { title: "Python Functions and Modules",            emoji: "🐍", desc: "def, return and import." },
    { title: "Artificial Intelligence Basics",          emoji: "🧠", desc: "What AI is and where it's used." },
    { title: "Web Designing Project",                   emoji: "🚀", desc: "Build a multi-page site." },
  ],
  10: [
    { title: "Digital Documentation",                emoji: "📄", desc: "Templates, styles and TOC." },
    { title: "Electronic Spreadsheet Advanced Tools", emoji: "📊", desc: "Macros, scenarios and goal seek." },
    { title: "Database Management with SQL",         emoji: "🗄️", desc: "SELECT, INSERT, UPDATE, DELETE." },
    { title: "Web Applications and Security",        emoji: "🔐", desc: "Sessions, cookies and HTTPS." },
    { title: "Python File Handling",                 emoji: "🐍", desc: "Read and write files." },
    { title: "Data Visualization in Python",         emoji: "📈", desc: "Charts with matplotlib." },
    { title: "Introduction to Cloud Computing",      emoji: "☁️", desc: "IaaS, PaaS and SaaS." },
    { title: "IT Project and Presentation Skills",   emoji: "🎤", desc: "Plan, build and present a project." },
  ],
};

export const ALL_CLASSES: ClassMeta[] = Object.entries(CLASS_META).map(([n, m]) => {
  const classNumber = Number(n);
  return {
    classNumber,
    classSlug: `class-${classNumber}`,
    className: `Class ${classNumber}`,
    ...m,
  };
});

const buildTopicId = (classNumber: number, topicSlug: string) =>
  `class-${classNumber}-${topicSlug}`;

export const ALL_TOPICS: TopicMeta[] = Object.entries(TOPIC_TITLES).flatMap(([n, list]) => {
  const classNumber = Number(n);
  return list.map((t) => {
    const topicSlug = slugify(t.title);
    return {
      id: buildTopicId(classNumber, topicSlug),
      classNumber,
      classSlug: `class-${classNumber}`,
      topicSlug,
      title: t.title,
      emoji: t.emoji,
      shortDescription: t.desc,
    };
  });
});

export const getClassBySlug = (classSlug: string): ClassMeta | undefined =>
  ALL_CLASSES.find((c) => c.classSlug === classSlug);

export const getClassByNumber = (n: number): ClassMeta | undefined =>
  ALL_CLASSES.find((c) => c.classNumber === n);

export const getTopicsForClass = (classNumber: number): TopicMeta[] =>
  ALL_TOPICS.filter((t) => t.classNumber === classNumber);

export const getTopicBySlug = (classSlug: string, topicSlug: string): TopicMeta | undefined =>
  ALL_TOPICS.find((t) => t.classSlug === classSlug && t.topicSlug === topicSlug);

export const getTopicById = (id: string): TopicMeta | undefined =>
  ALL_TOPICS.find((t) => t.id === id);

// Best-effort: detect which class a free-form className string maps to (e.g. "Class 7", "7th", "VII").
export const detectClassNumber = (className: string | undefined | null): number | null => {
  if (!className) return null;
  const m = className.toLowerCase().match(/(?:class\s*)?(10|[1-9])(?:st|nd|rd|th)?/);
  return m ? Number(m[1]) : null;
};

export const inferLabType = (title: string): import("./types").LabType => {
  const t = title.toLowerCase();
  if (/python/.test(t)) return "python";
  if (/html|css|web/.test(t)) return "html";
  if (/scratch/.test(t)) return "scratch";
  if (/paint|gimp|krita/.test(t)) return "paint";
  if (/excel|spreadsheet/.test(t)) return "sheets";
  if (/word|document/.test(t)) return "word";
  return "none";
};
