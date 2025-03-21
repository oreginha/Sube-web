import styled from 'styled-components';

export const BillingToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const BillingOption = styled.span<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.white};
  font-weight: ${({ active, theme }) => active ? theme.fontWeights.bold : theme.fontWeights.medium};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};
`;

export const ToggleSwitch = styled.div`
  width: 50px;
  height: 26px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 13px;
  margin: 0 ${({ theme }) => theme.spacing.sm};
  position: relative;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
`;

export const ToggleKnob = styled.div<{ position: 'left' | 'right' }>`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${({ position }) => position === 'left' ? '3px' : '27px'};
  transition: left ${({ theme }) => theme.transitions.fast};
`;

export const PriceAmount = styled.span`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const PriceCurrency = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;