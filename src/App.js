import { useState } from 'react';
import './App.css';
import useCustomMemo from './customUseMemo';


const add = (a, b) => {
  console.log('add');
  return a + b
};

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(10);

  const expensiveCalc = useCustomMemo(() => add(count), [count])
  console.log('re-render');

  return (
    <div className="App">
      {count} = {expensiveCalc}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount2(count2 - 1)}>Decrement</button>

    </div>
  );
}

export default App;
