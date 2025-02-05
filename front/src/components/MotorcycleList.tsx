import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface Motorcycle {
  id: string;
  vin: string;
  model: string;
  manufactureDate: string;
  lastMaintenanceDate: string;
  mileage: number;
  lastMaintenanceMileage: number;
  concession?: { id: string }; // si applicable
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
        console.error('Error fetching motorcycles', error);
      }
    };

    fetchMotorcycles();
  }, [token]);

  return (
    <div>
      <h1>My Motorcycles</h1>
      {motorcycles.length === 0 ? (
        <p>No motorcycles found</p>
      ) : (
        <ul>
          {motorcycles.map((moto) => (
            <li key={moto.id}>
              <p>
                {moto.model} - {moto.vin}
              </p>
              {/* Boutons pour modifier et supprimer */}
              <Link to={`/motorcycles/update/${moto.id}`}>
                <button>Edit</button>
              </Link>
              <Link to={`/motorcycles/delete/${moto.id}`}>
                <button>Delete</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MotorcycleList;
