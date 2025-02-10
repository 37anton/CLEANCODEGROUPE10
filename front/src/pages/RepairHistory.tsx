import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RepairPart {
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

interface Repair {
  id: string;
  repairDate: string;
  description: string;
  repairParts?: RepairPart[];
}

const RepairHistoryPage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { token } = useAuth();
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get<Repair[]>(`http://localhost:3000/repairs/vehicle/${vehicleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRepairs(response.data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération de l'historique des réparations", err);
        setError("Erreur lors de la récupération de l'historique des réparations");
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, [vehicleId, token]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1>Historique des Réparations</h1>
      {repairs.length === 0 ? (
        <p>Aucune réparation enregistrée.</p>
      ) : (
        <ul>
          {repairs.map(repair => (
            <li key={repair.id}>
              <p>
                <strong>Date :</strong> {new Date(repair.repairDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Description :</strong> {repair.description}
              </p>
              {repair.repairParts && repair.repairParts.length > 0 ? (
                <div>
                  <strong>Pièces utilisées :</strong>
                  <ul>
                    {repair.repairParts.map(rp => (
                      <li key={rp.id}>
                        {rp.partStock?.part?.name || 'N/A'} x {rp.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p><strong>Pièces utilisées :</strong> -</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepairHistoryPage;
