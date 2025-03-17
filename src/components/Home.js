import React from "react";
import { Table, Button, Container, Row, Col, Card, Navbar, Nav } from "react-bootstrap";
import { FaTrash, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const events = [
    { id: 1, name: "Seminar", startDate: "2023-02-04", endDate: "2024-12-07", organizer: "Modern" },
    { id: 2, name: "Seminar", startDate: "2023-01-02", endDate: "2023-02-05", organizer: "Modern" }
  ];

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-primary text-white p-4 d-flex flex-column justify-content-between" style={{ width: "250px", position: "fixed", left: 0, bottom: 0, top: 0 }}>
        <div>
          <h5>EVENT'O WEB APP</h5>
          <hr/>
          <ul className="list-unstyled mt-4">
            <li className="py-2">Hello amar</li>
            <li className="py-2">Home</li>
            <li className="py-2">Add New Event</li>
            <li className="py-2">Messages</li>
            <li className="py-2">Change Password</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        {/* Navbar */}
        <ul className="nav">
            <li className=""></li>
            <li className="nav-item"><a href="/" className="nav-link text-dark">Déconnexion</a></li>
          </ul>
        <Navbar bg="light" expand="lg" className="mb-3 d-flex justify-content-between" style={{ marginLeft: "250px", width: "calc(100% - 250px)" }}>
          <Nav>
            <Nav.Link href="#" className="text-dark">
              <FaArrowLeft /> Back
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" className="text-dark">
              <FaSignOutAlt /> Logout
            </Nav.Link>
          </Nav>
        </Navbar>
        
        <Container className="p-4">
          <Card>
            <Card.Body>
              <Row className="mb-3 align-items-center">
                <Col>
                  <h4>Pending Approvals <span className="badge bg-primary">2</span></h4>
                </Col>
              </Row>
              <p className="text-muted">Hey amar! View details about your events that are still not approved by the Administrator.</p>
              
              {/* Table */}
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Event Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Organizer Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={event.id}>
                      <td>{index + 1}</td>
                      <td>{event.name}</td>
                      <td>{event.startDate}</td>
                      <td>{event.endDate}</td>
                      <td>{event.organizer}</td>
                      <td>
                        <Button variant="danger" className="p-2">
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Home;
