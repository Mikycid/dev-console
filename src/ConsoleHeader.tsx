import React from 'react';
interface ConsoleHeaderProps {
    onToggleMove: () => void;
    isMoveLocked: boolean;
    disableMove?: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
    isDragging: boolean;
}

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
    onToggleMove,
    isMoveLocked,
    disableMove,
    onMouseDown,
    isDragging
}) => (
    <div 
        className="flex items-center justify-between bg-gray-800 px-3 py-2 border-b border-gray-700 select-none"
        onMouseDown={onMouseDown}
        style={{
            cursor: isMoveLocked || disableMove ? 'default' : isDragging ? 'grabbing' : 'grab'
        }}
    >
        <span className="text-white text-sm font-medium">Developer Console</span>
        <div className="flex items-center space-x-2">
            {!disableMove && (
                <button
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    onClick={onToggleMove}
                    title={isMoveLocked ? "Unlock movement" : "Lock movement"}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        className="fill-current text-white"
                    >
                        {isMoveLocked ? (
                            <path d="M12 1C8.676 1 6 3.676 6 7v3H4v12h16V10h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v3H8V7c0-2.276 1.724-4 4-4z" />
                        ) : (
                            <path d="M12 1C8.676 1 6 3.676 6 7v1h2V7c0-2.276 1.724-4 4-4s4 1.724 4 4v3H4v12h16V10h-2V7c0-3.324-2.676-6-6-6z" />
                        )}
                    </svg>
                </button>
            )}
        </div>
    </div>
);