import { useState, useCallback, useRef } from "react";
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Image, Type, Heading1, Heading2, Heading3,
  Undo, Redo, Save, FileText, ChevronDown, Minus, Plus,
  Strikethrough, Subscript, Superscript, Highlighter,
  Table, Link2, Pilcrow, IndentIncrease, IndentDecrease, Palette,
  Printer, Copy, Clipboard, Scissors
} from "lucide-react";

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];
const FONTS = ["Calibri", "Arial", "Times New Roman", "Georgia", "Verdana", "Courier New", "Comic Sans MS", "Impact", "Segoe UI", "Garamond", "Trebuchet MS"];
const COLORS = [
  "#000000", "#434343", "#666666", "#999999", "#cccccc", "#ffffff",
  "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc",
  "#8e7cc3", "#c27ba0", "#cc0000", "#e69138", "#f1c232", "#6aa84f",
  "#45818e", "#3d85c6", "#674ea7", "#a64d79",
];

type TabKey = "home" | "insert" | "layout" | "view";

const SimulatedWordEditor = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [fontSize, setFontSize] = useState(11);
  const [fontFamily, setFontFamily] = useState("Calibri");
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [zoom, setZoom] = useState(100);
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = useCallback((cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  }, []);

  const closeDropdowns = () => { setShowFontDropdown(false); setShowSizeDropdown(false); setShowColorPicker(false); };

  const ribbonTabs: { key: TabKey; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "insert", label: "Insert" },
    { key: "layout", label: "Layout" },
    { key: "view", label: "View" },
  ];

  const ToolBtn = ({ icon: Icon, label, onClick, active, small }: { icon: React.ElementType; label: string; onClick?: () => void; active?: boolean; small?: boolean }) => (
    <button onClick={onClick} title={label}
      className={`p-1.5 rounded transition-all ${small ? "p-1" : "p-1.5"} ${active ? "bg-[#d4e7fa] text-[#2b579a]" : "text-[#444] hover:bg-[#e8e8e8]"}`}>
      <Icon className={small ? "w-3.5 h-3.5" : "w-4 h-4"} />
    </button>
  );

  const Separator = () => <div className="w-px h-10 bg-[#d4d4d4] mx-1.5" />;

  const GroupLabel = ({ children }: { children: string }) => (
    <div className="text-[9px] text-[#888] text-center mt-0.5 font-body">{children}</div>
  );

  return (
    <div className="flex flex-col h-[650px] bg-[#f3f3f3] rounded-xl border border-[#d4d4d4] overflow-hidden shadow-lg" onClick={closeDropdowns}>
      {/* Title Bar - Word blue */}
      <div className="flex items-center h-8 bg-[#2b579a] px-3 gap-2">
        <FileText className="w-4 h-4 text-white/90" />
        <span className="text-[11px] text-white font-body">Document1 — CodeChamps Word</span>
        <div className="ml-auto flex gap-0.5">
          <button className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded"><Undo className="w-3.5 h-3.5" /></button>
          <button className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded"><Redo className="w-3.5 h-3.5" /></button>
          <button className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded"><Save className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Ribbon Tabs */}
      <div className="flex items-center bg-[#2b579a] px-1">
        {ribbonTabs.map((t) => (
          <button key={t.key} onClick={(e) => { e.stopPropagation(); setActiveTab(t.key); }}
            className={`px-5 py-1.5 text-[11px] font-body transition-all ${
              activeTab === t.key ? "bg-[#f3f3f3] text-[#2b579a] rounded-t-md font-semibold" : "text-white/80 hover:text-white hover:bg-white/10"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Ribbon Content */}
      <div className="bg-[#f3f3f3] border-b border-[#d4d4d4] px-3 py-1.5 flex items-start gap-0.5 min-h-[72px]" onClick={(e) => e.stopPropagation()}>
        {activeTab === "home" && (
          <>
            {/* Clipboard Group */}
            <div className="flex flex-col items-center gap-0.5 px-1">
              <div className="flex gap-0.5">
                <ToolBtn icon={Clipboard} label="Paste" onClick={() => execCmd("paste")} />
                <div className="flex flex-col gap-0.5">
                  <ToolBtn icon={Scissors} label="Cut" onClick={() => execCmd("cut")} small />
                  <ToolBtn icon={Copy} label="Copy" onClick={() => execCmd("copy")} small />
                </div>
              </div>
              <GroupLabel>Clipboard</GroupLabel>
            </div>
            <Separator />

            {/* Font Group */}
            <div className="flex flex-col gap-0.5 px-1">
              <div className="flex items-center gap-1">
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setShowFontDropdown(!showFontDropdown); setShowSizeDropdown(false); setShowColorPicker(false); }}
                    className="flex items-center gap-1 bg-white border border-[#c4c4c4] rounded px-2 py-[3px] text-[11px] text-[#333] min-w-[120px] hover:border-[#2b579a]">
                    <span style={{ fontFamily }}>{fontFamily}</span>
                    <ChevronDown className="w-3 h-3 ml-auto text-[#888]" />
                  </button>
                  {showFontDropdown && (
                    <div className="absolute top-full left-0 z-50 mt-1 bg-white border border-[#d4d4d4] rounded shadow-xl max-h-48 overflow-y-auto w-52" onClick={(e) => e.stopPropagation()}>
                      {FONTS.map((f) => (
                        <button key={f} onClick={() => { setFontFamily(f); execCmd("fontName", f); setShowFontDropdown(false); }}
                          className="block w-full text-left px-3 py-1.5 text-[11px] text-[#333] hover:bg-[#d4e7fa]" style={{ fontFamily: f }}>
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setShowSizeDropdown(!showSizeDropdown); setShowFontDropdown(false); setShowColorPicker(false); }}
                    className="flex items-center gap-1 bg-white border border-[#c4c4c4] rounded px-2 py-[3px] text-[11px] text-[#333] w-14 hover:border-[#2b579a]">
                    {fontSize} <ChevronDown className="w-3 h-3 ml-auto text-[#888]" />
                  </button>
                  {showSizeDropdown && (
                    <div className="absolute top-full left-0 z-50 mt-1 bg-white border border-[#d4d4d4] rounded shadow-xl max-h-48 overflow-y-auto w-14" onClick={(e) => e.stopPropagation()}>
                      {FONT_SIZES.map((s) => (
                        <button key={s} onClick={() => { setFontSize(s); execCmd("fontSize", "3"); setShowSizeDropdown(false); }}
                          className="block w-full text-center px-2 py-1 text-[11px] text-[#333] hover:bg-[#d4e7fa]">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setFontSize((s) => Math.max(8, s - 1))} className="p-0.5 text-[#666] hover:text-[#333]"><Minus className="w-3 h-3" /></button>
                <button onClick={() => setFontSize((s) => Math.min(72, s + 1))} className="p-0.5 text-[#666] hover:text-[#333]"><Plus className="w-3 h-3" /></button>
              </div>
              <div className="flex items-center gap-0.5">
                <ToolBtn icon={Bold} label="Bold (Ctrl+B)" onClick={() => execCmd("bold")} small />
                <ToolBtn icon={Italic} label="Italic (Ctrl+I)" onClick={() => execCmd("italic")} small />
                <ToolBtn icon={Underline} label="Underline (Ctrl+U)" onClick={() => execCmd("underline")} small />
                <ToolBtn icon={Strikethrough} label="Strikethrough" onClick={() => execCmd("strikeThrough")} small />
                <ToolBtn icon={Subscript} label="Subscript" onClick={() => execCmd("subscript")} small />
                <ToolBtn icon={Superscript} label="Superscript" onClick={() => execCmd("superscript")} small />
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setShowColorPicker(!showColorPicker); setShowFontDropdown(false); setShowSizeDropdown(false); }}
                    title="Font Color" className="p-1 rounded text-[#444] hover:bg-[#e8e8e8] flex items-center gap-0.5">
                    <Type className="w-3.5 h-3.5" />
                    <div className="w-4 h-1 rounded-sm" style={{ backgroundColor: textColor }} />
                  </button>
                  {showColorPicker && (
                    <div className="absolute top-full left-0 z-50 mt-1 bg-white border border-[#d4d4d4] rounded shadow-xl p-2 grid grid-cols-6 gap-1 w-36" onClick={(e) => e.stopPropagation()}>
                      {COLORS.map((c) => (
                        <button key={c} onClick={() => { setTextColor(c); execCmd("foreColor", c); setShowColorPicker(false); }}
                          className="w-5 h-5 rounded border border-[#d4d4d4] hover:scale-125 transition-transform hover:border-[#2b579a]" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  )}
                </div>
                <ToolBtn icon={Highlighter} label="Highlight" onClick={() => execCmd("hiliteColor", "#ffd966")} small />
              </div>
              <GroupLabel>Font</GroupLabel>
            </div>
            <Separator />

            {/* Paragraph Group */}
            <div className="flex flex-col gap-0.5 px-1">
              <div className="flex items-center gap-0.5">
                <ToolBtn icon={AlignLeft} label="Align Left" onClick={() => execCmd("justifyLeft")} small />
                <ToolBtn icon={AlignCenter} label="Center" onClick={() => execCmd("justifyCenter")} small />
                <ToolBtn icon={AlignRight} label="Align Right" onClick={() => execCmd("justifyRight")} small />
                <ToolBtn icon={AlignJustify} label="Justify" onClick={() => execCmd("justifyFull")} small />
              </div>
              <div className="flex items-center gap-0.5">
                <ToolBtn icon={List} label="Bullets" onClick={() => execCmd("insertUnorderedList")} small />
                <ToolBtn icon={ListOrdered} label="Numbering" onClick={() => execCmd("insertOrderedList")} small />
                <ToolBtn icon={IndentDecrease} label="Decrease Indent" onClick={() => execCmd("outdent")} small />
                <ToolBtn icon={IndentIncrease} label="Increase Indent" onClick={() => execCmd("indent")} small />
              </div>
              <GroupLabel>Paragraph</GroupLabel>
            </div>
            <Separator />

            {/* Styles Group */}
            <div className="flex flex-col items-center gap-0.5 px-1">
              <div className="flex gap-1">
                {[
                  { icon: Heading1, label: "Heading 1", cmd: "h1", bg: "#2b579a", fg: "#fff" },
                  { icon: Heading2, label: "Heading 2", cmd: "h2", bg: "#3873b8", fg: "#fff" },
                  { icon: Heading3, label: "Heading 3", cmd: "h3", bg: "#5a9bd5", fg: "#fff" },
                  { icon: Pilcrow, label: "Normal", cmd: "p", bg: "#f0f0f0", fg: "#333" },
                ].map((s) => (
                  <button key={s.cmd} onClick={() => execCmd("formatBlock", s.cmd)} title={s.label}
                    className="px-2 py-1 rounded text-[10px] font-body border border-[#d4d4d4] hover:border-[#2b579a] transition-colors"
                    style={{ backgroundColor: s.bg, color: s.fg }}>
                    {s.label.replace("Heading ", "H")}
                  </button>
                ))}
              </div>
              <GroupLabel>Styles</GroupLabel>
            </div>
          </>
        )}

        {activeTab === "insert" && (
          <div className="flex items-center gap-2 py-2">
            <button onClick={() => execCmd("insertHTML", "<table border='1' style='border-collapse:collapse;width:80%;margin:8px auto'><tr><td style='padding:8px;border:1px solid #bbb'>&nbsp;</td><td style='padding:8px;border:1px solid #bbb'>&nbsp;</td><td style='padding:8px;border:1px solid #bbb'>&nbsp;</td></tr><tr><td style='padding:8px;border:1px solid #bbb'>&nbsp;</td><td style='padding:8px;border:1px solid #bbb'>&nbsp;</td><td style='padding:8px;border:1px solid #bbb'>&nbsp;</td></tr><tr><td style='padding:8px;border:1px solid #bbb'>&nbsp;</td><td style='padding:8px;border:1px solid #bbb'>&nbsp;</td><td style='padding:8px;border:1px solid #bbb'>&nbsp;</td></tr></table>")}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded text-[#444] hover:bg-[#e8e8e8]"><Table className="w-5 h-5" /><span className="text-[10px]">Table</span></button>
            <button onClick={() => execCmd("insertHTML", "<div style='border:2px dashed #bbb;padding:40px;text-align:center;color:#999;margin:10px 0;border-radius:8px'>📷 Image Placeholder — Click to add image</div>")}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded text-[#444] hover:bg-[#e8e8e8]"><Image className="w-5 h-5" /><span className="text-[10px]">Picture</span></button>
            <button onClick={() => { const url = prompt("Enter URL:"); if (url) execCmd("createLink", url); }}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded text-[#444] hover:bg-[#e8e8e8]"><Link2 className="w-5 h-5" /><span className="text-[10px]">Link</span></button>
            <button onClick={() => execCmd("insertHorizontalRule")}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded text-[#444] hover:bg-[#e8e8e8]"><Minus className="w-5 h-5" /><span className="text-[10px]">Line</span></button>
          </div>
        )}

        {activeTab === "layout" && (
          <div className="flex items-center gap-6 py-3 px-2">
            {[
              { label: "Margins", value: "Normal (1\")" },
              { label: "Orientation", value: "Portrait" },
              { label: "Size", value: "A4 (210×297mm)" },
              { label: "Columns", value: "One" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-0.5">
                <span className="text-[11px] text-[#333] font-body font-medium">{item.value}</span>
                <span className="text-[9px] text-[#888] font-body">{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "view" && (
          <div className="flex items-center gap-3 py-3 px-2">
            <span className="text-[11px] text-[#555] font-body">Zoom:</span>
            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="p-1 text-[#666] hover:text-[#333] hover:bg-[#e8e8e8] rounded"><Minus className="w-3.5 h-3.5" /></button>
            <span className="text-[11px] text-[#333] w-10 text-center font-body font-medium">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="p-1 text-[#666] hover:text-[#333] hover:bg-[#e8e8e8] rounded"><Plus className="w-3.5 h-3.5" /></button>
            <div className="w-px h-5 bg-[#d4d4d4] mx-2" />
            <button className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-[#444] hover:bg-[#e8e8e8]"><Printer className="w-4 h-4" /> Print Layout</button>
          </div>
        )}
      </div>

      {/* Ruler */}
      <div className="h-6 bg-white border-b border-[#e0e0e0] flex items-center px-16 relative overflow-hidden">
        <div className="flex-1 h-3 bg-[#f5f5f5] border border-[#ddd] rounded-sm relative">
          {Array.from({ length: 17 }, (_, i) => (
            <div key={i} className="absolute top-0 h-full" style={{ left: `${(i / 16) * 100}%` }}>
              <div className={`w-px h-full ${i % 2 === 0 ? "bg-[#999]" : "bg-[#ccc]"}`} />
              {i % 2 === 0 && <span className="absolute -bottom-3 -translate-x-1/2 text-[8px] text-[#999]">{Math.floor(i / 2)}</span>}
            </div>
          ))}
          {/* Margin markers */}
          <div className="absolute top-0 left-[6%] w-1 h-full bg-[#2b579a]/30 rounded" />
          <div className="absolute top-0 right-[6%] w-1 h-full bg-[#2b579a]/30 rounded" />
        </div>
      </div>

      {/* Document Canvas */}
      <div className="flex-1 bg-[#e8e8e8] overflow-auto flex justify-center py-6 px-4">
        <div className="bg-white rounded shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
          style={{ width: `${6.5 * zoom / 100 * 96}px`, minHeight: `${9 * zoom / 100 * 96}px`, transformOrigin: "top center" }}>
          <div ref={editorRef} contentEditable suppressContentEditableWarning
            className="p-16 outline-none text-[#333] min-h-full leading-relaxed"
            style={{ fontSize: `${fontSize}pt`, fontFamily, lineHeight: 1.6 }}
            onClick={(e) => e.stopPropagation()}>
            <h1 style={{ fontSize: "22pt", fontWeight: "bold", marginBottom: "12px", color: "#2b579a" }}>Welcome to CodeChamps Word</h1>
            <p style={{ marginBottom: "10px", color: "#555" }}>Start typing your document here. Use the ribbon toolbar above to format your text, change fonts, insert tables, and more!</p>
            <h2 style={{ fontSize: "16pt", fontWeight: "bold", marginBottom: "8px", color: "#3873b8", marginTop: "16px" }}>Getting Started</h2>
            <p style={{ marginBottom: "8px" }}>Try these features to explore the Word editor:</p>
            <ul style={{ paddingLeft: "28px", listStyleType: "disc", marginBottom: "12px" }}>
              <li style={{ marginBottom: "4px" }}>Select text and make it <strong>bold</strong>, <em>italic</em>, or <u>underlined</u></li>
              <li style={{ marginBottom: "4px" }}>Change the font family and size from the ribbon</li>
              <li style={{ marginBottom: "4px" }}>Add headings using the Styles group (H1, H2, H3)</li>
              <li style={{ marginBottom: "4px" }}>Insert tables, images, and links from the Insert tab</li>
              <li style={{ marginBottom: "4px" }}>Align text left, center, right, or justify</li>
            </ul>
            <p style={{ marginBottom: "8px", color: "#888", fontStyle: "italic" }}>This editor simulates Microsoft Word for learning purposes.</p>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#2b579a] flex items-center px-3 justify-between">
        <span className="text-[10px] text-white/80 font-body">Page 1 of 1 &nbsp;|&nbsp; Words: ~60</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/60 font-body">English (US)</span>
          <span className="text-[10px] text-white/80 font-body">{zoom}%</span>
        </div>
      </div>
    </div>
  );
};

export default SimulatedWordEditor;
