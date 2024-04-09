/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sgreen: "#1bd954",
        bblue: "##01FF95",
        "sgreen-dark": " #0D6A2E",
        background: "#141414",
      },
    },
  },
  plugins: [],
};
