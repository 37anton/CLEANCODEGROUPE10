import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="drawer mb-24">
      <input id="menu-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
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
                    <Link to="/motorcycles" className="btn btn-info">
                      Motos
                    </Link>
                  </li>
                  <li className="mr-2">
                    <Link to="/create-interval" className="btn btn-info">
                      Créer un modèle moto
                    </Link>
                  </li>
                  <li className="mr-2">
                    <Link to="/interval-definitions" className="btn btn-info">
                      Voir les modèles motos
                    </Link>
                  </li>
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
                      Commandes
                    </Link>
                  </li>
                  {/* Afficher le bouton Drivers uniquement si user.company est défini */}
                  {user?.company && (
                    <li className="mr-2">
                      <Link to="/drivers" className="btn btn-info">
                        Conducteurs
                      </Link>
                    </li>
                  )}
                  <li className="mr-2">
                    <Link to="/suppliers" className="btn btn-info">
                      Fournisseurs
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="btn btn-error">
                      Déconnexion
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="btn btn-primary">Se connecter</Link>
                </li>
              )}
            </ul>
          </div>

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
                  Commandes
                </Link>
              </li>
              {user?.company && (
                <li>
                  <Link to="/drivers" className="btn btn-info w-full">
                    Conducteurs
                  </Link>
                </li>
              )}
              <li>
                <Link to="/suppliers" className="btn btn-info w-full">
                  Fournisseurs
                </Link>
              </li>
              <li>
                <Link to="/motorcycles" className="btn btn-info w-full">
                  Motos
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-error w-full">
                  Se déconnecter
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="btn btn-primary w-full">Se connecter</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;