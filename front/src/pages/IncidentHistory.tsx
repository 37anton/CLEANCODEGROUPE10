// src/pages/IncidentHistoryPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Incident {
  id: string;
  incidentDate: string;
  description: string;
}

const IncidentHistoryPage: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { vehicleId } = useParams<{ vehicleId: string }>();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get<Incident[]>(
          `http://localhost:3000/incidents/vehicle/${vehicleId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIncidents(response.data);
      } catch (err: any) {
        console.error('Erreur lors de la récupération des incidents', err);
        setError('Erreur lors de la récupération des incidents');
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, [vehicleId, token]);

  if (loading) {
    return <p className="text-center mt-4">Chargement...</p>;
  }
  if (error) {
    return <div className="alert alert-error shadow-lg mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Historique des incidents</h1>
      {incidents.length === 0 ? (
        <p className="text-center">Aucun incident enregistré.</p>
      ) : (
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.id} className="card bg-base-100 shadow-xl p-6">
              <p className="text-lg font-semibold">
                Date : {new Date(incident.incidentDate).toLocaleDateString()}
              </p>
              <p className="mb-4">
                <strong>Description :</strong> {incident.description}
              </p>
              <Link to={`/repairs/create/${incident.id}/${vehicleId}`}>
                <button className="btn btn-secondary btn-sm">Créer réparation</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentHistoryPage;
