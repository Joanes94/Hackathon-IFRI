const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Accès non autorisé" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.medecin = decoded; // contient l’id et les infos du médecin
    next();
  } catch {
    return res.status(403).json({ message: "Token invalide" });
  }
};
