import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  
  // Singletons (Páginas estructuradas únicas)
  singletons: {
    home: singleton({
      label: 'Página de Inicio (Home)',
      path: 'src/content/home',
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
        
        // El Editor Enriquecido con Bloques de Construcción
        content: fields.document({
          label: 'Diseño de la Página (Bloques)',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
          
          // AQUÍ CREAMOS LOS BLOQUES DE DISEÑO MÓDULOS (Filas, Columnas, etc.)
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
                      label: 'Icono del Bloque',
                      options: [
                        { label: 'Estudiante / Gorro', value: 'cap' },
                        { label: 'Check / Aprobado', value: 'check' },
                        { label: 'Estrella / Destacado', value: 'star' },
                        { label: 'Celular / Dispositivo', value: 'phone' }
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
            }

          }
        })
      }
    })
  }
});
