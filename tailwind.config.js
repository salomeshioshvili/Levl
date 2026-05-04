/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        dm: ["DMSans_400Regular"],
        "dm-semibold": ["DMSans_600SemiBold"],
        "dm-bold": ["DMSans_700Bold"],
      },
    },
  },
  plugins: [],
};
