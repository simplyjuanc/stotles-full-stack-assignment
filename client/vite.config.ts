import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:3000',
    }
  },
  plugins: [react()],
});
