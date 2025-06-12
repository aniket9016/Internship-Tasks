import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee,
} from "../api";
import EmployeeFormModal from "../components/EmployeeFormModal";
import ConfirmModal from "../components/ConfirmModal";
import EmployeeCard from "../components/EmployeeCard";
import { toast } from "react-toastify";

export default function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [offlineEmployees, setOfflineEmployees] = useState([]);
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

  const loadOfflineEmployees = () => {
    const offline = JSON.parse(localStorage.getItem("offlineEmployees")) || [];
    setOfflineEmployees(offline);
  };

  useEffect(() => {
    fetchEmployees();
    loadOfflineEmployees();

    // Reload offline employees on network change
    window.addEventListener("online", handleSync);
    return () => window.removeEventListener("online", handleSync);
  }, []);

  const handleSync = async () => {
    const stored = JSON.parse(localStorage.getItem("offlineEmployees")) || [];
    if (stored.length === 0) return;

    for (const emp of stored) {
      const formData = new FormData();
      for (const key in emp) {
        if (key === "profile_image") {
          formData.append("profile_image", new Blob([new Uint8Array(emp.profile_image.data)], { type: emp.profile_image.type }), emp.imageName);
        } else {
          formData.append(key, emp[key]);
        }
      }
      try {
        await addEmployee(formData);
      } catch (err) {
        console.error("Sync error", err);
      }
    }

    toast.success("Offline data synced to server");
    localStorage.removeItem("offlineEmployees");
    setOfflineEmployees([]);
    fetchEmployees();
  };

  const saveOffline = async (formData) => {
    const plainObject = {};
    for (let [key, value] of formData.entries()) {
      if (key === "profile_image" && value instanceof File) {
        const buffer = await value.arrayBuffer();
        plainObject[key] = {
          data: Array.from(new Uint8Array(buffer)),
          type: value.type,
        };
        plainObject.imageName = value.name;
      } else {
        plainObject[key] = value;
      }
    }

    const offline = JSON.parse(localStorage.getItem("offlineEmployees")) || [];
    offline.push(plainObject);
    localStorage.setItem("offlineEmployees", JSON.stringify(offline));
    setOfflineEmployees(offline);
    toast.success("Saved offline. Will sync when online.");
  };

  const handleSave = async (formData) => {
    try {
      if (selectedEmp) {
        await updateEmployee(selectedEmp.id, formData);
        toast.success("Employee updated!");
      } else {
        if (navigator.onLine) {
          await addEmployee(formData);
          toast.success("Employee added!");
        } else {
          await saveOffline(formData);
        }
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

      <h5 className="mt-3">Online Employees</h5>
      <Row>
        {employees.map((emp) => (
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

      {offlineEmployees.length > 0 && !navigator.onLine && (
        <>
          <h5 className="mt-4 text-danger">Offline Saved Employees</h5>
          <Row>
            {offlineEmployees.map((emp, index) => (
              <Col key={index} md={3}>
                <div className="card mb-3">
                  {emp.profile_image && (
                    <img
                      src={URL.createObjectURL(
                        new Blob([new Uint8Array(emp.profile_image.data)], {
                          type: emp.profile_image.type,
                        })
                      )}
                      alt="Offline"
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  )}
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      {emp.first_name} {emp.last_name}
                    </h5>
                    <p className="text-muted">(Offline)</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}

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
