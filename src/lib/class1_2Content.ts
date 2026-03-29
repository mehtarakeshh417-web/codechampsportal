// Curriculum content for Classes 1-2
import c1ComputerParts from "@/assets/curriculum/c1-computer-parts.jpg";
import c1PaintTools from "@/assets/curriculum/c1-paint-tools.jpg";
import c1ScratchJr from "@/assets/curriculum/c1-scratchjr.jpg";
import c2ComputerTypes from "@/assets/curriculum/c2-computer-types.jpg";

import type { TopicTextbook } from "./class5Content";

// ======================== CLASS 1: COMPUTER BASICS ========================
const c1ComputerIntro: TopicTextbook = {
  topicId: "c1-it-intro",
  topicTitle: "Introduction to Computers",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "What is a Computer?",
      subtitle: "Let's learn about this amazing machine!",
      bannerImage: c1ComputerParts,
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Meet the Computer!",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
          body: "A **computer** is an electronic machine that can:\n\n🖥️ **Store** information (like photos, games, and homework)\n🧮 **Calculate** numbers very fast\n🎮 **Play** games and videos\n✏️ **Help** us draw and write\n\nComputers are everywhere! They are in your school, your home, your parents' phones, and even in cars!\n\n**Think of a computer like a very smart helper** — you tell it what to do, and it does it for you!",
          youtubeId: "z9-yDaTwMHk",
          funFact: "The first computer was so big that it filled an entire room! Today, your phone is more powerful than that giant computer.",
          illustration: [
            { emoji: "🖥️", label: "Desktop" },
            { emoji: "💻", label: "Laptop" },
            { emoji: "📱", label: "Tablet" },
            { emoji: "📱", label: "Phone" },
            { emoji: "⌚", label: "Smartwatch" },
            { emoji: "🚗", label: "Car Computer" },
          ],
          keyTerms: [
            { term: "Computer", definition: "An electronic machine that processes information and follows instructions." },
            { term: "Program", definition: "A set of instructions that tells the computer what to do." },
            { term: "Data", definition: "Information that a computer stores and uses — like numbers, words, and pictures." },
          ]
        }
      ]
    },
    {
      pageTitle: "Parts of a Computer",
      subtitle: "Getting to know each part",
      bannerImage: c1ComputerParts,
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "The Main Parts",
          body: "Every computer has these important parts:\n\n🖥️ **Monitor** — The screen where you see everything. It shows pictures, words, and videos. It looks like a TV!\n\n⌨️ **Keyboard** — Has letters, numbers, and special keys. You use it to type words and give commands.\n\n🖱️ **Mouse** — A small device you move on the desk. It has buttons to click and a wheel to scroll.\n\n🖥️ **CPU (Central Processing Unit)** — The \"brain\" of the computer. It thinks and processes everything! It's usually inside a big box.\n\n🔊 **Speakers** — Make sounds, music, and voices come out of the computer.",
          image: c1ComputerParts,
          youtubeId: "1UjWdtY8yx4",
          tip: "Remember: The CPU is the BRAIN, the Monitor is the EYES, the Keyboard is the MOUTH, and the Mouse is the HAND!",
          illustration: [
            { emoji: "🖥️", label: "Monitor" },
            { emoji: "⌨️", label: "Keyboard" },
            { emoji: "🖱️", label: "Mouse" },
            { emoji: "🧠", label: "CPU" },
            { emoji: "🔊", label: "Speakers" },
            { emoji: "🖨️", label: "Printer" },
          ],
          table: {
            headers: ["Part", "What It Does", "Looks Like"],
            rows: [
              ["Monitor", "Shows pictures and text", "A flat screen like a TV"],
              ["Keyboard", "Type letters and numbers", "Rectangle with many keys"],
              ["Mouse", "Point and click on things", "Small oval with buttons"],
              ["CPU", "Thinks and processes everything", "A big box / tower"],
              ["Speakers", "Plays sounds and music", "Small boxes near the monitor"],
            ]
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ is called the brain of the computer.", answer: "cpu" },
        { type: "fill-in-blank", question: "We use the ___ to type letters and numbers.", answer: "keyboard" },
        { type: "true-false", question: "The monitor is where we see pictures and words.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "The mouse is used to type words.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Using a Mouse",
      subtitle: "Learn to click, double-click, and drag!",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "How to Hold the Mouse",
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=400&fit=crop",
          body: "🖱️ Place your hand gently on top of the mouse.\n\n**Your fingers should be like this:**\n👆 **Index finger** (pointer finger) — rests on the **left button**\n👆 **Middle finger** — rests on the **right button**\n👍 **Thumb** — holds the side of the mouse\n\n**Mouse Actions:**\n\n🖱️ **Click** — Press the left button once, quickly. Used to select things.\n🖱️🖱️ **Double-click** — Press the left button twice, very fast. Used to open things.\n➡️ **Right-click** — Press the right button once. Shows a menu with options.\n✋ **Drag** — Hold down the left button while moving the mouse. Used to move things around.\n🔄 **Scroll** — Roll the wheel in the middle to move up and down on a page.",
          tip: "Practice clicking slowly at first. Once you get good, try double-clicking! It takes practice to be fast enough.",
          table: {
            headers: ["Mouse Action", "How To Do It", "When To Use It"],
            rows: [
              ["Click", "Press left button once", "Select an item"],
              ["Double-Click", "Press left button twice fast", "Open a file or folder"],
              ["Right-Click", "Press right button once", "See a menu of options"],
              ["Drag", "Hold left button + move mouse", "Move things around"],
              ["Scroll", "Roll the middle wheel", "Go up/down on a page"],
            ]
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To open a folder, we ___ on it.", answer: "double-click" },
        { type: "fill-in-blank", question: "To select something, we ___ on it.", answer: "click" },
        { type: "true-false", question: "Right-clicking opens a menu with options.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Practice using the mouse: Open MS Paint, draw a circle using the mouse, fill it with your favorite color, and save your drawing!", answer: "" },
      ]
    },
    {
      pageTitle: "Using the Keyboard",
      subtitle: "Learn the keys and start typing!",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "Important Keys on the Keyboard",
          image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=400&fit=crop",
          body: "The keyboard has many keys. Let's learn the most important ones:\n\n🔤 **Letter Keys** (A-Z) — Type letters to make words\n🔢 **Number Keys** (0-9) — Type numbers\n⬜ **Space Bar** — The longest key at the bottom. Makes a space between words.\n⏎ **Enter Key** — Goes to a new line, or says \"OK\" to the computer\n⬅️ **Backspace** — Deletes the letter BEFORE the cursor (goes backward)\n🔠 **Caps Lock** — Makes ALL letters CAPITAL when turned on\n⬆️ **Shift** — Hold it while pressing a letter to make ONE capital letter\n\n**Special Keys:**\n🔼 **Arrow Keys** — Move up, down, left, right\n⎋ **Escape (Esc)** — Cancels or closes something\n📋 **Tab** — Makes a big space (indent)",
          youtubeId: "n7LBLjnF_qs",
          illustration: [
            { emoji: "🔤", label: "Letters A-Z" },
            { emoji: "🔢", label: "Numbers 0-9" },
            { emoji: "⬜", label: "Space Bar" },
            { emoji: "⏎", label: "Enter" },
            { emoji: "⬅️", label: "Backspace" },
            { emoji: "⬆️", label: "Shift" },
            { emoji: "🔠", label: "Caps Lock" },
            { emoji: "⎋", label: "Escape" },
          ]
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ key makes a space between words.", answer: "space bar" },
        { type: "fill-in-blank", question: "The ___ key deletes letters before the cursor.", answer: "backspace" },
        { type: "true-false", question: "Caps Lock makes all letters capital.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open MS Word or a text editor. Type your full name, your school name, and your favorite color. Use Caps Lock for the headings and regular letters for the details.", answer: "" },
      ]
    },
    {
      pageTitle: "Starting and Shutting Down",
      subtitle: "How to turn the computer on and off safely",
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Turning On the Computer",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop",
          body: "**To start the computer:**\n1. Press the **Power button** on the CPU box\n2. Press the **Power button** on the Monitor\n3. Wait for the computer to start up (this is called **booting**)\n4. The **Desktop** appears — this is your home screen!\n\n**The Desktop shows:**\n🖼️ **Icons** — Small pictures that represent programs\n📁 **Folders** — Where you keep your files organized\n📋 **Taskbar** — The bar at the bottom with the Start button\n🪟 **Start Button** — Click it to see all your programs",
          keyTerms: [
            { term: "Booting", definition: "The process of turning on a computer and loading the operating system." },
            { term: "Desktop", definition: "The main screen you see after the computer starts. It shows icons and the taskbar." },
            { term: "Taskbar", definition: "The bar at the bottom of the screen that shows the Start button and open programs." },
          ],
          illustration: [
            { emoji: "🖼️", label: "Icons" },
            { emoji: "📁", label: "Folders" },
            { emoji: "📋", label: "Taskbar" },
            { emoji: "🪟", label: "Start Menu" },
          ]
        },
        {
          heading: "Shutting Down Safely",
          image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=400&fit=crop",
          body: "**Never just press the power button to turn off!** This can hurt the computer.\n\n**The correct way to shut down:**\n1. Click the **Start button** (bottom-left corner)\n2. Click **Power** (the power icon)\n3. Click **Shut Down**\n4. Wait for the computer to turn off completely\n5. Then turn off the monitor\n\n**Other options:**\n😴 **Sleep** — Computer rests but doesn't fully turn off\n🔄 **Restart** — Turns off and turns back on (useful when something is stuck)\n\n⚠️ **Always save your work before shutting down!**",
          tip: "Think of Shut Down like going to sleep properly — you brush your teeth, change clothes, and then sleep. Don't just fall on the floor!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The process of turning on a computer is called ___.", answer: "booting" },
        { type: "fill-in-blank", question: "To shut down, first click the ___ button.", answer: "start" },
        { type: "true-false", question: "You should save your work before shutting down.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "You should always press the power button to turn off the computer.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "Let's see what you learned!",
      bannerColor: "from-amber-500 to-orange-500",
      sections: [
        {
          heading: "Summary",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
          body: "Great job! You learned about:\n\n✅ What a computer is and what it can do\n✅ The main parts: Monitor, Keyboard, Mouse, CPU, Speakers\n✅ How to use the mouse — click, double-click, right-click, drag\n✅ Important keyboard keys\n✅ How to start and safely shut down a computer\n\nYou're now ready to start using the computer! 🎉",
          comparison: {
            left: {
              title: "Input Devices",
              points: ["Keyboard — for typing", "Mouse — for pointing & clicking", "Microphone — for voice input", "Camera — for taking pictures"]
            },
            right: {
              title: "Output Devices",
              points: ["Monitor — shows pictures & text", "Speakers — plays sounds", "Printer — prints on paper", "Headphones — plays sound privately"]
            }
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A computer can store, calculate, and ___ information.", answer: "process" },
        { type: "fill-in-blank", question: "The ___ is the brain of the computer.", answer: "cpu" },
        { type: "true-false", question: "The keyboard is used to point and click.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "Double-clicking opens a file or folder.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Turn on the computer. Open Paint. Draw a picture of a computer showing the monitor, keyboard, mouse, and CPU. Label each part. Save your drawing.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 1: PAINT ========================
const c1PaintStart: TopicTextbook = {
  topicId: "c1-paint-start",
  topicTitle: "Starting MS Paint",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "What is MS Paint?",
      subtitle: "Your digital drawing canvas!",
      bannerImage: c1PaintTools,
      bannerColor: "from-orange-500 to-yellow-500",
      sections: [
        {
          heading: "Welcome to MS Paint!",
          body: "**MS Paint** is a drawing program that comes with every Windows computer. You can use it to:\n\n🎨 Draw pictures with pencils and brushes\n📏 Make shapes like circles, squares, and triangles\n🌈 Color your drawings with lots of colors\n✍️ Write text on your drawings\n💾 Save your artwork to show later!\n\n**How to Open MS Paint:**\n1. Click the **Start** button\n2. Type **Paint**\n3. Click on **Paint** app\n\nOr: Start → All Programs → Windows Accessories → Paint",
          image: c1PaintTools,
          youtubeId: "-2NuOZ1O1Gs"
        }
      ]
    },
    {
      pageTitle: "Parts of the Paint Window",
      subtitle: "Know your drawing tools!",
      bannerColor: "from-yellow-500 to-orange-500",
      sections: [
        {
          heading: "The Paint Interface",
          image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop",
          body: "When you open Paint, you see:\n\n🎨 **Drawing Area (Canvas)** — The big white area where you draw. This is your paper!\n\n🔧 **Tool Bar / Ribbon** — At the top. Has all the drawing tools like pencil, brush, shapes, colors.\n\n🎨 **Color Palette** — Shows all the colors you can use. Click a color to select it.\n\n📏 **Size Options** — Choose how thick your lines should be.\n\n📋 **Menu Bar** — File, Home, View menus at the very top.\n\n**The most important tools:**\n✏️ Pencil — draws thin lines\n🖌️ Brush — draws thick, artistic lines\n🪣 Fill — fills a shape with color\n🔤 Text — adds words to your drawing\n📐 Shapes — draws circles, squares, lines\n🧽 Eraser — removes mistakes",
          tip: "The Pencil tool is best for thin lines and details. The Brush tool is better for coloring large areas!",
          illustration: [
            { emoji: "✏️", label: "Pencil" },
            { emoji: "🖌️", label: "Brush" },
            { emoji: "🪣", label: "Fill" },
            { emoji: "🔤", label: "Text" },
            { emoji: "📐", label: "Shapes" },
            { emoji: "🧽", label: "Eraser" },
            { emoji: "🎨", label: "Colors" },
            { emoji: "📏", label: "Size" },
          ]
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The big white area where you draw is called the ___.", answer: "canvas" },
        { type: "fill-in-blank", question: "The ___ tool fills a shape with color.", answer: "fill" },
        { type: "true-false", question: "The eraser tool removes mistakes from your drawing.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open MS Paint. Try each tool: draw a line with the Pencil, paint a stroke with the Brush, draw a shape, and use the Fill tool to color it.", answer: "" },
      ]
    },
    {
      pageTitle: "Drawing Shapes",
      subtitle: "Circles, squares, and more!",
      bannerColor: "from-green-500 to-teal-500",
      sections: [
        {
          heading: "How to Draw Shapes",
          image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=400&fit=crop",
          body: "**Steps to draw a shape:**\n1. Click the **Shapes** button in the toolbar\n2. Choose a shape (rectangle, oval, line, triangle, etc.)\n3. Click and drag on the canvas to draw it!\n\n**Shape tips:**\n⬛ **Rectangle** — click and drag to make a box\n⭕ **Oval** — click and drag to make a circle (hold Shift for perfect circle!)\n📐 **Triangle** — use the polygon tool\n➖ **Line** — draw straight lines\n⭐ **Star** — make star shapes\n\n**Outline vs Filled:**\n• **Outline** — only the border of the shape\n• **Filled** — the shape is colored inside\n• **No outline** — only the fill, no border",
          youtubeId: "4ZDt8KRo6vE"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Hold the ___ key while dragging to make a perfect circle.", answer: "shift" },
        { type: "true-false", question: "You can draw both outline and filled shapes in Paint.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Draw a house using shapes: a rectangle for the body, a triangle for the roof, small squares for windows, and a rectangle for the door. Color everything using the Fill tool.", answer: "" },
      ]
    },
    {
      pageTitle: "Coloring Your Drawings",
      subtitle: "Make your art colorful!",
      bannerColor: "from-pink-500 to-rose-500",
      sections: [
        {
          heading: "Using Colors",
          image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&h=400&fit=crop",
          body: "**How to choose a color:**\n1. Look at the **Color Palette** at the top\n2. **Click a color** to select it (this becomes your drawing color)\n3. Start drawing — everything will be in that color!\n\n**Color 1 vs Color 2:**\n🎨 **Color 1** (left-click color) — the main drawing color\n🎨 **Color 2** (right-click color) — the background/secondary color\n\n**Fill with Color (Paint Bucket):**\n1. Click the **Fill** tool (paint bucket icon)\n2. Click inside any closed shape\n3. The shape fills with Color 1!\n\n**Edit Colors:**\n• Click **Edit Colors** to see ALL possible colors\n• You can create custom colors by mixing!\n\n⚠️ **Important:** The Fill tool only works inside **closed shapes**. If there's even a tiny gap, color will leak everywhere!",
          tip: "If color leaks when you fill, press Ctrl+Z to undo, zoom in to find the gap, close it with the Pencil tool, then try filling again."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ tool fills a closed shape with color.", answer: "fill" },
        { type: "true-false", question: "Color 1 is the main drawing color.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "The Fill tool works even if the shape has gaps.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Draw a rainbow! Draw 7 curved lines (arcs) and fill each with a rainbow color: Red, Orange, Yellow, Green, Blue, Indigo, Violet.", answer: "" },
      ]
    },
    {
      pageTitle: "Saving Your Art",
      subtitle: "Keep your drawings forever!",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "How to Save",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
          body: "**Saving your drawing:**\n1. Click **File** → **Save As**\n2. Choose where to save (Desktop, Documents, etc.)\n3. Type a **name** for your file (like 'My House Drawing')\n4. Click **Save**!\n\n**File formats:**\n🖼️ **PNG** — best quality, keeps transparency\n🖼️ **JPEG/JPG** — smaller file size, good for photos\n🖼️ **BMP** — Paint's original format, very large files\n🖼️ **GIF** — small size, limited colors\n\n**Quick Save:** Press **Ctrl+S** to save quickly (uses the same name and location)\n\n**Save vs Save As:**\n• **Save** — saves over the existing file\n• **Save As** — lets you choose a new name or location",
          tip: "Always save your work often! Press Ctrl+S every few minutes so you don't lose anything."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyboard shortcut to save is Ctrl+___.", answer: "s" },
        { type: "fill-in-blank", question: "The best quality image format is ___.", answer: "png" },
        { type: "true-false", question: "Save As lets you choose a new name for your file.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a drawing of your favorite animal. Color it beautifully. Save it as a PNG file on the Desktop with your name as the filename.", answer: "" },
      ]
    },
  ]
};

const c1PaintShapes: TopicTextbook = {
  topicId: "c1-paint-shapes",
  topicTitle: "Drawing Shapes in Paint",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Basic Shapes",
      subtitle: "Learn to draw perfect shapes!",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Drawing Lines and Rectangles",
          image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=400&fit=crop",
          body: "**Drawing a Line:**\n1. Select the **Line** tool\n2. Choose a thickness\n3. Click where you want the line to start\n4. Drag to where you want it to end\n5. Release!\n\n**Drawing a Rectangle:**\n1. Select the **Rectangle** tool\n2. Click and drag on the canvas\n3. A rectangle appears!\n4. Hold **Shift** to make a perfect square\n\n**Drawing an Oval/Circle:**\n1. Select the **Oval** tool\n2. Click and drag\n3. Hold **Shift** for a perfect circle",
          youtubeId: "Xn7Ac-ujT9A"
        }
      ],
      exercises: [
        { type: "true-false", question: "Holding Shift while drawing an oval makes a perfect circle.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Draw a traffic light: 3 circles (red, yellow, green) inside a tall rectangle. Color each circle with the correct color.", answer: "" },
      ]
    },
    {
      pageTitle: "Using Freeform Tools",
      subtitle: "Draw anything you can imagine!",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Pencil and Brush Drawing",
          image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=400&fit=crop",
          body: "**Pencil Tool:**\n• Makes thin, precise lines\n• Great for details and outlines\n• Click and hold while moving the mouse\n\n**Brush Tool:**\n• Makes thicker, more artistic strokes\n• You can choose different brush styles:\n  - Round brush\n  - Square brush\n  - Calligraphy brush\n  - Oil brush\n\n**Eraser Tool:**\n• Removes anything you've drawn\n• You can change the eraser size\n• Right-click with eraser to erase only Color 1\n\n**Tip:** Zoom in (View → Zoom In) to draw small details more easily!",
          comparison: {
            left: {
              title: "Pencil Tool",
              points: ["Thin, precise lines", "Best for outlines & details", "Single consistent width", "Good for writing text"]
            },
            right: {
              title: "Brush Tool",
              points: ["Thick, artistic strokes", "Multiple brush styles", "Adjustable size", "Good for coloring & painting"]
            }
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ tool makes thin, precise lines.", answer: "pencil" },
        { type: "practice", question: "Draw your favorite cartoon character using the Pencil tool for outlines and the Fill tool for colors. Try to add small details by zooming in.", answer: "" },
      ]
    },
    {
      pageTitle: "Art Projects",
      subtitle: "Put your skills to the test!",
      bannerColor: "from-purple-500 to-violet-500",
      sections: [
        {
          heading: "Creative Drawing Projects",
          image: "https://images.unsplash.com/photo-1560421683-6856ea585c78?w=800&h=400&fit=crop",
          body: "Now that you know all the tools, try these fun projects:\n\n🏠 **Project 1: My Dream House**\nDraw a house with windows, a door, a roof, trees, sun, and clouds. Use shapes for the building and freeform for decorations.\n\n🌳 **Project 2: Nature Scene**\nDraw a garden with flowers, trees, butterflies, and a bright sun. Use lots of colors!\n\n🐱 **Project 3: My Favorite Animal**\nDraw your favorite animal. Try to use circles for the head and body, and lines for legs and whiskers.\n\n🌈 **Project 4: Rainbow Art**\nDraw a beautiful rainbow over mountains with clouds. Fill each band with the correct color.",
          illustration: [
            { emoji: "🏠", label: "Dream House" },
            { emoji: "🌳", label: "Nature Scene" },
            { emoji: "🐱", label: "Animal Art" },
            { emoji: "🌈", label: "Rainbow Art" },
          ]
        }
      ],
      exercises: [
        { type: "practice", question: "Choose one of the 4 projects above and create it in MS Paint. Save it as a PNG file. Try to use at least 5 different colors and 3 different tools.", answer: "" },
      ]
    },
  ]
};

const c1PaintColor: TopicTextbook = {
  topicId: "c1-paint-color",
  topicTitle: "Coloring in Paint",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Color Theory for Kids",
      subtitle: "Understanding colors!",
      bannerColor: "from-yellow-500 to-orange-500",
      sections: [
        {
          heading: "Primary and Secondary Colors",
          image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=400&fit=crop",
          body: "**Primary Colors** — These are the 3 main colors that can't be made by mixing:\n🔴 **Red**\n🔵 **Blue**\n🟡 **Yellow**\n\n**Secondary Colors** — Made by mixing two primary colors:\n🟠 **Orange** = Red + Yellow\n🟢 **Green** = Blue + Yellow\n🟣 **Purple** = Red + Blue\n\n**In MS Paint:**\n• Find these colors in the Color Palette\n• Use **Edit Colors** to create custom colors\n• Mix colors using the Custom Color picker!",
          funFact: "A rainbow has 7 colors: Red, Orange, Yellow, Green, Blue, Indigo, Violet — remember it as ROY G. BIV!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Red + Yellow = ___", answer: "orange" },
        { type: "fill-in-blank", question: "Blue + Yellow = ___", answer: "green" },
        { type: "true-false", question: "Purple is a primary color.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "In Paint, draw 3 large circles. Fill them with the primary colors (Red, Blue, Yellow). Then draw 3 more circles and fill with secondary colors you create using Edit Colors.", answer: "" },
      ]
    },
    {
      pageTitle: "Coloring Techniques",
      subtitle: "Fill, spray, and blend!",
      bannerColor: "from-green-500 to-cyan-500",
      sections: [
        {
          heading: "Advanced Coloring",
          image: "https://images.unsplash.com/photo-1560421683-6856ea585c78?w=800&h=400&fit=crop",
          body: "**Fill Tool (Paint Bucket):**\nThe fastest way to color large areas. Just click inside a closed shape!\n\n**Airbrush Effect:**\nUse the Brush tool with a spray pattern for a softer, gradient-like effect.\n\n**Color Picker (Eyedropper):**\n1. Click the **Color Picker** tool\n2. Click on any color in your drawing\n3. That color is now selected!\n4. Great for matching colors!\n\n**Tips for Beautiful Colors:**\n• Use light colors for backgrounds\n• Use dark colors for outlines\n• Don't use too many bright colors together\n• Try different shades of the same color for depth",
          warningNote: "The Fill tool only works inside **completely closed shapes**. If there is even a tiny gap in your shape's outline, the color will leak out and fill the whole canvas! Always zoom in to check for gaps before filling.",
          keyTerms: [
            { term: "Fill Tool", definition: "A tool shaped like a paint bucket that fills a closed area with the selected color." },
            { term: "Color Picker", definition: "A tool that copies any color from your drawing so you can use it again." },
            { term: "Airbrush", definition: "A spray paint effect that creates soft, gradient-like coloring." },
          ]
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ tool picks a color from your drawing.", answer: "color picker" },
        { type: "practice", question: "Draw a colorful garden scene. Use at least 8 different colors. Use the Fill tool for large areas and the Brush for small details. Save your artwork.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 1: SCRATCH JR ========================
const c1ScratchWork: TopicTextbook = {
  topicId: "c1-scratch-work",
  topicTitle: "Working on Scratch Jr",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "What is Scratch Jr?",
      subtitle: "Your first coding adventure!",
      bannerImage: c1ScratchJr,
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Welcome to Scratch Jr!",
          body: "**Scratch Jr** is a coding language made just for kids aged 5-7! With Scratch Jr, you can:\n\n🎮 Make characters **move** and **dance**\n🗣️ Make characters **talk** and **say things**\n🎨 **Draw** your own characters\n📖 Create **animated stories**\n🎵 Add **sounds** to your projects\n\nThe best part? You code by **dragging colorful blocks** — no typing needed!\n\n**Coding** means telling the computer what to do, step by step. It's like giving instructions to a robot!",
          image: c1ScratchJr,
          funFact: "Scratch Jr was created at MIT, one of the most famous universities in the world!"
        }
      ]
    },
    {
      pageTitle: "The Scratch Jr Screen",
      subtitle: "Know your workspace",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "Parts of Scratch Jr",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
          body: "When you open Scratch Jr, you see:\n\n🎬 **Stage** — The big area at the top where your characters perform. This is like a theater stage!\n\n🐱 **Sprites** — The characters in your project. The default sprite is a cat. You can add more!\n\n🧱 **Block Palette** — The colored blocks at the bottom. These are your coding instructions.\n\n📜 **Scripts Area** — Where you drag blocks to build your code.\n\n🎨 **Paint Editor** — Draw and customize your own characters!\n\n**Block Colors:**\n🟡 Yellow — Trigger blocks (start events)\n🔵 Blue — Motion blocks (make things move)\n🟣 Purple — Looks blocks (change appearance)\n🟢 Green — Sound blocks\n🟠 Orange — Control blocks (wait, repeat)\n🔴 Red — End blocks",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The characters in Scratch Jr are called ___.", answer: "sprites" },
        { type: "fill-in-blank", question: "The big area where characters perform is the ___.", answer: "stage" },
        { type: "true-false", question: "Blue blocks are for making things move.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open Scratch Jr. Find and identify all the parts: Stage, Sprites, Block Palette, and Scripts Area. Add a new sprite from the library.", answer: "" },
      ]
    },
    {
      pageTitle: "Making Sprites Move",
      subtitle: "Your first code!",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Motion Blocks",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
          body: "Let's make the cat walk!\n\n**Step 1:** Drag the **Green Flag** block (yellow) to the scripts area — this starts your program.\n\n**Step 2:** Connect a **Move Right** block (blue arrow pointing right)\n\n**Step 3:** Tap the Green Flag on the stage — the cat moves right!\n\n**More Motion Blocks:**\n➡️ **Move Right** — sprite moves right\n⬅️ **Move Left** — sprite moves left\n⬆️ **Move Up** — sprite moves up\n⬇️ **Move Down** — sprite moves down\n🔄 **Turn Right** — sprite rotates clockwise\n🔄 **Turn Left** — sprite rotates counter-clockwise\n↩️ **Go Home** — sprite goes back to starting position",
          tip: "You can change the number inside each block to control HOW FAR the sprite moves! Bigger number = moves more."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ flag starts the program in Scratch Jr.", answer: "green" },
        { type: "true-false", question: "You can change how far a sprite moves by changing the number in the block.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Make the cat walk to the right side of the screen, then walk back to the left. Try making it go up and down too!", answer: "" },
      ]
    },
    {
      pageTitle: "Adding Text and Speech",
      subtitle: "Make sprites talk!",
      bannerColor: "from-violet-500 to-purple-500",
      sections: [
        {
          heading: "Say and Think Blocks",
          image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&h=400&fit=crop",
          body: "You can make your sprite say things!\n\n💬 **Say Block** (Purple) — Shows a speech bubble with text above the sprite\n💭 **Think Block** — Shows a thought bubble\n\n**How to add text:**\n1. Drag a **Say** block to your script\n2. Tap the block to type what the sprite should say\n3. Connect it after a Green Flag block\n4. Run your program!\n\n**Make a Conversation:**\nYou can make two sprites talk to each other by using:\n- Say blocks on Sprite 1\n- Wait blocks between them\n- Say blocks on Sprite 2",
          comparison: {
            left: {
              title: "Say Block 💬",
              points: ["Shows a speech bubble", "Character is talking out loud", "Other characters can 'hear' it", "Use for dialogue & conversations"]
            },
            right: {
              title: "Think Block 💭",
              points: ["Shows a thought bubble", "Character is thinking silently", "Private thoughts only", "Use for inner feelings & ideas"]
            }
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block shows a speech bubble above the sprite.", answer: "say" },
        { type: "practice", question: "Create a short story with 2 sprites talking to each other. Use Say blocks and Wait blocks to make it look like a real conversation!", answer: "" },
      ]
    },
    {
      pageTitle: "Backgrounds and Characters",
      subtitle: "Customize your world!",
      bannerColor: "from-teal-500 to-green-500",
      sections: [
        {
          heading: "Changing Backgrounds",
          image: "https://images.unsplash.com/photo-1533628635777-112b2239b1c7?w=800&h=400&fit=crop",
          body: "**Adding a Background:**\n1. Tap the **background button** (landscape icon at top)\n2. Choose from the library (park, beach, city, space, etc.)\n3. Or draw your own background!\n\n**Adding New Characters:**\n1. Tap the **+** button (add sprite)\n2. Choose from the library (animals, people, things)\n3. Or draw your own character using the Paint Editor!\n\n**The Paint Editor lets you:**\n✏️ Draw with different colors\n🔄 Use stamps and stickers\n🧽 Erase parts\n📏 Add shapes\n🎨 Fill with color",
          illustration: [
            { emoji: "🏖️", label: "Beach" },
            { emoji: "🏙️", label: "City" },
            { emoji: "🌲", label: "Forest" },
            { emoji: "🚀", label: "Space" },
            { emoji: "🏔️", label: "Mountain" },
            { emoji: "🌊", label: "Ocean" },
          ]
        }
      ],
      exercises: [
        { type: "practice", question: "Create a scene with a beach background, add a crab sprite and a fish sprite. Make them move around and say 'Hello!' to each other.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "You're a Scratch Jr coder now!",
      bannerColor: "from-yellow-500 to-green-500",
      sections: [
        {
          heading: "What You Learned",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
          body: "🎉 Congratulations! You learned:\n\n✅ What Scratch Jr is and why it's fun\n✅ Parts of the Scratch Jr screen\n✅ How to make sprites move with Motion blocks\n✅ How to make sprites talk with Say blocks\n✅ How to add backgrounds and new characters\n\nYou're ready to create your own animated stories and games!",
          keyTerms: [
            { term: "Sprite", definition: "A character or object in your Scratch Jr project that you can program." },
            { term: "Script", definition: "A set of connected blocks that tells a sprite what to do." },
            { term: "Stage", definition: "The area where sprites perform and your project plays." },
            { term: "Block", definition: "A colorful puzzle piece that represents one instruction or action." },
          ]
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Sprites are the ___ in your Scratch Jr project.", answer: "characters" },
        { type: "true-false", question: "You can draw your own sprites in Scratch Jr.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create your own short animated story! Use at least 2 characters, a custom background, movement blocks, and speech bubbles. Make it at least 10 seconds long!", answer: "" },
      ]
    },
  ]
};

const c1ScratchComp: TopicTextbook = {
  topicId: "c1-scratch-comp",
  topicTitle: "Scratch Jr Components",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Understanding Components", subtitle: "The building blocks of Scratch Jr", bannerColor: "from-green-500 to-teal-500",
      sections: [{ heading: "Stage, Palette, and Scripts", body: "Let's learn more about each part:\n\n🎬 **Stage Area:**\n• Where your project comes to life\n• Has a grid to help position sprites\n• Can have different backgrounds\n• Full-screen mode available!\n\n🧱 **Block Palette:**\n• Organized by color categories\n• Drag blocks from here to Scripts Area\n• Each color = different type of action\n\n📜 **Scripts Area:**\n• Where you build your programs\n• Connect blocks like puzzle pieces\n• Each sprite has its own scripts\n• Green Flag starts all scripts", tip: "Tap on a block in the palette to see a quick preview of what it does!" }],
      exercises: [
        { type: "fill-in-blank", question: "Each sprite has its own ___.", answer: "scripts" },
        { type: "true-false", question: "All sprites share the same scripts.", answer: "False", options: ["True", "False"] },
      ]
    },
    { pageTitle: "Sprite List", subtitle: "Managing your characters", bannerColor: "from-teal-500 to-cyan-500",
      sections: [{ heading: "Working with Multiple Sprites", body: "**The Sprite List** shows all characters in your project.\n\n**How to manage sprites:**\n👆 **Tap a sprite** to select it and edit its scripts\n➕ **Plus button** to add a new sprite\n🗑️ **Long press** on a sprite to delete it\n📋 **Copy** a sprite by dragging it to the + button\n\n**Each sprite has:**\n• Its own **scripts** (programs)\n• Its own **costumes** (appearances)\n• Its own **position** on the stage\n\n**Tip:** When you add scripts, make sure you've selected the RIGHT sprite first!", funFact: "You can have up to 10 sprites in one Scratch Jr project!" }],
      exercises: [
        { type: "practice", question: "Create a project with 3 different animal sprites. Give each one a different movement pattern — one goes right, one goes up, one spins!", answer: "" },
      ]
    },
  ]
};

const c1ScratchText: TopicTextbook = {
  topicId: "c1-scratch-text",
  topicTitle: "Adding Text in Scratch Jr",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Text on Stage", subtitle: "Adding words to your projects", bannerColor: "from-emerald-500 to-green-500",
      sections: [{ heading: "Adding Text", body: "You can add text directly to the stage!\n\n**How to add text:**\n1. Tap the **Text** button (T icon)\n2. Tap on the stage where you want the text\n3. Type your message using the keyboard\n4. Choose a **color** for your text\n5. Tap ✓ to confirm\n\n**Uses for text:**\n📖 Story titles\n🏷️ Character names\n📢 Instructions for the player\n🎬 Scene descriptions\n\n**Tips:**\n• Keep text short — long text doesn't fit well\n• Use bright colors on dark backgrounds\n• Use dark colors on light backgrounds", tip: "Add a title page to every project — it looks more professional!" }],
      exercises: [
        { type: "practice", question: "Create a title screen for a story. Add your name, a title, and tap 'Start' text. Add a colorful background.", answer: "" },
      ]
    },
  ]
};

const c1ScratchChar: TopicTextbook = {
  topicId: "c1-scratch-char",
  topicTitle: "Characters & Backgrounds",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Creating Characters", subtitle: "Design your own sprites!", bannerColor: "from-green-500 to-lime-500",
      sections: [{ heading: "The Character Library", body: "Scratch Jr has a library of ready-made characters:\n\n🐱 **Animals** — cat, dog, fish, bird, butterfly\n👦 **People** — boy, girl, dancer\n🚗 **Things** — car, ball, star, sun\n🌳 **Nature** — tree, flower, cloud\n\n**Drawing Your Own:**\n1. Tap + (add sprite)\n2. Tap the **paintbrush** icon\n3. Use drawing tools to create!\n4. You can draw anything you imagine\n\n**Adding Backgrounds:**\n1. Tap the background icon (top)\n2. Choose from library OR draw your own\n3. Available scenes: park, beach, city, forest, space, underwater" }],
      exercises: [
        { type: "fill-in-blank", question: "You can ___ your own characters using the paintbrush.", answer: "draw" },
        { type: "practice", question: "Draw a custom character (your pet or a made-up creature). Place it in a background scene and make it move around the stage.", answer: "" },
      ]
    },
    { pageTitle: "Multiple Pages", subtitle: "Create multi-page stories!", bannerColor: "from-lime-500 to-yellow-500",
      sections: [{ heading: "Pages in Scratch Jr", body: "Scratch Jr supports **multiple pages** — like pages in a book!\n\n**How to add pages:**\n1. Look at the **page icons** at the right side\n2. Tap the **+** to add a new page\n3. Each page can have different sprites and backgrounds!\n\n**Switching pages in code:**\nUse the **Go to Page** block (red block with page number)\n\n**Example Story:**\n📖 Page 1: Title page with your story name\n📖 Page 2: Character walks to a door\n📖 Page 3: Character enters a magical forest\n📖 Page 4: The End!\n\nThis lets you create stories with different scenes, like chapters in a book!", tip: "Plan your story on paper first! Draw a storyboard with what happens on each page." }],
      exercises: [
        { type: "true-false", question: "Each page in Scratch Jr can have different backgrounds.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a 3-page story: Page 1 is the title, Page 2 is the main scene with character movement, Page 3 says 'The End!' with a fun animation.", answer: "" },
      ]
    },
  ]
};

const c1ScratchMove: TopicTextbook = {
  topicId: "c1-scratch-move",
  topicTitle: "Moving Sprites in Scratch Jr",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "All Motion Blocks", subtitle: "Every way to make sprites move!", bannerColor: "from-blue-500 to-indigo-500",
      sections: [{ heading: "Motion Block Reference", body: "Here's every motion block you can use:\n\n➡️ **Move Right** — moves sprite right (number = steps)\n⬅️ **Move Left** — moves sprite left\n⬆️ **Move Up** — moves sprite up\n⬇️ **Move Down** — moves sprite down\n🔃 **Turn Right** — rotates clockwise\n🔄 **Turn Left** — rotates counter-clockwise\n⤵️ **Hop** — sprite jumps up and comes back down\n↩️ **Go Home** — returns to starting position\n\n**Combining blocks:**\nConnect multiple blocks for complex movements!\nExample: Move Right → Move Up → Turn Right → Hop = sprite walks right, goes up, turns, and jumps!", youtubeId: "E19zGN8fA90" }],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block makes a sprite jump up and come back down.", answer: "hop" },
        { type: "practice", question: "Create a dance routine for the cat! Use at least 6 different motion blocks to make it move right, jump, spin, go up, and come back home.", answer: "" },
      ]
    },
    { pageTitle: "Repeat and Speed", subtitle: "Loops make life easier!", bannerColor: "from-indigo-500 to-purple-500",
      sections: [{ heading: "Using Repeat Blocks", body: "What if you want the cat to walk 10 steps? Instead of adding 10 Move Right blocks, use **Repeat**!\n\n🔁 **Repeat Block** (Orange):\n1. Drag the Repeat block to your script\n2. Put the blocks you want to repeat INSIDE it\n3. Set the number (how many times)\n4. Run!\n\n**Example:**\nRepeat 5: Move Right + Hop\n= sprite walks and hops 5 times!\n\n**Speed Block:**\n⏩ **Speed** — controls how fast the sprite moves\n• Slow, Medium, Fast\n• Use slow for dramatic moments\n• Use fast for action scenes!", tip: "The Repeat block is your best friend! It saves time and makes your code shorter and neater." }],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block makes code run multiple times.", answer: "repeat" },
        { type: "true-false", question: "Repeat blocks save time by running the same code many times.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Make a sprite walk across the entire stage using a Repeat block. Then make it walk back using another Repeat block. Add a hop at each end!", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 1: PAINT PARTS ========================
const c1PaintParts: TopicTextbook = {
  topicId: "c1-paint-parts",
  topicTitle: "Parts of MS Paint",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "The Paint Window",
      subtitle: "Know every part of MS Paint!",
      bannerImage: c1PaintTools,
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Parts of the Paint Window",
          body: "When you open MS Paint, you see many parts. Let's learn about each one!\n\n🎨 **Title Bar** — Shows the name of your file at the very top of the window.\n\n📋 **Menu Bar** — Has buttons like File, Home, and View. Each button opens different tools.\n\n🖌️ **Ribbon / Toolbar** — The big area with all your drawing tools. This is where you find pencils, brushes, shapes, and colors!\n\n🎨 **Drawing Area (Canvas)** — The big white space in the middle. This is your paper where you create drawings!\n\n📊 **Status Bar** — At the very bottom. Shows the position of your mouse and the size of your canvas.\n\n🔍 **Zoom Controls** — At the bottom-right. Use + and - to zoom in or out of your drawing.",
          image: c1PaintTools,
          tip: "The Ribbon is your best friend in Paint! It has everything you need to create amazing drawings."
        }
      ]
    },
    {
      pageTitle: "The Menu Bar",
      subtitle: "File, Home, and View",
      bannerColor: "from-amber-500 to-yellow-500",
      sections: [
        {
          heading: "Understanding the Menus",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
          body: "**File Menu:**\n📁 **New** — Start a new blank drawing\n📂 **Open** — Open a drawing you saved before\n💾 **Save** — Save your current drawing\n💾 **Save As** — Save with a new name\n🖨️ **Print** — Print your drawing on paper\n\n**Home Tab:**\n✂️ **Clipboard** — Cut, Copy, Paste tools\n🖼️ **Image** — Select, Crop, Resize, Rotate\n🔧 **Tools** — Pencil, Fill, Text, Eraser, Color Picker, Magnifier\n📐 **Shapes** — Lines, Rectangles, Circles, Stars, Arrows\n📏 **Size** — Thin, Medium, Thick lines\n🎨 **Colors** — Color 1, Color 2, Color Palette\n\n**View Tab:**\n🔍 **Zoom** — Zoom In, Zoom Out, 100%\n📏 **Rulers** — Show rulers on top and left\n📊 **Status Bar** — Show or hide the bottom bar",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To start a new blank drawing, go to File → ___.", answer: "new" },
        { type: "fill-in-blank", question: "The ___ tab has all the drawing tools like Pencil, Fill, and Shapes.", answer: "home" },
        { type: "true-false", question: "The View tab lets you zoom in and zoom out.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "The Tool Box",
      subtitle: "Every tool at your fingertips!",
      bannerColor: "from-yellow-500 to-green-500",
      sections: [
        {
          heading: "Drawing Tools Explained",
          image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop",
          body: "Let's learn about each drawing tool:\n\n✏️ **Pencil** — Draws thin freehand lines. Click and drag to draw!\n\n🖌️ **Brushes** — Draws thicker artistic strokes. You can choose different brush styles:\n• Regular brush\n• Calligraphy brush\n• Airbrush\n• Oil brush\n• Crayon\n• Marker\n\n🪣 **Fill with Color** — Fills a closed area with the selected color. Like pouring paint!\n\n🔤 **Text** — Type words on your drawing. You can choose font, size, and color.\n\n🧽 **Eraser** — Removes parts of your drawing. Click and drag to erase.\n\n🔍 **Magnifier** — Zooms in to see details closely.\n\n💧 **Color Picker** — Click on any color in your drawing to select that exact color.\n\n📐 **Shapes** — Ready-made shapes you can draw by clicking and dragging.",
          tip: "Try every tool one by one! The best way to learn Paint is by practicing with each tool."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ tool lets you type words on your drawing.", answer: "text" },
        { type: "fill-in-blank", question: "The ___ picks up a color from your drawing so you can use it.", answer: "color picker" },
        { type: "true-false", question: "Paint has different types of brushes like calligraphy and airbrush.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open Paint and try ALL the tools: draw with the Pencil, paint with 3 different Brushes, use the Fill tool, add some Text, and erase something with the Eraser. Save your practice sheet!", answer: "" },
      ]
    },
    {
      pageTitle: "The Color Palette",
      subtitle: "A rainbow of colors!",
      bannerColor: "from-pink-500 to-purple-500",
      sections: [
        {
          heading: "Working with Colors",
          image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&h=400&fit=crop",
          body: "The **Color Palette** is in the Home tab and shows all available colors.\n\n🎨 **Color 1** — Your main drawing color (used when you left-click)\n🎨 **Color 2** — Your background color (used when you right-click)\n\n**How to choose a color:**\n1. Click on **Color 1** box\n2. Click any color in the palette\n3. Now draw — your lines will be that color!\n\n**Edit Colors:**\n• Click **Edit Colors** button\n• A big color chart appears\n• Click anywhere to pick a custom color\n• You can even type exact color numbers!\n\n**Default colors include:**\n🔴 Red, 🟠 Orange, 🟡 Yellow, 🟢 Green\n🔵 Blue, 🟣 Purple, ⚫ Black, ⚪ White\n🟤 Brown, 🩷 Pink, and many more!\n\n**Tip:** Color 2 is used as the eraser background color and as the fill color when you right-click with the Fill tool.",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Color ___ is your main drawing color.", answer: "1" },
        { type: "true-false", question: "You can create custom colors using Edit Colors.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Draw a flower garden! Use at least 6 different colors from the palette. Try using Edit Colors to create a custom color for the sky.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 2: ADVANCED COMPUTER BASICS ========================
const c2AdvComputer: TopicTextbook = {
  topicId: "c2-it-adv",
  topicTitle: "Advanced Computer Basics",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Types of Computers",
      subtitle: "Computers come in all shapes and sizes!",
      bannerImage: c2ComputerTypes,
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Different Types of Computers",
          body: "Computers are not all the same! Here are the main types:\n\n🖥️ **Desktop Computer** — Sits on a desk. Has a separate monitor, keyboard, mouse, and CPU box. Very powerful!\n\n💻 **Laptop** — A portable computer that folds open. Screen, keyboard, and CPU are all in one! You can carry it anywhere.\n\n📱 **Tablet** — A flat, thin computer with a touchscreen. You tap and swipe with your fingers. Example: iPad.\n\n📱 **Smartphone** — A small computer that fits in your pocket! You can call, text, play games, and browse the internet.\n\n⌚ **Smartwatch** — A tiny computer you wear on your wrist! It shows time, counts steps, and can receive messages.\n\n🖥️ **Supercomputer** — The most powerful computer! Used by scientists for very hard calculations. Can fill an entire room!",
          image: c2ComputerTypes,
          funFact: "The world's fastest supercomputer can perform over 1 quintillion (1,000,000,000,000,000,000) calculations per second!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is a portable computer that folds open.", answer: "laptop" },
        { type: "fill-in-blank", question: "A ___ is a small computer you wear on your wrist.", answer: "smartwatch" },
        { type: "true-false", question: "A tablet has a touchscreen.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "Desktop computers are easy to carry around.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Input & Output Devices",
      subtitle: "Talking to the computer and getting answers!",
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "Input Devices — Giving Data to the Computer",
          image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=400&fit=crop",
          body: "**Input devices** send information TO the computer:\n\n⌨️ **Keyboard** — Type letters, numbers, and commands\n🖱️ **Mouse** — Point, click, and drag\n🎤 **Microphone** — Record your voice\n📷 **Camera / Webcam** — Take photos and videos\n📱 **Touchscreen** — Tap and swipe with your fingers\n🎮 **Joystick** — Play video games\n📠 **Scanner** — Turn paper pictures into computer pictures",
        },
        {
          heading: "Output Devices — Getting Information from the Computer",
          image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&h=400&fit=crop",
          body: "**Output devices** show information FROM the computer:\n\n🖥️ **Monitor** — Shows pictures, text, and videos\n🔊 **Speakers** — Play music and sounds\n🎧 **Headphones** — Listen privately\n🖨️ **Printer** — Print on paper\n📽️ **Projector** — Show on a big screen\n\n**Remember the simple rule:**\n📥 **Input = IN** to the computer\n📤 **Output = OUT** from the computer",
          tip: "Touchscreen is BOTH input AND output — it shows things (output) and accepts touch (input)!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ turns paper pictures into computer pictures.", answer: "scanner" },
        { type: "fill-in-blank", question: "A ___ is an output device that prints on paper.", answer: "printer" },
        { type: "true-false", question: "A keyboard is an input device.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "A monitor is an input device.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Starting & Shutting Down",
      subtitle: "Properly turning the computer on and off",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Booting Up & Shutting Down",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop",
          body: "**Starting the Computer (Booting):**\n1. Press the **Power button** on the CPU\n2. Press the **Power button** on the Monitor\n3. Wait for the **Desktop** to appear\n4. Now you can start using your computer!\n\n**Shutting Down Safely:**\n1. Close all open programs\n2. Click the **Start button** (bottom-left)\n3. Click the **Power** icon\n4. Select **Shut Down**\n5. Wait until the computer fully turns off\n\n**Other Options:**\n😴 **Sleep** — Computer rests but wakes up fast\n🔄 **Restart** — Turns off and back on (fixes problems!)\n🔒 **Lock** — Shows login screen but keeps programs open\n\n⚠️ **NEVER just press the power button to turn off!** This can damage your files and the computer.",
          tip: "Always save your work before shutting down! Press Ctrl+S in every program."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Starting a computer is also called ___.", answer: "booting" },
        { type: "true-false", question: "You should always shut down using the Start menu.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Practice the proper shutdown sequence. Ask your teacher to watch while you shut down and restart the computer correctly.", answer: "" },
      ]
    },
    {
      pageTitle: "Files and Folders",
      subtitle: "Keeping your computer organized!",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "Understanding Files and Folders",
          image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&h=400&fit=crop",
          body: "**Files** are like papers in your school bag. Each file has information inside.\n\n📄 **Types of Files:**\n• **Document files** — Letters, stories, homework (.docx, .txt)\n• **Image files** — Photos and drawings (.jpg, .png)\n• **Music files** — Songs (.mp3)\n• **Video files** — Movies and clips (.mp4)\n\n📁 **Folders** are like bags or boxes that hold your files.\n\n**How to Create a Folder:**\n1. Right-click on the Desktop\n2. Click **New** → **Folder**\n3. Type a name for your folder\n4. Press **Enter**\n\n**How to Move a File into a Folder:**\n1. Click and hold the file\n2. Drag it onto the folder\n3. Release the mouse button!\n\n**How to Delete:**\n• Select the file or folder\n• Press the **Delete** key\n• It goes to the **Recycle Bin** (you can get it back!)",
          funFact: "The Recycle Bin is like a trash can — you can take things out of it if you change your mind! Just open it and click 'Restore'."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Deleted files go to the ___.", answer: "recycle bin" },
        { type: "fill-in-blank", question: "To create a new folder, right-click and select New → ___.", answer: "folder" },
        { type: "true-false", question: "You can recover files from the Recycle Bin.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "On the Desktop, create 3 folders: 'My Drawings', 'My Homework', 'My Photos'. Open Paint, draw something, save it, then move the file into the 'My Drawings' folder.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 2: ADVANCED PAINT ========================
const c2PaintAdv: TopicTextbook = {
  topicId: "c2-paint-adv",
  topicTitle: "Advanced Paint Techniques",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Selection Tools",
      subtitle: "Select, move, and transform!",
      bannerImage: c1PaintTools,
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Using Selection Tools",
          body: "**Selection tools** let you pick a part of your drawing to move, copy, or change.\n\n🔲 **Rectangular Selection** — Draws a rectangle around the area you want to select\n✂️ **Free-form Selection** — Draw any shape around what you want to select\n\n**How to select:**\n1. Click the **Select** button\n2. Choose Rectangular or Free-form\n3. Click and drag around the area\n4. A dotted line appears around your selection!\n\n**What you can do with a selection:**\n✂️ **Cut** (Ctrl+X) — Remove and save to clipboard\n📋 **Copy** (Ctrl+C) — Copy without removing\n📌 **Paste** (Ctrl+V) — Put the copied part back\n🗑️ **Delete** — Remove the selected area\n↔️ **Move** — Click inside selection and drag to move it\n\n**Transparent vs Opaque:**\n• **Opaque** — selection has a white background\n• **Transparent** — selection has no background (shows what's behind it!)",
          image: c1PaintTools,
          tip: "Use Transparent selection when copying parts of one drawing onto another — it won't cover up the background!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Ctrl+C is the shortcut for ___.", answer: "copy" },
        { type: "fill-in-blank", question: "Ctrl+V is the shortcut for ___.", answer: "paste" },
        { type: "true-false", question: "Free-form selection lets you draw any shape around your selection.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Copy, Paste & Resize",
      subtitle: "Duplicate and transform your artwork!",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Copy, Paste, Resize, and Rotate",
          image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=400&fit=crop",
          body: "**Copy & Paste:**\n1. Select an area using the selection tool\n2. Press **Ctrl+C** to copy\n3. Press **Ctrl+V** to paste\n4. Move the pasted copy where you want it!\n\n**This is great for:**\n• Making patterns (copy one flower, paste many!)\n• Creating symmetrical designs\n• Duplicating characters in a scene\n\n**Resize / Stretch:**\n1. Select the area\n2. Go to **Home** → **Resize**\n3. Change **Percentage** or **Pixels**\n4. Check **Maintain aspect ratio** to keep proportions!\n\n**Rotate / Flip:**\n1. Select the area\n2. Go to **Home** → **Rotate**\n3. Options: Rotate 90° right/left, 180°, Flip horizontal/vertical\n\n**Undo:** Press **Ctrl+Z** to undo your last action (up to 3 times!)",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Press Ctrl+___ to undo your last action.", answer: "z" },
        { type: "true-false", question: "Maintain aspect ratio keeps the image proportions when resizing.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Draw one butterfly. Copy and paste it 4 times. Resize each copy to a different size. Arrange them in a pattern across the canvas.", answer: "" },
      ]
    },
    {
      pageTitle: "Text Tool & Saving",
      subtitle: "Add words and save your masterpiece!",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "Adding Text to Drawings",
          image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop",
          body: "**The Text Tool** lets you type words on your drawing:\n\n1. Click the **A** (Text) tool\n2. Click and drag to create a text box on the canvas\n3. Type your text!\n4. A Text toolbar appears with options:\n\n**Text Options:**\n🔤 **Font** — Choose the style (Arial, Comic Sans, etc.)\n📏 **Size** — How big the text is (12, 18, 24, 36...)\n**B** **Bold** — Makes text thick and heavy\n*I* **Italic** — Makes text slanted\nU **Underline** — Adds a line under the text\n🎨 **Color** — Change the text color\n\n**Two text modes:**\n• **Opaque** — text has a colored background\n• **Transparent** — text has no background (floats on the drawing)\n\n⚠️ Once you click outside the text box, the text becomes part of the drawing and CANNOT be edited!",
          tip: "Always check your spelling before clicking outside the text box — you can't change it after!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The text tool button looks like the letter ___.", answer: "a" },
        { type: "true-false", question: "You can edit text after clicking outside the text box.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a greeting card: Draw a birthday cake, add 'Happy Birthday!' in big colorful text at the top, and add a smaller message at the bottom. Use different fonts and colors. Save as PNG.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 2: MS WORD BASICS ========================
const c2WordIntro: TopicTextbook = {
  topicId: "c2-word-intro",
  topicTitle: "Introduction to MS Word",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "What is MS Word?",
      subtitle: "The world's most popular writing program!",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Meet Microsoft Word!",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
          body: "**MS Word** is a program for writing on the computer. You can use it to:\n\n📝 Write stories and letters\n📄 Make homework and projects\n🎨 Add pictures and colors to your writing\n🖨️ Print your documents on paper\n\n**How to Open MS Word:**\n1. Click the **Start button**\n2. Type **Word**\n3. Click on **Microsoft Word**\n4. Click **Blank document** to start!\n\n**The Word Window has these parts:**\n📋 **Title Bar** — Shows the document name\n🎀 **Ribbon** — Big toolbar with all features\n📄 **Document Area** — The white page where you type\n📊 **Status Bar** — Shows page number and word count\n📐 **Ruler** — Shows measurements at the top",
          youtubeId: "S-nHYzK-BVg",
          funFact: "Microsoft Word was first released in 1983 — that's over 40 years ago!"
        }
      ]
    },
    {
      pageTitle: "Typing Your First Document",
      subtitle: "Let's start writing!",
      bannerColor: "from-indigo-500 to-purple-500",
      sections: [
        {
          heading: "Basic Typing",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
          body: "**How to type in Word:**\n1. Click on the white page\n2. A blinking line appears — this is the **cursor**\n3. Start typing! The cursor moves as you type.\n\n**Important Keys:**\n⏎ **Enter** — Start a new paragraph (new line)\n⬜ **Space Bar** — Add space between words\n⬅️ **Backspace** — Delete the character BEFORE the cursor\n🗑️ **Delete** — Delete the character AFTER the cursor\n⬆️ **Shift** — Hold for capital letters or special characters\n🔠 **Caps Lock** — All capital letters\n↹ **Tab** — Indent (move text to the right)\n\n**Moving the Cursor:**\n⬆️⬇️⬅️➡️ Arrow keys move the cursor around\n🏠 **Home** — Go to the beginning of the line\n🔚 **End** — Go to the end of the line\n\n**Selecting Text:**\n1. Click at the start of the text\n2. Hold **Shift** and click at the end\n3. OR click and drag to highlight text",
          tip: "You can also double-click a word to select just that word, or triple-click to select the entire paragraph!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The blinking line where you type is called the ___.", answer: "cursor" },
        { type: "fill-in-blank", question: "Press ___ to start a new paragraph.", answer: "enter" },
        { type: "true-false", question: "The Backspace key deletes the character before the cursor.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open MS Word. Type a short paragraph about your favorite holiday. Use Enter to make 3 paragraphs. Practice selecting text by clicking and dragging.", answer: "" },
      ]
    },
    {
      pageTitle: "Formatting Text",
      subtitle: "Make your writing look beautiful!",
      bannerColor: "from-purple-500 to-pink-500",
      sections: [
        {
          heading: "Basic Text Formatting",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
          body: "**Formatting** means changing how your text looks.\n\n**Select your text first**, then apply formatting:\n\n**B** **Bold** (Ctrl+B) — Makes text **thick and heavy**\n*I* **Italic** (Ctrl+I) — Makes text *slanted*\nU **Underline** (Ctrl+U) — Adds a line under text\n\n**Font (Style):**\n• Click the font dropdown box\n• Choose a style: Arial, Comic Sans MS, Times New Roman, etc.\n• Each font looks different!\n\n**Font Size:**\n• Click the size dropdown (usually shows 11)\n• Choose a bigger number for bigger text\n• Headings: 18-28, Body text: 11-14\n\n**Font Color:**\n• Click the **A** with a colored bar under it\n• Choose any color for your text!\n\n**Alignment:**\n⬅️ **Left align** — text starts from the left\n🔳 **Center** — text is in the middle\n➡️ **Right align** — text is on the right side",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The shortcut for Bold is Ctrl+___.", answer: "b" },
        { type: "fill-in-blank", question: "The shortcut for Italic is Ctrl+___.", answer: "i" },
        { type: "true-false", question: "You need to select text before formatting it.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Type your name in big bold letters (size 28). Below it, type your school name in italic. Add a paragraph about yourself in normal text (size 12). Use a different color for each line.", answer: "" },
      ]
    },
    {
      pageTitle: "Saving Your Document",
      subtitle: "Keep your work safe!",
      bannerColor: "from-green-500 to-teal-500",
      sections: [
        {
          heading: "How to Save",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
          body: "**Saving for the first time:**\n1. Click **File** → **Save As**\n2. Choose **This PC** → **Desktop** (or any location)\n3. Type a name for your file\n4. Click **Save**!\n\n**Quick Save:** Press **Ctrl+S** (saves instantly!)\n\n**File Types:**\n📄 **.docx** — Word document (default, best choice)\n📄 **.pdf** — Cannot be edited, looks the same on every computer\n📄 **.txt** — Plain text, no formatting\n\n**Opening a Saved File:**\n1. Click **File** → **Open**\n2. Browse to find your file\n3. Double-click to open it!\n\nOR simply double-click any Word file on the Desktop!\n\n⚠️ **Save often!** Press Ctrl+S every few minutes so you don't lose your work if something goes wrong.",
          tip: "Develop the habit of pressing Ctrl+S after every paragraph you write. It takes just a second and saves you from losing your work!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyboard shortcut to save is Ctrl+___.", answer: "s" },
        { type: "fill-in-blank", question: "The default Word file format is ___.", answer: "docx" },
        { type: "true-false", question: "A PDF file can be easily edited.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Write a short letter to your best friend. Include a greeting, body, and sign-off. Format it with bold headings, change the font, and save it as 'My Letter' on the Desktop.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 2: SCRATCH JR ADVANCED ========================
const c2ScratchJrAdv: TopicTextbook = {
  topicId: "c2-scj-adv",
  topicTitle: "Advanced Scratch Jr",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Repeat Blocks & Speed",
      subtitle: "Make things happen again and again!",
      bannerImage: c1ScratchJr,
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "The Power of Repeat!",
          body: "**Repeat blocks** make your code run again and again:\n\n🔁 **Repeat Block** (Orange loop) — Runs the blocks inside it multiple times\n♾️ **Repeat Forever** — Runs the blocks inside it forever and ever!\n\n**How to use Repeat:**\n1. Find the **Repeat** block (looks like a loop)\n2. Drag it into your script\n3. Put other blocks INSIDE it\n4. Set how many times to repeat\n\n**Example — Walking sprite:**\nWithout repeat: Move → Move → Move → Move (boring!)\nWith repeat: Repeat 4: Move (much easier!)\n\n**Speed Control:**\n⏩ You can add numbers to motion blocks to control distance\n• Move Right (1) — short step\n• Move Right (5) — big step\n\n**Repeat Forever** is great for:\n• Making a sprite walk continuously\n• Creating blinking animations\n• Background animations",
          image: c1ScratchJr,
          tip: "Use 'Repeat Forever' for animations that should never stop, like a fish swimming or clouds moving!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block makes code run again and again.", answer: "repeat" },
        { type: "true-false", question: "Repeat Forever runs blocks endlessly.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Make a sprite walk back and forth across the screen forever using Repeat Forever, Move Right, and Move Left blocks.", answer: "" },
      ]
    },
    {
      pageTitle: "Sound Blocks",
      subtitle: "Make your projects come alive with sound!",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "Adding Sound",
          image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&h=400&fit=crop",
          body: "**Sound blocks** let your sprites make noise!\n\n🔊 **Pop Sound** — A quick pop sound effect\n🎵 **Record Sound** — Record your own voice or sounds!\n\n**How to add sounds:**\n1. Tap a sprite to select it\n2. Find the **Sound blocks** (green blocks)\n3. Drag a sound block into your script\n4. Place it where you want the sound to play\n\n**Recording Custom Sounds:**\n1. Tap the **microphone** icon\n2. Press the **record** button\n3. Say something or make a sound\n4. Press **stop**\n5. Your recording appears as a new sound block!\n\n**Cool ideas:**\n🐱 Make the cat say \"Meow!\" (record yourself!)\n🎵 Add background music to your story\n💥 Add sound effects when sprites touch\n🗣️ Make characters speak with recorded dialogue",
          funFact: "You can record your own voice and make your sprite 'talk' — it's like making a cartoon!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "You can ___ your own voice to use as a sound in Scratch Jr.", answer: "record" },
        { type: "practice", question: "Create a project with 2 characters having a conversation. Record your voice for each character's lines. Add sound effects between dialogues.", answer: "" },
      ]
    },
    {
      pageTitle: "Multi-Page Stories",
      subtitle: "Create stories with many scenes!",
      bannerColor: "from-blue-500 to-purple-500",
      sections: [
        {
          heading: "Building Multi-Page Projects",
          body: "**Multiple pages** let you create stories with different scenes!\n\n**Adding Pages:**\n1. Look at the page icons on the right side\n2. Tap the **+** button to add a new page\n3. Each page can have:\n   • Different sprites\n   • Different backgrounds\n   • Different scripts!\n\n**Switching Between Pages:**\n📄 Use the **End block → Go to Page** (red block with number)\n📄 This makes your story automatically go to the next scene!\n\n**Story Structure:**\n📖 **Page 1:** Title page — show the story name\n📖 **Page 2:** Introduction — introduce the characters\n📖 **Page 3-4:** Main story — the adventure happens!\n📖 **Page 5:** Ending — \"The End!\" with celebration\n\n**Tips for Great Stories:**\n• Plan your story on paper first\n• Use backgrounds that match each scene\n• Add sounds and dialogue\n• Use wait blocks for timing",
          tip: "Think of each page as a scene in a movie. Each scene should have a different setting and something new happening!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block is used to switch to another page.", answer: "go to page" },
        { type: "true-false", question: "Each page can have different sprites and backgrounds.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Sharing Your Projects",
      subtitle: "Show the world what you've created!",
      bannerColor: "from-purple-500 to-pink-500",
      sections: [
        {
          heading: "Saving & Sharing",
          body: "**Saving Projects:**\n• Scratch Jr automatically saves your projects!\n• You can find all your projects on the Home screen\n• Each project shows a thumbnail preview\n\n**Sharing with Others:**\n📧 **Email** — Send your project by email to friends or family\n📱 **AirDrop** — Share with nearby iPads (iOS only)\n💾 **Save to Files** — Save to your device's files\n\n**Presenting Your Project:**\n🎬 **Full Screen Mode:**\n1. Open your project\n2. Tap the **full screen** button\n3. Your project runs without the editor visible!\n4. Great for presenting to the class\n\n**Tips for Great Presentations:**\n• Test your project first to make sure everything works\n• Add a title page with your name\n• Explain to your audience what happens in the story\n• Show them the code too — they'll be impressed!\n\n🌟 **Challenge:** Create a project every week and share it with your class!",
        }
      ],
      exercises: [
        { type: "true-false", question: "Scratch Jr automatically saves your projects.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a 4-page animated story with: a title page, two action scenes with sounds and movement, and an ending page. Present it to your classmates!", answer: "" },
      ]
    },
  ]
};

// Export all Class 1-2 content
export const CLASS_1_2_TEXTBOOKS: TopicTextbook[] = [
  c1ComputerIntro,
  c1PaintStart,
  c1PaintParts,
  c1PaintShapes,
  c1PaintColor,
  c1ScratchWork,
  c1ScratchComp,
  c1ScratchText,
  c1ScratchChar,
  c1ScratchMove,
  c2AdvComputer,
  c2PaintAdv,
  c2WordIntro,
  c2ScratchJrAdv,
];
