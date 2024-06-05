import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import CatList from './CatList';

function App() {

  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState([]);

  const getTodos = async () => {

    try {
      return new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json())
          .then(data => {
            console.log(data);
            resolve(data)
          })
          .catch(e => reject(e))
      });
    } catch (error) {
      throw error
    }
  }


  useEffect(() => {

    getTodos().then(data => {
      setTodos(data)
    })


  }, [])

  const handleDelete = (id) => {

    setTodos(todos.filter(todo => todo.id !== id))

  }
  const handleComplete = (id) => {

    setTodos(todos.map(todo =>
      todo.id === id ? {
        ...todo,
        completed: !todo.completed
      } : todo))

  }
  const handleAddTodo = (id) => {

    const addTodos = {
      id: todos.length + 1,
      completed: false,
      title: newTodos,
      userId: 1
    }

    setTodos([addTodos, ...todos])

  }


  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo()
    }
  }

  return (
    <div className="App">
      <CatList />
    </div>
  );
}

export default App;
