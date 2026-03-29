import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, MonitorPlay, Youtube, Maximize2 } from "lucide-react";
import type { TopicVideo } from "@/lib/topicVideos";

interface WatchAndLearnProps {
  videos: TopicVideo[];
  topicTitle: string;
}

const VideoCard = ({ video, index, onPlay }: { video: TopicVideo; index: number; onPlay: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="group relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-primary/30 bg-gradient-to-br from-[hsl(220,30%,11%)] to-[hsl(220,25%,9%)] shadow-xl hover:shadow-2xl hover:shadow-primary/[0.08] transition-all duration-500 cursor-pointer"
    onClick={onPlay}
  >
    {/* Thumbnail */}
    <div className="relative aspect-video overflow-hidden">
      <img
        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
        alt={video.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 group-hover:via-black/10 transition-all duration-500" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 w-14 h-14 rounded-full bg-red-500/25 blur-xl group-hover:bg-red-500/40 transition-all duration-500 animate-pulse" />
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-2xl shadow-red-500/30 group-hover:scale-110 group-hover:shadow-red-500/50 transition-all duration-400">
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </div>
        </div>
      </div>

      {/* Duration badge */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-lg px-2.5 py-1 flex items-center gap-1.5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Youtube className="w-3 h-3 text-red-400" />
        <span className="text-[10px] font-body font-bold text-white/90">YouTube</span>
      </div>
    </div>

    {/* Card content */}
    <div className="p-4">
      <h4 className="text-sm font-display font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
        {video.title}
      </h4>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-secondary/15 flex items-center justify-center">
          <MonitorPlay className="w-3 h-3 text-primary" />
        </div>
        <span className="text-xs font-body text-foreground/40">{video.channel}</span>
      </div>
    </div>

    {/* Hover glow */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02]" />
  </motion.div>
);

const VideoModal = ({ video, onClose }: { video: TopicVideo; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[hsl(220,30%,12%)] to-[hsl(220,25%,10%)] border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-sm font-display font-bold text-foreground/80 truncate max-w-md">{video.title}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/10 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-foreground/50" />
          </button>
        </div>

        {/* Video */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[hsl(220,30%,10%)] to-[hsl(220,25%,8%)] border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <MonitorPlay className="w-4 h-4 text-primary" />
            <span className="text-xs font-body text-foreground/50">{video.channel}</span>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-body text-foreground/40 hover:text-red-400 transition-colors"
          >
            <Maximize2 className="w-3 h-3" /> Open on YouTube
          </a>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const WatchAndLearn = ({ videos, topicTitle }: WatchAndLearnProps) => {
  const [activeVideo, setActiveVideo] = useState<TopicVideo | null>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 rounded-3xl overflow-hidden border border-primary/[0.12] shadow-2xl shadow-black/30"
      >
        {/* Section header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.08] via-primary/[0.06] to-neon-purple/[0.04]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--secondary)) 0%, transparent 50%)`
          }} />
          <div className="relative px-8 py-7 border-b border-white/[0.06]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-red-500/20 blur-lg animate-pulse" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/30 to-red-700/20 flex items-center justify-center shadow-xl shadow-red-500/15 border border-red-500/20">
                  <Youtube className="w-7 h-7 text-red-400" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  Watch & Learn
                  <span className="text-lg">🎬</span>
                </h3>
                <p className="text-xs text-foreground/35 font-body mt-0.5">
                  {videos.length} curated video{videos.length > 1 ? "s" : ""} to help you master this topic
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video grid */}
        <div className="p-6 bg-gradient-to-b from-[hsl(220,30%,9%)] to-[hsl(220,28%,8%)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video, i) => (
              <VideoCard
                key={video.youtubeId}
                video={video}
                index={i}
                onPlay={() => setActiveVideo(video)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Video player modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
};

export default WatchAndLearn;
