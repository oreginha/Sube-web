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

const initHiddenKeywords = () => {
    log('Initializing hidden keywords');

    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    // Esperar a que el DOM esté completamente cargado
    const readyStateCheckInterval = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(readyStateCheckInterval);
            log('Document fully loaded, setting up keywords');

            // Configurar inicialmente y luego de nuevo después de un retraso
            // para capturar contenido cargado dinámicamente
            setupHiddenKeywords();

            // Configurar un MutationObserver para detectar cambios en el DOM
            setupMutationObserver();

            // Configurar un intervalo de respaldo para asegurarse de que se procesan todos los elementos
            setInterval(setupHiddenKeywords, 3000);
        }
    }, 100);
};

/**
 * Configurar un MutationObserver para detectar cambios en el DOM
 */
const setupMutationObserver = () => {
    const observer = new MutationObserver((mutations) => {
        let shouldProcess = false;

        // Verificar si las mutaciones son relevantes
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldProcess = true;
            }
        });

        if (shouldProcess) {
            log('DOM changed, processing new content');
            setupHiddenKeywords();
        }
    });

    // Observar cambios en todo el cuerpo del documento
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    log('MutationObserver setup complete');
};

/**
 * Setup hidden keywords - versión simplificada y más robusta
 */
const setupHiddenKeywords = () => {
    log('Setting up hidden keywords');

    // Enfoque simple: buscar todas las palabras clave directamente en el texto
    HIDDEN_KEYWORDS.forEach(keyword => {
        processKeyword(keyword);
    });
};

/**
 * Procesar una palabra clave específica
 */
const processKeyword = (keyword: { word: string, memeUrl: string, alt: string }) => {
    try {
        const word = keyword.word.toLowerCase();
        log(`Processing keyword: ${word}`);

        // Buscar la palabra en todo el texto visible
        const textWalker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // Ignorar nodos en script, style o ya procesados
                    const parent = node.parentNode;
                    if (!parent) return NodeFilter.FILTER_REJECT;

                    if (
                        parent.nodeName === 'SCRIPT' ||
                        parent.nodeName === 'STYLE' ||
                        parent.nodeName === 'NOSCRIPT' ||
                        (parent as HTMLElement).getAttribute('data-keyword-processed') === 'true'
                    ) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    // Aceptar nodos con contenido de texto que contengan la palabra clave
                    const text = (node.textContent || '').toLowerCase();
                    return text.includes(word) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            } as NodeFilter
        );

        const matchingNodes = [];
        let currentNode;

        // Recopilar todos los nodos que contienen la palabra clave
        while (currentNode = textWalker.nextNode()) {
            matchingNodes.push(currentNode);
        }

        log(`Found ${matchingNodes.length} text nodes containing "${word}"`);

        // Procesar cada nodo que contiene la palabra clave
        matchingNodes.forEach(textNode => {
            wrapKeywordInNode(textNode as Text, word, keyword.memeUrl, keyword.alt);
        });
    } catch (error) {
        log(`Error processing keyword ${keyword.word}: ${error}`);
    }
};

/**
 * Envolver la palabra clave en un nodo de texto con un elemento span interactivo
 */
const wrapKeywordInNode = (textNode: Text, keyword: string, gifUrl: string, gifAlt: string) => {
    try {
        const parent = textNode.parentNode;
        if (!parent) return;

        // Verificar si el nodo ya ha sido procesado
        if ((parent as HTMLElement).getAttribute('data-keyword-processed') === 'true') {
            return;
        }

        const text = textNode.textContent || '';
        const lowerText = text.toLowerCase();

        // Buscar la palabra clave exacta con límites de palabra
        const regex = new RegExp(`(\\b${keyword}\\b)`, 'gi');

        // Si no hay coincidencias, salir
        if (!regex.test(lowerText)) return;

        // Marcar el padre como procesado
        (parent as HTMLElement).setAttribute('data-keyword-processed', 'true');

        // Divide el texto en partes basadas en la palabra clave
        const parts = text.split(regex);

        // Eliminar el nodo de texto original
        parent.removeChild(textNode);

        // Crear nuevos nodos para cada parte
        parts.forEach(part => {
            if (part.toLowerCase() === keyword) {
                // Crear un span para la palabra clave
                const span = document.createElement('span');
                span.textContent = part;
                span.style.cursor = 'default'; // Cursor normal
                span.setAttribute('data-keyword', keyword);

                // Agregar el evento mouseover
                span.addEventListener('mouseover', (e) => {
                    const target = e.target as HTMLElement;
                    const rect = target.getBoundingClientRect();
                    showGifNearCursor(
                        rect.left + rect.width / 2,
                        rect.top,
                        gifUrl,
                        gifAlt
                    );
                });

                parent.appendChild(span);
            } else if (part) {
                // Agregar texto normal
                const newTextNode = document.createTextNode(part);
                parent.appendChild(newTextNode);
            }
        });

        log(`Successfully processed keyword "${keyword}" in text`);
    } catch (error) {
        log(`Error wrapping keyword in node: ${error}`);
    }
};
/**
 * Gets the word at a specific position in the document
 */
const getWordAtPosition = (range: Range): string | null => {
    const startNode = range.startContainer;

    if (startNode.nodeType !== Node.TEXT_NODE) {
        return null;
    }

    const text = startNode.textContent || '';
    const startOffset = range.startOffset;

    // Find the beginning of the word
    let start = startOffset;
    while (start > 0 && !/\s/.test(text[start - 1])) {
        start--;
    }

    // Find the end of the word
    let end = startOffset;
    while (end < text.length && !/\s/.test(text[end])) {
        end++;
    }

    return text.substring(start, end);
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
 * Find all text nodes in an element
 */
const findTextNodes = (element: Node): Text[] => {
    const textNodes: Text[] = [];

    if (!element) return textNodes;

    const walk = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                // Skip script and style tags
                const parent = node.parentNode;
                if (parent && (
                    parent.nodeName === 'SCRIPT' ||
                    parent.nodeName === 'STYLE' ||
                    (parent as Element).getAttribute('data-easter-processed') === 'true'
                )) {
                    return NodeFilter.FILTER_REJECT;
                }

                // Accept non-empty text nodes
                return node.textContent && node.textContent.trim() !== ''
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        } as NodeFilter
    );

    let node;
    while (node = walk.nextNode()) {
        textNodes.push(node as Text);
    }

    return textNodes;
};

/**
 * Show GIF near cursor position - mejorado
 */
const showGifNearCursor = (x: number, y: number, gifUrl: string, alt: string) => {
    log(`Showing GIF near position (${x}, ${y}): ${gifUrl}`);

    // Verificar si ya existe un GIF con la misma URL
    const existingGif = document.querySelector(`img[src="${gifUrl}"]`);
    if (existingGif) {
        log('GIF already showing, not creating duplicate');
        return;
    }

    // Crear el contenedor del GIF
    const gifContainer = document.createElement('div');
    gifContainer.style.position = 'fixed';
    gifContainer.style.top = `${y - 10}px`;
    gifContainer.style.left = `${x + 20}px`;
    gifContainer.style.transform = 'translate(-50%, -100%)';
    gifContainer.style.zIndex = '10000';
    gifContainer.style.pointerEvents = 'none';
    gifContainer.style.opacity = '0';
    gifContainer.style.transition = 'opacity 0.3s ease-in';
    gifContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';

    // Crear el elemento de la imagen
    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = alt;
    img.style.maxWidth = '250px';
    img.style.maxHeight = '250px';
    img.style.borderRadius = '8px';
    img.style.border = '3px solid #c1ff00';

    // Agregar la imagen al contenedor
    gifContainer.appendChild(img);

    // Agregar al cuerpo del documento
    document.body.appendChild(gifContainer);

    // Fade in
    setTimeout(() => {
        gifContainer.style.opacity = '1';
    }, 10);

    // Remover después de 3 segundos
    setTimeout(() => {
        gifContainer.style.opacity = '0';

        // Remover después del fade out
        setTimeout(() => {
            if (gifContainer.parentNode) {
                gifContainer.parentNode.removeChild(gifContainer);
            }
        }, 300);
    }, 3000);
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