import React from 'react'
import Todo from '../Components/Todo'
const Todos = (props) => {
  let myStyle = {
    minHeight: "70vh",
    margin: '40px auto'
  }
  return (
    <div className='container my-3' style={myStyle}>
      <h3 className='my-3'>Todos List</h3>
      {props.todos.length === 0 ? "No todos to display" :
        props.todos.map((todo) => {
          return (
            <Todo todo={todo} key={todo.sno} onDelete={props.onDelete} />
          )
        })}
    </div>
  )
}

export default Todos