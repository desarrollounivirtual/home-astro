/**
 * Helper to check if a spacing value has a unit or is a CSS keyword.
 * If it's a pure number, it appends the selected unit.
 */
export function formatValue(value: any, defaultUnit: string = 'px'): string {
  if (value === undefined || value === null) return '';
  const trimmed = String(value).trim();
  if (trimmed === '') return '';
  
  // Checks if it's a pure integer or decimal number (e.g. "24", "1.5", "-4", ".5")
  const isPureNumber = /^-?[\d.]+$/.test(trimmed);
  if (isPureNumber) {
    return `${trimmed}${defaultUnit}`;
  }
  
  return trimmed;
}

/**
 * Generates custom spacing styles for margins and paddings across all viewports.
 */
export function generateSpacingStyles(blok: any, uniqueClass: string): string {
  if (!blok) return '';

  const unit = blok.spacingUnit || 'px';

  // Mobile inputs
  const ptMobile = formatValue(blok.paddingTopMobile, unit);
  const pbMobile = formatValue(blok.paddingBottomMobile, unit);
  const mtMobile = formatValue(blok.marginTopMobile, unit);
  const mbMobile = formatValue(blok.marginBottomMobile, unit);

  // Tablet inputs
  const ptTablet = formatValue(blok.paddingTopTablet, unit);
  const pbTablet = formatValue(blok.paddingBottomTablet, unit);
  const mtTablet = formatValue(blok.marginTopTablet, unit);
  const mbTablet = formatValue(blok.marginBottomTablet, unit);

  // Desktop inputs
  const ptDesktop = formatValue(blok.paddingTopDesktop, unit);
  const pbDesktop = formatValue(blok.paddingBottomDesktop, unit);
  const mtDesktop = formatValue(blok.marginTopDesktop, unit);
  const mbDesktop = formatValue(blok.marginBottomDesktop, unit);

  let styles = '';

  // 1. Mobile viewports (Base)
  if (ptMobile || pbMobile || mtMobile || mbMobile) {
    styles += `
      .${uniqueClass} {
        ${ptMobile ? `padding-top: ${ptMobile} !important;` : ''}
        ${pbMobile ? `padding-bottom: ${pbMobile} !important;` : ''}
        ${mtMobile ? `margin-top: ${mtMobile} !important;` : ''}
        ${mbMobile ? `margin-bottom: ${mbMobile} !important;` : ''}
      }
    `;
  }

  // 2. Tablet viewports (min-width: 768px)
  if (ptTablet || pbTablet || mtTablet || mbTablet) {
    styles += `
      @media (min-width: 768px) {
        .${uniqueClass} {
          ${ptTablet ? `padding-top: ${ptTablet} !important;` : ''}
          ${pbTablet ? `padding-bottom: ${pbTablet} !important;` : ''}
          ${mtTablet ? `margin-top: ${mtTablet} !important;` : ''}
          ${mbTablet ? `margin-bottom: ${mbTablet} !important;` : ''}
        }
      }
    `;
  }

  // 3. Desktop viewports (min-width: 1024px)
  if (ptDesktop || pbDesktop || mtDesktop || mbDesktop) {
    styles += `
      @media (min-width: 1024px) {
        .${uniqueClass} {
          ${ptDesktop ? `padding-top: ${ptDesktop} !important;` : ''}
          ${pbDesktop ? `padding-bottom: ${pbDesktop} !important;` : ''}
          ${mtDesktop ? `margin-top: ${mtDesktop} !important;` : ''}
          ${mbDesktop ? `margin-bottom: ${mbDesktop} !important;` : ''}
        }
      }
    `;
  }

  return styles.trim();
}

/**
 * Generates custom component style rules including spacing, typography, and images.
 */
export function generateComponentStyles(blok: any, uniqueClass: string): string {
  if (!blok) return '';
  
  let styles = generateSpacingStyles(blok, uniqueClass);
  
  const unit = blok.spacingUnit || 'px';

  // 1. Title Styles (Targeting h1, h2, h3 and custom title classes)
  const titleColor = blok.titleColor;
  const titleSizeMobile = formatValue(blok.titleSizeMobile, unit);
  const titleSizeTablet = formatValue(blok.titleSizeTablet, unit);
  const titleSizeDesktop = formatValue(blok.titleSizeDesktop, unit);

  if (titleColor || titleSizeMobile || titleSizeTablet || titleSizeDesktop) {
    styles += `
      .${uniqueClass} h1, .${uniqueClass} h2, .${uniqueClass} h3, .${uniqueClass} .title-custom {
        ${titleColor ? `color: ${titleColor} !important;` : ''}
        ${titleSizeMobile ? `font-size: ${titleSizeMobile} !important;` : ''}
      }
      @media (min-width: 768px) {
        .${uniqueClass} h1, .${uniqueClass} h2, .${uniqueClass} h3, .${uniqueClass} .title-custom {
          ${titleSizeTablet ? `font-size: ${titleSizeTablet} !important;` : ''}
        }
      }
      @media (min-width: 1024px) {
        .${uniqueClass} h1, .${uniqueClass} h2, .${uniqueClass} h3, .${uniqueClass} .title-custom {
          ${titleSizeDesktop ? `font-size: ${titleSizeDesktop} !important;` : ''}
        }
      }
    `;
  }

  // 2. Body Text Styles (Targeting p elements and custom body classes)
  const bodyColor = blok.bodyColor;
  const bodySizeMobile = formatValue(blok.bodySizeMobile, unit);
  const bodySizeTablet = formatValue(blok.bodySizeTablet, unit);
  const bodySizeDesktop = formatValue(blok.bodySizeDesktop, unit);

  if (bodyColor || bodySizeMobile || bodySizeTablet || bodySizeDesktop) {
    styles += `
      .${uniqueClass} p, .${uniqueClass} .body-custom {
        ${bodyColor ? `color: ${bodyColor} !important;` : ''}
        ${bodySizeMobile ? `font-size: ${bodySizeMobile} !important;` : ''}
      }
      @media (min-width: 768px) {
        .${uniqueClass} p, .${uniqueClass} .body-custom {
          ${bodySizeTablet ? `font-size: ${bodySizeTablet} !important;` : ''}
        }
      }
      @media (min-width: 1024px) {
        .${uniqueClass} p, .${uniqueClass} .body-custom {
          ${bodySizeDesktop ? `font-size: ${bodySizeDesktop} !important;` : ''}
        }
      }
    `;
  }

  // 3. Image Styles (Targeting direct img or aspect ratio crop containers)
  const imageWidth = formatValue(blok.imageWidth, 'px');
  const imageHeight = formatValue(blok.imageHeight, 'px');
  const imageBorderRadius = formatValue(blok.imageBorderRadius, 'px');
  const imageObjectFit = blok.imageObjectFit;

  if (imageWidth || imageHeight || imageBorderRadius || imageObjectFit) {
    styles += `
      .${uniqueClass} img, .${uniqueClass} .image-container, .${uniqueClass} [class*="aspect-"] {
        ${imageBorderRadius ? `border-radius: ${imageBorderRadius} !important;` : ''}
      }
      .${uniqueClass} img {
        ${imageWidth ? `width: ${imageWidth} !important;` : ''}
        ${imageHeight ? `height: ${imageHeight} !important;` : ''}
        ${imageObjectFit ? `object-fit: ${imageObjectFit} !important;` : ''}
      }
    `;
  }

  return styles.trim();
}
