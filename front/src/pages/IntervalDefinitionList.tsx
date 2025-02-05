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
    <div>
      <h1>Liste des Définitions d'Intervalles</h1>
      {message && <p>{message}</p>}
      {definitions.length === 0 ? (
        <p>Aucune définition trouvée.</p>
      ) : (
        <ul>
          {definitions.map(def => (
            <li key={def.id}>
              <strong>{def.model}</strong> - {def.km} km, {def.timeInYears} an(s)
              <Link to={`/update-interval/${def.id}`}>
                <button>Modifier</button>
              </Link>
              <button onClick={() => handleDelete(def.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IntervalDefinitionList;
