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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1>Historique des Incidents</h1>
      {incidents.length === 0 ? (
        <p>Aucun incident enregistré.</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident.id}>
              <p>
                <strong>Date :</strong> {new Date(incident.incidentDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Description :</strong> {incident.description}
              </p>
              <Link to={`/repairs/create/${incident.id}/${vehicleId}`}>
                <button>Créer Réparation</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentHistoryPage;
