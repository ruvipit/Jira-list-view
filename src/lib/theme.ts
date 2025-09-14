// Central theme tokens (Jira-esque) to allow JS consumption and future theming.
export const theme = {
  colors: {
    brand: {
      primary: 'var(--brand-primary, #0c66e4)',
      hover: 'var(--brand-primary-hover, #1d7afc)',
    },
    neutral: {
      50: '#f6f7f9',
      100: '#eceef2',
      200: '#d9dde3',
      300: '#c1c7d0',
      400: '#a6b0bd',
      500: '#7a8699',
      600: '#596773',
      700: '#44515d',
      800: '#2c3e50',
      900: '#1d2731',
    }
  },
  radius: {
    sm: '3px',
    md: '6px',
    lg: '8px',
  },
  shadows: {
    soft: '0 1px 2px 0 rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)',
    floating: '0 2px 6px -1px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)'
  }
} as const;

export type Theme = typeof theme;
