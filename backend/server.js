const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/event-management-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connecté à MongoDB !'))
  .catch(err => console.error(err));

// Routes
app.use('/api', userRoutes);

// Démarrage du serveur
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`));

// Config dotenv
require('dotenv').config();
