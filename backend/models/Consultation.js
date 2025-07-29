const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  poids: Number,
  tension: Number,
  creatinine: Number,
  date: { type: Date, default: Date.now },
  notes: String,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Medecin' } // signature du médecin
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
