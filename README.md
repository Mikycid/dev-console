# Dev Console

A draggable and resizable developer console component for React applications.

## Installation

```bash
npm install @mikycid/dev-console
```

## Usage

```tsx
import { DevConsole } from '@mikecodeurdev/dev-console';

const App = () => {
  return (
    <DevConsole
      modules={[]}  // Your console modules
      disableMove={false}  // Optional
      disableResize={false}  // Optional
    />
  );
};
```

## Features

- 🔄 Draggable console window
- ↔️ Resizable console window
- 🔒 Lock/unlock movement and resize
- 📝 Command history
- 🎯 Command autocomplete
- 📊 Console log interceptor
- 🎨 Customizable styling

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modules | Module[] | [] | Array of command modules |
| disableMove | boolean | false | Disable console movement |
| disableResize | boolean | false | Disable console resizing |

## License

MIT