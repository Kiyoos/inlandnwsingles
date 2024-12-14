import { resolve } from 'path';
import { defineConfig } from 'vite';
// import dotenv from 'dotenv';

export default defineConfig({
  root: 'src/',
  // dotenv: dotenv.config(),

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        activities: resolve(__dirname, 'src/activities/index.html'),
        newsletter: resolve(__dirname, 'src/newsletter/index.html'),
      },
    },
  },
});
