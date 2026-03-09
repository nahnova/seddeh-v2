/**
 * Seed script: downloadt galerij-afbeeldingen van de oude site en uploadt ze naar Sanity.
 *
 * Gebruik: npx tsx scripts/seed-gallery.ts
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_READ_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const BASE = "https://stichting-eygelshovendoordeeeuwenheen.nl/wp-content/uploads/2024/07";

const imageFiles = [
  "asset-14.jpeg",
  "asset-0.jpeg",
  "asset-1.jpeg",
  "asset-2.jpeg",
  "asset-3-1.jpeg",
  "asset-4-1.jpeg",
  "asset-5-1.jpeg",
  "asset-6-1.jpeg",
  "asset-7.jpeg",
  "asset-8-1.jpeg",
  "asset-9.jpeg",
  "asset-10.jpeg",
  "asset-11.jpeg",
  "asset-12.jpeg",
  "asset-13.jpeg",
];

async function uploadImage(url: string, filename: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/jpeg",
  });
  return asset;
}

async function seed() {
  console.log("🖼️  Seeding galerij: Mijnproject oud...\n");

  const galleryImages = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const url = `${BASE}/${filename}`;
    console.log(`→ [${i + 1}/${imageFiles.length}] Downloading ${filename}...`);

    try {
      const asset = await uploadImage(url, filename);
      console.log(`  ✓ Uploaded as ${asset._id}`);
      galleryImages.push({
        _type: "galleryImage",
        _key: `img-${i}`,
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
        alt: `Mijnproject oud - foto ${i + 1}`,
      });
    } catch (err) {
      console.error(`  ✗ Failed: ${err}`);
    }
  }

  if (galleryImages.length === 0) {
    console.error("No images uploaded, aborting gallery creation.");
    return;
  }

  // Use first image as cover
  const coverAssetRef = galleryImages[0].image.asset._ref;

  console.log(`\n→ Creating gallery document...`);
  await client.createOrReplace({
    _id: "gallery-mijnproject-oud",
    _type: "gallery",
    title: "Mijnproject oud",
    slug: { _type: "slug", current: "mijnproject-oud" },
    description:
      "Historische foto's van het mijnproject — het leven en werken tussen de schachten van de Laura en Julia.",
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverAssetRef },
    },
    images: galleryImages,
  });

  console.log(`\n✅ Galerij aangemaakt met ${galleryImages.length} afbeeldingen!`);
}

seed().catch(console.error);
