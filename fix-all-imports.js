const fs = require('fs');
const path = require('path');

const appDir = 'f:\\techpilots-frontend\\techpilots-frontend\\app';

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('.')) {
      walkDir(filePath, callback);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      callback(filePath);
    }
  });
}

console.log('Fixing all imports...\n');

walkDir(appDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Remove all Shopify/Hydrogen imports
  const shopifyPattern = /import\s+.*?from\s+['"]@shopify\/[^'"]*['"]/g;
  if (shopifyPattern.test(content)) {
    content = content.replace(shopifyPattern, '');
    modified = true;
  }

  // Remove storefrontapi imports
  if (content.includes('storefrontapi.generated')) {
    content = content.replace(/import\s+.*?from\s+['"]storefrontapi\.generated['"]/g, '');
    modified = true;
  }

  // Remove useRevalidator and useOptimisticCart references
  content = content.replace(/import\s+.*?useRevalidator.*?from.*?\n/g, '');
  content = content.replace(/import\s+.*?useOptimisticCart.*?from.*?\n/g, '');
  content = content.replace(/const\s+.*?\s*=\s*useRevalidator\(\);?/g, '');
  content = content.replace(/const\s+cart\s*=\s*useOptimisticCart\([^)]*\);?/g, 'const cart = originalCart;');

  // Remove CartForm references and replace with simple function
  if (content.includes('CartForm')) {
    content = content.replace(/<CartForm[^>]*>[\s\S]*?<\/CartForm>/g, '<div>{children}</div>');
    content = content.replace(/import\s+.*?CartForm.*?\n/g, '');
    modified = true;
  }

  // Remove empty imports
  content = content.replace(/import\s*\{[\s]*\}\s*from[^;]*;/g, '');

  // Clean up multiple newlines
  content = content.replace(/\n\n\n+/g, '\n\n');

  if (modified || content !== fs.readFileSync(filePath, 'utf-8')) {
    fs.writeFileSync(filePath, content, 'utf-8');
    const relPath = path.relative(process.cwd(), filePath);
    console.log(`✓ Fixed: ${relPath}`);
  }
});

console.log('\n✅ Import fixes complete!');
