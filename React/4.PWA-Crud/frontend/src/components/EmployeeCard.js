import React from "react";
import { Card, Button } from "react-bootstrap";

export default function EmployeeCard({ emp, onEdit, onDelete, onView }) {
  return (
    <Card className="mb-3">
      <Card.Img
        variant="top"
        src={emp.image_url || "https://via.placeholder.com/150"}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="img-fluid rounded"
      />

      <Card.Body className="text-center">
        <Card.Title>
          {emp.first_name} {emp.last_name}
        </Card.Title>
        <Button variant="info" size="sm" onClick={() => onView(emp)}>
          View
        </Button>{" "}
        <Button variant="warning" size="sm" onClick={() => onEdit(emp)}>
          Edit
        </Button>{" "}
        <Button variant="danger" size="sm" onClick={() => onDelete(emp.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
