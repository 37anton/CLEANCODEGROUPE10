import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

interface CreateIncidentDto {
  motorcycleId: string;
  incidentDate: string;
  description: string;
}

const CreateIncident: React.FC = () => {
  const { motorcycleId } = useParams<{ motorcycleId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [incidentDate, setIncidentDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!motorcycleId) {
      setError("Aucun identifiant de moto fourni.");
      return;
    }

    const dto: CreateIncidentDto = {
      motorcycleId,
      incidentDate,
      description,
    };

    try {
      await axios.post(
        'http://localhost:3000/incidents',
        dto,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Incident créé avec succès !");
      setError(null);
      navigate(`/incidents/vehicle/${motorcycleId}`);
    } catch (err: any) {
      console.error("Erreur lors de la création de l'incident", err);
      setError("Erreur lors de la création de l'incident");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Créer un Incident</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date de l'incident :</label>
          <input
            type="datetime-local"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
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
        <button type="submit">Créer Incident</button>
      </form>
    </div>
  );
};

export default CreateIncident;
