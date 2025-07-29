const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const medecinSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  username: { type: String, unique: true },
  specialite: String,
  email: { type: String, unique: true },
  sexe: String,
  telephone: String,
  mot_de_passe: { type: String, required: true }
}, { timestamps: true });

medecinSchema.pre('save', async function (next) {
  if (!this.isModified('mot_de_passe')) return next();
  this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, 10);
  next();
});

medecinSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.mot_de_passe);
};

module.exports = mongoose.model('Medecin', medecinSchema);
