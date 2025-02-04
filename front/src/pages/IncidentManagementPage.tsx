// src/pages/IncidentManagementPage.tsx
import React, { useState } from 'react';
import ReportIncident from '../components/ReportIncident';
import IncidentHistory from '../components/IncidentHistory';

const IncidentManagementPage: React.FC = () => {
  const [vehicleId, setVehicleId] = useState<string>('vehicle1');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Incident Management</h1>
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
      <ReportIncident />
      <IncidentHistory vehicleVin={vehicleId} />
    </div>
  );
};

export default IncidentManagementPage;
