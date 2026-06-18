interface BeachLogoProps {
  size?: number;
  textColor?: string;
  accentColor?: string;
}

export function BeachLogo({ size = 28, textColor = "#fff", accentColor = "#C9A96E" }: BeachLogoProps) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* SVG mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://w3.org"
        aria-label="BeautyOfBeaches logo"
        style={{ flexShrink: 0 }}
      >
        {/* Outer Circular Boundary */}
        <circle cx="50" cy="50" r="44" stroke={accentColor} strokeWidth="3.2" />

        {/* Central Heart-Shaped Sun / Cresting Wave Crest */}
        <path
          d="M14 62 
             C 18 52, 28 36, 38 41 
             C 45 44, 42 66, 56 64
             C 64 63, 78 54, 86 58"
          stroke={accentColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lower Water Ripple Lines */}
        <path
          d="M17 73 C 28 68, 38 78, 50 72 C 62 66, 72 76, 83 71"
          stroke={accentColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M36 82 C 44 78, 50 84, 58 80"
          stroke={accentColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Sun Inner Dome (Completing the heart shape crossover) */}
        <path
          d="M42 45 C 46 36, 58 36, 62 44 C 64 50, 63 56, 63 60"
          stroke={accentColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Radiating Sunburst Rays */}
        <g stroke={accentColor} strokeWidth="3.2" strokeLinecap="round">
          <line x1="49" y1="35" x2="47" y2="28" />
          <line x1="59" y1="36" x2="62" y2="24" />
          <line x1="68" y1="41" x2="75" y2="33" />
          <line x1="74" y1="48" x2="83" y2="43" />
          <line x1="76" y1="56" x2="85" y2="55" />
        </g>

        {/* Minimalist Birds Flight Silhouettes */}
        <path d="M41 24 Q44 20 47 24 Q50 20 53 24" stroke={accentColor} strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M34 29 Q37 26 40 29 Q43 26 46 29" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          color: textColor,
          fontWeight: 700,
          fontSize: "0.9rem",
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        <span style={{ color: textColor }}>Beauty</span>
        <span style={{ color: accentColor }}>Of</span>
        <span style={{ color: textColor }}>Beaches</span>
      </span>
    </div>
  );
}
