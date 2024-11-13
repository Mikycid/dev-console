import React from 'react';
import { LogLevel } from './Types/LogLevel';

interface ConsoleControlsProps {
    minimumLogLevel: LogLevel;
    onLogLevelChange: (level: LogLevel) => void;
    enabledLevels: Record<LogLevel, boolean>;
    onToggleLevel: (level: LogLevel) => void;
}

const LOG_LEVELS = Object.values(LogLevel).filter(
    (v): v is LogLevel => typeof v === 'number'
);

export const ConsoleControls: React.FC<ConsoleControlsProps> = ({
    minimumLogLevel,
    onLogLevelChange,
    enabledLevels,
    onToggleLevel
}: ConsoleControlsProps) => {
    return (
        <div className="flex items-center space-x-2 px-2 py-1 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center space-x-2">
                {LOG_LEVELS.map((level) => (
                    <button
                        key={level}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                            enabledLevels[level] 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                        }`}
                        onClick={() => onToggleLevel(level)}
                    >
                        {LogLevel[level].toLowerCase()}
                    </button>
                ))}
            </div>
            <div className="flex items-center space-x-2 ml-4">
                <span className="text-xs text-gray-400">Min Level:</span>
                <select
                    value={minimumLogLevel}
                    onChange={(e) => onLogLevelChange(Number(e.target.value) as LogLevel)}
                    className="bg-gray-700 text-xs px-1 py-0.5 rounded border border-gray-600 text-white"
                >
                    {LOG_LEVELS.map((level) => (
                        <option key={level} value={level}>
                            {LogLevel[level]}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};