import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle, Users } from "lucide-react";

// OnlyOffice public demo Document Server — for try-out / classroom use only.
// Documents are stored on the demo server and reset periodically.
const ONLYOFFICE_HOST = "https://onlinedocs.onlyoffice.com";
const API_JS = `${ONLYOFFICE_HOST}/web-apps/apps/api/documents/api.js`;
// Public sample XLSX shipped by OnlyOffice for the demo server
const SAMPLE_XLSX =
  "https://api.onlyoffice.com/content/img/docbuilder/examples/spreadsheet.xlsx";

declare global {
  interface Window {
    DocsAPI?: {
      DocEditor: new (id: string, config: Record<string, unknown>) => {
        destroyEditor: () => void;
      };
    };
  }
}

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load OnlyOffice API"));
    document.head.appendChild(s);
  });

const OnlyOfficeExcel = () => {
  const containerId = useRef(`onlyoffice-excel-${Math.random().toString(36).slice(2, 9)}`);
  const editorRef = useRef<{ destroyEditor: () => void } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadScript(API_JS);
        if (cancelled || !window.DocsAPI) return;
        // Stable shared key so all viewers join the same co-editing session
        const docKey = "codechamps-shared-excel-v1";
        editorRef.current = new window.DocsAPI.DocEditor(containerId.current, {
          documentType: "cell",
          width: "100%",
          height: "100%",
          document: {
            fileType: "xlsx",
            key: docKey,
            title: "Class Workbook.xlsx",
            url: SAMPLE_XLSX,
            permissions: { edit: true, download: true, print: true, comment: true },
          },
          editorConfig: {
            mode: "edit",
            lang: "en",
            customization: {
              autosave: true,
              forcesave: false,
              compactHeader: true,
              toolbarNoTabs: false,
              hideRightMenu: false,
            },
            user: {
              id: `user-${Math.random().toString(36).slice(2, 8)}`,
              name: "Class Member",
            },
          },
          events: {
            onAppReady: () => setLoading(false),
            onError: (e: { data?: string }) =>
              setError(e?.data || "OnlyOffice editor error"),
          },
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load OnlyOffice");
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
      try {
        editorRef.current?.destroyEditor();
      } catch {
        /* noop */
      }
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
        <Users className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
        <div className="text-xs text-amber-100/90 font-body leading-relaxed">
          <strong>Shared class workbook</strong> powered by OnlyOffice. Everyone opening this tab edits the <em>same</em> spreadsheet in real time. Note: this uses the public OnlyOffice demo server, so files may reset periodically.
        </div>
      </div>

      <div className="h-[650px] rounded-xl overflow-hidden border border-white/10 bg-white relative">
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[hsl(220,30%,10%)] text-white/70 z-10">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm font-body">Loading OnlyOffice Excel…</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[hsl(220,30%,10%)] text-white p-6 text-center z-10">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-sm font-body text-white/80 max-w-md">{error}</p>
          </div>
        )}
        <div id={containerId.current} className="w-full h-full" />
      </div>
    </div>
  );
};

export default OnlyOfficeExcel;
