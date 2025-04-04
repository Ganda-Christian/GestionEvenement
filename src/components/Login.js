import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importation du fichier CSS pour styliser la page
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Envoi de la requête avec fetch
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })  //Conversion des données en JSON
      });

      const data = await response.json(); // Conversion de la réponse JSON
  
      if (response.ok) {

        // Stocker le token dans le stockage local
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        // Si le statut HTTP est 200, on récupère les données
        setMessage(`Bienvenue, ${data.message} avec le rôle : ${data.role}`);
        
        // Redirection vers le dashboard
        navigate('/dashboard'); // Assurez-vous que '/dashboard' est défini dans React Router
      } else {
        // En cas d'erreur (exemple : 400 ou 401)
        setMessage('Erreur : Informations de connexion incorrectes.');
      }
    } catch (error) {
      // Gestion des erreurs réseau ou serveur
      setMessage("Erreur de connexion au serveur.");
      console.error(error);
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
  
          </div>
          {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
