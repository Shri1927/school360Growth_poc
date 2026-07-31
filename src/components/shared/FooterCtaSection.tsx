import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { GrowthMascot } from "@/components/shared/GrowthMascot";
import { FloatingRewardIcon } from "@/components/shared/FloatingRewardIcon";
import { WavyHillBackground } from "@/components/shared/WavyHillBackground";
import { ArrowRight, Sparkles } from "lucide-react";

export function FooterCtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const el = sectionRef.current;
      if (!el) return;

      const wave = el.querySelector('[data-anim="wavy-bg"]');
      const mascot = el.querySelector('[data-anim="mascot-wrapper"]');
      const ctaBtn = el.querySelector('[data-anim="cta-btn"]');
      const rewardIcons = el.querySelectorAll(".data-anim-reward");

      if (prefersReducedMotion) {
        if (wave) gsap.set(wave, { opacity: 1, y: 0 });
        if (mascot) gsap.set(mascot, { opacity: 1, scale: 1, y: 0 });
        if (ctaBtn) gsap.set(ctaBtn, { opacity: 1, scale: 1 });
        if (rewardIcons.length) gsap.set(rewardIcons, { opacity: 1, scale: 1 });
        return;
      }

      // Initial Hidden States
      if (wave) gsap.set(wave, { y: 40, opacity: 0 });
      if (mascot) gsap.set(mascot, { y: 60, scale: 0.7, opacity: 0, transformOrigin: "bottom center" });
      if (ctaBtn) gsap.set(ctaBtn, { scale: 0, opacity: 0, transformOrigin: "center center" });
      if (rewardIcons.length) gsap.set(rewardIcons, { scale: 0, opacity: 0, transformOrigin: "center center" });

      // ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      if (wave) {
        tl.to(wave, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" });
      }

      if (mascot) {
        tl.to(mascot, { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" }, "-=0.4");
      }

      if (ctaBtn) {
        tl.to(ctaBtn, { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.6)" }, "-=0.3");
      }

      if (rewardIcons.length) {
        tl.to(
          rewardIcons,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(2)",
          },
          "-=0.4"
        );
      }

      // Parallax Mousemove (Desktop Only)
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (!isMobile && rewardIcons.length) {
        const xTo = gsap.quickTo(rewardIcons, "x", { duration: 0.8, ease: "power2.out" });
        const yTo = gsap.quickTo(rewardIcons, "y", { duration: 0.8, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
          xTo(-relX * 16);
          yTo(-relY * 16);
        };

        el.addEventListener("mousemove", handleMouseMove);
        return () => el.removeEventListener("mousemove", handleMouseMove);
      }
    },
    { scope: sectionRef }
  );

  const handleCtaMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.06, duration: 0.25, ease: "back.out(3)" });
  };

  const handleCtaMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
  };

  const handleCtaMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 0.94, duration: 0.1, ease: "power2.in" });
  };

  const handleCtaMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.06, duration: 0.3, ease: "back.out(2)" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white pt-16 pb-28 px-4 sm:px-6 overflow-hidden min-h-[500px] flex flex-col items-center justify-end"
    >
      {/* Layered Wavy Hill Background */}
      <div data-anim="wavy-bg" className="absolute inset-0">
        <WavyHillBackground />
      </div>

      {/* Main Centered Content Stack */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 text-slate-800 font-extrabold text-xs uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="size-4 text-emerald-600 fill-emerald-600" />
          <span>START YOUR 360° JOURNEY TODAY</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-2xl mb-8 font-sans">
          Ready to watch every student sprout & thrive?
        </h2>

        {/* Pill-Shaped CTA Button */}
        <div data-anim="cta-btn" className="mb-10 transform-gpu">
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            onMouseEnter={handleCtaMouseEnter}
            onMouseLeave={handleCtaMouseLeave}
            onMouseDown={handleCtaMouseDown}
            onMouseUp={handleCtaMouseUp}
            className="h-16 px-10 rounded-full bg-[#58CC02] hover:bg-[#61DF02] text-white font-extrabold text-lg tracking-wide uppercase shadow-xl border-b-4 border-[#46A302] flex items-center gap-3 transition-shadow"
          >
            <span>Start Your Growth Journey</span>
            <ArrowRight className="size-6 stroke-[3]" />
          </Button>
        </div>

        {/* Central Mascot "Sprout" on Podium */}
        <div data-anim="mascot-wrapper" className="relative w-48 sm:w-56 h-auto">
          <GrowthMascot className="w-full h-auto drop-shadow-lg" />
        </div>

        {/* Scattered Floating Reward Icons Cluster Around Mascot */}
        {/* Left Cluster */}
        <div className="absolute left-4 sm:left-12 bottom-12 hidden sm:block">
          <FloatingRewardIcon type="chest" delay={0.2} duration={2.6} label="Portfolio Unlocked" />
        </div>
        <div className="absolute left-24 sm:left-40 bottom-36 hidden sm:block">
          <FloatingRewardIcon type="gem" delay={0.5} duration={3.1} label="Skills Level 5" />
        </div>
        <div className="absolute left-8 sm:left-24 bottom-64 hidden sm:block">
          <FloatingRewardIcon type="coin" delay={0.1} duration={2.2} label="Growth Points" />
        </div>

        {/* Right Cluster */}
        <div className="absolute right-4 sm:right-12 bottom-12 hidden sm:block">
          <FloatingRewardIcon type="flame" delay={0.4} duration={2.4} label="7-Day Streak" />
        </div>
        <div className="absolute right-24 sm:right-40 bottom-36 hidden sm:block">
          <FloatingRewardIcon type="heart" delay={0.3} duration={2.9} label="Wellbeing Support" />
        </div>
        <div className="absolute right-8 sm:right-24 bottom-64 hidden sm:block">
          <FloatingRewardIcon type="checkmark" delay={0.6} duration={2.7} label="Goal Achieved" />
        </div>
        <div className="absolute right-48 sm:right-64 bottom-72 hidden md:block">
          <FloatingRewardIcon type="star" delay={0.2} duration={3.3} label="Verified Win" />
        </div>
      </div>
    </section>
  );
}
