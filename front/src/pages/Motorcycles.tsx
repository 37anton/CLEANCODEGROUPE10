import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateMotorcycle from "../components/CreateMotorcycle";
import MotorcycleList from "../components/MotorcycleList";
import { useAuth } from "../context/AuthContext";

export interface Motorcycle {
  id: string;
  vin: string;
  model: string;
  manufactureDate: string;
  lastMaintenanceDate: string;
  mileage: number;
  lastMaintenanceMileage: number;
}

const Motorcycles: React.FC = () => {
  const { token } = useAuth();
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  const fetchMotorcycles = async () => {
    try {
      const response = await axios.get<Motorcycle[]>("http://localhost:3000/motorcycles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMotorcycles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des motos", error);
    }
  };

  useEffect(() => {
    fetchMotorcycles();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🏍️ Gestion des Motos</h1>
      <CreateMotorcycle refreshList={fetchMotorcycles} />
      <MotorcycleList motorcycles={motorcycles} />
    </div>
  );
};

export default Motorcycles;
