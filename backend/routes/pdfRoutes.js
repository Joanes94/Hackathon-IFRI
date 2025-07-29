const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const auth = require('../Middleware/auth');

router.get('/:patientId', auth , pdfController.generatePDF);

module.exports = router;
