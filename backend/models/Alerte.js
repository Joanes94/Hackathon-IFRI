const mongoose = require('mongoose');

const alerteSchema = new mongoose.Schema({
  consultation: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation', required: true },
  type: String, // exemple : "Créatinine élevée"
  message: String,
  niveau: { type: String, enum: ['faible', 'modéré', 'critique'], default: 'modéré' },
}, { timestamps: true });

module.exports = mongoose.model('Alerte', alerteSchema);
