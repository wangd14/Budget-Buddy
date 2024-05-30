import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        gradient: {
          to: {
            "background-position": "200% center",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-half-circle":
          "radial-gradient(circle at 100%, var(--tw-gradient-stops), var(--tw-gradient-stops) 50%, var(--tw-gradient-stops) 75%, var(--tw-gradient-stops) 75%);",
      },
      colors: {
        ocean: "#001633",
        orange: "#f09c00",
        "off-white": "#f5f9ff",
      }
    },
    textShadow: {
      sm: "1px 1px 2px var(--tw-shadow-color)",
      DEFAULT: "2px 2px 4px var(--tw-shadow-color)",
      lg: "4px 4px 8px var(--tw-shadow-color)",
      xl: "4px 4px 16px var(--tw-shadow-color)",
    },
  },
  plugins: [
    require("flowbite/plugin"),
    plugin(function ({ matchUtilities, theme }: PluginAPI) {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
export default config;
