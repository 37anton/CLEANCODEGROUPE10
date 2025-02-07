import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

interface CreateRepairDto {
  incidentId: string;
  repairDate: string;
  description: string;
  // Vous pouvez ajouter d'autres champs pour les pièces utilisées si nécessaire
}

const CreateRepair: React.FC = () => {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [repairDate, setRepairDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!incidentId) {
      setError("Aucun identifiant d'incident fourni.");
      return;
    }

    const dto: CreateRepairDto = {
      incidentId,
      repairDate,
      description,
    };

    try {
      await axios.post(
        'http://localhost:3000/repairs',
        dto,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Réparation créée avec succès !");
      setError(null);
      // Redirigez vers l'historique ou la page de l'incident
      navigate(`/incidents/vehicle/someVehicleId`); // Adaptez selon vos besoins
    } catch (err: any) {
      console.error("Erreur lors de la création de la réparation", err);
      setError("Erreur lors de la création de la réparation");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Créer une Réparation</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date de la réparation :</label>
          <input
            type="datetime-local"
            value={repairDate}
            onChange={(e) => setRepairDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer Réparation</button>
      </form>
    </div>
  );
};

export default CreateRepair;
