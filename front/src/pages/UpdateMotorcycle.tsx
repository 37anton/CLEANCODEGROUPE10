// src/pages/UpdateMotorcyclePage.tsx
import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Motorcycle {
  id: string;
  vin: string;
  model: string;
  mileage: number;
  lastMaintenanceDate: string;
}

const UpdateMotorcyclePage: React.FC = () => {
  const { token } = useAuth();
  const { id: motorcycleId } = useParams();
  const navigate = useNavigate();

  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [mileage, setMileage] = useState<number>(0);
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState<string>('');

  useEffect(() => {
    if (!token || !motorcycleId) return;
    axios
      .get('http://localhost:3000/motorcycle/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const found = res.data.find((m: Motorcycle) => m.id === motorcycleId);
        if (found) {
          setMotorcycle(found);
          setMileage(found.mileage);
          setLastMaintenanceDate(found.lastMaintenanceDate.slice(0, 10));
        }
      })
      .catch(console.error);
  }, [token, motorcycleId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!motorcycleId) return;
    try {
      await axios.patch(
        `http://localhost:3000/motorcycle/${motorcycleId}`,
        { mileage, lastMaintenanceDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Moto mise à jour !');
      navigate('/motorcycles'); // ou un autre chemin
    } catch (err) {
      console.error(err);
    }
  };

  if (!motorcycle) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Modifier la moto {motorcycle.vin} - {motorcycle.model}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kilométrage :</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Date dernière maintenance :</label>
          <input
            type="date"
            value={lastMaintenanceDate}
            onChange={(e) => setLastMaintenanceDate(e.target.value)}
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateMotorcyclePage;
