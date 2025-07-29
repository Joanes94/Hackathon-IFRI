import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LoginMedecin() {
  const [form, setForm] = useState({ username: "", mot_de_passe: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.medecin);
      setMessage("✅ Connexion réussie !");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Échec de connexion.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          🔐 Connexion Médecin
        </h2>

        {message && (
          <p className="mb-4 text-center font-semibold text-sm text-red-500">
            {message}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-6">
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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}
