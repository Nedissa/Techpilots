const fs = require('fs');
const path = require('path');

const componentsToRemove = [
  'CollectionFilter.tsx',
  'LanguageSwitcher.tsx',
  'SearchForm.tsx',
  'SearchFormPredictive.tsx',
  'SearchResults.tsx',
  'SearchResultsPredictive.tsx',
  'ProductItem.tsx',
  'ProductsSection.tsx',
  'PaginatedResourceSection.tsx',
  'ProductForm.tsx',
  'ProductPrice.tsx',
  'ProductImage.tsx',
  'ProductImageCarousel.tsx',
  'RecommendedAccessories.tsx',
];

const componentsDir = path.join(__dirname, 'app', 'components');

componentsToRemove.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "'use client';\n\nexport function " +
      file.replace('.tsx', '').split(/(?=[A-Z])/).join('') +
      "() { return null; }\n", 'utf-8');
    console.log(`✓ Stubbed: ${file}`);
  }
});

console.log('Done!');
