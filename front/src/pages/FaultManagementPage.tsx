// src/pages/FaultManagementPage.tsx
import React, { useState } from 'react';
import ReportFault from '../components/ReportFault';
import FaultHistory from '../components/FaultHistory';

const FaultManagementPage: React.FC = () => {
  const [vehicleId, setVehicleId] = useState<string>('vehicle1');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Fault Management</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="vehicleId">Vehicle ID: </label>
        <input
          id="vehicleId"
          type="text"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          style={{ padding: '5px', fontSize: '1rem' }}
        />
      </div>
      <ReportFault />
      <FaultHistory vehicleId={vehicleId} />
    </div>
  );
};

export default FaultManagementPage;
