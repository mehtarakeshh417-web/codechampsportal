// Lazy per-topic, per-section content loader.
//
// Strategy:
//   1. Try to dynamically import a per-topic JSON module:
//        src/lib/curriculum/content/<classSlug>/<topicSlug>.ts
//      The module's default export should match TopicContentBundle.
//   2. If the module (or the requested section) does not exist,
//      fall back to a generated placeholder so the UI always renders.
//
// This keeps the dashboard payload tiny and lets us drop in real content
// per topic without touching any UI code.

import type {
  TopicContentBundle,
  TabKey,
  OverviewContent,
  LearnContent,
  ImagesContent,
  ActivitiesContent,
  PracticeContent,
  QuizContent,
  LabContent,
} from "./types";
import { getTopicById, inferLabType } from "./registry";

// Vite glob — every content file is registered but only fetched on demand.
const contentModules = import.meta.glob<{ default: TopicContentBundle }>(
  "./content/**/*.ts",
  { eager: false }
);

const cache = new Map<string, Promise<TopicContentBundle>>();

const loadBundle = (topicId: string): Promise<TopicContentBundle> => {
  if (cache.has(topicId)) return cache.get(topicId)!;
  const topic = getTopicById(topicId);
  if (!topic) {
    const empty = Promise.resolve<TopicContentBundle>({});
    cache.set(topicId, empty);
    return empty;
  }
  const key = `./content/${topic.classSlug}/${topic.topicSlug}.ts`;
  const importer = contentModules[key];
  const promise = importer
    ? importer().then((m) => m.default ?? {}).catch(() => ({} as TopicContentBundle))
    : Promise.resolve<TopicContentBundle>({});
  cache.set(topicId, promise);
  return promise;
};

// ---------- Placeholders ----------

const placeholderOverview = (topicId: string): OverviewContent => {
  const topic = getTopicById(topicId);
  return {
    summary: topic?.shortDescription || "Detailed lesson content is coming soon.",
    objectives: [
      `Understand the key idea of ${topic?.title ?? "this topic"}.`,
      "Try a small activity related to the topic.",
      "Take the practice questions and quiz to check your learning.",
    ],
    duration: "15-20 min",
    difficulty: topic && topic.classNumber >= 7 ? "intermediate" : "beginner",
  };
};

const placeholderLearn = (topicId: string): LearnContent => {
  const topic = getTopicById(topicId);
  return {
    blocks: [
      {
        heading: topic?.title ?? "Lesson",
        body:
          (topic?.shortDescription ?? "") +
          "\n\nDetailed lesson content for this topic will be added soon. " +
          "In the meantime, try the activities and quiz tabs.",
      },
    ],
  };
};

const placeholderImages = (): ImagesContent => ({ items: [] });

const placeholderActivities = (topicId: string): ActivitiesContent => {
  const topic = getTopicById(topicId);
  return {
    items: [
      {
        title: `Try it: ${topic?.title ?? "Activity"}`,
        steps: [
          "Read the overview tab.",
          "Discuss the topic with a friend or family member.",
          "Write down 3 things you learned.",
        ],
        expectedOutcome: "You can explain the topic in your own words.",
      },
    ],
  };
};

const placeholderPractice = (): PracticeContent => ({
  questions: [
    {
      type: "tf",
      question: "Practice questions for this topic will be added soon.",
      answer: true,
      explanation: "This is a placeholder so the practice tab still works.",
    },
  ],
});

const placeholderQuiz = (): QuizContent => ({
  passScore: 60,
  questions: [
    {
      type: "mcq",
      question: "Quiz coming soon. Choose any option to continue.",
      options: ["Okay", "Sure", "Got it", "Cool"],
      answerIndex: 0,
      explanation: "Real quiz questions will be added soon.",
    },
  ],
});

const placeholderLab = (topicId: string): LabContent => {
  const topic = getTopicById(topicId);
  return { type: topic ? inferLabType(topic.title) : "none" };
};

const placeholderFor = (section: TabKey, topicId: string): NonNullable<TopicContentBundle[TabKey]> => {
  switch (section) {
    case "overview":   return placeholderOverview(topicId);
    case "learn":      return placeholderLearn(topicId);
    case "images":     return placeholderImages();
    case "activities": return placeholderActivities(topicId);
    case "practice":   return placeholderPractice();
    case "quiz":       return placeholderQuiz();
    case "lab":        return placeholderLab(topicId);
  }
};

/**
 * Load the entire topic bundle (used by the multi-page chapter view).
 * Sections that are missing fall back to placeholders so the UI is always
 * fully populated.
 */
export async function loadTopicBundle(topicId: string): Promise<Required<TopicContentBundle>> {
  const bundle = await loadBundle(topicId);
  return {
    overview:   (bundle.overview   ?? placeholderOverview(topicId))   as OverviewContent,
    learn:      (bundle.learn      ?? placeholderLearn(topicId))      as LearnContent,
    images:     (bundle.images     ?? placeholderImages())             as ImagesContent,
    activities: (bundle.activities ?? placeholderActivities(topicId)) as ActivitiesContent,
    practice:   (bundle.practice   ?? placeholderPractice())           as PracticeContent,
    quiz:       (bundle.quiz       ?? placeholderQuiz())               as QuizContent,
    lab:        (bundle.lab        ?? placeholderLab(topicId))         as LabContent,
  };
}

/**
 * Load a single section of a topic. Returns real content if the topic
 * has a content module that defines the section, else a placeholder.
 */
export async function loadTopicSection<K extends TabKey>(
  topicId: string,
  section: K
): Promise<NonNullable<TopicContentBundle[K]>> {
  const bundle = await loadBundle(topicId);
  const value = bundle[section];
  if (value) return value as NonNullable<TopicContentBundle[K]>;
  return placeholderFor(section, topicId) as NonNullable<TopicContentBundle[K]>;
}
