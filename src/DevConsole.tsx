import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { executeCommand, initializeModules } from './Modules/commandRegistry';
import { ConsoleHeader } from './ConsoleHeader';
import { ConsoleOutput } from './ConsoleOutput';
import { ConsoleInput } from './ConsoleInput';
import { ResizeHandle } from './ResizeHandle';
import { LogLevel } from './Types/LogLevel';
import { ConsoleControls } from './ConsoleControls';
import { useConsoleHistory } from './useConsoleHistory';
import { useConsoleDrag } from './useConsoleDrag';
import { useConsoleResize } from './useConsoleResize';
import { useConsoleMinimize } from './useConsoleMinimize';
import { Module } from './Interfaces/Module';

interface DevConsoleProps {
    modules?: Module[];
    disableMove?: boolean;
    disableResize?: boolean;
    disableMinimize?: boolean;
    defaultLogLevel?: LogLevel;
    showLogControls?: boolean;
    injectTailwind?: boolean;
}

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

export const DevConsole: React.FC<DevConsoleProps> = ({
    modules = [],
    disableMove = false,
    disableResize = false,
    disableMinimize = false,
    defaultLogLevel = LogLevel.INFO,
    showLogControls = true,
    injectTailwind = true
}) => {
    const consoleRef = useRef<HTMLDivElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);

    const [allLogs, setAllLogs] = useState<LogEntry[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
    const [minimumLogLevel, setMinimumLogLevel] = useState<LogLevel>(defaultLogLevel);
    const [enabledLevels, setEnabledLevels] = useState<Record<LogLevel, boolean>>({
        [LogLevel.DEBUG]: true,
        [LogLevel.INFO]: true,
        [LogLevel.WARN]: true,
        [LogLevel.ERROR]: true
    });

    const resize = useConsoleResize(disableResize);
    const drag = useConsoleDrag(consoleRef, disableMove);
    const { history, addToHistory, navigateHistory } = useConsoleHistory();
    const minimize = useConsoleMinimize({
        position: resize.position,
        setPosition: resize.setPosition,
        size: resize.size,
        disabled: disableMinimize
    });

    useEffect(() => {
        if (!document.getElementById('tailwind-cdn') && injectTailwind) {
            const script = document.createElement('script');
            script.src = 'https://cdn.tailwindcss.com';
            script.id = 'tailwind-cdn';
            document.head.appendChild(script);
        }
    }, []);

    useEffect(() => {
        initializeModules(modules);
    }, [modules]);

    useEffect(() => {
        const filtered = allLogs.filter(log => {
            const logLevel = LOG_TYPE_TO_LEVEL[log.type];
            return logLevel >= minimumLogLevel && enabledLevels[logLevel];
        });
        setFilteredLogs(filtered);
    }, [allLogs, minimumLogLevel, enabledLevels]);

    useEffect(() => {
        const originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info,
            debug: console.debug,
        };

        const interceptConsole = (type: LogType) => {
            console[type] = (...args: any[]) => {
                originalConsole[type](...args);

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

        return () => {
            Object.entries(originalConsole).forEach(([key, value]) => {
                console[key as LogType] = value;
            });
        };
    }, []);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [filteredLogs]);

    useEffect(() => {
        if (resize.isResizing) {
            document.body.style.userSelect = 'none';
            document.body.style.cursor = resize.resizeDirection?.includes('e') ? 'e-resize' : 
                                       resize.resizeDirection?.includes('w') ? 'w-resize' :
                                       resize.resizeDirection?.includes('s') ? 's-resize' :
                                       resize.resizeDirection?.includes('n') ? 'n-resize' : 'se-resize';
        } else {
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        }

        return () => {
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
    }, [resize.isResizing, resize.resizeDirection]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (drag.isDragging && !drag.isMoveLocked && !disableMove) {
                drag.handleDrag(e, resize.setPosition);
            }
            if (resize.isResizing && !disableResize) {
                resize.handleResize(e);
            }
        };

        const handleMouseUp = () => {
            drag.stopDrag();
            resize.stopResize();
        };

        if (drag.isDragging || resize.isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [drag.isDragging, resize.isResizing, drag.isMoveLocked]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
        setIsAutocompleteVisible(event.target.value.startsWith('/'));
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape' && isAutocompleteVisible) {
            setIsAutocompleteVisible(false);
            return;
        }

        if (!isAutocompleteVisible && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
            event.preventDefault();
            const direction = event.key === 'ArrowUp' ? 'up' : 'down';
            const newInput = navigateHistory(direction, input);
            setInput(newInput);
            return;
        }

        if (event.key === 'Enter' && input.trim()) {
            const trimmedInput = input.trim();
            addToHistory(trimmedInput);
            setInput('');
            setIsAutocompleteVisible(false);
            
            if (trimmedInput === 'clear') {
                setAllLogs([]);
                return;
            }
            
            const commandLog: LogEntry = {
                type: 'log',
                message: `> ${trimmedInput}`,
                timestamp: new Date(),
                level: LogLevel.INFO
            };

            setAllLogs(prev => [...prev, commandLog]);
            
            executeCommand(trimmedInput, (msg: string) => {
                setAllLogs(prev => [...prev, {
                    type: 'log',
                    message: msg,
                    timestamp: new Date(),
                    level: LogLevel.INFO
                }]);
            });
        }
    };

    const handleAutocompleteSelect = (suggestion: string) => {
        const parts = input.split('/');
        setInput(parts.length <= 2 ? `/${suggestion}/` : parts.slice(0, -1).concat(suggestion).join('/'));
    };

    const containerHeight = resize.size.height - (showLogControls ? 144 : 108);

    return (
        <div 
            ref={consoleRef}
            className="fixed flex flex-col border border-gray-700 console-container z-50"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${resize.size.width}px`,
                height: `${minimize.effectiveHeight}px`,
                transform: `translate3d(${resize.position.left}px, ${resize.position.top}px, 0)`,
                willChange: 'transform',
                transition: drag.isDragging || resize.isResizing ? 
                    'none' : 
                    'transform 0.3s ease, height 0.3s ease',
            }}
        >
            {!disableResize && !minimize.isMinimized && (
                <ResizeHandle 
                    onResizeStart={resize.startResize}
                    disabled={disableResize}
                />
            )}
            
            <ConsoleHeader
                onToggleMove={() => drag.setIsMoveLocked(!drag.isMoveLocked)}
                isMoveLocked={drag.isMoveLocked}
                disableMove={disableMove}
                disableMinimize={disableMinimize}
                onMouseDown={drag.startDrag}
                isDragging={drag.isDragging}
                isMinimized={minimize.isMinimized}
                onToggleMinimize={minimize.handleToggleMinimize}
                onClear={() => setAllLogs([])}  // Add this line
            />


            {!minimize.isMinimized && (
                <>
                    {showLogControls && (
                        <ConsoleControls
                            minimumLogLevel={minimumLogLevel}
                            onLogLevelChange={setMinimumLogLevel}
                            enabledLevels={enabledLevels}
                            onToggleLevel={(level: LogLevel) => setEnabledLevels(prev => ({
                                ...prev,
                                [level]: !prev[level]
                            }))}
                        />
                    )}

                    <div className="flex flex-col bg-gray-900 text-white flex-grow overflow-hidden">
                        <ConsoleOutput
                            logs={filteredLogs}
                            height={containerHeight}
                            outputRef={outputRef}
                        />
                        {modules.length > 0 && 
                        <ConsoleInput
                            input={input}
                            isFocused={isFocused}
                            inputRef={inputRef}
                            modules={modules}
                            position={resize.position}
                            isAutocompleteVisible={isAutocompleteVisible}
                            onInputChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            onAutocompleteSelect={handleAutocompleteSelect}
                            onAutocompleteEscape={() => setIsAutocompleteVisible(false)}
                        />}
                    </div>
                </>
            )}
        </div>
    );
};

export default DevConsole;