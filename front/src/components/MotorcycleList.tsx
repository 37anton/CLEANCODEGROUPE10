// src/components/MotorcycleList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Motorcycle } from './CreateMotorcycle'; // Réutiliser l'interface Motorcycle

const MotorcycleList: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await axios.get<Motorcycle[]>('http://localhost:3000/motorcycle/all', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMotorcycles(response.data);
      } catch (err) {
        console.error(err);
        setMessage('Error fetching motorcycles.');
      }
    };

    fetchMotorcycles();
  }, []);

  return (
    <div>
      <h2>Motorcycle List</h2>
      {message && <p>{message}</p>}
      {motorcycles.length > 0 ? (
        <ul>
          {motorcycles.map((motorcycle) => (
            <li key={motorcycle.id}>
              <strong>{motorcycle.model}</strong> - VIN: {motorcycle.vin} - Mileage: {motorcycle.mileage} km
            </li>
          ))}
        </ul>
      ) : (
        <p>No motorcycles found.</p>
      )}
    </div>
  );
};

export default MotorcycleList;
