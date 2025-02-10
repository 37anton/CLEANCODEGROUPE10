import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiChevronUp, FiChevronDown } from "react-icons/fi";
import Table from '../components/Table';

interface User {
  id: string;
  email: string;
  role: string;
  isAdmin: boolean;
  company?: { id: string };
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: "asc" | "desc" } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<User[]>("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Erreur lors du chargement des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => setSelectedUser(user);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        user.company?.id.includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
  
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (key === "company") {
        const companyA = a.company?.id ?? ""; 
        const companyB = b.company?.id ?? "";
        return direction === "asc" ? companyA.localeCompare(companyB) : companyB.localeCompare(companyA);
      } else {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    });
  
    setFilteredUsers(sortedUsers);
    setSortConfig({ key, direction });
  };
  

  const getSortIcon = (key: keyof User) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <FiChevronUp /> : <FiChevronDown />;
  };

  if (loading) return <p className="text-center text-lg">Chargement des utilisateurs...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const columns: { label: string; key: keyof User }[] = [
      { label: 'ID', key: 'id' },
      { label: 'Email', key: 'email' },
      { label: 'Rôle', key: 'isAdmin' },
      { label: 'Entreprise', key: 'company' }
    ];
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">🛒 Liste des commandes</h1>
  
        <Table
          data={filteredUsers}
          columns={columns}
          onSearch={handleSearch}
          searchTerm={searchTerm}
          onSort={handleSort}
          sortConfig={sortConfig}
          getSortIcon={getSortIcon}
        />
      </div>
    );
};

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
  const [updatedEmail, setUpdatedEmail] = useState(user.email);
  const [updatedIsAdmin, setUpdatedIsAdmin] = useState(user.isAdmin);
  const [error, setError] = useState<string | null>(null);

  const handleSaveChanges = async () => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/users/${user.id}`,
        { email: updatedEmail, isAdmin: updatedIsAdmin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onSave();
      onClose();
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Erreur lors de la modification de l'utilisateur.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-1/3 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Modifier l'utilisateur</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
          <input
            type="checkbox"
            checked={updatedIsAdmin} 
            onChange={(e) => setUpdatedIsAdmin(e.target.checked)} 
            className="mt-2 p-2 mr-2 border rounded inline"
          />
          <label className="inline font-medium">Admin</label>


        </div>

        <div className="flex justify-between">
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition" onClick={handleSaveChanges}>
            Sauvegarder
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
