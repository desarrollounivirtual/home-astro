/**
 * Servicio de Optimización Dinámica de Imágenes de Storyblok.
 * Convierte automáticamente imágenes del CDN de Storyblok a formato moderno WebP
 * con compresión optimizada, manteniendo la compatibilidad y consistencia con archivos locales.
 */
export function getOptimizedImageUrl(
  url: string | null | undefined,
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  if (!url) return '';

  // Si no es una imagen hospedada en el CDN de Storyblok, se retorna tal cual (fallback para archivos locales)
  if (!url.includes('a.storyblok.com')) {
    return url;
  }

  const quality = options.quality || 80; // Calidad del 80% (relación óptima peso/calidad)
  let resizeParam = '';

  // Si se especifican dimensiones opcionales de redimensionamiento
  if (options.width || options.height) {
    const w = options.width || 0;
    const h = options.height || 0;
    resizeParam = `${w}x${h}/`;
  }

  // Limpiar cualquier parámetro '/m/' previo para evitar duplicaciones recursivas
  const cleanUrl = url.split('/m/')[0];

  // Retorna la URL optimizada con el Image Service de Storyblok
  return `${cleanUrl}/m/${resizeParam}filters:format(webp):quality(${quality})`;
}
