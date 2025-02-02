import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notyf from "../utils/notyf";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import de AuthContext

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Récupère la fonction login depuis le contexte

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", { email, password });

      if (response.data?.accessToken) {
        login(response.data.accessToken); // Met à jour le contexte immédiatement
        notyf.success("Connexion réussie !");
        navigate("/dashboard");
      } else {
        console.warn("⚠️ Aucune accessToken dans la réponse !");
        notyf.error("Échec de la connexion !");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {  // Vérifie si l'erreur vient d'Axios
        console.error("Erreur Axios :", error.response?.data); 
        notyf.error(error.response?.data?.message || "Échec de la connexion !");
      } else {
        console.error("Erreur inconnue :", error);
        notyf.error("Une erreur inattendue est survenue !");
      }
    }    
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          className="input input-bordered w-80"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input input-bordered w-80"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-80" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;