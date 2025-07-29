const express = require('express');
const router = express.Router();
const controller = require('../controllers/consultationController');
const auth = require('../Middleware/auth');

router.post('/:patientId', auth, controller.ajouterConsultation);
router.get('/:patientId', auth, controller.consultationsPatient);

module.exports = router;
