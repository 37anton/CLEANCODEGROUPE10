import React from 'react';
import { useParams } from 'react-router-dom';
import MaintenanceHistory from '../components/MaintenanceHistory';

const MaintenanceHistoryPage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  if (!vehicleId) {
    return <div>Aucun identifiant de véhicule fourni.</div>;
  }

  return (
    <div>
      <MaintenanceHistory vehicleId={vehicleId} />
    </div>
  );
};

export default MaintenanceHistoryPage;
