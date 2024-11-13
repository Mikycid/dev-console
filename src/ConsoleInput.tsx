import React from 'react';
import { Module } from './Interfaces/Module';
import { Autocomplete } from './Autocomplete';

interface ConsoleInputProps {
    input: string;
    isFocused: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    modules: Module[];
    position: { top: number; left: number };
    isAutocompleteVisible: boolean;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    onAutocompleteSelect: (suggestion: string) => void;
    onAutocompleteEscape: () => void;
}

export const ConsoleInput: React.FC<ConsoleInputProps> = ({
    input,
    isFocused,
    inputRef,
    modules,
    position,
    isAutocompleteVisible,
    onInputChange,
    onKeyDown,
    onFocus,
    onBlur,
    onAutocompleteSelect,
    onAutocompleteEscape
}) => (
    <div className="input flex items-center p-3">
        <span className="mr-2">&gt;</span>
        <input
            ref={inputRef}
            className={`w-full bg-gray-800 text-white outline-none p-2 border
                ${isFocused ? 'border-green-500' : 'border-gray-700'} 
                hover:border-green-400`}
            value={input}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Type command..."
        />
        <Autocomplete
            input={input}
            modules={modules}
            onSelect={onAutocompleteSelect}
            onEscape={onAutocompleteEscape}
            position={position}
            inputRef={inputRef}
            isVisible={isAutocompleteVisible && input.startsWith('/')}
        />
    </div>
);