// src/components/MaintenancePlanComponent.tsx
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
        console.log("Données reçues :", response.data);
        setPlan(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération du plan d'entretien", err);
        setError("Erreur lors de la récupération du plan d'entretien");
      }
    };

    fetchPlan();
  }, [motorcycleId, token]);

  if (error) {
    return <div className="alert alert-error shadow-lg mt-4">{error}</div>;
  }

  if (!plan) {
    return <p className="text-center mt-4">Chargement...</p>;
  }

  return (
    <div className="card bg-base-100 shadow-xl p-6 mt-4">
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Prochain entretien au km :</span>{" "}
          {plan.nextMaintenanceMileage}
        </p>
        <p>
          <span className="font-semibold">Prochaine date d'entretien :</span>{" "}
          {plan.nextMaintenanceDate === "ASAP"
            ? "ASAP"
            : new Date(plan.nextMaintenanceDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MaintenancePlanComponent;
