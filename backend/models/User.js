const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['admin', 'organisateur', 'participant'], 
    required: true,
    default: 'participant' // Rôle par défaut
  },
});

module.exports = mongoose.model('User', userSchema);