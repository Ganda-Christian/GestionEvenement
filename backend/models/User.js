const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'organisateur', 'participant'], 
    required: true,
    default: 'participant' // Rôle par défaut
  },
});

// Middleware pour hasher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si le mot de passe n'est pas modifié, ne pas le re-hasher

  try {
    const salt = await bcrypt.genSalt(10); // Génération du sel
    this.password = await bcrypt.hash(this.password, salt); // Hachage du mot de passe
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer un mot de passe lors de l'authentification
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);