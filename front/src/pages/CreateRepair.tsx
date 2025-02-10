import React from 'react';
import { useParams } from 'react-router-dom';
import CreateRepair from '../components/CreateRepair';

const CreateRepairPage: React.FC = () => {
  const { incidentId, motorcycleId } = useParams<{ incidentId: string; motorcycleId: string }>();

  if (!incidentId || !motorcycleId) {
    return <div>Identifiants requis non fournis.</div>;
  }

  return (
    <div>
      <h1>Créer une Réparation</h1>
      <CreateRepair incidentId={incidentId} motorcycleId={motorcycleId} />
    </div>
  );
};

export default CreateRepairPage;
