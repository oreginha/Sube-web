// Easter Eggs functionality for SUBE website

// Party mode state
let partyModeActive = false;
let partyInterval: number | null = null;
let partyAudio: HTMLAudioElement | null = null;

// Hidden keywords that will trigger memes when clicked
const HIDDEN_KEYWORDS = [
    { word: 'mate', memeUrl: '/images/memes/mate.gif', alt: 'Mate meme' },
    { word: 'asado', memeUrl: '/images/memes/asado.gif', alt: 'Asado meme' },
    { word: 'fulbo', memeUrl: '/images/memes/fulbo.gif', alt: 'Fulbo meme' },
    { word: 'che', memeUrl: '/images/memes/che.gif', alt: 'Che meme' },
    { word: 'messi', memeUrl: '/images/memes/messi1.gif', alt: 'messi2 meme' },
    { word: 'guita', memeUrl: '/images/memes/guita.gif', alt: 'guita meme' },
    { word: 'comunidad', memeUrl: '/images/memes/comunidad.gif', alt: 'homero meme' },
    { word: 'sube', memeUrl: '/images/memes/di caprio aplaudiendo.gif', alt: 'di caprio meme' },
    { word: 'canchero', memeUrl: '/images/memes/homero.gif', alt: 'homero meme' },
    { word: 'popular', memeUrl: '/images/memes/ella.gif', alt: 'ella meme' },
    { word: 'nacional', memeUrl: '/images/memes/ella2.gif', alt: 'ella2 meme' },
    //{ word:'sube', memeUrl: '/images/memes/guitarra3.gif', alt: 'guitarra meme' },
    // ...otros keywords
];

/**
 * Simple logger function
 */
const log = (message: string) => {
    console.log(`[EasterEggs] ${message}`);
};

/**
 * Initialize all Easter eggs
 */
export const initEasterEggs = () => {
    log('Initializing Easter eggs...');

    // Check if already initialized to prevent duplicate initialization
    if (typeof window !== 'undefined' && window.document.body.getAttribute('data-easter-eggs-initialized') === 'true') {
        log('Easter eggs already initialized, skipping');
        return;
    }

    // Mark as initialized
    if (typeof window !== 'undefined') {
        window.document.body.setAttribute('data-easter-eggs-initialized', 'true');
    }

    // Register key combinations
    if (typeof window !== 'undefined') {
        window.document.addEventListener('keydown', handleKeyDown);

        // Register toggle party mode event listener
        window.document.addEventListener('togglePartyMode', handleTogglePartyMode);

        // Inicializar palabras clave ocultas - AÑADE ESTA LÍNEA
        initHiddenKeywords();
    }

    log('Easter eggs initialization completed');
};
/**
 * Initialize hidden keywords
 */

/**
 * Initialize hidden keywords - versión más eficiente
 */
const initHiddenKeywords = () => {
    log('Initializing hidden keywords');

    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupKeywordListener);
    } else {
        setupKeywordListener();
    }
};

/**
 * Configurar un único listener a nivel de documento
 */
const setupKeywordListener = () => {
    log('Setting up document-wide keyword listener');

    // Usar delegación de eventos para eficiencia
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);
    document.body.addEventListener('click', handleClick);

    // Crear una hoja de estilos para las palabras clave
    createKeywordStyles();

    log('Document-wide keyword listeners installed');
};

/**
 * Crear estilos CSS para palabras clave
 */
const createKeywordStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .easter-keyword {
            cursor: pointer;
            position: relative;
            transition: color 0.2s ease;
        }
        
        .easter-keyword:hover {
            color: #c1ff00;
        }
    `;
    document.head.appendChild(style);
};

/**
 * Manejar evento mouseover
 */
const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const text = target?.textContent?.toLowerCase() || '';

    // Solo procesar elementos de texto que no sean interactivos
    if (target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.classList.contains('easter-keyword')) {
        return;
    }

    // Verificar si alguna palabra clave está en el texto
    for (const keyword of HIDDEN_KEYWORDS) {
        const wordRegex = new RegExp(`\\b${keyword.word.toLowerCase()}\\b`, 'i');
        if (wordRegex.test(text)) {
            // Reemplazar la palabra clave con un span resaltado
            highlightKeyword(target, keyword.word, keyword.memeUrl, keyword.alt);
            break;
        }
    }
};

/**
 * Manejar evento mouseout
 */
const handleMouseOut = (e: MouseEvent) => {
    // No necesitamos hacer nada aquí,
    // el CSS se encargará del efecto de hover
};

/**
 * Manejar evento click
 */
const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Verificar si el clic fue en una palabra clave
    if (target.classList.contains('easter-keyword')) {
        e.preventDefault();
        e.stopPropagation();

        const keyword = target.getAttribute('data-keyword');
        const memeUrl = target.getAttribute('data-meme-url');
        const alt = target.getAttribute('data-alt') || 'Meme';

        if (keyword && memeUrl) {
            showGifNearElement(target, memeUrl, alt);
        }
    }
};

/**
 * Resaltar una palabra clave en un elemento
 */
/**
 * Resaltar una palabra clave en un elemento
 */
const highlightKeyword = (element: HTMLElement, keyword: string, memeUrl: string, alt: string) => {
    // Verificar si el elemento ya tiene palabras clave procesadas
    if (element.getAttribute('data-keywords-processed') === 'true') {
        return;
    }

    try {
        // En lugar de modificar directamente el innerHTML, trabajaremos con los nodos de texto
        const childNodes = Array.from(element.childNodes);
        let modified = false;

        for (let i = 0; i < childNodes.length; i++) {
            const node = childNodes[i];

            // Solo procesar nodos de texto
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || '';
                const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');

                if (regex.test(text)) {
                    modified = true;

                    // Crear un fragmento de documento para los nuevos nodos
                    const fragment = document.createDocumentFragment();

                    // Dividir el texto por la palabra clave
                    const parts = text.split(regex);

                    for (let j = 0; j < parts.length; j++) {
                        if (parts[j].toLowerCase() === keyword.toLowerCase()) {
                            // Crear un span para la palabra clave
                            const span = document.createElement('span');
                            span.textContent = parts[j]; // Mantener el texto original
                            span.className = 'easter-keyword';
                            span.setAttribute('data-keyword', parts[j]);
                            span.setAttribute('data-meme-url', memeUrl);
                            span.setAttribute('data-alt', alt);

                            fragment.appendChild(span);
                        } else if (parts[j]) {
                            // Añadir el texto normal
                            fragment.appendChild(document.createTextNode(parts[j]));
                        }
                    }

                    // Reemplazar el nodo de texto con el fragmento
                    element.replaceChild(fragment, node);
                }
            }
        }

        if (modified) {
            element.setAttribute('data-keywords-processed', 'true');
        }
    } catch (error) {
        log(`Error highlighting keyword: ${error}`);
    }
};

/**
 * Mostrar GIF cerca del elemento
 */
const showGifNearElement = (element: HTMLElement, gifUrl: string, alt: string) => {
    log(`Showing GIF for element: ${gifUrl}`);

    // Obtener posición del elemento
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    // Crear el contenedor del GIF
    const gifContainer = document.createElement('div');
    gifContainer.style.position = 'fixed';
    gifContainer.style.top = `${y - 10}px`;
    gifContainer.style.left = `${x}px`;
    gifContainer.style.transform = 'translate(-50%, -100%)';
    gifContainer.style.zIndex = '10000';
    gifContainer.style.opacity = '0';
    gifContainer.style.transition = 'opacity 0.3s ease-in';
    gifContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
    gifContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    gifContainer.style.padding = '10px';
    gifContainer.style.borderRadius = '8px';
    gifContainer.style.border = '2px solid #c1ff00';

    // Crear el elemento de la imagen
    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = alt;
    img.style.maxWidth = '250px';
    img.style.maxHeight = '250px';
    img.style.display = 'block';

    // Agregar la imagen al contenedor
    gifContainer.appendChild(img);

    // Agregar un botón de cierre
    const closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => {
        gifContainer.style.opacity = '0';
        setTimeout(() => {
            if (gifContainer.parentNode) {
                gifContainer.parentNode.removeChild(gifContainer);
            }
        }, 300);
    };
    gifContainer.appendChild(closeButton);

    // Agregar al cuerpo del documento
    document.body.appendChild(gifContainer);

    // Fade in
    setTimeout(() => {
        gifContainer.style.opacity = '1';
    }, 10);

    // Remover después de 5 segundos
    setTimeout(() => {
        gifContainer.style.opacity = '0';

        // Remover después del fade out
        setTimeout(() => {
            if (gifContainer.parentNode) {
                gifContainer.parentNode.removeChild(gifContainer);
            }
        }, 300);
    }, 5000);
};
/**
 * Handle keyboard events
 */
const handleKeyDown = (event: KeyboardEvent) => {
    // Party mode: Ctrl+Alt+P
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'p') {
        log('Detected Ctrl+Alt+P key combination');
        event.preventDefault();
        togglePartyMode();
    }
};

/**
 * Handle togglePartyMode event
 */
const handleTogglePartyMode = () => {
    log('Received togglePartyMode event');
    togglePartyMode();
};

/**
 * Toggle party mode on/off
 */
const togglePartyMode = () => {
    log(`Toggling party mode. Current state: ${partyModeActive}`);

    if (partyModeActive) {
        deactivatePartyMode();
    } else {
        activatePartyMode();
    }
};

/**
 * Activate party mode
 */
const activatePartyMode = () => {
    // Prevent duplicate activation
    if (partyModeActive) {
        log('Party mode already active, ignoring activation');
        return;
    }

    log('Activating party mode');
    partyModeActive = true;

    // Play party sound
    playPartySound();

    // Setup color changing
    setupColorChanging();

    // Show notification
    showNotification('¡MODO FIESTA ACTIVADO!', '🎉');

    // Dispatch state change event for icon
    dispatchStateChangeEvent(true);
};

/**
 * Deactivate party mode
 */
const deactivatePartyMode = () => {
    // Prevent duplicate deactivation
    if (!partyModeActive) {
        log('Party mode already inactive, ignoring deactivation');
        return;
    }

    log('Deactivating party mode');
    partyModeActive = false;

    // Stop color changing
    stopColorChanging();

    // Reset background color
    resetBackgroundColor();

    // Stop audio if playing
    stopPartySound();

    // Show notification
    showNotification('MODO FIESTA DESACTIVADO', '😎');

    // Dispatch state change event for icon
    dispatchStateChangeEvent(false);
};

/**
 * Dispatch state change event for the icon
 */
const dispatchStateChangeEvent = (isActive: boolean) => {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('partyModeStateChange', {
            detail: { isActive }
        });
        window.document.dispatchEvent(event);
    }
};

/**
 * Play party sound
 */
const playPartySound = () => {
    log('Attempting to play party sound');

    try {
        // Create new audio instance
        partyAudio = new Audio('/sounds/party.mp3');
        partyAudio.volume = 0.5;

        // Add ended event to deactivate party mode when audio finishes
        partyAudio.addEventListener('ended', () => {
            log('Party audio has ended, deactivating party mode');
            deactivatePartyMode();
        });

        // Play the audio
        const playPromise = partyAudio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    log('Party sound playing successfully');
                })
                .catch(err => {
                    log(`Audio playback failed: ${err.message}`);
                    // Try to play again with user interaction
                    document.body.addEventListener('click', () => {
                        partyAudio?.play().catch(e => log(`Retry play failed: ${e}`));
                    }, { once: true });
                });
        }
    } catch (error) {
        log(`Error creating audio: ${error}`);
    }
};



/**
 * Stop party sound
 */
const stopPartySound = () => {
    if (partyAudio) {
        log('Stopping party sound');
        partyAudio.pause();
        partyAudio.currentTime = 0;
        partyAudio = null;
    }
};

/**
 * Setup color changing
 */
const setupColorChanging = () => {
    // Calculate interval for 128 BPM (60000ms / 128 = 468.75ms per beat)
    const beatInterval = Math.floor(60000 / 128);
    log(`Setting up color change interval at ${beatInterval}ms (128 BPM)`);

    // Array of bright colors to cycle through
    const colors = [
        '#FF0000', // Red
        '#FF7F00', // Orange
        '#FFFF00', // Yellow
        '#00FF00', // Green
        '#0000FF', // Blue
        '#4B0082', // Indigo
        '#9400D3'  // Violet
    ];

    let colorIndex = 0;

    // Apply first color immediately
    log(`Setting initial background color to ${colors[colorIndex]}`);
    try {
        document.body.style.backgroundColor = colors[colorIndex];
        document.body.style.transition = `background-color ${beatInterval / 2}ms`;
        log('Initial background color applied successfully');
    } catch (error) {
        log(`Error applying initial background color: ${error}`);
    }

    // Start color changing at 128 BPM
    log('Starting color change interval');
    try {
        // Clear any existing interval
        if (partyInterval !== null) {
            clearInterval(partyInterval);
        }

        partyInterval = window.setInterval(() => {
            colorIndex = (colorIndex + 1) % colors.length;
            document.body.style.backgroundColor = colors[colorIndex];
        }, beatInterval);
        log('Color change interval started successfully');
    } catch (error) {
        log(`Error starting color change interval: ${error}`);
    }
};

/**
 * Stop color changing
 */
const stopColorChanging = () => {
    if (partyInterval !== null) {
        log('Clearing color change interval');
        clearInterval(partyInterval);
        partyInterval = null;
    }
};

/**
 * Reset background color
 */
const resetBackgroundColor = () => {
    log('Resetting background color');
    try {
        document.body.style.transition = 'background-color 0.5s';
        document.body.style.backgroundColor = '';
        log('Background color reset successfully');

        // Reset transition after change
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    } catch (error) {
        log(`Error resetting background color: ${error}`);
    }
};

/**
 * Show a notification
 */
const showNotification = (message: string, emoji: string): void => {
    log(`Creating notification: "${message}"`);

    // Create notification element
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = '#c1ff00';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '30px';
    notification.style.fontWeight = 'bold';
    notification.style.fontSize = '18px';
    notification.style.zIndex = '9999';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';

    // Add emoji
    const emojiSpan = document.createElement('span');
    emojiSpan.style.fontSize = '24px';
    emojiSpan.textContent = emoji;
    notification.appendChild(emojiSpan);

    // Add message
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    notification.appendChild(messageSpan);

    // Add to body
    log('Appending notification to document body');
    document.body.appendChild(notification);

    // Remove after 3 seconds
    log('Setting timeout to remove notification after 3 seconds');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
            log('Notification removed');
        }
    }, 3000);
};

// Export for testing
export { partyModeActive, togglePartyMode };