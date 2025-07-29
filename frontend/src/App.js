import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import './index.css'; // ou global.css selon ton projet
import RegisterMedecin from "./pages/RegisterMedecin";
import LoginMedecin from "./pages/LoginMedecin";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import PatientConsultations from "./pages/PatientConsultations";
import HomePage from "./pages/HomePage"; // Crée cette page si ce n’est pas encore fait

function Navbar() {
  return null; // plus rien ici
}


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterMedecin />} />
        <Route path="/login" element={<LoginMedecin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/patients/:id/consultations" element={<PatientConsultations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
