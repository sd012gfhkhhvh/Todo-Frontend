/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { BASE_URL } from './helper'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [id, setId] = useState("")

  function fetchData() {
    fetch(`${BASE_URL}/todos`).then(async function (response) {
      const jsonData = await response.json()
      setTodos(jsonData)
    })
  }
  useEffect(fetchData, []);

  //edit todos
  const editTodo = (_id, title, description) => {
    console.log("editTodo", title, description);
    setId(_id)
    setTitle(title);
    setDescription(description);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">TODO</h1>
      <div className='flex justify-center'>
        <div className="bg-slate-500 m-4 p-4 rounded-lg md:w-2/3">
          <CreateTodo
            id={id}
            title={title}
            description={description}
          />
          <Todos
            todos={todos}
            editTodo={editTodo}
          />
        </div>
      </div>
    </>
  )
}

export default App
