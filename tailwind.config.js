/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#1E1E1E',
        canvas: '#F9F9F9',
        redwood: '#7B3F00',
        steel: '#7A7A7A',
      },
      fontFamily: {
        sans: ['"Lato"', 'sans-serif'],
        display: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 80px -40px rgba(123, 63, 0, 0.55)',
        card: '0 10px 40px -24px rgba(30, 30, 30, 0.5)',
      },
      backgroundImage: {
        'grid-light': 'linear-gradient(rgba(249, 249, 249, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 249, 249, 0.08) 1px, transparent 1px)',
        'radial-spot': 'radial-gradient(circle at 18% 20%, rgba(123, 63, 0, 0.16), transparent 32%), radial-gradient(circle at 80% 12%, rgba(249, 249, 249, 0.08), transparent 26%)',
      },
    },
  },
  plugins: [],
};
