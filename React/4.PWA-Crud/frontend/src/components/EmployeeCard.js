import React from "react";
import { Button, Card } from "react-bootstrap";

const EmployeeCard = ({ emp, onEdit, onDelete }) => (
  <Card className="m-2" style={{ width: "18rem" }}>
    <Card.Img
      variant="top"
      src={emp.image_url || "https://via.placeholder.com/150"}
      style={{ height: "200px", objectFit: "cover" }}
    />
    <Card.Body>
      <Card.Title>
        {emp.first_name} {emp.last_name} ({emp.gender})
      </Card.Title>
      <Card.Text>
        Age: {emp.age} <br />
        City: {emp.city} <br />
        Dept: {emp.department} <br />
        Mobile: {emp.mobile}
      </Card.Text>
      <Button variant="warning" onClick={() => onEdit(emp)} className="me-2">
        Edit
      </Button>
      <Button variant="danger" onClick={() => onDelete(emp.id)}>
        Delete
      </Button>
    </Card.Body>
  </Card>
);

export default EmployeeCard;