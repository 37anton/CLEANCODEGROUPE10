import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface MaintenancePlan {
  nextMaintenanceMileage: number;
  nextMaintenanceDate: string;
}

interface Props {
  motorcycleId: string;
}

const MaintenancePlanComponent: React.FC<Props> = ({ motorcycleId }) => {
  const [plan, setPlan] = useState<MaintenancePlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/motorcycles/${motorcycleId}/maintenance-plan`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPlan(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération du plan d'entretien", err);
        setError("Erreur lors de la récupération du plan d'entretien");
      }
    };

    fetchPlan();
  }, [motorcycleId, token]);

  if (error) return <p>{error}</p>;
  if (!plan) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Plan d'entretien</h2>
      <p>
        <strong>Prochain entretien au km :</strong> {plan.nextMaintenanceMileage}
      </p>
      <p>
        <strong>Prochaine date d'entretien :</strong> {new Date(plan.nextMaintenanceDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default MaintenancePlanComponent;
