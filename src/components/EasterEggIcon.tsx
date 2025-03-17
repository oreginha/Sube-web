import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface IconContainerProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const IconContainer = styled.div<IconContainerProps>`
  position: fixed;
  top: ${props => props.top !== undefined ? `${props.top}px` : 'auto'};
  right: ${props => props.right !== undefined ? `${props.right}px` : 'auto'};
  bottom: ${props => props.bottom !== undefined ? `${props.bottom}px` : 'auto'};
  left: ${props => props.left !== undefined ? `${props.left}px` : 'auto'};
  cursor: pointer;
  z-index: 1000;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const Icon = styled.div<{ isActive: boolean }>`
  width: 40px;
  height: 40px;
  background-color: ${props => props.isActive ? '#FF1493' : props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.isActive
    ? '0 0 15px rgba(255, 20, 147, 0.7)'
    : '0 2px 5px rgba(0, 0, 0, 0.2)'};
  transition: all 0.3s ease;
`;

const EasterEggIcon = () => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({
    top: undefined as number | undefined,
    right: undefined as number | undefined,
    bottom: undefined as number | undefined,
    left: undefined as number | undefined,
  });

  // Set random position on first render
  useEffect(() => {
    setRandomPosition();

    // Listen for state changes from the Easter Eggs module
    const handleStateChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsActive(customEvent.detail?.isActive || false);
    };

    document.addEventListener('partyModeStateChange', handleStateChange);

    return () => {
      document.removeEventListener('partyModeStateChange', handleStateChange);
    };
  }, []);

  const setRandomPosition = () => {
    // Decide which edge to place the icon on
    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left

    const padding = 20; // minimum distance from edge
    const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 80 : 1000;
    const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 80 : 800;

    const randomPosition = {
      top: undefined as number | undefined,
      right: undefined as number | undefined,
      bottom: undefined as number | undefined,
      left: undefined as number | undefined,
    };

    switch (edge) {
      case 0: // top
        randomPosition.top = padding;
        randomPosition.left = padding + Math.floor(Math.random() * (maxWidth - padding));
        break;
      case 1: // right
        randomPosition.right = padding;
        randomPosition.top = padding + Math.floor(Math.random() * (maxHeight - padding));
        break;
      case 2: // bottom
        randomPosition.bottom = padding;
        randomPosition.left = padding + Math.floor(Math.random() * (maxWidth - padding));
        break;
      case 3: // left
        randomPosition.left = padding;
        randomPosition.top = padding + Math.floor(Math.random() * (maxHeight - padding));
        break;
    }

    setPosition(randomPosition);
  };

  const handleClick = () => {
    console.log('User clicked on Easter egg icon, dispatching event');
    const event = new CustomEvent('togglePartyMode');
    document.dispatchEvent(event);

    // Note: we don't toggle isActive here anymore,
    // it will be updated via the event listener when the actual state changes
  };

  return (
    <IconContainer
      onClick={handleClick}
      top={position.top}
      right={position.right}
      bottom={position.bottom}
      left={position.left}
    >
      <Icon isActive={isActive}>
        {isActive ? '🎉' : '🥚'}
      </Icon>
    </IconContainer>
  );
};

export default EasterEggIcon;