copier le contenu de .env.exemple dans un nouveau fichier .env à la racine du projet :
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=clean_code
POSTGRES_URI=postgresql://postgres:postgres@postgres:5432
STORAGE_ADAPTER=in-memory
JWT_SECRET=mySuperSecretKey

faire un .env dans /front

faire docker-compose up

cd back
npm install

cd front
npm install

lancer le front: 
cd front
npm run dev
-> http://localhost:5173/



se connecter à postgres sur adminer :
localhost:8080
serveur : postgres
utilisateur : postgres
mdp : postgres
base de données clean_code

lancer les fixtures : docker compose exec backend npm run db:seed:up



Un cron est déclenché tous les jours à 4h du matin pour déclencher des notifications concernant les seuils des stocks.
Si un produit a une quantité < au stock, tous les utilisateurs liés à ce stock (via Company, Concession, ou Client) ils auront une notification disponibles sur /notifications
