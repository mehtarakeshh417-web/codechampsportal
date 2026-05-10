// Visual recap = a small gallery for any leftover images.
import type { ImageItem } from "@/lib/curriculum/types";
import ImageCard from "../blocks/ImageCard";

export default function VisualRecapPage({
  items,
  gradient,
}: {
  items: ImageItem[];
  gradient: string;
}) {
  return (
    <section className="space-y-5">
      <header>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
          🖼️ Visual Recap
        </h2>
        <p className="text-sm text-foreground/60">
          A quick look back at the visuals from this chapter.
        </p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <ImageCard key={i} item={it} gradient={gradient} />
        ))}
      </div>
    </section>
  );
}
