import React from 'react';
import { useParams } from 'react-router-dom';
import CreateRepair from '../components/CreateRepair';

const CreateRepairPage: React.FC = () => {
  const { incidentId } = useParams<{ incidentId: string }>();

  if (!incidentId) {
    return <div>Aucun identifiant d'incident fourni.</div>;
  }

  return (
    <div>
      <h1>Créer une Réparation</h1>
      <CreateRepair />
    </div>
  );
};

export default CreateRepairPage;
