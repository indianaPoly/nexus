/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "hologram-rise": "hologram-rise 0.7s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-particle": "float-particle 3s ease-in-out infinite",
      },
      keyframes: {
        "hologram-rise": {
          "0%": {
            transform: "translateY(0) scale(0.8)",
            opacity: "0.3",
          },
          "100%": {
            transform: "translateY(-50px) scale(1)",
            opacity: "1",
          },
        },
        "float-particle": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)",
            opacity: "0",
          },
          "50%": {
            transform: "translate3d(10px, -10px, 20px)",
            opacity: "1",
          },
        },
      },
      scale: {
        200: "2",
        300: "3",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-2000": {
          perspective: "2000px",
        },
      });
    },
  ],
};
