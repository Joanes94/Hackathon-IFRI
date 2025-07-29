const express = require('express');
const router = express.Router();
const controller = require('../controllers/patientController');
const auth = require('../Middleware/auth');

router.post('/', auth, controller.ajouterPatient);  // Médecin connecté
router.get('/', auth, controller.listerPatients);   // Voir ses propres patients

module.exports = router;
