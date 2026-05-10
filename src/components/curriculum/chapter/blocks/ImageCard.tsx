// Inline image card with caption + lightbox-on-click.
import { useState } from "react";
import { X } from "lucide-react";
import type { ImageItem } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

export default function ImageCard({
  item,
  gradient,
  size = "md",
}: {
  item: ImageItem;
  gradient?: string;
  size?: "md" | "lg";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <figure
        onClick={() => setOpen(true)}
        className={cn(
          "rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden cursor-zoom-in transition-transform hover:scale-[1.01]",
        )}
      >
        {item.src ? (
          <img
            src={item.src}
            alt={item.caption}
            loading="lazy"
            className={cn("w-full object-cover", size === "lg" ? "h-72" : "h-56")}
          />
        ) : (
          <div
            className={cn(
              "w-full flex items-center justify-center bg-gradient-to-br",
              gradient ?? "from-primary/15 to-secondary/15",
              size === "lg" ? "h-72 text-8xl" : "h-56 text-7xl",
            )}
          >
            <span aria-hidden>{item.emoji ?? "🖼️"}</span>
          </div>
        )}
        <figcaption className="px-4 py-3 text-xs sm:text-sm text-foreground/70 border-t border-white/5">
          {item.caption}
        </figcaption>
      </figure>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-3xl w-full text-center">
            {item.src ? (
              <img
                src={item.src}
                alt={item.caption}
                className="max-h-[80vh] mx-auto rounded-2xl"
              />
            ) : (
              <div className="text-[10rem] leading-none">{item.emoji ?? "🖼️"}</div>
            )}
            <p className="text-white/80 mt-4 text-sm">{item.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
