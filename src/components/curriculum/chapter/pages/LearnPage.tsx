// A single learn page = one block from learn.blocks, with image + callout
// woven inline like a real textbook page.
import { motion } from "framer-motion";
import type { LearnBlock, ImageItem, PracticeQuestion } from "@/lib/curriculum/types";
import Callout from "../blocks/Callout";
import ImageCard from "../blocks/ImageCard";
import CodeCard from "../blocks/CodeCard";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ReadAloudButton from "../../enhancements/ReadAloudButton";
import QuickRecallCards from "../../enhancements/QuickRecallCards";

export default function LearnPage({
  block,
  image,
  callout,
  isCode,
  gradient,
  pageNumber,
  totalLearnPages,
  onTryInLab,
  recallQuestions,
}: {
  block: LearnBlock;
  image?: ImageItem;
  callout?: { tone: "tip" | "important" | "fun"; text: string };
  isCode?: boolean;
  gradient: string;
  pageNumber: number;
  totalLearnPages: number;
  onTryInLab?: () => void;
  recallQuestions?: PracticeQuestion[];
}) {
  // Filter out the callout text from bullets so it isn't repeated.
  const bullets = block.bullets?.filter((b) => b !== callout?.text);
  const paragraphs = block.body.split(/\n\n+/);
  const ttsText = `${block.heading}. ${block.body}. ${(bullets ?? []).join(". ")}`;

  return (
    <article className="space-y-6">
      {/* Heading band */}
      <motion.header
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-2xl border border-white/10 bg-gradient-to-r p-4 sm:p-5",
          gradient,
        )}
      >
        <div className="bg-black/35 -m-4 sm:-m-5 p-4 sm:p-5 rounded-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-1">
                Page {pageNumber} · of {totalLearnPages} lesson pages
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                {block.heading}
              </h2>
            </div>
            <ReadAloudButton text={ttsText} className="shrink-0" />
          </div>
        </div>
      </motion.header>

      {/* Body */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-4"
      >
        {isCode ? (
          <CodeCard
            body={paragraphs.join("\n\n")}
            bullets={bullets}
            onTryInLab={onTryInLab}
          />
        ) : (
          paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] text-foreground/85 leading-relaxed">
              {p}
            </p>
          ))
        )}
      </motion.div>

      {/* Inline image */}
      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <ImageCard item={image} gradient={gradient} size="md" />
        </motion.div>
      )}

      {/* Bullets as check-rows (when not rendered as code) */}
      {!isCode && bullets && bullets.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="grid sm:grid-cols-2 gap-2"
        >
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/85 leading-snug">{b}</span>
            </li>
          ))}
        </motion.ul>
      )}

      {/* Callout */}
      {callout && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <Callout tone={callout.tone} text={callout.text} />
        </motion.div>
      )}
    </article>
  );
}
