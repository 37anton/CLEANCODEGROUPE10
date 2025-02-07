import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Supplier {
  id: string;
  name: string;
  phone: string;
  deliveryTime: number;
  city: string;
}

interface PartSupplier {
  id: string;
  price: number;
  part: {
    id: string;
    name: string;
  };
}

const CreateOrder: React.FC = () => {
  const { supplierId } = useParams<{ supplierId: string }>();
  const [products, setProducts] = useState<PartSupplier[]>([]);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchProducts();
    fetchSupplier();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/part-suppliers/${supplierId}`);
      setProducts(response.data);
      const initialQuantities = response.data.reduce((acc: any, product: PartSupplier) => {
        acc[product.part.id] = 0;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    } catch (err) {
      setError("Erreur lors du chargement des produits.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSupplier = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/suppliers/${supplierId}`);
      setSupplier(response.data);
    } catch (err) {
      setError("Erreur lors du chargement du fournisseur.");
    }
  };

  const handleQuantityChange = (partId: string, value: number) => {
    setQuantities(prev => ({ ...prev, [partId]: value }));
  };

  const totalPrice = products.reduce(
    (total, product) => total + (quantities[product.part.id] || 0) * product.price,
    0
  );

  if (loading) return <p className="text-center text-lg">Chargement des produits...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🛒 Création de Commande</h1>
      <p className="text-lg mt-2">
        Fournisseur sélectionné: <strong>{supplier ? supplier.name : "Chargement..."}</strong>
      </p>

      <div className="mt-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-md shadow-md bg-white my-2">
            <h2 className="text-lg font-semibold">{product.part.name}</h2>
            <p><strong>💰 Prix unitaire :</strong> {product.price}€</p>
            <div className="flex items-center mt-2">
              <label className="mr-2">Quantité :</label>
              <input
                type="number"
                min="0"
                value={quantities[product.part.id]}
                onChange={(e) => handleQuantityChange(product.part.id, parseInt(e.target.value) || 0)}
                className="input input-bordered w-20"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">💵 Total: {totalPrice.toFixed(2)}€</h2>
        <button className="btn btn-primary mt-4 w-full" disabled={totalPrice === 0}>
          ✅ Passer la commande
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
