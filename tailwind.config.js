// tailwind.config.js
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        transitionProperty: {
          transform: "transform",
          opacity: "opacity",
        },
      },
    },
    plugins: [require('daisyui'),],
  };