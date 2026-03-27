/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
      },
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        card: { DEFAULT: "oklch(var(--card))", foreground: "oklch(var(--card-foreground))" },
        popover: { DEFAULT: "oklch(var(--popover))", foreground: "oklch(var(--popover-foreground))" },
        primary: { DEFAULT: "oklch(var(--primary))", foreground: "oklch(var(--primary-foreground))" },
        secondary: { DEFAULT: "oklch(var(--secondary))", foreground: "oklch(var(--secondary-foreground))" },
        muted: { DEFAULT: "oklch(var(--muted))", foreground: "oklch(var(--muted-foreground))" },
        accent: { DEFAULT: "oklch(var(--accent))", foreground: "oklch(var(--accent-foreground))" },
        destructive: { DEFAULT: "oklch(var(--destructive))", foreground: "oklch(var(--destructive-foreground))" },
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        cyan: "oklch(var(--cyan))",
        "electric-blue": "oklch(var(--electric-blue))",
        violet: "oklch(var(--violet))",
        magenta: "oklch(var(--magenta))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(4deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
