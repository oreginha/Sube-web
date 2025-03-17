import { useEffect } from 'react';
import { initEasterEggs } from '@/utils/easterEggs';
import EasterEggIcon from './EasterEggIcon';

const EasterEggManager = () => {
    useEffect(() => {
        console.log('EasterEggManager mounted, initializing Easter eggs...');
        try {
            // Añadir un pequeño retraso para asegurar que el DOM esté completamente cargado
            const timer = setTimeout(() => {
                initEasterEggs();
                console.log('Easter eggs initialized successfully');
            }, 500);

            return () => clearTimeout(timer);
        } catch (error) {
            console.error('Failed to initialize Easter eggs:', error);
        }
    }, []);

    return <EasterEggIcon />;
};

export default EasterEggManager;