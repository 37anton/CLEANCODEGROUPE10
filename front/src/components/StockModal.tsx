import { useState } from "react";

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  part: { id: string; name: string };
  stock: { partId: string; quantity: number; alertThreshold: number };
}

const StockModal = ({ isOpen, onClose, part, stock }: StockModalProps) => {
  const [quantity, setQuantity] = useState(stock.quantity);
  const [alertThreshold, setAlertThreshold] = useState(stock.alertThreshold);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Modifier le stock</h2>

        <form className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Nom de la pièce</span>
            <input
              type="text"
              className="input input-bordered w-full"
              value={part.name}
              disabled
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Quantité disponible</span>
            <input
              type="number"
              className="input input-bordered w-full"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Seuil d'alerte</span>
            <input
              type="number"
              className="input input-bordered w-full"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
            />
          </label>

          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;