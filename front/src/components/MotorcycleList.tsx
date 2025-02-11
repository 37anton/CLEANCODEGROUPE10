// src/components/MotorcycleList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Motorcycle } from "../pages/Motorcycles";

interface MotorcycleListProps {
  motorcycles: Motorcycle[];
}

const MotorcycleList: React.FC<MotorcycleListProps> = ({ motorcycles }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Liste des motos</h1>
      {motorcycles.length === 0 ? (
        <p className="text-center">Aucune moto trouvée</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {motorcycles.map((moto) => (
            <div key={moto.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Modèle : {moto.model}</h2>
                <p className="text-sm">VIN : {moto.vin}</p>
                <p className="text-sm">
                  <strong>Date de fabrication :</strong>{" "}
                  {new Date(moto.manufactureDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <strong>Date du dernier entretien :</strong>{" "}
                  {new Date(moto.lastMaintenanceDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <strong>Kilométrage :</strong> {moto.mileage}
                </p>
                <p className="text-sm">
                  <strong>Kilométrage du dernier entretien :</strong>{" "}
                  {moto.lastMaintenanceMileage}
                </p>
                <div className="card-actions justify-end mt-4 space-x-2">
                  <Link to={`/motorcycles/update/${moto.id}`}>
                    <button className="btn btn-outline btn-sm">Modifier</button>
                  </Link>
                  <Link to={`/motorcycles/delete/${moto.id}`}>
                    <button className="btn btn-outline btn-sm">Supprimer</button>
                  </Link>
                  <Link to={`/maintenance-plan/${moto.id}`}>
                    <button className="btn btn-info btn-sm">Prochaine maintenance</button>
                  </Link>
                  <Link to={`/maintenances/create/${moto.id}`}>
                    <button className="btn btn-primary btn-sm">Faire maintenance</button>
                  </Link>
                  <Link to={`/maintenances/vehicle/${moto.id}`}>
                    <button className="btn btn-secondary btn-sm">Historique maintenance</button>
                  </Link>
                  <Link to={`/incidents/create/${moto.id}`}>
                  <button className="btn btn-secondary btn-sm">Créer incident</button>
                  </Link>
                  <Link to={`/incidents/vehicle/${moto.id}`}>
                    <button className="btn btn-accent btn-sm">Historique incidents</button>
                  </Link>
                  <Link to={`/warranties/create/${moto.id}`}>
                    <button className="btn btn-warning btn-sm">Ajouter garantie</button>
                  </Link>
                  <Link to={`/warranties/vehicle/${moto.id}`}>
                    <button className="btn btn-warning btn-sm">Voir garanties</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MotorcycleList;
