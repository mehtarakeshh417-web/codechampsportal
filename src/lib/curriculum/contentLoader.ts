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
 * Build "deep dive" extra learn blocks so every topic has more theory,
 * even when the per-topic content file is short. These are appended
 * after the topic's own learn blocks (or replace them entirely if the
 * topic has no content file yet).
 */
const buildDeepDiveBlocks = (topicId: string) => {
  const topic = getTopicById(topicId);
  const title = topic?.title ?? "this topic";
  const isJunior = (topic?.classNumber ?? 5) <= 4;

  return [
    {
      heading: `🔍 Going Deeper into ${title}`,
      body:
        `Now that we know the basics of ${title}, let us look a little closer. ` +
        `In computers and technology, almost every idea is built from smaller ideas put together. ` +
        `Understanding ${title} step by step makes it much easier to remember — and a lot more fun! ` +
        `Try to picture each part in your head as you read.`,
      bullets: [
        `${title} is used in everyday life more than most people realise.`,
        `Like all computer ideas, it follows clear rules — once you learn the rules, you can predict what will happen.`,
        `It connects with other topics you already know, making your learning grow like a tree 🌱.`,
        `Practising small examples is the fastest way to master ${title}.`,
      ],
    },
    {
      heading: `💡 Why ${title} Matters`,
      body: isJunior
        ? `${title} is something you will use again and again as you grow. From playing games to making art, this idea pops up everywhere! ` +
          `When you understand ${title}, computers feel less like magic and more like a clever friend that listens to you.`
        : `In real-world software and projects, ${title} is one of the building blocks that engineers reach for every single day. ` +
          `Strong understanding here will help you when you study more advanced subjects like programming, data, design and AI.`,
      bullets: [
        `Used in schools, offices and homes across the world.`,
        `Helps you solve real problems faster and more accurately.`,
        `Builds the foundation for ${isJunior ? "fun coding projects" : "advanced topics like algorithms, databases and AI"}.`,
      ],
    },
    {
      heading: `🧭 Tips to Remember ${title}`,
      body:
        `Here are some friendly tricks to help ${title} stick in your mind. ` +
        `Try them while reading and during the practice section.`,
      bullets: [
        `Say each new word out loud — it helps your brain remember.`,
        `Draw a small picture or flowchart of what you just learned.`,
        `Teach it to a friend or family member in your own words.`,
        `Try the practice and quiz pages — getting things wrong is part of learning!`,
      ],
    },
  ];
};

const richImagesForTopic = (topicId: string): ImagesContent => {
  const topic = getTopicById(topicId);
  const emoji = topic?.emoji ?? "💻";
  return {
    items: [
      { emoji, caption: `${topic?.title ?? "Lesson"} in action.` },
      { emoji: "🧠", caption: "Think it through — your brain is the best computer!" },
      { emoji: "👀", caption: "Look closely — small details matter." },
      { emoji: "🚀", caption: "Practice makes you faster and more confident." },
    ],
  };
};

/**
 * Load the entire topic bundle (used by the multi-page chapter view).
 * Sections that are missing fall back to placeholders so the UI is always
 * fully populated. Every bundle is also enriched with "deep dive" blocks
 * and extra images so the theory section never feels too short.
 */
export async function loadTopicBundle(topicId: string): Promise<Required<TopicContentBundle>> {
  const bundle = await loadBundle(topicId);
  const baseLearn   = (bundle.learn      ?? placeholderLearn(topicId))      as LearnContent;
  const baseImages  = (bundle.images     ?? placeholderImages())             as ImagesContent;
  const extraBlocks = buildDeepDiveBlocks(topicId);
  const extraImages = richImagesForTopic(topicId).items;

  return {
    overview:   (bundle.overview   ?? placeholderOverview(topicId))   as OverviewContent,
    learn:      { blocks: [...baseLearn.blocks, ...extraBlocks] }      as LearnContent,
    images:     { items: [...baseImages.items, ...extraImages] }       as ImagesContent,
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
