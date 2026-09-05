import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        "ink-2": "#050505",
        surface: "#F7F6F4",
        "surface-2": "#FFFFFF",
        brand: "#E2202B",
        "brand-dark": "#B5121B",
        paper: "#F5F5F3",
        stone: "#656260",
        "stone-dim": "#9C9A95",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-work-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
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
