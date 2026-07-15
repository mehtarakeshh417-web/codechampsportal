import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ZOHO_URL = "https://writer.zoho.com/writer/";

const ZohoWordEditor = () => {
  return (
    <div className="flex flex-col h-full min-h-[600px] w-full rounded-xl border border-primary/30 bg-background overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-primary/20 bg-muted/40">
        <span className="text-xs text-muted-foreground">
          Zoho Writer — sign in inside the frame to save your document.
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(ZOHO_URL, "_blank", "noopener,noreferrer")}
          className="h-7 gap-1"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open in new tab
        </Button>
      </div>
      <iframe
        src={ZOHO_URL}
        title="Zoho Writer"
        className="flex-1 w-full bg-white"
        allow="clipboard-read; clipboard-write; fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals"
      />
    </div>
  );
};

export default ZohoWordEditor;
