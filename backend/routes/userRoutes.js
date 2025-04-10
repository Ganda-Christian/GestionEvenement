const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

// Inscription (avec hash automatique dans le modèle)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // Création du token JWT
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, SECRET_KEY, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: { id: newUser._id, name: newUser.name, role: newUser.role }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '7d' });

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Ne pas renvoyer les mdp
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;