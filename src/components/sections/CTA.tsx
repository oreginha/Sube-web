import styled from 'styled-components';

export const CTASection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const CTATitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CTADescription = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;