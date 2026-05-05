const fs = require('fs');
const path = require('path');

const icons = [
  'ProcessorIcon',
  'ModerkortIcon',
  'GrafikkortIcon',
  'RamMinnenIcon',
  'NataggregatIcon',
  'DatorladorIcon',
  'GamingComputerIcon',
  'GamingHeadsetIcon',
  'GamingMusmattorIcon',
  'GamingMossIcon',
  'TangentbordIcon',
  'BarbidatorIcon',
  'StationarIcon',
  'MobiltelephoneIcon',
  'MobilTillbehorIcon',
  'LjudsystemIcon',
  'TvIcon',
  'TvTillbehorIcon',
  'MobileIcon',
  'SpeakerIcon',
  'MousePadIcon',
  'WirelessMouseIcon',
  'AccessoriesIcon',
  'LaptopIcon',
  'DesktopIcon',
  'DefaultIcon'
];

const iconsDir = 'f:\\techpilots-frontend\\techpilots-frontend\\app\\components\\Icons';

// Create Icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

icons.forEach(icon => {
  const filePath = path.join(iconsDir, `${icon}.tsx`);
  if (!fs.existsSync(filePath)) {
    const stub = `export function ${icon}(props: any) {\n  return <svg {...props} />;\n}\n`;
    fs.writeFileSync(filePath, stub, 'utf-8');
    console.log(`✓ Created icon: ${icon}`);
  }
});

console.log('✅ All icon stubs created!');
