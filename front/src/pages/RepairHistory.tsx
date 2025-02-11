// src/pages/RepairHistoryPage.tsx
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

  if (loading) {
    return <p className="text-center mt-4">Chargement...</p>;
  }
  if (error) {
    return <div className="alert alert-error shadow-lg mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Historique des réparations</h1>
      {repairs.length === 0 ? (
        <p className="text-center">Aucune réparation enregistrée.</p>
      ) : (
        <div className="space-y-4">
          {repairs.map((repair) => (
            <div key={repair.id} className="card bg-base-100 shadow-xl p-6">
              <p className="text-lg font-semibold">
                Date : {new Date(repair.repairDate).toLocaleDateString()}
              </p>
              <p className="mb-4">
                <strong>Description :</strong> {repair.description}
              </p>
              <div>
                <strong>Pièces utilisées :</strong>
                {repair.repairParts && repair.repairParts.length > 0 ? (
                  <ul className="list-disc ml-6">
                    {repair.repairParts.map((rp) => (
                      <li key={rp.id}>
                        {rp.partStock?.part?.name || 'N/A'} x {rp.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span> -</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepairHistoryPage;
