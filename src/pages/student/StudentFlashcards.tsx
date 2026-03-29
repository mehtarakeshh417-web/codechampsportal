import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { getTopicTextbook } from "@/lib/class5Content";
import { RotateCcw, ChevronLeft, ChevronRight, Check, X, Layers, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Flashcard {
  term: string;
  definition: string;
  topicTitle: string;
  subjectTitle: string;
}

const StudentFlashcards = () => {
  const { user } = useAuth();
  const curriculum = useMemo(() => getCurriculumForClass(user?.className || ""), [user?.className]);

  // Extract flashcards from all topics' keyTerms
  const allCards = useMemo(() => {
    if (!curriculum) return [];
    const cards: Flashcard[] = [];
    for (const subject of curriculum.subjects) {
      for (const topic of subject.topics) {
        const textbook = getTopicTextbook(topic.id);
        if (!textbook) continue;
        for (const page of textbook.pages) {
          for (const section of page.sections) {
            if (section.keyTerms) {
              for (const kt of section.keyTerms) {
                cards.push({
                  term: kt.term,
                  definition: kt.definition,
                  topicTitle: topic.title,
                  subjectTitle: subject.title,
                });
              }
            }
          }
        }
      }
    }
    return cards;
  }, [curriculum]);

  // Get unique subjects for filtering
  const subjects = useMemo(() => {
    if (!curriculum) return [];
    return curriculum.subjects.map((s) => ({ id: s.id, title: s.title }));
  }, [curriculum]);

  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [studyAgainCards, setStudyAgainCards] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState(0);

  const filteredCards = useMemo(() => {
    if (selectedSubject === "all") return allCards;
    return allCards.filter((c) => {
      const subj = curriculum?.subjects.find((s) => s.id === selectedSubject);
      return subj && c.subjectTitle === subj.title;
    });
  }, [allCards, selectedSubject, curriculum]);

  const currentCard = filteredCards[currentIndex];
  const totalCards = filteredCards.length;

  const goNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      setDirection(1);
      setFlipped(false);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalCards]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setFlipped(false);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const markKnown = () => {
    setKnownCards((prev) => new Set(prev).add(currentIndex));
    studyAgainCards.delete(currentIndex);
    goNext();
  };

  const markStudyAgain = () => {
    setStudyAgainCards((prev) => new Set(prev).add(currentIndex));
    knownCards.delete(currentIndex);
    goNext();
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setKnownCards(new Set());
    setStudyAgainCards(new Set());
  };

  if (totalCards === 0) {
    return (
      <div className="text-center py-24">
        <Layers className="w-16 h-16 text-white/15 mx-auto mb-4" />
        <h2 className="font-display text-xl text-white/50 mb-2">No Flashcards Available</h2>
        <p className="text-white/30 font-body text-sm">Study some topics first — flashcards are generated from curriculum key terms.</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-2">
          <span className="text-gradient-brand">Flashcards</span> 🃏
        </h1>
        <p className="text-white/60 font-body mb-6">Tap a card to flip it. Sort into "Know it" or "Study again".</p>
      </motion.div>

      {/* Subject Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setSelectedSubject("all"); setCurrentIndex(0); setFlipped(false); }}
          className={`px-4 py-2 rounded-xl text-sm font-body font-bold transition-all ${
            selectedSubject === "all" ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
          }`}
        >
          All ({allCards.length})
        </button>
        {subjects.map((s) => {
          const count = allCards.filter((c) => c.subjectTitle === s.title).length;
          if (count === 0) return null;
          return (
            <button
              key={s.id}
              onClick={() => { setSelectedSubject(s.id); setCurrentIndex(0); setFlipped(false); }}
              className={`px-4 py-2 rounded-xl text-sm font-body font-bold transition-all ${
                selectedSubject === s.id ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
              }`}
            >
              {s.title} ({count})
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            animate={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-sm font-body text-white/50 font-bold">{currentIndex + 1}/{totalCards}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="glass-card p-3 text-center">
          <div className="font-display text-xl font-bold text-neon-green">{knownCards.size}</div>
          <div className="text-[10px] text-white/50 font-body font-bold">Know it ✓</div>
        </div>
        <div className="glass-card p-3 text-center">
          <div className="font-display text-xl font-bold text-neon-orange">{studyAgainCards.size}</div>
          <div className="text-[10px] text-white/50 font-body font-bold">Study again</div>
        </div>
        <div className="glass-card p-3 text-center">
          <div className="font-display text-xl font-bold text-white/70">{totalCards - knownCards.size - studyAgainCards.size}</div>
          <div className="text-[10px] text-white/50 font-body font-bold">Remaining</div>
        </div>
      </div>

      {/* Flashcard */}
      {currentCard && (
        <div className="flex justify-center mb-8" style={{ perspective: "1000px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ x: direction * 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setFlipped(!flipped)}
              className="cursor-pointer w-full max-w-md"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-64"
              >
                {/* Front */}
                <div
                  className="absolute inset-0 glass-card neon-glow-blue flex flex-col items-center justify-center p-8 text-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <BookOpen className="w-6 h-6 text-primary/50 mb-3" />
                  <h2 className="font-display text-2xl font-bold text-white mb-3">{currentCard.term}</h2>
                  <p className="text-white/30 text-xs font-body">{currentCard.subjectTitle} · {currentCard.topicTitle}</p>
                  <p className="text-white/20 text-[10px] font-body mt-4">Tap to reveal answer</p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 glass-card neon-glow-green flex flex-col items-center justify-center p-8 text-center"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <Sparkles className="w-6 h-6 text-neon-green/50 mb-3" />
                  <p className="font-body text-white/90 text-base leading-relaxed">{currentCard.definition}</p>
                  <p className="text-white/20 text-[10px] font-body mt-4">Tap to see term</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          onClick={goPrev}
          disabled={currentIndex === 0}
          variant="ghost"
          className="text-white/40 hover:text-white disabled:opacity-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          onClick={markStudyAgain}
          className="bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20 rounded-xl px-6"
        >
          <X className="w-4 h-4 mr-2" /> Study Again
        </Button>

        <Button
          onClick={markKnown}
          className="bg-neon-green/10 text-neon-green border border-neon-green/20 hover:bg-neon-green/20 rounded-xl px-6"
        >
          <Check className="w-4 h-4 mr-2" /> Know It
        </Button>

        <Button
          onClick={goNext}
          disabled={currentIndex >= totalCards - 1}
          variant="ghost"
          className="text-white/40 hover:text-white disabled:opacity-20"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Reset */}
      <div className="text-center">
        <Button onClick={resetAll} variant="ghost" className="text-white/30 hover:text-white/60">
          <RotateCcw className="w-4 h-4 mr-2" /> Reset All
        </Button>
      </div>
    </div>
  );
};

export default StudentFlashcards;
