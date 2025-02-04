// src/components/WarrantyHistory.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface Warranty {
  id: string;
  motorcycle: { id: string };
  startDate: string;
  endDate: string;
}

interface WarrantyHistoryProps {
  vehicleId: string;
}

const WarrantyHistory: React.FC<WarrantyHistoryProps> = ({ vehicleId }) => {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchWarranties = async () => {
      try {
        const response = await axios.get<Warranty[]>(`http://localhost:3000/warranty/history/${vehicleId}`);
        setWarranties(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching warranty history.");
      }
    };

    if (vehicleId) {
      fetchWarranties();
    }
  }, [vehicleId]);

  return (
    <div>
      <h2>Warranty History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {warranties.length === 0 ? (
        <p>No warranty records found.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {warranties.map(warranty => (
              <tr key={warranty.id}>
                <td>{new Date(warranty.startDate).toLocaleDateString()}</td>
                <td>{new Date(warranty.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WarrantyHistory;
