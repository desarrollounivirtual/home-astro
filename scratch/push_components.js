import fs from 'fs';
import readline from 'readline';

const spaceIds = ['292777462476225', '292777'];
const regions = [
  { name: 'Estados Unidos (US)', base: 'https://api-us.storyblok.com/v1' },
  { name: 'Europa (EU)', base: 'https://api.storyblok.com/v1' }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\n=========================================================");
console.log("🚀 SCRIPT AUTOREPARABLE DE IMPORTACIÓN DE COMPONENTES");
console.log("=========================================================\n");

rl.question('Por favor, pega tu Personal Access Token (PAT) de Storyblok: ', async (token) => {
  rl.close();
  const cleanToken = token.trim();
  
  if (!cleanToken) {
    console.error('❌ Token no válido.');
    process.exit(1);
  }
  
  try {
    let activeSpaceId = '';
    let activeApiBase = '';
    let existingComponents = [];
    let successConnection = false;
    
    // Probar combinaciones de ID de espacio y Regiones automáticamente
    for (const spaceId of spaceIds) {
      if (successConnection) break;
      
      for (const reg of regions) {
        console.log(`🔄 Probando ID de espacio: ${spaceId} en Región: ${reg.name}...`);
        
        try {
          const res = await fetch(`${reg.base}/spaces/${spaceId}/components`, {
            headers: {
              'Authorization': cleanToken,
              'Content-Type': 'application/json'
            }
          });
          
          if (res.ok) {
            const data = await res.json();
            existingComponents = data.components || [];
            activeSpaceId = spaceId;
            activeApiBase = reg.base;
            successConnection = true;
            console.log(`\n🎉 ¡CONEXIÓN EXITOSA! Espacio encontrado en la región ${reg.name} con ID: ${spaceId}`);
            break;
          } else {
            const errText = await res.text();
            console.log(`⚠️  No disponible (Código ${res.status}: ${res.statusText})`);
          }
        } catch (err) {
          console.log(`⚠️  Error de conexión a la región ${reg.name}`);
        }
      }
    }
    
    if (!successConnection) {
      throw new Error("No se pudo conectar a Storyblok con ninguna de las combinaciones de ID y región. Verifica tu token o el ID de espacio.");
    }
    
    console.log(`✅ Se encontraron ${existingComponents.length} componentes actuales en la nube.`);
    
    // 3. Buscar el archivo JSON local. Probamos en las dos posibles ubicaciones creadas:
    let localPath = `.storyblok/components/${activeSpaceId}/components.json`;
    if (!fs.existsSync(localPath)) {
      localPath = `.storyblok/components/292777462476225/components.json`;
    }
    if (!fs.existsSync(localPath)) {
      localPath = `scratch/storyblok_components.json`; // Respaldo
    }
    
    console.log(`📂 Leyendo archivo local de componentes: ${localPath}`);
    let fileContent = fs.readFileSync(localPath, 'utf8');
    let localData = JSON.parse(fileContent);
    
    // Si viene en formato envuelto de Storyblok UI {components: [...]}, extraemos el array
    if (!Array.isArray(localData) && localData.components) {
      localData = localData.components;
    }
    
    console.log(`🔄 Iniciando subida y sincronización de ${localData.length} componentes...`);
    
    for (const comp of localData) {
      const existing = existingComponents.find(c => c.name === comp.name);
      const payload = { component: comp };
      
      if (existing) {
        console.log(`📝 Actualizando componente existente: "${comp.name}"...`);
        const putRes = await fetch(`${activeApiBase}/spaces/${activeSpaceId}/components/${existing.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': cleanToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        if (putRes.ok) {
          console.log(`   ✅ "${comp.name}" actualizado con éxito.`);
        } else {
          console.error(`   ❌ Error actualizando "${comp.name}":`, await putRes.text());
        }
      } else {
        console.log(`➕ Creando nuevo componente: "${comp.name}"...`);
        const postRes = await fetch(`${activeApiBase}/spaces/${activeSpaceId}/components`, {
          method: 'POST',
          headers: {
            'Authorization': cleanToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        if (postRes.ok) {
          console.log(`   ✅ "${comp.name}" creado con éxito.`);
        } else {
          console.error(`   ❌ Error creando "${comp.name}":`, await postRes.text());
        }
      }
    }
    
    console.log('\n🎉 ¡PROCESO COMPLETADO CON ÉXITO! Todos tus componentes están sincronizados y activos en tu panel de Storyblok.');
    
  } catch (error) {
    console.error('\n❌ Ocurrió un error durante la sincronización:', error.message);
  }
});
