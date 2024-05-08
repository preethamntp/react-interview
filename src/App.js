import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);


  useEffect(() => {
    if (running) {
      timerRef.current = setTimeout(() => {
        setCount(prev => prev + 1)
      }, 1000);
    } return () => clearTimeout(timerRef.current)
  }, [count, running])


  const handleClick = () => {
    // using setTimeout in useEffect
    setRunning((prev) => !prev);
    if (running) {
      clearInterval(timerRef.current)
    }

  }
  /**  const handleClick = () => {
      setRunning((prev) => !prev);
      if (running) {
        clearInterval(timerRef.current)
      } else {
        timerRef.current = setInterval(() => {
          setCount((prev) => prev + 1)
        }, 1000);
      }
    }
   */

  return (
    <div className="App">
      <h2>Per second timer {count}</h2>
      <button onClick={handleClick}>
        {running ? "Stop" : "Start"}
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default App;
