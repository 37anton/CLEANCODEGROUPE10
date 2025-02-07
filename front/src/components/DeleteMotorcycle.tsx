import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

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
    } catch (error) {
      console.error("Error deleting motorcycle", error);
    }
  };

  return (
    <div>
      <h1>Delete Motorcycle</h1>
      <button onClick={handleDelete}>Confirm Delete</button>
    </div>
  );
};

export default DeleteMotorcycle;
