const defaultTheme = require("tailwindcss/defaultTheme");
const defaultColors = require("tailwindcss/colors");

const tropicalIndigo = {
  50: "#f2f4fb",
  100: "#e8ebf7",
  200: "#d5daf0",
  300: "#bbc2e6",
  400: "#9fa4da",
  500: "#8688cd",
  600: "#726ebd",
  700: "#625ca5",
  800: "#504d86",
  900: "#44436c",
  950: "#29273f",
};

/**
 * Borrowed from Tailwind Typography
 * https://github.com/tailwindlabs/tailwindcss-typography/blob/a86e6015694c3435ff6cef84f3dd61b81adf26e1/src/styles.js#L10C1-L17C2
 * @param {*} hex
 * @returns
 */
const hexToRgb = (hex) => {
  hex = hex.replace("#", "");
  hex = hex.length === 3 ? hex.replace(/./g, "$&$&") : hex;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
};

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
        "tropical-indigo": tropicalIndigo,
        light: {
          bg: tropicalIndigo[50],
          accent: tropicalIndigo[200],
          primary: defaultColors.orange[500],
          text: defaultColors.slate[700],
          textMuted: defaultColors.slate[600],
          link: defaultColors.indigo[700],
          linkHover: defaultColors.orange[700],
        },
        dark: {
          bg: tropicalIndigo[950],
          accent: tropicalIndigo[900],
          primary: defaultColors.orange[700],
          text: defaultColors.slate[200],
          textMuted: defaultColors.slate[300],
          link: defaultColors.indigo[200],
          linkHover: defaultColors.orange[300],
        },
      },
      typography: (theme) => ({
        slate: {
          css: {
            "--tw-prose-links": theme("colors.light.link"),
            "--tw-prose-invert-headings": theme("colors.slate.100"),
            "--tw-prose-invert-links": theme("colors.dark.link"),
            "--tw-prose-invert-bold": theme("colors.slate.100"),
            "--tw-prose-invert-kbd": theme("colors.slate.100"),
            "--tw-prose-invert-kbd-shadows": hexToRgb(
              theme("colors.slate.100")
            ),
            "--tw-prose-invert-code": theme("colors.slate.100"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addComponents, theme }) {
      addComponents({
        "a:not(.styled-link)": {
          color: theme("colors.light.link"),
          transition: theme("transition.colors"),
          textDecoration: "underline",
          textUnderlineOffset: theme("textUnderlineOffset.2"),
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
