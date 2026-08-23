import { useEffect, useState } from "react";

export type NumeralMode = "numeric" | "roman";

const STORAGE_KEY = "cc_class_numeral_mode";
const EVENT = "cc-numeral-mode-change";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export const getNumeralMode = (): NumeralMode => {
  try {
    return (localStorage.getItem(STORAGE_KEY) as NumeralMode) || "numeric";
  } catch {
    return "numeric";
  }
};

export const setNumeralMode = (mode: NumeralMode) => {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new Event(EVENT));
};

/** Live numeral-mode value + setter shared across the whole app. */
export const useNumeralMode = (): [NumeralMode, (mode: NumeralMode) => void] => {
  const [mode, setMode] = useState<NumeralMode>(getNumeralMode);

  useEffect(() => {
    const sync = () => setMode(getNumeralMode());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return [mode, setNumeralMode];
};

/** "6th" -> 6, "Class 6" -> 6, "VI" -> 6, returns null when not a class number. */
export const classToNumber = (raw: string): number | null => {
  const value = String(raw || "").trim().replace(/^class\s*/i, "");
  const digits = value.match(/^(\d{1,2})/);
  if (digits) {
    const n = Number(digits[1]);
    return n >= 1 && n <= 12 ? n : null;
  }
  const romanIndex = ROMAN.findIndex((r) => r && r.toUpperCase() === value.toUpperCase());
  return romanIndex > 0 ? romanIndex : null;
};

const ordinal = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;

/** Formats a single class token ("6th", "VI") in the requested numeral mode. */
export const formatClassToken = (raw: string, mode: NumeralMode): string => {
  const n = classToNumber(raw);
  if (!n) return String(raw || "").trim();
  return mode === "roman" ? ROMAN[n] : ordinal(n);
};

/**
 * Formats a full class label, keeping any section suffix:
 * "6th-A" -> "VI-A", "6th (A)" -> "VI (A)", "6th" -> "VI".
 */
export const formatClassName = (raw: string, mode: NumeralMode): string => {
  const value = String(raw || "").trim();
  if (!value) return "";

  const paren = value.match(/^(.+?)\s*\(\s*([^)]*?)\s*\)$/);
  if (paren) return `${formatClassToken(paren[1], mode)} (${paren[2]})`;

  const dash = value.split("-");
  if (dash.length > 1) {
    const [cls, ...rest] = dash;
    return `${formatClassToken(cls, mode)}-${rest.join("-")}`;
  }
  return formatClassToken(value, mode);
};

/** Convenience hook: returns a formatter bound to the active numeral mode. */
export const useClassFormatter = () => {
  const [mode] = useNumeralMode();
  return (raw: string) => formatClassName(raw, mode);
};
