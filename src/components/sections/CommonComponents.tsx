import styled from 'styled-components';

export const MainContent = styled.main`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  min-height: calc(100vh - 200px);
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 1px;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
`;

export const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 0;
`;