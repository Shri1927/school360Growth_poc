import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { HeroSchoolScene } from "@/components/shared/HeroSchoolScene";
import { FooterCtaSection } from "@/components/shared/FooterCtaSection";
import { AiBadge } from "@/components/shared/AiBadge";
import {
  Sparkles,
  Flame,
  Trophy,
  FileSpreadsheet,
  AlertCircle,
  Compass,
  MessageSquareOff,
  UserCheck,
  TrendingUp,
  HeartHandshake,
  Award,
  ShieldAlert,
  Target,
  ShieldCheck,
  Users,
  Lock,
  CheckCircle2,
  Quote,
} from "lucide-react";

export function Landing() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeStakeholder, setActiveStakeholder] = useState<string>("students");

  const headlineText = "The free, fun, and effective way to grow!";
  const headlineWords = headlineText.split(" ");

  const renderWords = (text: string) => {
    return text.split(" ").map((word, idx) => (
      <span key={idx} className="gsap-text-word inline-block mr-[0.25em] transform-gpu">
        {word}
      </span>
    ));
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || !containerRef.current) return;

      const root = containerRef.current;

      // Hero Entrance Timeline
      if (heroRef.current) {
        const words = heroRef.current.querySelectorAll(".hero-word");
        const subheadline = heroRef.current.querySelector(".hero-subheadline");
        const ctas = heroRef.current.querySelectorAll(".hero-cta");

        if (words.length && subheadline && ctas.length) {
          const heroTl = gsap.timeline({ delay: 0.1 });
          heroTl
            .fromTo(
              words,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.06,
                ease: "back.out(1.6)",
                duration: 0.7,
              }
            )
            .fromTo(
              subheadline,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, ease: "power2.out", duration: 0.6 },
              "-=0.3"
            )
            .fromTo(
              ctas,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                ease: "elastic.out(1, 0.6)",
                duration: 0.8,
                stagger: 0.1,
              },
              "-=0.2"
            );
        }
      }

      // 1. Stats Strip Reveal
      const statsCards = root.querySelectorAll(".gsap-stat-card");
      if (statsCards.length) {
        gsap.fromTo(
          statsCards,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: ".gsap-stats-strip",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Function to setup section text + card animation timeline
      const setupSectionAnim = (
        sectionId: string,
        cardSelector: string,
        startTrigger = "top 75%"
      ) => {
        const section = root.querySelector(sectionId);
        if (!section) return;

        const badge = section.querySelector(".gsap-sec-badge");
        const words = section.querySelectorAll(".gsap-text-word");
        const desc = section.querySelector(".gsap-sec-desc");
        const cards = section.querySelectorAll(cardSelector);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: startTrigger,
            toggleActions: "play none none none",
          },
        });

        if (badge) {
          tl.fromTo(
            badge,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.6)" }
          );
        }

        if (words.length) {
          tl.fromTo(
            words,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 0.6,
              ease: "back.out(1.6)",
            },
            badge ? "-=0.3" : 0
          );
        }

        if (desc) {
          tl.fromTo(
            desc,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          );
        }

        if (cards.length) {
          tl.fromTo(
            cards,
            { y: 40, scale: 0.88, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "back.out(1.6)",
            },
            "-=0.2"
          );
        }
      };

      // Apply Word-Stagger Text + Cards Animations to Sections 2–7
      setupSectionAnim("#sec-problem", ".gsap-prob-card");
      setupSectionAnim("#sec-solution", ".gsap-sol-banner");
      setupSectionAnim("#sec-modules", ".gsap-mod-card");
      setupSectionAnim("#sec-how", ".gsap-step-card");
      setupSectionAnim("#sec-stakeholders", ".gsap-stake-card");
      setupSectionAnim("#sec-ai", ".gsap-ai-card");
    },
    { scope: containerRef }
  );

  const handleCtaMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.25, ease: "back.out(3)" });
  };

  const handleCtaMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
  };

  const handleCtaMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 0.94, duration: 0.1, ease: "power2.in" });
  };

  const handleCtaMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "back.out(2)" });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const coreModules = [
    {
      title: "Unified Student Profile",
      description: "Academic history, skills, goals and evidence in one record.",
      icon: UserCheck,
      color: "#58CC02",
      bgColor: "#EEFCE8",
    },
    {
      title: "Academic Progress Tracking",
      description: "Marks, attendance, trends and learning-gap detection.",
      icon: TrendingUp,
      color: "#1CB0F6",
      bgColor: "#DDF4FF",
    },
    {
      title: "Personality & Behaviour",
      description: "Structured observations across confidence, teamwork, leadership.",
      icon: HeartHandshake,
      color: "#FF4B4B",
      bgColor: "#FFEDED",
    },
    {
      title: "Skills & Competency Tracking",
      description: "Academic, digital, social and career skills with real evidence.",
      icon: Award,
      color: "#FFC800",
      bgColor: "#FFF9DB",
    },
    {
      title: "Career Guidance",
      description: "Interest exploration, pathways, courses and job readiness.",
      icon: Compass,
      color: "#CE82FF",
      bgColor: "#F3E8FF",
    },
    {
      title: "Counselling & Support",
      description: "Confidential case management, follow-ups and referrals.",
      icon: ShieldAlert,
      color: "#FF9600",
      bgColor: "#FFF4E5",
    },
    {
      title: "Goals & Development Plans",
      description: "Milestone-based plans with mentors and deadlines.",
      icon: Target,
      color: "#1CB0F6",
      bgColor: "#DDF4FF",
    },
    {
      title: "Digital Portfolio",
      description: "Verified certificates, projects, achievements — shareable profiles.",
      icon: ShieldCheck,
      color: "#58CC02",
      bgColor: "#EEFCE8",
    },
  ];

  const stakeholders = [
    {
      id: "students",
      label: "Students",
      emoji: "🎓",
      tag: "LEARNER QUEST",
      description: "A personal dashboard for progress, goals, skills and portfolio.",
      color: "#58CC02",
      bgColor: "#EEFCE8",
      borderColor: "#A5ED6E",
    },
    {
      id: "parents",
      label: "Parents",
      emoji: "🏠",
      tag: "FAMILY HUB",
      description: "Transparent progress, alerts, teacher feedback and consent controls.",
      color: "#1CB0F6",
      bgColor: "#DDF4FF",
      borderColor: "#84D8FF",
    },
    {
      id: "teachers",
      label: "Teachers",
      emoji: "📚",
      tag: "CLASS COACH",
      description: "Attendance, marks, observations and intervention tools in one flow.",
      color: "#FFC800",
      bgColor: "#FFF9DB",
      borderColor: "#FFE885",
    },
    {
      id: "counsellors",
      label: "Counsellors",
      emoji: "🌱",
      tag: "WELLBEING",
      description: "Structured, confidential case management and follow-ups.",
      color: "#CE82FF",
      bgColor: "#F3E8FF",
      borderColor: "#D8B4FE",
    },
    {
      id: "principals",
      label: "Principals / Management",
      emoji: "🏆",
      tag: "LEADERSHIP",
      description: "Institution-wide analytics and risk indicators.",
      color: "#FF9600",
      bgColor: "#FFF4E5",
      borderColor: "#FFD8A8",
    },
    {
      id: "institutes",
      label: "Institutes",
      emoji: "⚡",
      tag: "GOVERNANCE",
      description: "Batch, assessment and certification management.",
      color: "#FF4B4B",
      bgColor: "#FFEDED",
      borderColor: "#FFB8B8",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-[#4b4b4b] flex flex-col items-center justify-start overflow-x-hidden">
      {/* Top Navbar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 mb-4 border-b-2 border-[#e5e5e5]">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] flex items-center justify-center text-white text-2xl font-black shadow-none">
            🦉
          </div>
          <span className="font-feather-student font-extrabold text-2xl text-[#58cc02] tracking-tight">
            SCHOOL360
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="duoOutline"
            size="sm"
            onClick={goToLogin}
            onMouseEnter={handleCtaMouseEnter}
            onMouseLeave={handleCtaMouseLeave}
            onMouseDown={handleCtaMouseDown}
            onMouseUp={handleCtaMouseUp}
          >
            INTERACTIVE DEMO
          </Button>
          <Button
            variant="duoPrimary"
            size="sm"
            onClick={goToLogin}
            onMouseEnter={handleCtaMouseEnter}
            onMouseLeave={handleCtaMouseLeave}
            onMouseDown={handleCtaMouseDown}
            onMouseUp={handleCtaMouseUp}
          >
            GET STARTED
          </Button>
        </div>
      </header>

      {/* SECTION 1: HERO SECTION */}
      <main ref={heroRef} className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 px-4 sm:px-6 mb-12">
        {/* Hero Left Text Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eefce8] border-2 border-[#a5ed6e] text-[#58cc02] font-black text-xs uppercase tracking-wider">
            <Sparkles className="size-4 fill-[#58cc02]" />
            <span>AI-POWERED K-12 GROWTH PLATFORM</span>
          </div>

          <h1 className="font-feather-student font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#58cc02] leading-[1.1] tracking-tight max-w-2xl">
            {headlineWords.map((word, idx) => (
              <span key={idx} className="hero-word inline-block mr-[0.25em] transform-gpu">
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-subheadline text-base sm:text-lg md:text-xl font-bold text-[#777777] max-w-xl leading-relaxed">
            One student, one continuous digital profile, and one gamified support platform for academic, personal, and career excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2 w-full max-w-md">
            <Button
              variant="duoPrimary"
              size="lg"
              className="hero-cta w-full sm:w-auto h-14 px-8 text-base font-extrabold uppercase tracking-wider shadow-none transform-gpu"
              onClick={goToLogin}
              onMouseEnter={handleCtaMouseEnter}
              onMouseLeave={handleCtaMouseLeave}
              onMouseDown={handleCtaMouseDown}
              onMouseUp={handleCtaMouseUp}
            >
              START LEARNING NOW
            </Button>
            <Button
              variant="duoSecondary"
              size="lg"
              className="hero-cta w-full sm:w-auto h-14 px-8 text-base font-extrabold uppercase tracking-wider shadow-none transform-gpu"
              onClick={goToLogin}
              onMouseEnter={handleCtaMouseEnter}
              onMouseLeave={handleCtaMouseLeave}
              onMouseDown={handleCtaMouseDown}
              onMouseUp={handleCtaMouseUp}
            >
              TEACHER / ADMIN ACCESS
            </Button>
          </div>
        </div>

        {/* Hero Right Column: Animated GSAP School Scene SVG */}
        <div className="lg:col-span-5 flex items-center justify-center w-full max-w-lg mx-auto">
          <HeroSchoolScene className="w-full h-auto max-h-[440px] drop-shadow-md" />
        </div>
      </main>

      {/* Gamification Stats Strip */}
      <section className="gsap-stats-strip w-full max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        <div className="gsap-stat-card p-4 rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white text-center transform-gpu">
          <div className="text-3xl font-black font-feather-student text-[#58cc02]">100%</div>
          <div className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mt-1">FREE FOR SCHOOLS</div>
        </div>
        <div className="gsap-stat-card p-4 rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white text-center transform-gpu">
          <div className="text-3xl font-black font-feather-student text-[#1cb0f6] flex items-center justify-center gap-1">
            <Flame className="size-7 text-[#ff4b4b] fill-[#ff4b4b]" /> 7 DAYS
          </div>
          <div className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mt-1">CURRENT STREAK</div>
        </div>
        <div className="gsap-stat-card p-4 rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white text-center transform-gpu">
          <div className="text-3xl font-black font-feather-student text-[#ffc800] flex items-center justify-center gap-1">
            <Trophy className="size-7 text-[#ffc800] fill-[#ffc800]" /> 360°
          </div>
          <div className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mt-1">GROWTH MATRIX</div>
        </div>
        <div className="gsap-stat-card p-4 rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white text-center transform-gpu">
          <div className="text-3xl font-black font-feather-student text-[#042c60]">6 ROLES</div>
          <div className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mt-1">UNIFIED PORTAL</div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section id="sec-problem" className="w-full bg-[#fafafa] border-y-2 border-[#e5e5e5] py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="gsap-sec-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffeded] border-2 border-[#ffb8b8] text-[#ff4b4b] font-black text-xs uppercase tracking-wider">
              <AlertCircle className="size-4" />
              <span>THE CHALLENGE</span>
            </div>
            <h2 className="font-feather-student font-extrabold text-3xl sm:text-5xl text-[#042c60] tracking-tight leading-tight">
              {renderWords("Report cards tell you a score. They don't tell you the student.")}
            </h2>
            <p className="gsap-sec-desc text-base sm:text-lg font-bold text-[#777777] leading-relaxed">
              Most schools track marks, attendance and fees in one system, run counselling on paper, manage career guidance informally, and communicate with parents over scattered messages and calls. The result: strengths go unnoticed, gaps are found late, and no one has one continuous view of a student's journey.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="gsap-prob-card p-6 bg-white rounded-2xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] hover:border-[#ff4b4b] transition-all space-y-3 transform-gpu">
              <div className="size-12 rounded-2xl bg-[#ffeded] border-2 border-[#ffb8b8] text-[#ff4b4b] flex items-center justify-center font-black">
                <FileSpreadsheet className="size-6" />
              </div>
              <h3 className="font-feather-student font-extrabold text-slate-900 text-xl">Fragmented Data Systems</h3>
              <p className="text-xs sm:text-sm font-bold text-[#777777] leading-relaxed">
                Information lives across disconnected spreadsheets, physical registers, and messaging apps with zero synthesis.
              </p>
            </div>

            <div className="gsap-prob-card p-6 bg-white rounded-2xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] hover:border-[#ff9600] transition-all space-y-3 transform-gpu">
              <div className="size-12 rounded-2xl bg-[#fff4e5] border-2 border-[#ffd8a8] text-[#ff9600] flex items-center justify-center font-black">
                <AlertCircle className="size-6" />
              </div>
              <h3 className="font-feather-student font-extrabold text-slate-900 text-xl">Late Gap Identification</h3>
              <p className="text-xs sm:text-sm font-bold text-[#777777] leading-relaxed">
                Learning gaps and at-risk students are flagged long after term exams are over, missing the critical window for intervention.
              </p>
            </div>

            <div className="gsap-prob-card p-6 bg-white rounded-2xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] hover:border-[#1cb0f6] transition-all space-y-3 transform-gpu">
              <div className="size-12 rounded-2xl bg-[#ddf4ff] border-2 border-[#84d8ff] text-[#1cb0f6] flex items-center justify-center font-black">
                <Compass className="size-6" />
              </div>
              <h3 className="font-feather-student font-extrabold text-slate-900 text-xl">Disconnected Guidance</h3>
              <p className="text-xs sm:text-sm font-bold text-[#777777] leading-relaxed">
                Career counseling remains guesswork, detached from longitudinal academic performance, skills rating, and interest data.
              </p>
            </div>

            <div className="gsap-prob-card p-6 bg-white rounded-2xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] hover:border-[#58cc02] transition-all space-y-3 transform-gpu">
              <div className="size-12 rounded-2xl bg-[#eefce8] border-2 border-[#a5ed6e] text-[#58cc02] flex items-center justify-center font-black">
                <MessageSquareOff className="size-6" />
              </div>
              <h3 className="font-feather-student font-extrabold text-slate-900 text-xl">Scores Without Context</h3>
              <p className="text-xs sm:text-sm font-bold text-[#777777] leading-relaxed">
                Parents receive standalone percentages or letter marks without understanding root causes, behavioral growth, or action plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section id="sec-solution" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="gsap-sec-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eefce8] border-2 border-[#a5ed6e] text-[#58cc02] font-black text-xs uppercase tracking-wider">
              <Sparkles className="size-4 fill-[#58cc02]" />
              <span>THE SAMVRIDDHI APPROACH</span>
            </div>
            <h2 className="font-feather-student font-extrabold text-3xl sm:text-5xl text-[#58cc02] tracking-tight leading-tight">
              {renderWords("A continuous digital growth journey, from school to career.")}
            </h2>
            <p className="gsap-sec-desc text-base sm:text-lg font-bold text-[#777777] leading-relaxed">
              Samvriddhi replaces fragmented records with one secure, evidence-based student profile that follows a learner across years — combining performance, behaviour, skills, goals and guidance into practical insights and development plans, not just paperwork.
            </p>
          </div>

          {/* Gamified Pull-Quote 3D Banner */}
          <div className="gsap-sol-banner p-8 sm:p-12 rounded-3xl bg-[#eefce8] border-4 border-[#58cc02] border-b-8 border-b-[#46a302] text-[#042c60] shadow-md relative overflow-hidden text-center space-y-6 transform-gpu">
            <Quote className="absolute right-6 top-6 size-28 text-[#58cc02]/20 pointer-events-none" />
            <p className="font-feather-student font-extrabold text-xl sm:text-3xl leading-snug tracking-tight">
              "One student, one continuous digital profile, and one coordinated support system for complete academic, personal, social and career growth."
            </p>
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#58cc02] text-white font-black text-xs uppercase tracking-widest shadow-sm">
              <Sparkles className="size-4" />
              <span>CORE SAMVRIDDHI PROPOSITION</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE MODULES */}
      <section id="sec-modules" className="w-full bg-[#fafafa] border-y-2 border-[#e5e5e5] py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="gsap-sec-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ddf4ff] border-2 border-[#84d8ff] text-[#1cb0f6] font-black text-xs uppercase tracking-wider">
              <Trophy className="size-4" />
              <span>PLATFORM MODULES</span>
            </div>
            <h2 className="font-feather-student font-extrabold text-3xl sm:text-5xl text-[#042c60] tracking-tight leading-tight">
              {renderWords("Everything a student's growth needs, in one place.")}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreModules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="gsap-mod-card p-6 bg-white rounded-2xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] hover:border-[#58cc02] transition-all space-y-3 transform-gpu"
                >
                  <div
                    className="size-12 rounded-2xl border-2 flex items-center justify-center font-black"
                    style={{ backgroundColor: m.bgColor, borderColor: m.color, color: m.color }}
                  >
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-feather-student font-extrabold text-slate-900 text-lg">{m.title}</h3>
                  <p className="text-xs font-bold text-[#777777] leading-relaxed">{m.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section id="sec-how" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="gsap-sec-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff9db] border-2 border-[#ffe885] text-[#d97706] font-black text-xs uppercase tracking-wider">
              <TrendingUp className="size-4" />
              <span>SIMPLE WORKFLOW</span>
            </div>
            <h2 className="font-feather-student font-extrabold text-3xl sm:text-5xl text-[#042c60] tracking-tight leading-tight">
              {renderWords("From daily data to real decisions.")}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Capture",
                desc: "Teachers, counsellors and students log academics, attendance, observations, goals and achievements as part of normal routine.",
                color: "#58CC02",
                bgColor: "#EEFCE8",
                borderColor: "#A5ED6E",
              },
              {
                step: "02",
                title: "Understand",
                desc: "The platform turns raw data into trends, learning gaps and early risk indicators — reviewed and validated by educators, never automated alone.",
                color: "#1CB0F6",
                bgColor: "#DDF4FF",
                borderColor: "#84D8FF",
              },
              {
                step: "03",
                title: "Act",
                desc: "Role-based dashboards turn insight into intervention plans, parent conversations, counselling support and career roadmaps.",
                color: "#FFC800",
                bgColor: "#FFF9DB",
                borderColor: "#FFE885",
              },
              {
                step: "04",
                title: "Grow",
                desc: "Students build a portfolio and growth record that follows them from school through college and into career readiness.",
                color: "#CE82FF",
                bgColor: "#F3E8FF",
                borderColor: "#D8B4FE",
              },
            ].map((st, i) => (
              <div
                key={i}
                className="gsap-step-card p-6 bg-white rounded-2xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] hover:border-[#58cc02] transition-all space-y-3 transform-gpu"
              >
                <div
                  className="size-12 rounded-2xl border-2 flex items-center justify-center font-feather-student font-black text-xl"
                  style={{ backgroundColor: st.bgColor, borderColor: st.borderColor, color: st.color }}
                >
                  {st.step}
                </div>
                <h3 className="font-feather-student font-extrabold text-slate-900 text-xl">{st.title}</h3>
                <p className="text-xs font-bold text-[#777777] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BUILT FOR EVERY STAKEHOLDER */}
      <section id="sec-stakeholders" className="w-full bg-[#fafafa] border-y-2 border-[#e5e5e5] py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="gsap-sec-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3e8ff] border-2 border-[#d8b4fe] text-[#ce82ff] font-black text-xs uppercase tracking-wider">
              <Users className="size-4" />
              <span>MULTI-STAKEHOLDER VIEWS</span>
            </div>
            <h2 className="font-feather-student font-extrabold text-3xl sm:text-5xl text-[#042c60] tracking-tight leading-tight">
              {renderWords("One platform. A different view for everyone who supports the student.")}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stakeholders.map((st) => (
              <div
                key={st.id}
                onClick={() => setActiveStakeholder(st.id)}
                className={`gsap-stake-card p-6 rounded-2xl border-2 border-b-4 transition-all cursor-pointer transform-gpu ${
                  activeStakeholder === st.id
                    ? "bg-white border-[#58cc02] border-b-[#46a302] shadow-md"
                    : "bg-white border-[#e5e5e5] border-b-[#e5e5e5] hover:border-[#58cc02]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="size-12 rounded-2xl bg-[#fafafa] border-2 border-[#e5e5e5] flex items-center justify-center text-2xl">
                    {st.emoji}
                  </div>
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border"
                    style={{ backgroundColor: st.bgColor, borderColor: st.borderColor, color: st.color }}
                  >
                    {st.tag}
                  </span>
                </div>
                <h3 className="font-feather-student font-extrabold text-slate-900 text-xl mb-1">{st.label}</h3>
                <p className="text-xs font-bold text-[#777777] leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: RESPONSIBLE AI, BUILT IN */}
      <section id="sec-ai" className="w-full py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl border-4 border-[#a5ed6e] border-b-8 border-b-[#58cc02] bg-white shadow-md space-y-8">
          <div className="space-y-4">
            <div className="gsap-sec-badge flex items-center gap-2">
              <AiBadge />
              <span className="text-xs font-black text-[#58cc02] uppercase tracking-wider">RESPONSIBLE GOVERNANCE</span>
            </div>
            <h2 className="font-feather-student font-extrabold text-3xl sm:text-4xl text-[#042c60] tracking-tight leading-tight">
              {renderWords("AI that assists educators — never replaces their judgement.")}
            </h2>
            <p className="gsap-sec-desc text-xs sm:text-sm font-bold text-[#777777] leading-relaxed">
              Every AI-generated insight — risk indicators, progress summaries, study plans, career suggestions — is explainable, reviewable and requires educator validation before any action is taken. No automated diagnosis, no irreversible decisions, no student ever labelled by a score alone.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 pt-6 border-t-2 border-[#e5e5e5]">
            <div className="gsap-ai-card p-4 rounded-2xl bg-[#eefce8] border-2 border-[#a5ed6e] flex items-start gap-3 transform-gpu">
              <CheckCircle2 className="size-6 text-[#58cc02] shrink-0 mt-0.5" />
              <div>
                <p className="font-feather-student font-extrabold text-[#042c60] text-base">Human-Reviewed</p>
                <p className="text-xs font-bold text-[#777777] mt-0.5">Validated by educators before release to students or parents.</p>
              </div>
            </div>

            <div className="gsap-ai-card p-4 rounded-2xl bg-[#ddf4ff] border-2 border-[#84d8ff] flex items-start gap-3 transform-gpu">
              <Sparkles className="size-6 text-[#1cb0f6] shrink-0 mt-0.5 fill-[#1cb0f6]" />
              <div>
                <p className="font-feather-student font-extrabold text-[#042c60] text-base">Transparent</p>
                <p className="text-xs font-bold text-[#777777] mt-0.5">Recommendations backed by observable data points.</p>
              </div>
            </div>

            <div className="gsap-ai-card p-4 rounded-2xl bg-[#f3e8ff] border-2 border-[#d8b4fe] flex items-start gap-3 transform-gpu">
              <Lock className="size-6 text-[#ce82ff] shrink-0 mt-0.5" />
              <div>
                <p className="font-feather-student font-extrabold text-[#042c60] text-base">Confidential</p>
                <p className="text-xs font-bold text-[#777777] mt-0.5">Counselling data strictly restricted to authorized staff.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: GAMIFIED FOOTER CTA BAND */}
      <FooterCtaSection />

      {/* GREEN ALIGNED FOOTER */}
      <footer className="w-full bg-[#58CC02] text-white text-xs py-12 px-4 sm:px-6 border-t border-[#46A302]/50 relative z-20">
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="size-9 rounded-xl bg-white text-[#58CC02] flex items-center justify-center text-xl font-black shadow-sm">
                🦉
              </div>
              <span className="font-extrabold font-feather-student text-xl text-white tracking-tight">
                SAMVRIDDHI
              </span>
            </div>
            <p className="text-emerald-100 text-xs font-medium leading-relaxed">
              Samvriddhi — the complete growth platform for every student.
            </p>
          </div>

          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-3">Product</p>
            <ul className="space-y-2">
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors" onClick={goToLogin}>Modules & Features</li>
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors" onClick={goToLogin}>Multi-Stakeholder Roles</li>
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors" onClick={goToLogin}>AI & Responsible Governance</li>
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors" onClick={goToLogin}>Pricing & Implementation</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-3">Company</p>
            <ul className="space-y-2">
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors">About Samvriddhi</li>
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors">Blog & Case Studies</li>
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors">Contact Us</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-3">Legal</p>
            <ul className="space-y-2">
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors">Privacy Policy</li>
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors">Data Protection</li>
              <li className="text-emerald-100 hover:text-white hover:underline cursor-pointer font-medium transition-colors">Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-[#46A302] text-center text-emerald-100 font-medium">
          <p>© 2026 Samvriddhi Student 360° Growth Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
