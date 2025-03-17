import React from 'react';
import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

// Helper functions for button styles
const getButtonStyles = (variant: ButtonVariant, theme: any) => {
  switch (variant) {
    case 'primary':
      return `
        background-color: ${theme.colors.primary};
        color: ${theme.colors.secondary};
        border: 2px solid ${theme.colors.primary};
        
        &:hover:not(:disabled) {
          background-color: transparent;
          color: ${theme.colors.primary};
        }
      `;
    case 'secondary':
      return `
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.white};
        border: 2px solid ${theme.colors.secondary};
        
        &:hover:not(:disabled) {
          background-color: transparent;
          color: ${theme.colors.white};
        }
      `;
    case 'outline':
      return `
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 2px solid ${theme.colors.primary};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.secondary};
        }
      `;
    case 'text':
      return `
        background-color: transparent;
        color: ${theme.colors.primary};
        border: none;
        
        &:hover:not(:disabled) {
          text-decoration: underline;
        }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: ButtonSize, theme: any) => {
  switch (size) {
    case 'small':
      return `
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: 0.875rem;
      `;
    case 'medium':
      return `
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: 1rem;
      `;
    case 'large':
      return `
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: 1.125rem;
      `;
    default:
      return '';
  }
};

// Create a styled button component with transient props
const StyledButton = styled.button<{
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-transform: uppercase;
  letter-spacing: 1px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  
  ${({ $variant = 'primary', theme }) => getButtonStyles($variant, theme)};
  ${({ $size = 'medium', theme }) => getButtonSize($size, theme)};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Create a Button component that forwards props correctly
export const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton 
      $variant={variant} 
      $size={size} 
      $fullWidth={fullWidth} 
      {...props}
    >
      {children}
    </StyledButton>
  );
};