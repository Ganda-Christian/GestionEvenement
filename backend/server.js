const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.SECRET_KEY || "beatchristgandachristiannanga";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à DB
mongoose.connect('mongodb://127.0.0.1:27017/event-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connecté à MongoDB !'))
  .catch(err => console.error(err));

// 💡 Route d'authentification (LOGIN)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    // Générer un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '7d' });

    res.json({ message: `Bienvenue ${user.name}`, role: user.role, token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route de base "/"

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API !');
});

// Routes
//app.use('/auth', userRoutes); toutes les routes liées à l'authentification, comme /login
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/tickets', ticketRoutes);

// Démarrage du serveur
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`));

// Config dotenv
require('dotenv').config();
