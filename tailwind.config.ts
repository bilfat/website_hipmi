import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#5A1722",
          "dark-wine": "#3D0F16",
          darkWine: "#3D0F16",
          "antique-gold": "#E8B577",
          "muted-copper": "#AF7D66",
          "warm-ivory": "#FDF7F2",
        },
        wine: {
          950: "#3D0F16",
          900: "#5A1722",
          800: "#741E2C",
        },
        gold: {
          50: "#FCF8F2",
          100: "#F8EEDF",
          200: "#EFCFA9",
          300: "#E8B577",
          400: "#DF9D4F",
          500: "#D48527",
          600: "#A96A1F",
          700: "#7E4F17",
          800: "#54350F",
          900: "#2A1A08",
        },
        surface: {
          card: "#FFFFFF",
          white: "#FFFFFF",
          ivory: "#FDF7F2",
          neutral: "#FAF8F6",
          blush: "#F2E4DC",
          "blush-hover": "#F4E6E8",
        },
        neutral: {
          black: "#171313",
          muted: "#6B6260",
          dark: "#4A4240",
          light: "#8C827F",
          border: "#E9E1DC",
          "cool-mist": "#E6E9EF",
          "stroke-soft": "#E7DDD5",
        },
        accent: {
          "soft-gold": "#D4A76A",
          "copper-deep": "#B8734E",
          "dusty-mauve": "#A07A8E",
        },
        status: {
          success: "#2F7A59",
          "success-surface": "#EAF5EE",
          warning: "#A96C16",
          "warning-surface": "#FFF4DF",
          error: "#B83A42",
          "error-surface": "#FCEBED",
          info: "#356C9A",
          "info-surface": "#EAF2FA",
          neutral: "#6B6260",
          "neutral-surface": "#F1EEEB",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        serif: ["var(--font-display)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        ui: ["var(--font-ui)", "Poppins", "sans-serif"],
        sans: ["var(--font-ui)", "Poppins", "sans-serif"],
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 6px 20px rgba(61, 15, 22, 0.06)",
        "card-hover": "0 14px 30px rgba(61, 15, 22, 0.10)",
        floating: "0 18px 44px rgba(61, 15, 22, 0.12)",
        navbar: "0 8px 28px rgba(61, 15, 22, 0.08)",
        modal: "0 24px 64px rgba(61, 15, 22, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
