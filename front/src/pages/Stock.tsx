import { useState, useEffect } from "react";
import axios from "axios";
import StockModal from "../components/StockModal";
import notyf from "../utils/notyf";

interface Part {
  id: string;
  name: string;
}

interface PartStock {
  id: string;
  partId: string;
  quantity: number;
  alertThreshold: number;
}

const StockPage = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [partStocks, setPartStocks] = useState<PartStock[]>([]);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [selectedStock, setSelectedStock] = useState<PartStock | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  // Récupération des pièces et stocks depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:3000/parts")
      .then((response) => setParts(response.data))
      .catch((error) => console.error("Erreur lors du chargement des pièces :", error));

    axios
      .get("http://localhost:3000/part-stock")
      .then((response) => setPartStocks(response.data))
      .catch((error) => console.error("Erreur lors du chargement des stocks :", error));
  }, []);

  const openStockModal = (part: Part) => {
    const stock = partStocks.find((s) => s.partId === part.id) || null;
    setSelectedPart(part);
    setSelectedStock(stock);
    setIsStockModalOpen(true);
  };

  const handleStockUpdate = (updatedStock: PartStock) => {
    setPartStocks((prevStocks) => {
      const stockExists = prevStocks.some((s) => s.partId === updatedStock.partId);
      return stockExists
        ? prevStocks.map((s) => (s.partId === updatedStock.partId ? updatedStock : s))
        : [...prevStocks, updatedStock];
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des stocks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parts.map((part) => {
          const stock = partStocks.find((s) => s.partId === part.id);
          return (
            <div
              key={part.id}
              className="card bg-base-100 shadow-md p-4 cursor-pointer"
              onClick={() => openStockModal(part)}
            >
              <h2 className="text-lg font-bold">{part.name}</h2>
              <p className="text-sm">
                Stock :{" "}
                <span className={stock && stock.quantity <= (stock.alertThreshold || 0) ? "text-red-500" : "text-green-600"}>
                  {stock ? stock.quantity : "N/A"}
                </span>
              </p>
              <p className="text-sm">Seuil d'alerte : {stock ? stock.alertThreshold : "N/A"}</p>
            </div>
          );
        })}
      </div>

      {selectedPart && (
        <StockModal
          isOpen={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          part={selectedPart}
          stock={selectedStock}
          onStockUpdate={handleStockUpdate}
        />
      )}
    </div>
  );
};

export default StockPage;