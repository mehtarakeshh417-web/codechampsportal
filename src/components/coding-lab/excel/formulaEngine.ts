const colIndex = (col: string) => col.toUpperCase().charCodeAt(0) - 65;

const parseCellRef = (ref: string): [number, number] | null => {
  const m = ref.match(/^([A-Z])(\d+)$/i);
  if (!m) return null;
  return [parseInt(m[2]) - 1, colIndex(m[1])];
};

const parseRange = (range: string): [number, number, number, number] | null => {
  const [start, end] = range.split(":");
  if (!start || !end) return null;
  const s = parseCellRef(start.trim());
  const e = parseCellRef(end.trim());
  if (!s || !e) return null;
  return [s[0], s[1], e[0], e[1]];
};

const getCellValue = (data: string[][], row: number, col: number, visited: Set<string>): number => {
  const key = `${row},${col}`;
  if (visited.has(key)) return 0; // circular ref
  visited.add(key);
  const raw = data[row]?.[col] || "";
  if (raw.startsWith("=")) {
    const result = evaluateFormula(raw, data, visited);
    return typeof result === "number" ? result : parseFloat(result) || 0;
  }
  return parseFloat(raw) || 0;
};

const getRangeValues = (data: string[][], range: string, visited: Set<string>): number[] => {
  const parsed = parseRange(range);
  if (!parsed) return [];
  const [r1, c1, r2, c2] = parsed;
  const values: number[] = [];
  for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
    for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
      values.push(getCellValue(data, r, c, new Set(visited)));
    }
  }
  return values;
};

export const evaluateFormula = (formula: string, data: string[][], visited = new Set<string>()): string => {
  if (!formula.startsWith("=")) return formula;
  const expr = formula.slice(1).trim().toUpperCase();

  try {
    // SUM(A1:B5)
    const sumMatch = expr.match(/^SUM\((.+)\)$/);
    if (sumMatch) {
      const vals = getRangeValues(data, sumMatch[1], visited);
      return vals.reduce((a, b) => a + b, 0).toString();
    }

    // AVERAGE(A1:B5)
    const avgMatch = expr.match(/^AVERAGE\((.+)\)$/);
    if (avgMatch) {
      const vals = getRangeValues(data, avgMatch[1], visited);
      if (vals.length === 0) return "0";
      return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
    }

    // COUNT(A1:B5)
    const countMatch = expr.match(/^COUNT\((.+)\)$/);
    if (countMatch) {
      const vals = getRangeValues(data, countMatch[1], visited);
      return vals.filter(v => !isNaN(v) && v !== 0).length.toString();
    }

    // MIN(A1:B5)
    const minMatch = expr.match(/^MIN\((.+)\)$/);
    if (minMatch) {
      const vals = getRangeValues(data, minMatch[1], visited);
      return vals.length ? Math.min(...vals).toString() : "0";
    }

    // MAX(A1:B5)
    const maxMatch = expr.match(/^MAX\((.+)\)$/);
    if (maxMatch) {
      const vals = getRangeValues(data, maxMatch[1], visited);
      return vals.length ? Math.max(...vals).toString() : "0";
    }

    // Simple cell reference like =A1
    const cellRef = parseCellRef(expr);
    if (cellRef) {
      return getCellValue(data, cellRef[0], cellRef[1], visited).toString();
    }

    // Simple arithmetic: =A1+B1, =A1*2, etc.
    const arithMatch = expr.match(/^([A-Z]\d+)\s*([+\-*/])\s*([A-Z]\d+|\d+\.?\d*)$/);
    if (arithMatch) {
      const leftRef = parseCellRef(arithMatch[1]);
      const left = leftRef ? getCellValue(data, leftRef[0], leftRef[1], visited) : 0;
      const rightRef = parseCellRef(arithMatch[3]);
      const right = rightRef ? getCellValue(data, rightRef[0], rightRef[1], visited) : parseFloat(arithMatch[3]) || 0;
      const op = arithMatch[2];
      switch (op) {
        case "+": return (left + right).toString();
        case "-": return (left - right).toString();
        case "*": return (left * right).toString();
        case "/": return right !== 0 ? (left / right).toFixed(2) : "#DIV/0!";
      }
    }

    return "#ERROR";
  } catch {
    return "#ERROR";
  }
};
