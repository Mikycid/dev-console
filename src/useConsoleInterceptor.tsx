import React from 'react';
import { useEffect, useRef } from 'react';
import { LogLevel } from './Types/LogLevel';

type LogType = 'debug' | 'info' | 'warn' | 'error' | 'log';

interface LogEntry {
    type: LogType;
    message: string;
    timestamp: Date;
    level: LogLevel;
}

const LOG_TYPE_TO_LEVEL: Record<LogType, LogLevel> = {
    debug: LogLevel.DEBUG,
    info: LogLevel.INFO,
    warn: LogLevel.WARN,
    error: LogLevel.ERROR,
    log: LogLevel.INFO
};

export const useConsoleInterceptor = (
    setAllLogs: React.Dispatch<React.SetStateAction<LogEntry[]>>
) => {
    const isInterceptorSet = useRef(false);

    useEffect(() => {
        if (isInterceptorSet.current) return;

        const originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info,
            debug: console.debug,
        };

        const interceptConsole = (type: LogType) => {
            const original = originalConsole[type];
            console[type] = (...args: any[]) => {
                original.apply(console, args);

                const formattedMessage = args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' ');

                const newLog: LogEntry = {
                    type,
                    message: formattedMessage,
                    timestamp: new Date(),
                    level: LOG_TYPE_TO_LEVEL[type]
                };

                setAllLogs(prev => [...prev, newLog]);
            };
        };

        (Object.keys(originalConsole) as LogType[]).forEach(interceptConsole);
        isInterceptorSet.current = true;

        return () => {
            Object.entries(originalConsole).forEach(([key, value]) => {
                console[key as LogType] = value;
            });
            isInterceptorSet.current = false;
        };
    }, []);
};