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
        background: "var(--background)",
        foreground: "var(--on-surface)",
        primary: {
          DEFAULT: "var(--primary)",
          container: "var(--primary-container)",
        },
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        surface: {
          DEFAULT: "var(--surface)",
          container: {
            DEFAULT: "var(--surface-container)",
            low: "var(--surface-container-low)",
            high: "var(--surface-container-high)",
            highest: "var(--surface-container-highest)",
          },
        },
        "on-surface": {
          DEFAULT: "var(--on-surface)",
          variant: "var(--on-surface-variant)",
        },
      },
      fontFamily: {
        headline: ["var(--font-headline)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "serif"],
      },
      letterSpacing: {
        tightest: "-.04em",
        widest_extra: ".15em",
        v_widest: ".2em",
      },
    },
  },
  plugins: [],
};
export default config;
