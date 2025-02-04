// src/pages/WarrantyManagementPage.tsx
import React, { useState } from 'react';
import ReportWarranty from '../components/ReportWarranty';
import WarrantyHistory from '../components/WarrantyHistory';

const WarrantyManagementPage: React.FC = () => {
  const [vehicleId, setVehicleId] = useState<string>('vehicle1');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Warranty Management</h1>
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
      <ReportWarranty />
      <WarrantyHistory vehicleId={vehicleId} />
    </div>
  );
};

export default WarrantyManagementPage;
