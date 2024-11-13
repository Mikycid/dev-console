import React from 'react';

interface ResizeHandleProps {
    onResizeStart: (direction: string) => (e: React.MouseEvent) => void;
    disabled?: boolean;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ onResizeStart, disabled }) => {
    if (disabled) return null;
    
    return (
        <>
            <div
                className="absolute top-0 left-0 w-full h-2 hover:cursor-n-resize group"
                style={{ transform: 'translateY(-50%)' }}
                onMouseDown={onResizeStart('n')}
            >
                <div className="w-full h-full group-hover:bg-green-500/20" />
            </div>
            <div
                className="absolute bottom-0 left-0 w-full h-2 hover:cursor-s-resize group"
                style={{ transform: 'translateY(50%)' }}
                onMouseDown={onResizeStart('s')}
            >
                <div className="w-full h-full group-hover:bg-green-500/20" />
            </div>
            <div
                className="absolute top-0 left-0 w-2 h-full hover:cursor-w-resize group"
                style={{ transform: 'translateX(-50%)' }}
                onMouseDown={onResizeStart('w')}
            >
                <div className="w-full h-full group-hover:bg-green-500/20" />
            </div>
            <div
                className="absolute top-0 right-0 w-2 h-full hover:cursor-e-resize group"
                style={{ transform: 'translateX(50%)' }}
                onMouseDown={onResizeStart('e')}
            >
                <div className="w-full h-full group-hover:bg-green-500/20" />
            </div>
            <div
                className="absolute bottom-0 right-0 w-3 h-3 hover:cursor-se-resize group"
                style={{ transform: 'translate(50%, 50%)' }}
                onMouseDown={onResizeStart('se')}
            >
                <div className="w-full h-full group-hover:bg-green-500/20" />
            </div>
        </>
    );
};