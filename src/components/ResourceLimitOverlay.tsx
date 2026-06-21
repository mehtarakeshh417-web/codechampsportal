import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

const BYPASS_KEY = "__resource_limit_bypass_v2__";

const isTypingTarget = (t: EventTarget | null) => {
  if (!(t instanceof HTMLElement)) return false;
  const tag = t.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (t.isContentEditable) return true;
  return false;
};

const ResourceLimitOverlay = () => {
  const [hidden, setHidden] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(BYPASS_KEY) === "1";
    } catch {
      return false;
    }
  });

  const enterCount = useRef(0);
  const enterTimer = useRef<number | undefined>(undefined);
  const tapCount = useRef(0);
  const tapTimer = useRef<number | undefined>(undefined);

  const unlock = () => {
    try {
      sessionStorage.setItem(BYPASS_KEY, "1");
    } catch {
      /* ignore */
    }
    setHidden(true);
  };

  useEffect(() => {
    const resetEnter = () => {
      enterCount.current = 0;
      if (enterTimer.current) {
        window.clearTimeout(enterTimer.current);
        enterTimer.current = undefined;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      if (e.key !== "Enter") {
        // Any non-Enter key resets the counter
        resetEnter();
        return;
      }
      enterCount.current += 1;
      if (enterTimer.current) window.clearTimeout(enterTimer.current);
      enterTimer.current = window.setTimeout(resetEnter, 3000);
      if (enterCount.current >= 5) {
        resetEnter();
        unlock();
      }
    };

    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      if (enterTimer.current) window.clearTimeout(enterTimer.current);
    };
  }, []);

  if (hidden) return null;

  const onSecretTap = () => {
    tapCount.current += 1;
    if (tapTimer.current) window.clearTimeout(tapTimer.current);
    tapTimer.current = window.setTimeout(() => {
      tapCount.current = 0;
    }, 3000);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      unlock();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        backgroundColor: "#5b0000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <AlertTriangle size={120} color="#ffd166" strokeWidth={2.2} />
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 56px)",
          fontWeight: 800,
          marginTop: "24px",
          letterSpacing: "0.02em",
        }}
      >
        RESOURCE LIMIT EXCEEDED
      </h1>
      <p
        style={{
          fontSize: "clamp(16px, 2vw, 22px)",
          maxWidth: "760px",
          marginTop: "16px",
          lineHeight: 1.5,
          opacity: 0.95,
        }}
      >
        This website has exceeded its allowed user limit and has been
        temporarily ceased. Please contact the developer immediately.
      </p>
      {/* Hidden 5-tap unlock zone (bottom-right corner) */}
      <button
        aria-hidden="true"
        tabIndex={-1}
        onClick={onSecretTap}
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          width: 48,
          height: 48,
          background: "transparent",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "default",
          opacity: 0,
        }}
      />
    </div>
  );
};

export default ResourceLimitOverlay;
