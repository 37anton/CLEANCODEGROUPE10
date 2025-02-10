import React from 'react';
import { useParams } from 'react-router-dom';
import CreateWarranty from '../components/CreateWarranty';

const CreateWarrantyPage: React.FC = () => {
  const { motorcycleId } = useParams<{ motorcycleId: string }>();

  if (!motorcycleId) {
    return <div>Aucun identifiant de moto fourni.</div>;
  }

  return (
    <div>
      <h1>Création d'une Garantie</h1>
      <CreateWarranty />
    </div>
  );
};

export default CreateWarrantyPage;
