import { useState } from "react";
import axios from "axios";

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  part: { id: string; name: string };
  stock: { partId: string; quantity: number; alertThreshold: number };
}

const StockModal = ({ isOpen, onClose, part, stock }: StockModalProps) => {
  const [quantity, setQuantity] = useState(stock.quantity);
  const [alertThreshold, setAlertThreshold] = useState(stock.alertThreshold);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // On récupère le token
      await axios.post(
        "http://localhost:3000/part-stock",
        {
          partId: part.id,
          quantity,
          alertThreshold,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Stock mis à jour !");
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du stock :", error);
      alert("Erreur lors de la mise à jour du stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Modifier le stock</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Nom de la pièce</span>
            <input type="text" className="input input-bordered w-full" value={part.name} disabled />
          </label>

          <label className="block">
            <span className="text-gray-700">Quantité disponible</span>
            <input
              type="number"
              className="input input-bordered w-full"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Seuil d'alerte</span>
            <input
              type="number"
              className="input input-bordered w-full"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              required
            />
          </label>

          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Enregistrement..." : "Modifier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;