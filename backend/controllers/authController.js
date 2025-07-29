const Medecin = require('../models/Medecin');
const jwt = require('jsonwebtoken');

const generateToken = (medecin) => {
  return jwt.sign(
    { id: medecin._id, username: medecin.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { nom, prenom, username, specialite, email, sexe, telephone, mot_de_passe, mot_de_passe_confirme } = req.body;

    if (mot_de_passe !== mot_de_passe_confirme)
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });

    const existe = await Medecin.findOne({ $or: [{ email }, { username }] });
    if (existe)
      return res.status(400).json({ message: "Email ou username déjà utilisé" });

    const nouveauMedecin = new Medecin({ nom, prenom, username, specialite, email, sexe, telephone, mot_de_passe });
    await nouveauMedecin.save();

    res.status(201).json({ message: "Inscription réussie" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, mot_de_passe } = req.body;

    const medecin = await Medecin.findOne({ username });
    if (!medecin)
      return res.status(404).json({ message: "Médecin non trouvé" });

    const isMatch = await medecin.comparePassword(mot_de_passe);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = generateToken(medecin);
    res.status(200).json({
      message: "Connexion réussie",
      token,
      medecin: {
        id: medecin._id,
        nom: medecin.nom,
        prenom: medecin.prenom,
        username: medecin.username,
        specialite: medecin.specialite
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
