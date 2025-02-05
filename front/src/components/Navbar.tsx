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
    <div className="drawer">
      <input id="menu-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full px-6 z-50">
          <div className="flex-1">
            <Link to="/" className="text-lg font-bold">
              Triumph Motorcycles
            </Link>
          </div>
          <div className="hidden lg:flex flex-none">
            <ul className="menu menu-horizontal px-1">
              {token ? (
                <>
                  <li className="mr-2">
                    <Link to="/notifications" className="btn btn-secondary">
                      Notifications
                    </Link>
                  </li>
                  <li className="mr-2">
                    <Link to="/stock" className="btn btn-accent">
                      Stock
                    </Link>
                  </li>
                  <li className="mr-2">
                    <Link to="/orders" className="btn btn-primary">
                      Orders
                    </Link>
                  </li>
                  <li className="mr-2">
                    <Link to="/drivers" className="btn btn-info">
                      Drivers
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="btn btn-error">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="btn btn-primary">Login</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Menu burger */}
          <div className="lg:hidden">
            <label htmlFor="menu-toggle" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
          </div>
        </nav>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side z-50">
        <label htmlFor="menu-toggle" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60 bg-base-100 h-full flex flex-col space-y-3">
          <li>
            <Link to="/" className="text-lg font-bold mb-2">Triumph Motorcycles</Link>
          </li>
          <div className="divider"></div>
          {token ? (
            <>
              <li>
                <Link to="/notifications" className="btn btn-secondary w-full">
                  Notifications
                </Link>
              </li>
              <li>
                <Link to="/stock" className="btn btn-accent w-full">
                  Stock
                </Link>
              </li>
              <li>
                <Link to="/orders" className="btn btn-primary w-full">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/drivers" className="btn btn-info w-full">
                  Drivers
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-error w-full">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="btn btn-primary w-full">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;