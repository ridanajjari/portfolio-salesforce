/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
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
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
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
        scan: "scan 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
