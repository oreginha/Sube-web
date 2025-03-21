import styled from 'styled-components';

export const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
    z-index: 1;
  }
`;