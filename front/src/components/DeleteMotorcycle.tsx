import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import notyf from '../utils/notyf';

const DeleteMotorcycle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/motorcycles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Motorcycle deleted");
      navigate('/motorcycles');
      notyf.success("Moto supprimée avec succès");
    } catch (error) {
      console.error("Error deleting motorcycle", error);
      notyf.error('Erreur lors de la suppresion de la moto');
    }
  };

  return (
    <div>
      <h1>Supprimer la moto ?</h1>
      <button onClick={handleDelete}>Oui</button>
    </div>
  );
};

export default DeleteMotorcycle;
