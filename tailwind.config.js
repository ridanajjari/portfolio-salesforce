/** @type {import('tailwindcss').Config} */

// colours come from CSS variables (see src/index.css) so light and dark share class names
const scale = (name, steps) => Object.fromEntries(steps.map((s) => [s, `rgb(var(--${name}-${s}) / <alpha-value>)`]));

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: scale("ink", [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]),
        brand: scale("brand", [200, 300, 400, 500, 600]),
        accent: scale("accent", [200, 300, 400, 500]),
        heading: "rgb(var(--heading) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Source Sans 3", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        shimmer: { to: { backgroundPosition: "200% center" } },
        blink: { "50%": { opacity: "0" } },
        aurora: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(8%,-10%) scale(1.2)" },
          "66%": { transform: "translate(-8%,8%) scale(0.9)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        drift: { from: { transform: "translateX(-45vw)" }, to: { transform: "translateX(145vw)" } },
        twinkle: { "0%,100%": { opacity: "0.2" }, "50%": { opacity: "1" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marquee 46s linear infinite reverse",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
        blink: "blink 1s steps(1) infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
