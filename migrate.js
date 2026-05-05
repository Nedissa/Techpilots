const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'app', 'components');

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

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  const originalContent = content;

  // Replace React Router Link imports with Next.js
  if (content.includes("import") && content.includes("Link") && content.includes("react-router")) {
    content = content.replace(
      /import\s+\{([^}]*\b)?Link\b([^}]*)\}\s+from\s+['"]react-router['"]/,
      "import Link from 'next/link'"
    );
    modified = true;
  }

  // Remove all Shopify/Hydrogen imports (these need custom implementation)
  const shopifyImportPattern = /import\s+\{[^}]*\}\s+from\s+['"]@shopify[^'"]*['"]/g;
  if (shopifyImportPattern.test(content)) {
    content = content.replace(shopifyImportPattern, '');
    modified = true;
  }

  // Remove Shopify type imports
  const shopifyTypePattern = /import\s+type\s+\{[^}]*\}\s+from\s+['"]@shopify[^'"]*['"]/g;
  if (shopifyTypePattern.test(content)) {
    content = content.replace(shopifyTypePattern, '');
    modified = true;
  }

  // Replace hydrogen/remix useMatches with Next.js routing
  if (content.includes('useMatches')) {
    content = content.replace(/import\s+\{([^}]*?)useMatches([^}]*?)\}\s+from\s+['"][^'"]*['"]/g,
      "import { useRouter } from 'next/navigation'");
    modified = true;
  }

  // Replace useNavigate with Next.js router
  if (content.includes('useNavigate')) {
    content = content.replace(
      /const\s+navigate\s*=\s*useNavigate\(\)/,
      "const router = useRouter()"
    );
    content = content.replace(/navigate\(/g, 'router.push(');
    modified = true;
  }

  // Remove @remix-run imports
  const remixPattern = /import\s+\{[^}]*\}\s+from\s+['"]@remix-run[^'"]*['"]/g;
  if (remixPattern.test(content)) {
    content = content.replace(remixPattern, '');
    modified = true;
  }

  // Replace hydrogen/remix with next/navigation
  if (content.includes('hydrogen/remix')) {
    content = content.replace(
      /import\s+\{([^}]+)\}\s+from\s+['"][^'"]*hydrogen[/]remix['"]/,
      "import { useRouter } from 'next/navigation'"
    );
    modified = true;
  }

  // Remove empty import lines
  content = content.replace(/import\s*\{[\s]*\}[^;]*;/g, '');

  // Remove multiple consecutive empty lines
  content = content.replace(/\n\n\n+/g, '\n\n');

  // Remove leading/trailing blank lines in imports section
  content = content.replace(/^(\n)+/g, '');

  // Add 'use client' if component uses hooks but doesn't have it
  const hasUseClient = /['"]use client['"]/.test(content);
  const usesHooks = /useState|useEffect|useRef|useContext|useReducer|useCallback|useMemo|useTransition|useRouter|useFetcher|useAsyncValue|useMatches/.test(content);

  if (usesHooks && !hasUseClient) {
    content = `'use client';\n\n${content}`;
    modified = true;
  }

  if (originalContent !== content) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Migrated: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }

  return false;
}

console.log('Starting migration of all components...\n');
let count = 0;

walkDir(componentsDir, (filePath) => {
  if (migrateFile(filePath)) {
    count++;
  }
});

console.log(`\n✓ Migration complete! Updated ${count} files.`);
