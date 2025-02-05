import React, { useState } from "react";
import axios from "axios";
import notyf from "../utils/notyf";

interface Driver {
  id: string;
  name: string;
  license: string;
  experience: number;
}

interface EditDriverModalProps {
  driver: Driver | null;
  onClose: () => void;
  onUpdate: () => void;
}

const EditDriverModal: React.FC<EditDriverModalProps> = ({ driver, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: driver?.name || "",
    license: driver?.license || "",
    experience: driver?.experience || 0,
  });
  const [loading, setLoading] = useState(false);

  if (!driver) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:3000/drivers/${driver.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      notyf.success("Informations mises à jour !");
      onUpdate();
      onClose();
    } catch (error) {
      notyf.error("Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Modifier {driver.name}</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Nom :
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" />
          </label>
          <label className="block mb-2">
            Permis :
            <input type="text" name="license" value={formData.license} onChange={handleChange} className="input input-bordered w-full" />
          </label>
          <label className="block mb-4">
            Expérience (années) :
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="input input-bordered w-full" />
          </label>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Enregistrement..." : "Modifier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDriverModal;
