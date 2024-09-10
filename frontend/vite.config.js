import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  'process.env': {
    // define env variables here
    VITE_WEBSOCKET_URL: JSON.stringify(process.env.VITE_WEBSOCKET_URL)
  }
})
