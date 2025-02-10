import Card from "../components/Card";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="🚗 Motos gérées" value="--" />
        <Card title="🛠️ Entretiens en attente" value="--" />
        <Card title="📦 Pièces en stock" value="--" />
      </div>

      <div className="mt-10 text-gray-500 text-center">
        🔧 Des informations détaillées seront affichées ici dès que le backend sera prêt.
      </div>
    </div>
  );
};

export default Dashboard;