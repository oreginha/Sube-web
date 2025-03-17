/**
 * Logger utility for the application
 * Provides different log levels and formatting
 */

enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

interface LoggerOptions {
    enableConsole?: boolean;
    minLevel?: LogLevel;
    includeTimestamp?: boolean;
}

class Logger {
    private static instance: Logger;
    private options: LoggerOptions = {
        enableConsole: true,
        minLevel: LogLevel.DEBUG,
        includeTimestamp: true
    };

    private constructor() { }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public configure(options: LoggerOptions): void {
        this.options = { ...this.options, ...options };
    }

    private formatMessage(level: LogLevel, message: string, data?: any): string {
        const timestamp = this.options.includeTimestamp ? `[${new Date().toISOString()}]` : '';
        const formattedMessage = `${timestamp} [${level}] ${message}`;

        if (data) {
            return `${formattedMessage}\n${typeof data === 'object' ? JSON.stringify(data, null, 2) : data}`;
        }

        return formattedMessage;
    }

    private shouldLog(level: LogLevel): boolean {
        const levels = Object.values(LogLevel);
        const minLevelIndex = levels.indexOf(this.options.minLevel!);
        const currentLevelIndex = levels.indexOf(level);

        return currentLevelIndex >= minLevelIndex;
    }

    private log(level: LogLevel, message: string, data?: any): void {
        if (!this.options.enableConsole || !this.shouldLog(level)) {
            return;
        }

        const formattedMessage = this.formatMessage(level, message, data);

        switch (level) {
            case LogLevel.DEBUG:
                console.log(formattedMessage);
                break;
            case LogLevel.INFO:
                console.info(formattedMessage);
                break;
            case LogLevel.WARN:
                console.warn(formattedMessage);
                break;
            case LogLevel.ERROR:
                console.error(formattedMessage);
                break;
        }
    }

    public debug(message: string, data?: any): void {
        this.log(LogLevel.DEBUG, message, data);
    }

    public info(message: string, data?: any): void {
        this.log(LogLevel.INFO, message, data);
    }

    public warn(message: string, data?: any): void {
        this.log(LogLevel.WARN, message, data);
    }

    public error(message: string, data?: any): void {
        this.log(LogLevel.ERROR, message, data);
    }
}

// Export the logger instance and types
export const logger = Logger.getInstance();
export { LogLevel };