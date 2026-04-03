import { useState, useCallback } from "react";
import { FileText, Table2, Presentation, Wifi, RefreshCw, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const OFFICE_TABS = [
  {
    key: "docs",
    label: "Word",
    icon: FileText,
    color: "bg-blue-600",
    activeColor: "bg-blue-500",
    src: "https://docs.google.com/document/d/156t_m6J6M1X-C-l_n_Fm5y7_O0Z-8_8_Rz_Yq5k_K_Y/edit?rm=minimal",
  },
  {
    key: "sheets",
    label: "Excel",
    icon: Table2,
    color: "bg-green-700",
    activeColor: "bg-green-600",
    src: "https://docs.google.com/spreadsheets/d/1_9nd9_7C6fB0X5E2S-p9zM_vK1-5F0rZ0V_4aFv_k/edit?rm=minimal",
  },
  {
    key: "slides",
    label: "PowerPoint",
    icon: Presentation,
    color: "bg-orange-700",
    activeColor: "bg-orange-600",
    src: "https://docs.google.com/presentation/d/1Z_u8G-p7p_6e5p7rQ7rQ7rQ7rQ7rQ7rQ7rQ7rQ7rQ/edit?rm=minimal",
  },
] as const;

const OfficeSuiteLab = () => {
  const [activeTab, setActiveTab] = useState<string>("docs");
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const active = OFFICE_TABS.find((t) => t.key === activeTab) ?? OFFICE_TABS[0];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setLoading(true);
  };

  const handleReload = useCallback(() => {
    setLoading(true);
    setIframeKey((k) => k + 1);
  }, []);

  return (
    <div className="rounded-xl shadow-2xl overflow-hidden border border-white/10">
      {/* Desktop-app title bar */}
      <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-white/70 text-sm font-medium ml-2">Office Suite — Interactive Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
            <Wifi className="w-3 h-3" /> Lab Active
          </span>
          <Button size="sm" variant="ghost" onClick={handleReload} className="text-white/70 hover:text-white text-xs gap-1.5 bg-white/5 hover:bg-white/10">
            <RefreshCw className="w-3.5 h-3.5" /> Reload Editor
          </Button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-slate-800 flex border-b border-white/10">
        {OFFICE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all border-b-2 ${
                isActive
                  ? `${tab.activeColor} text-white border-white/40`
                  : "bg-transparent text-white/50 border-transparent hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Iframe editor */}
      <div className="bg-slate-950 relative" style={{ height: "900px" }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader className="w-8 h-8 text-primary animate-spin" />
              <span className="text-white/50 text-sm">Loading {active.label} editor…</span>
            </div>
          </div>
        )}
        <iframe
          key={`${active.key}-${iframeKey}`}
          src={active.src}
          width="100%"
          height="900px"
          frameBorder="0"
          className="border-0"
          title={`${active.label} Editor`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          onLoad={() => setLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
};

export default OfficeSuiteLab;
