import { useState, useEffect } from "react";
import axios from "axios";
import StockModal from "../components/StockModal";
import notyf from "../utils/notyf";

interface Part {
  id: string;
  name: string;
}

interface PartStock {
  partId: string;
  quantity: number;
  alertThreshold: number;
}

const StockPage = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [stocks, setStocks] = useState<PartStock[]>([]);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const forceUpdate = () => setRefreshKey((prev) => prev + 1);


  // Fonction pour récupérer les pièces et stocks
  const fetchPartsAndStocks = async () => {
    try {
      const token = localStorage.getItem("token");
      const [partsResponse, stocksResponse] = await Promise.all([
        axios.get("http://localhost:3000/parts", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3000/part-stock", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
  
      console.log("Données brutes reçues des stocks :", stocksResponse.data); // 🛠 Ajout de log
  
      setParts(partsResponse.data);
  
      // Création du mapping des stocks avec un fallback pour partId
      const stockMap = new Map<string, PartStock>(
        stocksResponse.data.map((stock: any) => [stock.part?.id || stock.partId, stock])
      );
  
      const updatedStocks = partsResponse.data.map((part: Part) => ({
        partId: part.id,
        quantity: stockMap.get(part.id)?.quantity ?? "N/A",
        alertThreshold: stockMap.get(part.id)?.alertThreshold ?? "N/A",
      }));
    
      setStocks(updatedStocks);
      forceUpdate();
      console.log("Stocks mis à jour dans le state React :", updatedStocks);
    } catch (error) {
      console.error("Erreur lors du chargement des pièces et stocks :", error);
      notyf.error("Erreur lors du chargement des stocks !");
    }
  };
  
  // Charger les stocks et pièces au chargement de la page
  useEffect(() => {
    fetchPartsAndStocks();
  }, []);

  const openStockModal = (part: Part) => {
    setSelectedPart(part);
    setIsStockModalOpen(true);
  };

  return (
    <div key={refreshKey} className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des stocks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parts.map((part) => {
        const stock = stocks.find((s) => s.partId === part.id) || {
          partId: part.id,
          quantity: "N/A",
          alertThreshold: "N/A",
        };

        return (
          <div
            key={part.id}
            className={`card shadow-md p-4 cursor-pointer ${
              stock.quantity === "N/A" || stock.quantity === 0 ? "bg-gray-300" : "bg-base-100"
            }`}
            onClick={() => openStockModal(part)}
          >
            <h2 className="text-lg font-bold">{part.name}</h2>
            <p className="text-sm">
              Stock :{" "}
              <span
                className={stock.quantity !== "N/A" && stock.quantity <= stock.alertThreshold ? "text-red-500" : "text-green-600"}
              >
                {stock.quantity}
              </span>
            </p>
            <p className="text-sm">Seuil d'alerte : {stock.alertThreshold}</p>
          </div>
        );
      })}
      </div>

      {selectedPart && (
        <StockModal
          isOpen={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          part={selectedPart}
          refreshStocks={fetchPartsAndStocks} // On passe la fonction pour actualiser
        />
      )}
    </div>
  );
};

export default StockPage;