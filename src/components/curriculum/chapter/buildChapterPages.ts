// Derives a sequence of "chapter pages" from a topic content bundle.
// This is what powers the multi-page topic experience without requiring
// any per-topic content rewrite.

import type {
  TopicContentBundle,
  LearnBlock,
  ImageItem,
  ActivityItem,
  PracticeQuestion,
  QuizContent,
  LabContent,
  OverviewContent,
} from "@/lib/curriculum/types";

export type ChapterPage =
  | { kind: "overview"; title: string; emoji: string; data: OverviewContent }
  | {
      kind: "learn";
      title: string;
      emoji: string;
      block: LearnBlock;
      image?: ImageItem;
      callout?: { tone: "tip" | "important" | "fun"; text: string };
      isCode?: boolean;
    }
  | { kind: "video"; title: string; emoji: string }
  | { kind: "visual-recap"; title: string; emoji: string; items: ImageItem[] }
  | { kind: "activities"; title: string; emoji: string; items: ActivityItem[] }
  | { kind: "practice"; title: string; emoji: string; questions: PracticeQuestion[] }
  | { kind: "quiz"; title: string; emoji: string; quiz: QuizContent }
  | { kind: "lab"; title: string; emoji: string; lab: LabContent }
  | { kind: "recap"; title: string; emoji: string; objectives: string[]; summary: string };

// Light-touch tone picker — gives variety per learn page.
const TONES: Array<"tip" | "important" | "fun"> = ["fun", "tip", "important", "tip", "fun"];

const looksLikeCode = (b: LearnBlock): boolean => {
  const text = `${b.heading}\n${b.body}\n${(b.bullets ?? []).join("\n")}`;
  return /(\bprint\(|=IF\(|<\/?[a-z]+>|def\s|console\.log|for\s+\w+\s+in\b|while\s|\bint\(|=SUM\(|background-color)/i.test(
    text,
  );
};

export function buildChapterPages(
  bundle: Required<TopicContentBundle>,
  topicEmoji: string,
): ChapterPage[] {
  const pages: ChapterPage[] = [];

  // 1. Overview / hook
  pages.push({
    kind: "overview",
    title: "Overview",
    emoji: "📖",
    data: bundle.overview,
  });

  // 2..N. One page per learn block, with the next image inlined.
  const images = [...(bundle.images?.items ?? [])];
  bundle.learn.blocks.forEach((block, i) => {
    const image = images.shift();
    const pickedTone = TONES[i % TONES.length];
    // Build a small contextual callout from a bullet, a fact, or the body.
    const calloutText =
      (block.bullets && block.bullets.length > 2 && block.bullets[block.bullets.length - 1]) ||
      undefined;
    pages.push({
      kind: "learn",
      title: block.heading || `Lesson ${i + 1}`,
      emoji: pickEmoji(block.heading) ?? topicEmoji,
      block,
      image,
      callout: calloutText
        ? { tone: pickedTone, text: calloutText }
        : undefined,
      isCode: looksLikeCode(block),
    });
  });

  // Leftover images → visual recap page.
  if (images.length > 0) {
    pages.push({
      kind: "visual-recap",
      title: "Visual Recap",
      emoji: "🖼️",
      items: images,
    });
  }

  // Watch & Learn — embedded YouTube video, before activities/practice
  pages.push({
    kind: "video",
    title: "Watch & Learn",
    emoji: "🎥",
  });


  // Activities
  if (bundle.activities.items.length > 0) {
    pages.push({
      kind: "activities",
      title: "Activity Time",
      emoji: "🎨",
      items: bundle.activities.items,
    });
  }

  // Practice
  if (bundle.practice.questions.length > 0) {
    pages.push({
      kind: "practice",
      title: "Practice",
      emoji: "✏️",
      questions: bundle.practice.questions,
    });
  }

  // Quiz
  if (bundle.quiz.questions.length > 0) {
    pages.push({
      kind: "quiz",
      title: "Chapter Quiz",
      emoji: "🏆",
      quiz: bundle.quiz,
    });
  }

  // Lab (optional)
  if (bundle.lab && bundle.lab.type !== "none") {
    pages.push({
      kind: "lab",
      title: "Coding Lab",
      emoji: "🧪",
      lab: bundle.lab,
    });
  }

  // Recap
  pages.push({
    kind: "recap",
    title: "Recap",
    emoji: "🧠",
    objectives: bundle.overview.objectives,
    summary: bundle.overview.summary,
  });

  return pages;
}

// Heuristic: try to lift an emoji from the heading itself.
function pickEmoji(heading?: string): string | undefined {
  if (!heading) return undefined;
  const m = heading.match(
    /(\p{Extended_Pictographic})/u,
  );
  return m?.[1];
}
