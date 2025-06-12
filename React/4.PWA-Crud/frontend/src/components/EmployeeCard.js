import React from "react";
import { Card, Button } from "react-bootstrap";

export default function EmployeeCard({
  emp,
  onEdit,
  onDelete,
  onView,
  isOffline = false,
  onDeleteOffline,
}) {
  const imageUrl = emp.profile_image
    ? typeof emp.profile_image === "string"
      ? `http://localhost:5000/uploads/${emp.profile_image}`
      : URL.createObjectURL(emp.profile_image)
    : "https://via.placeholder.com/150";

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt="Employee"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="img-fluid rounded-top"
      />
      <Card.Body className="text-center">
        <Card.Title className="mb-2">
          {emp.first_name} {emp.last_name}
        </Card.Title>
        <div>
          {onView && (
            <Button variant="info" size="sm" className="me-1" onClick={() => onView(emp)}>
              View
            </Button>
          )}
          {onEdit && (
            <Button variant="warning" size="sm" className="me-1" onClick={() => onEdit(emp)}>
              Edit
            </Button>
          )}
          {isOffline ? (
            <Button variant="danger" size="sm" onClick={() => onDeleteOffline(emp.localId)}>
              Delete
            </Button>
          ) : (
            onDelete && (
              <Button variant="danger" size="sm" onClick={() => onDelete(emp.id)}>
                Delete
              </Button>
            )
          )}
        </div>
        {isOffline && <small className="text-muted d-block mt-1">(Offline)</small>}
      </Card.Body>
    </Card>
  );
}
