import React from 'react';
import { useParams } from 'react-router-dom';
import MaintenancePlanComponent from '../components/MaintenancePlan';

const MaintenancePlanPage: React.FC = () => {
  const { motorcycleId } = useParams<{ motorcycleId: string }>();

  if (!motorcycleId) {
    return <div>Aucun identifiant de moto fourni.</div>;
  }

  return (
    <div>
      <h1>Plan d'entretien de la moto</h1>
      <MaintenancePlanComponent motorcycleId={motorcycleId} />
    </div>
  );
};

export default MaintenancePlanPage;
