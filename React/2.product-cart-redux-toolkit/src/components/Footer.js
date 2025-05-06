import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto py-2">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 Aniket. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
