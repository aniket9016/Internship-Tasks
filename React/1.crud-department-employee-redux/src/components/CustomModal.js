import React from "react";
import { Modal, Button } from "react-bootstrap";

function CustomModal({ show, onHide, title, body, footerButtons = [], centered = true }) {
  return (
    <Modal show={show} onHide={onHide} centered={centered}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {footerButtons.map((btn, idx) => (
          <Button key={idx} {...btn.props}>{btn.label}</Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
