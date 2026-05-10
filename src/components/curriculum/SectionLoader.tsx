// Wrapper used by tab components: handles loading state + retry.
import { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadTopicSection } from "@/lib/curriculum/contentLoader";
import type { TopicContentBundle, TabKey } from "@/lib/curriculum/types";

interface Props<K extends TabKey> {
  topicId: string;
  section: K;
  children: (data: NonNullable<TopicContentBundle[K]>) => React.ReactNode;
}

export default function SectionLoader<K extends TabKey>({ topicId, section, children }: Props<K>) {
  const [data, setData] = useState<NonNullable<TopicContentBundle[K]> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(null);
    loadTopicSection(topicId, section)
      .then((d) => { if (!cancelled) setData(d); })
      .catch((e) => { if (!cancelled) setError(e?.message || "Failed to load."); });
    return () => { cancelled = true; };
  }, [topicId, section, reloadKey]);

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

  if (!data) {
    return (
      <div className="flex items-center justify-center py-16 text-foreground/40 gap-2 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading…
      </div>
    );
  }

  return <>{children(data)}</>;
}
