import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export type RewardIconType =
  | "coin"
  | "gem"
  | "flame"
  | "heart"
  | "checkmark"
  | "chest"
  | "star";

interface FloatingRewardIconProps {
  type: RewardIconType;
  className?: string;
  delay?: number;
  duration?: number;
  driftPattern?: "bob" | "rotate" | "both";
  label?: string;
}

export function FloatingRewardIcon({
  type,
  className = "",
  delay = 0,
  duration = 2.5,
  driftPattern = "both",
  label,
}: FloatingRewardIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || !iconRef.current) return;

      const el = iconRef.current;
      const yBob = driftPattern === "bob" || driftPattern === "both" ? -10 : 0;
      const rot = driftPattern === "rotate" || driftPattern === "both" ? (type === "coin" ? 12 : 7) : 0;

      gsap.to(el, {
        y: yBob,
        rotation: rot,
        transformOrigin: "center center",
        duration: duration,
        delay: delay,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: iconRef }
  );

  const renderSvgIcon = () => {
    switch (type) {
      case "coin": // Growth Index Points Earned
        return (
          <svg viewBox="0 0 50 50" className="size-12 drop-shadow-md">
            <circle cx="25" cy="25" r="22" fill="#FFC800" stroke="#334155" strokeWidth="3.5" />
            <circle cx="25" cy="25" r="16" fill="#FFE169" />
            <text x="25" y="32" textAnchor="middle" fill="#D97706" fontWeight="900" fontSize="18" fontFamily="sans-serif">
              PTS
            </text>
          </svg>
        );
      case "gem": // Skill Levels Unlocked
        return (
          <svg viewBox="0 0 50 50" className="size-12 drop-shadow-md">
            <polygon points="25,5 42,16 42,34 25,45 8,34 8,16" fill="#1CB0F6" stroke="#334155" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="25,5 34,16 25,45 16,16" fill="#60A5FA" />
            <polygon points="25,5 42,16 34,16" fill="#93C5FD" />
          </svg>
        );
      case "flame": // Attendance / Goal Streak
        return (
          <svg viewBox="0 0 50 50" className="size-12 drop-shadow-md">
            <path
              d="M 25 5 C 28 16 38 20 38 30 C 38 40 30 45 25 45 C 20 45 12 40 12 30 C 12 22 20 18 25 5 Z"
              fill="#FF4B4B"
              stroke="#334155"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M 25 18 C 27 24 32 27 32 33 C 32 39 27 41 25 41 C 23 41 18 39 18 33 C 18 28 22 25 25 18 Z"
              fill="#FFC800"
            />
          </svg>
        );
      case "heart": // Wellbeing & Counsellor Support
        return (
          <svg viewBox="0 0 50 50" className="size-12 drop-shadow-md">
            <path
              d="M 25 43 C 25 43 7 30 7 18 C 7 10 14 6 20 9 C 23 11 25 14 25 14 C 25 14 27 11 30 9 C 36 6 43 10 43 18 C 43 30 25 43 25 43 Z"
              fill="#CE82FF"
              stroke="#334155"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "checkmark": // Goal or Milestone Completed
        return (
          <svg viewBox="0 0 50 50" className="size-12 drop-shadow-md">
            <circle cx="25" cy="25" r="21" fill="#58CC02" stroke="#334155" strokeWidth="3.5" />
            <path d="M 15 25 L 22 32 L 35 17" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case "chest": // Portfolio Achievement Unlocked
        return (
          <svg viewBox="0 0 50 50" className="size-12 drop-shadow-md">
            <rect x="8" y="20" width="34" height="22" rx="4" fill="#D97706" stroke="#334155" strokeWidth="3.5" />
            <path d="M 6 18 Q 25 8 44 18 L 44 24 L 6 24 Z" fill="#F59E0B" stroke="#334155" strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="25" cy="28" r="4" fill="#FFC800" stroke="#334155" strokeWidth="2" />
          </svg>
        );
      case "star": // Verified Certificate / Competition Win
      default:
        return (
          <svg viewBox="0 0 50 50" className="size-12 drop-shadow-md">
            <polygon
              points="25,4 31,17 46,18 34,28 38,43 25,34 12,43 16,28 4,18 19,17"
              fill="#FFC800"
              stroke="#334155"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <div ref={iconRef} className={`data-anim-reward flex flex-col items-center gap-1 ${className}`} aria-hidden="true">
      {renderSvgIcon()}
      {label && (
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200 shadow-xs">
          {label}
        </span>
      )}
    </div>
  );
}
