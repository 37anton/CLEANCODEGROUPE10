import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface MaintenancePartDto {
  id: string;
  quantity: number;
  partStock: {
    id: string;
    part: {
      id: string;
      name: string;
    };
  };
}

interface Maintenance {
  id: string;
  scheduledDate: string;
  status: string;
  scheduledMileage?: number;
  maintenanceParts?: MaintenancePartDto[];
  cost?: number;
  technicianRecommendations?: string;
}

interface Props {
  vehicleId: string;
}

const MaintenanceHistory: React.FC<Props> = ({ vehicleId }) => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/maintenances/vehicle/${vehicleId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMaintenances(response.data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération de l'historique des maintenances", err);
        setError("Erreur lors de la récupération de l'historique des maintenances");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [vehicleId, token]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2>Historique des Entretiens</h2>
      {maintenances.length === 0 ? (
        <p>Aucun entretien enregistré.</p>
      ) : (
        <ul>
          {maintenances.map((m) => (
            <li key={m.id}>
              <p>
                <strong>Date :</strong> {new Date(m.scheduledDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status :</strong> {m.status}
              </p>
              <p>
                <strong>Kilométrage prévu :</strong> {m.scheduledMileage ?? '-'}
              </p>
              <div>
                <strong>Pièces remplacées :</strong>
                {m.maintenanceParts && m.maintenanceParts.length > 0 ? (
                  <ul>
                    {m.maintenanceParts.map((mp) => (
                      <li key={mp.id}>
                        {mp.partStock.part.name} x {mp.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span> -</span>
                )}
              </div>
              <p>
                <strong>Coût :</strong> {m.cost ? m.cost + ' €' : '-'}
              </p>
              <p>
                <strong>Recommandations :</strong> {m.technicianRecommendations ?? '-'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MaintenanceHistory;
