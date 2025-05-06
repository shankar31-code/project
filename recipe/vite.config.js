import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const env =loadEnv(mode,process.cwd());
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:env.VITE_API_URL,
        changeOrigin:true,
        secure:false,
      }
    }
  }

})
