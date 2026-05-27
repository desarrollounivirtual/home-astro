import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

export default defineConfig({
  output: 'static', // Compilación estática pura para máximo rendimiento y hosting gratuito
  site: 'https://aulasunivirtuales.com',
  integrations: [
    tailwind({
      applyBaseStyles: false, // Los estilos base se controlan en global.css
    }),
    react(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN || '3eqaktHo70jcrqzTOFVpRAtt',
      enableFallbackComponent: true, // Evita que la web rompa si un bloque no está definido localmente
      components: {
        page: 'storyblok/Page',
        hero: 'storyblok/Hero',
        methodology: 'storyblok/Methodology',
        benefits: 'storyblok/Benefits',
        platformPromo: 'storyblok/PlatformPromo',
        testimonials: 'storyblok/Testimonials',
        coverage: 'storyblok/Coverage',
        paymentMethods: 'storyblok/PaymentMethods',
        contactForms: 'storyblok/ContactForms',
        textImageRow: 'storyblok/TextImageRow',
        ctaBanner: 'storyblok/CtaBanner',
        featuresGrid: 'storyblok/FeaturesGrid',
        imageBanner: 'storyblok/ImageBanner',
        imageCarousel: 'storyblok/ImageCarousel',
        imageGallery: 'storyblok/ImageGallery',
        accordionSection: 'storyblok/AccordionSection',
      }
    })
  ],
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true
    }
  }
});
