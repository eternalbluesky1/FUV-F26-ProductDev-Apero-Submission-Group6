import type { Config } from "tailwindcss";

// Mirror output/assets/design-tokens.json. Keep tokens centralized.
const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: { purple: "var(--color-brand-purple)", yellow: "var(--color-brand-yellow)", pink: "var(--color-brand-pink)", mint: "var(--color-brand-mint)" },
        ink: "var(--color-ink)", muted: "var(--color-muted)", surface: "var(--color-surface)", lilac: "var(--color-surface-lilac)", border: "var(--color-border)"
      },
      fontFamily: { display: ["Baloo 2", "Arial", "sans-serif"], sans: ["Be Vietnam Pro", "Arial", "sans-serif"] },
      borderRadius: { card: "16px", panel: "24px" },
      boxShadow: { card: "0 2px 10px rgba(34, 27, 74, 0.08)", raised: "0 8px 24px rgba(34, 27, 74, 0.12)" },
      maxWidth: { content: "1280px" },
      spacing: { 4.5: "18px", 5: "20px", 6: "24px", 8: "32px", 10: "40px", 12: "48px", 16: "64px", 20: "80px" }
    }
  },
  plugins: []
};

export default config;
