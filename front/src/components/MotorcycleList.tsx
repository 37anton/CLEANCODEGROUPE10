import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Motorcycle {
  id: string;
  vin: string;
  model: string;
  manufactureDate: string;
  lastMaintenanceDate: string;
  mileage: number;
  lastMaintenanceMileage: number;
  // Ajoutez d'autres propriétés si nécessaire
}

const MotorcycleList: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await axios.get<Motorcycle[]>(
          'http://localhost:3000/motorcycles',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMotorcycles(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des motos', error);
      }
    };

    fetchMotorcycles();
  }, [token]);

  return (
    <div>
      <h1>Mes Motos</h1>
      <ul>
        {motorcycles.map((moto) => (
          <li key={moto.id}>
            {moto.model} - VIN : {moto.vin}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotorcycleList;
