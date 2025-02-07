import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import notyf from "../utils/notyf";

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
  const navigate = useNavigate();
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
        acc[product.id] = 0;
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

  const handleQuantityChange = (partSupplierId: string, value: number) => {
    setQuantities(prev => ({ ...prev, [partSupplierId]: value }));
  };

  const totalPrice = products.reduce(
    (total, product) => total + (quantities[product.id] || 0) * product.price,
    0
  );

  const handleOrderSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        notyf.error("Vous devez être connecté pour passer une commande.");
        return;
      }

      // Filtrer uniquement les produits dont la quantité > 0
      const orderItems = Object.entries(quantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(([partSupplierId, quantity]) => ({ partSupplierId, quantity }));

      if (orderItems.length === 0) {
        notyf.error("Veuillez sélectionner au moins un produit.");
        return;
      }

      const requestBody = {
        supplierId,
        items: orderItems,
      };

      await axios.post("http://localhost:3000/orders", requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      });

      notyf.success("Commande passée avec succès !");
      navigate("/orders");
    } catch (err) {
      notyf.error("Erreur lors de la création de la commande.");
    }
  };

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
                value={quantities[product.id]}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                className="input input-bordered w-20"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">💵 Total: {totalPrice.toFixed(2)}€</h2>
        <button
          className="btn btn-primary mt-4 w-full"
          disabled={totalPrice === 0}
          onClick={handleOrderSubmit}
        >
          ✅ Passer la commande
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;