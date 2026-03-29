import { useCallback, useRef } from "react";
import { toast } from "sonner";

type Selection = { startRow: number; startCol: number; endRow: number; endCol: number };

export const useExcelClipboard = (
  data: string[][],
  setData: (updater: (prev: string[][]) => string[][]) => void
) => {
  const clipboard = useRef<{ cells: string[][]; rows: number; cols: number } | null>(null);

  const copy = useCallback((sel: Selection) => {
    const r1 = Math.min(sel.startRow, sel.endRow);
    const r2 = Math.max(sel.startRow, sel.endRow);
    const c1 = Math.min(sel.startCol, sel.endCol);
    const c2 = Math.max(sel.startCol, sel.endCol);
    const cells: string[][] = [];
    for (let r = r1; r <= r2; r++) {
      const row: string[] = [];
      for (let c = c1; c <= c2; c++) {
        row.push(data[r]?.[c] || "");
      }
      cells.push(row);
    }
    clipboard.current = { cells, rows: r2 - r1 + 1, cols: c2 - c1 + 1 };
    toast.success(`Copied ${cells.length * (cells[0]?.length || 0)} cell(s)`);
  }, [data]);

  const cut = useCallback((sel: Selection) => {
    copy(sel);
    const r1 = Math.min(sel.startRow, sel.endRow);
    const r2 = Math.max(sel.startRow, sel.endRow);
    const c1 = Math.min(sel.startCol, sel.endCol);
    const c2 = Math.max(sel.startCol, sel.endCol);
    setData(prev => {
      const next = prev.map(r => [...r]);
      for (let r = r1; r <= r2; r++) {
        for (let c = c1; c <= c2; c++) {
          if (next[r]) next[r][c] = "";
        }
      }
      return next;
    });
  }, [copy, setData]);

  const paste = useCallback((row: number, col: number) => {
    if (!clipboard.current) { toast.error("Nothing to paste"); return; }
    const { cells } = clipboard.current;
    setData(prev => {
      const next = prev.map(r => [...r]);
      for (let r = 0; r < cells.length; r++) {
        for (let c = 0; c < cells[r].length; c++) {
          const tr = row + r;
          const tc = col + c;
          if (tr < next.length && tc < (next[0]?.length || 0)) {
            next[tr][tc] = cells[r][c];
          }
        }
      }
      return next;
    });
    toast.success("Pasted!");
  }, [setData]);

  return { copy, cut, paste, hasClipboard: () => !!clipboard.current };
};
