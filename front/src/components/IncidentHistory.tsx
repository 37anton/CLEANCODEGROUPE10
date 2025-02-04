import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

export interface Incident {
  id: string;
  motorcycle: { vin: string };  // Nous utilisons le VIN ici
  incidentDate: string;
  description: string;
}

interface IncidentHistoryProps {
  vehicleVin: string;
}

const IncidentHistory: React.FC<IncidentHistoryProps> = ({ vehicleVin }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [error, setError] = useState<string>('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // On suppose que l'endpoint accepte le VIN pour rechercher les incidents
        const response = await axiosInstance.get<Incident[]>(`/incident/history/${vehicleVin}`);
        setIncidents(response.data);
      } catch (err: any) {
        console.error(err);
        setError("Error fetching incident history.");
      }
    };

    if (vehicleVin && token) {
      fetchIncidents();
    }
  }, [vehicleVin, token]);

  return (
    <div>
      <h2>Incident History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {incidents.length === 0 ? (
        <p>No incident records found.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Incident Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id}>
                <td>{new Date(incident.incidentDate).toLocaleDateString()}</td>
                <td>{incident.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncidentHistory;
