import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuration du serveur pour le polling
  server: {
    watch: {
      usePolling: true, // Forcer l'utilisation du polling
    },
    host: true, // Pour permettre l'accès via le réseau si besoin
  },

})
