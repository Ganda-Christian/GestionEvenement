import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import de useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'participant',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // initialisation

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Inscription réussie !");
        setTimeout(() => {
          navigate('/login'); // redirection vers la page de connexion
        }, 1500); // délai de 1.5 secondes pour laisser voir le message
      } else {
        setMessage(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setMessage("Erreur réseau");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nom" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        /><br />

        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        /><br />

        <input 
          type="password" 
          name="password" 
          placeholder="Mot de passe" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        /><br />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="participant">Participant</option>
          <option value="organisateur">Organisateur</option>
          <option value="admin">Admin</option>
        </select><br />

        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;