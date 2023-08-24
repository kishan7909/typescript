/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary": "#F7771C",
        "primary-200": "#fb873a",
        "primary-300": "#ff9653",
        "primary-400": "#ffa56b",
        "primary-500": "#ffb483",
        "primary-600": "#ffc39b",

        "secondary": "#051E31",
        "secondary-200": "#323e4c",
        "secondary-300": "#495360",
        "secondary-400": "#616a75",
        "secondary-500": "#79818b",
        "secondary-600": "#79818b",

        "bg-secondary": "#051E31",
        "bg-primary": "#F7771C",
        "bg-white": "#fff",
        "bg-black": "#000",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
