// src/pages/MotorcycleManagement.tsx
import React from 'react';
import CreateMotorcycle from '../components/CreateMotorcycle';
import MotorcycleList from '../components/MotorcycleList';

const MotorcycleManagement: React.FC = () => {
  return (
    <div>
      <CreateMotorcycle />
      <MotorcycleList />
    </div>
  );
};

export default MotorcycleManagement;
