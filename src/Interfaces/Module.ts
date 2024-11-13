import { Command } from "./Command";

export interface Module {
    commands: Record<string, Command>;
    name: string;
    help: string;
}