import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
    return (
      <div className="">
      {/* Header */}
      <header className="">
        <h1 className="fw-bold">Event'O Web APP</h1>
        <nav>
          <ul className="nav">
            <li className=""></li>
            <li className="nav-item"><a href="/" className="nav-link text-dark">Déconnexion</a></li>
          </ul>
        </nav>
      </header>

      <div className="">
        {/* Hero Section */}
        <section className="">
          <h1>{t("welcome")}</h1>
          <div className="d-flex justify-content-center gap-2 mt-3">
            <button className="btn btn-light text-primary fw-bold" onClick={() => changeLanguage("en")}><Flag code="GB" style={{ width: 30, height: 20 }} /></button>
            <button className="btn btn-light text-primary fw-bold" onClick={() => changeLanguage("fr")}><Flag code="FR" style={{ width: 30, height: 20 }} /></button>
            <button className="btn btn-light text-primary fw-bold" onClick={() => changeLanguage("de")}><Flag code="DE" style={{ width: 30, height: 20 }} /></button>
            <button className="btn btn-light text-primary fw-bold" onClick={() => changeLanguage("it")}><Flag code="IT" style={{ width: 30, height: 20 }} /></button>
            <button className="btn btn-light text-primary fw-bold" onClick={() => changeLanguage("es")}><Flag code="ES" style={{ width: 30, height: 20 }} /></button>
          </div>
        </section>

        {/* Événements en vedette */}
        <section className="container py-5">
          <h3 className="text-center fw-bold">{t("FeaturedEvents")}</h3>
          <div className="row mt-4">
            {["15 Mars 2025 - N'Djamena", "20 Avril 2025 - Tchad", "5 Mai 2025 - N'Djamena"].map((event, index) => (
              <div className="col-md-4" key={index}>
                <div className="card p-3 shadow-sm">
                  <h4 className="fw-semibold">{t("Event")}</h4>
                  <p className="text-muted">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        
      </footer>
    </div>
  );
};
export default Home;
