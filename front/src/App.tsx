import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <AuthProvider>
      <Router>
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notifications" element={<Notifications />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
  );
}

export default App
