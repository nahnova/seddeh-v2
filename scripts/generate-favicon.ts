/**
 * Generates favicon files from the wapen van Eygelshoven.
 * Blue background (#1e3a5f) with the wapen centered.
 *
 * Gebruik: npx tsx scripts/generate-favicon.ts
 */

import sharp from "sharp";
import path from "path";

const BLUE = { r: 30, g: 58, b: 95 }; // primary-dark from the site theme
const PUBLIC = path.join(__dirname, "..", "public");
const APP = path.join(__dirname, "..", "src", "app");
const WAPEN = path.join(PUBLIC, "wapen-eygelshoven.png");

async function generate() {
  console.log("🎨 Generating favicons...\n");

  // Load the wapen and get metadata
  const wapen = sharp(WAPEN);
  const meta = await wapen.metadata();
  console.log(`→ Source: ${meta.width}x${meta.height}`);

  // Generate favicon.ico (32x32) — goes in src/app/ for Next.js
  const favicon32 = await sharp({
    create: { width: 32, height: 32, channels: 4, background: { ...BLUE, alpha: 1 } },
  })
    .composite([
      {
        input: await sharp(WAPEN).resize(24, 24, { fit: "contain", background: { ...BLUE, alpha: 1 } }).png().toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toBuffer();

  await sharp(favicon32).toFile(path.join(APP, "favicon.ico"));
  console.log("→ favicon.ico (32x32) → src/app/");

  // Generate icon.png (192x192) for PWA/browsers
  const icon192 = await sharp({
    create: { width: 192, height: 192, channels: 4, background: { ...BLUE, alpha: 1 } },
  })
    .composite([
      {
        input: await sharp(WAPEN).resize(144, 144, { fit: "contain", background: { ...BLUE, alpha: 1 } }).png().toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toFile(path.join(APP, "icon.png"));
  console.log("→ icon.png (192x192) → src/app/");

  // Generate apple-icon.png (180x180)
  const appleIcon = await sharp({
    create: { width: 180, height: 180, channels: 4, background: { ...BLUE, alpha: 1 } },
  })
    .composite([
      {
        input: await sharp(WAPEN).resize(136, 136, { fit: "contain", background: { ...BLUE, alpha: 1 } }).png().toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toFile(path.join(APP, "apple-icon.png"));
  console.log("→ apple-icon.png (180x180) → src/app/");

  // Generate OG image (1200x630) — blue bg with wapen centered
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { ...BLUE, alpha: 1 } },
  })
    .composite([
      {
        input: await sharp(WAPEN).resize(300, 300, { fit: "contain", background: { ...BLUE, alpha: 1 } }).png().toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toFile(path.join(APP, "opengraph-image.png"));
  console.log("→ opengraph-image.png (1200x630) → src/app/");

  console.log("\n✅ Alle favicons en OG image gegenereerd!");
}

generate().catch(console.error);
