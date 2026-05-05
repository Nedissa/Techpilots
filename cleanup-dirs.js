const fs = require('fs');
const path = require('path');

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
    console.log(`Removed: ${dir}`);
  }
}

// Look for and remove problematic directories
const componentsDir = path.join(__dirname, 'app', 'components');
const dirs = fs.readdirSync(componentsDir);

dirs.forEach(dir => {
  if (dir.startsWith('F:') || dir.includes('Techpilots-Hydrogen')) {
    const fullPath = path.join(componentsDir, dir);
    try {
      removeDir(fullPath);
    } catch (e) {
      console.error(`Failed to remove ${fullPath}:`, e.message);
    }
  }
});

console.log('Cleanup complete!');
