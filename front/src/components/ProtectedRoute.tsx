import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { token } = useAuth();

  console.log("🔒 Vérification du token dans ProtectedRoute :", token); // ✅ Voir si token est bien null

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;