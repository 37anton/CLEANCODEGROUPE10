import React from 'react';
import { useParams } from 'react-router-dom';
import CreateMaintenance from '../components/CreateMaintenance';

const CreateMaintenancePage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  if (!vehicleId) {
    return <div>Aucun identifiant de véhicule fourni.</div>;
  }

  return (
    <div>
      <CreateMaintenance />
    </div>
  );
};

export default CreateMaintenancePage;
