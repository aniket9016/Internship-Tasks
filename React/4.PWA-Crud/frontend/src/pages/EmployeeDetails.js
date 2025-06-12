import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "../api";
import { Card, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await getEmployeeById(id);
        setEmp(data);
      } catch {
        toast.error("Failed to load employee details");
      }
    };
    fetchEmployee();
  }, [id]);

  if (!emp) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img
          variant="top"
          src={emp.image_url || "https://via.placeholder.com/150"}
          height="200"
          style={{ objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{emp.first_name} {emp.last_name}</Card.Title>
          <Card.Text>
            Gender: {emp.gender}<br />
            Age: {emp.age}<br />
            City: {emp.city}<br />
            Department: {emp.department}<br />
            Mobile: {emp.mobile}
          </Card.Text>
          <Button variant="secondary" onClick={() => navigate("/")}>Back</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
