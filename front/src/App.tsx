// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages et composants
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import Stock from './pages/Stock';
import MaintenanceHistory from './components/MaintenanceHistory';
import DueMaintenance from './components/DueMaintenance';
import IncidentManagementPage from './pages/IncidentManagementPage';
import WarrantyManagementPage from './pages/WarrantyManagementPage';
import CreateMotorcycle from './components/CreateMotorcycle';
import MotorcycleList from './components/MotorcycleList';

const App: React.FC = () => {
  const vehicleId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; // Exemple d'UUID valide

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Vehicle Management System</h1>
          <nav style={{ marginBottom: '20px' }}>
            <Link to="/">Home</Link> |{' '}
            <Link to="/maintenance-history">Maintenance History</Link> |{' '}
            <Link to="/due-maintenance">Due Maintenance</Link> |{' '}
            <Link to="/incident-management">Incident Management</Link> |{' '}
            <Link to="/warranty-management">Warranty Management</Link> |{' '}
            <Link to="/create-motorcycle">Create Motorcycle</Link> |{' '}
            <Link to="/login">Login</Link> |{' '}
            <Link to="/register">Register</Link> |{' '}
            <Link to="/dashboard">Dashboard</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route path="/stock" element={<Stock />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/maintenance-history" element={<MaintenanceHistory vehicleId={vehicleId} />} />
              <Route path="/due-maintenance" element={<DueMaintenance vehicleVin={vehicleId} />} />
              <Route path="/incident-management" element={<IncidentManagementPage />} />
              <Route path="/warranty-management" element={<WarrantyManagementPage />} />
              <Route path="/create-motorcycle" element={<CreateMotorcycle />} />
              <Route path="/motorcycle-list" element={<MotorcycleList />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
