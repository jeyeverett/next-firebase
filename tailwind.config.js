module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ["group-hover"],
      margin: ["first", "last"],
      inset: ["hover"],
      transform: ["group-hover"],
      scale: ["group-hover"],
      opacity: ["group-hover"],
    },
  },
  plugins: [],
};
