import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchPatients = async () => {
      try {
        const res = await api.get("/patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(res.data);
      } catch (err) {
        console.error("Erreur de chargement des patients :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          👨‍⚕️ Bienvenue Dr {user?.prenom} {user?.nom}
        </h2>

        <button
          onClick={() => navigate("/add-patient")}
          className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300"
        >
          ➕ Ajouter un patient
        </button>

        <h3 className="text-lg font-semibold mt-8 text-gray-700">
          📋 Liste de vos patients :
        </h3>

        {loading ? (
          <p className="mt-4 text-gray-500">Chargement...</p>
        ) : patients.length === 0 ? (
          <p className="mt-4 text-gray-500">Aucun patient enregistré.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {patients.map((p) => (
              <li
                key={p._id}
                className="bg-gray-50 rounded-lg shadow-sm p-4 flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">
                  👤 {p.prenom} {p.nom}
                </span>
                <button
                  onClick={() =>
                    navigate(`/patients/${p._id}/consultations`)
                  }
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition"
                >
                  ➕ Plus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
