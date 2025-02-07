import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  const [message, setMessage] = useState<string>('');

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
      setMessage('Définition mise à jour avec succès');
      navigate('/interval-definitions');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la définition', error);
      setMessage('Erreur lors de la mise à jour');
    }
  };

  if (!definition) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Modifier la Définition pour {definition.model}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kilométrage :</label>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Temps (en années) :</label>
          <input
            type="number"
            value={timeInYears}
            onChange={(e) => setTimeInYears(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateIntervalDefinition;
