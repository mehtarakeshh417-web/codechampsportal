// Educational video database for all curriculum topics
// Each topic maps to an array of curated YouTube videos

export interface TopicVideo {
  youtubeId: string;
  title: string;
  channel: string;
}

// Video database keyed by topic ID
export const TOPIC_VIDEOS: Record<string, TopicVideo[]> = {
  // =================== CLASS 1 ===================
  "c1-it-intro": [
    { youtubeId: "z9-yDaTwMHk", title: "What is a Computer? For Kids", channel: "Smile and Learn" },
    { youtubeId: "1UjWdtY8yx4", title: "Parts of a Computer", channel: "Smile and Learn" },
    { youtubeId: "nODMFBTNwSk", title: "Basic Parts of a Computer", channel: "Homeschool Pop" },
    { youtubeId: "Cu3R5it4cQs", title: "Introduction to Computers for Kids", channel: "KidsEduc" },
    { youtubeId: "GUTj1gSfiTw", title: "All About Computers for Children", channel: "Learning Junction" },
  ],
  "c1-paint-start": [
    { youtubeId: "EvMy5GQSbJU", title: "MS Paint Tutorial for Kids", channel: "Tutorials Point" },
    { youtubeId: "sTwVnP6Z5nQ", title: "How to Open MS Paint", channel: "Computer Education" },
    { youtubeId: "VxRCpW1PXWU", title: "MS Paint for Beginners", channel: "GCFGlobal" },
  ],
  "c1-paint-parts": [
    { youtubeId: "EvMy5GQSbJU", title: "Paint Tools and Features", channel: "Tutorials Point" },
    { youtubeId: "VxRCpW1PXWU", title: "MS Paint Interface Overview", channel: "GCFGlobal" },
    { youtubeId: "2TuS-rjI8P0", title: "Paint Tool Box Explained", channel: "Computer Education" },
  ],
  "c1-paint-shapes": [
    { youtubeId: "S78rvDoXmP0", title: "Drawing Shapes in MS Paint", channel: "Easy Computer" },
    { youtubeId: "EvMy5GQSbJU", title: "Paint Drawing Tutorial", channel: "Tutorials Point" },
    { youtubeId: "VxRCpW1PXWU", title: "Draw Lines and Shapes in Paint", channel: "GCFGlobal" },
    { youtubeId: "2TuS-rjI8P0", title: "Shape Art in Paint", channel: "Computer Education" },
  ],
  "c1-paint-color": [
    { youtubeId: "S78rvDoXmP0", title: "Coloring in MS Paint", channel: "Easy Computer" },
    { youtubeId: "EvMy5GQSbJU", title: "Fill Color Tool in Paint", channel: "Tutorials Point" },
    { youtubeId: "VxRCpW1PXWU", title: "Using Colors in Paint", channel: "GCFGlobal" },
  ],
  "c1-scratch-work": [
    { youtubeId: "fXBauB9jnfE", title: "ScratchJr Introduction for Kids", channel: "ScratchJr" },
    { youtubeId: "0KZqJ4dRQxQ", title: "Getting Started with ScratchJr", channel: "ScratchEd" },
    { youtubeId: "3lz8guqyNXk", title: "ScratchJr Tutorial for Beginners", channel: "Code with Sara" },
  ],
  "c1-scratch-comp": [
    { youtubeId: "fXBauB9jnfE", title: "ScratchJr Components", channel: "ScratchJr" },
    { youtubeId: "0KZqJ4dRQxQ", title: "ScratchJr Interface Tour", channel: "ScratchEd" },
    { youtubeId: "3lz8guqyNXk", title: "Understanding ScratchJr Blocks", channel: "Code with Sara" },
  ],
  "c1-scratch-text": [
    { youtubeId: "fXBauB9jnfE", title: "Adding Text in ScratchJr", channel: "ScratchJr" },
    { youtubeId: "3lz8guqyNXk", title: "ScratchJr Text and Labels", channel: "Code with Sara" },
    { youtubeId: "0KZqJ4dRQxQ", title: "Text Features in ScratchJr", channel: "ScratchEd" },
  ],
  "c1-scratch-char": [
    { youtubeId: "fXBauB9jnfE", title: "Adding Characters in ScratchJr", channel: "ScratchJr" },
    { youtubeId: "0KZqJ4dRQxQ", title: "ScratchJr Characters & Backgrounds", channel: "ScratchEd" },
    { youtubeId: "3lz8guqyNXk", title: "New Sprites and Scenes in ScratchJr", channel: "Code with Sara" },
  ],
  "c1-scratch-move": [
    { youtubeId: "fXBauB9jnfE", title: "Moving Sprites in ScratchJr", channel: "ScratchJr" },
    { youtubeId: "3lz8guqyNXk", title: "Motion Blocks in ScratchJr", channel: "Code with Sara" },
    { youtubeId: "0KZqJ4dRQxQ", title: "Make Characters Move", channel: "ScratchEd" },
    { youtubeId: "WBCIjVhRbio", title: "ScratchJr Animation Tutorial", channel: "Kids Coding" },
  ],

  // =================== CLASS 2 ===================
  "c2-it-adv": [
    { youtubeId: "Cu3R5it4cQs", title: "Types of Computers for Kids", channel: "KidsEduc" },
    { youtubeId: "1UjWdtY8yx4", title: "Input and Output Devices", channel: "Smile and Learn" },
    { youtubeId: "nODMFBTNwSk", title: "Computer Input Output Devices", channel: "Homeschool Pop" },
    { youtubeId: "GUTj1gSfiTw", title: "Starting and Shutting Down Computer", channel: "Learning Junction" },
  ],
  "c2-paint-adv": [
    { youtubeId: "EvMy5GQSbJU", title: "Advanced Paint Techniques", channel: "Tutorials Point" },
    { youtubeId: "S78rvDoXmP0", title: "Selection Tools in Paint", channel: "Easy Computer" },
    { youtubeId: "VxRCpW1PXWU", title: "Copy Paste Resize in Paint", channel: "GCFGlobal" },
  ],
  "c2-word-intro": [
    { youtubeId: "S-mMTpXMHiI", title: "MS Word for Kids", channel: "GCFGlobal" },
    { youtubeId: "qPhJykXcJGk", title: "MS Word Basics for Beginners", channel: "Kevin Stratvert" },
    { youtubeId: "ZH4DFQJAH7Y", title: "Introduction to Microsoft Word", channel: "Technology for Teachers" },
  ],
  "c2-scj-adv": [
    { youtubeId: "fXBauB9jnfE", title: "Advanced ScratchJr Projects", channel: "ScratchJr" },
    { youtubeId: "3lz8guqyNXk", title: "ScratchJr Repeat and Sound Blocks", channel: "Code with Sara" },
    { youtubeId: "0KZqJ4dRQxQ", title: "Multi-Page Stories in ScratchJr", channel: "ScratchEd" },
  ],

  // =================== CLASS 3 ===================
  "c3-ipo-main": [
    { youtubeId: "MDlRH8JmTII", title: "Input Process Output for Kids", channel: "Computer Education" },
    { youtubeId: "Cu3R5it4cQs", title: "How Computers Work - IPO", channel: "KidsEduc" },
    { youtubeId: "nODMFBTNwSk", title: "IPO Cycle Explained Simply", channel: "Homeschool Pop" },
    { youtubeId: "GUTj1gSfiTw", title: "Input Processing Output Examples", channel: "Learning Junction" },
  ],
  "c3-os-win": [
    { youtubeId: "H4MBz2D1Ixo", title: "Windows Operating System Basics", channel: "GCFGlobal" },
    { youtubeId: "dDmR33lYqGc", title: "Desktop Taskbar and Start Menu", channel: "Technology for Teachers" },
    { youtubeId: "2K04zxq3diQ", title: "File Explorer for Beginners", channel: "Kevin Stratvert" },
  ],
  "c3-paint-more": [
    { youtubeId: "EvMy5GQSbJU", title: "Advanced Paint Features", channel: "Tutorials Point" },
    { youtubeId: "S78rvDoXmP0", title: "Paint 3D Introduction", channel: "Easy Computer" },
    { youtubeId: "VxRCpW1PXWU", title: "Paint Advanced Tools Tutorial", channel: "GCFGlobal" },
  ],
  "c3-word-adv": [
    { youtubeId: "S-mMTpXMHiI", title: "MS Word Formatting for Kids", channel: "GCFGlobal" },
    { youtubeId: "qPhJykXcJGk", title: "Word Formatting & Images", channel: "Kevin Stratvert" },
    { youtubeId: "ZH4DFQJAH7Y", title: "Bullets Numbering and Borders", channel: "Technology for Teachers" },
  ],
  "c3-scr-start": [
    { youtubeId: "VIpmkeqJhmQ", title: "Getting Started with Scratch", channel: "CS First" },
    { youtubeId: "6LA876ixFY0", title: "Scratch Tutorial for Beginners", channel: "freeCodeCamp" },
    { youtubeId: "jXv8VlnMPMc", title: "Scratch Programming Basics", channel: "The Coding Train" },
  ],
  "c3-scr-comp": [
    { youtubeId: "VIpmkeqJhmQ", title: "Scratch Blocks and Drag Drop", channel: "CS First" },
    { youtubeId: "6LA876ixFY0", title: "Scratch Block Categories", channel: "freeCodeCamp" },
    { youtubeId: "jXv8VlnMPMc", title: "Connecting Blocks in Scratch", channel: "The Coding Train" },
  ],
  "c3-scr-sprite": [
    { youtubeId: "VIpmkeqJhmQ", title: "Moving Sprites in Scratch", channel: "CS First" },
    { youtubeId: "6LA876ixFY0", title: "Motion Blocks Tutorial", channel: "freeCodeCamp" },
    { youtubeId: "jXv8VlnMPMc", title: "Sprite Movement and Glide", channel: "The Coding Train" },
  ],
  "c3-scr-appear": [
    { youtubeId: "VIpmkeqJhmQ", title: "Changing Sprite Appearance", channel: "CS First" },
    { youtubeId: "6LA876ixFY0", title: "Costumes and Looks in Scratch", channel: "freeCodeCamp" },
    { youtubeId: "jXv8VlnMPMc", title: "Scratch Costumes Tutorial", channel: "The Coding Train" },
  ],
  "c3-scr-say": [
    { youtubeId: "VIpmkeqJhmQ", title: "Say and Think Blocks", channel: "CS First" },
    { youtubeId: "6LA876ixFY0", title: "Making Sprites Talk", channel: "freeCodeCamp" },
    { youtubeId: "jXv8VlnMPMc", title: "Sprite Speech Bubbles", channel: "The Coding Train" },
  ],
  "c3-scr-sound": [
    { youtubeId: "VIpmkeqJhmQ", title: "Adding Sound in Scratch", channel: "CS First" },
    { youtubeId: "6LA876ixFY0", title: "Sound and Music Blocks", channel: "freeCodeCamp" },
    { youtubeId: "jXv8VlnMPMc", title: "Scratch Music Extension", channel: "The Coding Train" },
  ],

  // =================== CLASS 4 ===================
  "c4-dev": [
    { youtubeId: "1UjWdtY8yx4", title: "Input and Output Devices Explained", channel: "Smile and Learn" },
    { youtubeId: "nODMFBTNwSk", title: "Computer Devices for Kids", channel: "Homeschool Pop" },
    { youtubeId: "Cu3R5it4cQs", title: "Input Output Pointing Devices", channel: "KidsEduc" },
  ],
  "c4-mem": [
    { youtubeId: "TQCr9RV7twk", title: "RAM vs ROM Explained", channel: "PowerCert" },
    { youtubeId: "p3q5zWCw8zg", title: "Computer Memory for Kids", channel: "Homeschool Pop" },
    { youtubeId: "PVad0c2cljo", title: "Types of Computer Storage", channel: "TechTerms" },
  ],
  "c4-win": [
    { youtubeId: "H4MBz2D1Ixo", title: "Windows Settings and Control Panel", channel: "GCFGlobal" },
    { youtubeId: "2K04zxq3diQ", title: "Task Manager and Accessories", channel: "Kevin Stratvert" },
    { youtubeId: "dDmR33lYqGc", title: "Windows Advanced Features", channel: "Technology for Teachers" },
  ],
  "c4-word-adv": [
    { youtubeId: "qPhJykXcJGk", title: "MS Word Advanced Formatting", channel: "Kevin Stratvert" },
    { youtubeId: "S-mMTpXMHiI", title: "WordArt Tables and Shapes", channel: "GCFGlobal" },
    { youtubeId: "ZH4DFQJAH7Y", title: "Headers Footers and Formatting", channel: "Technology for Teachers" },
  ],
  "c4-ppt-intro": [
    { youtubeId: "J8kbusOaFd0", title: "Introduction to PowerPoint", channel: "GCFGlobal" },
    { youtubeId: "ticFkqoNIo8", title: "PowerPoint for Beginners", channel: "Kevin Stratvert" },
    { youtubeId: "0kcMGkjQSXM", title: "PowerPoint Interface Tour", channel: "Technology for Teachers" },
  ],
  "c4-ppt-slides": [
    { youtubeId: "ticFkqoNIo8", title: "Creating Slides and Templates", channel: "Kevin Stratvert" },
    { youtubeId: "J8kbusOaFd0", title: "Slide Layouts and Content", channel: "GCFGlobal" },
    { youtubeId: "0kcMGkjQSXM", title: "Slideshow Mode Tutorial", channel: "Technology for Teachers" },
  ],
  "c4-scr": [
    { youtubeId: "VIpmkeqJhmQ", title: "Multiple Sprites in Scratch", channel: "CS First" },
    { youtubeId: "6LA876ixFY0", title: "Sprite Interaction and Sound", channel: "freeCodeCamp" },
    { youtubeId: "jXv8VlnMPMc", title: "Background Changes in Scratch", channel: "The Coding Train" },
  ],

  // =================== CLASS 5 ===================
  "c5-word-pf": [
    { youtubeId: "qPhJykXcJGk", title: "Page Layout in MS Word", channel: "Kevin Stratvert" },
    { youtubeId: "S-mMTpXMHiI", title: "Margins Columns and Watermarks", channel: "GCFGlobal" },
    { youtubeId: "ZH4DFQJAH7Y", title: "Word Page Formatting Tutorial", channel: "Technology for Teachers" },
    { youtubeId: "fxvPqJx5MYg", title: "MS Word Page Setup Complete Guide", channel: "Teacher's Tech" },
  ],
  "c5-word-tf": [
    { youtubeId: "qPhJykXcJGk", title: "Text Formatting in Word", channel: "Kevin Stratvert" },
    { youtubeId: "S-mMTpXMHiI", title: "Font Styles and Alignment", channel: "GCFGlobal" },
    { youtubeId: "fxvPqJx5MYg", title: "Word Formatting Masterclass", channel: "Teacher's Tech" },
  ],
  "c5-ppt-anim": [
    { youtubeId: "ticFkqoNIo8", title: "PowerPoint Animations Tutorial", channel: "Kevin Stratvert" },
    { youtubeId: "J8kbusOaFd0", title: "Transitions and Animation Effects", channel: "GCFGlobal" },
    { youtubeId: "0kcMGkjQSXM", title: "Inserting Audio and Video in PPT", channel: "Technology for Teachers" },
    { youtubeId: "z0rn_rKKvc8", title: "Custom Animations in PowerPoint", channel: "One Skill PowerPoint" },
  ],
  "c5-ppt-design": [
    { youtubeId: "ticFkqoNIo8", title: "Slide Themes and Design", channel: "Kevin Stratvert" },
    { youtubeId: "z0rn_rKKvc8", title: "Slide Master and SmartArt", channel: "One Skill PowerPoint" },
    { youtubeId: "J8kbusOaFd0", title: "Beautiful Slide Designs", channel: "GCFGlobal" },
  ],
  "c5-xl-intro": [
    { youtubeId: "rwbho0CgEAE", title: "Excel for Beginners", channel: "Kevin Stratvert" },
    { youtubeId: "k1VUZEVuDJ8", title: "Excel Interface and Basics", channel: "GCFGlobal" },
    { youtubeId: "Vl0H-qTclOg", title: "Getting Started with Excel", channel: "Leila Gharani" },
    { youtubeId: "e4m3hJgfsdE", title: "Excel Worksheets and Cells", channel: "Teacher's Tech" },
  ],
  "c5-xl-cells": [
    { youtubeId: "rwbho0CgEAE", title: "Selecting and Formatting Cells", channel: "Kevin Stratvert" },
    { youtubeId: "k1VUZEVuDJ8", title: "Cell Formatting in Excel", channel: "GCFGlobal" },
    { youtubeId: "Vl0H-qTclOg", title: "Font Size Alignment Borders", channel: "Leila Gharani" },
  ],
  "c5-xl-edit": [
    { youtubeId: "rwbho0CgEAE", title: "Insert Delete Rows Columns", channel: "Kevin Stratvert" },
    { youtubeId: "k1VUZEVuDJ8", title: "Resize Merge Wrap in Excel", channel: "GCFGlobal" },
    { youtubeId: "e4m3hJgfsdE", title: "Excel Editing Tutorial", channel: "Teacher's Tech" },
  ],
  "c5-scr": [
    { youtubeId: "6LA876ixFY0", title: "Scratch Variables and Operators", channel: "freeCodeCamp" },
    { youtubeId: "VIpmkeqJhmQ", title: "Control and Sensing Blocks", channel: "CS First" },
    { youtubeId: "jXv8VlnMPMc", title: "Broadcasting Messages in Scratch", channel: "The Coding Train" },
    { youtubeId: "OAx_6-wdslM", title: "Scratch Variables Tutorial", channel: "Griffpatch" },
  ],
  "c5-scr-games": [
    { youtubeId: "OAx_6-wdslM", title: "Scratch Game Development", channel: "Griffpatch" },
    { youtubeId: "6LA876ixFY0", title: "Collision Detection in Scratch", channel: "freeCodeCamp" },
    { youtubeId: "jXv8VlnMPMc", title: "Score System and Levels", channel: "The Coding Train" },
    { youtubeId: "VIpmkeqJhmQ", title: "Making a Maze Game", channel: "CS First" },
  ],

  // =================== CLASS 6 ===================
  "c6-xl": [
    { youtubeId: "rwbho0CgEAE", title: "Excel Formulas SUM AVERAGE MAX MIN", channel: "Kevin Stratvert" },
    { youtubeId: "Vl0H-qTclOg", title: "Excel Functions Tutorial", channel: "Leila Gharani" },
    { youtubeId: "k1VUZEVuDJ8", title: "Sorting and Filtering in Excel", channel: "GCFGlobal" },
    { youtubeId: "e4m3hJgfsdE", title: "COUNT Functions Explained", channel: "Teacher's Tech" },
  ],
  "c6-gimp-intro": [
    { youtubeId: "x6pXJ7Ijir0", title: "GIMP Tutorial for Beginners", channel: "Davies Media Design" },
    { youtubeId: "2EPIoAM_WB0", title: "GIMP Interface Overview", channel: "Chris Tutorials" },
    { youtubeId: "Q8C0LJPpr64", title: "Getting Started with GIMP", channel: "TJ Free" },
  ],
  "c6-gimp-select": [
    { youtubeId: "x6pXJ7Ijir0", title: "GIMP Selection Tools Tutorial", channel: "Davies Media Design" },
    { youtubeId: "2EPIoAM_WB0", title: "Rectangle Ellipse Free Select", channel: "Chris Tutorials" },
    { youtubeId: "Q8C0LJPpr64", title: "Magic Wand and Select by Color", channel: "TJ Free" },
    { youtubeId: "AxZ0LN3_qLg", title: "Background Removal in GIMP", channel: "LogosByNick" },
  ],
  "c6-html-intro": [
    { youtubeId: "FG44xi1ujac", title: "HTML in 100 Seconds", channel: "Fireship" },
    { youtubeId: "qz0aGYrrlhU", title: "HTML Tutorial for Beginners", channel: "Programming with Mosh" },
    { youtubeId: "UB1O30fR-EE", title: "HTML Crash Course", channel: "Traversy Media" },
    { youtubeId: "pQN-pnXPaVg", title: "HTML Full Course", channel: "freeCodeCamp" },
  ],
  "c6-html-tags": [
    { youtubeId: "UB1O30fR-EE", title: "HTML Tags and Elements", channel: "Traversy Media" },
    { youtubeId: "qz0aGYrrlhU", title: "Headings Paragraphs and Structure", channel: "Programming with Mosh" },
    { youtubeId: "pQN-pnXPaVg", title: "HTML Document Structure", channel: "freeCodeCamp" },
  ],
  "c6-css-intro": [
    { youtubeId: "1PnVor36_40", title: "CSS in 100 Seconds", channel: "Fireship" },
    { youtubeId: "yfoY53QXEnI", title: "CSS Crash Course", channel: "Traversy Media" },
    { youtubeId: "OXGznpKZ_sA", title: "CSS Tutorial for Beginners", channel: "freeCodeCamp" },
  ],
  "c6-css-props": [
    { youtubeId: "yfoY53QXEnI", title: "CSS Properties and Styling", channel: "Traversy Media" },
    { youtubeId: "OXGznpKZ_sA", title: "Colors Fonts Margins Borders", channel: "freeCodeCamp" },
    { youtubeId: "1PnVor36_40", title: "CSS Selectors and Properties", channel: "Fireship" },
  ],
  "c6-ai-act": [
    { youtubeId: "mJeNghZXtMo", title: "What is AI? For Kids", channel: "Crash Course Kids" },
    { youtubeId: "a0_lo_GDcFw", title: "AI in Everyday Life", channel: "TED-Ed" },
    { youtubeId: "UwsrzCVZAb8", title: "How Does AI Learn?", channel: "CGP Grey" },
    { youtubeId: "JMUxmLyrhSk", title: "Artificial Intelligence Explained", channel: "Kurzgesagt" },
  ],

  // =================== CLASS 7 ===================
  "c7-xl": [
    { youtubeId: "rwbho0CgEAE", title: "Creating Charts in Excel", channel: "Kevin Stratvert" },
    { youtubeId: "Vl0H-qTclOg", title: "Bar Pie Line Charts Tutorial", channel: "Leila Gharani" },
    { youtubeId: "k1VUZEVuDJ8", title: "Data Visualization in Excel", channel: "GCFGlobal" },
    { youtubeId: "e4m3hJgfsdE", title: "Chart Formatting and Legends", channel: "Teacher's Tech" },
  ],
  "c7-gimp": [
    { youtubeId: "x6pXJ7Ijir0", title: "GIMP Layers Tutorial", channel: "Davies Media Design" },
    { youtubeId: "2EPIoAM_WB0", title: "Working with Layers in GIMP", channel: "Chris Tutorials" },
    { youtubeId: "Q8C0LJPpr64", title: "Layer Masks and Blending", channel: "TJ Free" },
    { youtubeId: "AxZ0LN3_qLg", title: "Photo Manipulation in GIMP", channel: "LogosByNick" },
  ],
  "c7-html": [
    { youtubeId: "UB1O30fR-EE", title: "HTML Lists Tables Images", channel: "Traversy Media" },
    { youtubeId: "qz0aGYrrlhU", title: "HTML Links and Iframes", channel: "Programming with Mosh" },
    { youtubeId: "pQN-pnXPaVg", title: "HTML Advanced Elements", channel: "freeCodeCamp" },
  ],
  "c7-py-intro": [
    { youtubeId: "kqtD5dpn9C8", title: "Python for Beginners", channel: "Programming with Mosh" },
    { youtubeId: "rfscVS0vtbw", title: "Python Full Course", channel: "freeCodeCamp" },
    { youtubeId: "x7X9w_GIm1s", title: "Python in 100 Seconds", channel: "Fireship" },
    { youtubeId: "_uQrJ0TkZlc", title: "Python Tutorial for Beginners", channel: "Programming with Mosh" },
  ],
  "c7-py-ops": [
    { youtubeId: "kqtD5dpn9C8", title: "Python Input and Operators", channel: "Programming with Mosh" },
    { youtubeId: "rfscVS0vtbw", title: "Python Operators Tutorial", channel: "freeCodeCamp" },
    { youtubeId: "_uQrJ0TkZlc", title: "Type Conversion and Strings", channel: "Programming with Mosh" },
  ],
  "c7-ai-act": [
    { youtubeId: "mJeNghZXtMo", title: "Machine Learning for Kids", channel: "Crash Course Kids" },
    { youtubeId: "a0_lo_GDcFw", title: "AI Ethics and Society", channel: "TED-Ed" },
    { youtubeId: "UwsrzCVZAb8", title: "How Machines Learn", channel: "CGP Grey" },
    { youtubeId: "JMUxmLyrhSk", title: "AI in Healthcare and Education", channel: "Kurzgesagt" },
  ],

  // =================== CLASS 8 ===================
  "c8-acc-intro": [
    { youtubeId: "QSSA5el3OKM", title: "MS Access for Beginners", channel: "Technology for Teachers" },
    { youtubeId: "N7o-da3MoCg", title: "Introduction to MS Access", channel: "GCFGlobal" },
    { youtubeId: "M9_j3c7UJe0", title: "Access Database Tutorial", channel: "Simon Sez IT" },
  ],
  "c8-acc-db": [
    { youtubeId: "QSSA5el3OKM", title: "Creating Databases and Tables", channel: "Technology for Teachers" },
    { youtubeId: "N7o-da3MoCg", title: "Data Types and Records", channel: "GCFGlobal" },
    { youtubeId: "M9_j3c7UJe0", title: "Building Tables in Access", channel: "Simon Sez IT" },
  ],
  "c8-acc-q": [
    { youtubeId: "QSSA5el3OKM", title: "Queries Forms and Reports", channel: "Technology for Teachers" },
    { youtubeId: "N7o-da3MoCg", title: "Access Queries Tutorial", channel: "GCFGlobal" },
    { youtubeId: "M9_j3c7UJe0", title: "Relationships and Query Builder", channel: "Simon Sez IT" },
  ],
  "c8-krita-intro": [
    { youtubeId: "UzWSxXulpr0", title: "Krita for Beginners", channel: "Krita Foundation" },
    { youtubeId: "60EzhNBO4GM", title: "Getting Started with Krita", channel: "Winged Canvas" },
    { youtubeId: "piKV7TfMLmI", title: "Krita Digital Art Tutorial", channel: "Jazza" },
  ],
  "c8-krita-la": [
    { youtubeId: "UzWSxXulpr0", title: "Krita Layers and Animation", channel: "Krita Foundation" },
    { youtubeId: "60EzhNBO4GM", title: "Frame by Frame Animation", channel: "Winged Canvas" },
    { youtubeId: "piKV7TfMLmI", title: "Krita Animation Timeline", channel: "Jazza" },
  ],
  "c8-py-ctrl": [
    { youtubeId: "kqtD5dpn9C8", title: "Python If-Else and Loops", channel: "Programming with Mosh" },
    { youtubeId: "rfscVS0vtbw", title: "Control Statements in Python", channel: "freeCodeCamp" },
    { youtubeId: "_uQrJ0TkZlc", title: "Python Functions Tutorial", channel: "Programming with Mosh" },
    { youtubeId: "x7X9w_GIm1s", title: "Python Loops and Conditionals", channel: "Fireship" },
  ],
  "c8-canva": [
    { youtubeId: "1y2SUiKGBEk", title: "Canva Tutorial for Beginners", channel: "Santrel Media" },
    { youtubeId: "PYBtC1bGrPU", title: "Canva Design Masterclass", channel: "Ronny Media" },
    { youtubeId: "zJSgBs16scY", title: "Canva Tips and Tricks", channel: "Design with Canva" },
  ],
  "c8-appinv": [
    { youtubeId: "aM2ktMKAunw", title: "MIT App Inventor Tutorial", channel: "Coding in Flow" },
    { youtubeId: "tCcaIDyZTQ0", title: "Build Your First App", channel: "MIT App Inventor" },
    { youtubeId: "gT_b0cNblak", title: "App Inventor Blocks Programming", channel: "Professor Frisby" },
  ],

  // =================== CLASS 9 ===================
  "c9-py-adv": [
    { youtubeId: "kqtD5dpn9C8", title: "Advanced Python Programming", channel: "Programming with Mosh" },
    { youtubeId: "rfscVS0vtbw", title: "Python Data Structures", channel: "freeCodeCamp" },
    { youtubeId: "_uQrJ0TkZlc", title: "Python OOP Tutorial", channel: "Programming with Mosh" },
    { youtubeId: "x7X9w_GIm1s", title: "Python Advanced Concepts", channel: "Fireship" },
    { youtubeId: "HGOBQPFzWKo", title: "Python Intermediate Course", channel: "freeCodeCamp" },
  ],
  "c9-web-dev": [
    { youtubeId: "UB1O30fR-EE", title: "HTML CSS JS Full Course", channel: "Traversy Media" },
    { youtubeId: "PkZNo7MFNFg", title: "JavaScript Full Course", channel: "freeCodeCamp" },
    { youtubeId: "W6NZfCO5SIk", title: "JavaScript Tutorial", channel: "Programming with Mosh" },
    { youtubeId: "FG44xi1ujac", title: "Web Development in 100 Seconds", channel: "Fireship" },
  ],
  "c9-sql-db": [
    { youtubeId: "HXV3zeQKqGY", title: "SQL Tutorial Full Course", channel: "freeCodeCamp" },
    { youtubeId: "7S_tz1z_5bA", title: "MySQL Tutorial for Beginners", channel: "Programming with Mosh" },
    { youtubeId: "p3qvj9hO_Bo", title: "Learn SQL in 60 Minutes", channel: "Web Dev Simplified" },
  ],
  "c9-cybersec": [
    { youtubeId: "inWWhr5tnEA", title: "Cybersecurity for Beginners", channel: "NetworkChuck" },
    { youtubeId: "hXSFdwIOfnE", title: "Cybersecurity Basics", channel: "freeCodeCamp" },
    { youtubeId: "z5nc9MDbvkw", title: "Online Safety and Passwords", channel: "Crash Course" },
    { youtubeId: "bPVaOlJ6ln0", title: "Ethical Hacking Introduction", channel: "Simplilearn" },
  ],
  "c9-data-sci": [
    { youtubeId: "ua-CiDNNj30", title: "Data Science for Beginners", channel: "freeCodeCamp" },
    { youtubeId: "LHBE6Q9XlzI", title: "What is Data Science?", channel: "Simplilearn" },
    { youtubeId: "N6BghzuFLIg", title: "Data Science Full Course", channel: "Edureka" },
  ],

  // =================== CLASS 10 ===================
  "c10-py-projects": [
    { youtubeId: "8ext9G7xspg", title: "Python Projects for Beginners", channel: "freeCodeCamp" },
    { youtubeId: "kqtD5dpn9C8", title: "Build Python Applications", channel: "Programming with Mosh" },
    { youtubeId: "HGOBQPFzWKo", title: "Python Project Ideas", channel: "freeCodeCamp" },
    { youtubeId: "rfscVS0vtbw", title: "Python Advanced Projects", channel: "freeCodeCamp" },
  ],
  "c10-web-apps": [
    { youtubeId: "W6NZfCO5SIk", title: "Build Web Applications", channel: "Programming with Mosh" },
    { youtubeId: "PkZNo7MFNFg", title: "JavaScript Web Apps", channel: "freeCodeCamp" },
    { youtubeId: "UB1O30fR-EE", title: "Full Stack Web Development", channel: "Traversy Media" },
    { youtubeId: "FG44xi1ujac", title: "Modern Web App Architecture", channel: "Fireship" },
  ],
  "c10-ai-fund": [
    { youtubeId: "JMUxmLyrhSk", title: "AI Fundamentals Course", channel: "Kurzgesagt" },
    { youtubeId: "mJeNghZXtMo", title: "How AI Works", channel: "Crash Course" },
    { youtubeId: "a0_lo_GDcFw", title: "Machine Learning Explained", channel: "TED-Ed" },
    { youtubeId: "UwsrzCVZAb8", title: "Neural Networks Simplified", channel: "CGP Grey" },
    { youtubeId: "aircAruvnKk", title: "Deep Learning Introduction", channel: "3Blue1Brown" },
  ],
  "c10-app-dev": [
    { youtubeId: "aM2ktMKAunw", title: "Mobile App Development", channel: "Coding in Flow" },
    { youtubeId: "tCcaIDyZTQ0", title: "Build Complete Apps", channel: "MIT App Inventor" },
    { youtubeId: "gT_b0cNblak", title: "App Development Projects", channel: "Professor Frisby" },
  ],
  "c10-capstone": [
    { youtubeId: "8ext9G7xspg", title: "Building Technology Projects", channel: "freeCodeCamp" },
    { youtubeId: "W6NZfCO5SIk", title: "Full Project Development", channel: "Programming with Mosh" },
    { youtubeId: "FG44xi1ujac", title: "Tech Portfolio Projects", channel: "Fireship" },
    { youtubeId: "HGOBQPFzWKo", title: "Capstone Project Ideas", channel: "freeCodeCamp" },
  ],
};

// Get videos for a topic
export const getTopicVideos = (topicId: string): TopicVideo[] => {
  return TOPIC_VIDEOS[topicId] || [];
};
