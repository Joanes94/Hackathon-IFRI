import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex flex-col items-center justify-center px-4">
      
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4 drop-shadow-lg">
          🌿 MRC Consultations
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-8">
          Plateforme dédiée à la gestion intelligente des consultations des patients atteints de <span className="font-semibold">Maladie Rénale Chronique (MRC)</span>.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-700 transition duration-300 w-full md:w-auto"
          >
            🔐 Connexion
          </Link>
          <Link
            to="/register"
            className="bg-white border border-green-600 text-green-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-50 transition duration-300 w-full md:w-auto"
          >
            📝 Inscription
          </Link>
        </div>
      </div>

      <footer className="mt-10 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} MRC Consultations. Tous droits réservés.
      </footer>
    </div>
  );
}
