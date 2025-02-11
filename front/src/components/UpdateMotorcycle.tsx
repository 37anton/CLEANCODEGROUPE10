import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import notyf from '../utils/notyf';

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
          model: response.data.model, // On conserve le modèle actuel
          manufactureDate: response.data.manufactureDate.split('T')[0],
          lastMaintenanceDate: response.data.lastMaintenanceDate.split('T')[0],
          mileage: response.data.mileage,
          lastMaintenanceMileage: response.data.lastMaintenanceMileage,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données de la moto", error);
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
      console.log("Moto mise à jour", response.data);
      navigate('/motorcycles');
      notyf.success('Moto mis à jour');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la moto", error);
      notyf.error('Erreur lors de la mis à jour de la moto');
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h1 className="text-3xl font-bold mb-4">Mettre à jour la moto</h1>
      {motorcycle ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">VIN :</span>
            </label>
            <input
              type="text"
              value={formData.vin}
              onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Modèle :</span>
            </label>
            <input
              type="text"
              value={formData.model}
              disabled
              className="input input-bordered bg-gray-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date de fabrication :</span>
              </label>
              <input
                type="date"
                value={formData.manufactureDate}
                onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date du dernier entretien :</span>
              </label>
              <input
                type="date"
                value={formData.lastMaintenanceDate}
                onChange={(e) => setFormData({ ...formData, lastMaintenanceDate: e.target.value })}
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Kilométrage :</span>
              </label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Kilométrage du dernier entretien :</span>
              </label>
              <input
                type="number"
                value={formData.lastMaintenanceMileage}
                onChange={(e) => setFormData({ ...formData, lastMaintenanceMileage: Number(e.target.value) })}
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Mettre à jour la moto</button>
        </form>
      ) : (
        <p>Chargement des données de la moto...</p>
      )}
    </div>
  );
};

export default UpdateMotorcycle;
