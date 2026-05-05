const fs = require('fs');
const path = require('path');

const stubComponents = [
  'ProductsSection',
  'SubcategoryCard',
  'ProductHighlightsCard',
  'ProductImageGallery',
  'ProductInfo',
  'ProductTabs',
  'ProductBanner',
  'SearchResults',
  'SearchFormPredictive',
  'SearchForm',
  'PaginatedResourceSection',
  'MockShopNotice',
  'PageContent',
  'LanguageSwitcher',
  'Logo',
  'CallToAction',
  'Aside',
  'CartMain',
  'CollectionFilter'
];

const componentsDir = 'f:\\techpilots-frontend\\techpilots-frontend\\app\\components';

stubComponents.forEach(component => {
  const filePath = path.join(componentsDir, `${component}.tsx`);
  if (!fs.existsSync(filePath)) {
    const stub = `'use client';\n\nexport function ${component}(props: any) {\n  return null;\n}\n`;
    fs.writeFileSync(filePath, stub, 'utf-8');
    console.log(`✓ Created stub: ${component}`);
  }
});

console.log('✅ All stubs created!');
