/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        text: 'hsl(var(--text))',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))',
        primary: 'hsl(var(--primary))',
        surface: 'hsl(var(--surface))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
      },
      spacing: {
        xs: '4px',
        sm: '8px', 
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px', 
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(0, 0%, 0%, 0.1)',
        glow: '0 0 20px hsla(142, 76%, 36%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
