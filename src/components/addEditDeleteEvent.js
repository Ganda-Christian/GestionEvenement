import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/events";

const AddEditDeleteEvent = () => {
    const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    level: "",
    type: "",
    startDate: "",
    endDate: "",
    location: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setEvents(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await fetch(`${API_URL}/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setFormData({ id: null, name: "", level: "", type: "", startDate: "", endDate: "", location: "" });
    fetchEvents();
  };

  const handleEdit = (event) => {
    setFormData(event);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchEvents();
  };

  return (
    <Container className="mt-4">
      <h3>Event Management</h3>
      <Button variant="primary" className="mb-3" data-bs-toggle="collapse" data-bs-target="#eventForm">
        {formData.id ? "Edit Event" : "Add Event"}
      </Button>
      
      <div id="eventForm" className="collapse show">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Event Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Level</Form.Label>
                <Form.Control type="text" name="level" value={formData.level} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit">{formData.id ? "Update Event" : "Add Event"}</Button>
        </Form>
      </div>

      <h4 className="mt-4">Event List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Level</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>{event.level}</td>
                <td>{event.type}</td>
                <td>{new Date(event.startDate).toLocaleDateString()}</td>
                <td>{new Date(event.endDate).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(event)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No events added</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AddEditDeleteEvent;