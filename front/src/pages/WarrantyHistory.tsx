import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Warranty {
  id: string;
  startDate: string;
  endDate: string;
}

const WarrantyHistoryPage: React.FC = () => {
  const { token } = useAuth();
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWarranties = async () => {
      try {
        const response = await axios.get<Warranty[]>(
          `http://localhost:3000/warranties/vehicle/${vehicleId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWarranties(response.data);
      } catch (err: any) {
        console.error('Erreur lors de la récupération des garanties', err);
        setError('Erreur lors de la récupération des garanties');
      } finally {
        setLoading(false);
      }
    };

    fetchWarranties();
  }, [vehicleId, token]);

  if (loading) {
    return <p className="text-center mt-4">Chargement...</p>;
  }
  if (error) {
    return <div className="alert alert-error shadow-lg mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Historique des garanties</h1>
      {warranties.length === 0 ? (
        <p className="text-center">Aucune garantie enregistrée.</p>
      ) : (
        <div className="space-y-4">
          {warranties.map((warranty) => (
            <div key={warranty.id} className="card bg-base-100 shadow-xl p-6">
              <p className="text-lg font-semibold">
                Date de début : {new Date(warranty.startDate).toLocaleDateString()}
              </p>
              <p className="mb-4">
                <strong>Date de fin :</strong> {new Date(warranty.endDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WarrantyHistoryPage;
