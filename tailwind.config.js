/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
 
  ],
  theme: {
    extend: {
      colors: {
        'sunny-yellow': '#FFD84C',
        'warm-orange': '#FFA726',
        'soft-red': '#FF7043',
        'cream': '#FFF3E0',
        'warm-gray': '#BDBDBD',
      },
    },
  },


plugins: [require("daisyui")],
};