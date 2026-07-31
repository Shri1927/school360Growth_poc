import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export function GrowthMascot({ className }: { className?: string }) {
  const containerRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const svg = containerRef.current;
      if (prefersReducedMotion || !svg) return;

      const bodyGroup = svg.querySelector('[data-anim="mascot-body"]');
      const leafLeft = svg.querySelector('[data-anim="leaf-left"]');
      const leafRight = svg.querySelector('[data-anim="leaf-right"]');
      const eyeLeft = svg.querySelector('[data-anim="eye-left"]');
      const eyeRight = svg.querySelector('[data-anim="eye-right"]');

      // Idle Bobbing Loop
      gsap.to(bodyGroup, {
        y: -7,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Leaf Rustle Wiggle every ~4s
      const leafTl = gsap.timeline({ repeat: -1, repeatDelay: 3.5 });
      leafTl
        .to([leafLeft, leafRight], {
          rotation: 8,
          transformOrigin: "bottom center",
          duration: 0.25,
          ease: "power1.inOut",
        })
        .to([leafLeft, leafRight], {
          rotation: -6,
          transformOrigin: "bottom center",
          duration: 0.25,
          ease: "power1.inOut",
        })
        .to([leafLeft, leafRight], {
          rotation: 0,
          transformOrigin: "bottom center",
          duration: 0.3,
          ease: "power1.out",
        });

      // Occasional Eye Blink
      const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 4.2 });
      blinkTl
        .to([eyeLeft, eyeRight], { scaleY: 0.1, transformOrigin: "center center", duration: 0.1 })
        .to([eyeLeft, eyeRight], { scaleY: 1, transformOrigin: "center center", duration: 0.1 });
    },
    { scope: containerRef }
  );

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Podium Riser at Base */}
      <g data-anim="podium">
        <ellipse cx="100" cy="215" rx="75" ry="18" fill="#334155" />
        <path d="M 30 215 C 30 228, 170 228, 170 215 L 165 230 C 165 240, 35 240, 35 230 Z" fill="#1E293B" />
        <ellipse cx="100" cy="212" rx="70" ry="15" fill="#58CC02" />
        <ellipse cx="100" cy="210" rx="60" ry="12" fill="#A5ED6E" />
      </g>

      {/* Main Mascot Character Body */}
      <g data-anim="mascot-body">
        {/* Sapling Base / Stem Base */}
        <path
          d="M 90 205 Q 100 195 110 205 Z"
          fill="#46A302"
        />

        {/* Stem */}
        <path
          d="M 100 205 C 96 160, 96 140, 100 110"
          stroke="#58CC02"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path
          d="M 100 205 C 96 160, 96 140, 100 110"
          stroke="#334155"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Rounded Sapling Head / Upper Body */}
        <circle cx="100" cy="115" r="38" fill="#58CC02" stroke="#334155" strokeWidth="6" />
        <circle cx="100" cy="112" r="32" fill="#A5ED6E" />

        {/* Left Leaf */}
        <g data-anim="leaf-left">
          <path
            d="M 80 120 C 45 105, 40 75, 72 85 C 80 88, 82 108, 80 120 Z"
            fill="#58CC02"
            stroke="#334155"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path d="M 75 112 C 60 102, 55 90, 58 86" stroke="#46A302" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* Right Leaf */}
        <g data-anim="leaf-right">
          <path
            d="M 120 120 C 155 105, 160 75, 128 85 C 120 88, 118 108, 120 120 Z"
            fill="#58CC02"
            stroke="#334155"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path d="M 125 112 C 140 102, 145 90, 142 86" stroke="#46A302" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* Top Center Leaf Sprout */}
        <path
          d="M 100 80 C 90 55, 100 40, 105 40 C 110 40, 112 58, 100 80 Z"
          fill="#A5ED6E"
          stroke="#334155"
          strokeWidth="4"
        />

        {/* Tilted Graduation Cap */}
        <g data-anim="grad-cap" transform="translate(15, -10) rotate(12 100 70)">
          <path d="M 100 50 L 135 65 L 100 80 L 65 65 Z" fill="#042C60" stroke="#334155" strokeWidth="4" strokeLinejoin="round" />
          <rect x="85" y="70" width="30" height="15" rx="4" fill="#042C60" stroke="#334155" strokeWidth="3" />
          <path d="M 130 67 L 135 85 L 133 98" stroke="#FFC800" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="133" cy="99" r="3.5" fill="#FFC800" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* Face Elements */}
        {/* Left Eye */}
        <ellipse data-anim="eye-left" cx="88" cy="112" rx="4.5" ry="6" fill="#334155" />
        <circle cx="86.5" cy="109.5" r="1.8" fill="#FFFFFF" />

        {/* Right Eye */}
        <ellipse data-anim="eye-right" cx="112" cy="112" rx="4.5" ry="6" fill="#334155" />
        <circle cx="110.5" cy="109.5" r="1.8" fill="#FFFFFF" />

        {/* Cheeks */}
        <circle cx="80" cy="118" r="4.5" fill="#FF4B4B" opacity="0.6" />
        <circle cx="120" cy="118" r="4.5" fill="#FF4B4B" opacity="0.6" />

        {/* Smile */}
        <path
          d="M 93 122 Q 100 130 107 122"
          stroke="#334155"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
