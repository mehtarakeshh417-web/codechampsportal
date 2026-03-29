import { useRef, useEffect, useState, useCallback } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Plus, Trash2, Type, Undo2, Redo2, Copy, Scissors, ClipboardPaste } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExcelHistory } from "./excel/useExcelHistory";
import { useExcelClipboard } from "./excel/useExcelClipboard";
import { evaluateFormula } from "./excel/formulaEngine";

const COLS = 26;
const ROWS = 50;
const COL_WIDTH = 100;
const ROW_HEIGHT = 28;

const colLabel = (i: number) => String.fromCharCode(65 + i);

const SimulatedExcelEditor = () => {
  const initialData = () => Array.from({ length: ROWS }, () => Array(COLS).fill(""));
  const { data, setData, undo, redo, canUndo, canRedo } = useExcelHistory(initialData());

  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 0]);
  const [selectionRange, setSelectionRange] = useState<{ startRow: number; startCol: number; endRow: number; endCol: number } | null>(null);
  const [editingCell, setEditingCell] = useState<[number, number] | null>(null);
  const [formulaBarValue, setFormulaBarValue] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { copy, cut, paste, hasClipboard } = useExcelClipboard(data, setData);

  const [r, c] = selectedCell;
  const cellRef = `${colLabel(c)}${r + 1}`;

  useEffect(() => {
    setFormulaBarValue(data[r]?.[c] || "");
  }, [r, c, data]);

  const updateCell = useCallback((row: number, col: number, value: string) => {
    setData(prev => {
      const next = prev.map(r => [...r]);
      next[row][col] = value;
      return next;
    });
  }, [setData]);

  const getDisplayValue = useCallback((row: number, col: number) => {
    const raw = data[row]?.[col] || "";
    if (raw.startsWith("=")) {
      return evaluateFormula(raw, data);
    }
    return raw;
  }, [data]);

  const getCurrentSelection = useCallback(() => {
    return selectionRange || { startRow: r, startCol: c, endRow: r, endCol: c };
  }, [selectionRange, r, c]);

  const isInSelection = useCallback((row: number, col: number) => {
    if (!selectionRange) return row === r && col === c;
    const r1 = Math.min(selectionRange.startRow, selectionRange.endRow);
    const r2 = Math.max(selectionRange.startRow, selectionRange.endRow);
    const c1 = Math.min(selectionRange.startCol, selectionRange.endCol);
    const c2 = Math.max(selectionRange.startCol, selectionRange.endCol);
    return row >= r1 && row <= r2 && col >= c1 && col <= c2;
  }, [selectionRange, r, c]);

  const handleCellClick = (row: number, col: number, e: React.MouseEvent) => {
    if (e.shiftKey) {
      setSelectionRange({ startRow: r, startCol: c, endRow: row, endCol: col });
    } else {
      setSelectedCell([row, col]);
      setSelectionRange(null);
    }
    setEditingCell(null);
  };

  const handleMouseDown = (row: number, col: number, e: React.MouseEvent) => {
    if (e.shiftKey) return;
    setIsDragging(true);
    setSelectedCell([row, col]);
    setSelectionRange({ startRow: row, startCol: col, endRow: row, endCol: col });
    setEditingCell(null);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isDragging) return;
    setSelectionRange(prev => prev ? { ...prev, endRow: row, endCol: col } : null);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleCellDoubleClick = (row: number, col: number) => {
    setEditingCell([row, col]);
  };

  const handleCellKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === "Enter") {
      setEditingCell(null);
      setSelectedCell([Math.min(row + 1, ROWS - 1), col]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      setEditingCell(null);
      setSelectedCell([row, Math.min(col + 1, COLS - 1)]);
    } else if (e.key === "Escape") {
      setEditingCell(null);
    }
  };

  const handleFormulaBarChange = (val: string) => {
    setFormulaBarValue(val);
    updateCell(r, c, val);
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (editingCell) return;

      if (ctrl && e.key === "z") { e.preventDefault(); undo(); }
      if (ctrl && e.key === "y") { e.preventDefault(); redo(); }
      if (ctrl && e.key === "c") { e.preventDefault(); copy(getCurrentSelection()); }
      if (ctrl && e.key === "x") { e.preventDefault(); cut(getCurrentSelection()); }
      if (ctrl && e.key === "v") { e.preventDefault(); paste(r, c); }

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        const sel = getCurrentSelection();
        const r1 = Math.min(sel.startRow, sel.endRow);
        const r2 = Math.max(sel.startRow, sel.endRow);
        const c1 = Math.min(sel.startCol, sel.endCol);
        const c2 = Math.max(sel.startCol, sel.endCol);
        setData(prev => {
          const next = prev.map(r => [...r]);
          for (let ri = r1; ri <= r2; ri++)
            for (let ci = c1; ci <= c2; ci++)
              next[ri][ci] = "";
          return next;
        });
      }

      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedCell(([r, c]) => [Math.min(r + 1, data.length - 1), c]); setSelectionRange(null); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelectedCell(([r, c]) => [Math.max(r - 1, 0), c]); setSelectionRange(null); }
      if (e.key === "ArrowRight") { e.preventDefault(); setSelectedCell(([r, c]) => [r, Math.min(c + 1, COLS - 1)]); setSelectionRange(null); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setSelectedCell(([r, c]) => [r, Math.max(c - 1, 0)]); setSelectionRange(null); }

      // Start typing into cell
      if (e.key.length === 1 && !ctrl && !e.altKey) {
        setEditingCell(selectedCell);
        updateCell(selectedCell[0], selectedCell[1], "");
      }
    };
    const el = gridRef.current;
    if (el) {
      el.addEventListener("keydown", handler as any);
      return () => el.removeEventListener("keydown", handler as any);
    }
  }, [editingCell, undo, redo, copy, cut, paste, r, c, getCurrentSelection, selectedCell, data.length, setData, updateCell]);

  const insertRow = () => {
    setData(prev => {
      const next = [...prev];
      next.splice(r + 1, 0, Array(COLS).fill(""));
      return next;
    });
  };

  const deleteRow = () => {
    if (data.length <= 1) return;
    setData(prev => prev.filter((_, i) => i !== r));
    if (r >= data.length - 1) setSelectedCell([Math.max(0, r - 1), c]);
  };

  const insertCol = () => {
    setData(prev => prev.map(row => {
      const next = [...row];
      next.splice(c + 1, 0, "");
      return next;
    }));
  };

  const tabs = ["Home", "Insert", "Data"];

  return (
    <div
      ref={gridRef}
      tabIndex={0}
      className="flex flex-col h-[650px] bg-[hsl(220,25%,12%)] rounded-xl border border-white/10 overflow-hidden focus:outline-none"
    >
      {/* Title bar */}
      <div className="flex items-center h-8 bg-[hsl(140,40%,20%)] px-3 border-b border-white/10">
        <span className="text-xs text-white/80 font-body">MS Excel Spreadsheet Editor</span>
        <span className="ml-auto text-[10px] text-white/40 font-body">Supports: SUM, AVERAGE, COUNT, MIN, MAX, +, -, *, /</span>
      </div>

      {/* Ribbon tabs */}
      <div className="flex items-center gap-0 bg-[hsl(220,20%,16%)] border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-xs font-body transition-colors ${activeTab === tab ? "bg-[hsl(220,20%,20%)] text-white border-b-2 border-primary" : "text-white/50 hover:text-white/80"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ribbon toolbar */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-[hsl(220,20%,18%)] border-b border-white/10 flex-wrap">
        {/* Always-visible: Undo/Redo/Clipboard */}
        <Button size="sm" variant="ghost" onClick={undo} disabled={!canUndo} className="p-1 h-7 w-7 text-white/60 hover:text-white disabled:opacity-30" title="Undo (Ctrl+Z)"><Undo2 className="w-3.5 h-3.5" /></Button>
        <Button size="sm" variant="ghost" onClick={redo} disabled={!canRedo} className="p-1 h-7 w-7 text-white/60 hover:text-white disabled:opacity-30" title="Redo (Ctrl+Y)"><Redo2 className="w-3.5 h-3.5" /></Button>
        <div className="w-px h-5 bg-white/10" />
        <Button size="sm" variant="ghost" onClick={() => copy(getCurrentSelection())} className="p-1 h-7 w-7 text-white/60 hover:text-white" title="Copy (Ctrl+C)"><Copy className="w-3.5 h-3.5" /></Button>
        <Button size="sm" variant="ghost" onClick={() => cut(getCurrentSelection())} className="p-1 h-7 w-7 text-white/60 hover:text-white" title="Cut (Ctrl+X)"><Scissors className="w-3.5 h-3.5" /></Button>
        <Button size="sm" variant="ghost" onClick={() => paste(r, c)} className="p-1 h-7 w-7 text-white/60 hover:text-white" title="Paste (Ctrl+V)"><ClipboardPaste className="w-3.5 h-3.5" /></Button>
        <div className="w-px h-5 bg-white/10" />

        {activeTab === "Home" && (
          <>
            <select className="bg-[hsl(220,20%,14%)] text-white/80 text-xs border border-white/10 rounded px-1 py-1 font-body">
              <option>Calibri</option><option>Arial</option><option>Times New Roman</option><option>Verdana</option>
            </select>
            <select className="bg-[hsl(220,20%,14%)] text-white/80 text-xs border border-white/10 rounded px-1 py-1 w-14 font-body">
              {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 36].map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="w-px h-5 bg-white/10" />
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><Bold className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><Italic className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><Underline className="w-3.5 h-3.5" /></Button>
            <div className="w-px h-5 bg-white/10" />
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><AlignLeft className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><AlignCenter className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><AlignRight className="w-3.5 h-3.5" /></Button>
          </>
        )}
        {activeTab === "Insert" && (
          <>
            <Button size="sm" variant="ghost" className="text-xs text-white/60 hover:text-white gap-1 h-7" onClick={insertRow}><Plus className="w-3 h-3" /> Row</Button>
            <Button size="sm" variant="ghost" className="text-xs text-white/60 hover:text-white gap-1 h-7" onClick={insertCol}><Plus className="w-3 h-3" /> Column</Button>
            <Button size="sm" variant="ghost" className="text-xs text-white/60 hover:text-white gap-1 h-7" onClick={deleteRow}><Trash2 className="w-3 h-3" /> Delete Row</Button>
          </>
        )}
        {activeTab === "Data" && (
          <span className="text-xs text-white/40 font-body">Formulas: =SUM(A1:A10), =AVERAGE(B1:B5), =COUNT(C1:C3), =MIN(), =MAX(), =A1+B1</span>
        )}
      </div>

      {/* Formula bar */}
      <div className="flex items-center gap-2 px-3 py-1 bg-[hsl(220,20%,15%)] border-b border-white/10">
        <span className="text-xs text-white/60 font-mono w-10 text-center bg-[hsl(220,20%,12%)] rounded px-1 py-0.5 border border-white/10">{cellRef}</span>
        <Type className="w-3 h-3 text-white/30" />
        <input
          ref={inputRef}
          value={formulaBarValue}
          onChange={e => handleFormulaBarChange(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") gridRef.current?.focus(); }}
          className="flex-1 bg-[hsl(220,20%,12%)] text-white text-xs font-mono border border-white/10 rounded px-2 py-1 focus:outline-none focus:border-primary/50"
          placeholder="Enter value or formula (e.g. =SUM(A1:A10))..."
        />
      </div>

      {/* Spreadsheet grid */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse" style={{ minWidth: COLS * COL_WIDTH + 40 }}>
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="bg-[hsl(220,20%,16%)] border border-white/10 w-10 min-w-[40px] text-[10px] text-white/40 font-body" />
              {Array.from({ length: COLS }, (_, i) => (
                <th
                  key={i}
                  className={`bg-[hsl(220,20%,16%)] border border-white/10 text-[10px] text-white/40 font-body px-1 ${c === i ? "bg-primary/20 text-primary" : ""}`}
                  style={{ width: COL_WIDTH, minWidth: COL_WIDTH }}
                >
                  {colLabel(i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, ri) => (
              <tr key={ri}>
                <td className={`bg-[hsl(220,20%,16%)] border border-white/10 text-[10px] text-white/40 font-body text-center sticky left-0 z-[5] ${r === ri ? "bg-primary/20 text-primary" : ""}`} style={{ height: ROW_HEIGHT }}>
                  {ri + 1}
                </td>
                {row.map((cell, ci) => {
                  const isSelected = r === ri && c === ci;
                  const isEditing = editingCell?.[0] === ri && editingCell?.[1] === ci;
                  const inSel = isInSelection(ri, ci);
                  const displayVal = getDisplayValue(ri, ci);
                  const isFormula = cell.startsWith("=");
                  const isError = isFormula && (displayVal.startsWith("#"));
                  return (
                    <td
                      key={ci}
                      className={`border border-white/[0.06] text-xs text-white/80 font-body px-1 cursor-cell select-none
                        ${isSelected ? "outline outline-2 outline-primary bg-primary/10" : ""}
                        ${inSel && !isSelected ? "bg-primary/5" : ""}
                        ${!inSel && !isSelected ? "hover:bg-white/[0.03]" : ""}
                        ${isError ? "text-red-400" : ""}
                      `}
                      style={{ height: ROW_HEIGHT }}
                      onClick={(e) => handleCellClick(ri, ci, e)}
                      onMouseDown={(e) => handleMouseDown(ri, ci, e)}
                      onMouseEnter={() => handleMouseEnter(ri, ci)}
                      onDoubleClick={() => handleCellDoubleClick(ri, ci)}
                    >
                      {isEditing ? (
                        <input
                          autoFocus
                          value={cell}
                          onChange={e => updateCell(ri, ci, e.target.value)}
                          onKeyDown={e => handleCellKeyDown(e, ri, ci)}
                          onBlur={() => setEditingCell(null)}
                          className="w-full h-full bg-transparent text-xs text-white outline-none font-body"
                        />
                      ) : (
                        <span className="block truncate">{displayVal}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[hsl(220,20%,14%)] border-t border-white/10">
        <span className="text-[10px] text-white/40 font-body">Sheet 1</span>
        <div className="flex gap-4">
          {selectionRange && (
            <span className="text-[10px] text-white/50 font-body">
              Selection: {Math.abs(selectionRange.endRow - selectionRange.startRow) + 1}×{Math.abs(selectionRange.endCol - selectionRange.startCol) + 1}
            </span>
          )}
          <span className="text-[10px] text-white/40 font-body">Rows: {data.length} | Cols: {COLS}</span>
        </div>
      </div>
    </div>
  );
};

export default SimulatedExcelEditor;
