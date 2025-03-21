import styled from 'styled-components';

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    // Remove flex-direction: column to keep arrow next to SUBE
    // Instead, wrap the logo and arrow in their own container
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const LogoWithArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem; // Match the font size of LogoText
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 4rem; // Match the font size for medium screens
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 3rem; // Match the font size for small screens
  }
`;

export const LogoText = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 6rem;
  font-weight: bold;
  margin: 0;
  font-family: 'Wild World Bold', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 4rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 3rem;
  }
`;