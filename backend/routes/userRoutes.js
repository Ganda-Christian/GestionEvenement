const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


/* Route de connexion
router.post('/login', async (req, res) => {
  console.log('Requête reçue avec les données :', req.body);
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: "Utilisateur non trouvé" });
      }

      // Comparer le mot de passe fourni avec celui stocké (haché)
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Authentification réussie, on peut ajouter un token ici si nécessaire (JWT)
      
      const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY', { expiresIn: '7d' });
      //renvoie du token au client
      res.json({ message: 'Connexion réussie', token, role: user.role });

  } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
  }
});
*/
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