const fs = require('fs');
const path = require('path');

const hydrogenDir = 'F:/Techpilots-Hydrogen';
const nextjsDir = 'F:\\techpilots-frontend\\techpilots-frontend';

// Map Hydrogen routes to Next.js app router
const routeMapping = {
  '($locale)._index.tsx': 'app/page.tsx',
  '($locale).produkter.$handle.tsx': 'app/produkter/[handle]/page.tsx',
  '($locale).kategorier.$handle.tsx': 'app/kategorier/[handle]/page.tsx',
  '($locale).underkategorier.$handle.tsx': 'app/underkategorier/[handle]/page.tsx',
  '($locale).produktserier.$handle.tsx': 'app/produktserier/[handle]/page.tsx',
  '($locale).produktserier._index.tsx': 'app/produktserier/page.tsx',
  '($locale).produktserier.all.tsx': 'app/produktserier/all/page.tsx',
  '($locale).collections.$handle.tsx': 'app/collections/[handle]/page.tsx',
  '($locale).collections._index.tsx': 'app/collections/page.tsx',
  'collections.all.tsx': 'app/collections/all/page.tsx',
  '($locale).varukorg.tsx': 'app/varukorg/page.tsx',
  '($locale).konto._index.tsx': 'app/konto/page.tsx',
  '($locale).konto_.login.tsx': 'app/konto/login/page.tsx',
  '($locale).konto_.logout.tsx': 'app/konto/logout/page.tsx',
  '($locale).konto.profile.tsx': 'app/konto/profile/page.tsx',
  '($locale).konto.addresses.tsx': 'app/konto/addresses/page.tsx',
  '($locale).konto.orders._index.tsx': 'app/konto/orders/page.tsx',
  '($locale).konto.orders.$id.tsx': 'app/konto/orders/[id]/page.tsx',
  '($locale).blogg._index.tsx': 'app/blogg/page.tsx',
  '($locale).blogg.$blogHandle._index.tsx': 'app/blogg/[blogHandle]/page.tsx',
  '($locale).blogg.$blogHandle.$articleHandle.tsx': 'app/blogg/[blogHandle]/[articleHandle]/page.tsx',
  '($locale).pages.about.tsx': 'app/pages/about/page.tsx',
  '($locale).pages.careers.tsx': 'app/pages/careers/page.tsx',
  '($locale).pages.contact.tsx': 'app/pages/contact/page.tsx',
  '($locale).pages.faq.tsx': 'app/pages/faq/page.tsx',
  '($locale).pages.payment.tsx': 'app/pages/payment/page.tsx',
  '($locale).pages.returns.tsx': 'app/pages/returns/page.tsx',
  '($locale).pages.security.tsx': 'app/pages/security/page.tsx',
  '($locale).pages.shipping.tsx': 'app/pages/shipping/page.tsx',
  '($locale).pages.sustainability.tsx': 'app/pages/sustainability/page.tsx',
  '($locale).policies._index.tsx': 'app/policies/page.tsx',
  '($locale).policies.$handle.tsx': 'app/policies/[handle]/page.tsx',
  '($locale).discount.$code.tsx': 'app/discount/[code]/page.tsx',
  '($locale).sok.tsx': 'app/sok/page.tsx',
};

function convertContent(content, filename) {
  // Add 'use client' if not present
  if (!content.includes("'use client'") && !content.includes('"use client"')) {
    content = "'use client';\n\n" + content;
  }

  // Convert React Router imports
  content = content.replace(/import\s+.*?from\s+['"]react-router['"]/g, '');
  content = content.replace(/import\s+Link\s+from\s+['"]react-router['"]/g, "import Link from 'next/link'");

  // Convert Hydrogen imports to mocks/remove them
  content = content.replace(/import\s+.*?from\s+['"]@shopify\/hydrogen['"]/g, '');
  content = content.replace(/import\s+.*?from\s+['"]@shopify\/hydrogen\/storefront-api-types['"]/g, '');

  // Convert ~ imports to @
  content = content.replace(/from\s+['"]~\//g, "from '@/");

  // Remove empty imports
  content = content.replace(/^import\s*\{[\s]*\}\s*from[^;]*;$/gm, '');

  // Remove multiple blank lines
  content = content.replace(/\n\n\n+/g, '\n\n');

  return content;
}

function copyFile(src, dest, isComponent = false) {
  try {
    if (!fs.existsSync(src)) return false;

    const content = fs.readFileSync(src, 'utf-8');
    const converted = convertContent(content, path.basename(src));

    // Create directory if it doesn't exist
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(dest, converted, 'utf-8');
    console.log(`✓ ${isComponent ? 'Component' : 'Page'}: ${path.relative(nextjsDir, dest)}`);
    return true;
  } catch (e) {
    console.error(`✗ Failed: ${src}`);
    return false;
  }
}

console.log('Starting complete migration...\n');
let totalPages = 0, totalComponents = 0;

// Copy all route files and convert to pages
console.log('Migrating pages...');
const routesDir = path.join(hydrogenDir, 'app/routes');
if (fs.existsSync(routesDir)) {
  fs.readdirSync(routesDir).forEach(file => {
    if (file.endsWith('.tsx')) {
      const src = path.join(routesDir, file);
      // For unmapped routes, skip or put in catch-all
      if (routeMapping[file]) {
        const dest = path.join(nextjsDir, routeMapping[file]);
        if (copyFile(src, dest)) totalPages++;
      } else {
        // Copy other files as-is to app directory
        const dest = path.join(nextjsDir, 'app', file.replace(/\.tsx$/, '/page.tsx'));
        if (copyFile(src, dest)) totalPages++;
      }
    }
  });
}

// Copy all components
console.log('\nMigrating components...');
const componentsDir = path.join(hydrogenDir, 'app/components');
if (fs.existsSync(componentsDir)) {
  fs.readdirSync(componentsDir).forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const src = path.join(componentsDir, file);
      const dest = path.join(nextjsDir, 'app/components', file);
      if (copyFile(src, dest, true)) totalComponents++;
    }
  });
}

// Copy hooks
console.log('\nMigrating hooks...');
const hooksDir = path.join(hydrogenDir, 'app/hooks');
if (fs.existsSync(hooksDir)) {
  if (!fs.existsSync(path.join(nextjsDir, 'app/hooks'))) {
    fs.mkdirSync(path.join(nextjsDir, 'app/hooks'), { recursive: true });
  }
  fs.readdirSync(hooksDir).forEach(file => {
    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const src = path.join(hooksDir, file);
      const dest = path.join(nextjsDir, 'app/hooks', file);
      if (copyFile(src, dest)) console.log(`✓ Hook: ${file}`);
    }
  });
}

// Copy lib utilities
console.log('\nMigrating utilities...');
const libDir = path.join(hydrogenDir, 'app/lib');
if (fs.existsSync(libDir)) {
  if (!fs.existsSync(path.join(nextjsDir, 'app/lib'))) {
    fs.mkdirSync(path.join(nextjsDir, 'app/lib'), { recursive: true });
  }
  fs.readdirSync(libDir).forEach(file => {
    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const src = path.join(libDir, file);
      const dest = path.join(nextjsDir, 'app/lib', file);
      if (copyFile(src, dest)) console.log(`✓ Utility: ${file}`);
    }
  });
}

// Copy CSS files
console.log('\nMigrating styles...');
const stylesDir = path.join(hydrogenDir, 'app/styles');
if (fs.existsSync(stylesDir)) {
  if (!fs.existsSync(path.join(nextjsDir, 'app/styles'))) {
    fs.mkdirSync(path.join(nextjsDir, 'app/styles'), { recursive: true });
  }
  fs.readdirSync(stylesDir).forEach(file => {
    if (file.endsWith('.css')) {
      const src = path.join(stylesDir, file);
      const dest = path.join(nextjsDir, 'app/styles', file);
      fs.copyFileSync(src, dest);
      console.log(`✓ Style: ${file}`);
    }
  });
}

console.log(`\n✅ Migration complete!`);
console.log(`   Pages migrated: ${totalPages}`);
console.log(`   Components migrated: ${totalComponents}`);
console.log(`\nNext steps:`);
console.log(`   1. npm run build`);
console.log(`   2. Fix any remaining import errors`);
console.log(`   3. npm run dev`);
