import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

interface Motorcycle {
  id: string;
  vin: string;
  model: string;
  manufactureDate: string;
  lastMaintenanceDate: string;
  mileage: number;
  lastMaintenanceMileage: number;
}

const UpdateMotorcycle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [formData, setFormData] = useState({
    vin: '',
    model: '',
    manufactureDate: '',
    lastMaintenanceDate: '',
    mileage: 0,
    lastMaintenanceMileage: 0,
  });

  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        const response = await axios.get<Motorcycle>(`http://localhost:3000/motorcycles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMotorcycle(response.data);
        setFormData({
          vin: response.data.vin,
          model: response.data.model,
          manufactureDate: response.data.manufactureDate.split('T')[0],
          lastMaintenanceDate: response.data.lastMaintenanceDate.split('T')[0],
          mileage: response.data.mileage,
          lastMaintenanceMileage: response.data.lastMaintenanceMileage,
        });
      } catch (error) {
        console.error("Error fetching motorcycle", error);
      }
    };

    fetchMotorcycle();
  }, [id, token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/motorcycles/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Motorcycle updated", response.data);
      navigate('/motorcycles');
    } catch (error) {
      console.error("Error updating motorcycle", error);
    }
  };

  return (
    <div>
      <h1>Update Motorcycle</h1>
      {motorcycle ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>VIN:</label>
            <input
              type="text"
              value={formData.vin}
              onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Model:</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Manufacture Date:</label>
            <input
              type="date"
              value={formData.manufactureDate}
              onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Last Maintenance Date:</label>
            <input
              type="date"
              value={formData.lastMaintenanceDate}
              onChange={(e) => setFormData({ ...formData, lastMaintenanceDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Mileage:</label>
            <input
              type="number"
              value={formData.mileage}
              onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
              required
            />
          </div>
          <div>
            <label>Last Maintenance Mileage:</label>
            <input
              type="number"
              value={formData.lastMaintenanceMileage}
              onChange={(e) => setFormData({ ...formData, lastMaintenanceMileage: Number(e.target.value) })}
              required
            />
          </div>
          <button type="submit">Update Motorcycle</button>
        </form>
      ) : (
        <p>Loading motorcycle data...</p>
      )}
    </div>
  );
};

export default UpdateMotorcycle;
