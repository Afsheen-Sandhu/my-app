export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        'primary-foreground': "var(--primary-foreground)",
        base: "var(--card)",
        'base-foreground': "var(--card-foreground)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
      },
    },
  },
};
