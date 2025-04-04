import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaTrash, FaArrowLeft, FaSignOutAlt, FaHome, FaUsers, FaCalendarAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';
import Flag from "react-world-flags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagUsa, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000/events";

const AddEditDeleteEvent = () => {
    const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    level: "",
    type: "",
    startDate: "",
    endDate: "",
    location: ""
  });

  const { i18n, t } = useTranslation(); // Hook pour gérer les traductions
  
    // Fonction pour changer la langue
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
  };

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
    setFormData({ id: uuidv4(), name: "", level: "", type: "", startDate: "", endDate: "", location: "" });
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

      <div className="bg-primary text-white p-4 d-flex flex-column justify-content-between" style={{ width: "250px", position: "fixed", left: 0, bottom: 0, top: 0 }}>
        <div>
          <h5>EVENT'O WEB APP</h5>
          <hr/>
          <ul className="list-unstyled mt-4">
            <li className="py-2">Hello amar</li>
            <li className="nav-item">
            <Nav.Link href="/" className="texte-white">
              <FaHome size={25} />  Accueil
            </Nav.Link>
              
            </li>
            <Nav.Link href="addUserForm" className="texte-white">
              <FaUsers size={25} />  Gestion des utilisateurs
            </Nav.Link>

            <Nav.Link href="addEditDeleteEvent" className="texte-white">
              <FaCalendarAlt size={25} />  Gestion des événements
            </Nav.Link>
            <li className="py-2">Change Password</li>
            <Nav.Link href="/login" className="text-white">
                <FaSignOutAlt /> Logout
            </Nav.Link>
            
          </ul>
        </div>
      </div>
        {/* Navbar */}
      
          <Navbar bg="" expand="lg">
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <NavDropdown
                  title={
                    <span>
                      <FontAwesomeIcon icon={faGlobe} /> {t("language")}
                    </span>
                  }
                  id="language-dropdown"
                  align="end"
                >
                  <NavDropdown.Item onClick={() => changeLanguage("en")}>
                    <button className="btn btn-light text-primary fw-bold" onClick={() => changeLanguage("en")}>
                      <Flag code="GB" style={{ width: 20, height: 15 }} />
                    </button>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => changeLanguage("fr")}>
                    <button className="btn btn-light text-primary fw-bold" onClick={() => changeLanguage("fr")}>
                      <Flag code="FR" style={{ width: 20, height: 15 }} />
                    </button>
                    
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => changeLanguage("es")}>
                    <button className="btn btn-light text-primary fw-bold" onClick={() => changeLanguage("es")}>
                      <Flag code="ES" style={{ width: 20, height: 15 }} />
                    </button>
                    
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => changeLanguage("it")}>
                    <button className="btn btn-light text-primary fw-bold" onClick={() => changeLanguage("it")}>
                      <Flag code="IT" style={{ width: 20, height: 15 }} />
                    </button>
                    
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

      <h3>Event Management</h3>
      
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
                <Form.Select name="level" value={formData.level} onChange={handleChange} required>
                  <option value="">Select Level</option>
                  <option value="national">National</option>
                  <option value="international">International</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Select Level</option>
                  <option value="concert">Concert</option>
                  <option value="festival">Festival</option>
                  <option value="conference">Conférence</option>
                  <option value="seminar">Séminaire</option>
                </Form.Select>
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
          <Button variant="success" type="submit">{formData.id ? "Add Event" : "Update Event"}</Button>
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