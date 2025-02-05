import React, { useEffect, useState } from "react";
import axios from "axios";

interface Driver {
  id: string;
  name: string;
  license: string;
  experience: number;
}

const DriverPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupération du token JWT
        const response = await axios.get("http://localhost:3000/drivers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDrivers(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des conducteurs.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) return <p className="text-center text-lg">Chargement des conducteurs...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚗 Liste des Conducteurs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold">{driver.name}</h2>
            <p><strong>Permis :</strong> {driver.license}</p>
            <p><strong>Expérience :</strong> {driver.experience} ans</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverPage;
