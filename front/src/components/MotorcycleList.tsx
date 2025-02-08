import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Motorcycle {
  id: string;
  vin: string;
  model: string;
  manufactureDate: string;
  lastMaintenanceDate: string;
  mileage: number;
  lastMaintenanceMileage: number;
}

const MotorcycleList: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await axios.get<Motorcycle[]>('http://localhost:3000/motorcycles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMotorcycles(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des motos', error);
      }
    };

    fetchMotorcycles();
  }, [token]);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MotorcycleList;
