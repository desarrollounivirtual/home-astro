/**
 * Genera estilos CSS responsivos en base a la configuración de espaciado de Storyblok.
 * Soporta unidades dinámicas (px, rem, em, %) y viewports (Mobile, Tablet, Desktop).
 */
export function generateSpacingStyles(blok: any, uniqueClass: string): string {
  if (!blok) return '';

  const unit = blok.spacingUnit || 'px';

  // Mobile inputs
  const ptMobile = blok.paddingTopMobile;
  const pbMobile = blok.paddingBottomMobile;
  const mtMobile = blok.marginTopMobile;
  const mbMobile = blok.marginBottomMobile;

  // Tablet inputs
  const ptTablet = blok.paddingTopTablet;
  const pbTablet = blok.paddingBottomTablet;
  const mtTablet = blok.marginTopTablet;
  const mbTablet = blok.marginBottomTablet;

  // Desktop inputs
  const ptDesktop = blok.paddingTopDesktop;
  const pbDesktop = blok.paddingBottomDesktop;
  const mtDesktop = blok.marginTopDesktop;
  const mbDesktop = blok.marginBottomDesktop;

  let styles = '';

  // 1. Reglas básicas para móviles
  if (ptMobile || pbMobile || mtMobile || mbMobile) {
    styles += `
      .${uniqueClass} {
        ${ptMobile ? `padding-top: ${ptMobile}${unit} !important;` : ''}
        ${pbMobile ? `padding-bottom: ${pbMobile}${unit} !important;` : ''}
        ${mtMobile ? `margin-top: ${mtMobile}${unit} !important;` : ''}
        ${mbMobile ? `margin-bottom: ${mbMobile}${unit} !important;` : ''}
      }
    `;
  }

  // 2. Media Query para Tablets (min-width: 768px)
  if (ptTablet || pbTablet || mtTablet || mbTablet) {
    styles += `
      @media (min-width: 768px) {
        .${uniqueClass} {
          ${ptTablet ? `padding-top: ${ptTablet}${unit} !important;` : ''}
          ${pbTablet ? `padding-bottom: ${pbTablet}${unit} !important;` : ''}
          ${mtTablet ? `margin-top: ${mtTablet}${unit} !important;` : ''}
          ${mbTablet ? `margin-bottom: ${mbTablet}${unit} !important;` : ''}
        }
      }
    `;
  }

  // 3. Media Query para Desktops (min-width: 1024px)
  if (ptDesktop || pbDesktop || mtDesktop || mbDesktop) {
    styles += `
      @media (min-width: 1024px) {
        .${uniqueClass} {
          ${ptDesktop ? `padding-top: ${ptDesktop}${unit} !important;` : ''}
          ${pbDesktop ? `padding-bottom: ${pbDesktop}${unit} !important;` : ''}
          ${mtDesktop ? `margin-top: ${mtDesktop}${unit} !important;` : ''}
          ${mbDesktop ? `margin-bottom: ${mbDesktop}${unit} !important;` : ''}
        }
      }
    `;
  }

  return styles.trim();
}
