import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1B15",
        "ink-2": "#0A140F",
        surface: "#16281F",
        "surface-2": "#1C3226",
        brand: "#1F4D34",
        "jade-soft": "#4B8760",
        gold: "#D6AD66",
        "gold-soft": "#F1C878",
        paper: "#F4EFE2",
        sage: "#9DB2A1",
        "sage-dim": "#5F7568",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-work-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "1180px",
      },
      keyframes: {
        riseIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "none" },
        },
        markIn: {
          from: { opacity: "0", transform: "scale(.88) rotate(-6deg)" },
          to: { opacity: "1", transform: "none" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        tickerScroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        riseIn: "riseIn .8s cubic-bezier(.2,.7,.2,1) both",
        markIn: "markIn 1s cubic-bezier(.2,.7,.2,1) .2s both",
        spinSlow: "spinSlow 60s linear infinite",
        tickerScroll: "tickerScroll 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
