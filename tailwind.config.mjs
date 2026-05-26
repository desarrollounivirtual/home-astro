/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          deep: 'hsl(222, 47%, 11%)',
          card: 'hsl(223, 47%, 16%)',
          light: 'hsl(223, 30%, 25%)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        accent: {
          orange: {
            DEFAULT: 'hsl(20, 90%, 55%)',
            hover: 'hsl(20, 95%, 48%)',
            light: 'rgba(249, 115, 22, 0.1)',
          },
          blue: {
            DEFAULT: 'hsl(210, 100%, 50%)',
            hover: 'hsl(210, 100%, 45%)',
            light: 'rgba(59, 130, 246, 0.1)',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Nunito', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
