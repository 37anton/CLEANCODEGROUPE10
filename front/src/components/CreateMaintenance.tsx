import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

// On définit l'interface pour le PartStock tel que retourné par l'API.
// On suppose que l'endpoint /part-stock renvoie des objets contenant :
// - id (de l'enregistrement de stock)
// - part : { id, name }
// - quantity, alertThreshold, etc.
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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Récupérer les pièces disponibles via l'endpoint PartStock
  useEffect(() => {
    const fetchPartStocks = async () => {
      try {
        // L'endpoint /part-stock doit renvoyer uniquement les enregistrements pour l'utilisateur connecté (filtrés côté backend)
        const response = await axios.get<PartStockItem[]>('http://localhost:3000/part-stock', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailablePartStocks(response.data);
        // Initialiser replacedParts pour chaque enregistrement de stock
        const initialReplacedParts = response.data.map((item) => ({
          partId: item.part.id,
          quantity: 0,
        }));
        setReplacedParts(initialReplacedParts);
      } catch (err) {
        console.error("Erreur lors de la récupération du stock de pièces", err);
      }
    };
    fetchPartStocks();
  }, [token]);

  // Met à jour la quantité pour une pièce dans replacedParts
  const handleReplacedPartChange = (partId: string, quantity: number) => {
    setReplacedParts(prev =>
      prev.map(rp => (rp.partId === partId ? { ...rp, quantity } : rp))
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!vehicleId) {
      setError("Aucun identifiant de véhicule fourni.");
      return;
    }

    // Filtrer les pièces dont la quantité est supérieure à zéro
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
      setSuccess("Maintenance créée avec succès !");
      setError(null);
      navigate(`/maintenances/vehicle/${vehicleId}`);
    } catch (err: any) {
      console.error("Erreur lors de la création de la maintenance", err);
      setError("Erreur lors de la création de la maintenance");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Créer une Maintenance</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date de l'entretien :</label>
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status :</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as any)} required>
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>
        <div>
          <label>Kilométrage prévu :</label>
          <input
            type="number"
            value={scheduledMileage}
            onChange={(e) => setScheduledMileage(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Coût (€) :</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Recommandations du technicien :</label>
          <textarea
            value={technicianRecommendations}
            onChange={(e) => setTechnicianRecommendations(e.target.value)}
          />
        </div>
        <div>
          <h3>Pièces remplacées :</h3>
          {availablePartStocks.length === 0 ? (
            <p>Aucune pièce disponible dans votre stock.</p>
          ) : (
            availablePartStocks.map((stockItem) => (
              <div key={stockItem.id}>
                <label>{stockItem.part.name} (Disponible : {stockItem.quantity}) :</label>
                <input
                  type="number"
                  min="0"
                  value={replacedParts.find(rp => rp.partId === stockItem.part.id)?.quantity || 0}
                  onChange={(e) =>
                    handleReplacedPartChange(stockItem.part.id, Number(e.target.value))
                  }
                />
              </div>
            ))
          )}
        </div>
        <button type="submit">Créer Maintenance</button>
      </form>
    </div>
  );
};

export default CreateMaintenance;
