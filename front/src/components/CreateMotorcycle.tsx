import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import notyf from "../utils/notyf";

interface CreateMotorcycleDto {
  vin: string;
  model: string;
  manufactureDate: string;
  lastMaintenanceDate: string;
  mileage: number;
  lastMaintenanceMileage: number;
}

interface IntervalDefinition {
  id: string;
  model: string;
  km: number;
  timeInYears: number;
}

interface CreateMotorcycleProps {
  refreshList: () => void;
}

const CreateMotorcycle: React.FC<CreateMotorcycleProps> = ({ refreshList }) => {
  const { token } = useAuth();

  const [vin, setVin] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [manufactureDate, setManufactureDate] = useState<string>("");
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState<string>("");
  const [mileage, setMileage] = useState<number>(0);
  const [lastMaintenanceMileage, setLastMaintenanceMileage] = useState<number>(0);
  const [intervalDefinitions, setIntervalDefinitions] = useState<IntervalDefinition[]>([]);
  const [message] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntervalDefinitions = async () => {
      try {
        const response = await axios.get<IntervalDefinition[]>(
          "http://localhost:3000/interval-definitions",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIntervalDefinitions(response.data);
        if (response.data.length > 0) {
          setModel(response.data[0].model);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des définitions d'intervalle", error);
      }
    };
    fetchIntervalDefinitions();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dto: CreateMotorcycleDto = {
      vin,
      model,
      manufactureDate,
      lastMaintenanceDate,
      mileage,
      lastMaintenanceMileage,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/motorcycles/create",
        dto,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Moto créée :", response.data);
      notyf.success("Moto créée avec succès !");
      refreshList();
    } catch (error) {
      console.error("Erreur lors de la création de la moto", error);
      notyf.error("Erreur lors de la création de la moto");

    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 mb-6">
      <h1 className="text-2xl font-bold mb-4">Créer une moto</h1>
      <div className="form-control">
        <label className="label">
          <span className="label-text">VIN :</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Modèle :</span>
        </label>
        <select
          className="select select-bordered"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        >
          {intervalDefinitions.map((def) => (
            <option key={def.id} value={def.model}>
              {def.model}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date de fabrication :</span>
          </label>
          <input
            type="date"
            className="input input-bordered"
            value={manufactureDate}
            onChange={(e) => setManufactureDate(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date du dernier entretien :</span>
          </label>
          <input
            type="date"
            className="input input-bordered"
            value={lastMaintenanceDate}
            onChange={(e) => setLastMaintenanceDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Kilométrage :</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Kilométrage du dernier entretien :</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={lastMaintenanceMileage}
            onChange={(e) => setLastMaintenanceMileage(Number(e.target.value))}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4">Créer Moto</button>
      {message && <div className="alert alert-info mt-4">{message}</div>}
    </form>
  );
};

export default CreateMotorcycle;
