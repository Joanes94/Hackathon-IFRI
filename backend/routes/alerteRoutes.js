const express = require('express');
const router = express.Router();
const controller = require('../controllers/alerteController');
const auth = require('../Middleware/auth');

router.get('/:patientId', auth, controller.alertesPatient);

module.exports = router;
