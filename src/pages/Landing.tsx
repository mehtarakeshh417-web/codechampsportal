import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/ParticleBackground";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Code, Gamepad2, GraduationCap, Shield, Trophy, Zap,
  Users, BookOpen, School, ChevronRight, CheckCircle2, Star, ArrowRight, MessageSquare, Mail,
} from "lucide-react";
import logo from "@/assets/logo.jpg";
import React, { useState } from "react";
import { toast } from "sonner";

const features = [
  { icon: GraduationCap, title: "Smart Curriculum", desc: "Class-wise structured CS education from Class 1 to 10", color: "neon-glow-blue" },
  { icon: Gamepad2, title: "Gamified Learning", desc: "XP, levels, badges, and leaderboards keep students engaged", color: "neon-glow-green" },
  { icon: Code, title: "Live Coding", desc: "Built-in sandbox for HTML, CSS, and Python projects", color: "neon-glow-purple" },
  { icon: Zap, title: "AI-Powered", desc: "Auto-generate assignments and detect weak topics", color: "neon-glow-orange" },
  { icon: Shield, title: "Multi-Tenant", desc: "Complete data isolation between schools", color: "neon-glow-blue" },
  { icon: Trophy, title: "Certifications", desc: "Auto-generated certificates with QR verification", color: "neon-glow-green" },
];

const stats = [
  { value: "1000+", label: "Students Learning", icon: Users },
  { value: "50+", label: "Schools Onboarded", icon: School },
  { value: "75+", label: "Interactive Topics", icon: BookOpen },
  { value: "10", label: "Class Levels", icon: GraduationCap },
];

const howItWorks = [
  { step: "01", title: "Sign Up Your School", desc: "Register in minutes. We set up your classes, teachers, and students.", icon: School },
  { step: "02", title: "Students Learn & Play", desc: "Gamified curriculum with XP, quizzes, coding labs, and AI tutoring.", icon: Gamepad2 },
  { step: "03", title: "Track & Achieve", desc: "Real-time analytics, progress reports, certificates, and leaderboards.", icon: Trophy },
];

const testimonials = [
  { name: "Priya Sharma", role: "Principal, DPS Noida", quote: "CodeChamps transformed how we teach computer science. Students are genuinely excited about learning now!", rating: 5 },
  { name: "Rajesh Kumar", role: "CS Teacher, Kendriya Vidyalaya", quote: "The AI assignment generator saves me hours every week. The gamification keeps my students engaged throughout.", rating: 5 },
  { name: "Ananya Patel", role: "Parent", quote: "My daughter went from struggling with computers to winning coding competitions. The structured curriculum is amazing.", rating: 5 },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "₹99",
    period: "/student/month",
    desc: "Perfect for small schools getting started",
    features: ["Up to 200 students", "Class 1-5 curriculum", "Basic analytics", "Email support", "5 teacher accounts"],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹149",
    period: "/student/month",
    desc: "Most popular for growing schools",
    features: ["Up to 1000 students", "Class 1-10 curriculum", "AI assignments & tutoring", "Advanced analytics", "Unlimited teachers", "Coding lab access", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large institutions & chains",
    features: ["Unlimited students", "Full curriculum + custom content", "White-label branding", "API access", "Dedicated account manager", "On-premise deployment", "SLA guarantee"],
    popular: false,
  },
];

const faqs = [
  { q: "What classes does CodeChamps cover?", a: "CodeChamps covers computer science curriculum from Class 1 to Class 10, aligned with CBSE and ICSE standards. Each class has age-appropriate content, from basic computer awareness to Python programming and data science." },
  { q: "How does the gamification work?", a: "Students earn XP (experience points) by completing topics, quizzes, and assignments. They level up through ranks like 'Byte Beginner' to 'Legendary Coder', earn badges, and compete on school leaderboards." },
  { q: "Is an internet connection required?", a: "Yes, CodeChamps is a cloud-based platform that requires an internet connection. This ensures all data is synced in real-time and students always have access to the latest content." },
  { q: "Can teachers customize assignments?", a: "Absolutely! Teachers can create manual assignments or use our AI generator to auto-create MCQ, True/False, and fill-in-the-blank questions based on topic, difficulty, and class level." },
  { q: "How is student data protected?", a: "We use enterprise-grade security with complete data isolation between schools (multi-tenancy), encrypted connections, and role-based access control. Each school's data is completely private." },
  { q: "Do you offer a free trial?", a: "Yes! We offer a 30-day free trial for schools with up to 50 students. Contact us to get started — no credit card required." },
];

const Landing = React.forwardRef<HTMLDivElement>((_, ref) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", school: "", message: "" });

  return (
    <div className="min-h-screen gradient-hero text-white overflow-hidden">
      <ParticleBackground />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-sm border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <img src={logo} alt="CodeChamps logo" className="w-10 h-10 rounded-xl object-contain" />
          <span className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CodeChamps</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-body text-white/60">
          <a href="#features" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">FAQ</a>
          <a href="#contact" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Contact</a>
        </div>
        <Button variant="hero" size="xl" onClick={() => navigate("/login")}>
          Login
        </Button>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 container mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-36">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6 gradient-border"
            >
              <Zap className="w-4 h-4 text-neon-green" />
              <span className="text-base md:text-lg font-body text-neon-green font-semibold">The Future of Computer Education</span>
            </motion.div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <motion.span 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block"
              >Gamified</motion.span>{" "}
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white inline-block">Computer</motion.span>
              <br />
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white inline-block">Education for</motion.span>{" "}
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-gradient-fire inline-block">Schools</motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="font-body text-lg text-white/60 mb-8 max-w-lg leading-relaxed"
            >
              CodeChamps transforms computer science teaching with XP systems, AI assignments, live coding sandboxes, and class-wise curriculum — from Class 1 to 10.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" onClick={() => navigate("/login")} className="group">
                Get Started <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero" size="xl" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Book Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50 animate-glow-pulse" />
            <div className="relative rounded-2xl overflow-hidden gradient-border">
              <img src={heroBg} alt="CodeChamps gamified classroom" className="w-full rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker/70 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden md:flex justify-center mt-12"
        >
          <div className="flex flex-col items-center gap-2 text-white/20">
            <span className="text-xs font-body">Scroll to explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-white/30" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Counter */}
      <section className="relative z-10 container mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-white/50 text-sm font-body">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 container mx-auto px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Powerful Features
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className={`glass-card p-6 ${f.color} cursor-pointer`}
            >
              <f.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
              <p className="font-body text-white/60 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 container mx-auto px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-white"
        >
          How It Works
        </motion.h2>
        <p className="text-center text-white/50 font-body mb-12 max-w-lg mx-auto">Get your school up and running in 3 simple steps</p>
        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-9 h-9 text-primary" />
              </div>
              <div className="font-display text-xs text-primary/60 tracking-widest mb-2">{step.step}</div>
              <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="font-body text-white/50 text-sm">{step.desc}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-10 -right-4 text-white/10">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 container mx-auto px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Loved by Schools
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="font-body text-white/70 text-sm mb-4 italic">"{t.quote}"</p>
              <div>
                <div className="font-display text-sm font-bold text-white">{t.name}</div>
                <div className="text-xs text-white/40 font-body">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 container mx-auto px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-white"
        >
          Simple Pricing
        </motion.h2>
        <p className="text-center text-white/50 font-body mb-12">Choose the plan that fits your school</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-7 relative ${plan.popular ? "neon-glow-blue border-primary/30" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-display font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-white/40 text-xs font-body mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/40 text-sm font-body">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-body text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full rounded-xl ${plan.popular ? "bg-gradient-to-r from-primary to-secondary text-white" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"}`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 container mx-auto px-6 pb-20 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-display text-sm font-bold text-white pr-4">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-white/30 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-90" : ""}`} />
              </button>
              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-5 pb-5"
                >
                  <p className="font-body text-white/60 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Demo Form */}
      <section id="contact" className="relative z-10 container mx-auto px-6 pb-20 max-w-2xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 neon-glow-blue"
        >
          <div className="text-center mb-8">
            <Mail className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="font-display text-2xl font-bold text-white mb-2">Book a Free Demo</h2>
            <p className="font-body text-white/50 text-sm">Fill in your details and we'll reach out within 24 hours</p>
          </div>
          <div className="space-y-4">
            <input
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary/50 font-body"
            />
            <input
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              placeholder="Email Address"
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary/50 font-body"
            />
            <input
              value={contactForm.school}
              onChange={(e) => setContactForm({ ...contactForm, school: e.target.value })}
              placeholder="School Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary/50 font-body"
            />
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              placeholder="Tell us about your requirements..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary/50 font-body resize-none"
            />
            <Button
              onClick={() => {
                setContactForm({ name: "", email: "", school: "", message: "" });
                toast.success("Thank you! We'll contact you within 24 hours.");
              }}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl h-12 font-bold"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Submit Request
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="CodeChamps" className="w-6 h-6 rounded-lg object-contain" />
            <span className="font-display text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CodeChamps</span>
          </div>
          <p className="text-white/30 text-xs font-body">© 2026 CodeChamps. All rights reserved. Made with ❤️ in India.</p>
        </div>
      </footer>
    </div>
  );
});

Landing.displayName = "Landing";

export default Landing;
