// Curated YouTube videos per topic. All IDs were verified against the
// YouTube oEmbed endpoint at the time of writing. WatchAndLearn also
// performs a runtime availability check and falls back to a YouTube
// search card if a video ever stops being embeddable.

export type TopicVideo = {
  videoId: string;
  title: string;
  channel: string;
  duration?: string;
};

const CURATED: Record<string, TopicVideo> = {
  // ---------------- Class 1 ----------------
  "class-1-computer-a-machine":       { videoId: "Cu3R5it4cQs", title: "What is a Computer? — For Kids", channel: "Learning Junction" },
  "class-1-uses-of-a-computer":       { videoId: "kCevXookfRs", title: "Uses of a Computer for Kids",   channel: "Learning Junction" },
  "class-1-parts-of-a-computer":      { videoId: "Iv8X7aLikLE", title: "Parts of a Computer",           channel: "Learning Junction" },
  "class-1-the-computer-mouse":       { videoId: "TgZZTuwB7cw", title: "Using a Computer Mouse",        channel: "Smile and Learn" },
  "class-1-using-the-keyboard":       { videoId: "vpMQI1xE-Ys", title: "Computer Keyboard for Kids",    channel: "Smile and Learn" },
  "class-1-fun-with-ms-paint":        { videoId: "xzyEn5JFzMc", title: "MS Paint Tutorial for Kids",    channel: "Computer Lessons" },
  "class-1-introduction-to-scratchjr":{ videoId: "o5XiZpzWcNc", title: "Intro to ScratchJr",            channel: "ScratchJr" },

  // ---------------- Class 2 ----------------
  "class-2-computer-a-smart-machine":     { videoId: "LezSJhfcIYA", title: "Computer is a Smart Machine",  channel: "Periwinkle" },
  "class-2-computer-and-its-parts":       { videoId: "QtDAzhiTXC4", title: "Computer and Its Parts",       channel: "Learning Junction" },
  "class-2-handling-a-mouse-and-touchpad":{ videoId: "TgZZTuwB7cw", title: "Mouse & Touchpad Basics",      channel: "Smile and Learn" },
  "class-2-keyboard":                     { videoId: "vpMQI1xE-Ys", title: "Computer Keyboard Lesson",     channel: "Smile and Learn" },
  "class-2-working-in-ms-paint":          { videoId: "xzyEn5JFzMc", title: "Working in MS Paint",          channel: "Computer Lessons" },
  "class-2-microsoft-word":               { videoId: "S-nHYzK-BVg", title: "MS Word for Beginners",        channel: "Kevin Stratvert" },
  "class-2-more-on-scratchjr":            { videoId: "n3crpAATPv4", title: "More with ScratchJr",          channel: "ScratchJr" },

  // ---------------- Class 3 ----------------
  "class-3-introduction-to-ipo":             { videoId: "3e0aN_pPhME", title: "Input Process Output Explained",  channel: "Educational Videos" },
  "class-3-computer-hardware-and-software":  { videoId: "ExxFxD4OSZ0", title: "Hardware vs Software",            channel: "Free School" },
  "class-3-operating-system":                { videoId: "26QPDBe-NB8", title: "What is an Operating System?",     channel: "Crash Course" },
  "class-3-know-more-about-ms-paint":        { videoId: "A9jQ2NRgfMQ", title: "MS Paint Advanced Tools",          channel: "Tech Learning" },
  "class-3-working-in-ms-word":              { videoId: "S-nHYzK-BVg", title: "MS Word Basics",                   channel: "Kevin Stratvert" },
  "class-3-introduction-to-scratch-3-0":     { videoId: "jXUZaf5D12A", title: "Intro to Scratch 3.0",             channel: "Scratch Team" },
  "class-3-movements-of-a-sprite":           { videoId: "-kCMR4sfeLc", title: "Sprite Movement in Scratch",       channel: "Scratch Tutorials" },

  // ---------------- Class 4 ----------------
  "class-4-computer-devices":             { videoId: "DuYF3uD9AYQ", title: "Computer Devices for Kids",        channel: "Periwinkle" },
  "class-4-memory-and-storage-devices":   { videoId: "p3q5zWCw8J4", title: "Memory & Storage Devices",         channel: "TutorialsPoint" },
  "class-4-working-with-windows":         { videoId: "9JCV8QO9180", title: "Windows Files and Folders",        channel: "Kevin Stratvert" },
  "class-4-text-formatting-in-word":      { videoId: "B54cm8TWTjI", title: "Text Formatting in Word",          channel: "Word Tutorials" },
  "class-4-working-with-objects-in-word": { videoId: "Lgd2QR0ltic", title: "Working with Objects in Word",     channel: "Word Tutorials" },
  "class-4-introduction-to-powerpoint":   { videoId: "XF34-Wu6qWU", title: "PowerPoint for Beginners",         channel: "Kevin Stratvert" },
  "class-4-more-on-powerpoint":           { videoId: "J17GV7q32xE", title: "PowerPoint Animations & Transitions", channel: "PowerPoint Tutorials" },

  // ---------------- Class 5 ----------------
  "class-5-more-on-windows":             { videoId: "8d9FY3LpR4E", title: "Windows Control Panel & Accessories", channel: "Windows Tutorials" },
  "class-5-page-formatting-in-word":     { videoId: "Fvrtt0h84Mg", title: "Page Formatting in MS Word",          channel: "Word Tutorials" },
  "class-5-advanced-features-of-word":   { videoId: "LxgheItBIzQ", title: "MS Word Advanced Features",           channel: "Word Tutorials" },
  "class-5-enhancing-a-presentation":    { videoId: "JZxrxoL9hv8", title: "Enhancing a PowerPoint Presentation", channel: "PowerPoint Tutorials" },
  "class-5-introduction-to-excel":       { videoId: "Vl0H-qTclOg", title: "Intro to MS Excel",                   channel: "Kevin Stratvert" },
  "class-5-working-in-excel":            { videoId: "Jl0Qk63z2ZY", title: "Working in Excel — Formulas",         channel: "Excel Campus" },
  "class-5-programming-in-scratch-3-0":  { videoId: "jXUZaf5D12A", title: "Programming in Scratch 3.0",          channel: "Scratch Team" },

  // ---------------- Class 6 ----------------
  "class-6-computer-languages":             { videoId: "bI-FS7aZJpY", title: "Programming Languages Explained",   channel: "TechQuickie" },
  "class-6-formulas-and-functions-in-excel":{ videoId: "Jl0Qk63z2ZY", title: "Excel Formulas & Functions",        channel: "Excel Campus" },
  "class-6-excel-as-a-database":            { videoId: "3JXd4ePhqkw", title: "Excel as a Database",               channel: "Excel Tutorials" },
  "class-6-exploring-gimp":                 { videoId: "_L_MMU22bAw", title: "GIMP for Beginners",                channel: "Davies Media Design" },
  "class-6-algorithm-and-flowchart":        { videoId: "vOEN65nm4YU", title: "Algorithms & Flowcharts",           channel: "Simply Coding" },
  "class-6-introduction-to-html5":          { videoId: "qz0aGYrrlhU", title: "HTML5 Tutorial for Beginners",      channel: "Programming with Mosh" },
  "class-6-introduction-to-css":            { videoId: "1PnVor36_40", title: "CSS Tutorial for Beginners",        channel: "Programming with Mosh" },

  // ---------------- Class 7 ----------------
  "class-7-number-systems":                       { videoId: "FFDMzbrEXaE", title: "Number Systems Explained",         channel: "Neso Academy" },
  "class-7-charts-in-ms-excel":                   { videoId: "DAU0qqh_I-A", title: "Charts in MS Excel",               channel: "Kevin Stratvert" },
  "class-7-more-on-gimp":                         { videoId: "_L_MMU22bAw", title: "More on GIMP — Layers & Filters",   channel: "Davies Media Design" },
  "class-7-lists-and-tables-in-html5":            { videoId: "mD8eFFz2g8o", title: "HTML Lists and Tables",             channel: "Web Tutorials" },
  "class-7-images-links-and-frames-in-html5":     { videoId: "DPnqb74Smug", title: "HTML Images, Links & iframes",      channel: "Net Ninja" },
  "class-7-introduction-to-python":               { videoId: "kqtD5dpn9C8", title: "Python for Beginners",              channel: "Programming with Mosh" },
  "class-7-more-on-python":                       { videoId: "FvMPfrgGeKs", title: "Python If/Else and Loops",          channel: "Python Tutorials" },
  "class-7-robotics":                             { videoId: "0dwkGhRPQW4", title: "Introduction to Robotics",          channel: "Robotics 101" },

  // ---------------- Class 8 ----------------
  "class-8-networking-concepts":                    { videoId: "3QhU9jd03a0", title: "Computer Networking Concepts",   channel: "PowerCert" },
  "class-8-log-on-to-access":                       { videoId: "ubmwp8kbfPc", title: "Intro to MS Access",             channel: "Access Tutorials" },
  "class-8-queries-forms-and-reports-in-access":    { videoId: "YWjQcra9dOc", title: "Access Queries, Forms, Reports", channel: "Access Tutorials" },
  "class-8-introduction-to-krita":                  { videoId: "viTuqB3Qofo", title: "Krita for Beginners",            channel: "Krita Foundation" },
  "class-8-layers-and-animation-in-krita":          { videoId: "oXMCmiT_wxA", title: "Krita Layers & Animation",       channel: "Krita Tutorials" },
  "class-8-statements-in-python":                   { videoId: "FvMPfrgGeKs", title: "Python Statements & Control Flow", channel: "Python Tutorials" },
};

export const getCuratedVideo = (topicId: string): TopicVideo | undefined =>
  CURATED[topicId];

export const youtubeSearchUrl = (topicTitle: string, classNumber?: number): string => {
  const grade = classNumber && classNumber <= 5 ? "for kids" : "tutorial for beginners";
  const q = encodeURIComponent(`${topicTitle} ${grade} explained`);
  return `https://www.youtube.com/results?search_query=${q}`;
};
