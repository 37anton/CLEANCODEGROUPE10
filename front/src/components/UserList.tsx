import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: string;
  isAdmin: boolean;
  company?: {id: string};
  concession?: { id: string };
  client?: { id: string };
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedEmail, setUpdatedEmail] = useState<string>("");
  const [updatedRole, setUpdatedRole] = useState<string>("");
  const [updatedIsAdmin, setUpdatedIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<User[]>("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setUpdatedEmail(user.email);
    setUpdatedRole(user.role);
    setUpdatedIsAdmin(user.isAdmin);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/users/${selectedUser?.id}`,
        {
          email: updatedEmail,
          role: updatedRole,
          isAdmin: updatedIsAdmin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers(); 
      setSelectedUser(null); 
    } catch (err) {
      setError("Erreur lors de la modification de l'utilisateur.");
    }
  };

  if (loading) return <p className="text-center text-lg">Chargement des utilisateurs...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🏭 Liste des Utilisateurs</h1>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-gray-300 p-4 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            <h2 className="text-lg font-semibold">{user.email}</h2>
            <p>Rôle : {user.isAdmin ? "Admin" : "Utilisateur"}</p>
            <p>Entreprise : {user.company?.id ?? "Aucune"}</p>

            {/* Edit Button */}
            <button
              className="mt-2 bg-blue-500 text-white p-2 rounded"
              onClick={() => handleEdit(user)}
            >
              Modifier
            </button>
          </div>
        ))}
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-slate-400 p-6 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">Modifier l'utilisateur</h2>
            <div className="mb-4">
              <label>Email</label>
              <input
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                className="mt-2 p-2 border w-full"
              />
            </div>
            <div className="mb-4">
              <label>Admin</label>
              <input
                type="checkbox"
                checked={updatedIsAdmin}
                onChange={(e) => setUpdatedIsAdmin(e.target.checked)}
                className="mt-2"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleSaveChanges}
              >
                Sauvegarder
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => setSelectedUser(null)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
