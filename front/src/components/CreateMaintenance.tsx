
import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
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

interface ReplacedPartDto {
  partId: string;
  quantity: number;
}

interface CreateMaintenanceDto {
  vehicleId: string;
  scheduledDate: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  scheduledMileage?: number;
  replacedParts: ReplacedPartDto[];
  cost?: number;
  technicianRecommendations?: string;
}

const CreateMaintenance: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [status, setStatus] = useState<'SCHEDULED' | 'COMPLETED' | 'CANCELED'>('COMPLETED');
  const [scheduledMileage, setScheduledMileage] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [technicianRecommendations, setTechnicianRecommendations] = useState<string>('');
  const [availablePartStocks, setAvailablePartStocks] = useState<PartStockItem[]>([]);
  const [replacedParts, setReplacedParts] = useState<ReplacedPartDto[]>([]);

  

  useEffect(() => {
    const fetchPartStocks = async () => {
      try {
        const response = await axios.get<PartStockItem[]>('http://localhost:3000/part-stock', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailablePartStocks(response.data);
        const initialReplacedParts = response.data.map((item) => ({
          partId: item.part.id,
          quantity: 0,
        }));
        setReplacedParts(initialReplacedParts);
      } catch (err) {
        console.error("Erreur lors de la récupération du stock de pièces", err);
        notyf.error("Erreur lors de la récupération du stock de pièces");
      }
    };
    fetchPartStocks();
  }, [token]);

  const handleReplacedPartChange = (partId: string, quantity: number) => {
    setReplacedParts(prev =>
      prev.map(rp => (rp.partId === partId ? { ...rp, quantity } : rp))
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!vehicleId) {
      notyf.error("Aucun identifiant de véhicule fourni.");
      return;
    }

    const filteredReplacedParts = replacedParts.filter(rp => rp.quantity > 0);

    const dto: CreateMaintenanceDto = {
      vehicleId,
      scheduledDate,
      status,
      scheduledMileage,
      replacedParts: filteredReplacedParts,
      cost,
      technicianRecommendations,
    };

    try {
      await axios.post('http://localhost:3000/maintenances', dto, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notyf.success("Maintenance créée avec succès !");

      navigate(`/maintenances/vehicle/${vehicleId}`);
    } catch (err: any) {
      console.error("Erreur lors de la création de la maintenance", err);
      notyf.error("Erreur lors de la création de la maintenance");

    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mt-4">
      <h1 className="card-title text-2xl font-bold mb-4">Créer une maintenance</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date de l'entretien :</span>
          </label>
          <input
            type="datetime-local"
            className="input input-bordered"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Status :</span>
          </label>
          <select
            className="select select-bordered"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            required
          >
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Kilométrage prévu :</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={scheduledMileage}
            onChange={(e) => setScheduledMileage(Number(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Coût (€) :</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recommandations du technicien :</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={technicianRecommendations}
            onChange={(e) => setTechnicianRecommendations(e.target.value)}
          />
        </div>
        <div className="form-control">
          <h3 className="label">Pièces remplacées :</h3>
          {availablePartStocks.length === 0 ? (
            <p>Aucune pièce disponible dans votre stock.</p>
          ) : (
            availablePartStocks.map((stockItem) => (
              <div key={stockItem.id} className="flex items-center space-x-2">
                <label className="w-1/2">
                  {stockItem.part.name} (Disponible: {stockItem.quantity})
                </label>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-1/2"
                  value={replacedParts.find(rp => rp.partId === stockItem.part.id)?.quantity || 0}
                  onChange={(e) =>
                    handleReplacedPartChange(stockItem.part.id, Number(e.target.value))
                  }
                />
              </div>
            ))
          )}
        </div>
        <button type="submit" className="btn btn-primary">Créer Maintenance</button>
      </form>
    </div>
  );
};

export default CreateMaintenance;
