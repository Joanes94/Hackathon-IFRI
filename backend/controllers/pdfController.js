const Patient = require('../models/Patient');
const Consultation = require('../models/Consultation');
const Medecin = require('../models/Medecin');
const PDFDocument = require('pdfkit');

exports.generatePDF = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const medecinId = req.medecin.id;

    const patient = await Patient.findById(patientId);
    const consultations = await Consultation.find({ patient: patientId });
    const medecin = await Medecin.findById(medecinId);

    if (!patient || !medecin) {
      return res.status(404).json({ message: "Patient ou médecin non trouvé" });
    }

    // Génération manuelle des alertes
    const alertes = [];
    consultations.forEach((c) => {
      if (c.creatinine >= 2) {
        alertes.push({
          type: "Créatinine élevée",
          message: `Créatinine à ${c.creatinine} mg/dL`,
          niveau: "critique"
        });
      }
      if (c.tension >= 14) {
        alertes.push({
          type: "Hypertension",
          message: `Tension à ${c.tension} cmHg`,
          niveau: "modéré"
        });
      }
      if (c.poids < 45) {
        alertes.push({
          type: "Poids faible",
          message: `Poids de ${c.poids} kg détecté`,
          niveau: "modéré"
        });
      }
    });

    const doc = new PDFDocument({ margin: 30 }); // plus petit margin
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="dossier-${patient.nom}.pdf"`);

    doc.pipe(res);

    // 🧾 Titre
    doc.fontSize(16).text(" Dossier Médical du Patient", { align: "center" });
    doc.fontSize(10).text(`Généré le ${new Date().toLocaleString()}`, { align: "center" });
    doc.moveDown(1);

    // 👤 Infos patient
    doc.fontSize(12).text(" Informations du patient :", { underline: true });
    doc.text(`Nom: ${patient.nom} ${patient.prenom}`);
    doc.text(`Sexe: ${patient.sexe}`);
    doc.text(`Email: ${patient.email}`);
    doc.text(`Date de naissance: ${new Date(patient.date_naissance).toLocaleDateString()}`);
    doc.text(`Antécédents: ${patient.antecedents.join(", ") || "Néant"}`);

    // 🩺 Consultations
    doc.moveDown(0.8);
    doc.fontSize(12).text(" Consultations :", { underline: true });
    if (consultations.length === 0) {
      doc.text("Aucune consultation enregistrée.");
    } else {
      consultations.forEach((c, i) => {
        doc.text(
          `#${i + 1} - ${new Date(c.date).toLocaleDateString()} | Poids: ${c.poids} kg | Tension: ${c.tension} cmHg | Créatinine: ${c.creatinine} mg/dL`
        );
        doc.text(`Notes: ${c.notes}`);
      });
    }

    // ⚠️ Alertes
    doc.moveDown(0.8);
    doc.fontSize(12).text(" Alertes médicales :", { underline: true });
    if (alertes.length === 0) {
      doc.text("Aucune alerte générée.");
    } else {
      alertes.forEach((a, i) => {
        doc.text(`#${i + 1} - [${a.niveau}] ${a.type} : ${a.message}`);
      });
    }

    // 🧑‍⚕️ Infos médecin
    doc.moveDown(0.8);
    doc.fontSize(12).text(" Médecin responsable :", { underline: true });
    doc.text(`${medecin.prenom} ${medecin.nom}`);
    doc.text(`Spécialité: ${medecin.specialite}`);
    doc.text(`Email: ${medecin.email}`);
    doc.text(`Téléphone: ${medecin.telephone}`);

    doc.end();
  } catch (err) {
    console.error("Erreur génération PDF:", err);
    res.status(500).json({ message: "Erreur lors de la génération du PDF" });
  }
};
