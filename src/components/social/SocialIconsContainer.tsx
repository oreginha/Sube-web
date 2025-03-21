import styled from 'styled-components';

interface SocialIconsContainerProps {
  bottomPosition?: string;
  rightPosition?: string;
  mobileBottomPosition?: string;
}

const SocialIconsContainer = styled.div<SocialIconsContainerProps>`
  display: flex;
  gap: 10px;
  position: absolute;
  bottom: ${props => props.bottomPosition || '-50px'};
  right: ${props => props.rightPosition || '-30px'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: ${props => props.mobileBottomPosition || '-60px'};
  }
`;

export default SocialIconsContainer;