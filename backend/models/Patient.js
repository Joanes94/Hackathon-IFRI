const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  sexe: String,
  date_naissance: Date,
  telephone: String, // ✅ ajouté
  adresse: String,   // ✅ ajouté  
  antecedents: [String],
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Medecin' }
}, { timestamps: true });


module.exports = mongoose.model('Patient', patientSchema);
