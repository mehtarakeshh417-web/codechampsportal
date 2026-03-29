import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/lib/quizData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trophy, CheckCircle2, XCircle, Brain, ArrowRight, RotateCcw } from "lucide-react";

interface Props {
  questions: QuizQuestion[];
  topicId: string;
  studentId: string | null;
  onComplete: () => void;
}

const TopicQuiz = ({ questions, topicId, studentId, onComplete }: Props) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const q = questions[currentQ];
  const isLast = currentQ === questions.length - 1;

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected!];
    setAnswers(newAnswers);
    setSelected(null);
    setConfirmed(false);

    if (isLast) {
      const score = newAnswers.filter((a, i) => a === questions[i].correctIndex).length;
      setShowResult(true);
      submitQuiz(newAnswers, score);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const submitQuiz = useCallback(async (finalAnswers: number[], score: number) => {
    if (!studentId || submitted) return;
    setSubmitted(true);
    const xpEarned = score * 20; // 20 XP per correct answer
    await supabase.from("quiz_attempts" as any).insert({
      student_id: studentId,
      topic_id: topicId,
      answers: finalAnswers,
      score,
      total_questions: questions.length,
      xp_earned: xpEarned,
    });
    if (xpEarned > 0) toast.success(`+${xpEarned} XP earned from quiz! 🎉`);
    onComplete();
  }, [studentId, topicId, questions.length, submitted, onComplete]);

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setConfirmed(false);
    setSubmitted(false);
  };

  const score = answers.filter((a, i) => a === questions[i].correctIndex).length;
  const percentage = Math.round((score / questions.length) * 100);

  if (showResult) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-primary/[0.12] overflow-hidden shadow-2xl shadow-black/30">
        <div className="bg-gradient-to-r from-primary/[0.1] via-secondary/[0.06] to-transparent px-8 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/15 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Quiz Results</h3>
              <p className="text-xs text-foreground/35 font-body">See how you did!</p>
            </div>
          </div>
        </div>
        <div className="p-8 bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--card)/0.8)] text-center space-y-6">
          <div className={`text-6xl font-display font-bold ${percentage >= 80 ? "text-neon-green" : percentage >= 50 ? "text-neon-orange" : "text-destructive"}`}>
            {score}/{questions.length}
          </div>
          <p className="text-foreground/50 font-body">
            {percentage >= 80 ? "Excellent work! 🌟" : percentage >= 50 ? "Good effort! Keep learning! 💪" : "Keep practicing! You'll get there! 📚"}
          </p>
          <p className="text-sm text-primary font-bold">+{score * 20} XP earned</p>
          <div className="space-y-3 text-left max-w-md mx-auto">
            {questions.map((qq, i) => (
              <div key={qq.id} className={`flex items-start gap-3 p-3 rounded-xl ${answers[i] === qq.correctIndex ? "bg-neon-green/[0.06] border border-neon-green/15" : "bg-destructive/[0.06] border border-destructive/15"}`}>
                {answers[i] === qq.correctIndex ? <CheckCircle2 className="w-5 h-5 text-neon-green shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />}
                <div className="text-sm">
                  <p className="text-foreground/70 font-body">{qq.question}</p>
                  {answers[i] !== qq.correctIndex && (
                    <p className="text-neon-green/70 text-xs mt-1">Correct: {qq.options[qq.correctIndex]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button onClick={handleRetry} variant="ghost" className="gap-2 text-foreground/40 hover:text-foreground">
            <RotateCcw className="w-4 h-4" /> Try Again
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-primary/[0.12] overflow-hidden shadow-2xl shadow-black/30">
      <div className="bg-gradient-to-r from-primary/[0.1] via-secondary/[0.06] to-transparent px-8 py-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/15 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Topic Quiz</h3>
              <p className="text-xs text-foreground/35 font-body">Test your knowledge and earn XP!</p>
            </div>
          </div>
          <span className="text-sm font-body font-bold text-foreground/30">{currentQ + 1}/{questions.length}</span>
        </div>
      </div>
      <div className="p-7 bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--card)/0.8)]">
        {/* Progress bar */}
        <div className="h-1.5 bg-white/[0.05] rounded-full mb-6 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <p className="text-foreground font-body text-base mb-6 leading-relaxed">{q.question}</p>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isCorrect = confirmed && i === q.correctIndex;
                const isWrong = confirmed && i === selected && i !== q.correctIndex;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 font-body text-sm ${
                      isCorrect
                        ? "bg-neon-green/[0.1] border-neon-green/30 text-neon-green"
                        : isWrong
                        ? "bg-destructive/[0.1] border-destructive/30 text-destructive"
                        : selected === i
                        ? "bg-primary/[0.1] border-primary/30 text-primary"
                        : "bg-white/[0.02] border-white/[0.06] text-foreground/60 hover:bg-white/[0.05] hover:border-white/[0.1]"
                    }`}
                  >
                    <span className="font-bold mr-3 text-foreground/30">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {isCorrect && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
                    {isWrong && <XCircle className="w-4 h-4 inline ml-2" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end mt-6">
          {!confirmed ? (
            <Button
              onClick={handleConfirm}
              disabled={selected === null}
              className="bg-gradient-to-r from-primary to-secondary text-white gap-2 rounded-xl disabled:opacity-30"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-primary to-secondary text-white gap-2 rounded-xl"
            >
              {isLast ? "See Results" : "Next"} <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TopicQuiz;
