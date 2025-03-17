import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.success("Utilisateur ajouté avec succès !");
toast.error("Échec de l'ajout de l'utilisateur !");

const API_URL = "http://localhost:5000/users";

const AddUserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: uuidv4(), name: "", email: "", role: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
        const data = await response.json();
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
  };

  const handleEdit = (user) => {
    setFormData(user);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <Container className="mt-4">
      <h3>User Management</h3>
      <Button variant="primary" className="mb-3" data-bs-toggle="collapse" data-bs-target="#userForm">
        {formData.id ? "Edit User" : "Add User"}
      </Button>
      <a href="home">Retour</a>
      
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
                  <option value="Admin">Admin</option>
                  <option value="Organizer">Organizer</option>
                  <option value="User">User</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit">{formData.id ? "Update User" : "Add User"}</Button>
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
