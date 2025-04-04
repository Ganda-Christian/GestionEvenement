import React from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Card, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaTrash, FaArrowLeft, FaSignOutAlt, FaHome, FaUsers, FaCalendarAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Flag from "react-world-flags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagUsa, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";


const Home = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    return(
        <div>
            <h3 className="">Bienvenue à la page d'accueil de gestion des événements!</h3>
            {/* Header */}
            <header className="">
                <nav>
                    <ul className="nav">
                        <li className="">Nos événements</li>
                        <li className="nav-item"><a href="login" className="">{t("Se connecter")}</a></li>
                        <li></li>
                    </ul>
                </nav>
            </header>

            <section className="">
          <h1>{t("welcome")}</h1>
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
        </section>

        </div>
    );
};

export default Home;