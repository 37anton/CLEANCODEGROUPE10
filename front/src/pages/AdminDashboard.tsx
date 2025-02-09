import Card from "../components/Card";
import UserList from "../components/UserList";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen max-w-screen p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Administration</h1>

      {/* Statistiques en cartes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UserList/>
      </div>

      {/* Placeholder pour les futures données */}
      <div className="mt-10 text-gray-500 text-center">
        🔧 Des informations détaillées seront affichées ici dès que le backend sera prêt.
      </div>
    </div>
  );
};

export default AdminDashboard;