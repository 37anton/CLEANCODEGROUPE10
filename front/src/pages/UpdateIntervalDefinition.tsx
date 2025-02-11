// src/components/UpdateIntervalDefinition.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import notyf from '../utils/notyf';

interface IntervalDefinition {
  id: string;
  model: string;
  km: number;
  timeInYears: number;
}

const UpdateIntervalDefinition: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [definition, setDefinition] = useState<IntervalDefinition | null>(null);
  const [km, setKm] = useState<number>(0);
  const [timeInYears, setTimeInYears] = useState<number>(0);
  const [message] = useState<string>('');

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const response = await axios.get<IntervalDefinition[]>('http://localhost:3000/interval-definitions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const def = response.data.find(d => d.id === id);
        if (def) {
          setDefinition(def);
          setKm(def.km);
          setTimeInYears(def.timeInYears);
          
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la définition', error);
        
      }
    };
    fetchDefinition();
  }, [id, token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!definition) return;
    try {
      await axios.put(
        `http://localhost:3000/interval-definitions/${definition.id}`,
        { km, timeInYears },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      notyf.success('Modèle mis à jour');
      navigate('/interval-definitions');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la définition', error);
      notyf.error('Erreur lors de la mis à jour du modèle');
    }
  };

  if (!definition) return <p className="text-center mt-4">Chargement...</p>;

  return (
    <div className="card bg-base-100 shadow-xl p-6 mt-4">
      <h1 className="card-title text-2xl font-bold mb-4">
        Modifier l'interval pour {definition.model}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Kilométrage :</span>
          </label>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Temps (en années) :</span>
          </label>
          <input
            type="number"
            value={timeInYears}
            onChange={(e) => setTimeInYears(Number(e.target.value))}
            className="input input-bordered"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Mettre à jour</button>
      </form>
      {message && <div className="alert alert-info mt-4">{message}</div>}
    </div>
  );
};

export default UpdateIntervalDefinition;
