import React from 'react';
import styled from 'styled-components';
import { ChannelArrowIcon } from './icons/ChannelIcons';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.brand};
  font-size: 1.75rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-right: -0.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LogoArrow = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <LogoText>SUBE</LogoText>
      <LogoArrow>
        <ChannelArrowIcon color="#c1ff00" size={40} />
      </LogoArrow>
    </LogoContainer>
  );
};