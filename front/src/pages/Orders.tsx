import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

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
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: 'asc' | 'desc' } | null>(null);

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
        setFilteredOrders(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = orders.filter(
      (order) =>
        order.supplier.name.toLowerCase().includes(term.toLowerCase()) ||
        order.status.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleSort = (key: keyof Order) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (key === 'totalPrice' || key === 'expectedDeliveryDate') {
        const aValue = key === 'totalPrice' ? parseFloat(a[key]) : new Date(a[key]).getTime();
        const bValue = key === 'totalPrice' ? parseFloat(b[key]) : new Date(b[key]).getTime();
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (key === 'supplier') {
        const supplierA = a.supplier.name.toLowerCase();
        const supplierB = b.supplier.name.toLowerCase();
        return direction === 'asc' ? supplierA.localeCompare(supplierB) : supplierB.localeCompare(supplierA);
      } else {
        const aValue = Array.isArray(a[key]) ? '' : a[key] || '';  
        const bValue = Array.isArray(b[key]) ? '' : b[key] || '';  
        return direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
    });

    setFilteredOrders(sortedOrders);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Order) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />;
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  const columns: { label: string; key: keyof Order }[] = [
    { label: 'ID', key: 'id' },
    { label: 'Total', key: 'totalPrice' },
    { label: 'Livraison prévue', key: 'expectedDeliveryDate' },
    { label: 'Statut', key: 'status' },
    { label: 'Fournisseur', key: 'supplier' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">🛒 Liste des commandes</h1>

      <Table
        data={filteredOrders}
        columns={columns}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onSort={handleSort}
        sortConfig={sortConfig}
        getSortIcon={getSortIcon}
      />
    </div>
  );
};

export default OrderList;
