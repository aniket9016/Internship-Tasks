import React, { useState, useEffect } from 'react';

const StudentCRUDFunction = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', age: '', email: '' });
    const [editIndex, setEditIndex] = useState(-1);
    const [editStudent, setEditStudent] = useState({ id: '', name: '', age: '', email: '' });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('https://localhost:7248/api/Student');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditStudent((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addStudent = async () => {
        if (newStudent.name && newStudent.age && newStudent.email) {
            try {
                await fetch('https://localhost:7248/api/Student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newStudent)
                });
                setNewStudent({ name: '', age: '', email: '' });
                fetchStudents();
            } catch (error) {
                console.error('Error adding student:', error);
            }
        } else {
            alert("Please fill all fields");
        }
    };

    const editStudentHandler = (index) => {
        setEditIndex(index);
        setEditStudent({ ...students[index] });
    };

    const saveEdit = async () => {
        try {
            await fetch(`https://localhost:7248/api/Student/${editStudent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editStudent)
            });
            setEditIndex(-1);
            setEditStudent({ id: '', name: '', age: '', email: '' });
            fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const cancelEdit = () => {
        setEditIndex(-1);
        setEditStudent({ id: '', name: '', age: '', email: '' });
    };

    const deleteStudent = async (id) => {
        try {
            await fetch(`https://localhost:7248/api/Student/${id}`, {
                method: 'DELETE'
            });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const renderStudents = () => {
        return students.map((student, index) => (
            <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                {editIndex === index ? (
                    <div className="d-flex w-100 gap-2">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={editStudent.name}
                            onChange={handleEditChange}
                        />
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            value={editStudent.age}
                            onChange={handleEditChange}
                        />
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={editStudent.email}
                            onChange={handleEditChange}
                        />
                        <button className="btn btn-success btn-sm" onClick={saveEdit}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <div className="d-flex flex-column">
                            <span><strong>Name:</strong> {student.name}</span>
                            <span><strong>Age:</strong> {student.age}</span>
                            <span><strong>Email:</strong> {student.email}</span>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-sm me-2" onClick={() => editStudentHandler(index)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(student.id)}>Delete</button>
                        </div>
                    </>
                )}
            </li>
        ));
    };

    return (
        <div className="container py-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Student CRUD (Functional Component)</h2>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={newStudent.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            value={newStudent.age}
                            onChange={handleInputChange}
                            placeholder="Age"
                        />
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={newStudent.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        <button className="btn btn-primary" onClick={addStudent}>Add</button>
                    </div>
                    <ul className="list-group">
                        {renderStudents()}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StudentCRUDFunction;