const express = require('express');
const router = express.Router();
const User = require('../models/User');


// Route de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email, password });
      if (user) {
          return res.status(200).json({ 
              message: `Bienvenue, ${user.name}!`, 
              role: user.role 
          });
      } else {
          return res.status(401).json({ error: "Email ou mot de passe incorrect." });
      }
  } catch (err) {
      return res.status(500).json({ error: "Erreur serveur." });
  }
});

// Endpoint pour ajouter un utilisateur
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint pour récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint pour supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;