// Reusable engine that renders MCQ / true-false / fill / short-answer questions.
// Used by both the Practice tab (untimed) and Quiz tab (timed + scored).

import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Timer, RotateCcw, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PracticeQuestion } from "@/lib/curriculum/types";

interface Props {
  questions: PracticeQuestion[];
  mode: "practice" | "quiz";
  timerSeconds?: number;
  passScore?: number;            // % required to pass (quiz mode)
  onComplete?: (result: { scorePct: number; passed: boolean }) => void;
}

type Answer = { value: string | number | boolean | null; checked: boolean; correct: boolean };

const isCorrect = (q: PracticeQuestion, value: Answer["value"]): boolean => {
  if (value === null || value === undefined) return false;
  switch (q.type) {
    case "mcq":   return value === q.answerIndex;
    case "tf":    return value === q.answer;
    case "fill":  return String(value).trim().toLowerCase() === q.answer.trim().toLowerCase();
    case "short": return String(value).trim().length > 0; // graded by self
  }
};

const QuizEngine = ({ questions, mode, timerSeconds, passScore = 60, onComplete }: Props) => {
  const [answers, setAnswers] = useState<Answer[]>(() =>
    questions.map(() => ({ value: null, checked: false, correct: false }))
  );
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    mode === "quiz" && timerSeconds ? timerSeconds : null
  );

  // Reset when questions change
  useEffect(() => {
    setAnswers(questions.map(() => ({ value: null, checked: false, correct: false })));
    setSubmitted(false);
    setSecondsLeft(mode === "quiz" && timerSeconds ? timerSeconds : null);
  }, [questions, mode, timerSeconds]);

  const submit = useCallback(() => {
    const next = answers.map((a, i) => ({
      ...a,
      checked: true,
      correct: isCorrect(questions[i], a.value),
    }));
    setAnswers(next);
    setSubmitted(true);
    const correctCount = next.filter((a) => a.correct).length;
    const scorePct = Math.round((correctCount / questions.length) * 100);
    onComplete?.({ scorePct, passed: scorePct >= passScore });
  }, [answers, questions, passScore, onComplete]);

  // Countdown
  useEffect(() => {
    if (secondsLeft === null || submitted) return;
    if (secondsLeft <= 0) { submit(); return; }
    const t = setTimeout(() => setSecondsLeft((s) => (s ?? 0) - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, submitted, submit]);

  const setAnswer = (i: number, value: Answer["value"]) => {
    if (submitted) return;
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? { ...a, value } : a)));
    if (mode === "practice") {
      // instant feedback for practice
      setAnswers((prev) =>
        prev.map((a, idx) =>
          idx === i ? { value, checked: true, correct: isCorrect(questions[i], value) } : a
        )
      );
    }
  };

  const reset = () => {
    setAnswers(questions.map(() => ({ value: null, checked: false, correct: false })));
    setSubmitted(false);
    setSecondsLeft(mode === "quiz" && timerSeconds ? timerSeconds : null);
  };

  const correctCount = answers.filter((a) => a.correct).length;
  const scorePct = Math.round((correctCount / questions.length) * 100);
  const passed = scorePct >= passScore;
  const allAnswered = answers.every((a) => a.value !== null && a.value !== "");

  return (
    <div className="space-y-5">
      {mode === "quiz" && secondsLeft !== null && !submitted && (
        <div className="flex items-center gap-2 text-sm font-mono px-3 py-2 rounded-lg bg-white/5 border border-white/10 w-fit">
          <Timer className="w-4 h-4 text-primary" />
          <span className="text-foreground">
            {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
          </span>
        </div>
      )}

      {questions.map((q, i) => (
        <QuestionCard
          key={i}
          index={i}
          question={q}
          answer={answers[i]}
          onChange={(v) => setAnswer(i, v)}
          locked={submitted}
        />
      ))}

      {mode === "quiz" && (
        <div className="flex flex-wrap items-center gap-3 pt-3">
          {!submitted ? (
            <Button onClick={submit} disabled={!allAnswered} className="gap-2">
              Submit Quiz <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={reset} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button>
          )}
          {!allAnswered && !submitted && (
            <span className="text-xs text-foreground/40">Answer all questions to submit.</span>
          )}
        </div>
      )}

      <AnimatePresence>
        {submitted && mode === "quiz" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-2xl p-6 border",
              passed
                ? "bg-neon-green/[0.08] border-neon-green/30"
                : "bg-amber-500/[0.08] border-amber-500/30"
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className={cn("w-6 h-6", passed ? "text-neon-green" : "text-amber-400")} />
              <h4 className="font-display text-lg font-bold text-foreground">
                {passed ? "Great work!" : "Keep practising!"}
              </h4>
            </div>
            <p className="text-sm text-foreground/70">
              You scored <strong>{scorePct}%</strong> ({correctCount}/{questions.length} correct).
              {passed
                ? " You passed this quiz."
                : ` You need ${passScore}% to pass — try again!`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QuestionCard = ({
  index,
  question,
  answer,
  onChange,
  locked,
}: {
  index: number;
  question: PracticeQuestion;
  answer: Answer;
  onChange: (v: Answer["value"]) => void;
  locked: boolean;
}) => {
  const showFeedback = answer.checked;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <p className="text-sm font-body text-foreground leading-relaxed">{question.question}</p>
      </div>

      {question.type === "mcq" && (
        <div className="grid gap-2 ml-10">
          {question.options.map((opt, i) => {
            const selected = answer.value === i;
            const isAnswer = i === question.answerIndex;
            return (
              <button
                key={i}
                disabled={locked}
                onClick={() => onChange(i)}
                className={cn(
                  "text-left text-sm px-4 py-2.5 rounded-xl border transition-all",
                  selected
                    ? showFeedback
                      ? answer.correct
                        ? "bg-neon-green/10 border-neon-green/40 text-foreground"
                        : "bg-red-500/10 border-red-500/40 text-foreground"
                      : "bg-primary/10 border-primary/40 text-foreground"
                    : showFeedback && isAnswer
                    ? "bg-neon-green/[0.06] border-neon-green/30 text-foreground/80"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] text-foreground/70"
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "tf" && (
        <div className="flex gap-2 ml-10">
          {[true, false].map((v) => {
            const selected = answer.value === v;
            return (
              <button
                key={String(v)}
                disabled={locked}
                onClick={() => onChange(v)}
                className={cn(
                  "px-4 py-2 rounded-xl border text-sm font-semibold transition-all",
                  selected
                    ? showFeedback
                      ? answer.correct
                        ? "bg-neon-green/10 border-neon-green/40"
                        : "bg-red-500/10 border-red-500/40"
                      : "bg-primary/10 border-primary/40"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
                )}
              >
                {v ? "True" : "False"}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "fill" && (
        <input
          disabled={locked}
          value={(answer.value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => answer.value && onChange(answer.value)}
          className="ml-10 w-full max-w-md px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-foreground focus:outline-none focus:border-primary/50"
          placeholder="Type your answer..."
        />
      )}

      {question.type === "short" && (
        <textarea
          disabled={locked}
          value={(answer.value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="ml-10 w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-foreground focus:outline-none focus:border-primary/50"
          placeholder="Write your answer..."
        />
      )}

      {showFeedback && question.type !== "short" && (
        <div className={cn("ml-10 mt-3 flex items-start gap-2 text-xs", answer.correct ? "text-neon-green" : "text-red-400")}>
          {answer.correct ? <CheckCircle2 className="w-4 h-4 mt-0.5" /> : <XCircle className="w-4 h-4 mt-0.5" />}
          <span>
            {answer.correct ? "Correct!" : "Not quite."}
            {"explanation" in question && question.explanation && <> {question.explanation}</>}
            {!answer.correct && question.type === "fill" && <> The answer is <strong>{question.answer}</strong>.</>}
          </span>
        </div>
      )}
      {showFeedback && question.type === "short" && (
        <p className="ml-10 mt-3 text-xs text-foreground/50 italic">
          Sample answer: {question.modelAnswer}
        </p>
      )}
    </div>
  );
};

export default QuizEngine;
