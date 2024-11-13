
export interface Command {
    execute: (args: any[], addOutput: (message: string) => void) => void;
    help: string;
}