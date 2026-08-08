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
          bg: "#0A0E12",
          "bg-secondary": "#0D1218",
          surface: "#121A22",
          "surface-hover": "#1A242E",
          border: "#1E2A36",
          "border-light": "#2A3A48",
          accent: "hsl(var(--accent, 172 70% 45%))",
          "accent-hover": "hsl(var(--accent-hover, 172 70% 38%))",
          "accent-light": "hsl(var(--accent-light, 172 70% 58%))",
          "accent-dark": "hsl(var(--accent-dark, 172 70% 30%))",
          "mc-green": "#5BBA3A",
          "mc-green-light": "#7CDA4E",
          "mc-green-dark": "#3D9A2A",
          "mc-dirt": "#8B6F47",
          "mc-stone": "#7A7A7A",
          "mc-diamond": "#4AEDD8",
          "mc-gold": "#FCD34D",
          "mc-redstone": "#FF4343",
          gold: "#FCD34D",
          "gold-light": "#FDE68A",
          text: "#E2E8F0",
          "text-secondary": "#94A3B8",
          muted: "#5A6E7E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      backgroundImage: {
        "block-pattern":
          "repeating-conic-gradient(rgba(42,58,72,0.12) 0% 25%, transparent 0% 50%) 50% / 28px 28px",
        "radial-fade":
          "radial-gradient(ellipse at center, hsl(var(--accent, 172 70% 45%) / 0.08), transparent 70%)",
        "radial-fade-green":
          "radial-gradient(ellipse at center, rgba(91,186,58,0.06), transparent 70%)",
        "hero-glow":
          "radial-gradient(circle at 50% 0%, hsl(var(--accent, 172 70% 45%) / 0.10), transparent 60%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        glow: "glow 3s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "aurora": "aurora 8s ease-in-out infinite alternate",
        "blink": "blink 1.2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        snowfall: "snowfall 12s linear infinite",
        rainfall: "rainfall 0.8s linear infinite",
        leaffall: "leaffall 12s ease-in-out infinite",
        pollenfloat: "pollenfloat 14s ease-in-out infinite",
        "block-bob": "blockBob 3s ease-in-out infinite",
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
          "0%": { boxShadow: "0 0 20px hsl(var(--accent, 172 70% 45%) / 0.2)" },
          "100%": { boxShadow: "0 0 40px hsl(var(--accent, 172 70% 45%) / 0.4)" },
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
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px hsl(var(--accent, 172 70% 45%) / 0.3)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 30px hsl(var(--accent, 172 70% 45%) / 0.5)" },
        },
        aurora: {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "0.3" },
          "50%": { transform: "translate(30px, -20px) scale(1.1)", opacity: "0.5" },
          "100%": { transform: "translate(-20px, 10px) scale(0.95)", opacity: "0.35" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        snowfall: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "0.4" },
          "90%": { opacity: "0.4" },
          "100%": {
            transform: "translateY(100vh) translateX(var(--sway, 0px))",
            opacity: "0",
          },
        },
        rainfall: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "0.5" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        leaffall: {
          "0%": {
            transform: "translateY(0) translateX(0) rotate(0deg)",
            opacity: "0",
          },
          "10%": { opacity: "0.5" },
          "50%": {
            transform:
              "translateY(50vh) translateX(var(--sway, 20px)) rotate(180deg)",
          },
          "100%": {
            transform:
              "translateY(100vh) translateX(0px) rotate(360deg)",
            opacity: "0",
          },
        },
        pollenfloat: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "0.3" },
          "90%": { opacity: "0.3" },
          "100%": {
            transform: "translateY(-100vh) translateX(var(--sway, 10px))",
            opacity: "0",
          },
        },
        blockBob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
