interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StockModal = ({ isOpen, onClose }: StockModalProps) => {
  if (!isOpen) return null; // Ne pas afficher la modale si elle est fermée

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Ajouter une pièce</h2>

        {/* Formulaire sans logique d'envoi pour l'instant */}
        <form className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Produit</span>
            <select className="select select-bordered w-full">
              <option value="">Sélectionner une pièce</option>
              <option value="1">Filtre à huile</option>
              <option value="2">Plaquette de frein</option>
              <option value="3">Pneu</option>
              <option value="4">Todo : récupérer les produits du back</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Nombre de pièces disponibles</span>
            <input type="number" className="input input-bordered w-full" />
          </label>

          <label className="block">
            <span className="text-gray-700">Seuil d'alerte</span>
            <input type="number" className="input input-bordered w-full" />
          </label>

          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;
