import React from 'react';

interface IconProps {
  color?: string;
  size?: number;
  className?: string;
}

// Sports icon
export const SportsIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" 
      fill={color} 
    />
  </svg>
);

// Rocket icon
export const RocketIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2.5c0 0-8 4.5-8 11.5 0 5 3.5 7.5 8 7.5s8-2.5 8-7.5c0-7-8-11.5-8-11.5zm0 17.5c-3.5 0-6-1.5-6-5.5 0-5 4.5-8.7 6-9.8 1.5 1.1 6 4.8 6 9.8 0 4-2.5 5.5-6 5.5z" 
      fill={color} 
    />
    <path 
      d="M12 5.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" 
      fill={color} 
    />
    <path 
      d="M12 11.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" 
      fill={color} 
    />
  </svg>
);

// Helicopter icon
export const HelicopterIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M21 7h-2V6c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v1H3c-.55 0-1 .45-1 1s.45 1 1 1h2v7H3c-.55 0-1 .45-1 1s.45 1 1 1h2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2V9h2c.55 0 1-.45 1-1s-.45-1-1-1zM7 6h10v1H7V6zm10 12H7v-1h10v1zm0-3H7V9h10v6z" 
      fill={color} 
    />
    <path 
      d="M8 10h8v4H8z" 
      fill={color} 
    />
  </svg>
);

// Microphone icon
export const MicrophoneIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" 
      fill={color} 
    />
    <path 
      d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" 
      fill={color} 
    />
  </svg>
);

// Broadcast icon
export const BroadcastIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zM2.92 9.07C5.51 7.08 8.67 6 12 6s6.49 1.08 9.08 3.07L12 18.17l-9.08-9.1z" 
      fill={color} 
    />
    <path 
      d="M12 8c-2.48 0-4.93.5-7.01 1.49l7.01 7.01 7.01-7.01C16.93 8.5 14.48 8 12 8z" 
      fill={color} 
    />
  </svg>
);

// Heart icon
export const HeartIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      fill={color} 
    />
  </svg>
);

// Money icon
export const MoneyIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" 
      fill={color} 
    />
  </svg>
);

// Video icon
export const VideoIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" 
      fill={color} 
    />
  </svg>
);

// Soccer icon
export const SoccerIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
      fill={color} 
    />
    <path 
      d="M13 5.5v5l4.5 2.5-1 1.5-5-3V5.5h1.5z" 
      fill={color} 
    />
  </svg>
);

// Tennis icon
export const TennisIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
      fill={color} 
    />
    <path 
      d="M9.5 8.5L12 11l2.5-2.5L17 11l-2.5 2.5L17 16l-2.5 2.5L12 16l-2.5 2.5L7 16l2.5-2.5L7 11l2.5-2.5z" 
      fill={color} 
    />
  </svg>
);

// Basketball icon
export const BasketballIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
      fill={color} 
    />
    <path 
      d="M7 12c0-2.76 2.24-5 5-5v10c-2.76 0-5-2.24-5-5zm10 0c0 2.76-2.24 5-5 5V7c2.76 0 5 2.24 5 5z" 
      fill={color} 
    />
  </svg>
);

// Food icon
export const FoodIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" 
      fill={color} 
    />
  </svg>
);

// Group icon
export const GroupIcon: React.FC<IconProps> = ({ 
  color = '#c1ff00', 
  size = 24,
  className = ''
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" 
      fill={color} 
    />
  </svg>
);