/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'hsl(210, 40%, 98%)',
          card: 'rgba(255, 255, 255, 0.75)',
          text: 'hsl(222, 47%, 11%)',
          muted: 'hsl(215, 25%, 35%)',
          border: 'rgba(15, 23, 42, 0.08)',
        },
        accent: {
          orange: {
            DEFAULT: 'hsl(20, 90%, 55%)',
            hover: 'hsl(20, 95%, 48%)',
            light: 'rgba(249, 115, 22, 0.08)',
          },
          blue: {
            DEFAULT: 'hsl(210, 100%, 50%)',
            hover: 'hsl(210, 100%, 43%)',
            light: 'rgba(59, 130, 246, 0.08)',
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
