# Dev Console

A draggable and resizable developer console component for React applications.

## Installation
```bash
npm install @mikycid/dev-console
```

## Usage
```tsx
import { DevConsole } from '@mikycid/dev-console';
import { LogLevel } from '@mikycid/dev-console/types';

const App = () => {
  return (
    <DevConsole
      modules={[]}
      disableMove={false}
      disableResize={false}
      defaultLogLevel={LogLevel.INFO}
      showLogControls={true}
      injectTailwind={false}
    />
  );
};
```

If you use tailwind in your project, add this to your tailwind.config.js:

```js
{
  content: [
      './src/renderer/**/*.{js,jsx,ts,tsx,ejs}',
      './node_modules/@mikycid/dev-console/**/*.{js,jsx,ts,tsx,ejs}',
    ]
}
```

And set the injectTailwind to "true" in the component (defaults to false).


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
| `modules` | `Module[]` | `[]` | Array of command modules |
| `disableMove` | `boolean` | `false` | Disable console movement |
| `disableResize` | `boolean` | `false` | Disable console resizing |
| `defaultLogLevel` | `LogLevel` | `LogLevel.INFO` | Default log level for filtering console output |
| `showLogControls` | `boolean` | `true` | Show/hide log level control buttons |


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
│   ├── Interfaces/   # TypeScript interfaces
│   ├── Types/        # TypeScript types
│   ├── Modules/      # To be implemented
│   ├── tests/   # TypeScript interfaces
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
