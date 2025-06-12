import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EmployeeFormModal({ show, onHide, onSave, initialData }) {
  const initialForm = {
    first_name: "",
    last_name: "",
    age: "",
    city: "",
    department: "",
    gender: "Male",
    mobile: "",
  };

  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPreview(null);
      setErrors({});
    } else {
      setForm(initialForm);
      setFile(null);
      setPreview(null);
      setErrors({});
    }
  }, [initialData]);

  useEffect(() => {
    if (!show) {
      setPreview(null);
      setFile(null);
      setErrors({});
    }
  }, [show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(selected.type)) {
        setErrors({ ...errors, profile_image: "Only JPG, PNG, or WEBP files allowed" });
        setFile(null);
        setPreview(null);
        return;
      }

      if (selected.size > maxSize) {
        setErrors({ ...errors, profile_image: "File size must be under 2MB" });
        setFile(null);
        setPreview(null);
        return;
      }

      setErrors({ ...errors, profile_image: null });
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.first_name.trim()) newErrors.first_name = "First name is required";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!form.age || form.age < 18 || form.age > 65) newErrors.age = "Valid age (18–65) is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.department.trim()) newErrors.department = "Department is required";
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Valid 10-digit mobile is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    if (file) data.append("profile_image", file);
    onSave(data);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Edit" : "Add"} Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>

          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 mb-3 d-block"
              style={{
                width: "100%",
                maxWidth: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ) : initialData?.profile_image ? (
            <img
              src={`http://localhost:5000/uploads/${initialData.profile_image}`}
              alt="Preview"
              className="mt-2 mb-3 d-block"
              style={{
                width: "100%",
                maxWidth: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ) : null}
          {errors.profile_image && <small className="text-danger">{errors.profile_image}</small>}

          <Form.Control
            type="text"
            placeholder="First Name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="mb-1"
          />
          {errors.first_name && <small className="text-danger">{errors.first_name}</small>}

          <Form.Control
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="mb-1"
          />
          {errors.last_name && <small className="text-danger">{errors.last_name}</small>}

          <Form.Control
            type="number"
            placeholder="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="mb-1"
          />
          {errors.age && <small className="text-danger">{errors.age}</small>}

          <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="mb-1"
          />
          {errors.city && <small className="text-danger">{errors.city}</small>}

          <Form.Control
            type="text"
            placeholder="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            className="mb-1"
          />
          {errors.department && <small className="text-danger">{errors.department}</small>}

          <Form.Group className="mb-1 mt-2">
            <Form.Check
              inline
              label="Male"
              name="gender"
              type="radio"
              value="Male"
              checked={form.gender === "Male"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Female"
              name="gender"
              type="radio"
              value="Female"
              checked={form.gender === "Female"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Other"
              name="gender"
              type="radio"
              value="Other"
              checked={form.gender === "Other"}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Control
            type="text"
            placeholder="Mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="mb-1"
          />
          {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {initialData ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
