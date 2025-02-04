// src/components/ReportIncident.tsx
import React, { useState } from 'react';
import axios from 'axios';

export interface Incident {
  id: string;
  motorcycle: { id: string };
  incidentDate: string;
  description: string;
}

interface ReportIncidentProps {
  onIncidentReported?: (incident: Incident) => void;
}

const ReportIncident: React.FC<ReportIncidentProps> = ({ onIncidentReported }) => {
  const [incidentData, setIncidentData] = useState<{ motorcycleId: string; description: string }>({
    motorcycleId: '',
    description: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIncidentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Le body attendu par le endpoint est { motorcycle: { id: string }, description: string }
      const response = await axios.post<Incident>('http://localhost:3000/incident/report', {
        motorcycle: { id: incidentData.motorcycleId },
        description: incidentData.description,
      });
      setMessage('Incident reported successfully with ID: ' + response.data.id);
      if (onIncidentReported) onIncidentReported(response.data);
    } catch (err) {
      console.error(err);
      setMessage('Error reporting incident.');
    }
  };

  return (
    <div>
      <h2>Report Incident</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Motorcycle ID:</label>
          <input
            type="text"
            name="motorcycleId"
            value={incidentData.motorcycleId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={incidentData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Report Incident</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReportIncident;
