const defaultTheme = require("tailwindcss/defaultTheme");
const defaultColors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        title: ['"Aclonica"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        light: {
          bg: defaultColors.indigo[50],
          accent: defaultColors.indigo[200],
          primary: defaultColors.orange[500],
          text: defaultColors.gray[900],
          link: defaultColors.indigo[700],
          linkHover: defaultColors.orange[600],
        },
        dark: {
          bg: defaultColors.indigo[950],
          accent: defaultColors.indigo[900],
          primary: defaultColors.orange[700],
          text: defaultColors.gray[100],
          link: defaultColors.indigo[200],
          linkHover: defaultColors.orange[300],
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addComponents, theme }) {
      addComponents({
        a: {
          color: theme("colors.light.link"),
          transition: theme("transition.colors"),
          "&:hover": {
            color: theme("colors.light.linkHover"),
          },
          ".dark &": {
            color: theme("colors.dark.link"),
            "&:hover": {
              color: theme("colors.dark.linkHover"),
            },
          },
        },
      });
    },
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
