/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // named "ink"/"phosphor"/"signal" for historical reasons in the
        // component files, but this is just a plain light UI palette now.
        ink: {
          950: "#FFFFFF",
          900: "#FFFFFF",
          800: "#F3F4F6",
          700: "#D9DCE1",
          600: "#B7BCC5",
          500: "#8A909B",
        },
        phosphor: {
          400: "#3B82F6",
          500: "#2563EB",
          600: "#1D4ED8",
        },
        signal: {
          400: "#22C55E",
          500: "#16A34A",
          600: "#15803D",
        },
        paper: "#1F2328",
        muted: "#6B7280",
      },
      fontFamily: {
        display: ["system-ui", "-apple-system", "'Segoe UI'", "Arial", "sans-serif"],
        body: ["system-ui", "-apple-system", "'Segoe UI'", "Arial", "sans-serif"],
        mono: ["Consolas", "'Courier New'", "monospace"],
      },
    },
  },
  plugins: [],
}
