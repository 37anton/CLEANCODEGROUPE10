import React, { useState } from "react";
import axios from "axios";
import notyf from "../utils/notyf";

interface CreateDriverModalProps {
  onClose: () => void;
  onCreate: () => void;
}

const CreateDriverModal: React.FC<CreateDriverModalProps> = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    license: "",
    experience: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/drivers", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      notyf.success("Conducteur ajouté !");
      onCreate();
      onClose();
    } catch (error) {
      notyf.error("Erreur lors de l'ajout du conducteur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Ajouter un Conducteur</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Nom :
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" required />
          </label>
          <label className="block mb-2">
            Permis :
            <input type="text" name="license" value={formData.license} onChange={handleChange} className="input input-bordered w-full" required />
          </label>
          <label className="block mb-4">
            Expérience (années) :
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="input input-bordered w-full" required />
          </label>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Ajout en cours..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDriverModal;
