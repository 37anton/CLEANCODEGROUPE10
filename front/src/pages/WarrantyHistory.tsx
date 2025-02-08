// src/pages/WarrantyHistoryPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

interface Warranty {
  id: string;
  startDate: string;
  endDate: string;
  // Vous pouvez ajouter d'autres champs, par exemple les pièces couvertes
}

const WarrantyHistoryPage: React.FC = () => {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { vehicleId } = useParams<{ vehicleId: string }>();

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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1>Historique des Garanties</h1>
      {warranties.length === 0 ? (
        <p>Aucune garantie enregistrée.</p>
      ) : (
        <ul>
          {warranties.map((warranty) => (
            <li key={warranty.id}>
              <p>
                <strong>Date de début :</strong> {new Date(warranty.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Date de fin :</strong> {new Date(warranty.endDate).toLocaleDateString()}
              </p>
              {/* Vous pouvez ajouter ici d'autres informations sur la garantie */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WarrantyHistoryPage;
