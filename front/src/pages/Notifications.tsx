import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}

const Notifications = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]); 

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirige vers login si l'utilisateur n'est pas connecté
      return;
    }

    axios
      .get("http://localhost:3000/notifications", {
        headers: { Authorization: `Bearer ${token}` }, // Envoie du token pour sécuriser la requête
      })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des notifications :", error);
      });
  }, [token, navigate]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">🔔 Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li key={notif.id} className={`p-4 rounded-lg ${notif.isRead ? "bg-gray-200" : "bg-blue-100 font-bold"}`}>
              {notif.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;