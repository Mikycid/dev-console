export interface Command {
  execute: (args: string[], addOutput: (message: string) => void) => void;
  help: string;
}
