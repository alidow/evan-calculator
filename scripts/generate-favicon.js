const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon-simple.svg'));
  
  // Generate PNG versions
  const sizes = [16, 32, 48, 64, 128, 256];
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/favicon-${size}x${size}.png`));
  }
  
  // Copy the main favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../app/favicon.ico'));
    
  console.log('Favicons generated successfully!');
}

generateFavicon().catch(console.error);