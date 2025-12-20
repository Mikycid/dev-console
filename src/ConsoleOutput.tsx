import React from 'react';
import { LogEntry } from './Types/LogEntry';

interface ConsoleOutputProps {
  logs: LogEntry[];
  height: number;
  outputRef: React.RefObject<HTMLDivElement>;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  logs,
  height,
  outputRef,
}: ConsoleOutputProps) => {
  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'error':
        return '🔴';
      case 'warn':
        return '🟡';
      case 'info':
        return '🔵';
      case 'debug':
        return '🟣';
      default:
        return '⚪';
    }
  };

  return (
    <div
      ref={outputRef}
      className="output overflow-y-auto flex-grow border-b border-gray-700 p-3"
      style={{ height: `${height}px` }}
    >
      {logs.map((log, index) => (
        <div key={index} className="font-mono text-sm">
          <span className="mr-2">{getLogIcon(log.type)}</span>
          <span className="text-gray-400 mr-2">{log.timestamp.toLocaleTimeString()}</span>
          <span>{log.message}</span>
        </div>
      ))}
    </div>
  );
};
