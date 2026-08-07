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
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
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
      },
    },
  },
  plugins: [],
};
