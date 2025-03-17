import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importez un fichier CSS pour styliser la page
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/login', { email, password });

        // Vérification de la réponse
        if (response.status === 200) {
            const data = response.data;
            setMessage(`Bienvenue, ${data.message} avec le rôle : ${data.role}`);
            
            // Redirection vers la page d'accueil
            navigate('/home'); // Assurez-vous que '/home' correspond à votre route d'accueil dans React Router
        } else {
            setMessage('Erreur : Informations de connexion incorrectes.');
        }
    } catch (error) {
        // Gestion des erreurs serveur
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
              <a href="#" className="text-decoration-none">Mot de passe oublié ?</a>
          </div>
          {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
