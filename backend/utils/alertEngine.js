const Alerte = require('../models/Alerte');

const verifierAlertes = async (consultation) => {
  const alertes = [];

  if (consultation.creatinine && consultation.creatinine > 1.5) {
    alertes.push({
      type: 'Créatinine élevée',
      message: `Créatinine à ${consultation.creatinine} mg/dL`,
      niveau: 'critique',
    });
  }

  if (consultation.tension && consultation.tension > 14) {
    alertes.push({
      type: 'Hypertension',
      message: `Tension à ${consultation.tension} cmHg`,
      niveau: 'modéré',
    });
  }

  if (consultation.poids && consultation.poids < 45) {
    alertes.push({
      type: 'Perte de poids inquiétante',
      message: `Poids faible détecté : ${consultation.poids} kg`,
      niveau: 'modéré',
    });
  }

  // Sauvegarde chaque alerte en base
  for (const alerte of alertes) {
    await Alerte.create({
      ...alerte,
      consultation: consultation._id
    });
  }

  return alertes;
};

module.exports = verifierAlertes;
