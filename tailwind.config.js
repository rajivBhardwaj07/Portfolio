/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        accent: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(99,102,241,0.25) 0%, rgba(34,211,238,0.08) 40%, rgba(0,0,0,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.35)",
        "glow-cyan": "0 0 40px rgba(34,211,238,0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        blink: "blink 1s step-end infinite",
        "spin-slow": "spinSlow 12s linear infinite",
      },
    },
  },
  plugins: [],
};
