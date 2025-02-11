import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { token, user } = useAuth();
  
  if (!token || !user) return <Navigate to="/login" replace />;
  if (requireAdmin && user.role != 'role_admin') return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};


export default ProtectedRoute;
