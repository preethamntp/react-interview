import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [count, setCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (count >= 1000 || isPaused) { return };
    let counter = setInterval(() => {
      setCount(prevCount => prevCount + 1)
    }, 1)
    return () => clearInterval(counter)
  }, [count, isPaused])


  const resetHandler = () => {
    setCount(0)
  }

  const handlePause = () => {
    setIsPaused(prevState => !prevState);

  }

  return (
    <div className="App">
      Counter: {count} <br />
      <button onClick={resetHandler}>Reset</button>
      <button onClick={handlePause}>{isPaused ? "Resume" : "Pause"}</button>
    </div>
  );
}

export default App;
