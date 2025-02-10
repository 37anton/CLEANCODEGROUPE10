// components/MotorcycleList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Motorcycle } from "../pages/Motorcycles";

interface MotorcycleListProps {
  motorcycles: Motorcycle[];
}

const MotorcycleList: React.FC<MotorcycleListProps> = ({ motorcycles }) => {
  return (
    <div>
      <h1>Liste des Motos</h1>
      {motorcycles.length === 0 ? (
        <p>Aucune moto trouvée</p>
      ) : (
        <ul>
          {motorcycles.map((moto) => (
            <li key={moto.id}>
              <p>
                {moto.model} - {moto.vin}
              </p>
              {/* Boutons existants */}
              <Link to={`/motorcycles/update/${moto.id}`}>
                <button>Modifier</button>
              </Link>
              <Link to={`/motorcycles/delete/${moto.id}`}>
                <button>Supprimer</button>
              </Link>
              <Link to={`/maintenance-plan/${moto.id}`}>
                <button>Voir Maintenance</button>
              </Link>
              <Link to={`/incidents/create/${moto.id}`}>
                <button>Créer Incident</button>
              </Link>
              <Link to={`/incidents/vehicle/${moto.id}`}>
                <button>Historique Incidents</button>
              </Link>
              <Link to={`/warranties/create/${moto.id}`}>
                <button>Ajouter Garantie</button>
              </Link>
              <Link to={`/warranties/vehicle/${moto.id}`}>
                <button>Voir Garanties</button>
              </Link>
              {/* Nouveaux boutons */}
              <Link to={`/maintenances/create/${moto.id}`}>
                <button>Faire Maintenance</button>
              </Link>
              <Link to={`/repairs/create/${moto.id}`}>
                <button>Créer Réparation</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MotorcycleList;
