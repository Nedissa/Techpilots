const fs = require('fs');
const path = require('path');

const files = [
  'app/components/CollectionFilter.tsx',
  'app/components/LanguageSwitcher.tsx',
  'app/components/SearchForm.tsx',
  'app/components/SearchFormPredictive.tsx',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove react-router and related imports
    content = content.replace(/import\s+\{[^}]*\bfrom\s+['"]react-router['"][^;]*;/g, '');
    content = content.replace(/import\s+\{[^}]*\buseNavigate\b[^}]*\}\s+from\s+['"][^'"]*['"]/g, '');
    content = content.replace(/import\s+\{[^}]*\buseLocation\b[^}]*\}\s+from\s+['"][^'"]*['"]/g, '');
    content = content.replace(/import\s+\{[^}]*\bForm\b[^}]*\}\s+from\s+['"][^'"]*['"]/g, '');

    // Remove empty imports
    content = content.replace(/import\s*\{[\s]*\}[^;]*;/g, '');

    // Add 'use client'
    if (!content.includes("'use client'")) {
      content = `'use client';\n\n${content}`;
    }

    // Remove multiple newlines
    content = content.replace(/\n\n\n+/g, '\n\n');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed: ${file}`);
  }
});

console.log('Done!');
