/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai"
import { TiTick } from "react-icons/ti"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorNotify } from "../Notify"

function App() {

  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [allTodos, setAllTodos] = useState([])
  const [completedTodo, setCompletedTodo] = useState([])
  const [count, setcount] = useState(1)
  const [tab, setTab] = useState("to_do")

  const handleAddTodos = () => {
    let newTodoItem = {
      id: count,
      title: newTitle,
      description: newDescription
    }

    let updateTodoArray = [...allTodos]
    updateTodoArray.push(newTodoItem)
    setAllTodos(updateTodoArray)
    localStorage.setItem("todoList", JSON.stringify(updateTodoArray))
    setcount(count + 1)
  }

  const handleDelete = (id) => {
    let reducedTodo = [...allTodos]
    let updated = reducedTodo.filter(todo => {
      return todo.id !== id
    })
    localStorage.setItem("todoList", JSON.stringify(updated))
    setAllTodos(updated)
  }


  const completeHandeler = (id) => {
    let Todo = [...allTodos]
    let allCompleted = [...completedTodo]

    let completed = Todo.filter(todo => {
      return todo.id == id
    })

    let afterCompletedUpdated = Todo.filter(todo => {
      return todo.id !== id
    })

    setAllTodos(afterCompletedUpdated)
    localStorage.setItem("todoList", JSON.stringify(afterCompletedUpdated))
    allCompleted.push(completed[0])
    setCompletedTodo(allCompleted)
    localStorage.setItem("completedTodos", JSON.stringify(allCompleted))
  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todoList"))
    if (stored) {
      setAllTodos(stored)
    }
    const completedStored = JSON.parse(localStorage.getItem("completedTodos"))

    console.log("completedStored", completedStored);

    if (completedStored) {
      setCompletedTodo(completedStored)
    }
  }, [])

  const tabHandeler = (arg) => {
    setTab(arg)
  }



  return (
    <>
      <ToastContainer />
      <h1 className='heading'>My Todos</h1>
      <div className='contentContainer'>
        <div>
          <div className='inputWrapper'>
            <div className='labelWithInput'>
              <label htmlFor="">Title</label>
              <input name='title' onChange={(e) => setNewTitle(e.target.value)} value={newTitle} type="text" placeholder='What`s the title of your TO Do?' />
            </div>
            <div className='labelWithInput'>
              <label htmlFor="">Description</label>
              <input name='description' onChange={(e) => setNewDescription(e.target.value)} value={newDescription} type="text" placeholder='What`s the description of your TO Do?' />
            </div>
            <button onClick={() => handleAddTodos()} className='addButton'>Add</button>
          </div>
          <div className='hr'></div>
          <div className='dubbleButton'>
            <button className={`${tab == "to_do" ? `active` : `deactive`} completedButton`} onClick={() => tabHandeler("to_do")}>To Do</button>
            <span
              onClick={() => tabHandeler("complete")}
              className={`${tab == "complete" ? `active` : `deactive`} completedButton`}>Completed</span>
          </div>

          <div className={`${tab === "to_do" ? `block_` : `hideen_`}`}>
            {allTodos.map((todo) => {
              return (
                <div key={todo.id} className='todoView'>
                  <div className='viewContent'>
                    <span className='title'>{todo.title}</span>
                    <span className='description'>{todo.description}</span>
                  </div>
                  <div className='viewAction'>
                    <AiFillDelete onClick={() => handleDelete(todo.id)} className='delete' color='white' size={28} />
                    <TiTick onClick={() => completeHandeler(todo.id)} className='tik' color='green' size={34} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className={`${tab === "complete" ? `block_` : `hideen_`}`}>

            {completedTodo.length >= 1 ?
              <>
                {completedTodo.map((todo) => {
                  return (
                    <div key={todo.id} className='todoView'>
                      <div className='viewContent'>
                        <span className='title'>{todo.title}</span>
                        <span className='description'>{todo.description}</span>
                      </div>
                    </div>
                  )
                })}</>
              :
              <>
                <div className='todoView'>
                  <h1 className='message'>No completed todos</h1>
                </div>

              </>}

          </div>



        </div>

      </div>

    </>
  )
}

export default App

