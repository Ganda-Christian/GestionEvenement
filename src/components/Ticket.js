import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

const Ticket = () => {
  const [formData, setFormData] = useState({
    ticketPrice: "",
    ticketQuantity: "",
    ticketType: ""
  });

  const { i18n, t } = useTranslation(); // Hook pour gérer les traductions
    
      // Fonction pour changer la langue
      const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.ticketPrice]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket Data:", formData);
  };


  return (
    <Container className="mt-4">
        {/* Ticket Information */}
        <h4>Ticket Information</h4>
        <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Ticket Price ($)</Form.Label>
              <Form.Control type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Number of Tickets</Form.Label>
              <Form.Control type="number" name="ticketQuantity" value={formData.ticketQuantity} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Ticket Type</Form.Label>
              <Form.Select name="ticketType" value={formData.ticketType} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
                <option value="Student">Student</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default Ticket;