const Patient = require('../models/Patient');

exports.ajouterPatient = async (req, res) => {
  try {
    const { nom, prenom,email, sexe, date_naissance, telephone, adresse, antecedents } = req.body;

    const nouveauPatient = new Patient({
      nom,
      prenom,
      email,
      sexe,
      date_naissance,
      telephone,
      adresse,
      antecedents,
      created_by: req.medecin.id // signature du médecin
    });

    await nouveauPatient.save();
    res.status(201).json({ message: "Patient enregistré avec succès", patient: nouveauPatient });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.listerPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ created_by: req.medecin.id });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
