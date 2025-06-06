/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          10: "#f5e0ff",
          20: "#eeccff",
          30: "#e6b3ff",
          40: "#dd99ff",
          50: "#d580ff",
          60: "#aa55d5",
          70: "#8844aa",
          80: "#663380",
          90: "#442255",
          100: "#291433",
        },
        secondary: {
          10: "#d7d7d7",
          20: "#bcbcbc",
          30: "#9a9a9a",
          40: "#787878",
          50: "#575757",
          60: "#2c2c2c",
          70: "#232323",
          80: "#1b1b1b",
          90: "#121212",
          100: "#0b0b0b",
        },
      },
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
      },
      backgroundImage: {
        radial: "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
