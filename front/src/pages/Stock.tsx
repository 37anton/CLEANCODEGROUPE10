import { useState, useEffect } from "react";
import axios from "axios";
import StockModal from "../components/StockModal";

interface Part {
  id: string;
  name: string;
}

interface PartStock {
  partId: string;
  quantity: number;
  alertThreshold: number;
}

// Mock pour le stock et seuil
const mockPartStocks: PartStock[] = [
  { partId: "1", quantity: 10, alertThreshold: 5 },
  { partId: "2", quantity: 3, alertThreshold: 4 },
  { partId: "3", quantity: 7, alertThreshold: 2 },
];

const StockPage = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [selectedStock, setSelectedStock] = useState<PartStock | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  // Récupération des pièces depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:3000/parts") // Mets l'URL de ton backend
      .then((response) => setParts(response.data))
      .catch((error) => console.error("Erreur lors du chargement des pièces :", error));
  }, []);

  const openStockModal = (part: Part) => {
    const stock = mockPartStocks.find((s) => s.partId === part.id) || { partId: part.id, quantity: 0, alertThreshold: 5 };
    setSelectedPart(part);
    setSelectedStock(stock);
    setIsStockModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des stocks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parts.map((part) => {
          const stock = mockPartStocks.find((s) => s.partId === part.id) || { partId: part.id, quantity: 0, alertThreshold: 5 };

          return (
            <div
              key={part.id}
              className="card bg-base-100 shadow-md p-4 cursor-pointer"
              onClick={() => openStockModal(part)}
            >
              <h2 className="text-lg font-bold">{part.name}</h2>
              <p className="text-sm">
                Stock :{" "}
                <span className={stock.quantity <= stock.alertThreshold ? "text-red-500" : "text-green-600"}>
                  {stock.quantity}
                </span>
              </p>
              <p className="text-sm">Seuil d'alerte : {stock.alertThreshold}</p>
            </div>
          );
        })}
      </div>

      {selectedPart && selectedStock && (
        <StockModal
          isOpen={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          part={selectedPart}
          stock={selectedStock}
        />
      )}
    </div>
  );
};

export default StockPage;