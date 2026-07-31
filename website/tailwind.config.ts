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
          bg: "#080B14",
          "bg-secondary": "#0B0F1A",
          surface: "#0F1422",
          "surface-hover": "#141B2D",
          border: "#1A2336",
          "border-light": "#243049",
          accent: "#10B981",
          "accent-hover": "#059669",
          "accent-light": "#34D399",
          "accent-dark": "#064E3B",
          gold: "#F59E0B",
          "gold-light": "#FBBF24",
          text: "#F1F5F9",
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
          "linear-gradient(to right, rgba(26,35,54,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,35,54,0.4) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(16,185,129,0.12), transparent 70%)",
        "radial-fade-gold":
          "radial-gradient(ellipse at center, rgba(245,158,11,0.08), transparent 70%)",
        "hero-glow":
          "radial-gradient(circle at 50% 0%, rgba(16,185,129,0.15), transparent 60%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        glow: "glow 3s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
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
          "0%": { boxShadow: "0 0 20px rgba(16,185,129,0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(16,185,129,0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(16,185,129,0.3)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 30px rgba(16,185,129,0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
