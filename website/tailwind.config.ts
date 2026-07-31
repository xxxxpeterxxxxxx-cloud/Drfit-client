import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        drift: {
          bg: "#0A0E1A",
          "bg-secondary": "#0D1220",
          surface: "#111726",
          border: "#1E2A42",
          accent: "#3B82F6",
          "accent-hover": "#2563EB",
          "accent-light": "#60A5FA",
          text: "#E2E8F0",
          "text-secondary": "#94A3B8",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(30,42,66,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,42,66,0.5) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(59,130,246,0.15), transparent 70%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        glow: "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(59,130,246,0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(59,130,246,0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
