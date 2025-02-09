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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) {
      navigate("/login"); 
      return;
    }

    fetchNotifications();
  }, [token, navigate]);

  const fetchNotifications = () => {
    axios
      .get("http://localhost:3000/notifications/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des notifications :", error);
        setLoading(false);
      });
  };

  const markAsRead = (id: number) => {
    axios
      .put(`http://localhost:3000/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id ? { ...notif, isRead: true } : notif
          )
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la notification :", error);
      });
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">🔔 Notifications</h1>

      {loading ? (
        <p className="text-gray-500">Chargement des notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 rounded-lg flex justify-between items-center 
                ${notif.isRead ? "bg-gray-200 text-gray-500" : "bg-blue-100 font-bold"}`}
            >
              <span>{notif.message}</span>
              {!notif.isRead && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="ml-4 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Marquer comme lue
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
