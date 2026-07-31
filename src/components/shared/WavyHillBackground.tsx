export function WavyHillBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover object-bottom"
        preserveAspectRatio="none"
      >
        {/* Back Layer Darker Green Wave */}
        <path
          d="M 0 120 C 320 80, 640 180, 960 110 C 1200 60, 1360 140, 1440 120 L 1440 280 L 0 280 Z"
          fill="#46A302"
          opacity="0.9"
        />
        {/* Front Layer Brighter Green Hill Wave */}
        <path
          d="M 0 150 C 360 200, 720 90, 1080 160 C 1260 195, 1380 130, 1440 150 L 1440 280 L 0 280 Z"
          fill="#58CC02"
        />
      </svg>
    </div>
  );
}
