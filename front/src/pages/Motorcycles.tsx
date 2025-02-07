import React from "react";
import CreateMotorcycle from "../components/CreateMotorcycle";
import MotorcycleList from "../components/MotorcycleList";

const Motorcycles: React.FC = () => {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Motos</h1>
      {/* Formulaire de création */}
      <CreateMotorcycle />
      {/* Liste des motos */}
      <MotorcycleList />
    </div>
  );
};

export default Motorcycles;
