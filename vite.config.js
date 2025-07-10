import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite que el servidor sea accesible desde redes externas
    origin: 'https://08b7e14114f4.ngrok-free.app', // (opcional) si querés forzar un origin para HMR
    strictPort: true,
    port: 5174
    , // 💥 Cambiá este valor al puerto que quieras

    // Si necesitás HMR (opcional):
    hmr: {
      host: '08b7e14114f4.ngrok-free.app',
      protocol: 'wss',
    },
  },
})
