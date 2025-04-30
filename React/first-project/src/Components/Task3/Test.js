import React, { useState, useEffect } from 'react';

function Test() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', age: '', email: '' });
  const [emailError, setEmailError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7248/api/Student')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Error fetching students:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const emailExists = students.some(
        (s) => s.email === value && s.id !== editId
      );
      setEmailError(emailExists ? 'Email already exists' : '');
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.age || !formData.email) {
      alert('Please fill all fields.');
      return;
    }

    if (emailError) return;

    if (editMode) {
      fetch(`https://localhost:7248/api/Student/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, ...formData }),
      })
        .then(() => {
          setStudents((prev) =>
            prev.map((s) => (s.id === editId ? { id: editId, ...formData } : s))
          );
          resetForm();
        })
        .catch((err) => {
          console.error('Error updating student:', err);
          alert('Update failed');
        });
    } else {
      fetch('https://localhost:7248/api/Student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((newStudent) => {
          setStudents([...students, newStudent]);
          resetForm();
        })
        .catch((err) => {
          console.error('Error adding student:', err);
          alert('Add failed');
        });
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    fetch(`https://localhost:7248/api/Student/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setStudents((prev) => prev.filter((s) => s.id !== id));
      })
      .catch((err) => {
        console.error('Error deleting student:', err);
        alert('Delete failed');
      });
  };

  const resetForm = () => {
    setFormData({ name: '', age: '', email: '' });
    setEmailError('');
    setEditMode(false);
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm rounded">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Student Records</h2>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Add Student
            </button>
          </div>

          <div className="row">
            {students.map((student) => (
              <div key={student.id} className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{student.name}</h5>
                    <p className="card-text"><strong>Age:</strong> {student.age}</p>
                    <p className="card-text"><strong>Email:</strong> {student.email}</p>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          setEditMode(true);
                          setEditId(student.id);
                          setFormData({
                            name: student.name,
                            age: student.age,
                            email: student.email,
                          });
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {students.length === 0 && (
              <p className="text-center text-muted">No students found.</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? 'Edit Student' : 'Add Student'}
                </h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!!emailError}
                >
                  {editMode ? 'Save Changes' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
