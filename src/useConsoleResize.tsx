import React from 'react';
import { useState, useRef, useEffect } from 'react';

interface Size {
    width: number;
    height: number;
}

interface Position {
    top: number;
    left: number;
}

export const useConsoleResize = (disableResize?: boolean) => {
    const [size, setSize] = useState<Size>({ width: 500, height: 300 });
    const [position, setPosition] = useState<Position>(() => {
        if (typeof window !== 'undefined') {
            return {
                top: window.innerHeight - 300 - 20,
                left: window.innerWidth - 500 - 20
            };
        }
        return { top: 0, left: 0 };
    });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);
    
    // Update position when window resizes
    useEffect(() => {
        const handleWindowResize = () => {
            setPosition(prev => ({
                top: window.innerHeight - size.height - 20,
                left: window.innerWidth - size.width - 20
            }));
        };

        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [size.width, size.height]);

    const resizeStartRef = useRef({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        left: 0,
        top: 0
    });

    const handleResize = (e: MouseEvent) => {
        if (!isResizing || !resizeDirection || disableResize) return;
        e.preventDefault();
        const deltaX = e.clientX - resizeStartRef.current.x;
        const deltaY = e.clientY - resizeStartRef.current.y;
        const newSize = { ...size };
        const newPosition = { ...position };

        if (resizeDirection === 'e') {
            newSize.width = Math.max(300, resizeStartRef.current.width + deltaX);
        } else if (resizeDirection === 'w') {
            const possibleWidth = resizeStartRef.current.width - deltaX;
            if (possibleWidth >= 300) {
                newSize.width = possibleWidth;
                newPosition.left = resizeStartRef.current.left + deltaX;
            }
        }

        if (resizeDirection === 's') {
            newSize.height = Math.max(200, resizeStartRef.current.height + deltaY);
        } else if (resizeDirection === 'n') {
            const possibleHeight = resizeStartRef.current.height - deltaY;
            if (possibleHeight >= 200) {
                newSize.height = possibleHeight;
                newPosition.top = resizeStartRef.current.top + deltaY;
            }
        }

        if (resizeDirection === 'se') {
            newSize.width = Math.max(300, resizeStartRef.current.width + deltaX);
            newSize.height = Math.max(200, resizeStartRef.current.height + deltaY);
        }

        setSize(newSize);
        setPosition(newPosition);
    };

    const startResize = (direction: string) => (e: React.MouseEvent) => {
        if (disableResize) return;
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
        const rect = (e.currentTarget as HTMLElement).closest('.console-container')?.getBoundingClientRect();
        if (rect) {
            resizeStartRef.current = {
                x: e.clientX,
                y: e.clientY,
                width: rect.width,
                height: rect.height,
                left: position.left,
                top: position.top
            };
        }
    };

    const stopResize = () => {
        setIsResizing(false);
        setResizeDirection(null);
    };

    return {
        size,
        position,
        isResizing,
        handleResize,
        startResize,
        stopResize,
        setPosition,
        resizeDirection
    };
};