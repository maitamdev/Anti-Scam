/**
 * Build ANTISCAM Extension to ZIP
 * Usage: node scripts/build-extension.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EXTENSION_DIR = path.join(__dirname, '..', 'extension');
const OUTPUT_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'antiscam-extension.zip');

console.log('📦 Building ANTISCAM Extension...\n');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Remove old ZIP if exists
if (fs.existsSync(OUTPUT_FILE)) {
  fs.unlinkSync(OUTPUT_FILE);
  console.log('🗑️  Removed old ZIP file');
}

// Create ZIP using PowerShell
try {
  const command = `Compress-Archive -Path "${EXTENSION_DIR}\\*" -DestinationPath "${OUTPUT_FILE}" -Force`;
  execSync(`powershell -Command "${command}"`, { stdio: 'inherit' });
  
  const stats = fs.statSync(OUTPUT_FILE);
  const sizeInKB = (stats.size / 1024).toFixed(2);
  
  console.log('\n✅ Extension built successfully!');
  console.log(`📁 Output: ${OUTPUT_FILE}`);
  console.log(`📊 Size: ${sizeInKB} KB`);
  console.log('\n💡 Extension ready to download at: /antiscam-extension.zip');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
