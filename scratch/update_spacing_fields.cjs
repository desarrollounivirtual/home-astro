const fs = require('fs');
const path = require('path');

const rootJsonPath = path.join(__dirname, '..', '.storyblok', 'components.292777462476225.json');
const nestedJsonPath = path.join(__dirname, '..', '.storyblok', 'components', '292777462476225', 'components.json');

const spacingFields = {
  spacingUnit: {
    type: 'option',
    display_name: 'Unidad de Medida',
    options: [
      { name: 'Píxeles (px)', value: 'px' },
      { name: 'Rem (rem)', value: 'rem' },
      { name: 'Em (em)', value: 'em' }
    ],
    default_value: 'px'
  },
  paddingTopMobile: { type: 'text', display_name: 'Padding Superior (Móvil)' },
  paddingBottomMobile: { type: 'text', display_name: 'Padding Inferior (Móvil)' },
  paddingTopDesktop: { type: 'text', display_name: 'Padding Superior (PC)' },
  paddingBottomDesktop: { type: 'text', display_name: 'Padding Inferior (PC)' },
  marginTopMobile: { type: 'text', display_name: 'Margen Superior (Móvil)' },
  marginBottomMobile: { type: 'text', display_name: 'Margen Inferior (Móvil)' },
  marginTopDesktop: { type: 'text', display_name: 'Margen Superior (PC)' },
  marginBottomDesktop: { type: 'text', display_name: 'Margen Inferior (PC)' }
};

const parentComponentNames = [
  'hero',
  'accordionSection',
  'imageBanner',
  'ctaBanner',
  'imageCarousel',
  'featuresGrid',
  'imageGallery',
  'contactForms',
  'paymentMethods',
  'testimonials',
  'textImageRow',
  'benefits',
  'methodology',
  'coverage',
  'platformPromo',
  'textTicker',
  'teachersSection'
];

function injectSpacingFields(components) {
  components.forEach(comp => {
    if (parentComponentNames.includes(comp.name)) {
      if (!comp.schema) comp.schema = {};
      
      // Eliminar campos de espaciado viejos para reordenarlos limpiamente al final
      delete comp.schema.spacingUnit;
      delete comp.schema.paddingTopMobile;
      delete comp.schema.paddingBottomMobile;
      delete comp.schema.paddingTopDesktop;
      delete comp.schema.paddingBottomDesktop;
      delete comp.schema.marginTopMobile;
      delete comp.schema.marginBottomMobile;
      delete comp.schema.marginTopDesktop;
      delete comp.schema.marginBottomDesktop;
      
      // Inyectar todos los campos de espaciado en la estructura del esquema
      Object.assign(comp.schema, spacingFields);
      console.log(`✓ Espaciado inyectado en: ${comp.name}`);
    }
  });
}

// 1. Procesar archivo anidado
try {
  let nestedData = JSON.parse(fs.readFileSync(nestedJsonPath, 'utf8'));
  injectSpacingFields(nestedData);
  fs.writeFileSync(nestedJsonPath, JSON.stringify(nestedData, null, 2), 'utf8');
  console.log('Nested JSON spacing updated successfully!');
} catch (e) {
  console.error('Error in nested JSON spacing:', e);
}

// 2. Procesar archivo raíz
try {
  let rootData = JSON.parse(fs.readFileSync(rootJsonPath, 'utf8'));
  injectSpacingFields(rootData.components);
  fs.writeFileSync(rootJsonPath, JSON.stringify(rootData, null, 2), 'utf8');
  console.log('Root JSON spacing updated successfully!');
} catch (e) {
  console.error('Error in root JSON spacing:', e);
}
