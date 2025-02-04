// src/components/FaultHistory.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface Fault {
  id: string;
  vehicleId: string;
  reportedDate: string;
  description: string;
  type: 'BREAKDOWN' | 'WARRANTY';
  status: 'REPORTED' | 'IN_REPAIR' | 'REPAIRED' | 'CLOSED';
  repairDate?: string;
  repairCost?: number;
  correctiveActions?: string;
  warrantyDetails?: string;
}

interface FaultHistoryProps {
  vehicleId: string;
}

const FaultHistory: React.FC<FaultHistoryProps> = ({ vehicleId }) => {
  const [faults, setFaults] = useState<Fault[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFaults = async () => {
      try {
        const response = await axios.get<Fault[]>(`http://localhost:3000/fault/history/${vehicleId}`);
        setFaults(response.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching fault history.');
      }
    };

    if (vehicleId) {
      fetchFaults();
    }
  }, [vehicleId]);

  return (
    <div>
      <h2>Fault History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {faults.length === 0 ? (
        <p>No fault records found.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Reported Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Status</th>
              <th>Repair Date</th>
              <th>Repair Cost</th>
              <th>Corrective Actions</th>
              <th>Warranty Details</th>
            </tr>
          </thead>
          <tbody>
            {faults.map(fault => (
              <tr key={fault.id}>
                <td>{new Date(fault.reportedDate).toLocaleDateString()}</td>
                <td>{fault.description}</td>
                <td>{fault.type}</td>
                <td>{fault.status}</td>
                <td>{fault.repairDate ? new Date(fault.repairDate).toLocaleDateString() : 'N/A'}</td>
                <td>{fault.repairCost != null ? `${fault.repairCost} €` : 'N/A'}</td>
                <td>{fault.correctiveActions || 'N/A'}</td>
                <td>{fault.warrantyDetails || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FaultHistory;
