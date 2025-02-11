// src/components/IntervalDefinitionList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface IntervalDefinition {
  id: string;
  model: string;
  km: number;
  timeInYears: number;
}

const IntervalDefinitionList: React.FC = () => {
  const { token } = useAuth();
  const [definitions, setDefinitions] = useState<IntervalDefinition[]>([]);
  const [message, setMessage] = useState<string>('');

  const fetchDefinitions = async () => {
    try {
      const response = await axios.get<IntervalDefinition[]>('http://localhost:3000/interval-definitions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDefinitions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des définitions', error);
    }
  };

  useEffect(() => {
    fetchDefinitions();
  }, [token]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/interval-definitions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Définition supprimée avec succès');
      fetchDefinitions();
    } catch (error) {
      console.error('Erreur lors de la suppression de la définition', error);
      setMessage('Erreur lors de la suppression');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des modèles motos</h1>
      {message && <div className="alert alert-info shadow-lg mb-4">{message}</div>}
      {definitions.length === 0 ? (
        <p className="text-center">Aucune définition trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {definitions.map((def) => (
            <div key={def.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{def.model}</h2>
                <p className="text-sm">
                 Interval avant chaque entretien : {def.km} km, {def.timeInYears} an(s)
                </p>
                <div className="card-actions justify-end mt-4 space-x-2">
                  <Link to={`/update-interval/${def.id}`}>
                    <button className="btn btn-outline btn-sm">Modifier</button>
                  </Link>
                  <button onClick={() => handleDelete(def.id)} className="btn btn-error btn-sm">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntervalDefinitionList;
