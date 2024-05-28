import { useEffect, useState } from 'react';
import "./App.css"

function App() {
  const [todoList, setTodoList] = useState([])
  const [inputTxt, setInputTxt] = useState("")
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setTodoList(data)
      }).catch(e => {
        console.error(e);
      })
  }, [])

  const debouce = (callback, query) => {
    return function (...args) {
      setTimeout(() => {
        console.log(query);
      }, 2000);
    }
  }


  const handleSearch = (e) => {
    let str = e.target.value
    debouce(str);
    setSearchStr(str)
  }

  const handleClear = (id) => {
    console.log("Clearing todo with id:", id);
    const removeItem = todoList.filter((todo) => {
      console.log("Comparing:", todo.id, "with", id, "=>", todo.id === id);
      return todo.id !== id;
    });
    console.log("Updated todoList:", removeItem);
    setTodoList(removeItem);
  };

  const handleCompleted = (id) => {
    setTodoList(todoList.map((todo) => todo.id === id ? {
      ...todo,
      completed: !todo.completed
    } : todo));
  }

  const handleAdd = () => {
    const tempData = {
      id: todoList.length,
      title: inputTxt,
      completed: false,
      userId: 1
    }
    setTodoList([tempData, ...todoList])
  }

  return (
    <div className="App">
      <input type='text' value={inputTxt} onChange={(e) => setInputTxt(e.target.value)} />
      <button onClick={handleAdd} >Add</button>
      {/* <input type='text' value={searchStr} onChange={(e) => handleSearch(e)} /> */}
      <ul>
        {todoList.map((todo, i) => <li key={todo.id} onClick={() => handleCompleted(todo.id)} className={`${todo.completed ? "completed" : ""}`}>
         {todo.id}. {todo.title}
          <button onClick={() => handleClear(todo.id)}>Delete</button>
        </li>
        )}
      </ul>
    </div>
  );
}

export default App;
