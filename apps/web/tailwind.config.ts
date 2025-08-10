import type { Config } from 'tailwindcss'

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royale: {
          primary: '#0C1E5B',
          secondary: '#C8A968',
          dark: '#111827',
          light: '#F3F4F6',
          white: '#FFFFFF',
        },
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' }
    },
  },
  plugins: [],
} satisfies Config
