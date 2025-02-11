import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import notyf from '../utils/notyf';

const CreateIntervalDefinition: React.FC = () => {
  const { token } = useAuth();
  const [model, setModel] = useState<string>('');
  const [km, setKm] = useState<number>(0);
  const [timeInYears, setTimeInYears] = useState<number>(0);
  const [message] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/interval-definitions',
        { model, km, timeInYears },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      notyf.success('Modèle de moto créer avec succès');
      setModel('');
      setKm(0);
      setTimeInYears(0);
    } catch (error) {
      console.error("Erreur lors de la création de l'intervalle", error);
      notyf.error("Erreur lors de la création de l'intervalle");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mt-4">
      <h1 className="card-title text-2xl font-bold mb-4">Créer un modèle moto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Modèle :</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Ex. Street Triple"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Kilométrage :</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            placeholder="Ex. 10000"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Temps (en années) :</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={timeInYears}
            onChange={(e) => setTimeInYears(Number(e.target.value))}
            placeholder="Ex. 1"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Créer Intervalle</button>
      </form>
      {message && <div className="alert alert-info mt-4">{message}</div>}
    </div>
  );
};

export default CreateIntervalDefinition;
