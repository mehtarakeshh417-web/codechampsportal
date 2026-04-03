import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus, Type, Square, Circle, Image, Trash2, ChevronDown,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Palette, Move,
} from "lucide-react";

interface SlideElement {
  id: string;
  type: "text" | "rect" | "circle" | "image";
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  fill?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  color?: string;
}

interface Slide {
  id: string;
  elements: SlideElement[];
  background: string;
}

const createDefaultSlide = (index: number): Slide => ({
  id: `slide-${Date.now()}-${index}`,
  elements: [
    {
      id: `title-${Date.now()}`,
      type: "text",
      x: 80,
      y: 60,
      width: 500,
      height: 60,
      content: index === 0 ? "Click to add title" : `Slide ${index + 1}`,
      fontSize: 36,
      fontWeight: "bold",
      textAlign: "center",
      color: "#1a1a2e",
    },
    {
      id: `subtitle-${Date.now()}-2`,
      type: "text",
      x: 120,
      y: 150,
      width: 420,
      height: 40,
      content: index === 0 ? "Click to add subtitle" : "Add your content here",
      fontSize: 18,
      textAlign: "center",
      color: "#555",
    },
  ],
  background: "#ffffff",
});

const COLORS = ["#ffffff", "#f3f3f3", "#1a1a2e", "#16213e", "#0f3460", "#e94560", "#533483", "#2b9348", "#ff6700", "#ffb703"];

const PowerPointPro = () => {
  const [slides, setSlides] = useState<Slide[]>([createDefaultSlide(0)]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const current = slides[activeSlide];

  const addSlide = () => {
    setSlides((s) => [...s, createDefaultSlide(s.length)]);
    setActiveSlide(slides.length);
  };

  const deleteSlide = () => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== activeSlide);
    setSlides(newSlides);
    setActiveSlide(Math.min(activeSlide, newSlides.length - 1));
  };

  const addElement = (type: SlideElement["type"]) => {
    const el: SlideElement = {
      id: `el-${Date.now()}`,
      type,
      x: 200,
      y: 200,
      width: type === "text" ? 300 : 150,
      height: type === "text" ? 50 : type === "circle" ? 150 : 100,
      content: type === "text" ? "New text" : undefined,
      fill: type === "rect" ? "#0f3460" : type === "circle" ? "#e94560" : undefined,
      fontSize: 20,
      color: "#000",
      textAlign: "left",
    };
    setSlides((s) =>
      s.map((slide, i) => (i === activeSlide ? { ...slide, elements: [...slide.elements, el] } : slide))
    );
    setSelectedElement(el.id);
  };

  const deleteElement = () => {
    if (!selectedElement) return;
    setSlides((s) =>
      s.map((slide, i) =>
        i === activeSlide ? { ...slide, elements: slide.elements.filter((e) => e.id !== selectedElement) } : slide
      )
    );
    setSelectedElement(null);
  };

  const updateElement = (id: string, updates: Partial<SlideElement>) => {
    setSlides((s) =>
      s.map((slide, i) =>
        i === activeSlide
          ? { ...slide, elements: slide.elements.map((e) => (e.id === id ? { ...e, ...updates } : e)) }
          : slide
      )
    );
  };

  const handleMouseDown = (e: React.MouseEvent, elId: string) => {
    if (editing === elId) return;
    e.stopPropagation();
    setSelectedElement(elId);
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const el = current.elements.find((x) => x.id === elId);
    if (!el) return;
    setDragging({ id: elId, offsetX: e.clientX - rect.left - el.x, offsetY: e.clientY - rect.top - el.y });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const x = Math.max(0, e.clientX - rect.left - dragging.offsetX);
      const y = Math.max(0, e.clientY - rect.top - dragging.offsetY);
      updateElement(dragging.id, { x, y });
    },
    [dragging]
  );

  const handleMouseUp = useCallback(() => setDragging(null), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  const selEl = current.elements.find((e) => e.id === selectedElement);

  return (
    <div className="h-[900px] bg-[#f3f3f3] rounded-xl overflow-hidden border border-gray-300 flex flex-col">
      {/* Ribbon */}
      <div className="bg-white border-b border-gray-200 px-3 py-1.5 flex items-center gap-1 flex-wrap">
        <Button size="sm" variant="ghost" onClick={() => addElement("text")} className="text-xs gap-1 h-8 text-gray-700">
          <Type className="w-3.5 h-3.5" /> Text
        </Button>
        <Button size="sm" variant="ghost" onClick={() => addElement("rect")} className="text-xs gap-1 h-8 text-gray-700">
          <Square className="w-3.5 h-3.5" /> Rectangle
        </Button>
        <Button size="sm" variant="ghost" onClick={() => addElement("circle")} className="text-xs gap-1 h-8 text-gray-700">
          <Circle className="w-3.5 h-3.5" /> Circle
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        {selEl && (
          <>
            {selEl.type === "text" && (
              <>
                <Button size="sm" variant="ghost" onClick={() => updateElement(selEl.id, { fontWeight: selEl.fontWeight === "bold" ? "normal" : "bold" })} className={`h-8 w-8 p-0 ${selEl.fontWeight === "bold" ? "bg-gray-200" : ""}`}>
                  <Bold className="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => updateElement(selEl.id, { fontStyle: selEl.fontStyle === "italic" ? "normal" : "italic" })} className={`h-8 w-8 p-0 ${selEl.fontStyle === "italic" ? "bg-gray-200" : ""}`}>
                  <Italic className="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => updateElement(selEl.id, { textDecoration: selEl.textDecoration === "underline" ? "none" : "underline" })} className={`h-8 w-8 p-0 ${selEl.textDecoration === "underline" ? "bg-gray-200" : ""}`}>
                  <Underline className="w-3.5 h-3.5" />
                </Button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <Button size="sm" variant="ghost" onClick={() => updateElement(selEl.id, { textAlign: "left" })} className={`h-8 w-8 p-0 ${selEl.textAlign === "left" ? "bg-gray-200" : ""}`}>
                  <AlignLeft className="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => updateElement(selEl.id, { textAlign: "center" })} className={`h-8 w-8 p-0 ${selEl.textAlign === "center" ? "bg-gray-200" : ""}`}>
                  <AlignCenter className="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => updateElement(selEl.id, { textAlign: "right" })} className={`h-8 w-8 p-0 ${selEl.textAlign === "right" ? "bg-gray-200" : ""}`}>
                  <AlignRight className="w-3.5 h-3.5" />
                </Button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
              </>
            )}
            <div className="flex items-center gap-1">
              {COLORS.slice(0, 6).map((c) => (
                <button
                  key={c}
                  onClick={() => updateElement(selEl.id, selEl.type === "text" ? { color: c } : { fill: c })}
                  className="w-5 h-5 rounded border border-gray-300"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <Button size="sm" variant="ghost" onClick={deleteElement} className="text-xs gap-1 h-8 text-red-500">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </Button>
          </>
        )}
        <div className="flex-1" />
        <Button size="sm" variant="ghost" onClick={addSlide} className="text-xs gap-1 h-8 text-gray-700">
          <Plus className="w-3.5 h-3.5" /> New Slide
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnail sidebar */}
        <div className="w-[160px] bg-[#e8e8e8] border-r border-gray-300 overflow-y-auto p-2 space-y-2">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              onClick={() => { setActiveSlide(i); setSelectedElement(null); setEditing(null); }}
              className={`relative cursor-pointer rounded border-2 transition-all ${
                i === activeSlide ? "border-blue-500 shadow-md" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="aspect-video bg-white rounded-sm overflow-hidden p-1">
                <div className="w-full h-full relative" style={{ background: slide.background, fontSize: "4px" }}>
                  {slide.elements.map((el) => (
                    <div
                      key={el.id}
                      className="absolute overflow-hidden"
                      style={{
                        left: `${(el.x / 660) * 100}%`,
                        top: `${(el.y / 460) * 100}%`,
                        width: `${(el.width / 660) * 100}%`,
                        height: `${(el.height / 460) * 100}%`,
                        background: el.type !== "text" ? el.fill : undefined,
                        borderRadius: el.type === "circle" ? "50%" : undefined,
                        color: el.color,
                      }}
                    >
                      {el.type === "text" && (
                        <span className="leading-tight" style={{ fontSize: "inherit" }}>
                          {el.content}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <span className="absolute bottom-0.5 right-1 text-[9px] text-gray-500">{i + 1}</span>
            </div>
          ))}
        </div>

        {/* Main stage */}
        <div className="flex-1 overflow-auto flex items-start justify-center p-6 bg-[#e0e0e0]">
          <div
            ref={stageRef}
            className="relative shadow-xl"
            style={{
              width: 660,
              height: 460,
              background: current.background,
              cursor: dragging ? "grabbing" : "default",
            }}
            onClick={() => { setSelectedElement(null); setEditing(null); }}
          >
            {current.elements.map((el) => (
              <div
                key={el.id}
                className={`absolute group ${selectedElement === el.id ? "ring-2 ring-blue-500" : ""}`}
                style={{
                  left: el.x,
                  top: el.y,
                  width: el.width,
                  height: el.height,
                  cursor: dragging?.id === el.id ? "grabbing" : "grab",
                }}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                onDoubleClick={(e) => {
                  if (el.type === "text") {
                    e.stopPropagation();
                    setEditing(el.id);
                    setSelectedElement(el.id);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {el.type === "text" ? (
                  editing === el.id ? (
                    <textarea
                      autoFocus
                      value={el.content || ""}
                      onChange={(e) => updateElement(el.id, { content: e.target.value })}
                      onBlur={() => setEditing(null)}
                      className="w-full h-full bg-transparent border-none outline-none resize-none p-1"
                      style={{
                        fontSize: el.fontSize,
                        fontWeight: el.fontWeight,
                        fontStyle: el.fontStyle as any,
                        textDecoration: el.textDecoration,
                        textAlign: el.textAlign as any,
                        color: el.color,
                        fontFamily: "'Calibri', sans-serif",
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full p-1 whitespace-pre-wrap"
                      style={{
                        fontSize: el.fontSize,
                        fontWeight: el.fontWeight,
                        fontStyle: el.fontStyle as any,
                        textDecoration: el.textDecoration,
                        textAlign: el.textAlign as any,
                        color: el.color,
                        fontFamily: "'Calibri', sans-serif",
                      }}
                    >
                      {el.content}
                    </div>
                  )
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      background: el.fill,
                      borderRadius: el.type === "circle" ? "50%" : 4,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerPointPro;
