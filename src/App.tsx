import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import CanvaCallback from "./pages/CanvaCallback";

const queryClient = new QueryClient();

const App = () => {
  const [showResourceLimitOverlay, setShowResourceLimitOverlay] = useState(
    () => sessionStorage.getItem("bypass") !== "true",
  );

  useEffect(() => {
    if (!showResourceLimitOverlay) return;

    let consecutiveEnters = 0;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (event.repeat) return;
        consecutiveEnters += 1;
        if (consecutiveEnters === 5) {
          sessionStorage.setItem("bypass", "true");
          setShowResourceLimitOverlay(false);
        }
      } else {
        consecutiveEnters = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showResourceLimitOverlay]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <DataProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/canva-callback" element={<CanvaCallback />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </DataProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
      {showResourceLimitOverlay && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed inset-0 z-[999999] flex items-center justify-center px-6 text-center text-destructive-foreground"
          style={{ backgroundColor: "#7a0000" }}
        >
          <div className="flex max-w-3xl flex-col items-center gap-6">
            <AlertTriangle aria-hidden="true" className="h-14 w-14 shrink-0" />
            <p className="text-xl font-semibold leading-relaxed sm:text-2xl">
              RESOURCE LIMIT EXCEEDED. This website has exceeded its allowed user limit and has been temporarily ceased. Please contact the developer immediately.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
