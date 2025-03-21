import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background-color: rgba(255, 255, 255, 0.02);
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 1px;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const BenefitCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  
  svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const BenefitTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 1.25rem;
`;

const BenefitDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1rem;
  line-height: 1.6;
`;

interface WhyJoinSectionProps {
    children?: React.ReactNode;
}

const WhyJoinSection: React.FC<WhyJoinSectionProps> = ({ children }) => {
    return (
        <SectionContainer>
            {children}
        </SectionContainer>
    );
};

export {
    WhyJoinSection,
    BenefitsGrid,
    BenefitCard,
    BenefitIcon,
    BenefitTitle,
    BenefitDescription,
    SectionTitle
};