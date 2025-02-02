import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full px-6 z-50">
      <div className="flex-1">
        <Link to="/" className="text-lg font-bold">
          Triumph Motorcycles
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/login">Se connecter</Link></li>
          <li><Link to="/register">S'inscrire</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;