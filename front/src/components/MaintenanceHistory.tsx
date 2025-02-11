import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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
  const { token } = useAuth();

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

  if (loading) return <p className="text-center mt-4">Chargement...</p>;
  if (error) return <div className="alert alert-error shadow-lg mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Historique des Entretiens</h2>
      {maintenances.length === 0 ? (
        <p className="text-center">Aucun entretien enregistré.</p>
      ) : (
        <div className="space-y-4">
          {maintenances.map((m) => (
            <div key={m.id} className="card bg-base-100 shadow-xl p-6">
              <p className="text-lg font-semibold">
                Date : {new Date(m.scheduledDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status :</strong> {m.status}
              </p>
              <p>
                <strong>Kilométrage prévu :</strong> {m.scheduledMileage ?? '-'}
              </p>
              <div>
                <strong>Pièces remplacées :</strong>{" "}
                {m.maintenanceParts && m.maintenanceParts.length > 0 ? (
                  <ul className="list-disc ml-6">
                    {m.maintenanceParts.map((mp) => (
                      <li key={mp.id}>
                        {mp.partStock?.part?.name || 'N/A'} x {mp.quantity}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaintenanceHistory;
