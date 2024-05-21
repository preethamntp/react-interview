import './App.css';
import { useState } from 'react';
import useTimeout from './useSetTimeout';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  // This function will be called after the specified delay
  const handleOnChange = () => {
    setDebouncedValue(inputValue)
  };

  // Using the useTimeout hook
  useTimeout(handleOnChange, 500, inputValue); // 2000 milliseconds or 2 seconds

  return (
    <div>
      <h2> Add Delay / DeBounce</h2>

      <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <p>{debouncedValue}</p>
    </div>
  );

}

export default App;
