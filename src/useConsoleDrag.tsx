import React from 'react';
import { useState, useRef, RefObject } from 'react';

export const useConsoleDrag = (
    consoleRef: RefObject<HTMLDivElement>,
    disableMove?: boolean
) => {
    const [isMoveLocked, setIsMoveLocked] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    const handleDrag = (e: MouseEvent, setPosition: (pos: { top: number; left: number }) => void) => {
        if (!isDragging || isMoveLocked || disableMove) return;

        const newLeft = e.clientX - dragOffset.current.x;
        const newTop = e.clientY - dragOffset.current.y;
        
        const maxLeft = window.innerWidth - (consoleRef.current?.offsetWidth || 0);
        const maxTop = window.innerHeight - (consoleRef.current?.offsetHeight || 0);
        
        const finalLeft = Math.max(0, Math.min(newLeft, maxLeft));
        const finalTop = Math.max(0, Math.min(newTop, maxTop));
        
        setPosition({ left: finalLeft, top: finalTop });
    };

    const startDrag = (e: React.MouseEvent) => {
        if (isMoveLocked || disableMove || !consoleRef.current) return;

        const rect = consoleRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        setIsDragging(true);
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    return {
        isMoveLocked,
        isDragging,
        setIsMoveLocked,
        handleDrag,
        startDrag,
        stopDrag
    };
};
