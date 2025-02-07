// src/components/CreateWarranty.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

interface CreateWarrantyDto {
  motorcycleId: string;
  startDate: string;
  endDate: string;
  // Vous pouvez ajouter d'autres champs (par exemple, des pièces couvertes)
}

const CreateWarranty: React.FC = () => {
  const { motorcycleId } = useParams<{ motorcycleId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!motorcycleId) {
      setError("Aucun identifiant de moto fourni.");
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
      setSuccess("Garantie créée avec succès !");
      setError(null);
      navigate(`/warranties/vehicle/${motorcycleId}`);
    } catch (err: any) {
      console.error("Erreur lors de la création de la garantie", err);
      setError("Erreur lors de la création de la garantie");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Créer une Garantie</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date de début :</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date de fin :</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer Garantie</button>
      </form>
    </div>
  );
};

export default CreateWarranty;
