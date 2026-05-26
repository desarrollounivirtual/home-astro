import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  
  // Singletons (Páginas estructuradas únicas)
  singletons: {
    home: singleton({
      label: 'Página de Inicio (Home)',
      path: 'src/content/home/index',
      format: { data: 'json' },
      schema: {
        // Pestaña Hero
        heroTitle: fields.text({ label: 'Título Principal (H1)', defaultValue: 'Validación de bachillerato en 10 meses' }),
        heroSubtitle: fields.text({ 
          label: 'Subtexto del Hero', 
          defaultValue: 'Obtén tu título de Bachiller Académico de forma 100% virtual. Estudia a tu propio ritmo 24/7 con plataforma de autogestión y docentes calificados. Ceremonia física de graduación en Medellín con ICFES incluido. ¡Sí es posible avanzar!',
          multiline: true
        }),
        heroCtaText: fields.text({ label: 'Texto del Botón Principal (CTA)', defaultValue: 'Inscribirme ahora' }),
        heroCtaLink: fields.text({ label: 'Enlace del Botón Principal (CTA)', defaultValue: '#inscripcion' }),
        
        // Pestaña Pasarela de Pagos
        paymentsTitle: fields.text({ label: 'Título Sección de Pagos', defaultValue: 'Realiza tus pagos de forma fácil y segura' }),
        paymentsSubtitle: fields.text({ label: 'Subtítulo Sección de Pagos', defaultValue: 'Utiliza nuestro portal centralizado de pagos para realizar tus matrículas y mensualidades al instante desde cualquier lugar de Colombia.' }),
        paymentsLink: fields.text({ label: 'Enlace de Pasarela Júpiter Pagos', defaultValue: 'https://jupiter.aulasunivirtuales.com/pagar' }),
        
        // Listado Dinámico de Testimonios
        testimonials: fields.array(
          fields.object({
            name: fields.text({ label: 'Nombre del Estudiante' }),
            role: fields.text({ label: 'Rol / Ciclo (Ej: Graduado - Ciclo VI)' }),
            location: fields.text({ label: 'Ubicación (Ej: Medellín, Antioquia)' }),
            rating: fields.select({
              label: 'Calificación (Estrellas)',
              options: [
                { label: '5 Estrellas', value: '5' },
                { label: '4 Estrellas', value: '4' }
              ],
              defaultValue: '5'
            }),
            quote: fields.text({ label: 'Testimonio / Cita', multiline: true })
          }),
          {
            label: 'Testimonios de Estudiantes',
            itemLabel: (item) => item.fields.name.value || 'Testimonio'
          }
        )
      }
    })
  },

  // Colecciones (Para crear múltiples landings e infopages dinámicas como Elementor/Wordpress)
  collections: {
    pages: collection({
      label: 'Páginas y Landings (Dynamic Builder)',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Título de la Página' } }),
        description: fields.text({ label: 'Meta Descripción (Para SEO en Google)', multiline: true }),
        
        // El Editor Enriquecido con Bloques de Construcción Ultra Robustos
        content: fields.document({
          label: 'Diseño de la Página (Bloques)',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/pages',
            publicPath: '/images/pages'
          },
          
          // AQUÍ CREAMOS LOS BLOQUES DE DISEÑO MÓDULOS (Filas, Columnas, Carruseles, Banners)
          componentBlocks: {
            
            // 1. Bloque: Fila de Texto e Imagen
            textImageRow: {
              label: 'Fila: Texto con Imagen al Lado',
              schema: {
                title: fields.text({ label: 'Título de la Fila' }),
                body: fields.text({ label: 'Texto descriptivo', multiline: true }),
                image: fields.image({
                  label: 'Imagen',
                  directory: 'public/images/landings',
                  publicPath: '/images/landings'
                }),
                align: fields.select({
                  label: 'Alineación de la Imagen',
                  options: [
                    { label: 'Imagen a la Izquierda', value: 'left' },
                    { label: 'Imagen a la Derecha', value: 'right' }
                  ],
                  defaultValue: 'right'
                })
              }
            },

            // 2. Bloque: Banner de Llamado a la Acción (CTA)
            ctaBanner: {
              label: 'Fila: Banner Destacado (Llamado a la Acción)',
              schema: {
                title: fields.text({ label: 'Título del Banner' }),
                subtitle: fields.text({ label: 'Subtexto del Banner' }),
                buttonText: fields.text({ label: 'Texto del Botón' }),
                buttonLink: fields.text({ label: 'Enlace del Botón (Ej: https://... o #inscripcion)' }),
                accent: fields.select({
                  label: 'Color de Acento del Banner',
                  options: [
                    { label: 'Naranja Corporativo', value: 'orange' },
                    { label: 'Azul Júpiter', value: 'blue' }
                  ],
                  defaultValue: 'orange'
                })
              }
            },

            // 3. Bloque: Grid de Características (Columnas)
            featuresGrid: {
              label: 'Fila: Grid de Características (Columnas)',
              schema: {
                sectionTitle: fields.text({ label: 'Título de la Sección' }),
                columns: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Título de la Columna' }),
                    description: fields.text({ label: 'Descripción de la Columna', multiline: true }),
                    icon: fields.select({
                      label: 'Icono del Bloque (Premium SVG)',
                      options: [
                        { label: 'Estudiante / Gorro', value: 'cap' },
                        { label: 'Check / Aprobado', value: 'check' },
                        { label: 'Estrella / Destacado', value: 'star' },
                        { label: 'Celular / Dispositivo', value: 'phone' },
                        { label: 'Pesos / Dinero', value: 'currency' },
                        { label: 'Soporte / Ayuda', value: 'support' },
                        { label: 'Plataforma / Computador', value: 'computer' }
                      ],
                      defaultValue: 'check'
                    })
                  }),
                  {
                    label: 'Columnas de Información',
                    itemLabel: (item) => item.fields.title.value || 'Columna'
                  }
                )
              }
            },

            // 4. Bloque: Banner de Imagen Premium de Fondo (imageBanner)
            imageBanner: {
              label: 'Bloque: Banner Premium con Imagen de Fondo',
              schema: {
                title: fields.text({ label: 'Título del Banner' }),
                subtitle: fields.text({ label: 'Subtítulo del Banner', multiline: true }),
                image: fields.image({
                  label: 'Imagen de Fondo',
                  directory: 'public/images/banners',
                  publicPath: '/images/banners'
                }),
                ctaText: fields.text({ label: 'Texto del Botón (CTA)' }),
                ctaLink: fields.text({ label: 'Enlace del Botón' }),
                overlayOpacity: fields.select({
                  label: 'Opacidad del Filtro Oscuro (Overlay)',
                  options: [
                    { label: 'Sin Filtro (0%)', value: 'none' },
                    { label: 'Filtro Suave (20%)', value: 'opacity-20' },
                    { label: 'Filtro Medio (40%)', value: 'opacity-40' },
                    { label: 'Filtro Oscuro (60%)', value: 'opacity-60' },
                    { label: 'Filtro Muy Oscuro (80%)', value: 'opacity-80' }
                  ],
                  defaultValue: 'opacity-40'
                }),
                align: fields.select({
                  label: 'Alineación del Contenido',
                  options: [
                    { label: 'Centrado', value: 'center' },
                    { label: 'Izquierda', value: 'left' },
                    { label: 'Derecha', value: 'right' }
                  ],
                  defaultValue: 'center'
                })
              }
            },

            // 5. Bloque: Carrusel de Diapositivas Interactivo (imageCarousel)
            imageCarousel: {
              label: 'Bloque: Carrusel / Slider de Diapositivas',
              schema: {
                title: fields.text({ label: 'Título General del Carrusel (Opcional)' }),
                slides: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Título de la Diapositiva' }),
                    subtitle: fields.text({ label: 'Descripción Corta', multiline: true }),
                    image: fields.image({
                      label: 'Imagen',
                      directory: 'public/images/carousels',
                      publicPath: '/images/carousels'
                    }),
                    ctaText: fields.text({ label: 'Texto del Botón (Opcional)' }),
                    ctaLink: fields.text({ label: 'Enlace del Botón (Opcional)' })
                  }),
                  {
                    label: 'Diapositivas (Slides)',
                    itemLabel: (item) => item.fields.title.value || 'Diapositiva'
                  }
                )
              }
            },

            // 6. Bloque: Galería de Imágenes en Grid (imageGallery)
            imageGallery: {
              label: 'Bloque: Galería de Imágenes en Cuadrícula',
              schema: {
                sectionTitle: fields.text({ label: 'Título de la Sección (Opcional)' }),
                columns: fields.select({
                  label: 'Número de Columnas',
                  options: [
                    { label: '2 Columnas', value: '2' },
                    { label: '3 Columnas', value: '3' },
                    { label: '4 Columnas', value: '4' }
                  ],
                  defaultValue: '3'
                }),
                images: fields.array(
                  fields.object({
                    image: fields.image({
                      label: 'Imagen',
                      directory: 'public/images/gallery',
                      publicPath: '/images/gallery'
                    }),
                    caption: fields.text({ label: 'Pie de Foto / Título Corto' })
                  }),
                  {
                    label: 'Imágenes de la Galería',
                    itemLabel: (item) => item.fields.caption.value || 'Imagen de Galería'
                  }
                )
              }
            },

            // 7. Bloque: Sección de Acordeón / FAQs (accordionSection)
            accordionSection: {
              label: 'Bloque: Pestañas de Acordeón (FAQs / Soporte)',
              schema: {
                title: fields.text({ label: 'Título del Acordeón', defaultValue: 'Preguntas Frecuentes' }),
                items: fields.array(
                  fields.object({
                    question: fields.text({ label: 'Pregunta / Título del Panel' }),
                    answer: fields.text({ label: 'Respuesta / Contenido', multiline: true })
                  }),
                  {
                    label: 'Paneles del Acordeón',
                    itemLabel: (item) => item.fields.question.value || 'Pregunta'
                  }
                )
              }
            }

          }
        })
      }
    })
  }
});
