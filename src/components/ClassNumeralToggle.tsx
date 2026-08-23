import { useNumeralMode } from "@/lib/classNames";

/** Switches every class label in the portal between 1st/2nd… and I/II/… */
const ClassNumeralToggle = ({ className = "" }: { className?: string }) => {
  const [mode, setMode] = useNumeralMode();

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-white/15 bg-white/5 p-0.5 ${className}`}
      role="group"
      aria-label="Class name format"
    >
      {(["numeric", "roman"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setMode(option)}
          aria-pressed={mode === option}
          className={`px-2.5 py-1 text-xs font-body rounded-md transition-colors ${
            mode === option ? "bg-primary/25 text-primary font-semibold" : "text-white/50 hover:text-white/80"
          }`}
        >
          {option === "numeric" ? "1st" : "I"}
        </button>
      ))}
    </div>
  );
};

export default ClassNumeralToggle;
