const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);


const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);


const consultationRoutes = require('./routes/consultationRoutes');
app.use('/api/consultations', consultationRoutes);

const alerteRoutes = require('./routes/alerteRoutes');
app.use('/api/alertes', alerteRoutes);


app.use('/api/pdf', require('./routes/pdfRoutes'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
