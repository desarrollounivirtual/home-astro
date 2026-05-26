import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  output: 'static', // Generación estática pura (SSG)
  site: 'https://aulasunivirtuales.com',
  integrations: [
    tailwind({
      applyBaseStyles: false, // Los estilos base se controlan en global.css
    }),
    react(),
    ...(isProd ? [] : [keystatic()])
  ],
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true
    }
  }
});
