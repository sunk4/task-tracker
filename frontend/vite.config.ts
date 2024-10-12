import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:8088/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/external-api': {
        target: 'https://task-tracker-37g8.onrender.com/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/external-api/, ''),
      },
    },
  },
  build: {
    sourcemap: true,
  },
  plugins: [react()],
});
