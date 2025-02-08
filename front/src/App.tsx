import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Drivers from "./pages/Drivers";
import Suppliers from "./pages/Suppliers";
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Notifications from "./pages/Notifications";
import Stock from "./pages/Stock";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import  Motorcycles  from "./pages/Motorcycles"
import UpdateMotorcycle from './components/UpdateMotorcycle';
import DeleteMotorcycle from './components/DeleteMotorcycle';
import MaintenancePlanPage from './pages/MaintenancePlanPage';
import CreateIntervalDefinition from './pages/CreateIntervalDefinition';
import UpdateIntervalDefinition from './pages/UpdateIntervalDefinition';
import IntervalDefinitionList from './pages/IntervalDefinitionList';
import MaintenanceHistoryPage from './pages/MaintenanceHistory';
import CreateMaintenancePage from './pages/CreateMaintenancePage';
import CreateIncidentPage from './pages/CreateIncident';
import CreateRepairPage from './pages/CreateRepair';
import CreateWarrantyPage from './pages/CreateWarranty'; 
import WarrantyHistoryPage from './pages/WarrantyHistory';
import IncidentHistoryPage from './pages/IncidentHitory';


const App = () => {



  return (
    <AuthProvider>
      <Router>

        <Navbar />
        <div className="pt-16">
          <h1>Vehicle Management System</h1>
          <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <Link to="/">Home</Link> |{' '}
            <Link to="/login">Login</Link> |{' '}
            <Link to="/register">Register</Link> |{' '}
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/stock">Stock</Link>
            <Link to="/motorcycles">moto</Link>
            <Link to="/interval-definitions">Liste des Intervalles</Link>
          </nav>
          <Routes>
            {/* Routes existantes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/motorcycles" element={<Motorcycles />} />
              <Route path="/motorcycles/update/:id" element={<UpdateMotorcycle />} />
              <Route path="/motorcycles/delete/:id" element={<DeleteMotorcycle />} />
              <Route path="/maintenance-plan/:motorcycleId" element={<MaintenancePlanPage />} />
              <Route path="/maintenances/vehicle/:vehicleId" element={<MaintenanceHistoryPage />} />
              <Route path="/maintenances/create/:vehicleId" element={<CreateMaintenancePage />} />
              <Route path="/incidents/create/:motorcycleId" element={<CreateIncidentPage />} />
              <Route path="/repairs/create/:incidentId" element={<CreateRepairPage />} />
              <Route path="/warranties/create/:motorcycleId" element={<CreateWarrantyPage />} />
              <Route path="/warranties/vehicle/:vehicleId" element={<WarrantyHistoryPage />} />
              <Route path="/incidents/vehicle/:vehicleId" element={<IncidentHistoryPage />} />
              <Route path="/create-interval" element={<CreateIntervalDefinition />} /> 
              <Route path="/update-interval/:id" element={<UpdateIntervalDefinition />} />
              <Route path="/interval-definitions" element={<IntervalDefinitionList />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/create-order/:supplierId" element={<CreateOrder />} />
            </Route>

            {/* Nouvelles routes ajoutées */}

            <Route path="/stock" element={<Stock />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>

  );
};

export default App;
