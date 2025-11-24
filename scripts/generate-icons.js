// Generates placeholder PNG icons from base64 strings.
// Run: node scripts/generate-icons.cjs

const fs = require('fs');
const path = require('path');

const outFiles = [
  { dest: path.join(__dirname, '..', 'public', 'icon-192.png') },
  { dest: path.join(__dirname, '..', 'public', 'icon-512.png') },
  { dest: path.join(__dirname, '..', 'glowlink-native', 'assets', 'images', 'icon.png') },
  { dest: path.join(__dirname, '..', 'glowlink-native', 'assets', 'images', 'android-icon-foreground.png') },
  { dest: path.join(__dirname, '..', 'glowlink-native', 'assets', 'images', 'android-icon-background.png') },
  { dest: path.join(__dirname, '..', 'glowlink-native', 'assets', 'images', 'favicon.png') },
];

// A tiny 1x1 PNG (transparent) base64
const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

outFiles.forEach(({ dest }) => {
  ensureDir(dest);
  fs.writeFileSync(dest, Buffer.from(base64Png, 'base64'));
  console.log('Wrote', dest);
});

console.log('Placeholder icons generated. Replace with your real icons before production.');
