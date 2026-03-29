import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ShieldCheck, Lock, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Method = "old_password" | "pin" | "security_question";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"username" | "method" | "verify">("username");
  const [username, setUsername] = useState("");
  const [method, setMethod] = useState<Method | null>(null);
  const [hasSecurity, setHasSecurity] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [verificationValue, setVerificationValue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUsernameSubmit = async () => {
    if (!username.trim()) { setError("Please enter your username"); return; }
    setLoading(true);
    setError("");
    const { data, error: fnError } = await supabase.functions.invoke("get-security-question", {
      body: { username: username.trim() },
    });
    setLoading(false);
    if (fnError || data?.error) {
      setError(data?.error || "User not found");
      return;
    }
    setHasSecurity(data.has_security);
    setSecurityQuestion(data.security_question || "");
    setStep("method");
  };

  const handleReset = async () => {
    if (!newPassword) { setError("Please enter a new password"); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match"); return; }
    if (!verificationValue.trim()) { setError("Please fill in the verification field"); return; }

    setLoading(true);
    setError("");
    const { data, error: fnError } = await supabase.functions.invoke("reset-password", {
      body: {
        username: username.trim(),
        method,
        verification_value: verificationValue,
        new_password: newPassword,
      },
    });
    setLoading(false);

    if (fnError || data?.error) {
      setError(data?.error || "Reset failed. Please try again.");
      return;
    }
    setSuccess(true);
    toast.success("Password reset successfully!");
  };

  const reset = () => {
    setStep("username");
    setMethod(null);
    setVerificationValue("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/assets/login-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-[1] bg-black/60 backdrop-blur-[2px]" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 w-full max-w-md">
          <div className="glass-card p-10 bg-black/40 backdrop-blur-xl border border-white/10 text-center">
            <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-white mb-2">Password Reset!</h1>
            <p className="text-white/60 font-body mb-6">Your password has been updated. You can now login with your new password.</p>
            <Button variant="hero" size="lg" className="w-full" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/assets/login-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 z-[1] bg-black/60 backdrop-blur-[2px]" />

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md">
        <div className="glass-card p-10 bg-black/40 backdrop-blur-xl border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <img src="/assets/logo.jpg" alt="CodeChamps logo" className="w-20 h-20 rounded-2xl object-contain mx-auto mb-4 ring-2 ring-primary/30 shadow-lg shadow-primary/20" />
            <h1 className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Reset Password</h1>
            <p className="text-white/50 font-body text-sm mt-2">Recover access to your account</p>
          </div>

          {/* Step 1: Username */}
          {step === "username" && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/70 font-body text-sm">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary font-body text-base"
                  onKeyDown={(e) => e.key === "Enter" && handleUsernameSubmit()}
                />
              </div>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-destructive text-sm font-body bg-destructive/10 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}
              <Button variant="hero" size="lg" className="w-full h-12" onClick={handleUsernameSubmit} disabled={loading}>
                {loading ? "Checking..." : "Continue"}
              </Button>
            </div>
          )}

          {/* Step 2: Choose method */}
          {step === "method" && (
            <div className="space-y-4">
              <p className="text-white/60 font-body text-sm text-center mb-2">Choose a verification method</p>
              <button
                onClick={() => { setMethod("old_password"); setStep("verify"); }}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white font-body">Old Password</div>
                  <div className="text-xs text-white/40 font-body">Verify using your current password</div>
                </div>
              </button>

              {hasSecurity && (
                <>
                  <button
                    onClick={() => { setMethod("pin"); setStep("verify"); }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-primary flex items-center justify-center shrink-0">
                      <KeyRound className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white font-body">Security PIN</div>
                      <div className="text-xs text-white/40 font-body">Verify using your secret PIN</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setMethod("security_question"); setStep("verify"); }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white font-body">Security Question</div>
                      <div className="text-xs text-white/40 font-body">Answer your security question</div>
                    </div>
                  </button>
                </>
              )}

              {!hasSecurity && (
                <p className="text-white/30 text-xs font-body text-center">PIN and security question are not set up for this account.</p>
              )}

              <button onClick={reset} className="flex items-center gap-1 text-primary/70 hover:text-primary text-sm font-body transition-colors mx-auto mt-2">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>
          )}

          {/* Step 3: Verify & set new password */}
          {step === "verify" && method && (
            <div className="space-y-5">
              {method === "old_password" && (
                <div className="space-y-2">
                  <Label className="text-white/70 font-body text-sm">Current Password</Label>
                  <Input type="password" value={verificationValue} onChange={(e) => setVerificationValue(e.target.value)} placeholder="Enter current password" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary font-body" />
                </div>
              )}
              {method === "pin" && (
                <div className="space-y-2">
                  <Label className="text-white/70 font-body text-sm">Security PIN</Label>
                  <Input type="password" value={verificationValue} onChange={(e) => setVerificationValue(e.target.value.replace(/\D/g, "").slice(0, 8))} placeholder="Enter your PIN" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary font-body" />
                </div>
              )}
              {method === "security_question" && (
                <div className="space-y-2">
                  <Label className="text-white/70 font-body text-sm">{securityQuestion}</Label>
                  <Input value={verificationValue} onChange={(e) => setVerificationValue(e.target.value)} placeholder="Your answer" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary font-body" />
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-white/70 font-body text-sm">New Password</Label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary font-body" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 font-body text-sm">Confirm New Password</Label>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary font-body" />
              </div>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-destructive text-sm font-body bg-destructive/10 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <Button variant="hero" size="lg" className="w-full h-12" onClick={handleReset} disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <button onClick={() => { setStep("method"); setVerificationValue(""); setError(""); }} className="flex items-center gap-1 text-primary/70 hover:text-primary text-sm font-body transition-colors mx-auto">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>
          )}

          {/* Back to login */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button onClick={() => navigate("/login")} className="text-primary/70 hover:text-primary text-sm font-body transition-colors">
              ← Back to Login
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
