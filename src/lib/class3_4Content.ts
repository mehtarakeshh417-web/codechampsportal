// Curriculum content for Classes 3-4
import c3InputOutput from "@/assets/curriculum/c3-input-output.jpg";
import c3Windows from "@/assets/curriculum/c3-windows.jpg";
import c1PaintTools from "@/assets/curriculum/c1-paint-tools.jpg";

import type { TopicTextbook } from "./class5Content";

// ======================== CLASS 3: IPO ========================
const c3Ipo: TopicTextbook = {
  topicId: "c3-ipo-main",
  topicTitle: "Understanding Input – Process – Output",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "What is IPO?",
      subtitle: "The fundamental cycle of computing!",
      bannerImage: c3InputOutput,
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Input → Process → Output",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
          body: "Every computer follows a simple cycle called **IPO**:\n\n📥 **Input** — Data that goes INTO the computer (what you give it)\n⚙️ **Process** — The computer WORKS on the data (thinking)\n📤 **Output** — The RESULT that comes out (what you get back)\n\n**Example:**\nInput: You type '2 + 3' on a calculator\nProcess: The calculator adds the numbers\nOutput: The screen shows '5'\n\n**Another Example:**\nInput: You press keys on the keyboard\nProcess: The computer converts keystrokes to letters\nOutput: Letters appear on the monitor",
          youtubeId: "MDlRH8JmTII",
          funFact: "Even your brain works on the IPO model! Your eyes INPUT information, your brain PROCESSES it, and your body OUTPUTS a response!"
        }
      ]
    },
    {
      pageTitle: "Input Devices",
      subtitle: "How we give data to the computer",
      bannerImage: c3InputOutput,
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "Types of Input Devices",
          body: "**Input devices** send data INTO the computer:\n\n⌨️ **Keyboard** — type letters, numbers, commands\n🖱️ **Mouse** — point, click, drag\n🎤 **Microphone** — record voice and sounds\n📷 **Camera/Webcam** — capture photos and video\n📱 **Touchscreen** — tap and swipe with fingers\n🖊️ **Stylus/Pen** — draw on a tablet\n📠 **Scanner** — convert paper documents to digital\n🎮 **Joystick/Gamepad** — play games\n👆 **Trackpad** — like a mouse on a laptop\n🔍 **Barcode Scanner** — reads barcodes in shops\n\n**Remember:** If it sends data TO the computer, it's an INPUT device!",
          image: c3InputOutput,
          tip: "A touchscreen is both an input AND output device — it shows information (output) and accepts touch (input)!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ captures photos and videos for the computer.", answer: "camera" },
        { type: "fill-in-blank", question: "A ___ converts paper documents into digital format.", answer: "scanner" },
        { type: "true-false", question: "A keyboard is an input device.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "A printer is an input device.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Processing",
      subtitle: "The computer's brain at work",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "What is Processing?",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
          body: "**Processing** is when the computer works on the input data.\n\nThe **CPU (Central Processing Unit)** does all the processing. It's called the **brain** of the computer.\n\n**What the CPU does:**\n🧮 Performs calculations (math)\n📊 Sorts and organizes data\n🔍 Searches for information\n🎨 Creates graphics for the screen\n🎵 Processes audio for speakers\n\n**Speed of Processing:**\nModern CPUs can do **billions** of calculations per second!\nThis is measured in **GHz (Gigahertz)**\n• 1 GHz = 1 billion operations per second\n• 3 GHz = 3 billion operations per second!",
          funFact: "The CPU in your computer is smaller than a postage stamp, but it contains billions of tiny switches called transistors!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "CPU stands for Central ___ Unit.", answer: "processing" },
        { type: "true-false", question: "The CPU is called the brain of the computer.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Output Devices",
      subtitle: "How the computer shows results",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Types of Output Devices",
          image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&h=400&fit=crop",
          body: "**Output devices** show or give the RESULTS from the computer:\n\n🖥️ **Monitor** — displays text, images, videos on screen\n🖨️ **Printer** — prints documents on paper\n🔊 **Speakers** — play sounds and music\n🎧 **Headphones** — play sound privately\n📽️ **Projector** — displays on a big screen/wall\n💡 **LED indicators** — show status lights\n\n**Types of Output:**\n• **Visual** — things you SEE (monitor, projector)\n• **Audio** — things you HEAR (speakers, headphones)\n• **Physical** — things you TOUCH (printed paper, 3D printed objects)\n\n**Remember:** If it gives information FROM the computer, it's an OUTPUT device!",
          tip: "Headphones and speakers do the same job — play sound. The difference is speakers share with everyone, headphones are private!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ prints documents on paper.", answer: "printer" },
        { type: "fill-in-blank", question: "A ___ displays images on a large wall or screen.", answer: "projector" },
        { type: "true-false", question: "A monitor is an output device.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "IPO in Daily Life",
      subtitle: "IPO is everywhere!",
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Real-Life IPO Examples",
          image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop",
          body: "IPO isn't just for computers — it's everywhere!\n\n🍳 **Cooking:**\nInput: Raw ingredients\nProcess: Cooking on the stove\nOutput: Delicious meal!\n\n🚦 **Traffic Light:**\nInput: Timer and sensors detect cars\nProcess: Controller decides which light\nOutput: Red, Yellow, or Green light\n\n📱 **Making a Phone Call:**\nInput: Dial a number, speak into microphone\nProcess: Phone converts voice to signals\nOutput: Person on other end hears you\n\n🏧 **ATM Machine:**\nInput: Insert card, enter PIN, choose amount\nProcess: Bank checks your balance\nOutput: Cash comes out!\n\n📺 **Watching TV:**\nInput: Press buttons on remote\nProcess: TV decodes the signal\nOutput: Picture and sound appear",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "In an ATM, inserting your card is the ___ step.", answer: "input" },
        { type: "true-false", question: "A washing machine uses the IPO cycle.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Think of 3 more real-life examples of IPO. For each, write what the Input, Process, and Output are. Draw a diagram for each example.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "Test your IPO knowledge!",
      bannerColor: "from-amber-500 to-red-500",
      sections: [
        { heading: "Summary", body: "✅ **IPO** stands for Input → Process → Output\n✅ **Input devices** send data TO the computer\n✅ **CPU** processes the data (the brain)\n✅ **Output devices** show results FROM the computer\n✅ IPO is everywhere — cooking, ATMs, phones, TVs!" }
      ],
      exercises: [
        { type: "fill-in-blank", question: "IPO stands for Input, Process, and ___.", answer: "output" },
        { type: "fill-in-blank", question: "The ___ is called the brain of the computer.", answer: "cpu" },
        { type: "true-false", question: "A microphone is an output device.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "A speaker is an output device.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a poster showing the IPO cycle. Draw at least 3 input devices on the left, the CPU in the middle, and 3 output devices on the right. Connect them with arrows.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 3: WINDOWS ========================
const c3Windows_: TopicTextbook = {
  topicId: "c3-os-win",
  topicTitle: "Windows Operating System Basics",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "What is an Operating System?",
      subtitle: "The software that runs everything!",
      bannerImage: c3Windows,
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Understanding the OS",
          body: "An **Operating System (OS)** is the main software that manages your computer. Without it, your computer is just a box of parts!\n\n**What does the OS do?**\n🖥️ Shows the desktop and windows\n📁 Manages files and folders\n🖨️ Connects printers and devices\n🎮 Runs your programs and games\n🛡️ Keeps your computer safe\n\n**Popular Operating Systems:**\n🪟 **Windows** — by Microsoft (most common on PCs)\n🍎 **macOS** — by Apple (on Mac computers)\n🐧 **Linux** — free and open source\n📱 **Android** — by Google (on phones)\n📱 **iOS** — by Apple (on iPhones)",
          image: c3Windows,
          funFact: "Windows was first released in 1985! The latest version is Windows 11, released in 2021."
        }
      ]
    },
    {
      pageTitle: "The Windows Desktop",
      subtitle: "Your computer's home screen",
      bannerImage: c3Windows,
      bannerColor: "from-indigo-500 to-purple-500",
      sections: [
        {
          heading: "Parts of the Desktop",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
          body: "When Windows starts, you see the **Desktop**:\n\n🖼️ **Desktop Icons** — Small pictures that open programs or files\n📋 **Taskbar** — The bar at the bottom of the screen\n🪟 **Start Button** — Bottom-left corner, opens the Start Menu\n🔍 **Search Bar** — Type to find anything on your computer\n📌 **Pinned Apps** — Your favorite apps on the taskbar\n🔔 **System Tray** — Bottom-right, shows time, battery, WiFi, volume\n\n**Common Desktop Icons:**\n🗑️ **Recycle Bin** — Deleted files go here\n💻 **This PC** — Access all your drives and folders\n📁 **File Explorer** — Browse all your files\n🌐 **Browser** — Opens the internet",
          tip: "You can customize your desktop! Right-click on it to change the wallpaper, add icons, or organize them."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The bar at the bottom of the screen is called the ___.", answer: "taskbar" },
        { type: "fill-in-blank", question: "Deleted files go to the ___.", answer: "recycle bin" },
        { type: "true-false", question: "The Start button is in the bottom-left corner.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Files and Folders",
      subtitle: "Organizing your digital stuff",
      bannerColor: "from-green-500 to-teal-500",
      sections: [
        {
          heading: "Understanding Files and Folders",
          image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&h=400&fit=crop",
          body: "**Files** are individual items — like documents, photos, music, or videos.\n\n**Folders** are containers that hold files — like a real folder that holds papers!\n\n**File Explorer** is the tool to browse, create, and manage files and folders.\n\n**Creating a New Folder:**\n1. Open File Explorer\n2. Navigate to where you want the folder\n3. Right-click → **New** → **Folder**\n4. Type a name → Press Enter\n\n**Organizing Files:**\n📁 School → 📁 Maths, 📁 Science, 📁 English\n📁 Pictures → 📁 Vacation, 📁 Family, 📁 Art\n📁 Games → 📁 Scratch, 📁 Projects\n\n**Important Operations:**\n📋 **Copy** (Ctrl+C) — makes a duplicate\n✂️ **Cut** (Ctrl+X) — moves the original\n📌 **Paste** (Ctrl+V) — places the copy/cut item\n🗑️ **Delete** — sends to Recycle Bin\n✏️ **Rename** — F2 key or right-click → Rename",
          tip: "Create separate folders for each subject! It makes finding homework much easier."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To copy a file, press Ctrl+___.", answer: "c" },
        { type: "fill-in-blank", question: "To paste a file, press Ctrl+___.", answer: "v" },
        { type: "true-false", question: "Folders can contain other folders inside them.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a folder structure on the Desktop: Main folder 'My School', with sub-folders for 'Maths', 'Science', 'Computer', and 'Art'. Create a text file in each folder with your name.", answer: "" },
      ]
    },
    {
      pageTitle: "Start Menu & Programs",
      subtitle: "Finding and opening applications",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Using the Start Menu",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop",
          body: "The **Start Menu** is your gateway to everything on the computer!\n\n**How to open the Start Menu:**\n• Click the **Windows icon** (bottom-left)\n• Or press the **Windows key** on your keyboard\n\n**What's in the Start Menu:**\n📌 **Pinned Apps** — your most used apps\n🔍 **Search** — type to find anything\n📋 **All Apps** — alphabetical list of all programs\n⚙️ **Settings** — change computer settings\n📁 **Documents** — quick access to your files\n🔌 **Power** — Sleep, Shut Down, Restart\n\n**Opening a Program:**\n1. Click Start\n2. Find the program (scroll or search)\n3. Click on it!\n4. It opens in a **window**",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Press the ___ key on the keyboard to open the Start Menu.", answer: "windows" },
        { type: "practice", question: "Open 3 different programs from the Start Menu: Paint, Calculator, and Notepad. Arrange their windows side by side on the screen.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "Windows expert check!",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        { heading: "Summary", body: "✅ An **OS** manages your entire computer\n✅ **Windows** is the most common OS for PCs\n✅ The **Desktop** has icons, taskbar, and Start button\n✅ **Files** are individual items, **Folders** hold files\n✅ **File Explorer** lets you browse and organize\n✅ **Start Menu** helps you find and open programs\n✅ Learn shortcuts: Ctrl+C, Ctrl+V, Ctrl+X, F2" }
      ],
      exercises: [
        { type: "fill-in-blank", question: "OS stands for ___ System.", answer: "operating" },
        { type: "true-false", question: "Windows was made by Apple.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "The Recycle Bin stores deleted files.", answer: "True", options: ["True", "False"] },
      ]
    },
  ]
};

// ======================== CLASS 3: PAINT ADVANCED ========================
const c3PaintMore: TopicTextbook = {
  topicId: "c3-paint-more",
  topicTitle: "Advanced Paint Features",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Advanced Drawing Tools",
      subtitle: "Beyond basic shapes!",
      bannerImage: c1PaintTools,
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Brush Styles & Airbrush",
          image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop",
          body: "Paint has several **brush styles**:\n\n🖌️ **Round Brush** — smooth, round strokes\n🖌️ **Calligraphy Brush** — thick/thin strokes like fancy writing\n🖌️ **Oil Brush** — textured, artistic strokes\n🖌️ **Crayon** — looks like crayon on paper\n🖌️ **Marker** — smooth, semi-transparent\n🖌️ **Natural Pencil** — like a real pencil\n\n**To change brush style:**\n1. Click the **Brushes** dropdown in the toolbar\n2. Select the style you want\n3. Choose the **size** (thickness)\n4. Start painting!\n\n**Airbrush effect:** Use the spray can tool for a soft, spray-paint look. Great for clouds, fog, and backgrounds!",
          youtubeId: "Q5mH88NAOA0"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ brush creates strokes like fancy handwriting.", answer: "calligraphy" },
        { type: "practice", question: "Create a nature scene using 4 different brush styles. Use Oil Brush for the sky, Natural Pencil for trees, Crayon for grass, and Marker for a sun.", answer: "" },
      ]
    },
    {
      pageTitle: "Selection and Editing",
      subtitle: "Move, copy, and transform!",
      bannerColor: "from-teal-500 to-green-500",
      sections: [
        {
          heading: "Selection Tools",
          image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=400&fit=crop",
          body: "**Selection tools** let you select parts of your drawing to move, copy, or edit them.\n\n🔲 **Rectangle Select** — draws a rectangle around what you want to select\n✏️ **Free-form Select** — draw any shape around what you want\n\n**After selecting:**\n• **Move** — click and drag the selection\n• **Copy** — Ctrl+C then Ctrl+V\n• **Resize** — drag the corner handles\n• **Rotate** — use Rotate buttons in the toolbar\n• **Flip** — flip horizontal or vertical\n• **Delete** — press Delete key\n\n**Transparent vs Opaque:**\n• **Opaque** — moves everything including white background\n• **Transparent** — moves only the colored parts, ignores white\n\nThis is useful for placing a drawing on top of another!",
          tip: "Use Transparent selection when you want to place a character on a background without the white box around it!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Ctrl+C copies and Ctrl+V ___.", answer: "pastes" },
        { type: "true-false", question: "Transparent selection ignores white backgrounds.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Draw a small flower. Use the Selection tool to copy it 5 times and arrange the copies to make a garden. Use Transparent selection so there's no white box.", answer: "" },
      ]
    },
    {
      pageTitle: "Text and Special Effects",
      subtitle: "Add words and create art!",
      bannerColor: "from-purple-500 to-violet-500",
      sections: [
        {
          heading: "Adding Text in Paint",
          image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop",
          body: "**How to add text:**\n1. Click the **A** (Text) tool\n2. Click and drag on the canvas to create a text box\n3. A text toolbar appears with options:\n   • Font name (Arial, Comic Sans, etc.)\n   • Font size\n   • Bold, Italic, Underline\n4. Type your text\n5. Click outside the text box when done\n\n⚠️ **Important:** Once you click outside the text box, you CANNOT edit the text anymore! It becomes part of the image.\n\n**Text Tips:**\n• Use transparent background for text over images\n• Choose opaque background for text with a colored box behind it\n• Large fonts work best for titles\n• Small fonts for details",
        }
      ],
      exercises: [
        { type: "true-false", question: "Once you click outside a text box in Paint, you can still edit the text.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a poster for a school event. Use the Text tool for the title, date, and venue. Add decorative shapes and colors around the text.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 3: WORD ========================
const c3WordAdv: TopicTextbook = {
  topicId: "c3-word-adv",
  topicTitle: "Word Processing Skills",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Font Formatting",
      subtitle: "Making text look great!",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Changing How Text Looks",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
          body: "MS Word lets you change how your text looks:\n\n**Font Name:**\nThe style of letters (Arial, Comic Sans, Times New Roman, etc.)\n\n**Font Size:**\nHow big or small the text is (8pt to 72pt)\n\n**Font Color:**\nChange the color of your text to any color!\n\n**Text Effects:**\n• **Bold** (Ctrl+B) — makes text **darker and thicker**\n• **Italic** (Ctrl+I) — makes text *slanted*\n• **Underline** (Ctrl+U) — adds a line under text\n• **Highlight** — marks text with a colored background\n\n**How to apply:**\n1. Select the text you want to change\n2. Use the Font group in the Home tab\n3. Choose your formatting!",
          youtubeId: "hVs3w3Xb4Lg",
          tip: "Select text first, THEN apply formatting. A common mistake is forgetting to select!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Ctrl+B makes text ___.", answer: "bold" },
        { type: "fill-in-blank", question: "Ctrl+I makes text ___.", answer: "italic" },
        { type: "true-false", question: "You must select text before applying formatting.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Paragraph Formatting",
      subtitle: "Alignment, bullets, and spacing",
      bannerColor: "from-indigo-500 to-purple-500",
      sections: [
        {
          heading: "Aligning Text",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
          body: "**Alignment** controls where text sits on the page:\n\n⬅️ **Left Align** (Ctrl+L) — default, text lines up on the left\n🔄 **Center** (Ctrl+E) — text is centered\n➡️ **Right Align** (Ctrl+R) — text lines up on the right\n📐 **Justify** (Ctrl+J) — text stretches to fill both edges\n\n**Bullets & Numbering:**\nMake organized lists easily!\n• Click **Bullets** button for dot lists\n• Click **Numbering** for numbered lists\n• Choose from different bullet styles\n\n**Line Spacing:**\n• 1.0 = single space\n• 1.5 = one-and-a-half space\n• 2.0 = double space",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Ctrl+E ___ the text.", answer: "centers" },
        { type: "practice", question: "Type a short essay about 'My Hobby'. Center the title, left-align the body, use a bullet list for 5 reasons you like it, and set line spacing to 1.5.", answer: "" },
      ]
    },
    {
      pageTitle: "Inserting Images",
      subtitle: "Pictures make documents better!",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Adding Images to Word",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
          body: "**How to insert a picture:**\n1. Place your cursor where you want the image\n2. Go to **Insert** tab\n3. Click **Pictures**\n4. Choose **This Device** (from your computer) or **Online Pictures**\n5. Select the image → Click **Insert**\n\n**Resizing Images:**\n• Click the image to select it\n• Drag the **corner handles** to resize\n• Hold **Shift** while dragging to keep proportions\n\n**Text Wrapping:**\nControls how text flows around the image:\n• **In Line with Text** — image sits like a big letter\n• **Square** — text wraps around in a square\n• **Tight** — text wraps closely around\n• **Behind Text** — image goes behind\n• **In Front of Text** — image covers text",
          tip: "Always use corner handles to resize — side handles will stretch and distort your image!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To insert a picture, go to the ___ tab.", answer: "insert" },
        { type: "true-false", question: "Text wrapping controls how text flows around an image.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a document about your favorite animal. Type a paragraph about it, insert a picture, set text wrapping to 'Square', and add a decorative page border.", answer: "" },
      ]
    },
    {
      pageTitle: "Page Borders & Printing",
      subtitle: "Finishing touches!",
      bannerColor: "from-amber-500 to-orange-500",
      sections: [
        {
          heading: "Adding Page Borders",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
          body: "**Page borders** make your document look beautiful!\n\n**How to add:**\n1. Go to **Design** tab (or Page Layout in older versions)\n2. Click **Page Borders**\n3. Choose a border style, color, and width\n4. Or choose **Art borders** for decorative designs!\n\n**Printing Your Document:**\n1. Press **Ctrl+P** (or File → Print)\n2. Choose your printer\n3. Set number of copies\n4. Choose pages to print (All, Current Page, or specific pages)\n5. Click **Print**!\n\n**Print Preview:**\nAlways check Print Preview before printing! It shows exactly how your document will look on paper.",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The shortcut to print is Ctrl+___.", answer: "p" },
        { type: "practice", question: "Create a birthday invitation: use a decorative font for the title, add an Art page border, include the date/time/venue, and insert a clipart image. Set it up for printing.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 3: SCRATCH STARTING ========================
const c3ScratchStart: TopicTextbook = {
  topicId: "c3-scr-start",
  topicTitle: "Starting with Scratch",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "What is Scratch?",
      subtitle: "Block coding for bigger projects!",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Welcome to Scratch!",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
          body: "**Scratch** is a visual programming language where you code by snapping colorful blocks together!\n\n**Scratch vs Scratch Jr:**\n• Scratch Jr is for ages 5-7 with simple blocks\n• **Scratch** is for ages 8+ with MORE blocks and features\n• Scratch runs in a web browser at scratch.mit.edu\n• Scratch can make real games, animations, and stories!\n\n**What can you make in Scratch?**\n🎮 Video games\n📖 Interactive stories\n🎵 Music and art projects\n📊 Quizzes and educational tools\n🤖 Simulations\n💬 Chatbots",
          youtubeId: "E19zGN8fA90",
          funFact: "Over 100 million projects have been shared on the Scratch website! Kids from every country use Scratch."
        }
      ]
    },
    {
      pageTitle: "The Scratch Editor",
      subtitle: "Know your workspace",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "Parts of the Scratch Editor",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
          body: "**The Scratch editor has these parts:**\n\n🎬 **Stage** — Top-right. Where your project runs. Shows sprites and backgrounds.\n\n🐱 **Sprite Panel** — Below the stage. Shows all your sprites. Click one to edit it.\n\n🧱 **Block Palette** — Left side. All the coding blocks organized by category:\n• 🔵 Motion (movement)\n• 🟣 Looks (appearance)\n• 🔴 Sound (audio)\n• 🟡 Events (triggers)\n• 🟠 Control (loops, conditions)\n• 🔵 Sensing (detection)\n• 🟢 Operators (math, logic)\n• 🟠 Variables (data storage)\n• 🔴 My Blocks (custom blocks)\n\n📜 **Scripts Area** — Center. Where you drag blocks to build your code.\n\n👗 **Costumes Tab** — Edit sprite appearances\n🔊 **Sounds Tab** — Add and edit sounds",
          tip: "Click any block in the palette to see a quick preview of what it does!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ is where you drag blocks to build your code.", answer: "scripts area" },
        { type: "fill-in-blank", question: "Motion blocks are ___ colored.", answer: "blue" },
        { type: "true-false", question: "Scratch runs in a web browser.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Your First Script",
      subtitle: "Let's code!",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Making the Cat Move",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
          body: "**Step 1:** Find the **Events** category (yellow blocks)\n**Step 2:** Drag **'when green flag clicked'** to the Scripts Area\n**Step 3:** Go to **Motion** category (blue blocks)\n**Step 4:** Drag **'move 10 steps'** and connect it below the flag block\n**Step 5:** Click the **Green Flag** on the stage!\n\n🎉 The cat moves 10 steps to the right!\n\n**Make it better:**\n• Change 10 to a bigger number for more movement\n• Add **'turn 15 degrees'** to make it rotate\n• Add **'glide 1 secs to random position'** for smooth movement\n• Add **'if on edge, bounce'** so it doesn't disappear\n\n**Complete Walking Script:**\nwhen green flag clicked\nforever\n  move 10 steps\n  if on edge, bounce\nend",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The '___ green flag clicked' block starts your script.", answer: "when" },
        { type: "true-false", question: "The 'move 10 steps' block makes the sprite move to the right.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open the block coding editor. Make the cat walk back and forth across the stage continuously. Add the 'if on edge, bounce' block so it never gets stuck.", answer: "" },
      ]
    },
    {
      pageTitle: "Saving Projects",
      subtitle: "Keep your work safe!",
      bannerColor: "from-purple-500 to-pink-500",
      sections: [
        {
          heading: "How to Save",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
          body: "**On Scratch website (scratch.mit.edu):**\n1. Create a free account\n2. Your projects save automatically!\n3. Click **File → Save Now** to save immediately\n4. Click **File → Save as a Copy** to make a duplicate\n\n**Downloading your project:**\n1. Click **File → Save to your computer**\n2. This downloads a .sb3 file\n3. You can open it later with File → Load from your computer\n\n**Sharing your project:**\n1. Click the **Share** button (top-right)\n2. Add a title and description\n3. Anyone with the link can play your project!\n\n**In the block coding editor (PenguinMod):**\n• Use File → Save to your computer\n• Your project saves as a .pmp or .sb3 file",
          tip: "Save your work often! It's heartbreaking to lose a project you've been working on."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Scratch project files have the extension ___.", answer: ".sb3" },
        { type: "true-false", question: "You need an account to save on the Scratch website.", answer: "True", options: ["True", "False"] },
      ]
    },
  ]
};

const c3ScratchCompDragDrop: TopicTextbook = {
  topicId: "c3-scr-comp",
  topicTitle: "Components & Drag-Drop",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Block Categories", subtitle: "Understanding every type of block", bannerColor: "from-green-500 to-teal-500",
      sections: [{ heading: "Block Types Explained", body: "**Blocks are organized by color and function:**\n\n🔵 **Motion** — Move and position sprites (move, turn, glide, go to)\n🟣 **Looks** — Change appearance (say, think, costumes, size, effects)\n🔴 **Sound** — Play sounds and music\n🟡 **Events** — Triggers that start scripts (green flag, key press, click)\n🟠 **Control** — Loops and conditions (forever, repeat, if-then, wait)\n🔵 **Sensing** — Detect things (touching, mouse, keyboard, timer)\n🟢 **Operators** — Math and logic (add, subtract, compare, join text)\n🟠 **Variables** — Store data (score, lives, name)\n\n**Block Shapes:**\n🧱 **Stack blocks** — rectangular, connect vertically\n🎩 **Hat blocks** — rounded top, start scripts\n📊 **Reporter blocks** — rounded, hold values\n💎 **Boolean blocks** — diamond-shaped, true/false\n🔧 **C-shaped blocks** — wrap around other blocks (loops, conditions)", tip: "The shape of a block tells you WHERE it can go. Reporter blocks fit inside rounded holes, Boolean blocks fit in diamond holes." }],
      exercises: [
        { type: "fill-in-blank", question: "Diamond-shaped blocks are called ___ blocks.", answer: "boolean" },
        { type: "fill-in-blank", question: "Hat blocks have a ___ top and start scripts.", answer: "rounded" },
        { type: "true-false", question: "Motion blocks are blue.", answer: "True", options: ["True", "False"] },
      ]
    },
    { pageTitle: "Connecting Blocks", subtitle: "Building your code", bannerColor: "from-teal-500 to-cyan-500",
      sections: [{ heading: "Drag, Drop, and Connect", body: "**How to build a script:**\n1. **Drag** a block from the palette\n2. **Drop** it in the Scripts Area\n3. **Connect** it to another block — they snap together like LEGO!\n\n**Tips for connecting:**\n• Blocks snap together when they're close enough\n• A white highlight shows where a block will connect\n• To disconnect: drag the block away\n• To delete: drag back to the palette, or right-click → Delete Block\n\n**Right-click Menu:**\n• **Duplicate** — copy this block and everything below it\n• **Delete Block** — remove just this block\n• **Add Comment** — add a note explaining what the block does\n\n**Keyboard Shortcut:** Press **Ctrl+Z** to undo mistakes!" }],
      exercises: [
        { type: "true-false", question: "Blocks snap together like LEGO pieces.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Build a script that: 1) Starts when green flag clicked 2) Goes to x:0 y:0 3) Says 'Hello!' for 2 seconds 4) Glides to a random position 5) Says 'I moved!' for 2 seconds", answer: "" },
      ]
    },
  ]
};

const c3ScratchSprite: TopicTextbook = {
  topicId: "c3-scr-sprite",
  topicTitle: "Moving Sprites & Saving",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Advanced Motion", subtitle: "Glide, turn, and bounce!", bannerColor: "from-blue-500 to-indigo-500",
      sections: [{ heading: "Motion Blocks Deep Dive", body: "**Beyond basic movement:**\n\n🎯 **go to x:_ y:_** — teleport to exact coordinates\n🎯 **go to [mouse-pointer/random/sprite]** — go to a target\n🌊 **glide _ secs to x:_ y:_** — smooth movement over time\n🌊 **glide _ secs to [random]** — smooth glide to random spot\n📐 **point in direction _** — face a specific direction (0=up, 90=right, 180=down, -90=left)\n📐 **point towards [mouse/sprite]** — always face toward something\n\n**The Coordinate System:**\n• The stage is 480 wide × 360 tall\n• Center is x:0, y:0\n• Right side: x goes up to 240\n• Left side: x goes down to -240\n• Top: y goes up to 180\n• Bottom: y goes down to -180", tip: "Use 'go to x:0 y:0' at the start of your program to always begin from the center!" }],
      exercises: [
        { type: "fill-in-blank", question: "The center of the Scratch stage is at x:0, y:___.", answer: "0" },
        { type: "true-false", question: "The 'glide' block creates smooth movement.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a sprite that glides to 4 corners of the stage in order (top-left, top-right, bottom-right, bottom-left) and then back to center. Use glide blocks for smooth movement.", answer: "" },
      ]
    },
  ]
};

const c3ScratchAppear: TopicTextbook = {
  topicId: "c3-scr-appear",
  topicTitle: "Change Sprite Appearance",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Costumes & Effects", subtitle: "Transform your sprites!", bannerColor: "from-purple-500 to-pink-500",
      sections: [{ heading: "Working with Costumes", body: "**Costumes** are different appearances for a sprite.\n\n**Switching Costumes:**\n• **switch costume to [name]** — change to a specific costume\n• **next costume** — cycle through costumes\n\n**Animating with costumes:**\nIf you have 2 walking costumes, rapidly switching creates walking animation!\n```\nforever\n  next costume\n  move 5 steps\n  wait 0.2 secs\nend\n```\n\n**Visual Effects:**\n• **color** — shift colors (rainbow effect!)\n• **fisheye** — distort like a fisheye lens\n• **whirl** — spiral distortion\n• **pixelate** — make blocky\n• **mosaic** — create multiple copies\n• **brightness** — lighter or darker\n• **ghost** — transparency (0=solid, 100=invisible)\n\nUse: **change [effect] by _** or **set [effect] to _**\nUse: **clear graphic effects** to reset" }],
      exercises: [
        { type: "fill-in-blank", question: "The ___ effect makes a sprite transparent.", answer: "ghost" },
        { type: "practice", question: "Create a sprite that walks across the screen using costume switching for animation. Add a color effect that changes as it walks!", answer: "" },
      ]
    },
  ]
};

const c3ScratchSay: TopicTextbook = {
  topicId: "c3-scr-say",
  topicTitle: "Make Sprites Talk",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Speech & Thought Bubbles", subtitle: "Give your sprites a voice!", bannerColor: "from-violet-500 to-purple-500",
      sections: [{ heading: "Say and Think Blocks", body: "**Looks blocks for communication:**\n\n💬 **say [hello!]** — shows speech bubble permanently\n💬 **say [hello!] for [2] seconds** — shows for a time, then disappears\n💭 **think [hmm...]** — shows thought bubble permanently\n💭 **think [hmm...] for [2] seconds** — shows for a time\n\n**Creating Dialogues:**\n```\nSprite 1:\nwhen green flag clicked\nsay \"Hi there!\" for 2 seconds\nwait 2 seconds\nsay \"How are you?\" for 2 seconds\n\nSprite 2:\nwhen green flag clicked\nwait 2 seconds\nsay \"Hello! I'm fine!\" for 2 seconds\nwait 2 seconds\nsay \"Let's play!\" for 2 seconds\n```\n\nUse **wait** blocks to time the conversation properly!", tip: "Use 'join' operator blocks to combine variables with text: say (join 'Score: ' (score))" }],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block shows a thought bubble above a sprite.", answer: "think" },
        { type: "practice", question: "Create a 2-character conversation scene. Use Say blocks and Wait blocks to make them talk back and forth. Make the conversation at least 4 lines long.", answer: "" },
      ]
    },
  ]
};

const c3ScratchSound: TopicTextbook = {
  topicId: "c3-scr-sound",
  topicTitle: "Sound & Music in Scratch",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Adding Sounds", subtitle: "Make your projects come alive with audio!", bannerColor: "from-orange-500 to-red-500",
      sections: [{ heading: "Sound Blocks", body: "**Sound blocks (purple/magenta):**\n\n🔊 **play sound [meow] until done** — plays and waits for it to finish\n🔊 **start sound [meow]** — plays but doesn't wait (continues to next block)\n🔇 **stop all sounds** — silence!\n📊 **change volume by _** — louder or quieter\n📊 **set volume to _%** — exact volume level\n\n**Adding New Sounds:**\n1. Click the **Sounds** tab (top of editor)\n2. Click the **speaker+ icon** (bottom-left)\n3. Choose from:\n   • **Library** — hundreds of ready sounds\n   • **Record** — use your microphone\n   • **Upload** — from your computer\n\n**Sound Library Categories:**\n🎵 Music loops, instruments\n🐾 Animal sounds\n💥 Effects (pop, boom, whoosh)\n👾 Electronic/game sounds\n🗣️ Human voices", youtubeId: "E19zGN8fA90" }],
      exercises: [
        { type: "fill-in-blank", question: "'play sound until done' ___ for the sound to finish before continuing.", answer: "waits" },
        { type: "practice", question: "Create a musical instrument! When you press different keys (a, s, d, f, g), play different sounds. Use 'when key pressed' event blocks.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 4: DEVICES ========================
const c4Devices: TopicTextbook = {
  topicId: "c4-dev",
  topicTitle: "Computer Input & Output Devices",
  subjectColor: "neon-blue",
  pages: [
    { pageTitle: "Input Devices Deep Dive", subtitle: "Every way we talk to computers", bannerImage: c3InputOutput, bannerColor: "from-blue-500 to-indigo-500",
      sections: [{ heading: "Categories of Input Devices", body: "**Pointing Devices:**\n🖱️ Mouse — click, drag, scroll\n👆 Touchpad — built into laptops\n🖊️ Light Pen — draw directly on screen\n🕹️ Joystick — for gaming\n🏀 Trackball — upside-down mouse\n\n**Text Input:**\n⌨️ Keyboard — physical keys\n📱 Virtual Keyboard — on touchscreens\n🗣️ Voice Recognition — speak to type (like Siri)\n\n**Visual Input:**\n📷 Webcam — photos and video\n📠 Scanner — digitize paper documents\n📊 Barcode Scanner — read product codes\n🔍 QR Code Scanner — read QR codes\n\n**Audio Input:**\n🎤 Microphone — record voice/sounds\n🎵 MIDI Keyboard — music input\n\n**Special Input:**\n🖊️ Graphics Tablet — for artists\n📱 Touchscreen — tap and swipe\n👆 Fingerprint Scanner — security\n📸 Face Recognition — unlock with your face", youtubeId: "nTq-GRgYNrE" }],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is a pointing device built into laptops.", answer: "touchpad" },
        { type: "true-false", question: "Voice recognition lets you speak to type.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Make a chart with 3 columns: Pointing Devices, Text Input, and Visual Input. List at least 3 devices in each column with a brief description.", answer: "" },
      ]
    },
    { pageTitle: "Output Devices Explained", subtitle: "How computers show results", bannerColor: "from-green-500 to-teal-500",
      sections: [{ heading: "Types of Output", body: "**Visual Output:**\n🖥️ Monitor/Screen — displays everything\n📽️ Projector — displays on walls/screens\n🥽 VR Headset — virtual reality display\n\n**Audio Output:**\n🔊 Speakers — play sounds for everyone\n🎧 Headphones/Earbuds — private listening\n\n**Physical Output:**\n🖨️ Printer — creates paper copies\n🖨️ 3D Printer — creates physical objects!\n📠 Plotter — prints large diagrams\n\n**Types of Monitors:**\n• **LCD** — Liquid Crystal Display (thin, energy efficient)\n• **LED** — Light Emitting Diode (brighter, better contrast)\n• **OLED** — Organic LED (best quality, deep blacks)\n• **CRT** — Cathode Ray Tube (old, bulky TV-style — no longer common)", funFact: "3D printers can create almost anything — from toys to houses! Some hospitals even 3D print human organs." }],
      exercises: [
        { type: "fill-in-blank", question: "A ___ printer creates physical three-dimensional objects.", answer: "3d" },
        { type: "true-false", question: "LCD stands for Liquid Crystal Display.", answer: "True", options: ["True", "False"] },
      ]
    },
    { pageTitle: "Wireless vs Wired", subtitle: "Cables or no cables?", bannerColor: "from-purple-500 to-violet-500",
      sections: [{ heading: "Wired vs Wireless Devices", body: "**Wired Devices:**\n• Connected by USB cable, HDMI, or other cables\n• Always have power from the computer\n• No battery needed\n• Generally more reliable\n• Example: USB keyboard, wired mouse, USB printer\n\n**Wireless Devices:**\n• Connect via Bluetooth or WiFi\n• No cables — freedom to move!\n• Need batteries or charging\n• May have slight delay\n• Example: Wireless mouse, Bluetooth keyboard, WiFi printer\n\n**Connection Types:**\n🔌 **USB** — Universal Serial Bus (most common cable)\n📶 **Bluetooth** — short-range wireless (10m)\n📡 **WiFi** — wireless internet and network\n🔴 **Infrared** — uses invisible light (TV remotes)\n💿 **HDMI** — High-quality video/audio cable" }],
      exercises: [
        { type: "fill-in-blank", question: "USB stands for Universal ___ Bus.", answer: "serial" },
        { type: "fill-in-blank", question: "___ is a short-range wireless technology.", answer: "bluetooth" },
        { type: "true-false", question: "Wireless devices need batteries or charging.", answer: "True", options: ["True", "False"] },
      ]
    },
  ]
};

// ======================== CLASS 4: MEMORY ========================
const c4Memory: TopicTextbook = {
  topicId: "c4-mem",
  topicTitle: "Memory & Storage Devices",
  subjectColor: "neon-purple",
  pages: [
    { pageTitle: "Understanding Computer Memory", subtitle: "Where data lives!", bannerColor: "from-purple-500 to-indigo-500",
      sections: [{ heading: "RAM vs ROM", body: "**RAM (Random Access Memory):**\n• **Temporary** memory — data disappears when computer turns off\n• Very **fast** — CPU reads from RAM quickly\n• Stores programs and data you're currently using\n• More RAM = more programs running smoothly\n• Typical: 4GB, 8GB, 16GB, 32GB\n\n**ROM (Read Only Memory):**\n• **Permanent** memory — data stays even when power is off\n• Stores the computer's **startup instructions** (BIOS)\n• Cannot be easily changed or deleted\n• Much smaller than RAM\n\n**Think of it this way:**\n📝 **RAM** = your desk (work space, clears when you leave)\n📖 **ROM** = a printed textbook (always has the same content)", tip: "When people say 'my computer has 8GB memory', they usually mean RAM — the working memory." }],
      exercises: [
        { type: "fill-in-blank", question: "RAM stands for Random ___ Memory.", answer: "access" },
        { type: "fill-in-blank", question: "ROM stands for Read ___ Memory.", answer: "only" },
        { type: "true-false", question: "RAM data is lost when the computer is turned off.", answer: "True", options: ["True", "False"] },
      ]
    },
    { pageTitle: "Storage Devices", subtitle: "Keeping your data safe permanently", bannerColor: "from-green-500 to-emerald-500",
      sections: [{ heading: "Types of Storage", body: "**Internal Storage:**\n💾 **Hard Disk Drive (HDD):**\n• Uses spinning magnetic disks\n• Large capacity (500GB to 4TB+)\n• Slower than SSD\n• Cheaper per GB\n\n💿 **Solid State Drive (SSD):**\n• No moving parts — uses chips\n• Much FASTER than HDD\n• More expensive\n• More durable (no moving parts to break)\n\n**External/Portable Storage:**\n💿 **USB Flash Drive (Pen Drive)** — small, portable, 4GB-256GB\n💿 **External Hard Drive** — larger, 500GB-5TB\n💿 **SD Card** — tiny, used in cameras and phones\n💿 **CD/DVD** — optical discs (becoming rare)\n\n☁️ **Cloud Storage:**\n• Store files on the internet!\n• Access from any device\n• Examples: Google Drive, OneDrive, iCloud\n• Usually some free space + paid for more", funFact: "A 1TB hard drive can store about 250,000 photos, or 500 hours of video, or 6.5 million documents!" }],
      exercises: [
        { type: "fill-in-blank", question: "SSD stands for ___ State Drive.", answer: "solid" },
        { type: "fill-in-blank", question: "USB Flash Drives are also called ___ drives.", answer: "pen" },
        { type: "true-false", question: "Cloud storage lets you access files from any device.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "SSDs have spinning disks inside.", answer: "False", options: ["True", "False"] },
      ]
    },
  ]
};

// ======================== CLASS 4: PPT ========================
const c4PptIntro: TopicTextbook = {
  topicId: "c4-ppt-intro",
  topicTitle: "Introduction to PowerPoint",
  subjectColor: "neon-orange",
  pages: [
    { pageTitle: "What is PowerPoint?", subtitle: "Create amazing presentations!", bannerColor: "from-orange-500 to-red-500",
      sections: [{ heading: "Welcome to PowerPoint!", body: "**Microsoft PowerPoint** is a presentation software. You use it to create **slideshows** — a series of pages (slides) with text, images, and effects.\n\n**Uses of PowerPoint:**\n📊 School presentations and projects\n👨‍🏫 Teacher lessons\n💼 Business meetings\n🎉 Birthday and event invitations\n📸 Photo slideshows\n🏆 Award ceremonies\n\n**Key Vocabulary:**\n📄 **Slide** — one page of a presentation\n📋 **Slideshow** — all slides played in order\n📐 **Layout** — the arrangement of elements on a slide\n🎨 **Theme** — pre-designed colors and fonts\n🎬 **Transition** — effect between slides\n✨ **Animation** — effect on objects within a slide", youtubeId: "D8Gzus2KW70" }],
      exercises: [
        { type: "fill-in-blank", question: "One page of a presentation is called a ___.", answer: "slide" },
        { type: "true-false", question: "A theme provides pre-designed colors and fonts.", answer: "True", options: ["True", "False"] },
      ]
    },
    { pageTitle: "The PowerPoint Interface", subtitle: "Know your tools!", bannerColor: "from-red-500 to-pink-500",
      sections: [{ heading: "Parts of the PPT Window", body: "**Title Bar** — Shows the file name\n**Ribbon** — Tabs with tools: File, Home, Insert, Design, Transitions, Animations, Slide Show\n**Slide Panel** — Left side, shows thumbnail of all slides\n**Main Editing Area** — Center, where you edit the current slide\n**Notes Panel** — Bottom, for speaker notes\n**Status Bar** — Bottom, shows slide number, zoom\n\n**Important Tabs:**\n🏠 **Home** — text formatting, shapes, arrange\n📎 **Insert** — add images, shapes, tables, charts, videos\n🎨 **Design** — themes, backgrounds, slide size\n🔄 **Transitions** — effects between slides\n✨ **Animations** — effects on slide objects\n🎬 **Slide Show** — start the presentation" }],
      exercises: [
        { type: "fill-in-blank", question: "The ___ panel on the left shows thumbnails of all slides.", answer: "slide" },
        { type: "practice", question: "Open PowerPoint (or the web version). Create a 3-slide presentation: Slide 1 — your name, Slide 2 — your hobbies, Slide 3 — 'Thank You'. Apply a theme.", answer: "" },
      ]
    },
  ]
};

const c4PptSlides: TopicTextbook = {
  topicId: "c4-ppt-slides",
  topicTitle: "Slides, Templates & Content",
  subjectColor: "neon-orange",
  pages: [
    { pageTitle: "Creating Slides", subtitle: "Build your slideshow!", bannerColor: "from-orange-500 to-amber-500",
      sections: [{ heading: "Working with Slides", body: "**Adding a New Slide:**\n• Home tab → **New Slide** button\n• Or press **Ctrl+M**\n• Choose a **layout** (Title, Two Content, Blank, etc.)\n\n**Slide Layouts:**\n📌 **Title Slide** — for the first slide (big title + subtitle)\n📌 **Title and Content** — heading with bullets/images\n📌 **Two Content** — split into two columns\n📌 **Comparison** — compare two things side by side\n📌 **Blank** — empty slide for custom layouts\n📌 **Title Only** — just a heading\n\n**Managing Slides:**\n🔄 **Reorder** — drag slides up/down in the Slide Panel\n📋 **Duplicate** — right-click → Duplicate Slide\n🗑️ **Delete** — right-click → Delete Slide\n🙈 **Hide** — right-click → Hide Slide (skips during slideshow)" }],
      exercises: [
        { type: "fill-in-blank", question: "The shortcut to add a new slide is Ctrl+___.", answer: "m" },
        { type: "true-false", question: "You can hide slides so they're skipped during the slideshow.", answer: "True", options: ["True", "False"] },
      ]
    },
    { pageTitle: "Adding Content", subtitle: "Text, images, and more!", bannerColor: "from-amber-500 to-yellow-500",
      sections: [{ heading: "Slide Content", body: "**Text:**\n• Click inside text placeholders to type\n• Format text using Home tab (font, size, color, alignment)\n\n**Images:**\n• Insert tab → Pictures → choose from device or online\n• Resize by dragging corner handles\n\n**Shapes:**\n• Insert tab → Shapes → choose any shape\n• Click and drag to draw\n• Right-click → Edit Text to add text inside shapes\n\n**Tables:**\n• Insert tab → Table → choose rows and columns\n• Great for organizing data\n\n**Charts:**\n• Insert tab → Chart → choose type (bar, pie, line)\n• Enter data in the spreadsheet that appears\n\n**WordArt:**\n• Insert tab → WordArt → choose a style\n• Great for fancy titles!", tip: "Use the 6×6 rule: No more than 6 bullet points per slide, no more than 6 words per point!" }],
      exercises: [
        { type: "practice", question: "Create a 5-slide presentation about 'My Favorite Season'. Include: a title slide, slides with images, a table comparing seasons, and a conclusion. Apply a theme.", answer: "" },
      ]
    },
    { pageTitle: "Running a Slideshow", subtitle: "Present like a pro!", bannerColor: "from-green-500 to-teal-500",
      sections: [{ heading: "Slideshow Mode", body: "**Starting a Slideshow:**\n🎬 **From Beginning** — Slide Show tab → From Beginning (or press F5)\n🎬 **From Current Slide** — Slide Show tab → From Current Slide (or Shift+F5)\n\n**During the Slideshow:**\n➡️ **Next slide** — click, Enter, Space, Right Arrow, or Down Arrow\n⬅️ **Previous slide** — Backspace, Left Arrow, or Up Arrow\n🔢 **Go to specific slide** — type the slide number + Enter\n✏️ **Pointer/Pen** — right-click → Pointer Options → Pen (draw on slides!)\n⏹️ **End slideshow** — press **Escape**\n\n**Presenter View:**\n• Shows your notes on YOUR screen\n• Audience only sees the slides\n• Great for remembering what to say!", tip: "Practice your presentation at least 3 times before presenting to the class!" }],
      exercises: [
        { type: "fill-in-blank", question: "Press ___ to start the slideshow from the beginning.", answer: "f5" },
        { type: "fill-in-blank", question: "Press ___ to end a slideshow.", answer: "escape" },
        { type: "true-false", question: "Presenter View shows notes on your screen while the audience sees slides.", answer: "True", options: ["True", "False"] },
      ]
    },
  ]
};

// ======================== CLASS 4: SCRATCH ADVANCED ========================
const c4Scratch: TopicTextbook = {
  topicId: "c4-scr",
  topicTitle: "Multiple Sprites & Media in Scratch",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Working with Multiple Sprites", subtitle: "More characters, more fun!", bannerColor: "from-green-500 to-emerald-500",
      sections: [{ heading: "Adding and Managing Sprites", body: "**Adding Sprites:**\n1. Click the **cat+ icon** (bottom-right, next to stage)\n2. Choose from:\n   🐱 **Library** — hundreds of ready sprites\n   🎨 **Paint** — draw your own\n   🔍 **Surprise** — random sprite\n   📁 **Upload** — from your computer\n\n**Each sprite has its own:**\n• Scripts (code)\n• Costumes (appearances)\n• Sounds\n• Position on stage\n\n**Sprite Properties:**\n• Click a sprite to select it\n• Change its **name** (top of scripts area)\n• Set **x and y** position\n• Set **size** (100% = normal)\n• Set **direction** (which way it faces)\n• Show/Hide toggle\n\n**Important:** Always check which sprite is selected before adding code! A common mistake is coding the wrong sprite.", tip: "Name your sprites clearly (like 'Player', 'Enemy', 'Coin') instead of 'Sprite1', 'Sprite2'." }],
      exercises: [
        { type: "true-false", question: "Each sprite has its own separate scripts.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a scene with 4 sprites: a person, an animal, a tree, and the sun. Give each sprite a simple animation (the person walks, the animal bounces, the tree sways, the sun spins).", answer: "" },
      ]
    },
    { pageTitle: "Backdrops & Scene Changes", subtitle: "Create different scenes!", bannerColor: "from-teal-500 to-cyan-500",
      sections: [{ heading: "Working with Backdrops", body: "**Backdrops** are backgrounds for the stage.\n\n**Adding Backdrops:**\n1. Click the **landscape icon** (bottom-right corner)\n2. Choose from Library, Paint, Upload, or Surprise\n\n**Switching Backdrops in Code:**\n• **switch backdrop to [name]** — change scene\n• **next backdrop** — cycle through backdrops\n• **when backdrop switches to [name]** — trigger event when scene changes\n\n**Scene-Based Storytelling:**\n```\nwhen green flag clicked\nswitch backdrop to 'forest'\nsay 'Once upon a time...' for 3 secs\nwait 1\nswitch backdrop to 'castle'\nsay 'The hero arrived!' for 3 secs\n```\n\nUse backdrops + broadcasting for complex scene management!", funFact: "You can even code the backdrop itself! Click 'Stage' in the sprite list, and you can add scripts to the backdrop." }],
      exercises: [
        { type: "fill-in-blank", question: "Backgrounds for the stage are called ___.", answer: "backdrops" },
        { type: "practice", question: "Create a 3-scene story: Scene 1 (forest), Scene 2 (city), Scene 3 (space). Use backdrop switching and have a character narrate each scene.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 4: WINDOWS ADVANCED ========================
const c4Win: TopicTextbook = {
  topicId: "c4-win",
  topicTitle: "Windows Advanced Features",
  subjectColor: "neon-orange",
  pages: [
    { pageTitle: "Control Panel & Settings", subtitle: "Customize your computer!", bannerColor: "from-blue-500 to-purple-500",
      sections: [{ heading: "Windows Settings", body: "**Settings** (gear icon in Start Menu) lets you customize your PC:\n\n🖥️ **System** — Display, sound, notifications, power\n📶 **Network** — WiFi, Bluetooth, airplane mode\n🎨 **Personalization** — wallpaper, colors, themes, lock screen\n🔔 **Apps** — install/uninstall programs\n👤 **Accounts** — user accounts, passwords\n🕐 **Time & Language** — date, time, keyboard language\n🎮 **Gaming** — game settings\n♿ **Accessibility** — make computer easier to use\n🔒 **Privacy & Security** — protect your data\n\n**Quick Settings:**\nClick the WiFi/Sound/Battery icons (bottom-right) for quick toggles:\n• WiFi on/off\n• Bluetooth on/off\n• Brightness slider\n• Volume slider\n• Night light (reduces blue light)" }],
      exercises: [
        { type: "fill-in-blank", question: "To change the wallpaper, go to Settings → ___.", answer: "personalization" },
        { type: "practice", question: "Explore Windows Settings: change the desktop wallpaper, adjust the brightness, and check your WiFi connection. Then change it all back!", answer: "" },
      ]
    },
    { pageTitle: "Useful Accessories", subtitle: "Built-in tools you should know!", bannerColor: "from-purple-500 to-pink-500",
      sections: [{ heading: "Windows Accessories", body: "Windows comes with many useful programs:\n\n🧮 **Calculator** — basic and scientific calculations\n📝 **Notepad** — simple text editor\n✍️ **WordPad** — basic word processor (between Notepad and Word)\n🎨 **Paint** — drawing program\n✂️ **Snipping Tool** — capture screenshots of any part of the screen\n📸 **Camera** — take photos with your webcam\n🎙️ **Voice Recorder** — record audio\n🗺️ **Maps** — view maps and get directions\n⏰ **Clock** — timer, stopwatch, alarm, world clock\n🖩 **Character Map** — find special characters and symbols\n\n**Useful Keyboard Shortcuts:**\n• **Win+E** — Open File Explorer\n• **Win+L** — Lock your computer\n• **Win+D** — Show desktop\n• **Alt+Tab** — Switch between open windows\n• **Win+Shift+S** — Take a screenshot" }],
      exercises: [
        { type: "fill-in-blank", question: "Win+E opens ___.", answer: "file explorer" },
        { type: "fill-in-blank", question: "The ___ Tool captures screenshots of parts of the screen.", answer: "snipping" },
        { type: "practice", question: "Try 5 keyboard shortcuts from the list above. Then open Calculator, Notepad, and Paint all at once and use Alt+Tab to switch between them.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 4: WORD ADVANCED ========================
const c4Word: TopicTextbook = {
  topicId: "c4-word-adv",
  topicTitle: "MS Word Advanced Features",
  subjectColor: "neon-blue",
  pages: [
    { pageTitle: "WordArt & Shapes", subtitle: "Make documents visually stunning!", bannerColor: "from-blue-500 to-indigo-500",
      sections: [{ heading: "Using WordArt", body: "**WordArt** creates decorative text with special effects!\n\n**How to add WordArt:**\n1. Go to **Insert** tab\n2. Click **WordArt**\n3. Choose a style from the gallery\n4. Type your text\n5. Customize the font, size, and colors\n\n**WordArt Effects:**\n• **Transform** — curve, wave, arch your text\n• **Shadow** — add shadow effects\n• **Reflection** — mirror effect below text\n• **Glow** — colored glow around text\n• **3D Rotation** — tilt text in 3D\n\n**Inserting Shapes:**\n1. Insert tab → Shapes\n2. Choose from: lines, rectangles, circles, arrows, stars, callouts, flowchart shapes\n3. Click and drag to draw\n4. Right-click → Edit Text to add text inside\n5. Use Shape Format tab to change colors and effects", youtubeId: "2MCmnr2L50o" }],
      exercises: [
        { type: "fill-in-blank", question: "WordArt creates ___ text with special effects.", answer: "decorative" },
        { type: "practice", question: "Create a birthday card: use WordArt for 'Happy Birthday!', add colorful shapes (stars, hearts, balloons), and include a personal message. Add an Art page border.", answer: "" },
      ]
    },
    { pageTitle: "Tables in Word", subtitle: "Organize data neatly!", bannerColor: "from-green-500 to-teal-500",
      sections: [{ heading: "Creating Tables", body: "**Tables** organize data in rows and columns.\n\n**How to insert a table:**\n1. Go to **Insert** tab\n2. Click **Table**\n3. Drag to select the number of rows and columns\n4. Or click **Insert Table** for exact numbers\n\n**Editing Tables:**\n• Click inside a cell to type\n• **Tab** key moves to next cell\n• **Shift+Tab** moves to previous cell\n• Select a row/column by clicking the edge\n\n**Table Design:**\n• **Table Styles** — pre-designed looks (colored headers, banded rows)\n• **Borders** — change border style, color, width\n• **Shading** — color individual cells or rows\n\n**Table Layout:**\n• **Insert Rows/Columns** — add more\n• **Delete** — remove rows/columns\n• **Merge Cells** — combine cells into one\n• **Split Cells** — divide one cell into many\n• **AutoFit** — adjust size automatically", tip: "Use 'Table Styles' for instant professional formatting — saves a lot of time!" }],
      exercises: [
        { type: "fill-in-blank", question: "Press ___ to move to the next cell in a table.", answer: "tab" },
        { type: "true-false", question: "You can merge multiple cells into one in Word.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create your weekly timetable in a table. Use 7 columns (days) and rows for each period. Apply a Table Style, merge cells for lunch, and color-code different subjects.", answer: "" },
      ]
    },
    { pageTitle: "Headers, Footers & Page Numbers", subtitle: "Professional document features!", bannerColor: "from-amber-500 to-orange-500",
      sections: [{ heading: "Headers and Footers", body: "**Headers** appear at the TOP of every page.\n**Footers** appear at the BOTTOM of every page.\n\n**Common uses:**\n• Your name\n• Document title\n• Date\n• Page numbers\n• School/class name\n\n**How to add:**\n1. Go to **Insert** tab\n2. Click **Header** or **Footer**\n3. Choose a style or select **Edit Header/Footer**\n4. Type your content\n5. Click **Close Header and Footer** when done\n\n**Page Numbers:**\n1. Insert tab → **Page Number**\n2. Choose position: Top, Bottom, Page Margins\n3. Choose a style\n\n**Tip:** Check 'Different First Page' if you don't want the header/footer on the title page!" }],
      exercises: [
        { type: "fill-in-blank", question: "Headers appear at the ___ of every page.", answer: "top" },
        { type: "practice", question: "Create a 3-page document. Add a header with your name and date. Add page numbers at the bottom. Make the first page different (no header).", answer: "" },
      ]
    },
  ]
};

// Export all Class 3-4 content
export const CLASS_3_4_TEXTBOOKS: TopicTextbook[] = [
  c3Ipo,
  c3Windows_,
  c3PaintMore,
  c3WordAdv,
  c3ScratchStart,
  c3ScratchCompDragDrop,
  c3ScratchSprite,
  c3ScratchAppear,
  c3ScratchSay,
  c3ScratchSound,
  c4Devices,
  c4Memory,
  c4PptIntro,
  c4PptSlides,
  c4Scratch,
  c4Win,
  c4Word,
];
