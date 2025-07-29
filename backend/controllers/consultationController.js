const Consultation = require('../models/Consultation');
const Patient = require('../models/Patient');
const verifierAlertes = require('../utils/alertEngine');

exports.ajouterConsultation = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { poids, tension, creatinine, notes } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient introuvable" });

    const consultation = await Consultation.create({
      patient: patientId,
      poids,
      tension,
      creatinine,
      notes,
      created_by: req.medecin.id
    });

    // Générer les alertes automatiquement
    const alertes = await verifierAlertes(consultation);

    res.status(201).json({ message: "Consultation enregistrée", consultation, alertes });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.consultationsPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const consultations = await Consultation.find({ patient: patientId }).sort({ date: -1 });
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
