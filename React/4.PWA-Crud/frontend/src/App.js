import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeFormModal from "./components/EmployeeFormModal";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (error) {
      toast.error("Failed to fetch employees.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, formData);
        toast.success("Employee updated successfully!");
      } else {
        await addEmployee(formData);
        toast.success("Employee added successfully!");
      }
      setModalShow(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      toast.error("Failed to save employee.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      toast.error("Failed to delete employee.");
    }
  };

  return (
    <Container className="mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-primary text-center">Employee Manager (PWA)</h2>
      <div className="text-center">
        <Button
          onClick={() => {
            setSelectedEmployee(null);
            setModalShow(true);
          }}
          className="mb-4"
        >
          + Add Employee
        </Button>
      </div>
      <Row>
        {employees.map((emp) => (
          <Col key={emp.id} md={4}>
            <EmployeeCard
              emp={emp}
              onEdit={(data) => {
                setSelectedEmployee(data);
                setModalShow(true);
              }}
              onDelete={(id) => handleDelete(id)}
            />
          </Col>
        ))}
      </Row>
      <EmployeeFormModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setSelectedEmployee(null);
        }}
        onSave={handleSave}
        initialData={selectedEmployee}
      />
    </Container>
  );
}

export default App;