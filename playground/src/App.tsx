import React from 'react'
import DevConsole from '../../src'

function App() {
  React.useEffect(() => {
    console.log('App mounted');
    console.error('Test error message');
    console.warn('Test warning message');
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dev Console Playground</h1>
      <DevConsole modules={[]} />
      <div className="mt-4 space-x-2">
        <button 
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => console.log('Button clicked:', new Date().toISOString())}
        >
          Log Something
        </button>
        <button 
          className="bg-red-500 text-white px-4 py-2"
          onClick={() => console.error('Error occurred:', new Error('Test error'))}
        >
          Trigger Error
        </button>
        <button 
          className="bg-yellow-500 text-white px-4 py-2"
          onClick={() => console.warn('Warning:', { data: 'test warning' })}
        >
          Show Warning
        </button>
      </div>
    </div>
  )
}

export default App