// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './client',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'client/index.html'),
        analytics: resolve(__dirname, 'client/analytics.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
