import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importez un fichier CSS pour styliser la page
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage(`Bienvenue, ${data.message} avec le rôle : ${data.role}`);
        } else {
            setMessage(data.error);
        }
    } catch (error) {
        setMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '25rem' }}>
          
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Adresse Email</label>
                  <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="exemple@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe</label>
                  <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </div>
              <button type="submit" className="btn btn-primary w-100">Se connecter</button>
          </form>
          <div className="text-center mt-3">
              <a href="#" className="text-decoration-none">Mot de passe oublié ?</a>
          </div>
          {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
