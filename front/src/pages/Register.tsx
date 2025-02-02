import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import notyf from "../utils/notyf";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", { email, password, role });
      notyf.success("Inscription réussie !");
      navigate("/login");
    } catch (error) {
      notyf.error("Échec de l'inscription !");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-4">Inscription</h2>
        <form onSubmit={handleRegister}>
          <input type="email" className="input input-bordered w-full mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="input input-bordered w-full mb-3" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn btn-primary w-full" type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Register;