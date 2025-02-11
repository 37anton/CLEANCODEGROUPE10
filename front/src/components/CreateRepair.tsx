import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import notyf from '../utils/notyf';

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
        notyf.error("Erreur lors de la récupération du stock de pièces");
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
      notyf.error("Aucun identifiant d'incident fourni.");
      return;
    }
    if (!user?.id) {
      notyf.error("Utilisateur non authentifié.");
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
      notyf.success("Réparation créée avec succès !");
      navigate(`/repairs/vehicle/${motorcycleId}`);
    } catch (err: any) {
      console.error("Erreur lors de la création de la réparation", err);
      notyf.error("Erreur lors de la création de la réparation");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mt-4">
      <h1 className="card-title text-2xl font-bold mb-4">Créer une Réparation</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date de la réparation :</span>
          </label>
          <input
            type="datetime-local"
            className="input input-bordered"
            value={repairDate}
            onChange={(e) => setRepairDate(e.target.value)}
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
        <div className="form-control">
          <h3 className="label text-lg font-semibold">Pièces utilisées :</h3>
          {availablePartStocks.length === 0 ? (
            <p className="text-center">Aucune pièce disponible dans votre stock.</p>
          ) : (
            availablePartStocks.map((stockItem) => (
              <div key={stockItem.id} className="flex items-center space-x-4">
                <label className="w-1/2">
                  {stockItem.part.name} (Disponible: {stockItem.quantity})
                </label>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-1/2"
                  value={repairParts.find(rp => rp.partId === stockItem.part.id)?.quantity || 0}
                  onChange={(e) =>
                    handleRepairPartChange(stockItem.part.id, Number(e.target.value))
                  }
                />
              </div>
            ))
          )}
        </div>
        <button type="submit" className="btn btn-primary">Créer réparation</button>
      </form>
    </div>
  );
};

export default CreateRepair;
