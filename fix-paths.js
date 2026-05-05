const fs = require('fs');
const path = require('path');

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

const componentsDir = path.join(__dirname, 'app', 'components');

walkDir(componentsDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Fix ~/components/ imports to @/components/
  if (content.includes("from '~/components/") || content.includes('from "~/components/')) {
    content = content.replace(/from\s+['"]~\/components\//g, "from '@/components/");
    modified = true;
  }

  // Fix ~/lib/ imports to @/lib/
  if (content.includes("from '~/lib/") || content.includes('from "~/lib/')) {
    content = content.replace(/from\s+['"]~\/lib\//g, "from '@/lib/");
    modified = true;
  }

  // Fix ~/hooks/ imports to @/hooks/
  if (content.includes("from '~/hooks/") || content.includes('from "~/hooks/')) {
    content = content.replace(/from\s+['"]~\/hooks\//g, "from '@/hooks/");
    modified = true;
  }

  // Fix other ~ references
  if (content.includes("from '~/'") || content.includes('from "~/"')) {
    content = content.replace(/from\s+['"]~\//g, "from '@/");
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed: ${path.relative(process.cwd(), filePath)}`);
  }
});

console.log('Path fixes complete!');
