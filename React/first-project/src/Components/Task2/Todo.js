import React from 'react';
import { FaTrashAlt, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTitle: '',
            newDescription: '',
            tasks: []
        };
    }

    handleTitleChange = (e) => {
        this.setState({ newTitle: e.target.value });
    };

    handleDescriptionChange = (e) => {
        this.setState({ newDescription: e.target.value });
    };

    addTask = () => {
        const { newTitle, newDescription, tasks } = this.state;
        if (newTitle.trim() === '' && newDescription.trim() === '') {
            alert("Please enter at least a title or description.");
            return;
        }
        this.setState({
            tasks: [...tasks, {
                title: newTitle.trim(),
                description: newDescription.trim(),
                completed: false
            }],
            newTitle: '',
            newDescription: ''
        });
    };

    toggleComplete = (index) => {
        const updatedTasks = [...this.state.tasks];
        updatedTasks[index] = {
            ...updatedTasks[index],
            completed: !updatedTasks[index].completed
        };
        this.setState({ tasks: updatedTasks });
    };

    removeTask = (indexToRemove) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.filter((_, index) => index !== indexToRemove)
        }));
    };

    render() {
        const { newTitle, newDescription, tasks } = this.state;

        return (
            <div className="container mt-5" style={{ maxWidth: '600px' }}>
                <div className="card shadow p-4">
                    <h3 className="text-center mb-4">Todo List</h3>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Task Title"
                            value={newTitle}
                            onChange={this.handleTitleChange}
                        />
                        <textarea
                            className="form-control mb-2"
                            placeholder="Task Description"
                            rows="3"
                            value={newDescription}
                            onChange={this.handleDescriptionChange}
                        />
                        <button className="btn btn-primary w-100" onClick={this.addTask}>
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
                                className={`list-group-item d-flex align-items-center justify-content-between ${task.completed ? 'list-group-item-light' : ''
                                    }`}
                            >
                                <div
                                    role="button"
                                    onClick={() => this.toggleComplete(index)}
                                    className="me-3"
                                >
                                    {task.completed ? (
                                        <FaCheckCircle color="green" size={20} />
                                    ) : (
                                        <FaRegCircle size={20} />
                                    )}
                                </div>
                                <div className="flex-grow-1">
                                    <h5
                                        className={`mb-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''
                                            }`}
                                    >
                                        {task.title || 'Untitled Task'}
                                    </h5>
                                    <small
                                        className={`${task.completed ? 'text-decoration-line-through text-muted' : 'text-muted'}`}
                                    >
                                        {task.description || 'No description'}
                                    </small>
                                </div>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => this.removeTask(index)}
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
}

export default Todo;