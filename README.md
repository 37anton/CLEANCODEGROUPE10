copier le contenu de .env.exemple dans un nouveau fichier .env à la racine du projet

cd back
npm install

cd front
npm install

lancer le front: 
cd front
npm run dev
-> http://localhost:5173/

lancer mongo, postgres, et nest js : 
à la racine du projet
docker-compose up --build
-> http://localhost:3000/

se connecter à postgres : 
docker exec -it cleancodegroupe10-postgres-1 psql -U postgres -d my_postgres_db
\l commande pour regarder les bdd disponibles
\c my_postgres_db pour accéder à ta base my_postgres_db
\dt pour regarder les tables
