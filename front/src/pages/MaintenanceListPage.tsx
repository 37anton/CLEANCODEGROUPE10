// src/pages/MaintenanceListPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Maintenance {
  id: string;
  vehicleId: string;
  scheduledDate: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  scheduledMileage?: number;
  replacedParts?: string;
  cost?: number;
  technicianRecommendations?: string;
}

const MaintenanceListPage: React.FC = () => {
  const { token } = useAuth();
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    axios
      .get('http://localhost:3000/maintenance/all-for-user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMaintenances(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des maintenances :', err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Historique / Liste de toutes mes maintenances</h2>
      {maintenances.length === 0 ? (
        <p>Aucune maintenance trouvée.</p>
      ) : (
        <ul>
          {maintenances.map((m) => (
            <li key={m.id}>
              Maintenance #{m.id} - Véhicule: {m.vehicleId} - Statut: {m.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MaintenanceListPage;
