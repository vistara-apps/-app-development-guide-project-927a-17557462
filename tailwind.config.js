
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(200, 80%, 50%)',
        accent: 'hsl(160, 70%, 45%)',
        bg: 'hsl(220, 15%, 95%)',
        surface: 'hsl(0, 0%, 100%)',
        text: 'hsl(220, 15%, 20%)',
        'primary-hover': 'hsl(200, 80%, 45%)',
        'accent-hover': 'hsl(160, 70%, 40%)',
        'text-muted': 'hsl(220, 15%, 50%)',
        'border-light': 'hsl(220, 15%, 85%)',
      },
      fontSize: {
        'display': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'headline': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.75rem', fontWeight: '400' }],
      },
      spacing: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 15%, 15%, 0.08)',
        'modal': '0 12px 32px hsla(220, 15%, 15%, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        'scale-in': 'scaleIn 100ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
