// Curriculum content for Classes 6-8
import c6Html from "@/assets/curriculum/c6-html-basics.jpg";
import c6Python from "@/assets/curriculum/c6-python-basics.jpg";
import c6InternetImg from "@/assets/curriculum/c6-internet.jpg";
import c6ExcelFormulas from "@/assets/curriculum/c6-excel-formulas.jpg";
import c6GimpInterface from "@/assets/curriculum/c6-gimp-interface.jpg";
import c6AiBasics from "@/assets/curriculum/c6-ai-basics.jpg";
import c7ExcelCharts from "@/assets/curriculum/c7-excel-charts.jpg";
import c8MsAccess from "@/assets/curriculum/c8-ms-access.jpg";
import c8KritaInterface from "@/assets/curriculum/c8-krita-interface.jpg";
import c8CanvaInterface from "@/assets/curriculum/c8-canva-interface.jpg";
import c8AppInventor from "@/assets/curriculum/c8-appinventor.jpg";

import type { TopicTextbook } from "./class5Content";

// ======================== CLASS 6: HTML BASICS ========================
const c6HtmlIntro: TopicTextbook = {
  topicId: "c6-html-intro",
  topicTitle: "Introduction to HTML",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "What is HTML?",
      subtitle: "The language of the web!",
      bannerImage: c6Html,
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Understanding HTML",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
          body: "**HTML** stands for **HyperText Markup Language**. It's the language used to create web pages!\n\nEvery website you visit — Google, YouTube, Wikipedia — is built with HTML.\n\n**What HTML does:**\n📄 Defines the **structure** of a web page\n📝 Adds **text** (headings, paragraphs, lists)\n🖼️ Adds **images** and videos\n🔗 Creates **links** to other pages\n📊 Creates **tables** for organized data\n📋 Creates **forms** for user input",
          youtubeId: "FG44xi1ujac",
          funFact: "HTML was invented by Tim Berners-Lee in 1991. He also invented the World Wide Web!",
          keyTerms: [
            { term: "HTML", definition: "HyperText Markup Language — the standard language for creating web pages" },
            { term: "Tag", definition: "A special keyword surrounded by angle brackets like <p> that defines elements" },
            { term: "Element", definition: "An HTML tag plus its content, e.g. <p>Hello</p>" },
            { term: "Attribute", definition: "Extra information added to a tag, like href in <a href='...'>" }
          ],
          codeBlock: {
            language: "html",
            code: "<h1>Hello World!</h1>\n<p>This is my first paragraph.</p>\n<a href=\"https://google.com\">Visit Google</a>"
          }
        },
        {
          heading: "HTML vs Other Technologies",
          body: "HTML works together with CSS and JavaScript to build modern websites. Each technology has a specific role:",
          comparison: {
            left: { title: "HTML (Structure)", points: ["Defines what is on the page", "Headings, paragraphs, images", "The skeleton of a website", "Cannot style or animate"] },
            right: { title: "CSS (Styling)", points: ["Defines how things look", "Colors, fonts, spacing", "The clothing of a website", "Cannot add content"] }
          },
          warningNote: "HTML alone creates plain-looking pages. You'll need CSS (which you'll learn later) to make them beautiful!"
        }
      ]
    },
    {
      pageTitle: "Basic HTML Structure",
      subtitle: "Every webpage starts here",
      bannerColor: "from-indigo-500 to-purple-500",
      sections: [
        {
          heading: "The HTML Skeleton",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
          body: "Every HTML page has this basic structure. Think of it as the **blueprint** — without it, the browser won't know how to display your content!",
          tip: "Think of `<head>` as the brain (thinking but invisible) and `<body>` as the body (visible to everyone)!",
          codeBlock: {
            language: "html",
            code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page Title</title>\n</head>\n<body>\n  <h1>Welcome!</h1>\n  <p>This is my first webpage.</p>\n</body>\n</html>"
          },
          stepByStep: {
            steps: [
              { title: "DOCTYPE Declaration", description: "Write `<!DOCTYPE html>` to tell the browser this is an HTML5 document" },
              { title: "Open the HTML tag", description: "Add `<html>` — this is the root element that wraps everything" },
              { title: "Add the Head section", description: "Inside `<head>`, add `<title>` for the browser tab text. This section is **invisible** to visitors" },
              { title: "Add the Body section", description: "Inside `<body>`, add your visible content — headings, paragraphs, images, everything!" },
              { title: "Close all tags", description: "Close every tag in reverse order: `</body>`, then `</html>`. Always close what you open!" }
            ]
          },
          table: {
            headers: ["Tag", "Purpose", "Visible?"],
            rows: [
              ["`<!DOCTYPE>`", "Declares HTML5 document type", "No"],
              ["`<html>`", "Root element — wraps everything", "No"],
              ["`<head>`", "Page metadata, title, styles", "No"],
              ["`<title>`", "Text shown in browser tab", "Tab only"],
              ["`<body>`", "All visible page content", "Yes"]
            ]
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "HTML stands for HyperText ___ Language.", answer: "markup" },
        { type: "fill-in-blank", question: "The content visible on a webpage goes inside the ___ tag.", answer: "body" },
        { type: "true-false", question: "The <head> section content is visible on the webpage.", answer: "False", options: ["True", "False"] },
        { type: "mcq", question: "Which tag contains the text that appears in the browser tab?", answer: "<title>", choices: ["<head>", "<title>", "<body>", "<h1>"] },
        { type: "ordering", question: "Arrange these HTML tags in the correct nesting order (outermost to innermost):", answer: "", orderItems: ["<!DOCTYPE html>", "<html>", "<head>", "<body>", "<p>Content</p>"] },
        { type: "practice", question: "Open the HTML editor. Create a basic HTML page with a title, a heading (h1), and two paragraphs about yourself. Click Run to see the preview!", answer: "" },
      ]
    },
    {
      pageTitle: "Headings and Paragraphs",
      subtitle: "Structuring your content",
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "Text Elements",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
          body: "**Headings** — 6 levels, from biggest to smallest:\n`<h1>` — Main heading (use once per page)\n`<h2>` — Section heading\n`<h3>` — Sub-section\n`<h4>` — Sub-sub-section\n`<h5>` — Small heading\n`<h6>` — Smallest heading\n\n**Paragraphs:**\n`<p>This is a paragraph of text.</p>`\n\n**Line Breaks:**\n`<br>` — starts a new line (no closing tag needed!)\n\n**Horizontal Rule:**\n`<hr>` — draws a horizontal line across the page\n\n**Text Formatting:**\n`<b>bold text</b>` — **bold**\n`<i>italic text</i>` — *italic*\n`<u>underlined text</u>` — underlined\n`<strong>important</strong>` — **strong emphasis**\n`<em>emphasized</em>` — *emphasized*\n`<mark>highlighted</mark>` — highlighted text\n`<del>deleted</del>` — ~~strikethrough~~",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The largest heading tag is ___.", answer: "h1" },
        { type: "fill-in-blank", question: "The ___ tag creates a horizontal line.", answer: "hr" },
        { type: "true-false", question: "<br> needs a closing tag.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create an HTML page about 'My School' using h1 for the title, h2 for sections (Location, Teachers, Subjects), paragraphs for descriptions, and bold/italic for emphasis.", answer: "" },
      ]
    },
    {
      pageTitle: "Lists and Links",
      subtitle: "Organizing content and connecting pages",
      bannerColor: "from-green-500 to-teal-500",
      sections: [
        {
          heading: "HTML Lists",
          body: "**Unordered List** (bullet points):\n```\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n```\n\n**Ordered List** (numbered):\n```\n<ol>\n  <li>First</li>\n  <li>Second</li>\n  <li>Third</li>\n</ol>\n```\n\n**Links (Anchor tags):**\n```\n<a href=\"https://google.com\">Click here for Google</a>\n```\n\n`href` = the URL to link to\nThe text between tags is what users see and click\n\n**Open in new tab:**\n```\n<a href=\"https://google.com\" target=\"_blank\">Google</a>\n```",
          tip: "Always use `target=\"_blank\"` for external links so visitors don't leave your website!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The tag for an unordered (bullet) list is ___.", answer: "ul" },
        { type: "fill-in-blank", question: "Each list item uses the ___ tag.", answer: "li" },
        { type: "true-false", question: "The href attribute contains the URL for a link.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create an HTML page with: an ordered list of your top 5 favorite things, an unordered list of your hobbies, and 3 links to your favorite websites.", answer: "" },
      ]
    },
    {
      pageTitle: "Images and Tables",
      subtitle: "Adding visuals and organizing data",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Images in HTML",
          body: "**Adding an image:**\n```\n<img src=\"photo.jpg\" alt=\"My Photo\" width=\"300\">\n```\n\n**Attributes:**\n• `src` — the image file path or URL\n• `alt` — description if image can't load (important for accessibility!)\n• `width` — image width in pixels\n• `height` — image height in pixels\n\n**HTML Tables:**\n```\n<table border=\"1\">\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>Arjun</td>\n    <td>10</td>\n  </tr>\n</table>\n```\n\n**Table tags:**\n• `<table>` — creates the table\n• `<tr>` — table row\n• `<th>` — table header (bold, centered)\n• `<td>` — table data (regular cell)\n• `border` attribute adds visible borders",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ attribute provides alternative text for images.", answer: "alt" },
        { type: "fill-in-blank", question: "The ___ tag creates a table row.", answer: "tr" },
        { type: "practice", question: "Create an HTML page with a table showing your class timetable (5 columns for weekdays, rows for each period). Add an image at the top of the page.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "Test your HTML knowledge!",
      bannerColor: "from-purple-500 to-pink-500",
      sections: [
        { heading: "Summary", body: "✅ HTML creates the structure of web pages\n✅ Basic structure: `<html>`, `<head>`, `<body>`\n✅ Headings: `<h1>` to `<h6>`\n✅ Paragraphs: `<p>`, Line breaks: `<br>`\n✅ Text formatting: `<b>`, `<i>`, `<u>`, `<strong>`\n✅ Lists: `<ul>` (bullets), `<ol>` (numbers), `<li>` (items)\n✅ Links: `<a href=\"...\">`\n✅ Images: `<img src=\"...\" alt=\"...\">`\n✅ Tables: `<table>`, `<tr>`, `<th>`, `<td>`" }
      ],
      exercises: [
        { type: "fill-in-blank", question: "HTML was invented by Tim Berners-___.", answer: "lee" },
        { type: "true-false", question: "Every HTML page needs a <body> tag.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Build a complete personal portfolio page with: your name as h1, an 'About Me' section with paragraph, a list of hobbies, a table of your subjects and marks, and links to interesting websites. Style it to look nice!", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: CSS BASICS ========================
const c6CssIntro: TopicTextbook = {
  topicId: "c6-css-intro",
  topicTitle: "Introduction to CSS",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "What is CSS?",
      subtitle: "Making HTML beautiful!",
      bannerColor: "from-purple-500 to-pink-500",
      sections: [
        {
          heading: "CSS — Cascading Style Sheets",
          image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
          body: "**CSS** controls how HTML elements LOOK — colors, fonts, sizes, spacing, layouts.\n\n**HTML = structure** (the skeleton)\n**CSS = style** (the clothing and makeup)\n\n**Three ways to add CSS:**\n\n1️⃣ **Inline** — directly on an element:\n`<p style=\"color: blue; font-size: 20px;\">Blue text</p>`\n\n2️⃣ **Internal** — in a `<style>` tag in `<head>`:\n```\n<style>\n  p { color: blue; font-size: 20px; }\n</style>\n```\n\n3️⃣ **External** — separate .css file (best practice):\n`<link rel=\"stylesheet\" href=\"style.css\">`\n\n**CSS Syntax:**\n```\nselector {\n  property: value;\n  property: value;\n}\n```\n\n**Example:**\n```\nh1 {\n  color: red;\n  font-size: 36px;\n  text-align: center;\n}\n```",
          tip: "External CSS is the best practice because you can style your entire website from one file!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "CSS stands for Cascading ___ Sheets.", answer: "style" },
        { type: "true-false", question: "External CSS is the recommended way to add styles.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create an HTML page and add internal CSS to: make h1 red and centered, make paragraphs blue with 18px font, and give the body a light yellow background.", answer: "" },
      ]
    },
    {
      pageTitle: "Colors, Fonts & Backgrounds",
      subtitle: "The visual essentials",
      bannerColor: "from-pink-500 to-rose-500",
      sections: [
        {
          heading: "CSS Visual Properties",
          body: "**Colors:**\n• `color: red;` — text color (named colors)\n• `color: #FF0000;` — hex code\n• `color: rgb(255, 0, 0);` — RGB values\n• `background-color: yellow;` — background color\n\n**Fonts:**\n• `font-family: Arial, sans-serif;` — font name\n• `font-size: 16px;` — text size\n• `font-weight: bold;` — bold text\n• `font-style: italic;` — italic text\n• `text-decoration: underline;` — underline\n• `text-align: center;` — alignment\n• `text-transform: uppercase;` — ALL CAPS\n\n**Backgrounds:**\n• `background-color: #f0f0f0;` — solid color\n• `background-image: url('bg.jpg');` — image background\n• `background-size: cover;` — fill entire area\n\n**Spacing:**\n• `margin: 20px;` — space OUTSIDE the element\n• `padding: 15px;` — space INSIDE the element\n• `border: 2px solid black;` — border around element",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The CSS property for text color is ___.", answer: "color" },
        { type: "fill-in-blank", question: "___ adds space inside an element.", answer: "padding" },
        { type: "practice", question: "Style a personal profile page with: a colored header, custom fonts, background color, bordered sections, and different text colors for headings vs paragraphs.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: PYTHON BASICS ========================
const c6PythonIntro: TopicTextbook = {
  topicId: "c6-py-intro",
  topicTitle: "Introduction to Python Programming",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "What is Python?",
      subtitle: "The world's most popular programming language!",
      bannerImage: c6Python,
      bannerColor: "from-green-600 to-emerald-500",
      sections: [
        {
          heading: "Welcome to Python!",
          body: "**Python** is a programming language that's easy to learn and incredibly powerful!\n\n**Why Python is great for beginners:**\n📖 Simple, readable syntax (looks like English)\n🚀 Used by Google, Netflix, Instagram, NASA\n🎮 Can make games, websites, AI, robots\n📊 Great for data science and math\n🤖 Powers artificial intelligence\n\n**What can you build with Python?**\n• Calculators and math tools\n• Text-based games and quizzes\n• Data analysis and charts\n• Web applications\n• AI and machine learning\n• Automation scripts",
          image: c6Python,
          funFact: "Python is named after the comedy show 'Monty Python's Flying Circus', NOT the snake! The creator, Guido van Rossum, was a fan of the show."
        }
      ]
    },
    {
      pageTitle: "Your First Python Program",
      subtitle: "Hello, World!",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "print() — Your First Command",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
          body: "The `print()` function displays text on the screen.\n\n**Your first program:**\n```python\nprint(\"Hello, World!\")\n```\n\n**Output:** Hello, World!\n\n**More examples:**\n```python\nprint(\"My name is Arjun\")\nprint(\"I am 11 years old\")\nprint(\"I love coding!\")\nprint(2 + 3)  # Prints: 5\nprint(\"2 + 3 =\", 2 + 3)  # Prints: 2 + 3 = 5\n```\n\n**Important rules:**\n• Text (strings) must be in quotes: \"hello\" or 'hello'\n• Numbers don't need quotes: 42, 3.14\n• Python is **case-sensitive**: Print ≠ print\n• Use **#** for comments (notes the computer ignores)",
          tip: "Always use lowercase for print() — Python is case-sensitive, so Print() won't work!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ function displays text on the screen.", answer: "print" },
        { type: "true-false", question: "Python is case-sensitive.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "Text strings must be enclosed in quotes.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open the Python compiler. Write a program that prints: your name, your age, your school name, and the result of 15 × 7.", answer: "" },
      ]
    },
    {
      pageTitle: "Variables",
      subtitle: "Storing information in your programs",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "What are Variables?",
          body: "A **variable** stores a value with a name.\n\n```python\nname = \"Arjun\"\nage = 11\nheight = 4.5\nis_student = True\n\nprint(name)      # Arjun\nprint(age)       # 11\nprint(\"Hello,\", name)  # Hello, Arjun\n```\n\n**Variable types:**\n📝 **String** (str) — text: `\"hello\"`, `'world'`\n🔢 **Integer** (int) — whole numbers: `42`, `-7`\n🔢 **Float** — decimal numbers: `3.14`, `9.99`\n✅ **Boolean** (bool) — `True` or `False`\n\n**Naming rules:**\n✅ Can use letters, numbers, underscores\n✅ Must start with a letter or underscore\n❌ Cannot start with a number\n❌ No spaces (use underscores: `my_name`)\n❌ Case-sensitive: `Name` ≠ `name`",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ stores a value with a name.", answer: "variable" },
        { type: "fill-in-blank", question: "Decimal numbers are called ___ in Python.", answer: "float" },
        { type: "true-false", question: "Variable names can start with a number.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create variables for: your name, age, favorite subject, and marks percentage. Print them all in a formatted message like 'Hi, I'm [name], age [age], I scored [marks]% in [subject]'.", answer: "" },
      ]
    },
    {
      pageTitle: "Input from User",
      subtitle: "Making interactive programs!",
      bannerColor: "from-violet-500 to-purple-500",
      sections: [
        {
          heading: "The input() Function",
          body: "**input()** asks the user to type something:\n\n```python\nname = input(\"What is your name? \")\nprint(\"Hello,\", name + \"!\")\n```\n\n**Important:** input() always returns a **string**!\nTo use it as a number, convert it:\n\n```python\nage = int(input(\"Enter your age: \"))\nyear = 2025 - age\nprint(\"You were born in\", year)\n```\n\n**Conversions:**\n• `int()` — converts to integer\n• `float()` — converts to decimal\n• `str()` — converts to string\n\n**Example: Simple Calculator**\n```python\nnum1 = float(input(\"Enter first number: \"))\nnum2 = float(input(\"Enter second number: \"))\nresult = num1 + num2\nprint(\"Sum =\", result)\n```",
          tip: "Always convert input to int() or float() before doing math! input() gives you text, not numbers."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ function gets text input from the user.", answer: "input" },
        { type: "fill-in-blank", question: "To convert a string to a whole number, use ___().", answer: "int" },
        { type: "practice", question: "Create a program that asks for the user's name, age, and favorite color. Then print a personalized message using all three inputs.", answer: "" },
      ]
    },
    {
      pageTitle: "If-Else Conditions",
      subtitle: "Making decisions in code",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Conditional Statements",
          image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=400&fit=crop",
          body: "**if-else** lets your program make decisions!\n\n```python\nage = int(input(\"Enter your age: \"))\n\nif age >= 18:\n    print(\"You are an adult!\")\nelse:\n    print(\"You are a minor.\")\n```\n\n**Comparison operators:**\n• `==` equal to\n• `!=` not equal to\n• `>` greater than\n• `<` less than\n• `>=` greater than or equal\n• `<=` less than or equal\n\n**if-elif-else** for multiple conditions:\n```python\nmarks = int(input(\"Enter marks: \"))\n\nif marks >= 90:\n    print(\"Grade: A+\")\nelif marks >= 80:\n    print(\"Grade: A\")\nelif marks >= 70:\n    print(\"Grade: B\")\nelif marks >= 60:\n    print(\"Grade: C\")\nelse:\n    print(\"Grade: D\")\n```\n\n⚠️ **Python uses indentation** (spaces) instead of curly braces! Each block MUST be indented with 4 spaces.",
          tip: "Indentation is NOT optional in Python — it's how Python knows which code belongs to which if/else block!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyword for 'else if' in Python is ___.", answer: "elif" },
        { type: "true-false", question: "Python uses indentation instead of curly braces for code blocks.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a grading program: ask the user for their marks (0-100) and print the grade (A+, A, B, C, D, F). Add a message for each grade like 'Excellent!' or 'Keep trying!'", answer: "" },
      ]
    },
    {
      pageTitle: "Loops",
      subtitle: "Repeating code efficiently",
      bannerColor: "from-teal-500 to-green-500",
      sections: [
        {
          heading: "for and while Loops",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
          body: "**for loop** — repeat a specific number of times:\n```python\nfor i in range(5):\n    print(\"Hello!\", i)\n# Prints Hello! 0, Hello! 1, ... Hello! 4\n\nfor i in range(1, 11):\n    print(i, \"x 5 =\", i * 5)\n# Prints the 5 times table!\n```\n\n**while loop** — repeat while a condition is true:\n```python\ncount = 1\nwhile count <= 10:\n    print(count)\n    count = count + 1\n# Prints 1 to 10\n```\n\n**Useful with loops:**\n• `range(5)` → 0, 1, 2, 3, 4\n• `range(1, 6)` → 1, 2, 3, 4, 5\n• `range(0, 10, 2)` → 0, 2, 4, 6, 8\n• `break` — exit the loop early\n• `continue` — skip to next iteration",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "range(5) generates numbers from 0 to ___.", answer: "4" },
        { type: "true-false", question: "A while loop repeats as long as its condition is True.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Write a program that prints the multiplication table of any number the user enters (1 to 10). Use a for loop.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "Python basics mastered!",
      bannerColor: "from-green-500 to-blue-500",
      sections: [
        { heading: "Summary", body: "✅ `print()` displays output\n✅ Variables store data (str, int, float, bool)\n✅ `input()` gets user input\n✅ `if-elif-else` makes decisions\n✅ `for` and `while` loops repeat code\n✅ Python uses indentation for code blocks\n✅ Type conversion: `int()`, `float()`, `str()`" }
      ],
      exercises: [
        { type: "practice", question: "Create a number guessing game! The program picks a secret number (use any number). The user guesses until they get it right. After each guess, say 'Too high!' or 'Too low!'. Count and display the number of guesses.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: INTERNET ========================
const c6Internet: TopicTextbook = {
  topicId: "c6-net-intro",
  topicTitle: "Internet & Web Fundamentals",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "What is the Internet?",
      subtitle: "The world's biggest network!",
      bannerImage: c6InternetImg,
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Understanding the Internet",
          body: "The **Internet** is a global network that connects billions of computers and devices worldwide.\n\n**What can you do on the Internet?**\n🌐 Browse websites (World Wide Web)\n📧 Send and receive emails\n💬 Chat and video call\n📺 Watch videos (YouTube, Netflix)\n🎮 Play online games\n📚 Research and learn\n🛒 Shop online\n☁️ Store files in the cloud\n\n**Internet vs World Wide Web:**\n• **Internet** = the NETWORK (cables, routers, servers)\n• **WWW (Web)** = CONTENT on the internet (websites, pages)\n• The web runs ON the internet, but they're not the same!\n\n**How does it work?**\n1. You type a URL (web address)\n2. Your browser sends a REQUEST through the internet\n3. A SERVER (powerful computer) receives it\n4. The server sends back the WEBPAGE\n5. Your browser displays it!",
          image: c6InternetImg,
          funFact: "The internet started in 1969 as ARPANET, a US military project connecting just 4 computers! Today, over 5.4 billion people use the internet."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "WWW stands for World Wide ___.", answer: "web" },
        { type: "true-false", question: "The Internet and the World Wide Web are the same thing.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Web Browsers & URLs",
      subtitle: "Navigating the web",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Browsers and Addresses",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
          body: "**Web Browser** — software to view websites:\n🌐 Google Chrome (most popular)\n🦊 Mozilla Firefox\n🧭 Safari (Apple)\n🔵 Microsoft Edge\n\n**URL (Uniform Resource Locator)** — a website's address:\n`https://www.google.com`\n\n**Parts of a URL:**\n• `https://` — protocol (secure connection)\n• `www` — subdomain\n• `google` — domain name\n• `.com` — top-level domain (TLD)\n\n**Common TLDs:**\n• `.com` — commercial\n• `.org` — organization\n• `.edu` — education\n• `.gov` — government\n• `.in` — India\n• `.co.uk` — United Kingdom\n\n**Search Engines** — help you find websites:\n🔍 Google, Bing, Yahoo, DuckDuckGo",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "URL stands for Uniform Resource ___.", answer: "locator" },
        { type: "fill-in-blank", question: "The .edu domain is for ___ websites.", answer: "education" },
        { type: "true-false", question: "HTTPS means the connection is secure.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Internet Safety",
      subtitle: "Stay safe online!",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Online Safety Rules",
          image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop",
          body: "**The internet is powerful but can be dangerous. Follow these rules:**\n\n🔒 **Passwords:**\n• Use strong passwords (letters + numbers + symbols)\n• Never share your password\n• Use different passwords for different sites\n\n🚫 **Personal Information:**\n• NEVER share your address, phone number, or school name with strangers\n• Don't post photos with location information\n• Be careful what you share on social media\n\n👤 **Stranger Danger:**\n• Not everyone online is who they say they are\n• Never meet someone from the internet in person\n• Tell a trusted adult if someone makes you uncomfortable\n\n📧 **Email & Messages:**\n• Don't open emails from unknown senders\n• Don't click suspicious links\n• Don't download unknown files\n\n🛡️ **Cyberbullying:**\n• Be kind online — treat others as you want to be treated\n• If someone is mean to you, tell a trusted adult\n• Block and report bullies",
          tip: "A good rule: if you wouldn't say or do something in real life, don't do it online either!"
        }
      ],
      exercises: [
        { type: "true-false", question: "You should use the same password for all websites.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "You should tell a trusted adult if someone online makes you uncomfortable.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a poster about 'Internet Safety' listing 10 rules for staying safe online. Use colorful headings and illustrations.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 7: ADVANCED HTML/CSS ========================
const c7HtmlAdv: TopicTextbook = {
  topicId: "c7-html",
  topicTitle: "Advanced HTML & CSS",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Forms in HTML",
      subtitle: "Collecting user input on web pages",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "HTML Forms",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
          body: "**Forms** let users input data on web pages — like login forms, sign-up forms, and search bars.\n\n```html\n<form>\n  <label>Name:</label>\n  <input type=\"text\" placeholder=\"Enter name\">\n  <br><br>\n  <label>Email:</label>\n  <input type=\"email\" placeholder=\"Enter email\">\n  <br><br>\n  <label>Password:</label>\n  <input type=\"password\">\n  <br><br>\n  <input type=\"submit\" value=\"Submit\">\n</form>\n```\n\n**Input Types:**\n• `text` — regular text\n• `email` — email validation\n• `password` — hidden characters\n• `number` — only numbers\n• `date` — date picker\n• `checkbox` — tick boxes\n• `radio` — select one option\n• `submit` — submit button\n• `textarea` — multi-line text\n• `select` — dropdown menu",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The input type ___ hides the characters typed.", answer: "password" },
        { type: "practice", question: "Create a student registration form with: name, email, class (dropdown), section (radio buttons), hobbies (checkboxes), and a submit button. Style it with CSS.", answer: "" },
      ]
    },
    {
      pageTitle: "CSS Layout — Flexbox",
      subtitle: "Modern page layouts made easy!",
      bannerColor: "from-purple-500 to-violet-500",
      sections: [
        {
          heading: "Introduction to Flexbox",
          body: "**Flexbox** is a CSS layout system that makes arranging elements easy!\n\n```css\n.container {\n  display: flex;\n  justify-content: center;    /* horizontal alignment */\n  align-items: center;        /* vertical alignment */\n  gap: 20px;                  /* space between items */\n}\n```\n\n**justify-content options:**\n• `flex-start` — items at the start\n• `center` — items in the center\n• `flex-end` — items at the end\n• `space-between` — equal space between items\n• `space-around` — equal space around items\n\n**flex-direction:**\n• `row` — items in a horizontal line (default)\n• `column` — items in a vertical stack\n\n**flex-wrap:**\n• `wrap` — items wrap to next line if they don't fit\n• `nowrap` — items stay on one line (default)",
          tip: "Flexbox is the most important CSS skill for modern web design. Master it and you can build any layout!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To use flexbox, set display to ___.", answer: "flex" },
        { type: "practice", question: "Create a navigation bar using flexbox: 4 links spread evenly across the top of the page. Add hover effects that change the background color.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 7-8: PYTHON ADVANCED ========================
const c7PythonAdv: TopicTextbook = {
  topicId: "c7-py-intro",
  topicTitle: "Python — Functions & Data Structures",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Functions",
      subtitle: "Reusable blocks of code!",
      bannerColor: "from-green-600 to-emerald-500",
      sections: [
        {
          heading: "Defining Functions",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
          body: "**Functions** are reusable blocks of code with a name.\n\n```python\ndef greet(name):\n    print(\"Hello,\", name + \"!\")\n\ngreet(\"Arjun\")   # Hello, Arjun!\ngreet(\"Priya\")   # Hello, Priya!\n```\n\n**Function with return value:**\n```python\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result)  # 8\n```\n\n**Default parameters:**\n```python\ndef greet(name, greeting=\"Hello\"):\n    print(greeting + \",\", name)\n\ngreet(\"Arjun\")              # Hello, Arjun\ngreet(\"Priya\", \"Namaste\")  # Namaste, Priya\n```\n\n**Why use functions?**\n• Avoid repeating code\n• Organize your program\n• Make code easier to read\n• Easy to test and fix bugs",
          tip: "Name your functions with verbs that describe what they DO: calculate_area(), check_password(), display_menu()"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyword to create a function in Python is ___.", answer: "def" },
        { type: "fill-in-blank", question: "The ___ statement sends a value back from a function.", answer: "return" },
        { type: "practice", question: "Create functions for: calculate_area(length, width), calculate_perimeter(length, width), and is_even(number). Use them to make a simple geometry calculator.", answer: "" },
      ]
    },
    {
      pageTitle: "Lists",
      subtitle: "Storing collections of data",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Python Lists",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
          body: "A **list** stores multiple values in order.\n\n```python\nfruits = [\"apple\", \"banana\", \"cherry\"]\nmarks = [85, 92, 78, 95, 88]\nmixed = [\"hello\", 42, True, 3.14]\n\n# Accessing items (index starts at 0!)\nprint(fruits[0])    # apple\nprint(fruits[1])    # banana\nprint(fruits[-1])   # cherry (last item)\n\n# List operations\nfruits.append(\"mango\")     # add to end\nfruits.insert(1, \"grape\")  # insert at position\nfruits.remove(\"banana\")    # remove by value\nfruits.pop()               # remove last item\nlen(fruits)                # number of items\nfruits.sort()              # sort alphabetically\n```\n\n**Looping through a list:**\n```python\nfor fruit in fruits:\n    print(\"I like\", fruit)\n```",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "List indexes start at ___.", answer: "0" },
        { type: "fill-in-blank", question: "The ___ method adds an item to the end of a list.", answer: "append" },
        { type: "practice", question: "Create a program that stores 5 student names in a list. Let the user add more names, remove names, and display all names sorted alphabetically.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: ADVANCED ========================
const c8JavaIntro: TopicTextbook = {
  topicId: "c8-java-intro",
  topicTitle: "Introduction to Java Programming",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "What is Java?",
      subtitle: "Write Once, Run Anywhere!",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Welcome to Java!",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
          body: "**Java** is one of the most popular programming languages in the world!\n\n**Why learn Java?**\n☕ Powers billions of devices\n📱 Android apps are built with Java/Kotlin\n🏢 Used by banks, hospitals, and big companies\n🎮 Minecraft was built in Java!\n💼 One of the most in-demand skills\n\n**Java vs Python:**\n| Feature | Java | Python |\n|---------|------|--------|\n| Syntax | More strict | Simple |\n| Speed | Faster | Slower |\n| Typing | Static (declare types) | Dynamic |\n| Uses | Enterprise, Android | AI, Data, Web |\n\n**Your first Java program:**\n```java\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n```\n\nYes, it's longer than Python — but that structure makes large programs more organized!",
          funFact: "Java was created by James Gosling at Sun Microsystems in 1995. It was originally called 'Oak' after a tree outside his office!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Java uses System.out.___ to print text.", answer: "println" },
        { type: "true-false", question: "Java requires you to declare variable types.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open the Java compiler. Write a program that prints your name, class, and school name. Each should be on a separate line.", answer: "" },
      ]
    },
    {
      pageTitle: "Variables & Data Types in Java",
      subtitle: "Storing data with types",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Java Variables",
          body: "In Java, you MUST declare the type of each variable!\n\n```java\nString name = \"Arjun\";\nint age = 13;\ndouble height = 5.4;\nboolean isStudent = true;\nchar grade = 'A';\n\nSystem.out.println(\"Name: \" + name);\nSystem.out.println(\"Age: \" + age);\n```\n\n**Data Types:**\n📝 `String` — text (\"hello\")\n🔢 `int` — whole numbers (42)\n🔢 `double` — decimal numbers (3.14)\n✅ `boolean` — true/false\n🔤 `char` — single character ('A')\n🔢 `long` — very large numbers\n🔢 `float` — decimal (less precise than double)\n\n**Getting user input:**\n```java\nimport java.util.Scanner;\n\nScanner input = new Scanner(System.in);\nSystem.out.print(\"Enter name: \");\nString name = input.nextLine();\nSystem.out.print(\"Enter age: \");\nint age = input.nextInt();\n```",
          tip: "String starts with a capital S in Java! It's a class, not a primitive type."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "In Java, whole numbers use the ___ data type.", answer: "int" },
        { type: "fill-in-blank", question: "The ___ class is used for user input in Java.", answer: "scanner" },
        { type: "practice", question: "Write a Java program that asks for the user's name and age, calculates their birth year, and prints a greeting message.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: EXCEL FORMULAS ========================
const c6Excel: TopicTextbook = {
  topicId: "c6-xl",
  topicTitle: "MS Excel – Formulas & Database",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Excel Formulas",
      subtitle: "Let the computer do the math!",
      bannerImage: c6ExcelFormulas,
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "What are Formulas?",
          body: "**Formulas** tell Excel to calculate values automatically!\n\nEvery formula starts with an **equals sign (=)**\n\n**Basic formulas:**\n➕ `=A1+B1` — adds two cells\n➖ `=A1-B1` — subtracts\n✖️ `=A1*B1` — multiplies\n➗ `=A1/B1` — divides\n\n**Built-in Functions:**\n📊 `=SUM(A1:A10)` — adds all values from A1 to A10\n📊 `=AVERAGE(A1:A10)` — calculates the average\n📊 `=MAX(A1:A10)` — finds the largest value\n📊 `=MIN(A1:A10)` — finds the smallest value\n📊 `=COUNT(A1:A10)` — counts how many numbers are there\n\n**How to enter a formula:**\n1. Click on an empty cell\n2. Type = followed by your formula\n3. Press **Enter**\n4. The result appears instantly!",
          image: c6ExcelFormulas,
          tip: "You can use the mouse to click on cells instead of typing cell references. Just type = then click the cells!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Every Excel formula starts with an ___ sign.", answer: "equals" },
        { type: "fill-in-blank", question: "The ___ function adds all values in a range.", answer: "sum" },
        { type: "true-false", question: "=MAX(A1:A10) finds the largest value in the range.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "More Functions",
      subtitle: "COUNT, COUNTA, and IF",
      bannerColor: "from-indigo-500 to-blue-500",
      sections: [
        {
          heading: "Advanced Functions",
          body: "**COUNT & COUNTA:**\n📊 `=COUNT(A1:A10)` — counts cells with **numbers only**\n📊 `=COUNTA(A1:A10)` — counts cells with **any data** (text or numbers)\n\n**IF Function — Making Decisions:**\n`=IF(condition, value_if_true, value_if_false)`\n\n**Examples:**\n`=IF(A1>=40, \"Pass\", \"Fail\")` — checks if marks ≥ 40\n`=IF(B1>90, \"A+\", \"Other\")` — assigns grade\n\n**Combining Functions:**\n`=IF(AVERAGE(A1:A5)>=60, \"Good\", \"Needs Improvement\")`\n\n**COUNTIF — Count with a condition:**\n`=COUNTIF(A1:A10, \">50\")` — counts cells greater than 50\n`=COUNTIF(A1:A10, \"Pass\")` — counts cells containing \"Pass\"\n\n**SUMIF — Sum with a condition:**\n`=SUMIF(A1:A10, \">50\")` — sums only values greater than 50",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The IF function checks a ___ and returns different values.", answer: "condition" },
        { type: "practice", question: "Create a class marks spreadsheet with 10 students. Use SUM for total, AVERAGE for mean, MAX for highest, MIN for lowest, and IF to show Pass/Fail (passing = 40).", answer: "" },
      ]
    },
    {
      pageTitle: "Sorting & Filtering Data",
      subtitle: "Organize your data like a pro!",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Database Features in Excel",
          body: "Excel can work like a simple **database** — storing, sorting, and filtering data.\n\n**Sorting Data:**\n1. Select your data range\n2. Go to **Data** tab\n3. Click **Sort A to Z** (ascending) or **Sort Z to A** (descending)\n4. Or click **Sort** for custom sorting (by multiple columns)\n\n**Filtering Data:**\n1. Select your data\n2. Go to **Data** tab → **Filter**\n3. Dropdown arrows appear on column headers\n4. Click an arrow to filter:\n   • Check/uncheck specific values\n   • Use text filters (contains, starts with)\n   • Use number filters (greater than, between)\n\n**Why is this useful?**\n• Find all students who scored above 90\n• Sort employees by salary\n• Filter products by category\n• Find specific records quickly\n\n**Data Validation:**\nRestrict what users can enter in cells:\nData tab → Data Validation → Set rules (numbers only, list of options, date range)",
          tip: "Always include column headers (Name, Age, Marks, etc.) in your data. This makes sorting and filtering much easier!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ feature shows dropdown arrows on column headers.", answer: "filter" },
        { type: "true-false", question: "You can sort data from A to Z or Z to A.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a student database with: Name, Class, Section, Marks in 3 subjects, Total, Average, and Grade. Add 15 students. Practice sorting by Total (highest first) and filtering to show only students with Average > 80.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: GIMP INTRO ========================
const c6GimpIntro: TopicTextbook = {
  topicId: "c6-gimp-intro",
  topicTitle: "Introduction to GIMP",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "What is GIMP?",
      subtitle: "A powerful free image editor!",
      bannerImage: c6GimpInterface,
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Welcome to GIMP!",
          body: "**GIMP** stands for **GNU Image Manipulation Program**. It's a free, powerful image editor — like a professional version of Paint!\n\n**What can you do with GIMP?**\n🖼️ Edit and enhance photos\n🎨 Create digital artwork and illustrations\n✂️ Cut, copy, and combine images\n🔤 Add text and effects to images\n📐 Resize and crop images\n🎭 Remove backgrounds\n🌈 Adjust colors and brightness\n\n**GIMP vs Paint:**\n| Feature | Paint | GIMP |\n|---------|-------|------|\n| Layers | No | Yes |\n| Filters | Few | Many |\n| Selection | Basic | Advanced |\n| Cost | Free | Free |\n| Power | Basic | Professional |",
          image: c6GimpInterface,
          funFact: "GIMP was first released in 1996 and is completely free! Professional alternatives like Photoshop cost thousands of rupees."
        }
      ]
    },
    {
      pageTitle: "The GIMP Interface",
      subtitle: "Getting to know the workspace",
      bannerColor: "from-amber-500 to-yellow-500",
      sections: [
        {
          heading: "Parts of the GIMP Window",
          body: "GIMP has a unique multi-window interface:\n\n🔧 **Toolbox** — Contains all drawing and editing tools (left side)\n🖼️ **Canvas** — The main area where your image is displayed (center)\n📊 **Tool Options** — Settings for the currently selected tool (below toolbox)\n📋 **Layers Panel** — Shows all layers in your image (right side)\n🎨 **Colors Panel** — Foreground/background colors, color chooser\n📜 **Menu Bar** — File, Edit, Select, Image, Filters, etc.\n\n**Important Tools:**\n✏️ Pencil, Paintbrush, Airbrush\n🪣 Bucket Fill\n🔤 Text Tool\n🔲 Selection tools (Rectangle, Ellipse, Free, Fuzzy)\n✂️ Scissors Select\n🔍 Zoom\n💧 Smudge, Blur, Sharpen\n📐 Measure, Align\n\n**Opening an Image:**\nFile → Open → Browse to your image → Open",
          tip: "If your toolbox disappears, go to Windows → Dockable Dialogs to bring panels back!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "GIMP stands for GNU Image ___ Program.", answer: "manipulation" },
        { type: "fill-in-blank", question: "The ___ panel shows all layers in your image.", answer: "layers" },
        { type: "true-false", question: "GIMP is a free image editing software.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open GIMP. Explore the interface: try 5 different tools from the toolbox. Open a photo and try zooming in/out. Change the foreground color.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: GIMP SELECTION ========================
const c6GimpSelect: TopicTextbook = {
  topicId: "c6-gimp-select",
  topicTitle: "GIMP Selection Tools",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Selection Tools",
      subtitle: "Select exactly what you need!",
      bannerImage: c6GimpInterface,
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Types of Selection Tools",
          body: "**Selection tools** let you choose specific parts of an image to edit.\n\n🔲 **Rectangle Select** — Select a rectangular area. Click and drag.\n⭕ **Ellipse Select** — Select an oval/circular area.\n✏️ **Free Select (Lasso)** — Draw freehand around an area.\n🪄 **Fuzzy Select (Magic Wand)** — Select areas of similar color. Click on a color and it selects connected areas of the same color!\n🎨 **Select by Color** — Selects ALL pixels of a similar color in the entire image.\n✂️ **Scissors Select** — Intelligent edge-following tool. Click along edges and GIMP snaps to them.\n\n**Selection Operations:**\n• **Replace** — New selection replaces old\n• **Add** (Shift+click) — Add to existing selection\n• **Subtract** (Ctrl+click) — Remove from selection\n• **Intersect** — Keep only overlapping area\n\n**After selecting:**\n• Copy (Ctrl+C), Cut (Ctrl+X), Paste (Ctrl+V)\n• Apply filters only to the selection\n• Fill with color or pattern\n• Delete the selection",
          image: c6GimpInterface,
          tip: "The Magic Wand (Fuzzy Select) is perfect for selecting backgrounds! Click the background color to select it, then delete it."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ tool selects areas of similar color.", answer: "fuzzy select" },
        { type: "fill-in-blank", question: "Hold ___ while clicking to add to an existing selection.", answer: "shift" },
        { type: "true-false", question: "Select by Color selects all similar pixels in the entire image.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Practical Selection Projects",
      subtitle: "Cut, paste, and create!",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Selection in Action",
          body: "**Project 1: Photo Collage**\n1. Open 3-4 different photos\n2. Use selection tools to cut parts from each\n3. Paste them into one new canvas\n4. Arrange and resize to create a collage\n\n**Project 2: Background Removal**\n1. Open a photo with a solid background\n2. Use Fuzzy Select to click the background\n3. Press Delete to remove it\n4. Go to Image → Flatten Image\n5. Save as PNG to keep transparency!\n\n**Project 3: Photo Editing**\n1. Open a portrait photo\n2. Use Ellipse Select around the face\n3. Select → Invert (selects everything EXCEPT the face)\n4. Apply Filters → Blur → Gaussian Blur\n5. The face stays sharp while background is blurred!\n\n**Feathering:**\nSoft edges on selections:\n• Select → Feather (set radius to 10-20 pixels)\n• Creates a smooth fade at the edges",
        }
      ],
      exercises: [
        { type: "true-false", question: "PNG format supports transparent backgrounds.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open a photo. Use Fuzzy Select to remove the background. Then open a different image and paste your cutout onto it to create a fun composite!", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: HTML TAGS ========================
const c6HtmlTags: TopicTextbook = {
  topicId: "c6-html-tags",
  topicTitle: "HTML Tags & Elements",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Text Tags",
      subtitle: "Headings, paragraphs, and formatting",
      bannerImage: c6Html,
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "HTML Text Elements",
          body: "**Heading Tags** — 6 levels from biggest to smallest:\n`<h1>` — Main heading (biggest, use once per page)\n`<h2>` — Section heading\n`<h3>` to `<h6>` — Sub-headings (progressively smaller)\n\n**Paragraph & Line Breaks:**\n`<p>This is a paragraph.</p>` — Block of text\n`<br>` — Line break (no closing tag needed!)\n`<hr>` — Horizontal line across the page\n\n**Text Formatting Tags:**\n`<b>Bold text</b>` — **bold**\n`<i>Italic text</i>` — *italic*\n`<u>Underlined text</u>` — underlined\n`<strong>Important text</strong>` — **strong emphasis** (like bold but with meaning)\n`<em>Emphasized text</em>` — *emphasized* (like italic but with meaning)\n`<mark>Highlighted</mark>` — highlighted text\n`<del>Deleted</del>` — ~~strikethrough~~\n`<sub>subscript</sub>` — below the line (H₂O)\n`<sup>superscript</sup>` — above the line (x²)\n\n**Preformatted Text:**\n`<pre>` — Preserves spaces and line breaks exactly as typed\n`<code>` — Displays text in a monospace/code font",
          image: c6Html,
          tip: "Use <strong> instead of <b> and <em> instead of <i> for better accessibility and SEO!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The largest heading tag is ___.", answer: "h1" },
        { type: "fill-in-blank", question: "The ___ tag creates a horizontal line.", answer: "hr" },
        { type: "true-false", question: "<br> needs a closing tag.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "HTML Structure",
      subtitle: "Building proper web pages",
      bannerColor: "from-cyan-500 to-teal-500",
      sections: [
        {
          heading: "The Complete HTML Structure",
          body: "**Every HTML page needs this structure:**\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <title>My Page Title</title>\n</head>\n<body>\n  <h1>Welcome!</h1>\n  <p>This is my web page.</p>\n</body>\n</html>\n```\n\n**Breaking it down:**\n📜 `<!DOCTYPE html>` — tells browser this is HTML5\n🏠 `<html>` — root element wrapping everything\n🧠 `<head>` — invisible info about the page\n📖 `<title>` — text in the browser tab\n🔤 `<meta charset>` — character encoding\n📱 `<meta viewport>` — mobile-friendly setting\n📄 `<body>` — all visible content goes here\n\n**Semantic HTML Tags:**\n`<header>` — page header\n`<nav>` — navigation links\n`<main>` — main content\n`<section>` — a section of content\n`<article>` — independent content\n`<footer>` — page footer\n`<aside>` — sidebar content",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ tag wraps all visible content on a webpage.", answer: "body" },
        { type: "true-false", question: "The <head> section is not visible on the webpage.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Build a profile page about yourself using proper HTML structure. Include: your name as h1, an 'About Me' section, a list of hobbies, and a footer with your class details. Use semantic tags.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: CSS PROPERTIES ========================
const c6CssProps: TopicTextbook = {
  topicId: "c6-css-props",
  topicTitle: "CSS Properties",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Colors & Typography",
      subtitle: "Make text beautiful with CSS!",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "CSS Visual Properties",
          body: "**Text Color:**\n`color: red;` — named color\n`color: #FF0000;` — hex code\n`color: rgb(255, 0, 0);` — RGB\n`color: hsl(0, 100%, 50%);` — HSL\n\n**Background:**\n`background-color: #f0f0f0;` — solid color\n`background-image: url('bg.jpg');` — image\n`background-size: cover;` — fill area\n`background-repeat: no-repeat;` — don't tile\n\n**Font Properties:**\n`font-family: Arial, sans-serif;` — font name\n`font-size: 16px;` — text size\n`font-weight: bold;` — bold (100-900)\n`font-style: italic;` — italic\n`text-decoration: underline;` — underline\n`text-align: center;` — alignment\n`text-transform: uppercase;` — UPPERCASE\n`letter-spacing: 2px;` — space between letters\n`line-height: 1.6;` — space between lines\n`text-shadow: 2px 2px 4px gray;` — shadow",
          tip: "Use font-family with fallbacks: font-family: 'Comic Sans MS', Arial, sans-serif; — if the first font isn't available, the browser tries the next one."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The CSS property for text color is ___.", answer: "color" },
        { type: "fill-in-blank", question: "___ adds space inside an element.", answer: "padding" },
      ]
    },
    {
      pageTitle: "Box Model & Borders",
      subtitle: "Understanding spacing and borders",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "The CSS Box Model",
          body: "Every HTML element is a **box** with 4 layers:\n\n📦 **Content** — the actual text/image inside\n📦 **Padding** — space between content and border\n📦 **Border** — the edge of the element\n📦 **Margin** — space outside the border\n\n**Margin (outside space):**\n`margin: 20px;` — all sides\n`margin-top: 10px;` — top only\n`margin: 10px 20px;` — top/bottom left/right\n`margin: 0 auto;` — center horizontally!\n\n**Padding (inside space):**\n`padding: 15px;` — all sides\n`padding-left: 30px;` — left only\n\n**Border:**\n`border: 2px solid black;` — width style color\n`border-radius: 10px;` — rounded corners!\n`border-radius: 50%;` — perfect circle!\n\n**Box Sizing:**\n`box-sizing: border-box;` — includes padding and border in total width/height (recommended!)\n\n**Shadow:**\n`box-shadow: 5px 5px 15px rgba(0,0,0,0.3);` — soft shadow effect",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "border-radius: 50% makes an element a ___.", answer: "circle" },
        { type: "true-false", question: "Margin is space inside the element.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a styled profile card: a div with padding, border, border-radius, box-shadow, a colored background, centered text, an image, and your name/details. Make it look like a business card!", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: AI ACTIVITIES ========================
const c6AiAct: TopicTextbook = {
  topicId: "c6-ai-act",
  topicTitle: "Exploring Artificial Intelligence",
  subjectColor: "neon-pink",
  pages: [
    {
      pageTitle: "What is AI?",
      subtitle: "Machines that can think and learn!",
      bannerImage: c6AiBasics,
      bannerColor: "from-pink-500 to-purple-500",
      sections: [
        {
          heading: "Understanding Artificial Intelligence",
          body: "**Artificial Intelligence (AI)** is when computers are programmed to do things that normally need human intelligence.\n\n**AI can:**\n🗣️ Understand and speak languages (like Siri, Alexa)\n👁️ Recognize faces and objects in photos\n🎮 Play and win games (chess, Go)\n🚗 Drive cars (self-driving vehicles!)\n📝 Write text and stories\n🎨 Create artwork and music\n🔍 Search and find information\n📊 Predict future trends from data\n\n**AI vs Human Intelligence:**\n| Feature | Human | AI |\n|---------|-------|----|\n| Creativity | Very high | Limited |\n| Speed | Slow | Very fast |\n| Memory | Forgetful | Perfect |\n| Learning | From few examples | Needs lots of data |\n| Emotions | Yes | No |\n| Tiredness | Gets tired | Never tires |",
          image: c6AiBasics,
          funFact: "The term 'Artificial Intelligence' was first used in 1956 by John McCarthy at a conference at Dartmouth College!"
        }
      ]
    },
    {
      pageTitle: "AI in Daily Life",
      subtitle: "AI is all around you!",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "AI Applications You Use Every Day",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
          body: "You interact with AI every day without even knowing!\n\n📱 **Voice Assistants** — Siri, Google Assistant, Alexa understand your speech and respond\n🎬 **Recommendations** — Netflix suggests movies, YouTube suggests videos based on what you like\n📷 **Photo Features** — Your phone recognizes faces, adds filters, and organizes photos\n🔍 **Google Search** — AI understands your question and finds the best answers\n📧 **Spam Filters** — AI identifies and blocks spam emails\n🗺️ **Maps & Navigation** — Google Maps finds the fastest route using AI\n🛒 **Online Shopping** — Amazon suggests products you might like\n🎮 **Games** — AI controls computer opponents\n🌐 **Translation** — Google Translate converts languages instantly\n🏥 **Healthcare** — AI helps doctors detect diseases from X-rays\n\n**How AI Learns:**\n1. It receives **data** (examples)\n2. It finds **patterns** in the data\n3. It makes **predictions** based on patterns\n4. It gets **feedback** (right or wrong)\n5. It improves with more data!",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "AI learns by finding ___ in data.", answer: "patterns" },
        { type: "true-false", question: "Google Maps uses AI to find the fastest route.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "AI has emotions like humans.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "AI Activities & Ethics",
      subtitle: "Try AI yourself and think about its impact!",
      bannerColor: "from-indigo-500 to-blue-500",
      sections: [
        {
          heading: "Hands-On AI Activities",
          body: "**Activity 1: Teachable Machine (Google)**\nhttps://teachablemachine.withgoogle.com\n1. Visit Teachable Machine website\n2. Choose 'Image Project'\n3. Train the AI to recognize 2-3 things (like different hand gestures)\n4. Upload sample images for each category\n5. Test it with your webcam!\n\n**Activity 2: Quick, Draw! (Google)**\nhttps://quickdraw.withgoogle.com\n1. You draw a picture\n2. AI tries to guess what you're drawing!\n3. See how AI recognizes shapes and patterns\n\n**AI Ethics — Important Questions:**\n🤔 Should AI make important decisions (like who gets a job)?\n🤔 What happens if AI makes a mistake?\n🤔 Is it fair if AI is biased against certain groups?\n🤔 Should self-driving cars prioritize passengers or pedestrians?\n🤔 Who is responsible when AI goes wrong?\n\n**Remember:** AI is a tool — it's not good or bad by itself. It depends on how HUMANS use it!",
          tip: "AI is only as good as the data it learns from. If the data is biased, the AI will be biased too!"
        }
      ],
      exercises: [
        { type: "true-false", question: "Teachable Machine lets you train your own AI model.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Visit Teachable Machine and train an image classifier to recognize 3 different objects on your desk. Test it and note how accurate it is. Write a short report about your experience.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 7: EXCEL CHARTS ========================
const c7Excel: TopicTextbook = {
  topicId: "c7-xl",
  topicTitle: "Creating Charts in Excel",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Chart Types",
      subtitle: "Visualize your data!",
      bannerImage: c7ExcelCharts,
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "Types of Charts in Excel",
          body: "**Charts** turn numbers into pictures, making data easier to understand!\n\n📊 **Bar Chart / Column Chart** — Compare quantities. Vertical or horizontal bars.\n  • Use for: comparing marks, sales, populations\n\n🥧 **Pie Chart** — Shows parts of a whole (percentages).\n  • Use for: budget breakdown, survey results, time spent\n\n📈 **Line Chart** — Shows trends over time.\n  • Use for: temperature changes, stock prices, growth\n\n📊 **Area Chart** — Like a line chart but filled below.\n  • Use for: showing volume changes over time\n\n🔵 **Scatter Plot** — Shows relationships between two values.\n  • Use for: height vs weight, study time vs marks\n\n📊 **Stacked Bar** — Bars divided into segments.\n  • Use for: showing composition within categories",
          image: c7ExcelCharts,
          tip: "Choose the right chart type! Pie charts work best with 3-7 categories. Line charts need time-based data. Bar charts are great for comparisons."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ chart shows parts of a whole as slices.", answer: "pie" },
        { type: "fill-in-blank", question: "A ___ chart is best for showing trends over time.", answer: "line" },
        { type: "true-false", question: "Bar charts are good for comparing quantities.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Creating & Formatting Charts",
      subtitle: "Make beautiful data visualizations!",
      bannerColor: "from-indigo-500 to-blue-500",
      sections: [
        {
          heading: "How to Create a Chart",
          body: "**Step by step:**\n1. Enter your data in a table (with headers!)\n2. **Select** all the data including headers\n3. Go to **Insert** tab\n4. Click the chart type you want\n5. Choose a style from the options\n6. Your chart appears!\n\n**Formatting Your Chart:**\n📝 **Chart Title** — Click to edit. Make it descriptive!\n📊 **Axis Labels** — Add labels for X and Y axes\n📋 **Legend** — Shows what each color/bar represents\n🎨 **Chart Styles** — Pre-designed color schemes\n📐 **Data Labels** — Show exact values on bars/slices\n\n**Chart Elements (+ button):**\nClick the + icon next to your chart to toggle:\n• Axes, Axis Titles\n• Chart Title\n• Data Labels, Data Table\n• Error Bars, Gridlines\n• Legend, Trendline\n\n**Moving & Resizing:**\n• Click and drag the chart to move it\n• Drag the corner handles to resize\n• Right-click → 'Move Chart' to put on a separate sheet",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ shows what each color represents in a chart.", answer: "legend" },
        { type: "practice", question: "Create a data table of monthly rainfall for 12 months. Create 3 different charts: a bar chart, a line chart, and a pie chart. Add proper titles, axis labels, and legends to each.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 7: GIMP LAYERS ========================
const c7Gimp: TopicTextbook = {
  topicId: "c7-gimp",
  topicTitle: "Working with Layers in GIMP",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Understanding Layers",
      subtitle: "The most powerful concept in image editing!",
      bannerImage: c6GimpInterface,
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "What are Layers?",
          body: "**Layers** are like transparent sheets stacked on top of each other. Each layer can have different content!\n\nImagine:\n📄 **Layer 3 (top):** Text saying 'Hello!'\n📄 **Layer 2 (middle):** A drawing of a flower\n📄 **Layer 1 (bottom):** A background color\n\nWhen you look from above, you see everything combined!\n\n**Why use layers?**\n✅ Edit one part without affecting others\n✅ Move elements independently\n✅ Try different effects safely\n✅ Undo changes on just one layer\n✅ Create complex compositions\n\n**Layer Operations:**\n➕ **New Layer** — Add a blank layer\n👁️ **Visibility** — Toggle eye icon to show/hide\n🔒 **Lock** — Prevent accidental changes\n🔃 **Reorder** — Drag layers up/down to change stacking order\n🔗 **Link** — Link layers to move them together\n🗑️ **Delete** — Remove a layer",
          image: c6GimpInterface,
          tip: "Think of layers like pages of clear plastic placed on top of each other. You can draw on each page separately!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Layers are like transparent ___ stacked on top of each other.", answer: "sheets" },
        { type: "true-false", question: "You can hide a layer using the eye icon.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Layer Techniques",
      subtitle: "Opacity, blending, and merging",
      bannerColor: "from-amber-500 to-red-500",
      sections: [
        {
          heading: "Advanced Layer Features",
          body: "**Layer Opacity:**\n• Controls how see-through a layer is\n• 100% = fully visible\n• 50% = half transparent\n• 0% = completely invisible\n• Useful for watermarks, fading effects, ghost effects\n\n**Blending Modes:**\nChange how layers interact with each other:\n• **Normal** — standard (default)\n• **Multiply** — darkens (great for shadows)\n• **Screen** — brightens (great for light effects)\n• **Overlay** — increases contrast\n• **Soft Light** — subtle lighting\n\n**Merge & Flatten:**\n🔽 **Merge Down** — combines a layer with the one below\n🔽 **Flatten Image** — combines ALL layers into one\n⚠️ Once flattened, you can't separate them again!\n\n**Layer Masks:**\n• A grayscale image attached to a layer\n• White areas = visible\n• Black areas = invisible\n• Gray areas = semi-transparent\n• Great for gradual transitions between images!",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Layer ___ controls how see-through a layer is.", answer: "opacity" },
        { type: "true-false", question: "Flatten Image combines all layers into one.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a movie poster: Layer 1 = background gradient, Layer 2 = main character image (cut from photo), Layer 3 = title text with shadow, Layer 4 = credits. Adjust opacity and blending modes.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 7: PYTHON OPS ========================
const c7PyOps: TopicTextbook = {
  topicId: "c7-py-ops",
  topicTitle: "Python Input & Operators",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Input Function",
      subtitle: "Make your programs interactive!",
      bannerImage: c6Python,
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "The input() Function",
          body: "**input()** asks the user to type something:\n\n```python\nname = input(\"What is your name? \")\nprint(\"Hello,\", name + \"!\")\n```\n\n**Important:** input() always returns a **string**!\n\n**Type Conversion:**\n```python\n# Convert to number for math\nage = int(input(\"Enter your age: \"))\nyear = 2025 - age\nprint(\"Born in\", year)\n\n# Convert to decimal\nprice = float(input(\"Enter price: \"))\ntax = price * 0.18\nprint(\"Tax:\", tax)\n```\n\n**Type functions:**\n• `int()` — whole number\n• `float()` — decimal number\n• `str()` — text\n• `bool()` — True/False\n\n**String Operations:**\n```python\nfirst = input(\"First name: \")\nlast = input(\"Last name: \")\nfull = first + \" \" + last    # concatenation\nprint(full.upper())           # UPPERCASE\nprint(full.lower())           # lowercase\nprint(len(full))              # length\n```",
          image: c6Python,
          tip: "Always convert input to int() or float() before math operations!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "input() always returns a ___.", answer: "string" },
        { type: "fill-in-blank", question: "To convert text to a whole number, use ___().", answer: "int" },
        { type: "practice", question: "Create a unit converter: ask the user for temperature in Celsius and convert to Fahrenheit (F = C × 9/5 + 32). Show the result formatted nicely.", answer: "" },
      ]
    },
    {
      pageTitle: "Operators",
      subtitle: "Math, comparison, and logic!",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "Python Operators",
          image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=400&fit=crop",
          body: "**Arithmetic Operators:**\n`+` Addition: `5 + 3 = 8`\n`-` Subtraction: `10 - 4 = 6`\n`*` Multiplication: `3 * 7 = 21`\n`/` Division: `15 / 4 = 3.75`\n`//` Floor division: `15 // 4 = 3` (whole number only)\n`%` Modulus: `15 % 4 = 3` (remainder)\n`**` Power: `2 ** 3 = 8` (2³)\n\n**Comparison Operators:**\n`==` Equal to\n`!=` Not equal to\n`>` Greater than\n`<` Less than\n`>=` Greater than or equal\n`<=` Less than or equal\n\n**Logical Operators:**\n`and` — both must be True\n`or` — at least one must be True\n`not` — reverses True/False\n\n**Examples:**\n```python\nage = 15\nif age >= 13 and age <= 19:\n    print(\"You're a teenager!\")\n\nday = \"Sunday\"\nif day == \"Saturday\" or day == \"Sunday\":\n    print(\"Weekend!\")\n```",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ operator gives the remainder of division.", answer: "%" },
        { type: "fill-in-blank", question: "2 ** 3 equals ___.", answer: "8" },
        { type: "true-false", question: "The 'and' operator requires both conditions to be True.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a simple calculator that asks for 2 numbers and an operation (+, -, *, /). Perform the calculation and show the result. Handle division by zero!", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 7: AI ACTIVITIES ========================
const c7AiAct: TopicTextbook = {
  topicId: "c7-ai-act",
  topicTitle: "AI Projects & Exploration",
  subjectColor: "neon-pink",
  pages: [
    {
      pageTitle: "Machine Learning Basics",
      subtitle: "How machines learn from data!",
      bannerImage: c6AiBasics,
      bannerColor: "from-pink-500 to-rose-500",
      sections: [
        {
          heading: "What is Machine Learning?",
          body: "**Machine Learning (ML)** is a type of AI where computers learn from data without being explicitly programmed.\n\n**How it works:**\n1. 📊 **Collect Data** — gather examples (photos, text, numbers)\n2. 🔍 **Find Patterns** — the algorithm detects patterns\n3. 🧠 **Build a Model** — creates rules based on patterns\n4. 🎯 **Make Predictions** — uses rules on new data\n5. 📈 **Improve** — gets better with more data and feedback\n\n**Types of Machine Learning:**\n\n📚 **Supervised Learning** — learning from labeled examples\n  • Given: photos labeled 'cat' or 'dog'\n  • Learns: what makes a cat different from a dog\n  • Used for: spam detection, image recognition\n\n🔍 **Unsupervised Learning** — finding patterns in unlabeled data\n  • Given: customer shopping data (no labels)\n  • Finds: groups of similar customers\n  • Used for: customer segmentation, recommendations\n\n🎮 **Reinforcement Learning** — learning by trial and error\n  • Agent tries actions, gets rewards/penalties\n  • Used for: game AI, robotics, self-driving cars",
          image: c6AiBasics,
          funFact: "AI beat the world champion in the game of Go in 2016. Go has more possible positions than atoms in the universe!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "In supervised learning, the data has ___.", answer: "labels" },
        { type: "true-false", question: "Machine learning improves with more data.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "AI Ethics & Responsible Use",
      subtitle: "Using AI the right way!",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "AI Ethics & Bias",
          body: "**AI Ethics** deals with the moral questions around artificial intelligence.\n\n**Key Issues:**\n\n⚖️ **Bias** — If AI is trained on biased data, it makes biased decisions\n  • Example: An AI hiring tool that prefers men over women because it was trained on historical data where more men were hired\n\n🔒 **Privacy** — AI can analyze personal data without consent\n  • Facial recognition can track people without permission\n  • Data collection by apps and websites\n\n💼 **Job Displacement** — AI may replace some jobs\n  • But it also creates new jobs! (AI engineers, data scientists)\n\n🤖 **Transparency** — Should we know when we're talking to AI?\n  • Chatbots that pretend to be human\n  • AI-generated news articles\n\n**Rules for Responsible AI:**\n✅ AI should be fair and unbiased\n✅ AI should be transparent (people should know it's AI)\n✅ AI should respect privacy\n✅ AI should be safe and secure\n✅ Humans should remain in control\n✅ AI should benefit everyone, not just a few",
          tip: "When using AI tools, always think: 'Is this fair? Is this truthful? Does this respect privacy?'"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "AI ___ occurs when AI makes unfair decisions due to biased training data.", answer: "bias" },
        { type: "true-false", question: "AI should be transparent about being AI.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Research and write a 200-word essay on one AI ethics topic: privacy, bias, or job displacement. Include examples and your opinion on how to address the issue.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: MS ACCESS INTRO ========================
const c8AccIntro: TopicTextbook = {
  topicId: "c8-acc-intro",
  topicTitle: "Introduction to MS Access",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "What is MS Access?",
      subtitle: "Your first database program!",
      bannerImage: c8MsAccess,
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "Understanding Databases",
          body: "A **database** is an organized collection of data stored electronically.\n\n**Real-world examples of databases:**\n🏫 School — student records, attendance, marks\n🏥 Hospital — patient records, appointments\n📚 Library — book catalog, borrowing records\n🛒 Shop — product inventory, sales records\n📱 Phone — contacts list\n\n**MS Access** is a database management program from Microsoft.\n\n**Why use Access instead of Excel?**\n| Feature | Excel | Access |\n|---------|-------|--------|\n| Data limit | ~1 million rows | ~2 GB |\n| Relationships | Manual | Built-in |\n| Forms | No | Yes |\n| Reports | Limited | Professional |\n| Queries | Basic filters | SQL queries |\n| Multiple users | Difficult | Supported |\n\n**Key Database Terms:**\n📋 **Table** — stores data in rows and columns\n📝 **Record** — one row of data (one student, one book)\n📊 **Field** — one column (Name, Age, Marks)\n🔑 **Primary Key** — unique identifier for each record",
          image: c8MsAccess,
          funFact: "The world's largest databases store petabytes of data — that's millions of gigabytes!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is an organized collection of data stored electronically.", answer: "database" },
        { type: "fill-in-blank", question: "Each row in a database table is called a ___.", answer: "record" },
        { type: "true-false", question: "A Primary Key uniquely identifies each record.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "The Access Interface",
      subtitle: "Getting to know MS Access",
      bannerColor: "from-indigo-500 to-blue-500",
      sections: [
        {
          heading: "Parts of the Access Window",
          body: "**Opening Access:**\n1. Click Start → Microsoft Access\n2. Choose 'Blank database' or a template\n3. Name your database and click Create\n\n**The Access Interface:**\n📋 **Navigation Pane** (left) — Lists all objects: Tables, Queries, Forms, Reports\n📊 **Object Window** (center) — Where you work with the selected object\n🎀 **Ribbon** — Tools organized in tabs\n📊 **Status Bar** (bottom) — View options and information\n\n**Database Objects:**\n📋 **Tables** — Store the actual data\n🔍 **Queries** — Search and filter data\n📝 **Forms** — User-friendly data entry screens\n📊 **Reports** — Formatted printable output\n🔧 **Macros** — Automate repetitive tasks\n💻 **Modules** — VBA programming code\n\n**Views:**\n📊 **Datasheet View** — See data in spreadsheet format\n🔧 **Design View** — Modify the structure (fields, types)\n📝 **Form View** — See and edit one record at a time",
          tip: "Always plan your database on paper first! Decide what tables you need, what fields each table should have, and how tables relate to each other."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ pane lists all tables, queries, forms, and reports.", answer: "navigation" },
        { type: "true-false", question: "Design View lets you modify the structure of a table.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open MS Access and create a blank database called 'MySchool'. Explore the interface: click on different tabs, switch between views, and examine the Navigation Pane.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: MS ACCESS DB ========================
const c8AccDb: TopicTextbook = {
  topicId: "c8-acc-db",
  topicTitle: "Creating Database & Tables",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Creating Tables",
      subtitle: "The foundation of your database",
      bannerImage: c8MsAccess,
      bannerColor: "from-purple-500 to-blue-500",
      sections: [
        {
          heading: "Building Tables in Access",
          body: "**Creating a Table in Design View:**\n1. Create tab → Table Design\n2. Define fields:\n   - **Field Name** — The column name (StudentID, Name, Class)\n   - **Data Type** — What kind of data it stores\n   - **Description** — What this field is for\n\n**Data Types:**\n🔤 **Short Text** — Names, addresses (up to 255 characters)\n🔤 **Long Text** — Long descriptions, notes\n🔢 **Number** — Whole numbers, decimals\n📅 **Date/Time** — Dates and times\n💰 **Currency** — Money values\n🔑 **AutoNumber** — Automatically increases (1, 2, 3...)\n✅ **Yes/No** — True/False, checkbox\n🔗 **Hyperlink** — Web links, email links\n📎 **Attachment** — Files, images\n\n**Setting Primary Key:**\n1. Click on the field row (e.g., StudentID)\n2. Right-click → Primary Key\n3. A key icon appears! 🔑\n\n**Field Properties:**\n• **Field Size** — Maximum length\n• **Required** — Must have a value (Yes/No)\n• **Default Value** — Auto-filled value\n• **Validation Rule** — Data must meet a condition",
          image: c8MsAccess,
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ data type automatically increases by 1 for each new record.", answer: "autonumber" },
        { type: "fill-in-blank", question: "Short Text can store up to ___ characters.", answer: "255" },
        { type: "true-false", question: "Every table should have a Primary Key.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Entering & Managing Data",
      subtitle: "Add, edit, and organize records",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Working with Records",
          body: "**Entering Data:**\n1. Switch to **Datasheet View**\n2. Click in the first empty row\n3. Type data in each field\n4. Press **Tab** to move to the next field\n5. Data is saved automatically!\n\n**Editing Records:**\n• Click on any cell to edit it\n• Press **Esc** to cancel changes\n• Press **Delete** to clear a cell\n\n**Deleting Records:**\n1. Click the row selector (left edge)\n2. Right-click → Delete Record\n3. ⚠️ This cannot be undone!\n\n**Sorting Data:**\n• Click a column header\n• Home tab → Sort A-Z or Sort Z-A\n\n**Filtering Data:**\n• Click the column dropdown arrow\n• Check/uncheck values to filter\n• Or use text/number filters\n\n**Find & Replace:**\n• Ctrl+F — Find specific text\n• Ctrl+H — Find and replace text",
          tip: "Access saves data automatically as you type — no need to press Ctrl+S for data! But DO save the table structure (design) manually."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Press ___ to move to the next field when entering data.", answer: "tab" },
        { type: "true-false", question: "Access automatically saves data as you enter it.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a 'Students' table with fields: StudentID (AutoNumber, Primary Key), Name (Short Text), Class (Short Text), Section (Short Text), Marks (Number), DOB (Date/Time). Enter 10 student records. Sort by Marks descending. Filter to show only Class 8 students.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: MS ACCESS QUERIES ========================
const c8AccQ: TopicTextbook = {
  topicId: "c8-acc-q",
  topicTitle: "Queries, Forms & Reports",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Relationships & Queries",
      subtitle: "Connect tables and search your data!",
      bannerImage: c8MsAccess,
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "Table Relationships & Queries",
          body: "**Table Relationships** connect related tables:\n\n**Types:**\n• **One-to-Many** — One teacher teaches many students\n• **Many-to-Many** — Many students take many subjects\n• **One-to-One** — One student has one ID card\n\n**Creating a Relationship:**\n1. Database Tools tab → Relationships\n2. Add the tables you want to connect\n3. Drag a field from one table to matching field in another\n4. Check 'Enforce Referential Integrity'\n5. Click Create!\n\n**Queries — Searching Your Data:**\nA query asks a question about your data.\n\n**Using Query Design:**\n1. Create tab → Query Design\n2. Add the table(s) you want to query\n3. Double-click fields to add them\n4. Set **Criteria** (conditions):\n   • `>80` — marks greater than 80\n   • `\"8th\"` — exact text match\n   • `Like \"A*\"` — names starting with A\n5. Click Run to see results!",
          image: c8MsAccess,
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A One-to-___ relationship means one record relates to many records.", answer: "many" },
        { type: "true-false", question: "Queries are used to search and filter data.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Forms & Reports",
      subtitle: "User-friendly data entry and printing!",
      bannerColor: "from-indigo-500 to-blue-500",
      sections: [
        {
          heading: "Creating Forms and Reports",
          body: "**Forms — User-Friendly Data Entry:**\n\nForms make it easy to enter and view one record at a time.\n\n**Creating a Form:**\n1. Select a table in Navigation Pane\n2. Create tab → Form\n3. A form is instantly created!\n4. Use **Form Design** for customization\n\n**Form Features:**\n• Text boxes for data entry\n• Dropdown lists for choices\n• Buttons for navigation\n• Labels for field names\n• Colors and formatting\n\n**Reports — Professional Printouts:**\n\nReports present your data in a formatted, printable layout.\n\n**Creating a Report:**\n1. Select a table or query\n2. Create tab → Report\n3. The report shows all data formatted nicely!\n4. Use **Report Design** to customize\n\n**Report Features:**\n• Headers and footers\n• Page numbers\n• Grouping and sorting\n• Totals and subtotals\n• Charts and graphics\n• Professional formatting",
          tip: "Use Forms for entering data and Reports for printing or sharing data. They make your database look professional!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ makes it easy to enter one record at a time.", answer: "form" },
        { type: "fill-in-blank", question: "___ present data in a formatted, printable layout.", answer: "reports" },
        { type: "practice", question: "Using your Students table: (1) Create a query showing students with Marks > 75. (2) Create a Form for easy data entry. (3) Create a Report with student details grouped by Class, sorted by Name.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: KRITA INTRO ========================
const c8KritaIntro: TopicTextbook = {
  topicId: "c8-krita-intro",
  topicTitle: "Introduction to KRITA",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "What is KRITA?",
      subtitle: "Professional digital painting for free!",
      bannerImage: c8KritaInterface,
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Welcome to KRITA!",
          body: "**KRITA** is a free, professional-grade digital painting program used by artists worldwide!\n\n**What makes KRITA special?**\n🎨 Over **100 brush presets** out of the box\n📐 Professional **drawing and painting** tools\n🎭 Built-in **animation** features\n📋 Advanced **layer management**\n🖌️ Support for **graphics tablets** (like Wacom)\n💰 Completely **FREE and open source**!\n\n**What can you create?**\n• Digital paintings and illustrations\n• Comic books and manga\n• Concept art for games\n• Textures and patterns\n• Frame-by-frame animations\n• Logos and designs\n\n**KRITA vs GIMP:**\n| Feature | KRITA | GIMP |\n|---------|-------|------|\n| Best for | Painting | Photo editing |\n| Brushes | 100+ presets | Fewer |\n| Animation | Built-in | No |\n| Canvas | Infinite canvas | Fixed |\n| Tablet support | Excellent | Good |",
          image: c8KritaInterface,
          funFact: "KRITA is used by professional game artists and animators! Some indie games and animations you've seen were made with KRITA."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "KRITA is a free ___ painting program.", answer: "digital" },
        { type: "true-false", question: "KRITA has built-in animation features.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "The KRITA Interface",
      subtitle: "Your digital art studio",
      bannerColor: "from-amber-500 to-yellow-500",
      sections: [
        {
          heading: "Getting to Know KRITA",
          body: "**KRITA Interface:**\n\n🖼️ **Canvas** — Your drawing area (center)\n🔧 **Toolbox** — Left side, all drawing tools\n🎨 **Color Selector** — Advanced color wheel and palette\n📋 **Layers Panel** — Manage layers (right side)\n🖌️ **Brush Presets** — Tons of brushes to choose from\n📊 **Tool Options** — Settings for the active tool\n\n**Essential Tools:**\n✏️ **Freehand Brush** — Draw naturally with your mouse or tablet\n📏 **Line Tool** — Perfectly straight lines\n📐 **Shape Tools** — Rectangles, ellipses, polygons\n🪣 **Fill Tool** — Fill areas with color\n🔤 **Text Tool** — Add text\n🔲 **Selection Tools** — Select areas to edit\n📐 **Transform Tool** — Move, resize, rotate\n💧 **Color Sampler** — Pick a color from the canvas\n\n**Brush Engines:**\n• Pixel Brush — standard digital brush\n• Smudge Brush — blend colors like wet paint\n• Shape Brush — stamps and patterns\n• Particle Brush — spray effects",
          tip: "Press E to switch to eraser, B to switch to brush. These shortcuts save time!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Press ___ to switch to the eraser tool.", answer: "e" },
        { type: "practice", question: "Open KRITA. Try 10 different brush presets: draw strokes with each to see how they look. Create a sample sheet with the brush name next to each stroke. Save as PNG.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: KRITA LAYERS & ANIMATION ========================
const c8KritaLa: TopicTextbook = {
  topicId: "c8-krita-la",
  topicTitle: "KRITA Layers & Animation",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Layers in KRITA",
      subtitle: "Organize your artwork professionally!",
      bannerImage: c8KritaInterface,
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Working with Layers",
          body: "**Layer Management in KRITA:**\n\n➕ **Add Layer** — Click + at bottom of Layers panel\n🗑️ **Delete Layer** — Select and click trash icon\n👁️ **Visibility** — Click eye icon to show/hide\n🔒 **Lock** — Prevent changes to a layer\n🎨 **Opacity** — Slide to change transparency\n\n**Types of Layers:**\n🖼️ **Paint Layer** — For drawing (most common)\n📁 **Group Layer** — Organize layers in folders\n🔲 **Vector Layer** — For shapes that can be resized\n🎭 **Filter Layer** — Apply live effects\n📝 **Fill Layer** — Solid color or pattern fill\n\n**Blending Modes:**\n• **Normal** — standard\n• **Multiply** — darken colors\n• **Screen** — lighten colors\n• **Overlay** — increase contrast\n• **Add** — bright glow effects\n\n**Layer Organization Tips:**\n📁 Group: Background\n  📋 Sky layer\n  📋 Ground layer\n📁 Group: Character\n  📋 Body layer\n  📋 Details layer\n📁 Group: Text & Effects\n  📋 Title layer",
          image: c8KritaInterface,
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ layer is used for organizing layers in folders.", answer: "group" },
        { type: "true-false", question: "Blending modes change how layers interact with each other.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Frame-by-Frame Animation",
      subtitle: "Bring your drawings to life!",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Animation in KRITA",
          body: "**KRITA has a built-in animation system!**\n\n**Animation Timeline:**\n• Open: Settings → Dockers → Animation Timeline\n• Each column = one frame\n• Each row = one layer\n\n**Creating an Animation:**\n1. Create a new canvas (File → New)\n2. Open the Animation Timeline\n3. On Frame 1, draw your first pose\n4. Click on Frame 2, add a **new frame**\n5. Draw the next pose (slightly different)\n6. Repeat for each frame\n7. Press **Play** to see your animation!\n\n**Onion Skinning:**\n🧅 Shows ghostly images of previous/next frames\n• Helps you draw smooth movements\n• Toggle: Settings → Dockers → Onion Skins\n• Adjust how many frames before/after to show\n\n**Animation Tips:**\n• Start with simple animations (bouncing ball)\n• Use 12 frames per second for smooth animation\n• Draw key poses first, then fill in between (tweening)\n• Keep movements small between frames\n\n**Exporting:**\n• File → Render Animation\n• Export as GIF, MP4, or image sequence",
          tip: "Start simple! A bouncing ball is the perfect first animation. Just move it up and down across 12 frames."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ shows ghostly images of nearby frames to help with animation.", answer: "onion skinning" },
        { type: "true-false", question: "KRITA can export animations as GIF files.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a simple animation in KRITA: a ball bouncing 3 times. Use at least 12 frames with onion skinning enabled. Export as a GIF.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: PYTHON CONTROL ========================
const c8PyCtrl: TopicTextbook = {
  topicId: "c8-py-ctrl",
  topicTitle: "Python Control Statements",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "If-Else Decisions",
      subtitle: "Making your programs smart!",
      bannerImage: c6Python,
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Conditional Statements",
          body: "**if-else** lets programs make decisions:\n\n```python\nmarks = int(input(\"Enter marks: \"))\n\nif marks >= 90:\n    print(\"Grade: A+ — Outstanding!\")\nelif marks >= 80:\n    print(\"Grade: A — Excellent!\")\nelif marks >= 70:\n    print(\"Grade: B — Good job!\")\nelif marks >= 60:\n    print(\"Grade: C — Keep trying!\")\nelse:\n    print(\"Grade: D — Need improvement\")\n```\n\n**Nested if:**\n```python\nage = int(input(\"Age: \"))\ncitizen = input(\"Citizen? (yes/no): \")\n\nif age >= 18:\n    if citizen == \"yes\":\n        print(\"You can vote!\")\n    else:\n        print(\"Citizens only can vote\")\nelse:\n    print(\"Too young to vote\")\n```\n\n**Logical Operators in Conditions:**\n```python\nif age >= 13 and age <= 19:\n    print(\"Teenager!\")\n\nif day == \"Sat\" or day == \"Sun\":\n    print(\"Weekend!\")\n\nif not is_raining:\n    print(\"Go outside!\")\n```",
          image: c6Python,
          tip: "Remember: Python uses indentation (4 spaces) for code blocks, not curly braces!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyword for 'else if' in Python is ___.", answer: "elif" },
        { type: "true-false", question: "You can nest if statements inside other if statements.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Loops",
      subtitle: "Repeat code efficiently!",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "for and while Loops",
          body: "**for loop** — repeat a specific number of times:\n```python\n# Print 1 to 10\nfor i in range(1, 11):\n    print(i)\n\n# Multiplication table\nnum = int(input(\"Table of: \"))\nfor i in range(1, 11):\n    print(f\"{num} x {i} = {num * i}\")\n\n# Loop through a list\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(\"I like\", fruit)\n```\n\n**while loop** — repeat while condition is true:\n```python\n# Countdown\ncount = 10\nwhile count > 0:\n    print(count)\n    count -= 1\nprint(\"Blast off! 🚀\")\n\n# Guess the number\nsecret = 7\nguess = 0\nwhile guess != secret:\n    guess = int(input(\"Guess: \"))\nprint(\"Correct!\")\n```\n\n**Loop Control:**\n`break` — exit loop immediately\n`continue` — skip to next iteration\n`pass` — do nothing (placeholder)",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "range(1, 11) generates numbers from 1 to ___.", answer: "10" },
        { type: "fill-in-blank", question: "The ___ statement exits a loop immediately.", answer: "break" },
        { type: "practice", question: "Create a number guessing game: randomly pick a number 1-100 (use random.randint). Let the user guess with hints 'Too high/low'. Count guesses. Show the answer after they get it right.", answer: "" },
      ]
    },
    {
      pageTitle: "Functions",
      subtitle: "Reusable blocks of code!",
      bannerColor: "from-teal-500 to-blue-500",
      sections: [
        {
          heading: "Defining and Using Functions",
          body: "**Functions** package code for reuse:\n\n```python\ndef greet(name):\n    \"\"\"Greet a person by name\"\"\"\n    print(f\"Hello, {name}! Welcome!\")\n\ngreet(\"Aarav\")   # Hello, Aarav! Welcome!\ngreet(\"Priya\")   # Hello, Priya! Welcome!\n```\n\n**Return values:**\n```python\ndef add(a, b):\n    return a + b\n\ndef is_even(num):\n    return num % 2 == 0\n\nresult = add(5, 3)     # 8\nprint(is_even(4))      # True\n```\n\n**Default parameters:**\n```python\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))      # 9  (3²)\nprint(power(2, 5))   # 32 (2⁵)\n```\n\n**Multiple return values:**\n```python\ndef min_max(numbers):\n    return min(numbers), max(numbers)\n\nlow, high = min_max([4, 2, 9, 1, 7])\nprint(f\"Min: {low}, Max: {high}\")\n```",
          tip: "Name functions with verbs: calculate_area(), check_password(), display_menu(). The name should describe what the function DOES."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyword to define a function is ___.", answer: "def" },
        { type: "fill-in-blank", question: "The ___ statement sends a value back from a function.", answer: "return" },
        { type: "practice", question: "Create a mini-library of functions: (1) calculate_area(length, width) (2) celsius_to_fahrenheit(c) (3) is_palindrome(word) (4) factorial(n). Test each function with different inputs.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: CANVA ========================
const c8Canva: TopicTextbook = {
  topicId: "c8-canva",
  topicTitle: "Graphic Design with Canva",
  subjectColor: "neon-pink",
  pages: [
    {
      pageTitle: "What is Canva?",
      subtitle: "Design like a pro — for free!",
      bannerImage: c8CanvaInterface,
      bannerColor: "from-pink-500 to-purple-500",
      sections: [
        {
          heading: "Welcome to Canva!",
          body: "**Canva** is a free online graphic design tool that anyone can use!\n\n**What can you create?**\n📱 Social media posts (Instagram, Facebook)\n📊 Presentations (like PowerPoint but prettier!)\n📄 Posters and flyers\n🎴 Business cards and invitations\n📰 Infographics\n📋 Resumes\n🎬 Video thumbnails\n📚 Book covers\n🎨 Logos and branding\n\n**Why Canva?**\n✅ Free to use (with premium options)\n✅ Works in your browser (no installation!)\n✅ 1000s of templates to start from\n✅ Drag-and-drop interface\n✅ Millions of free photos, icons, and elements\n✅ Team collaboration features\n✅ Direct download in many formats (PNG, PDF, JPG)\n\n**Getting Started:**\n1. Go to **canva.com**\n2. Create a free account\n3. Choose what you want to design\n4. Pick a template or start blank\n5. Customize and download!",
          image: c8CanvaInterface,
          funFact: "Canva was founded in 2013 by Melanie Perkins when she was just 25 years old. Today it's worth over $25 billion!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Canva works in your ___ — no installation needed.", answer: "browser" },
        { type: "true-false", question: "Canva has thousands of free templates.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "The Canva Interface",
      subtitle: "Navigate like a design pro!",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "Designing in Canva",
          body: "**The Canva Editor:**\n\n🖼️ **Canvas** — Your design area (center)\n📋 **Left Panel** — Templates, Elements, Uploads, Text, etc.\n🎨 **Top Bar** — File menu, undo/redo, share, download\n📐 **Right Panel** — Page management, notes\n\n**Key Sections in Left Panel:**\n📐 **Templates** — Pre-designed layouts\n🎭 **Elements** — Shapes, stickers, icons, lines, graphics\n📸 **Photos** — Millions of free stock photos\n🔤 **Text** — Add headings, subheadings, body text\n📁 **Uploads** — Use your own images\n🎨 **Brand Kit** — Save your brand colors and fonts\n\n**Essential Skills:**\n• **Drag & Drop** — Add elements by dragging to canvas\n• **Resize** — Drag corner handles\n• **Rotate** — Use the rotation handle\n• **Layer Order** — Right-click → Send to back/front\n• **Group** — Select multiple elements → Group\n• **Alignment** — Use purple guide lines for alignment\n• **Copy Style** — Copy formatting from one element to another",
          tip: "Use the alignment guides (purple dotted lines) that appear when moving elements — they help you center and align everything perfectly!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Drag corner handles to ___ elements in Canva.", answer: "resize" },
        { type: "practice", question: "Create a poster for a school science fair: include a title, event details (date, time, venue), add relevant images and icons, use complementary colors. Download as PNG.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: APP INVENTOR ========================
const c8AppInv: TopicTextbook = {
  topicId: "c8-appinv",
  topicTitle: "MIT App Inventor",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "What is App Inventor?",
      subtitle: "Build real Android apps with blocks!",
      bannerImage: c8AppInventor,
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Welcome to MIT App Inventor!",
          body: "**MIT App Inventor** is a free tool that lets you create real Android apps using visual block programming — just like Scratch!\n\n**What can you build?**\n📱 Calculator apps\n🎮 Games\n📸 Photo apps\n🗣️ Apps that talk (text-to-speech)\n📍 Location-based apps\n📊 Quiz apps\n🎵 Music players\n📋 To-do lists\n\n**Two Main Views:**\n🎨 **Designer View** — Design the user interface (UI)\n  • Add buttons, text boxes, images, etc.\n  • Arrange components on the screen\n  • Set properties (colors, sizes, text)\n\n🧩 **Blocks View** — Program the behavior\n  • Drag and connect blocks (like Scratch!)\n  • Event blocks: 'When button clicked...'\n  • Logic, math, text, lists, procedures\n\n**Getting Started:**\n1. Go to **ai2.appinventor.mit.edu**\n2. Sign in with Google account\n3. Create a new project\n4. Start designing!",
          image: c8AppInventor,
          funFact: "MIT App Inventor was originally created by Google and is now maintained by MIT. Millions of apps have been built with it!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "App Inventor has two views: Designer and ___.", answer: "blocks" },
        { type: "true-false", question: "App Inventor uses block programming similar to Scratch.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Building Your First App",
      subtitle: "Hello World on your phone!",
      bannerColor: "from-indigo-500 to-purple-500",
      sections: [
        {
          heading: "Creating a Simple App",
          body: "**Step 1: Designer View**\n1. Add a **Label** — displays text\n2. Add a **Button** — user can tap it\n3. Add a **TextBox** — user types input\n\n**Setting Properties:**\n• Label: Text = 'Hello!', FontSize = 24, TextColor = Blue\n• Button: Text = 'Click Me', BackgroundColor = Green\n• TextBox: Hint = 'Enter your name'\n\n**Step 2: Blocks View**\n```\nWhen Button1.Click do\n  set Label1.Text to\n    join \"Hello, \" TextBox1.Text \"!\"\n```\n\n**This app:**\n1. User types their name\n2. Presses the button\n3. Label shows \"Hello, [name]!\"\n\n**Testing Your App:**\n📱 **MIT AI2 Companion** — Install this app on your phone\n  • Scan the QR code from the browser\n  • Your app runs live on your phone!\n🖥️ **Emulator** — Test on your computer\n  • Connect → Emulator\n\n**Components to Explore:**\n• Image, Sound, Video Player\n• TinyDB (store data)\n• Camera, AccelerometerSensor\n• TextToSpeech, SpeechRecognizer\n• Notifier (alerts and messages)",
          tip: "Use the MIT AI2 Companion app on your phone for live testing — see changes instantly as you build!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ component lets users type text input.", answer: "textbox" },
        { type: "true-false", question: "You can test App Inventor apps on your phone using AI2 Companion.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Build a simple calculator app: 2 TextBoxes for numbers, 4 buttons (+, -, ×, ÷), and a Label to show the result. Test on your phone or emulator.", answer: "" },
      ]
    },
  ]
};

// Export all Class 6-8 content
export const CLASS_6_8_TEXTBOOKS: TopicTextbook[] = [
  c6HtmlIntro,
  c6CssIntro,
  c6PythonIntro,
  c6Internet,
  c6Excel,
  c6GimpIntro,
  c6GimpSelect,
  c6HtmlTags,
  c6CssProps,
  c6AiAct,
  c7HtmlAdv,
  c7PythonAdv,
  c7Excel,
  c7Gimp,
  c7PyOps,
  c7AiAct,
  c8JavaIntro,
  c8AccIntro,
  c8AccDb,
  c8AccQ,
  c8KritaIntro,
  c8KritaLa,
  c8PyCtrl,
  c8Canva,
  c8AppInv,
];
