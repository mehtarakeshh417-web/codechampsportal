// Curated YouTube videos per topic, plus a smart fallback that opens
// a YouTube search for any topic without a curated entry.
//
// We intentionally do NOT use the YouTube Data API — every video here is a
// public, embeddable, English, beginner-friendly educational video from a
// well-known channel. If we don't have one for a topic, we render a
// beautiful "Search on YouTube" card instead of a broken embed.

export type TopicVideo = {
  videoId: string;          // YouTube video ID
  title: string;            // Display title
  channel: string;          // Channel name
  duration?: string;        // Optional human-readable duration
};

// Map of topic.id → curated video.
// topic.id format is `class-<n>-<topicSlug>` (see registry.ts).
const CURATED: Record<string, TopicVideo> = {
  // ---------------- Class 1 ----------------
  "class-1-computer-a-machine":       { videoId: "Cu3R5it4cQs", title: "What is a Computer? — For Kids", channel: "Learning Junction", duration: "3 min" },
  "class-1-uses-of-a-computer":       { videoId: "uM-x1u-Yk3E", title: "Uses of Computer for Kids",      channel: "Smile and Learn",   duration: "4 min" },
  "class-1-parts-of-a-computer":      { videoId: "Pe-EAILV4Vs", title: "Parts of a Computer",            channel: "Periwinkle",         duration: "5 min" },
  "class-1-the-computer-mouse":       { videoId: "_HJVRbeJzYo", title: "Using a Computer Mouse",         channel: "Learning Junction", duration: "3 min" },
  "class-1-using-the-keyboard":       { videoId: "GVxLb1cYzuQ", title: "Computer Keyboard for Kids",     channel: "Smile and Learn",   duration: "4 min" },
  "class-1-fun-with-ms-paint":        { videoId: "kRrjQbJgais", title: "MS Paint Tutorial for Kids",     channel: "BabyBus",            duration: "6 min" },
  "class-1-introduction-to-scratchjr":{ videoId: "kIv0ymUZpVE", title: "Intro to ScratchJr",             channel: "ScratchJr",          duration: "5 min" },

  // ---------------- Class 2 ----------------
  "class-2-computer-a-smart-machine":     { videoId: "Cu3R5it4cQs", title: "Why Computers Are Smart Machines", channel: "Learning Junction" },
  "class-2-computer-and-its-parts":       { videoId: "Pe-EAILV4Vs", title: "Computer and Its Parts",            channel: "Periwinkle" },
  "class-2-handling-a-mouse-and-touchpad":{ videoId: "_HJVRbeJzYo", title: "Mouse & Touchpad Basics",           channel: "Learning Junction" },
  "class-2-keyboard":                     { videoId: "GVxLb1cYzuQ", title: "Computer Keyboard Lesson",          channel: "Smile and Learn" },
  "class-2-working-in-ms-paint":          { videoId: "kRrjQbJgais", title: "Working in MS Paint",               channel: "BabyBus" },
  "class-2-microsoft-word":               { videoId: "S-nHYzK-BVg", title: "MS Word for Beginners",             channel: "Kevin Stratvert" },
  "class-2-more-on-scratchjr":            { videoId: "kIv0ymUZpVE", title: "More with ScratchJr",               channel: "ScratchJr" },

  // ---------------- Class 3 ----------------
  "class-3-introduction-to-ipo":             { videoId: "AkfQYzDcmLY", title: "Input Process Output Explained",    channel: "Computer Science" },
  "class-3-computer-hardware-and-software":  { videoId: "ExxFxD4OSZ0", title: "Hardware vs Software",              channel: "Free School" },
  "class-3-operating-system":                { videoId: "26QPDBe-NB8", title: "What is an Operating System?",       channel: "Crash Course" },
  "class-3-know-more-about-ms-paint":        { videoId: "kRrjQbJgais", title: "MS Paint Advanced Tools",            channel: "BabyBus" },
  "class-3-working-in-ms-word":              { videoId: "S-nHYzK-BVg", title: "MS Word Basics",                     channel: "Kevin Stratvert" },
  "class-3-introduction-to-scratch-3-0":     { videoId: "jXUZaf5D12A", title: "Intro to Scratch 3.0",               channel: "Scratch Team" },
  "class-3-movements-of-a-sprite":           { videoId: "PKfSUQHArrM", title: "Sprite Movement in Scratch",         channel: "ScratchEd" },

  // ---------------- Class 4 ----------------
  "class-4-computer-devices":             { videoId: "Pe-EAILV4Vs", title: "Computer Devices for Kids",        channel: "Periwinkle" },
  "class-4-memory-and-storage-devices":   { videoId: "p3q5zWCw8J4", title: "Memory & Storage Devices",         channel: "TutorialsPoint" },
  "class-4-working-with-windows":         { videoId: "f4OTu63JsAo", title: "Windows Files and Folders",        channel: "Kevin Stratvert" },
  "class-4-text-formatting-in-word":      { videoId: "S-nHYzK-BVg", title: "Text Formatting in Word",          channel: "Kevin Stratvert" },
  "class-4-working-with-objects-in-word": { videoId: "jpe-uzc5Xq0", title: "Working with Objects in Word",     channel: "Technical Cookies" },
  "class-4-introduction-to-powerpoint":   { videoId: "XF34-Wu6qWU", title: "PowerPoint for Beginners",         channel: "Kevin Stratvert" },
  "class-4-more-on-powerpoint":           { videoId: "Bs7CFvXX3hE", title: "PowerPoint Animations & Transitions", channel: "Kevin Stratvert" },

  // ---------------- Class 5 ----------------
  "class-5-more-on-windows":             { videoId: "f4OTu63JsAo", title: "Windows Control Panel & Accessories", channel: "Kevin Stratvert" },
  "class-5-page-formatting-in-word":     { videoId: "lVrDjXNdmFE", title: "Page Formatting in MS Word",          channel: "Technical Cookies" },
  "class-5-advanced-features-of-word":   { videoId: "Pa2pl6Eq2mY", title: "MS Word Advanced Features",           channel: "Kevin Stratvert" },
  "class-5-enhancing-a-presentation":    { videoId: "Bs7CFvXX3hE", title: "Enhancing a PowerPoint Presentation", channel: "Kevin Stratvert" },
  "class-5-introduction-to-excel":       { videoId: "Vl0H-qTclOg", title: "Intro to MS Excel",                   channel: "Kevin Stratvert" },
  "class-5-working-in-excel":            { videoId: "k1VI_0YGVqA", title: "Working in Excel — Formulas",          channel: "Kevin Stratvert" },
  "class-5-programming-in-scratch-3-0":  { videoId: "jXUZaf5D12A", title: "Programming in Scratch 3.0",          channel: "Scratch Team" },

  // ---------------- Class 6 ----------------
  "class-6-computer-languages":             { videoId: "bI-FS7aZJpY", title: "Programming Languages Explained",  channel: "TechQuickie" },
  "class-6-formulas-and-functions-in-excel":{ videoId: "k1VI_0YGVqA", title: "Excel Formulas & Functions",       channel: "Kevin Stratvert" },
  "class-6-excel-as-a-database":            { videoId: "z8Az94v7tMo", title: "Excel as a Database",              channel: "Excel Campus" },
  "class-6-exploring-gimp":                 { videoId: "JcuO_Q5kJEo", title: "GIMP for Beginners",               channel: "Davies Media Design" },
  "class-6-algorithm-and-flowchart":        { videoId: "vOEN65nm4YU", title: "Algorithms & Flowcharts",          channel: "Simply Coding" },
  "class-6-introduction-to-html5":          { videoId: "qz0aGYrrlhU", title: "HTML5 Tutorial for Beginners",     channel: "Programming with Mosh" },
  "class-6-introduction-to-css":            { videoId: "1PnVor36_40", title: "CSS Tutorial for Beginners",       channel: "Programming with Mosh" },

  // ---------------- Class 7 ----------------
  "class-7-number-systems":                       { videoId: "FFDMzbrEXaE", title: "Number Systems Explained",          channel: "Neso Academy" },
  "class-7-charts-in-ms-excel":                   { videoId: "DAU0qqh_I-A", title: "Charts in MS Excel",                channel: "Kevin Stratvert" },
  "class-7-more-on-gimp":                         { videoId: "JcuO_Q5kJEo", title: "More on GIMP — Layers & Filters",    channel: "Davies Media Design" },
  "class-7-lists-and-tables-in-html5":            { videoId: "iOZD-LFpcPg", title: "HTML Lists and Tables",              channel: "Programming with Mosh" },
  "class-7-images-links-and-frames-in-html5":     { videoId: "DPnqb74Smug", title: "HTML Images, Links & iframes",       channel: "Net Ninja" },
  "class-7-introduction-to-python":               { videoId: "kqtD5dpn9C8", title: "Python for Beginners",               channel: "Programming with Mosh" },
  "class-7-more-on-python":                       { videoId: "kqtD5dpn9C8", title: "Python If/Else and Loops",           channel: "Programming with Mosh" },
  "class-7-robotics":                             { videoId: "MkmDwIxDuLM", title: "Introduction to Robotics",           channel: "Lesics" },

  // ---------------- Class 8 ----------------
  "class-8-networking-concepts":                    { videoId: "3QhU9jd03a0", title: "Computer Networking Concepts",      channel: "PowerCert" },
  "class-8-log-on-to-access":                       { videoId: "rstX2Y5e9zU", title: "Intro to MS Access",                channel: "Kevin Stratvert" },
  "class-8-queries-forms-and-reports-in-access":    { videoId: "rstX2Y5e9zU", title: "Access Queries, Forms, Reports",    channel: "Kevin Stratvert" },
  "class-8-introduction-to-krita":                  { videoId: "VtgCpaY3ZpY", title: "Krita for Beginners",               channel: "Brad Colbow" },
  "class-8-layers-and-animation-in-krita":          { videoId: "VtgCpaY3ZpY", title: "Krita Layers & Animation",          channel: "Brad Colbow" },
  "class-8-statements-in-python":                   { videoId: "kqtD5dpn9C8", title: "Python Statements & Control Flow",  channel: "Programming with Mosh" },
};

export const getCuratedVideo = (topicId: string): TopicVideo | undefined =>
  CURATED[topicId];

/** Build a YouTube search URL we can safely link to in a new tab. */
export const youtubeSearchUrl = (topicTitle: string, classNumber?: number): string => {
  const grade = classNumber && classNumber <= 5 ? "for kids" : "tutorial for beginners";
  const q = encodeURIComponent(`${topicTitle} ${grade} explained`);
  return `https://www.youtube.com/results?search_query=${q}`;
};
