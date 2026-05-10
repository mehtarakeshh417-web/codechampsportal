// Class-wise curriculum data (Avartan)
// Topics replaced per Avartan curriculum spec.

export interface TopicContent {
  id: string;
  title: string;
  content: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: "activity" | "project";
}

export interface Topic {
  id: string;
  title: string;
  lessons: TopicContent[];
  activities: Activity[];
}

export interface Subject {
  id: string;
  title: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export interface ClassCurriculum {
  classId: string;
  className: string;
  subjects: Subject[];
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const makeTopic = (classId: string, title: string): Topic => {
  const id = `${classId}-${slug(title)}`;
  return {
    id,
    title,
    lessons: [
      {
        id: `${id}-lesson-0`,
        title: `Introduction to ${title}`,
        content: `Learn about ${title}. Detailed content will be added soon.`,
      },
    ],
    activities: [
      {
        id: `${id}-act-0`,
        title: `Activity: ${title}`,
        description: `Practice activity for ${title}.`,
        type: "activity",
      },
    ],
  };
};

const COLORS = ["neon-blue", "neon-green", "neon-orange", "neon-purple", "neon-pink"];
const ICONS = [
  "Monitor", "Cpu", "HardDrive", "Palette", "FileText", "Presentation",
  "Table", "Code", "Gamepad2", "Image", "Layers", "Database",
  "Paintbrush", "Layout", "Smartphone", "Sparkles", "BarChart3", "Terminal",
];

const buildClass = (classId: string, className: string, topicTitles: string[]): ClassCurriculum => ({
  classId,
  className,
  subjects: topicTitles.map((title, i) => ({
    id: `${classId}-sub-${i}`,
    title,
    icon: ICONS[i % ICONS.length],
    color: COLORS[i % COLORS.length],
    topics: [makeTopic(classId, title)],
  })),
});

export const CURRICULUM: ClassCurriculum[] = [
  buildClass("1st", "Class 1", [
    "Computer: A Machine",
    "Uses of a Computer",
    "Parts of a Computer",
    "The Computer Mouse",
    "Using the Keyboard",
    "Fun with MS Paint",
    "Introduction to ScratchJr",
  ]),
  buildClass("2nd", "Class 2", [
    "Computer: A Smart Machine",
    "Computer and Its Parts",
    "Handling a Mouse and Touchpad",
    "Keyboard",
    "Working in MS Paint",
    "Microsoft Word",
    "More on ScratchJr",
  ]),
  buildClass("3rd", "Class 3", [
    "Introduction to IPO",
    "Computer Hardware and Software",
    "Operating System",
    "Know More About MS Paint",
    "Working in MS Word",
    "Introduction to Scratch 3.0",
    "Movements of a Sprite",
  ]),
  buildClass("4th", "Class 4", [
    "Computer Devices",
    "Memory and Storage Devices",
    "Working with Windows",
    "Text Formatting in Word",
    "Working with Objects in Word",
    "Introduction to PowerPoint",
    "More on PowerPoint",
  ]),
  buildClass("5th", "Class 5", [
    "More on Windows",
    "Page Formatting in Word",
    "Advanced Features of Word",
    "Enhancing a Presentation",
    "Introduction to Excel",
    "Working in Excel",
    "Programming in Scratch 3.0",
  ]),
  buildClass("6th", "Class 6", [
    "Computer Languages",
    "Formulas and Functions in Excel",
    "Excel as a Database",
    "Exploring GIMP",
    "Algorithm and Flowchart",
    "Introduction to HTML5",
    "Introduction to CSS",
  ]),
  buildClass("7th", "Class 7", [
    "Number Systems",
    "Charts in MS Excel",
    "More on GIMP",
    "Lists and Tables in HTML5",
    "Images, Links, and Frames in HTML5",
    "Introduction to Python",
    "More on Python",
    "Robotics",
  ]),
  buildClass("8th", "Class 8", [
    "Networking Concepts",
    "Log On to Access",
    "Queries, Forms, and Reports in Access",
    "Introduction to Krita",
    "Layers and Animation in Krita",
    "Statements in Python",
  ]),
  buildClass("9th", "Class 9", [
    "Computer Networks and Internet Services",
    "Cyber Safety and Security",
    "Advanced Excel",
    "Introduction to Database Management System",
    "HTML5 Forms and Multimedia",
    "Python Functions and Modules",
    "Artificial Intelligence Basics",
    "Web Designing Project",
  ]),
  buildClass("10th", "Class 10", [
    "Digital Documentation",
    "Electronic Spreadsheet Advanced Tools",
    "Database Management with SQL",
    "Web Applications and Security",
    "Python File Handling",
    "Data Visualization in Python",
    "Introduction to Cloud Computing",
    "IT Project and Presentation Skills",
  ]),
];

export const getCurriculumForClass = (className: string): ClassCurriculum | undefined => {
  if (!className) return undefined;
  const normalized = className.toLowerCase().replace(/\s+/g, "");
  return CURRICULUM.find(
    (c) =>
      c.classId.toLowerCase() === normalized ||
      c.className.toLowerCase().replace(/\s+/g, "") === normalized
  );
};
