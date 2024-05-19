import React, { useEffect, useState } from 'react'
import "./App.css"

// type Props = {
//   "id": number,
//   "todo": string,
//   "completed": boolean,
//   "userId": number
// }

function App() {


  const [todosData, setTodosData] = useState([])
  const [insertTodo, setInsertTodo] = useState('')

  useEffect(() => {
    fetch("https://dummyjson.com/todos").then((res) => {
      return res.json()
    }).then(data => {
      setTodosData(data.todos)
    }).catch(err => {
      console.error(err);
    })
  }, [])


  const handleCheck = (id) => {
    setTodosData(todosData.map(item => item.id === id ? {
      ...item,
      completed: !item.completed
    } : item
    ))
  }

  const handleAddTodo = () => {

    const newToDo = {
      id: todosData.length+1,
      todo: insertTodo,
      completed: false,
      userId: 27
    }

    setTodosData([newToDo,...todosData])
  
  }

  return (
    <div className="">
      <input type='text' value={insertTodo} onChange={(e) => setInsertTodo(e.target.value)} />
      <button onClick={handleAddTodo}> Add </button>
      {todosData?.map(todo => <ul key={`${todo.userId}${todo.id}`}>
        <li className={todo.completed ? "strike" : ""}>
          <input type='checkbox' checked={todo.completed} onChange={() => handleCheck(todo.id)} />
          {todo.todo}
        </li>
      </ul>)}
    </div>
  );
}

export default App;
