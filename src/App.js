import { useEffect, useRef, useState } from 'react';
import './App.css';
import Stepper from './Stepper';

const componentList = [
  <div>Component 1</div>,
  <div>Component 2</div>,
  <div>Component 3</div>,
  <div>Component 4</div>,
  <div>Component 5</div>,
]

function App() {

  return (
    <div className="App">
      <h2>React Stepper</h2>
      <Stepper componentList={componentList}></Stepper>
    </div>
  );
}

export default App;
