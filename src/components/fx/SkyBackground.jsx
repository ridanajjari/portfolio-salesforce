// Fixed sky behind the whole page: gradient, drifting clouds, and stars in the dark theme.
// Colours and opacities come from the theme tokens in index.css.

const CLOUDS = [
  { top: "6%", width: 520, duration: 120, delay: -20, opacity: 1 },
  { top: "22%", width: 340, duration: 90, delay: -60, opacity: 0.8 },
  { top: "40%", width: 620, duration: 150, delay: -100, opacity: 0.7 },
  { top: "58%", width: 300, duration: 80, delay: -10, opacity: 0.75 },
  { top: "72%", width: 480, duration: 135, delay: -75, opacity: 0.6 },
  { top: "88%", width: 380, duration: 105, delay: -40, opacity: 0.7 },
];

// fixed pseudo-random positions so the stars don't jump between renders
const STARS = Array.from({ length: 46 }, (_, i) => ({
  left: `${(i * 37.7) % 100}%`,
  top: `${(i * 61.3) % 100}%`,
  size: (i % 3) + 1,
  delay: `${-(i % 7) * 0.6}s`,
}));

function Cloud({ width }) {
  return (
    <svg viewBox="0 0 200 100" width={width} style={{ filter: "blur(5px)" }}>
      <g fill="rgb(var(--cloud))">
        <ellipse cx="100" cy="68" rx="86" ry="24" />
        <circle cx="58" cy="56" r="28" />
        <circle cx="100" cy="42" r="36" />
        <circle cx="144" cy="56" r="27" />
      </g>
    </svg>
  );
}

export default function SkyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgb(var(--sky-top)), rgb(var(--sky-bottom)) 75%)" }}
    >
      <div className="absolute inset-0" style={{ opacity: "var(--stars)" }}>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-white"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
          />
        ))}
      </div>
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute left-0"
          style={{
            top: c.top,
            opacity: `calc(var(--cloud-opacity) * ${c.opacity})`,
            animation: `drift ${c.duration}s linear ${c.delay}s infinite`,
          }}
        >
          <Cloud width={c.width} />
        </div>
      ))}
    </div>
  );
}
