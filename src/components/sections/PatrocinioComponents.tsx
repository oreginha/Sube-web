import styled from 'styled-components';

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

export const PlanCard = styled.div<{ selected?: boolean }>`
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid ${({ selected, theme }) => selected ? theme.colors.primary : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${({ selected, theme }) => selected ? theme.colors.primary : 'rgba(193, 255, 0, 0.3)'};
  }
`;