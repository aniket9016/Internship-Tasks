import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EmployeeFormModal({ show, onHide, onSave, initialData }) {
  const defaultForm = {
    first_name: "",
    last_name: "",
    age: "",
    city: "",
    department: "IT",
    gender: "Male",
    mobile: "",
    profile_image: null,
  };

  const [form, setForm] = useState(defaultForm);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [errors, setErrors] = useState({});
  const firstNameRef = useRef(null);

  useEffect(() => {
    if (show && firstNameRef.current) {
      firstNameRef.current.focus();
    }

    if (initialData) {
      setForm({
        ...defaultForm,
        ...initialData,
        profile_image: null, // New image will override this if selected
      });

      // Show existing image if available
      if (initialData.profile_image_url) {
        setExistingImage(initialData.profile_image_url);
      } else {
        setExistingImage(null);
      }

      setPreview(null);
    } else {
      setForm(defaultForm);
      setPreview(null);
      setExistingImage(null);
    }

    setErrors({});
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profile_image: file }));
      setPreview(URL.createObjectURL(file));
      setExistingImage(null); // Hide old image when new is selected
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required.";
    if (!form.age || form.age < 18 || form.age > 65) newErrors.age = "Age must be 18–65.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.mobile.match(/^[0-9]{10}$/)) newErrors.mobile = "Mobile must be 10 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    for (const key in form) {
      if (form[key] !== null) formData.append(key, form[key]);
    }

    if (initialData?.id) {
      formData.append("id", initialData.id);
    }

    onSave(formData);
    setForm(defaultForm);
    setPreview(null);
    setExistingImage(null);
    setErrors({});
  };

  const handleClose = () => {
    setForm(defaultForm);
    setPreview(null);
    setExistingImage(null);
    setErrors({});
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Edit Employee" : "Add Employee"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="profile_image" className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            {(preview || existingImage) && (
              <img
                src={preview || existingImage}
                alt="Preview"
                className="mt-3"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              ref={firstNameRef}
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              isInvalid={!!errors.first_name}
            />
            <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              isInvalid={!!errors.last_name}
            />
            <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              isInvalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Department</Form.Label>
            <Form.Select name="department" value={form.department} onChange={handleChange}>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Gender</Form.Label>
            <div>
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
            </div>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              isInvalid={!!errors.mobile}
            />
            <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
