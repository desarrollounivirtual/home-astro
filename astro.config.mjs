import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

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
        // Mapeamos los componentes con sus nombres técnicos reales en minúscula procedentes de la API de Storyblok
        page: 'storyblok/Page',
        hero: 'storyblok/Hero',
        univirtualBanner: 'storyblok/UnivirtualBanner',
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
        textTicker: 'storyblok/TextTicker',
        tickerItem: 'storyblok/TickerItem',
        teachersSection: 'storyblok/TeachersSection',
        teacherCard: 'storyblok/TeacherCard',
        benefitCard: 'storyblok/BenefitCard',
        methodologyStep: 'storyblok/MethodologyStep',
        coveragePillar: 'storyblok/CoveragePillar',
      }
    })
  ],
  compressHTML: true,
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true
    },
    build: {
      cssMinify: true
    }
  }
});
