import React, { useState, useEffect } from 'react';

const StudentCRUDFunction = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', age: '', email: '' });

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
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const addStudent = async () => {
    if (form.name && form.age && form.email) {
      try {
        await fetch('https://localhost:7248/api/Student', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.name,
            age: form.age,
            email: form.email
          })
        });
        setForm({ id: '', name: '', age: '', email: '' });
        fetchStudents();
      } catch (error) {
        console.error('Error adding student:', error);
      }
    } else {
      alert("Please fill all fields");
    }
  };

  const openEditModal = (student) => {
    setForm({ ...student });
    const modal = new window.bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  };

  const saveEdit = async () => {
    try {
      await fetch(`https://localhost:7248/api/Student/${form.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      setForm({ id: '', name: '', age: '', email: '' });
      fetchStudents();
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('editModal'));
      modal.hide();
    } catch (error) {
      console.error('Error updating student:', error);
    }
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

  const clearForm = () => {
    setForm({ id: '', name: '', age: '', email: '' });
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
              value={form.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="number"
              name="age"
              className="form-control"
              value={form.age}
              onChange={handleInputChange}
              placeholder="Age"
            />
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <button className="btn btn-primary" onClick={addStudent}>Add</button>
          </div>

          <ul className="list-group">
            {students.map((student) => (
              <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <span><strong>Name:</strong> {student.name}</span>
                  <span><strong>Age:</strong> {student.age}</span>
                  <span><strong>Email:</strong> {student.email}</span>
                </div>
                <div>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => openEditModal(student)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(student.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
        onClick={(e) => {
          if (e.target.id === 'editModal') {
            clearForm();  // clear form when modal backdrop is clicked
          }
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Student</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={clearForm}
              ></button>
            </div>
            <div className="modal-body d-flex flex-column gap-2">
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="number"
                name="age"
                className="form-control"
                value={form.age}
                onChange={handleInputChange}
                placeholder="Age"
              />
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearForm}>Cancel</button>
              <button type="button" className="btn btn-success" onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCRUDFunction;
