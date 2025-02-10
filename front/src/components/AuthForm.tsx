import { useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 3000,
  position: { x: "right", y: "top" },
});

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload = mode === "register" ? { email, password, role } : { email, password };

      const response = await axios.post(`http://localhost:3000${endpoint}`, payload);

      notyf.success(mode === "login" ? "Connexion réussie !" : "Inscription réussie !");
      
      if (mode === "login") {
        localStorage.setItem("token", response.data.accessToken);
        window.location.href = "/dashboard"; 
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Une erreur est survenue.";
      notyf.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {mode === "login" ? "Connexion" : "Inscription"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {mode === "register" && (
            <div>
              <label className="block text-gray-700">Rôle</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
                <option value="company">Entreprise</option>
              </select>
            </div>
          )}
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            {mode === "login" ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;