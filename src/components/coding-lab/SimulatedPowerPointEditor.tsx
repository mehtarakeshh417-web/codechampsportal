import { useState, useRef } from "react";
import {
  Plus, Trash2, Type, Square, Circle, Triangle, Image, Play,
  Bold, Italic, Undo, Redo, Save, Presentation, Minus,
  MousePointer
} from "lucide-react";

type SlideElement = {
  id: string;
  type: "text" | "shape" | "image";
  x: number; y: number; width: number; height: number;
  content?: string;
  shape?: "rect" | "circle" | "triangle";
  color?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
};

type Slide = { id: string; elements: SlideElement[]; bg: string };

const BG_COLORS = ["#1a1a2e", "#16213e", "#0f3460", "#533483", "#2b2d42", "#ffffff", "#f0f0f0", "#1e3a5f", "#c0392b", "#27ae60"];
const SHAPE_COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6", "#e67e22", "#1abc9c", "#ecf0f1"];

let idCounter = 0;
const uid = () => `el-${++idCounter}`;

const SimulatedPowerPointEditor = () => {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: "s1", bg: "#1a1a2e",
      elements: [
        { id: uid(), type: "text", x: 80, y: 100, width: 500, height: 60, content: "Welcome to CodeChamps", fontSize: 36, bold: true, color: "#ffffff" },
        { id: uid(), type: "text", x: 120, y: 200, width: 400, height: 40, content: "Click to add subtitle", fontSize: 20, color: "#cccccc" },
        { id: uid(), type: "shape", x: 250, y: 300, width: 120, height: 80, shape: "rect", color: "#3498db" },
      ],
    },
    {
      id: "s2", bg: "#0f3460",
      elements: [
        { id: uid(), type: "text", x: 100, y: 80, width: 500, height: 50, content: "Slide 2 — Add Content", fontSize: 28, bold: true, color: "#ffffff" },
      ],
    },
  ]);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [selectedElId, setSelectedElId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [dragging, setDragging] = useState<{ id: string; offX: number; offY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const activeSlide = slides[activeSlideIdx];
  const selectedEl = activeSlide?.elements.find((e) => e.id === selectedElId);
  const CANVAS_W = 700;
  const SLIDE_W = 960;
  const scale = CANVAS_W / SLIDE_W;
  const CANVAS_H = CANVAS_W * (9 / 16);

  const updateActiveSlide = (fn: (s: Slide) => Slide) => {
    setSlides((prev) => prev.map((s, i) => (i === activeSlideIdx ? fn(s) : s)));
  };

  const addSlide = () => {
    const ns: Slide = { id: `s${slides.length + 1}`, bg: "#1a1a2e", elements: [] };
    setSlides((p) => [...p, ns]);
    setActiveSlideIdx(slides.length);
    setSelectedElId(null);
  };

  const deleteSlide = () => {
    if (slides.length <= 1) return;
    setSlides((p) => p.filter((_, i) => i !== activeSlideIdx));
    setActiveSlideIdx(Math.max(0, activeSlideIdx - 1));
    setSelectedElId(null);
  };

  const addElement = (type: SlideElement["type"], extra?: Partial<SlideElement>) => {
    const el: SlideElement = {
      id: uid(), type, x: 100 + Math.random() * 200, y: 100 + Math.random() * 150,
      width: type === "text" ? 300 : 100, height: type === "text" ? 40 : 80,
      content: type === "text" ? "New text" : undefined,
      color: type === "shape" ? "#3498db" : "#ffffff",
      fontSize: 18, ...extra,
    };
    updateActiveSlide((s) => ({ ...s, elements: [...s.elements, el] }));
    setSelectedElId(el.id);
  };

  const updateElement = (id: string, updates: Partial<SlideElement>) => {
    updateActiveSlide((s) => ({ ...s, elements: s.elements.map((e) => (e.id === id ? { ...e, ...updates } : e)) }));
  };

  const deleteElement = () => {
    if (!selectedElId) return;
    updateActiveSlide((s) => ({ ...s, elements: s.elements.filter((e) => e.id !== selectedElId) }));
    setSelectedElId(null);
  };

  const handleMouseDown = (e: React.MouseEvent, elId: string) => {
    e.stopPropagation();
    setSelectedElId(elId);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const el = activeSlide.elements.find((e) => e.id === elId);
    if (!el) return;
    setDragging({ id: elId, offX: e.clientX - rect.left - el.x * scale, offY: e.clientY - rect.top - el.y * scale });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const newX = (e.clientX - rect.left - dragging.offX) / scale;
    const newY = (e.clientY - rect.top - dragging.offY) / scale;
    updateElement(dragging.id, { x: Math.max(0, newX), y: Math.max(0, newY) });
  };

  const tabs = [
    { key: "home", label: "Home" },
    { key: "insert", label: "Insert" },
    { key: "design", label: "Design" },
    { key: "transitions", label: "Transitions" },
    { key: "slideshow", label: "Slide Show" },
  ];

  return (
    <div className="flex flex-col h-[650px] bg-[#f3f3f3] rounded-xl border border-[#d4d4d4] overflow-hidden shadow-lg">
      {/* Title Bar - PowerPoint orange-red */}
      <div className="flex items-center h-8 bg-[#b7472a] px-3 gap-2">
        <Presentation className="w-4 h-4 text-white/90" />
        <span className="text-[11px] text-white font-body">Presentation1 — CodeChamps PowerPoint</span>
        <div className="ml-auto flex gap-0.5">
          <button className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded"><Undo className="w-3.5 h-3.5" /></button>
          <button className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded"><Redo className="w-3.5 h-3.5" /></button>
          <button className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded"><Save className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Ribbon Tabs */}
      <div className="flex items-center bg-[#b7472a] px-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-1.5 text-[11px] font-body transition-all ${
              activeTab === t.key ? "bg-[#f3f3f3] text-[#b7472a] rounded-t-md font-semibold" : "text-white/80 hover:text-white hover:bg-white/10"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Ribbon Content */}
      <div className="bg-[#f3f3f3] border-b border-[#d4d4d4] px-3 py-1.5 flex items-center gap-1 min-h-[50px] flex-wrap">
        {activeTab === "home" && (
          <>
            <button onClick={() => addElement("text")} className="flex flex-col items-center gap-0.5 px-2 py-1 rounded text-[#444] hover:bg-[#e8e8e8]">
              <Type className="w-4 h-4" /><span className="text-[10px]">Text Box</span>
            </button>
            <div className="w-px h-8 bg-[#d4d4d4] mx-1" />
            {selectedEl && (
              <>
                <button onClick={() => updateElement(selectedElId!, { bold: !selectedEl.bold })}
                  className={`p-1.5 rounded ${selectedEl.bold ? "bg-[#d4e7fa] text-[#b7472a]" : "text-[#444] hover:bg-[#e8e8e8]"}`}><Bold className="w-3.5 h-3.5" /></button>
                <button onClick={() => updateElement(selectedElId!, { italic: !selectedEl.italic })}
                  className={`p-1.5 rounded ${selectedEl.italic ? "bg-[#d4e7fa] text-[#b7472a]" : "text-[#444] hover:bg-[#e8e8e8]"}`}><Italic className="w-3.5 h-3.5" /></button>
                {selectedEl.type === "text" && (
                  <>
                    <div className="w-px h-6 bg-[#d4d4d4] mx-1" />
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateElement(selectedElId!, { fontSize: Math.max(8, (selectedEl.fontSize || 18) - 2) })} className="p-0.5 text-[#666] hover:text-[#333]"><Minus className="w-3 h-3" /></button>
                      <span className="text-[11px] text-[#333] w-5 text-center font-body">{selectedEl.fontSize}</span>
                      <button onClick={() => updateElement(selectedElId!, { fontSize: (selectedEl.fontSize || 18) + 2 })} className="p-0.5 text-[#666] hover:text-[#333]"><Plus className="w-3 h-3" /></button>
                    </div>
                  </>
                )}
                <div className="w-px h-6 bg-[#d4d4d4] mx-1" />
                <button onClick={deleteElement} className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
              </>
            )}
          </>
        )}
        {activeTab === "insert" && (
          <div className="flex items-center gap-1">
            <button onClick={() => addElement("text")} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-[#444] hover:bg-[#e8e8e8]"><Type className="w-5 h-5" /><span className="text-[10px]">Text Box</span></button>
            <button onClick={() => addElement("shape", { shape: "rect" })} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-[#444] hover:bg-[#e8e8e8]"><Square className="w-5 h-5" /><span className="text-[10px]">Rectangle</span></button>
            <button onClick={() => addElement("shape", { shape: "circle", color: "#2ecc71" })} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-[#444] hover:bg-[#e8e8e8]"><Circle className="w-5 h-5" /><span className="text-[10px]">Circle</span></button>
            <button onClick={() => addElement("shape", { shape: "triangle", color: "#f1c40f" })} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-[#444] hover:bg-[#e8e8e8]"><Triangle className="w-5 h-5" /><span className="text-[10px]">Triangle</span></button>
            <button onClick={() => addElement("image")} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-[#444] hover:bg-[#e8e8e8]"><Image className="w-5 h-5" /><span className="text-[10px]">Picture</span></button>
          </div>
        )}
        {activeTab === "design" && (
          <div className="flex items-center gap-2 px-1">
            <span className="text-[11px] text-[#555] font-body">Slide Background:</span>
            {BG_COLORS.map((c) => (
              <button key={c} onClick={() => updateActiveSlide((s) => ({ ...s, bg: c }))}
                className={`w-7 h-7 rounded border-2 hover:scale-110 transition-transform ${activeSlide.bg === c ? "border-[#b7472a] shadow-md" : "border-[#d4d4d4]"}`}
                style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
        {activeTab === "transitions" && (
          <div className="flex items-center gap-2 px-1">
            {["None", "Fade", "Push", "Wipe", "Zoom", "Split"].map((t) => (
              <span key={t} className="px-3 py-1.5 rounded text-[11px] bg-white border border-[#d4d4d4] text-[#555] cursor-pointer hover:border-[#b7472a] hover:text-[#b7472a] transition-colors font-body">{t}</span>
            ))}
          </div>
        )}
        {activeTab === "slideshow" && (
          <button className="flex items-center gap-2 px-5 py-2 rounded bg-[#b7472a] text-white text-[11px] font-body font-medium hover:bg-[#a03d24] transition-colors shadow-sm">
            <Play className="w-4 h-4" /> From Beginning
          </button>
        )}
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Panel */}
        <div className="w-40 bg-[#f0f0f0] border-r border-[#d4d4d4] overflow-y-auto p-2 flex flex-col gap-2">
          {slides.map((s, i) => (
            <div key={s.id} onClick={() => { setActiveSlideIdx(i); setSelectedElId(null); }}
              className={`relative rounded-md overflow-hidden cursor-pointer border-2 transition-all aspect-[16/9] group ${
                i === activeSlideIdx ? "border-[#b7472a] shadow-lg" : "border-[#d4d4d4] hover:border-[#999]"
              }`} style={{ backgroundColor: s.bg }}>
              <div className="absolute top-0.5 left-1 text-[9px] text-white/50 font-body font-medium bg-black/30 px-1 rounded">{i + 1}</div>
              {s.elements.map((el) => (
                <div key={el.id} className="absolute" style={{
                  left: `${(el.x / 960) * 100}%`, top: `${(el.y / 540) * 100}%`,
                  width: `${(el.width / 960) * 100}%`, height: `${(el.height / 540) * 100}%`,
                }}>
                  {el.type === "text" && <div className="text-[4px] text-white/70 truncate">{el.content}</div>}
                  {el.type === "shape" && (
                    el.shape === "circle" ? <div className="w-full h-full rounded-full" style={{ backgroundColor: el.color }} />
                      : <div className="w-full h-full rounded-sm" style={{ backgroundColor: el.color }} />
                  )}
                </div>
              ))}
            </div>
          ))}
          <button onClick={addSlide} className="flex items-center justify-center gap-1 py-2.5 rounded-md border-2 border-dashed border-[#bbb] text-[#888] hover:text-[#555] hover:border-[#999] text-[11px] font-body transition-colors">
            <Plus className="w-3.5 h-3.5" /> New Slide
          </button>
          {slides.length > 1 && (
            <button onClick={deleteSlide} className="flex items-center justify-center gap-1 py-1.5 rounded text-[10px] text-red-500 hover:bg-red-50 font-body">
              <Trash2 className="w-3 h-3" /> Delete Slide
            </button>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#e0e0e0] flex items-center justify-center p-4 overflow-auto">
          <div ref={canvasRef} className="relative rounded-md shadow-2xl cursor-crosshair select-none border border-[#bbb]"
            style={{ width: CANVAS_W, height: CANVAS_H, backgroundColor: activeSlide.bg }}
            onClick={() => setSelectedElId(null)}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setDragging(null)}
            onMouseLeave={() => setDragging(null)}>
            {activeSlide.elements.map((el) => {
              const isSelected = el.id === selectedElId;
              return (
                <div key={el.id}
                  className={`absolute cursor-move ${isSelected ? "ring-2 ring-[#b7472a] ring-offset-1 ring-offset-transparent" : "hover:ring-1 hover:ring-white/30"}`}
                  style={{ left: el.x * scale, top: el.y * scale, width: el.width * scale, height: el.height * scale }}
                  onMouseDown={(e) => handleMouseDown(e, el.id)}
                  onClick={(e) => e.stopPropagation()}>
                  {el.type === "text" && (
                    <div contentEditable suppressContentEditableWarning className="w-full h-full outline-none"
                      style={{ color: el.color || "#fff", fontSize: (el.fontSize || 18) * scale, fontWeight: el.bold ? "bold" : "normal", fontStyle: el.italic ? "italic" : "normal", lineHeight: 1.3 }}
                      onInput={(e) => updateElement(el.id, { content: (e.target as HTMLDivElement).textContent || "" })}>
                      {el.content}
                    </div>
                  )}
                  {el.type === "shape" && (
                    <>
                      {el.shape === "circle" ? <div className="w-full h-full rounded-full shadow-md" style={{ backgroundColor: el.color }} />
                        : el.shape === "triangle" ? <svg viewBox="0 0 100 100" className="w-full h-full"><polygon points="50,5 95,95 5,95" fill={el.color} /></svg>
                        : <div className="w-full h-full rounded-sm shadow-md" style={{ backgroundColor: el.color }} />}
                      {isSelected && (
                        <div className="absolute -bottom-7 left-0 flex gap-1 bg-white rounded shadow-md p-1">
                          {SHAPE_COLORS.map((c) => (
                            <button key={c} onClick={() => updateElement(el.id, { color: c })}
                              className="w-4 h-4 rounded-full border border-[#ddd] hover:scale-125 transition-transform" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {el.type === "image" && (
                    <div className="w-full h-full border-2 border-dashed border-white/30 rounded flex items-center justify-center">
                      <Image className="w-6 h-6 text-white/30" />
                    </div>
                  )}
                  {isSelected && (
                    <>
                      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#b7472a] rounded-full border border-white" />
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#b7472a] rounded-full border border-white" />
                      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#b7472a] rounded-full border border-white" />
                      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#b7472a] rounded-full border border-white" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Properties Panel */}
        {selectedEl && (
          <div className="w-52 bg-[#f5f5f5] border-l border-[#d4d4d4] p-3 overflow-y-auto">
            <h4 className="text-[11px] text-[#555] font-body font-semibold mb-3 uppercase tracking-wider">Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-[#888] font-body">Type</label>
                <p className="text-[11px] text-[#333] capitalize font-body">{selectedEl.type}</p>
              </div>
              <div>
                <label className="text-[10px] text-[#888] font-body">Position</label>
                <p className="text-[11px] text-[#555] font-body">X: {Math.round(selectedEl.x)} &nbsp; Y: {Math.round(selectedEl.y)}</p>
              </div>
              <div>
                <label className="text-[10px] text-[#888] font-body">Size</label>
                <p className="text-[11px] text-[#555] font-body">W: {selectedEl.width} &nbsp; H: {selectedEl.height}</p>
              </div>
              {selectedEl.type === "text" && (
                <div>
                  <label className="text-[10px] text-[#888] font-body">Font Size</label>
                  <div className="flex items-center gap-1 mt-1">
                    <button onClick={() => updateElement(selectedElId!, { fontSize: Math.max(8, (selectedEl.fontSize || 18) - 2) })}
                      className="p-0.5 text-[#666] hover:text-[#333] hover:bg-[#e8e8e8] rounded"><Minus className="w-3 h-3" /></button>
                    <span className="text-[11px] text-[#333] w-6 text-center font-body">{selectedEl.fontSize}</span>
                    <button onClick={() => updateElement(selectedElId!, { fontSize: (selectedEl.fontSize || 18) + 2 })}
                      className="p-0.5 text-[#666] hover:text-[#333] hover:bg-[#e8e8e8] rounded"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#b7472a] flex items-center px-3 justify-between">
        <span className="text-[10px] text-white/80 font-body">Slide {activeSlideIdx + 1} of {slides.length}</span>
        <span className="text-[10px] text-white/60 font-body">Click + drag to move elements • Click canvas to deselect</span>
      </div>
    </div>
  );
};

export default SimulatedPowerPointEditor;
