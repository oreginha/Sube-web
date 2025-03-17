import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.spacing.md};
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: ${theme.fonts.body};
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    margin-left: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.md};
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};
  }

  .section {
    padding: ${theme.spacing.xl} 0;
  }

  /* Party Mode Styles */
  .party-mode {
    animation: colorChange 3s infinite;
  }
  
  .party-mode * {
    animation: shake 0.5s infinite;
  }
  
  @keyframes colorChange {
    0% { background-color: #ff0000; }
    20% { background-color: #ffff00; }
    40% { background-color: #00ff00; }
    60% { background-color: #00ffff; }
    80% { background-color: #0000ff; }
    100% { background-color: #ff00ff; }
  }
  
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
  
  /* Easter Egg GIFs Container */
  #easter-egg-gifs {
    pointer-events: none;
    z-index: 9999;
  }
`;