const SimulatedKritaEditor = () => (
  <div className="flex flex-col h-[650px] bg-[hsl(220,20%,10%)] rounded-xl border border-white/10 overflow-hidden">
    <div className="flex items-center h-8 bg-[hsl(270,30%,20%)] px-3 gap-2 border-b border-white/10">
      <span className="text-xs text-white/80 font-body">Krita Digital Painting — Powered by KRESKA.art</span>
    </div>
    <iframe
      src="https://kreska.art/app/"
      className="flex-1 w-full border-0"
      title="Krita Digital Painting (KRESKA.art)"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads"
      loading="lazy"
    />
  </div>
);

export default SimulatedKritaEditor;
