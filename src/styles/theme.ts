const theme = {
  colors: {
    primary: '#c1ff00', // Verde flúor
    secondary: '#000000', // Negro
    white: '#FFFFFF',
    gray: '#CCCCCC',
    lightGray: '#F5F5F5',
    darkGray: '#333333',
    error: '#FF3B30',
    success: '#4CD964',
    programColors: {
      tocoMadera: '#ff6d00',
      marcandoCancha: '#00ff67',
      remedioCasero: '#00c1ff',
      chichaLimonada: '#ff00c1',
    },
  },
  fonts: {
    brand: '"Wild World Bold", sans-serif',
    heading: '"Bizmo", sans-serif',
    body: '"Poppins", sans-serif',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    xl: '2rem',    // 32px
    xxl: '3rem',   // 48px
  },
  borderRadius: {
    sm: '0.25rem', // 4px
    md: '0.5rem',  // 8px
    lg: '1rem',    // 16px
    pill: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export { theme };