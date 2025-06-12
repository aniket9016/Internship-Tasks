import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api";
import EmployeeFormModal from "../components/EmployeeFormModal";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";

export default function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (err) {
      toast.error("Error fetching employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (selectedEmp) {
        await updateEmployee(selectedEmp.id, formData);
        toast.success("Employee updated!");
      } else {
        await addEmployee(formData);
        toast.success("Employee added!");
      }
      setShowForm(false);
      setSelectedEmp(null);
      fetchEmployees();
    } catch (err) {
      toast.error("Save failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(deleteId);
      toast.success("Employee deleted!");
      setShowDelete(false);
      setDeleteId(null);
      fetchEmployees();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Employee Manager (PWA)</h2>
      <div className="text-center mb-4">
        <Button onClick={() => setShowForm(true)}>+ Add Employee</Button>
      </div>
      <Row>
        {employees.map(emp => (
          <Col key={emp.id} md={3}>
            <Card className="mb-3">
              <Card.Img
                variant="top"
                src={emp.image_url || "https://via.placeholder.com/150"}
                height="150"
                style={{ objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title>{emp.first_name} {emp.last_name}</Card.Title>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => navigate(`/employee/${emp.id}`)}
                >
                  View
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setDeleteId(emp.id);
                    setShowDelete(true);
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <EmployeeFormModal
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setSelectedEmp(null);
        }}
        onSave={handleSave}
        initialData={selectedEmp}
      />

      <ConfirmModal
        show={showDelete}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDelete(false);
          setDeleteId(null);
        }}
      />
    </Container>
  );
}
