import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:[ "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        foreground: {
          900: "var(--foreground-900)",
          800: "var(--foreground-800)",
          700: "var(--foreground-700)",
          600: "var(--foreground-600)",
          chip: {
            900: "var(--chip-900)",
            hover: {
              900: "var(--chip-hover-900)"
            }
          },
          button: {
            900: "var(--button-foreground-900)"
          }
        },
        background: {
          900: "var(--background-900)",
          800: "var(--background-800)",
          700: "var(--background-700)",
          600: "var(--background-600)",
          chip: {
            900: "var(--chip-900)",
            hover: {
              900: "var(--chip-hover-900)"
            }
          },
          button: {
            900: "var(--button-900)"
          }
        },
      },
    },
  },
  plugins: [],
  
};
export default config;
