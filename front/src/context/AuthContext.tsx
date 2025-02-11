import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  role: string;
  isAdmin: boolean;
  company?: { id: string }; 
  concession?: { id: string };
  client?: { id: string };
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    console.log("Chargement de AuthContext...");
    console.log("Token récupéré :", storedToken);
    console.log("Utilisateur récupéré :", storedUser);

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erreur lors du parsing de l'utilisateur :", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    console.log("Connexion de l'utilisateur :", userData);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    console.log("Déconnexion...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};