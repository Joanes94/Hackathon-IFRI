const Alerte = require('../models/Alerte');
const Consultation = require('../models/Consultation');

exports.alertesPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Récupérer toutes les consultations du patient
    const consultations = await Consultation.find({ patient: patientId });
    const consultationIds = consultations.map(c => c._id);

    // Chercher les alertes liées à ces consultations
    const alertes = await Alerte.find({ consultation: { $in: consultationIds } })
      .populate({
        path: 'consultation',
        select: 'date tension creatinine poids'
      })
      .sort({ createdAt: -1 });

    res.json(alertes);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
