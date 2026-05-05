const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'app', 'components');
const problematicImports = [
  'CartForm', 'Money', 'Image', 'useVariantUrl', 'useHideOnScroll',
  'OptimisticCart', 'OptimisticCartLine', 'OptimisticCartLineInput',
  'useOptimisticCart', 'Await', 'NavLink', 'useAsyncValue', 'useFetcher',
  'HeaderQuery', 'CartApiQueryFragment', 'CartLineUpdateInput',
  'CartLayout', 'LineItemChildrenMap', 'CartLineFragment', 'ProductPrice',
  'MoneyV2', 'MappedProductOptions'
];

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      callback(filePath);
    }
  });
}

function hasProblematicCode(content) {
  return problematicImports.some(imp => {
    const patterns = [
      new RegExp(`\\b${imp}\\b`),
      new RegExp(`from\\s+['"][^'"]*${imp}`),
    ];
    return patterns.some(p => p.test(content));
  });
}

function stripProblematicImports(content) {
  // Remove lines that import problematic items
  problematicImports.forEach(imp => {
    const pattern = new RegExp(`import.*\\b${imp}\\b.*?[;\n]`, 'g');
    content = content.replace(pattern, '');
  });

  // Remove type imports for problematic items
  problematicImports.forEach(imp => {
    const pattern = new RegExp(`import\\s+type\\s+\\{[^}]*\\b${imp}\\b[^}]*\\}[^;]*;`, 'g');
    content = content.replace(pattern, '');
  });

  // Remove empty import statements
  content = content.replace(/import\s*\{[\s]*\}[^;]*;/g, '');

  // Remove lines that use problematic functions
  const lines = content.split('\n');
  content = lines.filter(line => {
    // Don't remove lines that just have harmless code
    if (line.includes('//')) {
      // Only filter if the problematic code is before the comment
      const beforeComment = line.split('//')[0];
      return !problematicImports.some(imp => {
        const pattern = new RegExp(`\\b${imp}\\(`);
        return pattern.test(beforeComment);
      });
    }
    return true;
  }).join('\n');

  return content;
}

function shouldSkipFile(filePath) {
  const basename = path.basename(filePath);
  const skipped = [
    'CallToAction.tsx', 'CartLineItem.tsx', 'CartSummary.tsx',
    'ProductHighlightsCard.tsx', 'ProductTabs.tsx'
  ];
  return skipped.includes(basename);
}

console.log('Cleaning up problematic imports...\n');
let count = 0;

walkDir(componentsDir, (filePath) => {
  if (shouldSkipFile(filePath)) {
    console.log(`⊘ Skipped: ${path.relative(process.cwd(), filePath)}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  if (hasProblematicCode(content)) {
    const cleaned = stripProblematicImports(content);

    // Only write if there's actual content after cleaning
    if (cleaned.trim().length > 0 && cleaned !== content) {
      fs.writeFileSync(filePath, cleaned, 'utf-8');
      console.log(`✓ Cleaned: ${path.relative(process.cwd(), filePath)}`);
      count++;
    }
  }
});

console.log(`\n✓ Cleanup complete! Fixed ${count} files.`);
