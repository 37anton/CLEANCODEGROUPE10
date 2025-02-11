import React from 'react';
import { useParams } from 'react-router-dom';
import CreateIncident from '../components/CreateIncident';

const CreateIncidentPage: React.FC = () => {
  const { motorcycleId } = useParams<{ motorcycleId: string }>();

  if (!motorcycleId) {
    return <div>Aucun identifiant de moto fourni.</div>;
  }

  return (
    <div>
      <CreateIncident />
    </div>
  );
};

export default CreateIncidentPage;
