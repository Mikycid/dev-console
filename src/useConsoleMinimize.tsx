import { useState, useEffect } from 'react';

interface Position {
    top: number;
    left: number;
}

interface ConsoleSize {
    width: number;
    height: number;
}

interface UseConsoleMinimizeProps {
    position: Position;
    setPosition: (position: Position) => void;
    size: ConsoleSize;
    disabled?: boolean;
}

interface UseConsoleMinimizeReturn {
    isMinimized: boolean;
    handleToggleMinimize: () => void;
    minimizedHeight: number;
    effectiveHeight: number;
}


export const useConsoleMinimize = ({
    position,
    setPosition,
    size,
    disabled = false
}: UseConsoleMinimizeProps): UseConsoleMinimizeReturn => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [previousPosition, setPreviousPosition] = useState<Position | null>(null);
    const [effectiveHeight, setEffectiveHeight] = useState(size.height);
    const minimizedHeight = 40;

    useEffect(() => {
        if (!isMinimized) {
            const availableSpace = window.innerHeight - position.top;
            if (size.height > availableSpace) {
                setEffectiveHeight(availableSpace);
            } else {
                setEffectiveHeight(size.height);
            }
        } else {
            setEffectiveHeight(minimizedHeight);
        }
    }, [isMinimized, position.top, size.height]);

    useEffect(() => {
        const handleResize = () => {
            if (isMinimized) {
                setPosition({
                    ...position,
                    top: window.innerHeight - minimizedHeight
                });
            } else {
                const availableSpace = window.innerHeight - position.top;
                setEffectiveHeight(Math.min(size.height, availableSpace));
            }
        };

        if (!disabled) {
            window.addEventListener('resize', handleResize);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [isMinimized, position, size.height, setPosition, disabled]);

    const handleToggleMinimize = () => {
        if (disabled) return;

        setIsMinimized(prev => {
            if (!prev) {
                setPreviousPosition(position);
                setPosition({
                    ...position,
                    top: window.innerHeight - minimizedHeight
                });
                setEffectiveHeight(minimizedHeight);
            } else {
                const restoredPosition = previousPosition || position;
                setPosition(restoredPosition);
                
                const availableSpace = window.innerHeight - restoredPosition.top;
                setEffectiveHeight(Math.min(size.height, availableSpace));
            }
            return !prev;
        });
    };

    return {
        isMinimized: disabled ? false : isMinimized,
        handleToggleMinimize,
        minimizedHeight,
        effectiveHeight
    };
};