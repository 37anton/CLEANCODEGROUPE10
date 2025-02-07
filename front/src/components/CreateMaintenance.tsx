import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

interface CreateMaintenanceDto {
  vehicleId: string;
  scheduledDate: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  scheduledMileage?: number;
  replacedParts?: string;
  cost?: number;
  technicianRecommendations?: string;
}

const CreateMaintenance: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [status, setStatus] = useState<'SCHEDULED' | 'COMPLETED' | 'CANCELED'>('COMPLETED');
  const [scheduledMileage, setScheduledMileage] = useState<number>(0);
  const [replacedParts, setReplacedParts] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [technicianRecommendations, setTechnicianRecommendations] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!vehicleId) {
      setError("Aucun identifiant de véhicule fourni.");
      return;
    }

    const dto: CreateMaintenanceDto = {
      vehicleId,
      scheduledDate,
      status,
      scheduledMileage,
      replacedParts,
      cost,
      technicianRecommendations,
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/maintenances',
        dto,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Maintenance créée avec succès !");
      setError(null);
      // Rediriger vers l'historique ou réinitialiser le formulaire
      navigate(`/maintenances/vehicle/${vehicleId}`);
    } catch (err: any) {
      console.error("Erreur lors de la création de la maintenance", err);
      setError("Erreur lors de la création de la maintenance");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Créer une Maintenance</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date de l'entretien :</label>
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status :</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as any)} required>
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>
        <div>
          <label>Kilométrage prévu :</label>
          <input
            type="number"
            value={scheduledMileage}
            onChange={(e) => setScheduledMileage(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Pièces remplacées :</label>
          <textarea
            value={replacedParts}
            onChange={(e) => setReplacedParts(e.target.value)}
          />
        </div>
        <div>
          <label>Coût (€) :</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Recommandations du technicien :</label>
          <textarea
            value={technicianRecommendations}
            onChange={(e) => setTechnicianRecommendations(e.target.value)}
          />
        </div>
        <button type="submit">Créer Maintenance</button>
      </form>
    </div>
  );
};

export default CreateMaintenance;
