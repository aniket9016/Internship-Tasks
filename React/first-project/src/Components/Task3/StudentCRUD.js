import React from 'react';

class StudentCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            newStudent: { name: '', age: '', email: '' },
            editIndex: -1,
            editStudent: { id: '', name: '', age: '', email: '' }
        };
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents = async () => {
        try {
            const response = await fetch('https://localhost:7248/api/Student');
            const data = await response.json();
            this.setState({ students: data });
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            newStudent: { ...prevState.newStudent, [name]: value }
        }));
    };

    handleEditChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            editStudent: { ...prevState.editStudent, [name]: value }
        }));
    };

    addStudent = async () => {
        const { newStudent } = this.state;
        if (newStudent.name && newStudent.age && newStudent.email) {
            try {
                await fetch('https://localhost:7248/api/Student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newStudent)
                });
                this.setState({ newStudent: { name: '', age: '', email: '' } });
                this.fetchStudents();
            } catch (error) {
                console.error('Error adding student:', error);
            }
        } else {
            alert("Please fill all fields");
        }
    };

    editStudent = (index) => {
        this.setState({
            editIndex: index,
            editStudent: { ...this.state.students[index] }
        });
    };

    saveEdit = async () => {
        const { editStudent } = this.state;
        try {
            await fetch(`https://localhost:7248/api/Student/${editStudent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editStudent)
            });
            this.setState({ editIndex: -1, editStudent: { id: '', name: '', age: '', email: '' } });
            this.fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    cancelEdit = () => {
        this.setState({ editIndex: -1, editStudent: { id: '', name: '', age: '', email: '' } });
    };

    deleteStudent = async (id) => {
        try {
            await fetch(`https://localhost:7248/api/Student/${id}`, {
                method: 'DELETE'
            });
            this.fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    renderStudents = () => {
        return this.state.students.map((student, index) => (
            <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                {this.state.editIndex === index ? (
                    <div className="d-flex w-100 gap-2">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={this.state.editStudent.name}
                            onChange={this.handleEditChange}
                        />
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            value={this.state.editStudent.age}
                            onChange={this.handleEditChange}
                        />
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={this.state.editStudent.email}
                            onChange={this.handleEditChange}
                        />
                        <button className="btn btn-success btn-sm" onClick={this.saveEdit}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={this.cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <div className="d-flex flex-column">
                            <span><strong>Name:</strong> {student.name}</span>
                            <span><strong>Age:</strong> {student.age}</span>
                            <span><strong>Email:</strong> {student.email}</span>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-sm me-2" onClick={() => this.editStudent(index)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => this.deleteStudent(student.id)}>Delete</button>
                        </div>
                    </>
                )}
            </li>
        ));
    };

    render() {
        return (
            <div className="container py-5">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Student CRUD (Class Component)</h2>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={this.state.newStudent.name}
                                onChange={this.handleInputChange}
                                placeholder="Name"
                            />
                            <input
                                type="number"
                                name="age"
                                className="form-control"
                                value={this.state.newStudent.age}
                                onChange={this.handleInputChange}
                                placeholder="Age"
                            />
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={this.state.newStudent.email}
                                onChange={this.handleInputChange}
                                placeholder="Email"
                            />
                            <button className="btn btn-primary" onClick={this.addStudent}>Add</button>
                        </div>
                        <ul className="list-group">
                            {this.renderStudents()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentCRUD;
