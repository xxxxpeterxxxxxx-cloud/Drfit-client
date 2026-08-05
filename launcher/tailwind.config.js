/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
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
          accent: {
            DEFAULT: "hsl(var(--accent, 162 84% 43%))",
            hover: "hsl(var(--accent-hover, 162 84% 36%))",
            dark: "hsl(var(--accent-dark, 162 84% 30%))",
            light: "hsl(var(--accent-light, 162 84% 55%))",
          },
          "accent-dark": "#064E3B",
          gold: "#F59E0B",
          "gold-light": "#FBBF24",
          text: "#F1F5F9",
          "text-secondary": "#94A3B8",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        minecraft: ["Minecraft", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius, 8px)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-up-fade": "slideUpFadeIn 0.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        ripple: "ripple 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        shimmer: "shimmer 1.5s infinite",
        "icon-bounce": "iconBounce 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUpFadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        iconBounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      boxShadow: {
        glow: "0 0 10px hsl(var(--accent, 162 84% 43%) / 0.4)",
        "glow-lg": "0 0 20px hsl(var(--accent, 162 84% 43%) / 0.6)",
        "inner-glow": "inset 0 0 10px hsl(var(--accent, 162 84% 43%) / 0.4)",
        "3d": "0 4px 0 rgba(0,0,0,0.3), 0 6px 10px rgba(0,0,0,0.35)",
        "3d-hover": "0 6px 0 rgba(0,0,0,0.25), 0 8px 12px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
