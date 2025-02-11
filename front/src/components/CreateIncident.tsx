import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import notyf from '../utils/notyf';

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
 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!motorcycleId) {
      notyf.error("Aucun identifiant de moto fourni.");
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
      notyf.success("Incident crée");
      navigate(`/incidents/vehicle/${motorcycleId}`);
    } catch (err: any) {
      console.error("Erreur lors de la création de l'incident", err);
      notyf.error("Erreur lors de la création de l'incident");

    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mt-4">
      <h1 className="card-title text-2xl font-bold mb-4">Créer un incident</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date de l'incident :</span>
          </label>
          <input
            type="datetime-local"
            className="input input-bordered"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description :</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Créer Incident</button>
      </form>
    </div>
  );
};

export default CreateIncident;
