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
      <h1>Création d'une Maintenance</h1>
      <CreateMaintenance />
    </div>
  );
};

export default CreateMaintenancePage;
