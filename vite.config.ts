import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("@atproto")) return "vendor-atproto";
            if (id.includes("@icons-pack")) return "vendor-simple-icons";
            return "vendor"; // bundle react + others together
          }
        }
      }
    }
  }
})
