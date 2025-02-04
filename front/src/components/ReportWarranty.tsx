// src/components/ReportWarranty.tsx
import React, { useState } from 'react';
import axios from 'axios';

export interface Warranty {
  id: string;
  motorcycle: { id: string };
  startDate: string;
  endDate: string;
}

const ReportWarranty: React.FC = () => {
  const [warrantyData, setWarrantyData] = useState<{ motorcycleId: string; startDate: string; endDate: string }>({
    motorcycleId: '',
    startDate: '',
    endDate: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWarrantyData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Le body attendu est { motorcycle: { id: string }, startDate: string, endDate: string }
      const response = await axios.post<Warranty>('http://localhost:3000/warranty/report', {
        motorcycle: { id: warrantyData.motorcycleId },
        startDate: warrantyData.startDate,
        endDate: warrantyData.endDate,
      });
      setMessage('Warranty reported successfully with ID: ' + response.data.id);
    } catch (err) {
      console.error(err);
      setMessage('Error reporting warranty.');
    }
  };

  return (
    <div>
      <h2>Report Warranty</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Motorcycle ID:</label>
          <input type="text" name="motorcycleId" value={warrantyData.motorcycleId} onChange={handleChange} required />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={warrantyData.startDate} onChange={handleChange} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="endDate" value={warrantyData.endDate} onChange={handleChange} required />
        </div>
        <button type="submit">Report Warranty</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReportWarranty;
