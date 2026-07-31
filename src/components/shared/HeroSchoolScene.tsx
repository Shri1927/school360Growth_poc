import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export function HeroSchoolScene({ className }: { className?: string }) {
  const containerRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const svg = containerRef.current;
      if (!svg) return;

      const building = svg.querySelector('[data-anim="building"]');
      const roof = svg.querySelector('[data-anim="roof"]');
      const door = svg.querySelector('[data-anim="door"]');
      const windows = svg.querySelectorAll('[data-anim="window"]');
      const bars = svg.querySelectorAll('[data-anim="chart-bar"]');
      const pathLine = svg.querySelector<SVGPathElement>('[data-anim="path-line"]');
      const profileBadge = svg.querySelector('[data-anim="profile-badge"]');
      const gradCap = svg.querySelector('[data-anim="grad-cap"]');
      const floatBook = svg.querySelector('[data-anim="float-book"]');
      const floatStar = svg.querySelector('[data-anim="float-star"]');
      const floatBulb = svg.querySelector('[data-anim="float-bulb"]');
      const floatTrophy = svg.querySelector('[data-anim="float-trophy"]');
      const studentBody = svg.querySelector('[data-anim="student-body"]');
      const studentArm = svg.querySelector('[data-anim="student-arm"]');

      if (prefersReducedMotion) {
        gsap.set(
          [building, roof, door, windows, bars, profileBadge, gradCap, floatBook, floatStar, floatBulb, floatTrophy, studentBody],
          { opacity: 1, scale: 1 }
        );
        if (pathLine) gsap.set(pathLine, { strokeDashoffset: 0 });
        return;
      }

      // Initial States
      gsap.set([building, roof], { transformOrigin: "bottom center", scale: 0, opacity: 0 });
      gsap.set([door, ...Array.from(windows)], { scale: 0, transformOrigin: "center center", opacity: 0 });
      gsap.set(bars, { scaleY: 0, transformOrigin: "bottom center", opacity: 0 });
      gsap.set([gradCap, floatBook, floatStar, floatBulb, floatTrophy, profileBadge, studentBody], {
        scale: 0,
        transformOrigin: "center center",
        opacity: 0,
      });

      if (pathLine) {
        const length = pathLine.getTotalLength();
        gsap.set(pathLine, { strokeDasharray: length, strokeDashoffset: length });
      }

      // Load-in Animation Sequence
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to([building, roof], {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.4)",
      })
        .to(
          [door, ...Array.from(windows)],
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        )
        .to(
          studentBody,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          "-=0.2"
        )
        .to(
          bars,
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        );

      if (pathLine) {
        tl.to(pathLine, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.4");
      }

      tl.to(profileBadge, { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.6)" }, "-=0.3").to(
        [gradCap, floatBook, floatStar, floatBulb, floatTrophy],
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out(1.8)",
        },
        "-=0.4"
      );

      // Idle Alive Loops
      gsap.to(gradCap, {
        y: -10,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(floatBook, {
        y: -8,
        rotation: 6,
        transformOrigin: "center center",
        duration: 2.6,
        delay: 0.3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(floatStar, {
        y: -12,
        rotation: -8,
        transformOrigin: "center center",
        duration: 2.8,
        delay: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(floatBulb, {
        y: -9,
        rotation: 5,
        transformOrigin: "center center",
        duration: 2.4,
        delay: 0.1,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(floatTrophy, {
        y: -11,
        rotation: -6,
        transformOrigin: "center center",
        duration: 3.0,
        delay: 0.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(profileBadge, {
        y: -6,
        duration: 2.5,
        delay: 0.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      if (studentArm) {
        gsap.to(studentArm, {
          rotation: 18,
          transformOrigin: "bottom left",
          duration: 0.7,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 540 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Soft Shadow Base */}
      <ellipse cx="270" cy="400" rx="230" ry="20" fill="#E2E8F0" />
      <ellipse cx="270" cy="400" rx="180" ry="12" fill="#CBD5E1" />

      {/* Connecting Curved Line to Profile Badge */}
      <path
        data-anim="path-line"
        d="M 230 250 C 170 200, 110 230, 90 280"
        stroke="#1CB0F6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="6 6"
        fill="none"
      />

      {/* Main School Building */}
      <g data-anim="building">
        <rect x="180" y="180" width="180" height="210" rx="24" fill="#FFFFFF" stroke="#334155" strokeWidth="6" />
        <rect x="200" y="200" width="140" height="190" rx="16" fill="#F8FAFC" />
      </g>

      {/* School Triangular Roof */}
      <g data-anim="roof">
        <path d="M 160 190 L 270 100 L 380 190 Z" fill="#FF4B4B" stroke="#334155" strokeWidth="6" strokeLinejoin="round" />
        {/* Clock/Badge Circle on Roof */}
        <circle cx="270" cy="155" r="18" fill="#FFC800" stroke="#334155" strokeWidth="4" />
        <path d="M 270 145 L 270 155 L 277 155" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Building Windows */}
      <g data-anim="window">
        <rect x="210" y="220" width="45" height="45" rx="10" fill="#1CB0F6" stroke="#334155" strokeWidth="4" />
        <path d="M 232.5 220 L 232.5 265 M 210 242.5 L 255 242.5" stroke="#FFFFFF" strokeWidth="3" />
      </g>

      <g data-anim="window">
        <rect x="285" y="220" width="45" height="45" rx="10" fill="#1CB0F6" stroke="#334155" strokeWidth="4" />
        <path d="M 307.5 220 L 307.5 265 M 285 242.5 L 330 242.5" stroke="#FFFFFF" strokeWidth="3" />
      </g>

      {/* Building Front Entrance Door */}
      <g data-anim="door">
        <rect x="245" y="300" width="50" height="90" rx="12" fill="#58CC02" stroke="#334155" strokeWidth="5" />
        <circle cx="282" cy="345" r="4" fill="#FFC800" stroke="#334155" strokeWidth="2" />
        {/* Welcome Mat */}
        <rect x="235" y="388" width="70" height="8" rx="4" fill="#A5ED6E" stroke="#334155" strokeWidth="3" />
      </g>

      {/* Student Character Silhouette */}
      <g data-anim="student-body">
        {/* Legs */}
        <rect x="145" y="350" width="10" height="40" rx="5" fill="#042C60" />
        <rect x="160" y="350" width="10" height="40" rx="5" fill="#042C60" />
        {/* Body */}
        <rect x="138" y="300" width="38" height="55" rx="14" fill="#58CC02" stroke="#334155" strokeWidth="4" />
        {/* Head */}
        <circle cx="157" cy="275" r="18" fill="#FFC800" stroke="#334155" strokeWidth="4" />
        {/* Eyes */}
        <circle cx="152" cy="272" r="3" fill="#334155" />
        <circle cx="163" cy="272" r="3" fill="#334155" />
        {/* Smile */}
        <path d="M 152 280 Q 157 285 162 280" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Waving Arm */}
        <g data-anim="student-arm">
          <path d="M 138 310 Q 120 295 115 280" stroke="#58CC02" strokeWidth="10" strokeLinecap="round" />
          <path d="M 138 310 Q 120 295 115 280" stroke="#334155" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="114" cy="278" r="6" fill="#FFC800" stroke="#334155" strokeWidth="3" />
        </g>
      </g>

      {/* Academic Growth Bar Chart */}
      <g>
        <rect x="385" y="390" width="130" height="6" rx="3" fill="#CBD5E1" />
        <rect data-anim="chart-bar" x="395" y="320" width="22" height="70" rx="8" fill="#A5ED6E" stroke="#334155" strokeWidth="4" />
        <rect data-anim="chart-bar" x="425" y="270" width="22" height="120" rx="8" fill="#58CC02" stroke="#334155" strokeWidth="4" />
        <rect data-anim="chart-bar" x="455" y="230" width="22" height="160" rx="8" fill="#1CB0F6" stroke="#334155" strokeWidth="4" />
        <rect data-anim="chart-bar" x="485" y="180" width="22" height="210" rx="8" fill="#FFC800" stroke="#334155" strokeWidth="4" />
      </g>

      {/* Floating Graduation Cap */}
      <g data-anim="grad-cap">
        <path d="M 270 40 L 325 65 L 270 90 L 215 65 Z" fill="#042C60" stroke="#334155" strokeWidth="5" strokeLinejoin="round" />
        <rect x="248" y="72" width="44" height="24" rx="6" fill="#042C60" stroke="#334155" strokeWidth="4" />
        <path d="M 315 68 L 322 95 L 320 115" stroke="#FFC800" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="320" cy="116" r="5" fill="#FFC800" stroke="#334155" strokeWidth="2" />
      </g>

      {/* Floating Orbiting Icons */}
      {/* Book Icon */}
      <g data-anim="float-book">
        <rect x="80" y="100" width="48" height="38" rx="8" fill="#CE82FF" stroke="#334155" strokeWidth="4" />
        <path d="M 104 100 L 104 138" stroke="#334155" strokeWidth="3" />
        <path d="M 88 112 L 98 112 M 88 122 L 98 122 M 110 112 L 120 112" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Star/Badge Icon */}
      <g data-anim="float-star">
        <polygon
          points="460,80 467,95 483,97 471,108 474,124 460,116 446,124 449,108 437,97 453,95"
          fill="#FFC800"
          stroke="#334155"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>

      {/* Lightbulb Icon */}
      <g data-anim="float-bulb">
        <path
          d="M 140 50 C 125 50 115 62 115 75 C 115 86 122 93 125 100 L 155 100 C 158 93 165 86 165 75 C 165 62 155 50 140 50 Z"
          fill="#FFC800"
          stroke="#334155"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <rect x="127" y="102" width="26" height="10" rx="3" fill="#E2E8F0" stroke="#334155" strokeWidth="3" />
      </g>

      {/* Trophy Icon */}
      <g data-anim="float-trophy">
        <path d="M 400 120 L 440 120 L 433 155 Q 420 170 420 170 L 420 185 L 435 185 L 435 195 L 405 195 L 405 185 L 420 185 Q 420 170 407 155 Z" fill="#FFC800" stroke="#334155" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="420" cy="138" r="8" fill="#58CC02" stroke="#334155" strokeWidth="2" />
      </g>

      {/* Profile Badge Icon (Target of Connecting Path) */}
      <g data-anim="profile-badge">
        <rect x="50" y="270" width="70" height="50" rx="14" fill="#FFFFFF" stroke="#334155" strokeWidth="5" />
        <circle cx="72" cy="295" r="12" fill="#1CB0F6" stroke="#334155" strokeWidth="3" />
        <rect x="90" y="285" width="22" height="6" rx="3" fill="#58CC02" />
        <rect x="90" y="297" width="16" height="5" rx="2.5" fill="#CBD5E1" />
      </g>
    </svg>
  );
}
