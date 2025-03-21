import React from 'react';

interface IconProps {
    color?: string;
    size?: number;
    className?: string;
}

// Arrow icon for SUBE
export const ChannelArrowIcon: React.FC<IconProps> = ({
    color = '#c1ff00',
    size = 24,
    className = ''
}) => {
    return (
        <img
            src="/images/channels/arrow.png"
            width={size}
            height={size}
            className={className}
            alt="Arrow icon"
        />
    );
};

// Microphone icon
export const ChannelMicrophoneIcon: React.FC<IconProps> = ({
    color = '#c1ff00',
    size = 24,
    className = ''
}) => (
    <img
        src="/images/channels/microfono.png"
        width={size}
        height={size}
        className={className}
        alt="Microphone icon"
    />
);

// Broadcast/Signal icon
export const ChannelBroadcastIcon: React.FC<IconProps> = ({
    color = '#c1ff00',
    size = 24,
    className = ''
}) => (
    <img
        src="/images/channels/ondas.png"
        width={size}
        height={size}
        className={className}
        alt="Broadcast icon"
    />
);

// Heart icon
export const ChannelHeartIcon: React.FC<IconProps> = ({
    color = '#c1ff00',
    size = 24,
    className = ''
}) => (
    <img
        src="/images/channels/corazon.png"
        width={size}
        height={size}
        className={className}
        alt="Heart icon"
    />
);

// Money/Dollar icon
export const ChannelMoneyIcon: React.FC<IconProps> = ({
    color = '#c1ff00',
    size = 24,
    className = ''
}) => (
    <img
        src="/images/channels/dolar.png"
        width={size}
        height={size}
        className={className}
        alt="Money icon"
    />
);