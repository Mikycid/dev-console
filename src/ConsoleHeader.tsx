import React from 'react';

interface ConsoleHeaderProps {
    onToggleMove: () => void;
    isMoveLocked: boolean;
    disableMove?: boolean;
    disableMinimize?: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
    isDragging: boolean;
    isMinimized?: boolean;
    onToggleMinimize: () => void;
    onClear: () => void;  // New prop for clear functionality
}

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
    onToggleMove,
    isMoveLocked,
    disableMove,
    disableMinimize,
    onMouseDown,
    isDragging,
    isMinimized = false,
    onToggleMinimize,
    onClear
}: ConsoleHeaderProps) => (
    <div
        className="flex items-center justify-between bg-gray-800 px-3 py-2 border-b border-gray-700 select-none"
        onMouseDown={onMouseDown}
        style={{
            cursor: isMoveLocked || disableMove ? 'default' : isDragging ? 'grabbing' : 'grab'
        }}
    >
        <span className="text-white text-sm font-medium">Developer Console</span>
        <div className="flex items-center space-x-2">
            <button
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                onClick={onClear}
                title="Clear console"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    className="fill-current text-white"
                >
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
            </button>
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
            {!disableMinimize && (
                <button
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    onClick={onToggleMinimize}
                    title={isMinimized ? "Maximize" : "Minimize"}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        className="fill-current text-white"
                    >
                        {isMinimized ? (
                            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                        ) : (
                            <path d="M19 13H5v-2h14v2z" />
                        )}
                    </svg>
                </button>
            )}
        </div>
    </div>
);