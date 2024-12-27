import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        terminalText: "var(--color-terminal-text)",
        terminalAccent: "var(--color-terminal-accent)",
        terminalInput: "var(--color-terminal-input)",
        error: "var(--color-error)",
        system: "var(--color-system)",
      },
    },
  },
  plugins: [],
} satisfies Config;
