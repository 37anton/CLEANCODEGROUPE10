// src/components/ReportFault.tsx
import React, { useState } from 'react';
import axios from 'axios';

export interface Fault {
  id: string;
  vehicleId: string;
  reportedDate: string;
  description: string;
  type: 'BREAKDOWN' | 'WARRANTY';
  status: 'REPORTED' | 'IN_REPAIR' | 'REPAIRED' | 'CLOSED';
  repairDate?: string;
  repairCost?: number;
  correctiveActions?: string;
  warrantyDetails?: string;
}

const ReportFault: React.FC = () => {
  const [faultData, setFaultData] = useState<Partial<Fault>>({
    vehicleId: '',
    description: '',
    type: 'BREAKDOWN',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFaultData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Fault>('http://localhost:3000/fault/report', faultData);
      setMessage('Fault reported successfully with ID: ' + response.data.id);
    } catch (err) {
      console.error(err);
      setMessage('Error reporting fault.');
    }
  };

  return (
    <div>
      <h2>Report Fault</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle ID:</label>
          <input type="text" name="vehicleId" value={faultData.vehicleId || ''} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={faultData.description || ''} onChange={handleChange} required />
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={faultData.type || 'BREAKDOWN'} onChange={handleChange}>
            <option value="BREAKDOWN">Breakdown</option>
            <option value="WARRANTY">Warranty</option>
          </select>
        </div>
        <button type="submit">Report Fault</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReportFault;
