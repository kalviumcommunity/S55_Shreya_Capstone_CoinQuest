import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/categories': 'http://localhost:3000',
      '/assign-amount': 'http://localhost:3000',
      '/budgets': 'http://localhost:3000',
    }
  }
});
