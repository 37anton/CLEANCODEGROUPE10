// src/components/MaintenanceHistory.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface Maintenance {
  id: string;
  vehicleId: string;
  scheduledDate: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  scheduledMileage?: number;
  replacedParts?: string;
  cost?: number;
  technicianRecommendations?: string;
}

interface MaintenanceHistoryProps {
  vehicleId: string;
}

const MaintenanceHistory: React.FC<MaintenanceHistoryProps> = ({ vehicleId }) => {
  const [history, setHistory] = useState<Maintenance[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<Maintenance[]>(`http://localhost:3000/maintenance/history/${vehicleId}`);
        setHistory(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching maintenance history.");
      }
    };

    if (vehicleId) {
      fetchHistory();
    }
  }, [vehicleId]);

  return (
    <div>
      <h2>Maintenance History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {history.length === 0 ? (
        <p>No maintenance records found.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Replaced Parts</th>
              <th>Cost</th>
              <th>Technician Recommendations</th>
            </tr>
          </thead>
          <tbody>
            {history.map(record => (
              <tr key={record.id}>
                <td>{new Date(record.scheduledDate).toLocaleDateString()}</td>
                <td>{record.replacedParts || 'Not provided'}</td>
                <td>{record.cost != null ? `${record.cost} €` : 'Not provided'}</td>
                <td>{record.technicianRecommendations || 'Not provided'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MaintenanceHistory;
