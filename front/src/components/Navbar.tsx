import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full px-6 z-50">
      <div className="flex-1">
        <Link to="/" className="text-lg font-bold">
          🌟 MyApp
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {token ? (
            <li>
              <button onClick={handleLogout} className="btn btn-error">Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="btn btn-primary">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;