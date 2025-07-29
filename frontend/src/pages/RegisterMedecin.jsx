import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterMedecin() {
  const [form, setForm] = useState({
    nom: "", prenom: "", username: "", specialite: "",
    email: "", sexe: "", telephone: "",
    mot_de_passe: "", mot_de_passe_confirme: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      setMessage("✅ Inscription réussie. Redirection...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Erreur lors de l’inscription.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🩺 Inscription Médecin</h2>
        {message && (
          <p className="mb-4 text-center font-semibold text-sm text-red-500">{message}</p>
        )}

        {[
          { name: "nom", label: "Nom" },
          { name: "prenom", label: "Prénom" },
          { name: "username", label: "Nom d'utilisateur" },
          { name: "specialite", label: "Spécialité" },
          { name: "email", label: "Email", type: "email" },
          { name: "sexe", label: "Sexe" },
          { name: "telephone", label: "Téléphone" }
        ].map(({ name, label, type = "text" }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}

        {/* Mot de passe */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Mot de passe</label>
          <div className="flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              name="mot_de_passe"
              value={form.mot_de_passe}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xl"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Confirmation */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Confirmation mot de passe</label>
          <div className="flex items-center gap-2">
            <input
              type={showConfirm ? "text" : "password"}
              name="mot_de_passe_confirme"
              value={form.mot_de_passe_confirme}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-xl"
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          ✅ S’inscrire
        </button>
      </form>
    </div>
  );
}
