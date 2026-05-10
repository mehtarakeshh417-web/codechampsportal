// "Watch & Learn" video card. Lazy embeds the YouTube iframe ONLY after
// the user clicks Play (or the card scrolls into view), so we don't ship
// the YouTube player on every chapter page.
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink, Youtube, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCuratedVideo, youtubeSearchUrl } from "@/lib/curriculum/topicVideos";

interface Props {
  topicId: string;
  topicTitle: string;
  topicEmoji: string;
  classNumber: number;
  gradient: string;
}

export default function WatchAndLearn({
  topicId, topicTitle, topicEmoji, classNumber, gradient,
}: Props) {
  const curated = getCuratedVideo(topicId);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Reveal animation when scrolled into view
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "100px" },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const searchUrl = youtubeSearchUrl(topicTitle, classNumber);
  const thumb = curated
    ? `https://i.ytimg.com/vi/${curated.videoId}/hqdefault.jpg`
    : null;

  return (
    <article ref={ref} className="space-y-4">
      <header className={cn(
        "rounded-2xl border border-white/10 bg-gradient-to-r p-4 sm:p-5 relative overflow-hidden",
        gradient,
      )}>
        <div className="bg-black/40 -m-4 sm:-m-5 p-4 sm:p-5 rounded-2xl">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70 mb-1">
            <Youtube className="w-3.5 h-3.5" /> Watch &amp; Learn
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
            🎥 {topicTitle}
          </h2>
          <p className="text-white/75 text-sm mt-1">
            A short, kid-safe video explanation to bring this lesson to life.
          </p>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl overflow-hidden border border-white/10 glass-card group"
      >
        <div className="relative aspect-video bg-black">
          {playing && curated ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${curated.videoId}?rel=0&modestbranding=1&autoplay=1`}
              title={curated.title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : thumb ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full group/play"
              aria-label={`Play ${curated?.title}`}
            >
              <img
                src={thumb}
                alt={curated?.title || topicTitle}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/play:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 group-hover/play:bg-red-500 flex items-center justify-center shadow-2xl shadow-red-600/50 transition-all group-hover/play:scale-110">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                </div>
              </div>
            </button>
          ) : (
            // Fallback "no curated video" hero
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br flex flex-col items-center justify-center text-center p-6",
              gradient,
            )}>
              <div className="text-6xl sm:text-7xl mb-3 drop-shadow-lg">{topicEmoji}</div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-white/90 text-[11px] uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" /> Educational video
              </div>
              <p className="text-white font-semibold text-base sm:text-lg max-w-md">
                Find a great explainer for "{topicTitle}" on YouTube.
              </p>
            </div>
          )}
        </div>

        {/* Meta + actions */}
        <div className="p-4 sm:p-5 space-y-3 bg-background/60">
          {curated ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground leading-snug truncate">
                    {curated.title}
                  </h3>
                  <p className="text-xs text-foreground/60 mt-0.5">
                    {curated.channel}{curated.duration ? ` · ${curated.duration}` : ""}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                  Educational
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {!playing && (
                  <Button size="sm" onClick={() => setPlaying(true)} className={cn("gap-2 bg-gradient-to-r", gradient)}>
                    <Play className="w-4 h-4 fill-current" /> Play video
                  </Button>
                )}
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={`https://www.youtube.com/watch?v=${curated.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open in YouTube
                  </a>
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-foreground/70">
                We don't have a curated video for this topic yet — but you can
                find safe, classroom-friendly explainers in one click.
              </p>
              <Button size="sm" asChild className={cn("gap-2 bg-gradient-to-r", gradient)}>
                <a href={searchUrl} target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-4 h-4" /> Search on YouTube
                </a>
              </Button>
            </>
          )}
        </div>
      </motion.div>

      <p className="text-[11px] text-foreground/50 text-center">
        Videos open from YouTube. Autoplay is off until you press Play.
      </p>
    </article>
  );
}
