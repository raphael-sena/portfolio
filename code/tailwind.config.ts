import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        typewriter: 'typewriter 3s steps(27) forwards',
        caret: 'typewriter 3s steps(27) forwards, blink 1s steps(27) infinite 3s',
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
      backgroundImage: {
        'chessboard': `
          linear-gradient(45deg, #EEEED2 25%, transparent 25%, transparent 75%, #EEEED2 75%),
          linear-gradient(45deg, #EEEED2 25%, transparent 25%, transparent 75%, #EEEED2 75%)
        `,
      },
      backgroundSize: {
        'chessboard': '20px 20px',
      },
      backgroundPosition: {
        'chessboard': '0 0, 10px 10px',
      },
      backgroundColor: {
        'chess-green': '#769656',
      },

      screens: {
        'chess1': { min: '767px', max: '827px' },
        'chess2': { min: '1024px', max: '1225px' },
      },
    },
  },
  plugins: [],
};

export default config;

