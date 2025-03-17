import React from 'react';

interface ArrowIconProps {
  color?: string;
  size?: number;
  className?: string;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => {
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
        d="M7 14l5-5 5 5" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};