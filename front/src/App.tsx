import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Notifications from "./pages/Notifications";
import Stock from "./pages/Stock"; //
import Orders from "./pages/Orders";
import  Motorcycles  from "./pages/Motorcycles"
import UpdateMotorcycle from './components/UpdateMotorcycle';
import DeleteMotorcycle from './components/DeleteMotorcycle';
import MaintenancePlanPage from './pages/MaintenancePlanPage';
import CreateIntervalDefinition from './pages/CreateIntervalDefinition';
import UpdateIntervalDefinition from './pages/UpdateIntervalDefinition';
import IntervalDefinitionList from './pages/IntervalDefinitionList';
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
              <Route path="/create-interval" element={<CreateIntervalDefinition />} /> {/* Nouvelle route */}
              <Route path="/update-interval/:id" element={<UpdateIntervalDefinition />} />
              <Route path="/interval-definitions" element={<IntervalDefinitionList />} />
              <Route path="/orders" element={<Orders />} />
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
