import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Supplier {
  id: string;
  name: string;
  phone: string;
  deliveryTime: number;
  city: string;
}

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/suppliers");
      setSuppliers(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des fournisseurs.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = (supplierId: string) => {
    navigate(`/create-order/${supplierId}`);
  };

  if (loading) return <p className="text-center text-lg">Chargement des fournisseurs...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🏭 Liste des Fournisseurs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition"
          >
            <h2 className="text-lg font-semibold">{supplier.name}</h2>
            <p><strong>📍 Ville :</strong> {supplier.city}</p>
            <p><strong>📞 Téléphone :</strong> {supplier.phone}</p>
            <p><strong>⏳ Délai de livraison :</strong> {supplier.deliveryTime} jours</p>
            <button
              className="btn btn-primary mt-2 w-full"
              onClick={() => handleCreateOrder(supplier.id)}
            >
              🛒 Commander
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;