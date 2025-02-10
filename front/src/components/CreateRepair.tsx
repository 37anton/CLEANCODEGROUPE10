import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PartStockItem {
  id: string;
  part: {
    id: string;
    name: string;
  };
  quantity: number;
  alertThreshold: number;
}

interface RepairPartDto {
  partId: string;
  quantity: number;
}

interface CreateRepairDto {
  incidentId: string;
  repairDate: string;
  description: string;
  repairParts: RepairPartDto[];
  userId: string; 
}

interface CreateRepairProps {
  incidentId: string;
  motorcycleId: string;
}

const CreateRepair: React.FC<CreateRepairProps> = ({ incidentId, motorcycleId }) => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [repairDate, setRepairDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [availablePartStocks, setAvailablePartStocks] = useState<PartStockItem[]>([]);
  const [repairParts, setRepairParts] = useState<RepairPartDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartStocks = async () => {
      try {
        const response = await axios.get<PartStockItem[]>('http://localhost:3000/part-stock', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailablePartStocks(response.data);
        const initialRepairParts = response.data.map(item => ({
          partId: item.part.id,
          quantity: 0,
        }));
        setRepairParts(initialRepairParts);
      } catch (err) {
        console.error("Erreur lors de la récupération du stock de pièces", err);
        setError("Erreur lors de la récupération du stock de pièces");
      }
    };
    fetchPartStocks();
  }, [token]);

  const handleRepairPartChange = (partId: string, quantity: number) => {
    setRepairParts(prev =>
      prev.map(rp => (rp.partId === partId ? { ...rp, quantity } : rp))
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!incidentId) {
      setError("Aucun identifiant d'incident fourni.");
      return;
    }
    if (!user?.id) {
      setError("Utilisateur non authentifié.");
      return;
    }

    const filteredRepairParts = repairParts.filter(rp => rp.quantity > 0);

    const dto: CreateRepairDto = {
      incidentId,
      repairDate,
      description,
      repairParts: filteredRepairParts,
      userId: user.id,
    };

    console.log('DTO envoyé:', dto);

    try {
      await axios.post('http://localhost:3000/repairs', dto, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Réparation créée avec succès !");
      setError(null);
      navigate(`/repairs/vehicle/${motorcycleId}`);
    } catch (err: any) {
      console.error("Erreur lors de la création de la réparation", err);
      setError("Erreur lors de la création de la réparation");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Créer une Réparation</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date de la réparation :</label>
          <input
            type="datetime-local"
            value={repairDate}
            onChange={(e) => setRepairDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Pièces utilisées :</h3>
          {availablePartStocks.length === 0 ? (
            <p>Aucune pièce disponible dans votre stock.</p>
          ) : (
            availablePartStocks.map((stockItem) => (
              <div key={stockItem.id}>
                <label>
                  {stockItem.part.name} (Disponible : {stockItem.quantity})
                </label>
                <input
                  type="number"
                  min="0"
                  value={repairParts.find(rp => rp.partId === stockItem.part.id)?.quantity || 0}
                  onChange={(e) =>
                    handleRepairPartChange(stockItem.part.id, Number(e.target.value))
                  }
                />
              </div>
            ))
          )}
        </div>
        <button type="submit">Créer Réparation</button>
      </form>
    </div>
  );
};

export default CreateRepair;
