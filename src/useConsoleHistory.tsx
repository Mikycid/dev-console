import { useState } from 'react';

export const useConsoleHistory = () => {
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);

    const addToHistory = (command: string) => {
        setHistory(prev => [...prev, command]);
        setHistoryIndex(-1);
    };

    const navigateHistory = (direction: 'up' | 'down', currentInput: string) => {
        if (history.length === 0) return currentInput;

        if (direction === 'up') {
            if (historyIndex === -1) {
                setHistoryIndex(history.length - 1);
                return history[history.length - 1];
            } else if (historyIndex > 0) {
                setHistoryIndex(historyIndex - 1);
                return history[historyIndex - 1];
            }
        } else {
            if (historyIndex === -1) return currentInput;
            
            if (historyIndex < history.length - 1) {
                setHistoryIndex(historyIndex + 1);
                return history[historyIndex + 1];
            } else {
                setHistoryIndex(-1);
                return '';
            }
        }

        return currentInput;
    };

    return {
        history,
        historyIndex,
        addToHistory,
        navigateHistory
    };
};