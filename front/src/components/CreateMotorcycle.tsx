// src/components/CreateMotorcycle.tsx
import React, { useState } from 'react';
import axios from 'axios';

export interface Motorcycle {
  id: string;
  vin: string;
  model: string;
  manufactureDate: string;
  lastMaintenanceDate: string;
  mileage: number;
  lastMaintenanceMileage: number;
}

const CreateMotorcycle: React.FC = () => {
  const [motorcycleData, setMotorcycleData] = useState<Motorcycle>({
    id: '',
    vin: '',
    model: '',
    manufactureDate: '',
    lastMaintenanceDate: '',
    mileage: 0,
    lastMaintenanceMileage: 0,
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMotorcycleData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Motorcycle>('http://localhost:3000/motorcycle/create', motorcycleData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Motorcycle created successfully with ID: ' + response.data.id);
    } catch (err) {
      console.error(err);
      setMessage('Error creating motorcycle.');
    }
  };

  return (
    <div>
      <h2>Create Motorcycle</h2>
      <form onSubmit={handleSubmit}>
    
        <div>
          <label>VIN:</label>
          <input type="text" name="vin" value={motorcycleData.vin} onChange={handleChange} required />
        </div>
        <div>
          <label>Model:</label>
          <input type="text" name="model" value={motorcycleData.model} onChange={handleChange} required />
        </div>
        <div>
          <label>Manufacture Date:</label>
          <input type="date" name="manufactureDate" value={motorcycleData.manufactureDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Maintenance Date:</label>
          <input type="date" name="lastMaintenanceDate" value={motorcycleData.lastMaintenanceDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Mileage:</label>
          <input type="number" name="mileage" value={motorcycleData.mileage} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Maintenance Mileage:</label>
          <input type="number" name="lastMaintenanceMileage" value={motorcycleData.lastMaintenanceMileage} onChange={handleChange} required />
        </div>
        <button type="submit">Create Motorcycle</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateMotorcycle;
