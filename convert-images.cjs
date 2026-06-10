/**
 * Script konversi gambar ke WebP untuk BouquetWeb
 * Gambar yang aktif dipakai di kode sumber:
 *   - BG-aboutUs.jpg    -> BG-aboutUs.webp
 *   - tes.jpeg          -> tes.webp
 *   - hero-fruit.png    -> hero-fruit.webp
 *   - hero-satin.png    -> hero-satin.webp
 *   - hero-money.png    -> hero-money.webp
 *   - float-strawberry.png -> float-strawberry.webp
 *   - float-petal.png   -> float-petal.webp
 *   - float-money.png   -> float-money.webp
 *   - Logo.png          -> Logo.webp
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imgDir = path.join(__dirname, 'public', 'img');

const targets = [
  // [inputFile, quality, maxWidth]
  ['BG-aboutUs.jpg',       80, 1920],
  ['tes.jpeg',             85, 1200],
  ['hero-fruit.png',       88, 1600],
  ['hero-satin.png',       88, 1600],
  ['hero-money.png',       88, 1600],
  ['float-strawberry.png', 85, 800],
  ['float-petal.png',      85, 800],
  ['float-money.png',      85, 800],
  ['Logo.png',             90, 600],
];

async function convert() {
  console.log('🚀 Mulai konversi gambar ke WebP...\n');
  let totalSaved = 0;

  for (const [filename, quality, maxWidth] of targets) {
    const inputPath  = path.join(imgDir, filename);
    const outputName = filename.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(imgDir, outputName);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skip (tidak ada): ${filename}`);
      continue;
    }

    const originalSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const saved   = originalSize - newSize;
    const pct     = Math.round((saved / originalSize) * 100);
    totalSaved   += saved;

    console.log(
      `✅ ${filename.padEnd(30)} → ${outputName}\n` +
      `   ${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB  (-${pct}%)\n`
    );
  }

  console.log(`\n🎉 Selesai! Total ukuran dihemat: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

convert().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
