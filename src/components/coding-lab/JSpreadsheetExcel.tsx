import { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";
import "./excel-light-theme.css";

const JSpreadsheetExcel = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    if (!sheetRef.current || instanceRef.current) return;

    const data = Array.from({ length: 100 }, () => Array(26).fill(""));

    const columns = Array.from({ length: 26 }, (_, i) => ({
      title: String.fromCharCode(65 + i),
      width: 100,
      align: "left" as const,
    }));

    instanceRef.current = (jspreadsheet as any)(sheetRef.current, {
      data,
      columns,
      minDimensions: [26, 100],
      tableOverflow: true,
      tableWidth: "100%",
      tableHeight: "100%",
      defaultColWidth: 100,
      allowInsertRow: true,
      allowInsertColumn: true,
      allowDeleteRow: true,
      allowDeleteColumn: true,
      allowRenameColumn: true,
      allowComments: false,
      columnSorting: true,
      columnDrag: true,
      columnResize: true,
      rowResize: true,
      rowDrag: true,
      search: true,
      csvFileName: "spreadsheet",
      about: false,
      parseFormulas: true,
      autoIncrement: true,
      toolbar: [
        { type: "i", content: "undo", onclick: function () { instanceRef.current?.undo(); } },
        { type: "i", content: "redo", onclick: function () { instanceRef.current?.redo(); } },
        { type: "separator" },
        { type: "select", k: "font-family", v: ["Arial", "Calibri", "Verdana", "Courier New", "Georgia", "Times New Roman", "Trebuchet MS"] },
        { type: "select", k: "font-size", v: ["8px", "9px", "10px", "11px", "12px", "14px", "16px", "18px", "20px", "24px", "28px", "36px"] },
        { type: "separator" },
        { type: "i", content: "format_bold", k: "font-weight", v: "bold" },
        { type: "i", content: "format_italic", k: "font-style", v: "italic" },
        { type: "i", content: "format_underlined", k: "text-decoration", v: "underline" },
        { type: "separator" },
        { type: "i", content: "format_align_left", k: "text-align", v: "left" },
        { type: "i", content: "format_align_center", k: "text-align", v: "center" },
        { type: "i", content: "format_align_right", k: "text-align", v: "right" },
        { type: "separator" },
        { type: "i", content: "format_color_text", k: "color" },
        { type: "i", content: "format_color_fill", k: "background-color" },
        { type: "separator" },
        { type: "i", content: "border_all", k: "border", v: "1px solid #ccc" },
        { type: "i", content: "border_clear", k: "border", v: "" },
      ],
      contextMenu: function (obj: any, x: any, y: any, _e: any) {
        const items: any[] = [];
        if (y === null) {
          items.push({ title: "Insert column before", onclick: () => obj.insertColumn(1, parseInt(x), 1) });
          items.push({ title: "Insert column after", onclick: () => obj.insertColumn(1, parseInt(x), 0) });
          items.push({ title: "Delete column", onclick: () => obj.deleteColumn(parseInt(x)) });
          items.push({ title: "Sort ascending", onclick: () => obj.orderBy(parseInt(x), 0) });
          items.push({ title: "Sort descending", onclick: () => obj.orderBy(parseInt(x), 1) });
        } else if (x === null) {
          items.push({ title: "Insert row before", onclick: () => obj.insertRow(1, parseInt(y), 1) });
          items.push({ title: "Insert row after", onclick: () => obj.insertRow(1, parseInt(y), 0) });
          items.push({ title: "Delete row", onclick: () => obj.deleteRow(parseInt(y)) });
        } else {
          items.push({ title: "Cut", shortcut: "Ctrl+X", onclick: () => obj.cut() });
          items.push({ title: "Copy", shortcut: "Ctrl+C", onclick: () => obj.copy() });
          items.push({ title: "Paste", shortcut: "Ctrl+V", onclick: () => obj.paste() });
          items.push({ type: "line" });
          items.push({ title: "Insert row above", onclick: () => obj.insertRow(1, parseInt(y), 1) });
          items.push({ title: "Insert row below", onclick: () => obj.insertRow(1, parseInt(y), 0) });
          items.push({ title: "Delete row", onclick: () => obj.deleteRow(parseInt(y)) });
          items.push({ type: "line" });
          items.push({ title: "Insert column left", onclick: () => obj.insertColumn(1, parseInt(x), 1) });
          items.push({ title: "Insert column right", onclick: () => obj.insertColumn(1, parseInt(x), 0) });
          items.push({ title: "Delete column", onclick: () => obj.deleteColumn(parseInt(x)) });
        }
        return items;
      },
    });

    return () => {
      if (instanceRef.current?.destroy) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-[650px] rounded-xl border border-[#d4d4d4] overflow-hidden bg-white">
      {/* Excel-style green title bar */}
      <div className="flex items-center h-9 px-4" style={{ background: "#217346" }}>
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="2" fill="white" fillOpacity="0.2"/><text x="3" y="12" fontSize="11" fontWeight="bold" fill="white">X</text></svg>
          <span className="text-xs text-white font-semibold tracking-wide">Excel — Spreadsheet Editor</span>
        </div>
        <span className="ml-auto text-[10px] text-white/70">
          Formulas: =SUM(), =AVERAGE(), =COUNT(), =MIN(), =MAX(), =IF()
        </span>
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-hidden excel-light-container">
        <div ref={sheetRef} className="w-full h-full" />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between h-6 px-3 border-t border-[#d4d4d4]" style={{ background: "#217346" }}>
        <span className="text-[10px] text-white/80">Sheet 1</span>
        <span className="text-[10px] text-white/60">Ready</span>
      </div>
    </div>
  );
};

export default JSpreadsheetExcel;
