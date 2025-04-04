import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaArrowLeft, FaSignOutAlt, FaHome, FaUsers, FaCalendarAlt } from "react-icons/fa";
import Flag from "react-world-flags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagUsa, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";



const API_URL = "http://localhost:5000/users";

const AddUserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: uuidv4(), name: "", email: "", role: "" });

  const { i18n, t } = useTranslation(); // Hook pour gérer les traductions
  
    // Fonction pour changer la langue
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
        const data = await response.json();
        console.log(data); // Ajoutez cette ligne pour voir les données retournées
        setUsers(data);
    } catch (error) {
        console.error(error.message);
        alert("Impossible de récupérer les utilisateurs !");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      setFormData({ id: uuidv4(), name: "", email: "", role: "" });
      fetchUsers();
      toast.success("Utilisateur ajouté avec succès !"); // Utilisez un toast ici
    } catch (error) {
      toast.error("Échec de l'ajout de l'utilisateur !"); // Utilisez un toast d'erreur
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (

    
    <Container className="">

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

      <h3>User Management</h3>
      <a href="dashboard">Retour</a>
      
      <div id="userForm" className="collapse show">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="organisateur">Organisateur</option>
                  <option value="participant">Participant</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit">{formData.id ? "Add User" : "Update User"}</Button>
        </Form>
      </div>

      <h4 className="mt-4">User List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No users added</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AddUserForm;
