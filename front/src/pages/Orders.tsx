import React, { useEffect, useState } from 'react';

interface Part {
  id: string;
  name: string;
}

interface PartSupplier {
  id: string;
  price: string;
  part: Part;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: string;
  partSupplier: PartSupplier;
}

interface Supplier {
  id: string;
  name: string;
  phone: string;
  deliveryTime: number;
  city: string;
}

export interface Order {
  id: string;
  totalPrice: string;
  expectedDeliveryDate: string;
  status: string;
  supplier: Supplier;
  orderItems: OrderItem[];
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/orders', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des commandes');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🛒 Liste des commandes</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className={`border border-gray-300 p-4 mb-4 rounded-xl ${
            order.status === 'SHIPPED' ? 'bg-green-300' : 'bg-red-300'
          }`}
        >
          <h2>Commande ID : {order.id}</h2>
          <p>
            <strong>Total :</strong> {order.totalPrice} €
          </p>
          <p>
            <strong>Date de livraison prévue :</strong>{' '}
            {new Date(order.expectedDeliveryDate).toLocaleString()}
          </p>
          <p>
            <strong>Statut :</strong> {order.status}
          </p>
          <p>
            <strong>Fournisseur :</strong> {order.supplier?.name}
          </p>
          <h3>Articles de la commande :</h3>
          {order.orderItems.map((item) => (
            <div key={item.id} style={{ marginLeft: '2rem' }}>
              <p>
                <strong>Quantité :</strong> {item.quantity}
              </p>
              <p>
                <strong>Nom :</strong> {item.partSupplier?.part?.name}
              </p>
              <p>
                <strong>Prix :</strong> {item.price} €
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
