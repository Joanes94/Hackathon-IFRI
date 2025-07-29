import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function PatientConsultations() {
  const { id } = useParams(); // patientId
  const { token } = useAuth();

  const [consultations, setConsultations] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    poids: "",
    tension: "",
    creatinine: "",
    notes: ""
  });

  const fetchData = async () => {
    try {
      const [resCons, resAlerts] = await Promise.all([
        api.get(`/consultations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get(`/alertes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setConsultations(resCons.data);
      setAlertes(resAlerts.data);
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/consultations/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Consultation enregistrée !");
      setFormData({ poids: "", tension: "", creatinine: "", notes: "" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
    }
  };

  const downloadPDF = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/pdf/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Erreur lors de la génération du PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dossier-patient-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("❌ Échec du téléchargement du PDF");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-4">🩺 Consultations du patient</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition mb-6"
        >
          {showForm ? "❌ Fermer le formulaire" : "➕ Ajouter une consultation"}
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-6 rounded-xl shadow mb-8 space-y-4"
          >
            <input
              type="number"
              name="poids"
              placeholder="Poids (kg)"
              value={formData.poids}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="number"
              name="tension"
              placeholder="Tension (cmHg)"
              value={formData.tension}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="number"
              step="0.01"
              name="creatinine"
              placeholder="Créatinine (mg/dL)"
              value={formData.creatinine}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <textarea
              name="notes"
              placeholder="Notes de consultation"
              value={formData.notes}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              📤 Enregistrer
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">📝 Liste des consultations :</h3>
            {consultations.length === 0 ? (
              <p className="text-gray-500">Aucune consultation.</p>
            ) : (
              <ul className="space-y-3 mb-6">
                {consultations.map((c, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 rounded-lg p-4 shadow-sm text-gray-800"
                  >
                    <strong>{new Date(c.date).toLocaleDateString()}</strong> - {c.notes}<br />
                    ⚖️ {c.poids} kg | 💉 Créatinine : {c.creatinine} mg/dL | 🔵 Tension : {c.tension}
                  </li>
                ))}
              </ul>
            )}

            <h3 className="text-lg font-semibold text-gray-700 mb-2">⚠️ Alertes médicales :</h3>
            {alertes.length === 0 ? (
              <p className="text-gray-500">Aucune alerte.</p>
            ) : (
              <ul className="space-y-3">
                {alertes.map((a, i) => (
                  <li
                    key={i}
                    className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded text-gray-800"
                  >
                    🔔 <strong>{a.type}</strong> ({a.niveau}) : {a.message}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <button
          onClick={downloadPDF}
          className="mt-8 bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition"
        >
          📄 Télécharger le dossier PDF
        </button>
      </div>
    </div>
  );
}
