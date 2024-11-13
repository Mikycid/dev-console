import { LogLevel } from './LogLevel';
import { LogType } from './LogType';

export interface LogEntry {
    type: LogType;
    message: string;
    timestamp: Date;
    level: LogLevel;
}
