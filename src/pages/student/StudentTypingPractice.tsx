import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { supabase } from "@/integrations/supabase/client";
import { Keyboard, RotateCcw, Trophy, Timer, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const passages: Record<string, string[]> = {
  "Class 1": [
    "The cat sat on the mat.",
    "I like to play with my dog.",
    "The sun is bright and warm.",
  ],
  "Class 2": [
    "A computer has a screen and a keyboard.",
    "We use a mouse to click on things.",
    "My teacher helps me learn new words.",
  ],
  "Class 3": [
    "Computers can help us draw pictures and write stories.",
    "The monitor shows us what the computer is doing.",
    "We should always shut down the computer properly.",
  ],
  "Class 4": [
    "A keyboard has many keys including letters and numbers.",
    "The internet helps us find information about many topics.",
    "We can use a computer to send messages to our friends.",
  ],
  "Class 5": [
    "Microsoft Word is used to create and edit documents. You can change fonts, add images, and format text.",
    "A spreadsheet uses rows and columns to organize data. Each box is called a cell.",
    "PowerPoint presentations can include slides with text, images, and animations.",
  ],
  "Class 6": [
    "HTML stands for HyperText Markup Language. It is used to create the structure of web pages using tags like <h1> and <p>.",
    "Python is a popular programming language known for its simple and readable syntax. Variables store data values.",
    "The internet is a global network of computers connected together to share information and resources.",
  ],
  "Class 7": [
    "In Python, a loop is used to repeat a block of code multiple times. The for loop iterates over a sequence of items.",
    "CSS stands for Cascading Style Sheets. It is used to style HTML elements with colors, fonts, and layouts.",
    "An algorithm is a step-by-step procedure for solving a problem. Flowcharts help visualize algorithms.",
  ],
  "Class 8": [
    "A function in programming is a reusable block of code that performs a specific task. Functions help organize code.",
    "Databases store organized collections of data. SQL is used to query and manage relational databases.",
    "Cybersecurity involves protecting computers and networks from unauthorized access and attacks.",
  ],
  "Class 9": [
    "Object-Oriented Programming uses classes and objects to model real-world entities. Key concepts include encapsulation, inheritance, and polymorphism.",
    "Data structures like arrays, linked lists, and trees organize data efficiently for different operations and algorithms.",
    "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
  ],
  "Class 10": [
    "Machine learning algorithms learn patterns from data to make predictions. Supervised learning uses labeled training data.",
    "Network protocols like TCP/IP define rules for data communication. HTTP is used for web browsing while SMTP handles email.",
    "import pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.describe())\nprint(df.head())",
  ],
};

const getPassageLevel = (className: string): string => {
  const match = className?.match(/\d+/);
  if (!match) return "Class 5";
  const num = parseInt(match[0]);
  return `Class ${Math.min(Math.max(num, 1), 10)}`;
};

const StudentTypingPractice = () => {
  const { user } = useAuth();
  const { students } = useData();
  const student = students.find((s) => s.user_id === user?.id);

  const level = getPassageLevel(user?.className || "Class 5");
  const levelPassages = passages[level] || passages["Class 5"];

  const [passage, setPassage] = useState("");
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [bestScores, setBestScores] = useState<any[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const pickPassage = useCallback(() => {
    setPassage(levelPassages[Math.floor(Math.random() * levelPassages.length)]);
  }, [levelPassages]);

  useEffect(() => { pickPassage(); }, [pickPassage]);

  // Load best scores
  useEffect(() => {
    if (!student) return;
    supabase
      .from("typing_scores")
      .select("*")
      .eq("student_id", student.id)
      .order("wpm", { ascending: false })
      .limit(5)
      .then(({ data }) => { if (data) setBestScores(data); });
  }, [student, finished]);

  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 200);
    }
    return () => clearInterval(timerRef.current);
  }, [started, finished, startTime]);

  const handleInput = (value: string) => {
    if (finished) return;
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setTyped(value);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === passage[i]) correct++;
    }
    const acc = value.length > 0 ? Math.round((correct / value.length) * 100) : 100;
    setAccuracy(acc);

    // Check completion
    if (value.length >= passage.length) {
      const dur = (Date.now() - startTime) / 1000;
      const words = passage.split(/\s+/).length;
      const calcWpm = Math.round((words / dur) * 60);
      setWpm(calcWpm);
      setFinished(true);
      clearInterval(timerRef.current);

      // Save score
      if (student) {
        supabase
          .from("typing_scores")
          .insert({
            student_id: student.id,
            wpm: calcWpm,
            accuracy: acc,
            duration: Math.round(dur),
            passage_level: level,
          })
          .then(({ error }) => {
            if (error) console.error("Save score error:", error);
            else toast.success(`Score saved! ${calcWpm} WPM`);
          });
      }
    } else {
      // Live WPM
      const dur = (Date.now() - startTime) / 1000;
      if (dur > 0) {
        const words = value.split(/\s+/).filter(Boolean).length;
        setWpm(Math.round((words / dur) * 60));
      }
    }
  };

  const reset = () => {
    setTyped("");
    setStarted(false);
    setFinished(false);
    setElapsed(0);
    setWpm(0);
    setAccuracy(100);
    pickPassage();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Render passage with colored characters
  const renderPassage = () => {
    return passage.split("").map((char, i) => {
      let color = "text-white/40";
      if (i < typed.length) {
        color = typed[i] === char ? "text-neon-green" : "text-red-400 bg-red-400/10";
      } else if (i === typed.length) {
        color = "text-white bg-white/10";
      }
      return (
        <span key={i} className={`${color} font-mono text-lg`}>
          {char === "\n" ? "↵\n" : char}
        </span>
      );
    });
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-2">
          <span className="text-gradient-brand">Typing Practice</span> ⌨️
        </h1>
        <p className="text-white/60 font-body mb-6">Level: {level} passages</p>
      </motion.div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: Zap, label: "WPM", value: wpm, color: "text-neon-green" },
          { icon: Target, label: "Accuracy", value: `${accuracy}%`, color: "text-neon-blue" },
          { icon: Timer, label: "Time", value: `${elapsed}s`, color: "text-neon-orange" },
        ].map((s) => (
          <motion.div key={s.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-4 text-center">
            <s.icon className={`w-6 h-6 mx-auto mb-1 ${s.color}`} />
            <div className="font-display text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-white/60 font-body">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Passage Display */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
        className="glass-card p-6 mb-4 neon-glow-blue">
        <div className="flex items-center gap-2 mb-3">
          <Keyboard className="w-5 h-5 text-primary" />
          <span className="font-display text-sm font-bold text-white">Type this passage:</span>
        </div>
        <div className="leading-relaxed whitespace-pre-wrap min-h-[60px]">{renderPassage()}</div>
      </motion.div>

      {/* Input Area */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <textarea
          ref={inputRef}
          value={typed}
          onChange={(e) => handleInput(e.target.value)}
          placeholder={finished ? "Press Reset to try again!" : "Start typing here..."}
          disabled={finished}
          className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono text-lg placeholder:text-white/20 outline-none focus:border-primary/50 resize-none"
          autoFocus
        />
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {finished && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-6 mt-4 neon-glow-green">
            <h3 className="font-display text-xl font-bold text-neon-green mb-3">🎉 Great job!</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-white">{wpm}</div>
                <div className="text-xs text-white/60">WPM</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-white">{accuracy}%</div>
                <div className="text-xs text-white/60">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-white">{elapsed}s</div>
                <div className="text-xs text-white/60">Time</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 mt-4">
        <Button onClick={reset} variant="outline" className="border-white/10 text-white hover:bg-white/5">
          <RotateCcw className="w-4 h-4 mr-2" /> Reset
        </Button>
      </div>

      {/* Best Scores */}
      {bestScores.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8">
          <h3 className="font-display text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-neon-orange" /> Your Best Scores
          </h3>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="text-left p-3">#</th>
                  <th className="text-left p-3">WPM</th>
                  <th className="text-left p-3">Accuracy</th>
                  <th className="text-left p-3">Duration</th>
                </tr>
              </thead>
              <tbody>
                {bestScores.map((s, i) => (
                  <tr key={s.id} className="border-b border-white/5">
                    <td className="p-3 text-white/60">{i + 1}</td>
                    <td className="p-3 font-bold text-neon-green">{s.wpm}</td>
                    <td className="p-3 text-white/80">{s.accuracy}%</td>
                    <td className="p-3 text-white/60">{s.duration}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};


export default StudentTypingPractice;
