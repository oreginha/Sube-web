import styled from 'styled-components';

const LogoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 60px; // Increased padding to make room for social icons
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-bottom: 80px;
  }
`;

export default LogoContainer;