import { useState } from "react";
import StockModal from "../components/StockModal";

const StockPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <p>Todo : Afficher la liste des stocks et récupérer la liste des produits dans le dropdown</p>
      <h1 className="text-2xl font-bold mb-4">Gestion des stocks</h1>

      {/* Bouton pour ouvrir la modale */}
      <button
        className="btn btn-primary"
        onClick={() => setIsModalOpen(true)}
      >
        Ajouter une pièce
      </button>

      {/* Affichage de la modale */}
      <StockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default StockPage;