import Card from "../components/Card";
import UserList from "../components/UserList";
import Orders from "./Orders";


const AdminDashboard = () => {
  return (
    <div className="min-h-screen max-w-screen p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Administration</h1>
      <div role="tablist" className="tabs tabs-bordered">
        <input type="radio" name="administration-tab-users" role="tab" className="tab" aria-label="Utilisateurs" defaultChecked/>
        <div role="tabpanel" className="tab-content p-10">
          <UserList/>
        </div>

        <input
          type="radio"
          name="administration-tab-users"
          role="tab"
          className="tab"
          aria-label="Commandes"
           />
        <div role="tabpanel" className="tab-content p-10">
            <Orders/>
        </div>

        {/* <input type="radio" name="administration-tab-users" role="tab" className="tab" aria-label="Tab 3" />
        <div role="tabpanel" className="tab-content p-10">Tab content 3</div> */}
      </div>

      <div className="mt-10 text-gray-500 text-center">
        🔧 Des informations détaillées seront affichées ici dès que le backend sera prêt.
      </div>
    </div>
  );
};

export default AdminDashboard;