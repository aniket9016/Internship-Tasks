import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee, addEmployee, updateEmployee } from "../api";
import EmployeeFormModal from "../components/EmployeeFormModal";
import ConfirmModal from "../components/ConfirmModal";
import EmployeeCard from "../components/EmployeeCard";
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
    } catch {
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
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(deleteId);
      toast.success("Employee deleted!");
      setShowDelete(false);
      fetchEmployees();
    } catch {
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
            <EmployeeCard
              emp={emp}
              onView={() => navigate(`/employee/${emp.id}`)}
              onEdit={(data) => {
                setSelectedEmp(data);
                setShowForm(true);
              }}
              onDelete={(id) => {
                setDeleteId(id);
                setShowDelete(true);
              }}
            />
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
        onCancel={() => setShowDelete(false)}
      />
    </Container>
  );
}
