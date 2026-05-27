import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const mappings = [
  { storyblok: 'Hero.astro', component: 'Hero.astro', folder: 'components' },
  { storyblok: 'Benefits.astro', component: 'Benefits.astro', folder: 'components' },
  { storyblok: 'ContactForms.astro', component: 'ContactForms.astro', folder: 'components' },
  { storyblok: 'Coverage.astro', component: 'Coverage.astro', folder: 'components' },
  { storyblok: 'Methodology.astro', component: 'Methodology.astro', folder: 'components' },
  { storyblok: 'PaymentMethods.astro', component: 'PaymentMethods.astro', folder: 'components' },
  { storyblok: 'PlatformPromo.astro', component: 'PlatformPromo.astro', folder: 'components' },
  { storyblok: 'Testimonials.astro', component: 'Testimonials.astro', folder: 'components' },
  { storyblok: 'AccordionSection.astro', component: 'AccordionBlock.astro', folder: 'components/blocks' },
  { storyblok: 'CtaBanner.astro', component: 'CtaBannerBlock.astro', folder: 'components/blocks' },
  { storyblok: 'FeaturesGrid.astro', component: 'FeaturesGridBlock.astro', folder: 'components/blocks' },
  { storyblok: 'ImageBanner.astro', component: 'ImageBannerBlock.astro', folder: 'components/blocks' },
  { storyblok: 'ImageCarousel.astro', component: 'CarouselBlock.astro', folder: 'components/blocks' },
  { storyblok: 'ImageGallery.astro', component: 'GalleryBlock.astro', folder: 'components/blocks' },
  { storyblok: 'TextImageRow.astro', component: 'TextImageRowBlock.astro', folder: 'components/blocks' }
];

for (const map of mappings) {
  const sbPath = path.join(root, 'src', 'storyblok', map.storyblok);
  const compPath = path.join(root, 'src', map.folder, map.component);
  
  if (!fs.existsSync(sbPath) || !fs.existsSync(compPath)) {
    console.log(`Skipping ${map.storyblok} - files missing`);
    continue;
  }
  
  const sbContent = fs.readFileSync(sbPath, 'utf8');
  const compContent = fs.readFileSync(compPath, 'utf8');
  
  // Extract frontmatter logic from compContent
  const compLines = compContent.split('\n');
  let inFrontmatter = false;
  let compLogic = [];
  let compBody = [];
  let isProps = false;
  
  for (let i = 0; i < compLines.length; i++) {
    const line = compLines[i];
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (inFrontmatter) {
      if (line.includes('interface Props')) isProps = true;
      if (isProps && line.includes('}')) { isProps = false; continue; }
      if (!isProps && !line.includes('Astro.props')) {
        compLogic.push(line);
      }
    } else {
      compBody.push(line);
    }
  }
  
  // Clean up compLogic by removing Props extraction completely
  let finalCompLogic = [];
  let insideExtraction = false;
  for (let line of compLogic) {
    if (line.includes('const {')) insideExtraction = true;
    if (insideExtraction && line.includes('} = Astro.props;')) {
      insideExtraction = false;
      continue;
    }
    if (!insideExtraction && !line.includes('interface Props') && !line.includes('} = Astro.props;')) {
        finalCompLogic.push(line);
    }
  }
  
  // Extract logic from sbContent
  const sbLines = sbContent.split('\n');
  inFrontmatter = false;
  let sbLogic = [];
  for (let line of sbLines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (inFrontmatter) {
      // Exclude the import of the component
      if (!line.includes(`import`) || (!line.includes(`../components/`) && !line.includes(`../components/blocks/`))) {
        sbLogic.push(line);
      }
    }
  }
  
  // Merge frontmatter
  const mergedFrontmatter = [
    '---',
    ...sbLogic,
    ...finalCompLogic,
    '---'
  ].join('\n');
  
  // In the Storyblok component, replace the component invocation with the body
  let bodyStr = compBody.join('\n');
  
  // Extract wrapper tag from sbContent
  const wrapperMatch = sbContent.match(/<div \{\.\.\.storyblokEditable\(blok\)\} class=\{spacingId\}>/);
  const endWrapperMatch = sbContent.match(/<\/div>/);
  
  if (wrapperMatch) {
    const finalContent = `${mergedFrontmatter}\n{styles && <style is:inline set:html={styles} />}\n\n<div {...storyblokEditable(blok)} class={spacingId}>\n${bodyStr}\n</div>\n`;
    fs.writeFileSync(sbPath, finalContent);
    console.log(`Refactored ${map.storyblok}`);
  }
}
