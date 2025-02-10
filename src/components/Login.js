import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importez un fichier CSS pour styliser la page

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const isAuthenticated = true; // Si la connexion est réussie

    if (isAuthenticated) {
      // Rediriger vers la page d'accueil après la connexion
      navigate('/home');  // Remplace '/home' par le chemin de ta page d'accueil
    }
  };

  const handleForgotPassword = () => {
    // Logique pour rediriger ou gérer "Mot de passe oublié"
    console.log('Redirection vers la page de réinitialisation du mot de passe');
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Se connecter</button>
      </form>
      <p className="forgot-password" onClick={handleForgotPassword}>
        Mot de passe oublié ?
      </p>
    </div>
  );
};

export default Login;
