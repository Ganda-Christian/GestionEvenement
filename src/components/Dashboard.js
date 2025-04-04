import React from "react";
import { Table, Button, Container, Row, Col, Card, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaTrash, FaArrowLeft, FaSignOutAlt, FaHome, FaUsers, FaCalendarAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Flag from "react-world-flags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagUsa, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const events = [
    { id: 1, name: "Seminar", startDate: "2023-02-04", endDate: "2024-12-07", organizer: "Modern" },
    { id: 2, name: "Seminar", startDate: "2023-01-02", endDate: "2023-02-05", organizer: "Modern" }
  ];

  const { i18n, t } = useTranslation(); // Hook pour gérer les traductions

  // Fonction pour changer la langue
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="d-flex min-vh-100">
      
      {/* Sidebar */}
      <div className="bg-primary text-white p-4 d-flex flex-column justify-content-between" style={{ width: "250px", position: "fixed", left: 0, bottom: 0, top: 0 }}>
        <div>
          <h5>{t("EVENT'O WEB APP")}</h5>
          <hr/>
          <ul className="list-unstyled mt-4">
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

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
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

export default Dashboard;
