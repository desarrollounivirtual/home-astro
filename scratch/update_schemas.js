const fs = require('fs');
const path = require('path');

const rootJsonPath = path.join(__dirname, '..', '.storyblok', 'components.292777462476225.json');
const nestedJsonPath = path.join(__dirname, '..', '.storyblok', 'components', '292777462476225', 'components.json');

// 1. Definición de los nuevos sub-componentes
const benefitCard = {
  name: 'benefitCard',
  display_name: 'Tarjeta de Beneficio',
  is_root: false,
  is_nestable: true,
  schema: {
    title: { type: 'text', display_name: 'Título del Beneficio' },
    description: { type: 'textarea', display_name: 'Descripción del Beneficio' },
    icon: {
      type: 'option',
      display_name: 'Icono del Beneficio',
      options: [
        { name: 'Cohete (rocket)', value: 'rocket' },
        { name: 'Birrete (cap)', value: 'cap' },
        { name: 'Reloj / Calendario (clock)', value: 'clock' },
        { name: 'Computadora (computer)', value: 'computer' },
        { name: 'Estrella (star)', value: 'star' },
        { name: 'Aprobado (check)', value: 'check' },
        { name: 'Dinero (currency)', value: 'currency' },
        { name: 'Soporte (support)', value: 'support' },
        { name: 'Libro (book)', value: 'book' },
        { name: 'Medalla (medal)', value: 'medal' }
      ],
      default_value: 'rocket'
    },
    image: { type: 'asset', filetypes: ['images'], display_name: 'Imagen Opcional (Anula el icono si se sube)' },
    accent: {
      type: 'option',
      display_name: 'Color de Acento',
      options: [
        { name: 'Naranja', value: 'orange' },
        { name: 'Azul', value: 'blue' }
      ],
      default_value: 'orange'
    }
  }
};

const methodologyStep = {
  name: 'methodologyStep',
  display_name: 'Paso Metodológico',
  is_root: false,
  is_nestable: true,
  schema: {
    number: { type: 'text', display_name: 'Número de Paso (Ej: 01)' },
    title: { type: 'text', display_name: 'Título del Paso' },
    description: { type: 'textarea', display_name: 'Descripción del Paso' },
    icon: {
      type: 'option',
      display_name: 'Icono de Paso',
      options: [
        { name: 'Documento / Matrícula (document)', value: 'document' },
        { name: 'Computadora / Plataforma (computer)', value: 'computer' },
        { name: 'Birrete / Profesores (cap)', value: 'cap' },
        { name: 'Estrella / Certificado (star)', value: 'star' },
        { name: 'Cohete (rocket)', value: 'rocket' },
        { name: 'Reloj (clock)', value: 'clock' },
        { name: 'Libro (book)', value: 'book' },
        { name: 'Medalla (medal)', value: 'medal' },
        { name: 'Aprobado (check)', value: 'check' }
      ],
      default_value: 'document'
    },
    image: { type: 'asset', filetypes: ['images'], display_name: 'Imagen Opcional (Anula el icono)' },
    label: { type: 'text', display_name: 'Etiqueta Inferior (Ej: Paso Inicial)' },
    accent: {
      type: 'option',
      display_name: 'Color de Acento',
      options: [
        { name: 'Naranja', value: 'orange' },
        { name: 'Azul', value: 'blue' }
      ],
      default_value: 'orange'
    }
  }
};

const coveragePillar = {
  name: 'coveragePillar',
  display_name: 'Pilar de Cobertura',
  is_root: false,
  is_nestable: true,
  schema: {
    title: { type: 'text', display_name: 'Título de Pilar' },
    description: { type: 'textarea', display_name: 'Descripción de Pilar' },
    icon: {
      type: 'option',
      display_name: 'Icono del Pilar',
      options: [
        { name: 'Mapa / Ubicación (map)', value: 'map' },
        { name: 'Medalla / Graduación (medal)', value: 'medal' },
        { name: 'Portapapeles / ICFES (clipboard)', value: 'clipboard' },
        { name: 'Estrella (star)', value: 'star' },
        { name: 'Aprobado (check)', value: 'check' },
        { name: 'Birrete (cap)', value: 'cap' },
        { name: 'Computadora (computer)', value: 'computer' },
        { name: 'Cohete (rocket)', value: 'rocket' }
      ],
      default_value: 'map'
    },
    image: { type: 'asset', filetypes: ['images'], display_name: 'Imagen Opcional (Anula el icono)' },
    label: { type: 'text', display_name: 'Etiqueta Inferior (Ej: Estudia desde donde estés)' },
    accent: {
      type: 'option',
      display_name: 'Color de Acento',
      options: [
        { name: 'Azul', value: 'blue' },
        { name: 'Naranja', value: 'orange' }
      ],
      default_value: 'blue'
    }
  }
};

// 2. Función para actualizar la lista de componentes
function updateComponentsArray(components) {
  // Encontrar y actualizar 'benefits'
  const benefits = components.find(c => c.name === 'benefits');
  if (benefits) {
    benefits.schema = {
      tagline: { type: 'text', display_name: 'Tagline / Subtítulo Superior' },
      title: { type: 'text', display_name: 'Título Principal (Soporta <span class="text-gradient-blue">)' },
      description: { type: 'textarea', display_name: 'Descripción de Párrafo' },
      items: { type: 'bloks', display_name: 'Elementos de Beneficios', component_whitelist: ['benefitCard'] },
      spacingUnit: { type: 'option', options: [{ name: 'px', value: 'px' }, { name: 'rem', value: 'rem' }], default_value: 'px' },
      paddingTopDesktop: { type: 'text', display_name: 'Padding Superior (PC)' },
      paddingBottomDesktop: { type: 'text', display_name: 'Padding Inferior (PC)' }
    };
    console.log('✓ benefits actualizado');
  }

  // Encontrar y actualizar 'methodology'
  const methodology = components.find(c => c.name === 'methodology');
  if (methodology) {
    methodology.schema = {
      tagline: { type: 'text', display_name: 'Tagline / Subtítulo Superior' },
      title: { type: 'text', display_name: 'Título Principal (Soporta <span class="text-gradient-orange">)' },
      description: { type: 'textarea', display_name: 'Descripción de Párrafo' },
      steps: { type: 'bloks', display_name: 'Pasos Metodológicos', component_whitelist: ['methodologyStep'] },
      calloutTitle: { type: 'text', display_name: 'Banner: Título de Licencia' },
      calloutDescription: { type: 'textarea', display_name: 'Banner: Texto del Aval' },
      calloutBtnText: { type: 'text', display_name: 'Banner: Texto del Botón' },
      calloutBtnLink: { type: 'text', display_name: 'Banner: Enlace de Matrícula' },
      spacingUnit: { type: 'option', options: [{ name: 'px', value: 'px' }, { name: 'rem', value: 'rem' }], default_value: 'px' },
      paddingTopDesktop: { type: 'text', display_name: 'Padding Superior (PC)' },
      paddingBottomDesktop: { type: 'text', display_name: 'Padding Inferior (PC)' }
    };
    console.log('✓ methodology actualizado');
  }

  // Encontrar y actualizar 'coverage'
  const coverage = components.find(c => c.name === 'coverage');
  if (coverage) {
    coverage.schema = {
      tagline: { type: 'text', display_name: 'Tagline / Subtítulo Superior' },
      title: { type: 'text', display_name: 'Título Principal (Soporta <span class="text-gradient-orange">)' },
      description: { type: 'textarea', display_name: 'Descripción de Párrafo' },
      pillars: { type: 'bloks', display_name: 'Pilares de Cobertura', component_whitelist: ['coveragePillar'] },
      spacingUnit: { type: 'option', options: [{ name: 'px', value: 'px' }, { name: 'rem', value: 'rem' }], default_value: 'px' },
      paddingTopDesktop: { type: 'text', display_name: 'Padding Superior (PC)' },
      paddingBottomDesktop: { "type": "text", "display_name": "Padding Inferior (PC)" }
    };
    console.log('✓ coverage actualizado');
  }

  // Encontrar y actualizar 'contactForms'
  const contactForms = components.find(c => c.name === 'contactForms');
  if (contactForms) {
    contactForms.schema = {
      tagline: { type: 'text', display_name: 'Tagline / Subtítulo Superior' },
      title: { type: 'text', display_name: 'Título Principal (Soporta <span class="text-gradient-blue">)' },
      description: { type: 'textarea', display_name: 'Descripción de Párrafo' },
      spacingUnit: { type: 'option', options: [{ name: 'px', value: 'px' }, { name: 'rem', value: 'rem' }], default_value: 'px' },
      paddingTopDesktop: { type: 'text', display_name: 'Padding Superior (PC)' },
      paddingBottomDesktop: { type: 'text', display_name: 'Padding Inferior (PC)' }
    };
    console.log('✓ contactForms actualizado');
  }

  // Encontrar y actualizar 'paymentMethods'
  const paymentMethods = components.find(c => c.name === 'paymentMethods');
  if (paymentMethods) {
    paymentMethods.schema = {
      title: { type: 'text', display_name: 'Título de Sección' },
      subtitle: { type: 'text', display_name: 'Subtítulo de Sección' },
      link: { type: 'text', display_name: 'Enlace del Botón "Ir a Pagar"' },
      cardTitle: { type: 'text', display_name: 'Título de Tarjeta' },
      cardDescription: { type: 'textarea', display_name: 'Descripción de Tarjeta' },
      bullet1: { type: 'text', display_name: 'Viñeta 1 (PSE)' },
      bullet2: { type: 'text', display_name: 'Viñeta 2 (Tarjetas)' },
      bullet3: { type: 'text', display_name: 'Viñeta 3 (Nequi/Daviplata)' },
      calloutTitle: { type: 'text', display_name: 'Recuadro: Título Encriptado' },
      calloutDesc: { type: 'text', display_name: 'Recuadro: Descripción' },
      calloutBtnText: { type: 'text', display_name: 'Texto del Botón de Pago' },
      spacingUnit: { type: 'option', options: [{ name: 'px', value: 'px' }, { name: 'rem', value: 'rem' }], default_value: 'px' },
      paddingTopDesktop: { type: 'text', display_name: 'Padding Superior (PC)' },
      paddingBottomDesktop: { type: 'text', display_name: 'Padding Inferior (PC)' }
    };
    console.log('✓ paymentMethods actualizado');
  }

  // Agregar los tres nuevos sub-componentes si no existen ya en la lista
  const subComponents = [benefitCard, methodologyStep, coveragePillar];
  subComponents.forEach(sub => {
    if (!components.some(c => c.name === sub.name)) {
      components.push(sub);
      console.log(`+ ${sub.name} agregado`);
    }
  });
}

// 3. Procesar archivo anidado (Array directo)
try {
  let nestedData = JSON.parse(fs.readFileSync(nestedJsonPath, 'utf8'));
  updateComponentsArray(nestedData);
  fs.writeFileSync(nestedJsonPath, JSON.stringify(nestedData, null, 2), 'utf8');
  console.log('Nested JSON file written successfully!');
} catch (e) {
  console.error('Error writing nested JSON file:', e);
}

// 4. Procesar archivo raíz (Objeto con clave "components")
try {
  let rootData = JSON.parse(fs.readFileSync(rootJsonPath, 'utf8'));
  updateComponentsArray(rootData.components);
  fs.writeFileSync(rootJsonPath, JSON.stringify(rootData, null, 2), 'utf8');
  console.log('Root JSON file written successfully!');
} catch (e) {
  console.error('Error writing root JSON file:', e);
}
