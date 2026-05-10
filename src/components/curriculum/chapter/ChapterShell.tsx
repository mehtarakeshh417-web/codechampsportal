// Multi-page chapter view. Replaces the tab-based topic page.
// - Loads the full bundle once via loadTopicBundle.
// - Derives a sequence of pages and renders only the active one.
// - Lab editor stays lazy via the existing LabPanel import.

import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, BookOpen, Loader2, RefreshCw, List, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { loadTopicBundle } from "@/lib/curriculum/contentLoader";
import type { TopicContentBundle, TopicMeta, ClassMeta } from "@/lib/curriculum/types";
import { buildChapterPages, type ChapterPage } from "./buildChapterPages";

import OverviewPage from "./pages/OverviewPage";
import LearnPage from "./pages/LearnPage";
import VisualRecapPage from "./pages/VisualRecapPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import RecapPage from "./pages/RecapPage";
import QuizEngine from "../QuizEngine";
import WatchAndLearn from "./blocks/WatchAndLearn";
import CelebrationOverlay from "./CelebrationOverlay";
import { useLocalGameState } from "../enhancements/useLocalGameState";
import { sounds } from "../enhancements/soundManager";
import XPCoinHUD from "../enhancements/XPCoinHUD";
import ChapterToolbar from "../enhancements/ChapterToolbar";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

const LabPanel = lazy(() => import("../LabPanel"));

interface Props {
  topic: TopicMeta;
  classMeta: ClassMeta;
  prev?: TopicMeta;
  next?: TopicMeta;
  isCompleted: boolean;
  onMarkComplete: () => void;
}

export default function ChapterShell({
  topic, classMeta, prev, next, isCompleted, onMarkComplete,
}: Props) {
  const navigate = useNavigate();
  const [bundle, setBundle] = useState<Required<TopicContentBundle> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const wasCompletedRef = useRef(isCompleted);
  const lastPageRef = useRef(0);

  // Kid-mode game state
  const { user } = useAuth();
  const { students } = useData();
  const studentId = students.find((s) => s.user_id === user?.id)?.id;
  const { state: g, update, addXP, earnBadge, touchStreak } = useLocalGameState(studentId);
  useEffect(() => { touchStreak(); }, [touchStreak]);

  // Trigger celebration when isCompleted flips from false → true
  useEffect(() => {
    if (!wasCompletedRef.current && isCompleted) {
      setCelebrate(true);
      addXP(50);
      earnBadge("first-chapter");
      if (g.soundOn) sounds.fanfare();
    }
    wasCompletedRef.current = isCompleted;
  }, [isCompleted, addXP, earnBadge, g.soundOn]);

  // Load bundle when topic changes
  useEffect(() => {
    let cancelled = false;
    setBundle(null);
    setError(null);
    loadTopicBundle(topic.id)
      .then((b) => { if (!cancelled) setBundle(b); })
      .catch((e) => { if (!cancelled) setError(e?.message || "Failed to load chapter."); });
    return () => { cancelled = true; };
  }, [topic.id, reloadKey]);

  const pages = useMemo<ChapterPage[]>(
    () => (bundle ? buildChapterPages(bundle, topic.emoji) : []),
    [bundle, topic.emoji],
  );

  // Swipe gesture (mobile)
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 60) return;
    if (dx < 0) setPageIdx((i) => Math.min(pages.length - 1, i + 1));
    else setPageIdx((i) => Math.max(0, i - 1));
  };

  // Keyboard nav (← / →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") setPageIdx((i) => Math.min(pages.length - 1, i + 1));
      if (e.key === "ArrowLeft") setPageIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages.length]);

  // Reset to page 1 on topic change, sync hash on page change
  useEffect(() => {
    const fromHash = parseInt(window.location.hash.replace(/^#p=/, ""), 10);
    setPageIdx(Number.isFinite(fromHash) && fromHash > 0 ? fromHash - 1 : 0);
  }, [topic.id]);

  useEffect(() => {
    if (pages.length === 0) return;
    const safe = Math.min(pageIdx, pages.length - 1);
    if (safe !== pageIdx) setPageIdx(safe);
    history.replaceState(null, "", `#p=${safe + 1}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setNavOpen(false);
    // Award XP for advancing to a new page (forward only, once per visit)
    if (safe > lastPageRef.current) {
      addXP(5);
      if (g.soundOn) sounds.whoosh();
    }
    lastPageRef.current = safe;
  }, [pageIdx, pages.length, addXP, g.soundOn]);

  const learnPagesTotal = useMemo(
    () => pages.filter((p) => p.kind === "learn").length,
    [pages],
  );

  const goToLab = useCallback(() => {
    const labIdx = pages.findIndex((p) => p.kind === "lab");
    if (labIdx >= 0) setPageIdx(labIdx);
  }, [pages]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6 text-center">
        <p className="text-sm text-red-300 mb-3">{error}</p>
        <Button size="sm" variant="outline" onClick={() => setReloadKey((k) => k + 1)} className="gap-2">
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </Button>
      </div>
    );
  }

  if (!bundle || pages.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-foreground/50 gap-2 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" /> Opening chapter…
      </div>
    );
  }

  const current = pages[pageIdx];
  const progressPct = Math.round(((pageIdx + 1) / pages.length) * 100);
  const learnSeen = pages
    .slice(0, pageIdx + 1)
    .filter((p) => p.kind === "learn").length;

  return (
    <div
      className="relative space-y-5"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient decorative blobs (purely visual) */}
      <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 w-72 h-72 ambient-blob bg-primary/30" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -right-16 w-80 h-80 ambient-blob bg-secondary/25" style={{ animationDelay: "-6s" }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 w-72 h-72 ambient-blob bg-accent/20" style={{ animationDelay: "-3s" }} />

      <CelebrationOverlay
        open={celebrate}
        onClose={() => setCelebrate(false)}
        title={`${topic.title} ✓`}
        subtitle="+50 XP · Chapter mastered"
        badgeLabel={`${classMeta.className} Chapter Champion`}
        gradient={classMeta.gradient}
      />

      {/* Sticky chapter header */}
      <div className="sticky top-0 z-20 -mx-2 px-2 py-3 bg-background/85 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNavOpen((v) => !v)}
            className="lg:hidden w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-foreground/70"
            aria-label="Open chapter index"
          >
            {navOpen ? <X className="w-4 h-4" /> : <List className="w-4 h-4" />}
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] uppercase tracking-wider text-foreground/40 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" /> Page {pageIdx + 1} / {pages.length}
              <span className="text-foreground/30">·</span>
              <span className="truncate">{current.emoji} {current.title}</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full bg-gradient-to-r", classMeta.gradient)}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Game HUD */}
          <div className="hidden sm:block shrink-0">
            <XPCoinHUD xp={g.xp} coins={g.coins} streak={g.streakDays} />
          </div>
        </div>

        {/* Tools row */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="sm:hidden">
            <XPCoinHUD xp={g.xp} coins={g.coins} streak={g.streakDays} />
          </div>
          <div className="ml-auto">
            <ChapterToolbar
              theme={g.theme}
              soundOn={g.soundOn}
              focusMode={g.focusMode}
              dyslexic={g.dyslexicFont}
              onTheme={(t) => update({ theme: t })}
              onSound={(v) => { update({ soundOn: v }); if (v) sounds.ding(); }}
              onFocus={(v) => update({ focusMode: v })}
              onDyslexic={(v) => update({ dyslexicFont: v })}
            />
          </div>
        </div>

        {/* Mobile chapter index drawer */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="lg:hidden mt-3 rounded-2xl border border-white/10 bg-background/95 p-2 max-h-[60vh] overflow-y-auto"
            >
              <ChapterIndex
                pages={pages}
                pageIdx={pageIdx}
                onPick={(i) => setPageIdx(i)}
                gradient={classMeta.gradient}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-5">
        {/* Desktop chapter index */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24 glass-card p-2 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <div className="px-2 py-2 text-[11px] uppercase tracking-wider text-foreground/40 font-semibold">
              In this chapter
            </div>
            <ChapterIndex
              pages={pages}
              pageIdx={pageIdx}
              onPick={(i) => setPageIdx(i)}
              gradient={classMeta.gradient}
            />
          </div>
        </aside>

        {/* Page content */}
        <div className="chapter-main flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${topic.id}-${pageIdx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage(current, {
                topic,
                classMeta,
                next,
                isCompleted,
                onMarkComplete,
                learnSeen,
                learnPagesTotal,
                onTryInLab: goToLab,
                practiceQs: bundle.practice.questions,
              })}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              disabled={pageIdx === 0}
              onClick={() => setPageIdx((i) => Math.max(0, i - 1))}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            {pageIdx < pages.length - 1 ? (
              <Button
                onClick={() => setPageIdx((i) => Math.min(pages.length - 1, i + 1))}
                className={cn("gap-2 bg-gradient-to-r", classMeta.gradient)}
              >
                Next page <ChevronRight className="w-4 h-4" />
              </Button>
            ) : next ? (
              <Button
                onClick={() =>
                  navigate(`/dashboard/curriculum/${classMeta.classSlug}/${next.topicSlug}`)
                }
                className={cn("gap-2 bg-gradient-to-r", classMeta.gradient)}
              >
                Next chapter <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link to={`/dashboard/curriculum/${classMeta.classSlug}`}>
                  Back to class
                </Link>
              </Button>
            )}
          </div>

          {/* Topic-level prev/next */}
          {(prev || next) && (
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              {prev ? (
                <Link
                  to={`/dashboard/curriculum/${classMeta.classSlug}/${prev.topicSlug}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-3 py-2 truncate text-foreground/60"
                >
                  ← {prev.emoji} {prev.title}
                </Link>
              ) : <span />}
              {next ? (
                <Link
                  to={`/dashboard/curriculum/${classMeta.classSlug}/${next.topicSlug}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-3 py-2 truncate text-right text-foreground/60"
                >
                  {next.emoji} {next.title} →
                </Link>
              ) : <span />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChapterIndex({
  pages, pageIdx, onPick, gradient,
}: {
  pages: ChapterPage[];
  pageIdx: number;
  onPick: (i: number) => void;
  gradient: string;
}) {
  return (
    <div className="space-y-1">
      {pages.map((p, i) => {
        const active = i === pageIdx;
        return (
          <button
            key={i}
            onClick={() => onPick(i)}
            className={cn(
              "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-left transition-colors",
              active
                ? cn("text-white bg-gradient-to-r", gradient)
                : "text-foreground/65 hover:bg-white/5 hover:text-foreground",
            )}
          >
            <span className="text-sm shrink-0">{p.emoji}</span>
            <span className="flex-1 truncate">{p.title}</span>
            <span className="shrink-0 text-[10px] opacity-70">{i + 1}</span>
          </button>
        );
      })}
    </div>
  );
}

function renderPage(
  page: ChapterPage,
  ctx: {
    topic: TopicMeta;
    classMeta: ClassMeta;
    next?: TopicMeta;
    isCompleted: boolean;
    onMarkComplete: () => void;
    learnSeen: number;
    learnPagesTotal: number;
    onTryInLab: () => void;
    practiceQs: import("@/lib/curriculum/types").PracticeQuestion[];
  },
) {
  switch (page.kind) {
    case "overview":
      return (
        <OverviewPage
          data={page.data}
          topicTitle={ctx.topic.title}
          topicEmoji={ctx.topic.emoji}
          gradient={ctx.classMeta.gradient}
        />
      );
    case "learn":
      return (
        <LearnPage
          block={page.block}
          image={page.image}
          callout={page.callout}
          isCode={page.isCode}
          gradient={ctx.classMeta.gradient}
          pageNumber={ctx.learnSeen}
          totalLearnPages={ctx.learnPagesTotal}
          onTryInLab={page.isCode ? ctx.onTryInLab : undefined}
          recallQuestions={
            // Pair each learn page with up to 2 different practice qs
            ctx.practiceQs.slice(
              ((ctx.learnSeen - 1) * 2) % Math.max(1, ctx.practiceQs.length),
              ((ctx.learnSeen - 1) * 2) % Math.max(1, ctx.practiceQs.length) + 2,
            )
          }
        />
      );
    case "video":
      return (
        <WatchAndLearn
          topicId={ctx.topic.id}
          topicTitle={ctx.topic.title}
          topicEmoji={ctx.topic.emoji}
          classNumber={ctx.classMeta.classNumber}
          gradient={ctx.classMeta.gradient}
        />
      );
    case "visual-recap":
      return <VisualRecapPage items={page.items} gradient={ctx.classMeta.gradient} />;
    case "activities":
      return <ActivitiesPage items={page.items} />;
    case "practice":
      return (
        <div className="space-y-4">
          <header>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
              ✏️ Practice Time
            </h2>
            <p className="text-sm text-foreground/60">
              Quick questions to build confidence — no pressure.
            </p>
          </header>
          <QuizEngine questions={page.questions} mode="practice" />
        </div>
      );
    case "quiz":
      return (
        <div className="space-y-4">
          <header>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
              🏆 Chapter Quiz
            </h2>
            <p className="text-sm text-foreground/60">
              Pass to earn this chapter. You can retry as many times as you like.
            </p>
          </header>
          <QuizEngine
            questions={page.quiz.questions}
            mode="quiz"
            timerSeconds={page.quiz.timerSeconds}
            passScore={page.quiz.passScore}
            onComplete={(r) => {
              if (r.passed && !ctx.isCompleted) ctx.onMarkComplete();
            }}
          />
        </div>
      );
    case "lab":
      return (
        <div className="space-y-4">
          <header>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
              🧪 Coding Lab
            </h2>
            <p className="text-sm text-foreground/60">
              Try what you've learned in a real editor.
            </p>
          </header>
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-16 text-foreground/40 gap-2 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading editor…
              </div>
            }
          >
            <LabPanel
              labType={page.lab.type}
              starterCode={page.lab.starterCode}
              instructions={page.lab.instructions}
            />
          </Suspense>
        </div>
      );
    case "recap":
      return (
        <RecapPage
          summary={page.summary}
          objectives={page.objectives}
          gradient={ctx.classMeta.gradient}
          classSlug={ctx.classMeta.classSlug}
          next={ctx.next}
          isCompleted={ctx.isCompleted}
          onComplete={ctx.onMarkComplete}
        />
      );
  }
}
