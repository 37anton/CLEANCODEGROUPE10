import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requireAdmin }: { requireAdmin?: boolean }) => {
  const { token, user } = useAuth();
  
  if (!token || !user) return <Navigate to="/login" replace />;
  if (requireAdmin && !user.isAdmin) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};


export default ProtectedRoute;
