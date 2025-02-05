import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface CreateMotorcycleDto {
  vin: string;
  model: string;
  manufactureDate: string;
  lastMaintenanceDate: string;
  mileage: number;
  lastMaintenanceMileage: number;
}

interface IntervalDefinition {
  id: string;
  model: string;
  km: number;
  timeInYears: number;
}

const CreateMotorcycle: React.FC = () => {
  const { token } = useAuth();
  const [vin, setVin] = useState<string>('');
  const [model, setModel] = useState<string>(''); // sera choisi via dropdown
  const [manufactureDate, setManufactureDate] = useState<string>('');
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState<string>('');
  const [mileage, setMileage] = useState<number>(0);
  const [lastMaintenanceMileage, setLastMaintenanceMileage] = useState<number>(0);
  const [intervalDefinitions, setIntervalDefinitions] = useState<IntervalDefinition[]>([]);

  // Récupère la liste des définitions d'intervalles pour alimenter le dropdown
  useEffect(() => {
    const fetchIntervalDefinitions = async () => {
      try {
        const response = await axios.get<IntervalDefinition[]>('http://localhost:3000/interval-definitions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIntervalDefinitions(response.data);
        if (response.data.length > 0) {
          setModel(response.data[0].model); // valeur par défaut
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des définitions d'intervalle", error);
      }
    };
    fetchIntervalDefinitions();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dto: CreateMotorcycleDto = {
      vin,
      model,
      manufactureDate,
      lastMaintenanceDate,
      mileage,
      lastMaintenanceMileage,
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/motorcycles/create',
        dto,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Moto créée :', response.data);
      // Réinitialisation ou redirection
    } catch (error) {
      console.error('Erreur lors de la création de la moto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Créer une Moto</h1>
      <div>
        <label>VIN :</label>
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Modèle :</label>
        <select value={model} onChange={(e) => setModel(e.target.value)} required>
          {intervalDefinitions.map(def => (
            <option key={def.id} value={def.model}>
              {def.model}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Date de Fabrication :</label>
        <input
          type="date"
          value={manufactureDate}
          onChange={(e) => setManufactureDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date du Dernier Entretien :</label>
        <input
          type="date"
          value={lastMaintenanceDate}
          onChange={(e) => setLastMaintenanceDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Kilométrage :</label>
        <input
          type="number"
          value={mileage}
          onChange={(e) => setMileage(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Kilométrage du Dernier Entretien :</label>
        <input
          type="number"
          value={lastMaintenanceMileage}
          onChange={(e) => setLastMaintenanceMileage(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Créer Moto</button>
    </form>
  );
};

export default CreateMotorcycle;
