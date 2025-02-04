// src/pages/NotificationsPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

const NotificationsPage: React.FC = () => {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/notification/all-for-user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur notifications :', err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Mes notifications</h2>
      {notifications.length === 0 ? (
        <p>Aucune notification</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id}>
              {notif.message} <small>({new Date(notif.createdAt).toLocaleString()})</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
