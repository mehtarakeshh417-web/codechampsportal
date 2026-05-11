import { useEffect, useState } from "react";
import { Loader2, AlertCircle, RefreshCw, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  kind: "word" | "excel" | "powerpoint";
  label: string;
}

const OfficeLiveEditor = ({ kind, label }: Props) => {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("office-embed-url", { body: { kind } });
      if (error) throw error;
      if (!data?.embedUrl) throw new Error("No embed URL returned");
      setEmbedUrl(data.embedUrl);
      setWebUrl(data.webUrl ?? null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load editor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [kind]);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
        <Users className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
        <div className="text-xs text-amber-100/90 font-body leading-relaxed">
          <strong>Shared practice document.</strong> This is the real Microsoft {label} editor connected via your school's Microsoft 365 account. Everyone who opens this editor edits the <em>same</em> document — great for class demos, but not a private workspace.
        </div>
      </div>

      <div className="h-[650px] rounded-xl overflow-hidden border border-white/10 bg-white relative">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[hsl(220,30%,10%)] text-white/70">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm font-body">Loading {label} Online…</span>
          </div>
        )}
        {!loading && error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[hsl(220,30%,10%)] text-white p-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-sm font-body text-white/80 max-w-md">{error}</p>
            <p className="text-xs text-white/50 font-body max-w-md">
              The Microsoft {label} connector might not be linked, or anonymous sharing may be disabled in your OneDrive admin settings.
            </p>
            <Button size="sm" onClick={load} className="gap-1.5 mt-1">
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </Button>
          </div>
        )}
        {!loading && !error && embedUrl && (
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            title={`Microsoft ${label} Online`}
            allow="clipboard-read; clipboard-write"
          />
        )}
      </div>

      {webUrl && !error && (
        <div className="flex justify-end">
          <a href={webUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary/80 hover:text-primary font-body inline-flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> Open in new tab
          </a>
        </div>
      )}
    </div>
  );
};

export default OfficeLiveEditor;
