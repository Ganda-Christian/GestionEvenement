import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'participant',
  });

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setVariant('success');
        setMessage("Inscription réussie !");
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setVariant('danger');
        setMessage(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setVariant('danger');
      setMessage("Erreur réseau");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="p-5 shadow">
            <h3 className="text-center mb-4">Inscription</h3>
            {message && <Alert variant={variant}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Entrer votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Entrer votre email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Entrer votre mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formRole" className="mb-4">
                    <Form.Label>Rôle</Form.Label>
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="participant">Participant</option>
                      <option value="organisateur">Organisateur</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg">
                  S'inscrire
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
