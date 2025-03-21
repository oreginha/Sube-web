import styled from 'styled-components';

export const PlanHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

export const PlanName = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-align: center;
  background-color: #000;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  display: inline-block;
`;

export const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export const PriceInterval = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
`;

export const PlanDescription = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin: ${({ theme }) => theme.spacing.md} 0;
  text-align: center;
`;

export const IncludesTitle = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: ${({ theme }) => theme.spacing.md} 0 ${({ theme }) => theme.spacing.sm};
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  padding: 0;
`;

export const PlanFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.white};
  
  &:before {
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.sm};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;