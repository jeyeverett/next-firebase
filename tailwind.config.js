module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
