/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        corporate: {
          primary: "#1D4ED8",   // correspond à blue-700
          "primary-focus": "#1E40AF",
          "primary-content": "#ffffff",
          secondary: "#3B82F6",
          accent: "#F59E0B",
          neutral: "#111827",
          "base-100": "#ffffff",
          info: "#3B82F6",
          success: "#22C55E",
          warning: "#FBBF24",
          error: "#EF4444",
        },
      },
    ],
  },
};
