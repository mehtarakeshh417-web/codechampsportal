import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeCodeForTokens } from "@/lib/canvaAuth";
import { toast } from "sonner";

const CanvaCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const storedState = sessionStorage.getItem("canva_oauth_state");

    if (!code) {
      setStatus("error");
      toast.error("Canva authorization failed — no code received.");
      return;
    }

    if (state && storedState && state !== storedState) {
      setStatus("error");
      toast.error("OAuth state mismatch. Please try again.");
      return;
    }

    exchangeCodeForTokens(code)
      .then(() => {
        toast.success("Connected to Canva successfully!");
        // Navigate back to coding lab with canva tab
        const returnPath = sessionStorage.getItem("canva_return_path") || "/student/coding-lab?editor=canva";
        sessionStorage.removeItem("canva_return_path");
        sessionStorage.removeItem("canva_oauth_state");
        navigate(returnPath, { replace: true });
      })
      .catch((err) => {
        console.error("Canva token exchange error:", err);
        setStatus("error");
        toast.error("Failed to connect to Canva. Please try again.");
      });
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
      <div className="text-center space-y-4">
        {status === "loading" ? (
          <>
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white/60 font-body">Connecting to Canva...</p>
          </>
        ) : (
          <>
            <p className="text-red-400 font-body">Failed to connect to Canva.</p>
            <button
              onClick={() => navigate("/student/coding-lab?editor=canva")}
              className="text-primary underline font-body"
            >
              Return to Coding Lab
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CanvaCallback;
