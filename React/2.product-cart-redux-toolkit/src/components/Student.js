import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../features/studentSlice";
import CommonModal from "../components/CommonModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faPen,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function Student() {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.student);

  const [modalData, setModalData] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState({});
  const [modalMode, setModalMode] = useState("add");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    dispatch(fetchStudents());
    setLoadingData(true);
    setTimeout(() => {
      setLoadingData(false);
    }, 2000);
  }, [dispatch]);

  const handleInputChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear field-specific error
  };

  const validateForm = () => {
    const newErrors = {};
    if (!modalData.name.trim()) newErrors.name = "Name is required";
    if (!modalData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!modalData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(modalData.age) || modalData.age <= 0) {
      newErrors.age = "Age must be a positive number";
    }
    return newErrors;
  };

  const openAddModal = () => {
    setModalMode("add");
    setModalData({ name: "", email: "", age: "" });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setModalMode("edit");
    setEditingId(student.id);
    setModalData({
      name: student.name,
      email: student.email,
      age: student.age,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = { ...modalData, age: Number(modalData.age) };

    const action =
      modalMode === "add"
        ? addStudent(data)
        : updateStudent({ ...data, id: editingId });

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(
          `Student ${modalMode === "add" ? "added" : "updated"} successfully`,
          {
            style: {
              backgroundColor: modalMode === "add" ? "#d4edda" : "#d1ecf1",
              color: modalMode === "add" ? "#155724" : "#0c5460",
            },
          }
        );
        setShowModal(false);
        setErrors({});
        dispatch(fetchStudents());
      })
      .catch((err) =>
        toast.error(
          `❌ ${modalMode === "add" ? "Add" : "Update"} failed: ${err}`,
          {
            style: { backgroundColor: "#f8d7da", color: "#721c24" },
          }
        )
      );
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id))
      .unwrap()
      .then(() => {
        toast.warn("Student deleted successfully", {
          style: { backgroundColor: "#fff3cd", color: "#856404" },
        });
        setShowDeleteModal(false);
        dispatch(fetchStudents());
      })
      .catch((err) =>
        toast.error(`❌ Delete failed: ${err}`, {
          style: { backgroundColor: "#f8d7da", color: "#721c24" },
        })
      );
  };

  const openDeleteModal = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Student Management</h2>
      <button className="btn btn-primary mb-4" onClick={openAddModal}>
        <FontAwesomeIcon icon={faPlus} className="me-2" />
        Add Student
      </button>

      {loading || loadingData ? (
        <div className="text-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : students.length === 0 ? (
        <p className="text-muted text-center">No students found.</p>
      ) : (
        <div className="row">
          {students.map((s) => (
            <div className="col-md-4 mb-4" key={s.id}>
              <div className="card product-card p-3">
                <h5 className="card-title text-center fw-bold fs-4">
                  {s.name}
                </h5>
                <p className="card-text mb-1">
                  <strong>Email:</strong> {s.email}
                </p>
                <p className="card-text mb-3">
                  <strong>Age:</strong> {s.age}
                </p>
                <hr />
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => openEditModal(s)}
                  >
                    <FontAwesomeIcon icon={faPen} className="me-2" />
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => openDeleteModal(s.id)}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <CommonModal
        show={showModal}
        title={modalMode === "add" ? "Add Student" : "Edit Student"}
        onClose={() => setShowModal(false)}
        body={
          <>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter name"
                value={modalData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter email"
                value={modalData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                name="age"
                type="number"
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                placeholder="Enter age"
                value={modalData.age}
                onChange={handleInputChange}
              />
              {errors.age && (
                <div className="invalid-feedback">{errors.age}</div>
              )}
            </div>
          </>
        }
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSubmit}>
              <FontAwesomeIcon
                icon={modalMode === "add" ? faPlus : faPen}
                className="me-2"
              />
              {modalMode === "add" ? "Add" : "Update"}
            </button>
          </>
        }
      />

      {/* Delete Confirmation Modal */}
      <CommonModal
        show={showDeleteModal}
        title="Confirm Deletion"
        onClose={() => setShowDeleteModal(false)}
        body={<p>Are you sure you want to delete this student?</p>}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(deletingId)}
            >
              <FontAwesomeIcon icon={faTrash} className="me-2" />
              Delete
            </button>
          </>
        }
      />
    </div>
  );
}

export default Student;
