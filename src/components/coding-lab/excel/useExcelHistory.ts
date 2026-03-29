import { useState, useCallback, useRef } from "react";

export const useExcelHistory = (initial: string[][]) => {
  const [data, setDataRaw] = useState(initial);
  const history = useRef<string[][][]>([initial]);
  const pointer = useRef(0);

  const setData = useCallback((updater: (prev: string[][]) => string[][]) => {
    setDataRaw(prev => {
      const next = updater(prev);
      // Trim future history
      history.current = history.current.slice(0, pointer.current + 1);
      history.current.push(next);
      pointer.current++;
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    if (pointer.current > 0) {
      pointer.current--;
      setDataRaw(history.current[pointer.current]);
    }
  }, []);

  const redo = useCallback(() => {
    if (pointer.current < history.current.length - 1) {
      pointer.current++;
      setDataRaw(history.current[pointer.current]);
    }
  }, []);

  const canUndo = pointer.current > 0;
  const canRedo = pointer.current < history.current.length - 1;

  return { data, setData, undo, redo, canUndo, canRedo };
};
