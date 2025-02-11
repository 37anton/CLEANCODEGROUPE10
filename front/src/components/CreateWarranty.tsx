import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import notyf from '../utils/notyf';

interface CreateWarrantyDto {
  motorcycleId: string;
  startDate: string;
  endDate: string;
}

const CreateWarranty: React.FC = () => {
  const { motorcycleId } = useParams<{ motorcycleId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!motorcycleId) {
      notyf.error("Aucun identifiant de moto fourni.");
      return;
    }

    const dto: CreateWarrantyDto = {
      motorcycleId,
      startDate,
      endDate,
    };

    try {
      await axios.post(
        'http://localhost:3000/warranties',
        dto,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      notyf.success("Garantie créée avec succès !");
      navigate(`/warranties/vehicle/${motorcycleId}`);
    } catch (err: any) {
      console.error("Erreur lors de la création de la garantie", err);
      notyf.error("Erreur lors de la création de la garantie");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mt-4">

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date de début :</span>
          </label>
          <input
            type="datetime-local"
            className="input input-bordered"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date de fin :</span>
          </label>
          <input
            type="datetime-local"
            className="input input-bordered"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Créer Garantie</button>
      </form>
    </div>
  );
};

export default CreateWarranty;