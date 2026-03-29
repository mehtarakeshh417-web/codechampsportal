import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Search, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`;

const TypingIndicator = () => (
  <div className="flex gap-2 items-center">
    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
      <Bot className="w-4 h-4 text-primary" />
    </div>
    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  </div>
);

const ChatBubble = ({ msg }: { msg: Msg }) => {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 mt-1 border border-primary/20">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[82%] px-3.5 py-2.5 text-sm font-body leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-primary/25 to-secondary/15 text-white rounded-2xl rounded-br-sm border border-primary/20"
            : "bg-white/[0.06] text-white/90 rounded-2xl rounded-bl-sm border border-white/10"
        }`}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{msg.content}</span>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_pre]:bg-black/30 [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:my-2 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_strong]:text-white">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-secondary/20 to-neon-green/20 flex items-center justify-center shrink-0 mt-1 border border-secondary/20">
          <User className="w-4 h-4 text-secondary" />
        </div>
      )}
    </motion.div>
  );
};

const AiTutorChat = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi there! 👋 I'm your **CodeChamps AI Tutor** with real-time web search! Ask me anything about computers, coding, or technology — I'll find the latest info for you!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    const allMessages = [...messages.filter((m) => m !== messages[0]), userMsg];

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
          classLevel: user?.className || "",
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Something went wrong" }));
        setMessages((prev) => [...prev, { role: "assistant", content: err.error || "Sorry, I'm having trouble right now. Try again! 🔄" }]);
        setIsLoading(false);
        return;
      }

      if (!resp.body) throw new Error("No stream body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const currentContent = assistantSoFar;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: currentContent } : m));
                }
                return [...prev, { role: "assistant", content: currentContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error("AI Tutor error:", e);
      setMessages((prev) => [...prev, { role: "assistant", content: "Oops! Something went wrong. Please try again. 🔄" }]);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-110 transition-all duration-300 group"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-neon-green rounded-full border-2 border-cyber-darker animate-pulse" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-8rem)] rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/40"
            style={{ background: "hsl(220 30% 7%)" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-30" />
              <div className="relative flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-display text-sm font-bold text-white flex items-center gap-2">
                    AI Tutor
                    <span className="inline-flex items-center gap-1 text-[10px] font-body font-semibold text-neon-green bg-neon-green/10 px-2 py-0.5 rounded-full border border-neon-green/20">
                      <Search className="w-2.5 h-2.5" /> Live Search
                    </span>
                  </div>
                  <div className="text-xs text-white/50 font-body mt-0.5">Real-time answers about CS & tech</div>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white/40" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <ChatBubble key={i} msg={msg} />
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-white/[0.02]">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about CS..."
                  className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-primary/40 focus:bg-white/[0.08] font-body transition-all duration-200"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading || !input.trim()}
                  className="rounded-xl bg-gradient-to-r from-primary to-secondary px-3 shadow-lg shadow-primary/20 disabled:shadow-none transition-shadow"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-white/20 font-body">
                <Search className="w-2.5 h-2.5" /> Powered by web search + AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiTutorChat;
