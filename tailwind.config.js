const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgDark: "hsl(0, 0%, 6%)",
        opaque: "hsla(0, 0%, 0%, 0.7)",
        white: "hsl(0, 0%, 90%)",
        primary: "#29AB87",
        priText: {
          200: "#4056A1",
          300: "hsl(0, 0%, 66%)",
        },
      },
      fontFamily: {
        sans: [
          "Exo",
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        ],
        handWriting: [
          'Sriracha',
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        ],
        errorFont: ['Nosifer', "Arial, Helvetica", "sans-serif"],
        heading: ["Bebas Neue", "Arial, Helvetica", "sans-serif"],
        cinzel: ["Cinzel", "Arial, Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
