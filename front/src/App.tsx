import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import MaintenanceHistory from './components/MaintenanceHistory';
import FaultManagementPage from './pages/FaultManagementPage';
import { AuthProvider } from './context/AuthContext';

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
          </nav>
          <Routes>
            {/* Routes existantes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Nouvelles routes ajoutées */}
            <Route path="/maintenance-history" element={<MaintenanceHistory vehicleId={vehicleId} />} />
            <Route path="/fault-management" element={<FaultManagementPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
