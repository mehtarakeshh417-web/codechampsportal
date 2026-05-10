// Shared types for the modular curriculum system.

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface ClassMeta {
  classNumber: number;          // 1..10
  classSlug: string;            // "class-1"
  className: string;            // "Class 1"
  emoji: string;
  description: string;
  gradient: string;             // tailwind gradient classes
  ageRange: string;             // "6-7 yrs"
}

export interface TopicMeta {
  id: string;                   // "class-1-computer-a-machine"
  classNumber: number;
  classSlug: string;            // "class-1"
  topicSlug: string;            // "computer-a-machine"
  title: string;
  emoji: string;
  shortDescription: string;
}

// ---------- Section content shapes ----------

export interface OverviewContent {
  summary: string;
  objectives: string[];
  duration: string;             // "20 min"
  difficulty: Difficulty;
}

export interface LearnBlock {
  heading: string;
  body: string;                 // markdown-lite (paragraphs separated by \n\n)
  bullets?: string[];
}
export interface LearnContent {
  blocks: LearnBlock[];
}

export interface ImageItem {
  emoji?: string;
  src?: string;
  caption: string;
}
export interface ImagesContent {
  items: ImageItem[];
}

export interface ActivityItem {
  title: string;
  steps: string[];
  expectedOutcome?: string;
}
export interface ActivitiesContent {
  items: ActivityItem[];
}

export type PracticeQuestion =
  | { type: "mcq"; question: string; options: string[]; answerIndex: number; explanation?: string }
  | { type: "tf"; question: string; answer: boolean; explanation?: string }
  | { type: "fill"; question: string; answer: string; explanation?: string }
  | { type: "short"; question: string; modelAnswer: string };

export interface PracticeContent {
  questions: PracticeQuestion[];
}

export interface QuizContent {
  timerSeconds?: number;        // optional countdown
  passScore: number;            // percentage 0-100
  questions: PracticeQuestion[];
}

export type LabType = "python" | "html" | "scratch" | "paint" | "sheets" | "word" | "none";
export interface LabContent {
  type: LabType;
  starterCode?: string;
  instructions?: string;
}

export interface TopicContentBundle {
  overview?: OverviewContent;
  learn?: LearnContent;
  images?: ImagesContent;
  activities?: ActivitiesContent;
  practice?: PracticeContent;
  quiz?: QuizContent;
  lab?: LabContent;
}

export type TabKey = keyof TopicContentBundle;
