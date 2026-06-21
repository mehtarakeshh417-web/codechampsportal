import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

const BYPASS_KEY = "__resource_limit_bypass__";

const ResourceLimitOverlay = () => {
  const [hidden, setHidden] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(BYPASS_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    let count = 0;
    let timer: number | undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      count += 1;
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        count = 0;
      }, 2000);
      if (count >= 5) {
        count = 0;
        try {
          sessionStorage.setItem(BYPASS_KEY, "1");
        } catch {
          /* ignore */
        }
        setHidden(true);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  if (hidden) return null;

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
    </div>
  );
};

export default ResourceLimitOverlay;
