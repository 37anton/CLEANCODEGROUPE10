import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreateIntervalDefinition: React.FC = () => {
  const { token } = useAuth();
  const [model, setModel] = useState<string>('');
  const [km, setKm] = useState<number>(0);
  const [timeInYears, setTimeInYears] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/interval-definitions',
        { model, km, timeInYears },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Intervalle créé avec succès !');
      setModel('');
      setKm(0);
      setTimeInYears(0);
    } catch (error) {
      console.error("Erreur lors de la création de l'intervalle", error);
      setMessage("Erreur lors de la création de l'intervalle");
    }
  };

  return (
    <div>
      <h1>Créer une Définition d'Intervalle</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Modèle :</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Ex. Street Triple"
            required
          />
        </div>
        <div>
          <label>Kilométrage :</label>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            placeholder="Ex. 10000"
            required
          />
        </div>
        <div>
          <label>Temps (en années) :</label>
          <input
            type="number"
            value={timeInYears}
            onChange={(e) => setTimeInYears(Number(e.target.value))}
            placeholder="Ex. 1"
            required
          />
        </div>
        <button type="submit">Créer Intervalle</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateIntervalDefinition;
