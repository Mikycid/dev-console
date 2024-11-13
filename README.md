# Dev Console

A draggable and resizable developer console component for React applications.

## Installation

```bash
npm install @mikycid/dev-console
```

## Usage

```tsx
import { DevConsole } from '@mikycid/dev-console';

const App = () => {
  return (
    <DevConsole
      modules={[]}
      disableMove={false}
      disableResize={false}
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

## Development

### Prerequisites

- Node.js (>=14.0.0)
- npm (>=7.0.0)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/mikycid/dev-console.git
cd dev-console
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

This will launch a development environment at http://localhost:3000 with hot reloading enabled.

### Development Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Start development server |
| `npm run build` | Build the library for production |
| `npm run clean` | Clean build artifacts |
| `npm test` | Run tests |

### Project Structure

```
dev-console/
├── src/               # Source code
│   ├── components/    # React components
│   ├── hooks/        # Custom hooks
│   ├── interfaces/   # TypeScript interfaces
│   └── types/        # TypeScript types
├── playground/        # Development environment
└── example/          # Usage examples
```

### Building

To build the library for production:

```bash
npm run build
```

This will create a `dist` directory with the compiled library ready for distribution.

## License

MIT