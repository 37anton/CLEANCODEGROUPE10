import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notyf from "../utils/notyf";
import axios, { AxiosError } from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", { email, password });
  
      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        notyf.success("Connexion réussie !");
        navigate("/dashboard");
      } else {
        console.warn("⚠️ Aucune accessToken dans la réponse !");
        notyf.error("Échec de la connexion !");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        notyf.error(error.response?.data?.message || "Échec de la connexion !");
      } else {
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
