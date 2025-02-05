import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Drivers from "./pages/Drivers";
import ProtectedRoute from './components/ProtectedRoute';
import MaintenanceHistory from './components/MaintenanceHistory';
import FaultManagementPage from './pages/FaultManagementPage';
import { AuthProvider } from './context/AuthContext';
import Notifications from "./pages/Notifications";
import Stock from "./pages/Stock"; //
import Orders from "./pages/Orders";

const App = () => {
  const vehicleId = 'vehicle1'; // Exemple d'identifiant de véhicule


  return (
    <AuthProvider>
      <Router>

        <Navbar />
        <div className="pt-16">
          <h1>Vehicle Management System</h1>
          <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <Link to="/">Home</Link> |{' '}
            <Link to="/maintenance-history">Maintenance History</Link> |{' '}
            <Link to="/fault-management">Fault Management</Link> |{' '}
            <Link to="/login">Login</Link> |{' '}
            <Link to="/register">Register</Link> |{' '}
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/stock">Stock</Link>
          </nav>
          <Routes>
            {/* Routes existantes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/drivers" element={<Drivers />} />
            </Route>

            {/* Nouvelles routes ajoutées */}
            <Route path="/maintenance-history" element={<MaintenanceHistory vehicleId={vehicleId} />} />
            <Route path="/fault-management" element={<FaultManagementPage />} />
            <Route path="/stock" element={<Stock />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>

  );
};

export default App;
