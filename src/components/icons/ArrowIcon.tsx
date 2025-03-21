import React from 'react';
import styled from 'styled-components';

interface ArrowIconProps {
  color?: string;
  size?: number;
  className?: string;
  direction?: 'up' | 'right' | 'down' | 'left';
  heightPercentage?: number;
  useImage?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  topValue?: number;
  positionSting?: string;
  style?: React.CSSProperties;
}

// Styled component for the image version
const ArrowImage = styled.img<{ heightPercentage?: number }>`
  height: ${props => props.heightPercentage || 150}%;
  width: auto;
  margin-left: 5px;
  align-self: center;
`;

export const ArrowIcon: React.FC<ArrowIconProps> = ({
  color = '#c1ff00',
  size = 24,
  className = '',
  direction = 'up',
  heightPercentage = 150,
  useImage = false,
  imageSrc = '/images/channels/arrow.png',
  imageAlt = 'Arrow',
  topValue = 5,
  positionSting = 'relative',

}) => {
  // If using image version
  if (useImage) {
    return (
      <ArrowImage
        src={imageSrc}
        alt={imageAlt}
        heightPercentage={heightPercentage}
        className={className}
        height={heightPercentage}
        style={{
          top: `${topValue}px`,
        }}

      />
    );
  }

  // SVG path based on direction
  let pathData = '';
  switch (direction) {
    case 'up':
      pathData = 'M7 14l5-5 5 5';
      break;
    case 'right':
      pathData = 'M10 7l5 5-5 5';
      break;
    case 'down':
      pathData = 'M7 10l5 5 5-5';
      break;
    case 'left':
      pathData = 'M14 7l-5 5 5 5';
      break;
    default:
      pathData = 'M7 14l5-5 5 5';
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d={pathData}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};