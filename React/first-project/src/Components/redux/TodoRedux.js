import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, toggleComplete } from "./actions/todoActions";
import { FaTrashAlt, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

function TodoRedux() {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const tasks = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (inputTitle.trim() === '' && inputDescription.trim() === '') {
      alert("Please enter at least a title or description.");
      return;
    }

    dispatch(addTodo({
      title: inputTitle.trim(),
      description: inputDescription.trim()
    }));
    setInputTitle('');
    setInputDescription('');
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Todo List with Redux</h3>

        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Task Title"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Task Description"
            rows="3"
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handleAdd}>
            Add Task
          </button>
        </div>

        <ul className="list-group">
          {tasks.length === 0 && (
            <li className="list-group-item text-muted text-center">No tasks yet.</li>
          )}
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`list-group-item d-flex align-items-center justify-content-between ${task.completed ? 'list-group-item-light' : ''}`}
            >
              <div
                role="button"
                onClick={() => dispatch(toggleComplete(index))}
                className="me-3"
              >
                {task.completed ? (
                  <FaCheckCircle color="green" size={20} />
                ) : (
                  <FaRegCircle size={20} />
                )}
              </div>
              <div className="flex-grow-1">
                <h5 className={`mb-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                  {task.title || 'Untitled Task'}
                </h5>
                <small className={`${task.completed ? 'text-decoration-line-through text-muted' : 'text-muted'}`}>
                  {task.description || 'No description'}
                </small>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => dispatch(deleteTodo(index))}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoRedux;
