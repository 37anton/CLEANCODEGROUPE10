import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

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

interface DueMaintenanceProps {
  vehicleVin: string;
}

const DueMaintenance: React.FC<DueMaintenanceProps> = ({ vehicleVin }) => {
  const [dueMaintenances, setDueMaintenances] = useState<Maintenance[]>([]);
  const [error, setError] = useState<string>('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchDueMaintenances = async () => {
      try {
        // Ici, on suppose que l'endpoint de due maintenance utilise le VIN
        const response = await axiosInstance.get<Maintenance[]>(`/maintenance/due/${vehicleVin}`);
        setDueMaintenances(response.data);
      } catch (err: any) {
        console.error(err);
        setError("Error fetching due maintenance records.");
      }
    };

    if (vehicleVin && token) {
      fetchDueMaintenances();
    }
  }, [vehicleVin, token]);

  return (
    <div>
      <h2>Due Maintenance</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {dueMaintenances.length === 0 ? (
        <p>No due maintenance records found.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Scheduled Mileage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dueMaintenances.map(record => (
              <tr key={record.id}>
                <td>{new Date(record.scheduledDate).toLocaleDateString()}</td>
                <td>{record.scheduledMileage ?? 'Not provided'}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DueMaintenance;
