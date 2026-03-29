import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, AlertCircle, ShieldCheck, Sparkles } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(username.trim(), password);
    setLoading(false);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      {/* Full-screen background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/login-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/60 backdrop-blur-[2px]" />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-secondary/10 to-transparent blur-2xl"
        />
        <motion.div
          animate={{ y: [10, -15, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[25%] w-20 h-20 rounded-full bg-gradient-to-br from-neon-green/8 to-transparent blur-xl"
        />
      </div>

      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-10 bg-black/40 backdrop-blur-xl border border-white/10 relative overflow-hidden">
          {/* Subtle top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-neon-green" />
          
          {/* Logo & Title */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ y: -15, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative inline-block"
            >
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl" />
              <img
                src="/assets/logo.jpg"
                alt="CodeChamps logo"
                className="relative w-24 h-24 rounded-2xl object-contain mx-auto mb-5 ring-2 ring-primary/30 shadow-lg shadow-primary/20"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide"
            >
              CodeChamps
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 font-body text-sm mt-2"
            >
              Welcome back — sign in to continue
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-2">
              <Label htmlFor="username" className="text-white font-body text-sm font-bold">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:bg-white/[0.08] font-body text-base transition-all duration-200"
                required
              />
            </motion.div>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-2">
              <Label htmlFor="password" className="text-white font-body text-sm font-bold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:bg-white/[0.08] font-body text-base transition-all duration-200"
                required
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm font-body bg-destructive/10 rounded-lg px-3 py-2 border border-destructive/20"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <Button type="submit" variant="hero" size="lg" className="w-full h-12 text-base group" disabled={loading}>
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    Sign In
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Security badge */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="mt-6 flex items-center justify-center gap-1.5 text-white/25 text-xs font-body"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Secured with PIN & security questions
          </motion.div>

          {/* Forgot password */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-4 text-center">
            <button onClick={() => navigate("/forgot-password")} className="text-primary/70 hover:text-primary text-sm font-body transition-colors">
              Forgot Password?
            </button>
          </motion.div>

          {/* Back link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-3 pt-4 border-t border-white/10 text-center">
            <button onClick={() => navigate("/")} className="text-primary/70 hover:text-primary text-sm font-body transition-colors flex items-center gap-1 mx-auto">
              <Sparkles className="w-3 h-3" /> Back to Home
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
