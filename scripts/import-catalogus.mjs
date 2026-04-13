/**
 * Import script for Boekenarchief catalogus.
 * Reads the Excel file sheet by sheet and creates Sanity documents.
 *
 * Usage:
 *   node scripts/import-catalogus.mjs                    # dry-run (shows parsed data)
 *   node scripts/import-catalogus.mjs --commit           # actually write to Sanity
 *   node scripts/import-catalogus.mjs --sheet "AC Archeologie"  # single sheet only
 *   node scripts/import-catalogus.mjs --commit --sheet "AC Archeologie"
 */

import { createClient } from "@sanity/client";
import XLSX from "xlsx";
import { readFileSync } from "fs";
import { resolve } from "path";

const EXCEL_PATH = resolve(
  process.env.HOME,
  "Downloads/Catalogus Boekenarchief.xlsx",
);

const client = createClient({
  projectId: "sglv0dfa",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

/** Map sheet names to Sanity category slugs */
const SHEET_CATEGORY_MAP = {
  "AC Archeologie": "archeologie",
  "AR Archieven": "archieven",
  "DC Dialecten": "dialecten",
  "EG Eygelsh-Kerkr Gemeenten": "eygelshoven-gemeente",
  "EH Eygelshoven historie": "eygelshoven-historie",
  "EP Eygelshoven Parochies": "eygelshoven-parochies",
  "EV Eygelshoven Verenigingen": "eygelshoven-verenigingen",
  "GD Godsdienst": "godsdienst",
  "GE Genealogie": "genealogie",
  "HP Hopel": "hopel",
  "LH Limburg Historie": "limburg-historie",
  "MA Mijnbouw algemeen": "mijnbouw-algemeen",
  "ML Mijnbouw L&V": "mijnbouw-laura-vereeniging",
  "OR Oorlog": "oorlog",
  "OW Onderwijs": "onderwijs",
  "PL Paleografie": "paleografie",
  "RH Regio Historie": "regio-historie",
  "XY Diverse onderwerpen": "diverse",
};

/**
 * Parse a single sheet into an array of book objects.
 * Each sheet has:
 *   Row 0: count, code, category name, ...
 *   Row 1: "Boeken", "Auteur", "Boeknummer", "Titel"
 *   Row 2: empty
 *   Row 3+: data
 */
function parseSheet(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) throw new Error(`Sheet "${sheetName}" not found`);

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
  const items = [];
  let lastBookNumber = "";
  /** Track how many times each bookNumber has appeared */
  const seen = {};

  // Data starts at row index 3 (0-based)
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];
    const author = String(row[1] || "").trim();
    let bookNumber = String(row[2] || "").trim();
    const title = String(row[3] || "").trim();

    // Skip empty rows
    if (!bookNumber && !title) continue;
    // Skip rows without a title
    if (!title) continue;

    // Rows without a book number inherit from the previous entry
    if (!bookNumber) {
      bookNumber = lastBookNumber;
    }
    lastBookNumber = bookNumber;

    // Track duplicates and create unique IDs
    if (!seen[bookNumber]) {
      seen[bookNumber] = 0;
    }
    seen[bookNumber]++;

    // For the first occurrence use the plain number, subsequent ones get a suffix
    const uniqueNumber =
      seen[bookNumber] === 1 ? bookNumber : `${bookNumber}-${String.fromCharCode(96 + seen[bookNumber])}`;

    items.push({
      bookNumber: uniqueNumber,
      title,
      author: author || undefined,
    });
  }

  return items;
}

/**
 * Create a deterministic document ID from the book number.
 */
function docId(bookNumber) {
  return `library-${bookNumber.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
}

async function run() {
  const args = process.argv.slice(2);
  const commitMode = args.includes("--commit");
  const sheetIdx = args.indexOf("--sheet");
  const singleSheet = sheetIdx !== -1 ? args[sheetIdx + 1] : null;

  console.log(`Mode: ${commitMode ? "COMMIT (writing to Sanity)" : "DRY-RUN (preview only)"}\n`);

  const buf = readFileSync(EXCEL_PATH);
  const workbook = XLSX.read(buf, { type: "buffer" });

  const sheets = singleSheet ? [singleSheet] : Object.keys(SHEET_CATEGORY_MAP);
  let totalItems = 0;
  let totalCreated = 0;

  for (const sheetName of sheets) {
    const category = SHEET_CATEGORY_MAP[sheetName];
    if (!category) {
      console.log(`⏭  Skipping "${sheetName}" (not in category map)\n`);
      continue;
    }

    const items = parseSheet(workbook, sheetName);
    totalItems += items.length;

    console.log(`📋 ${sheetName} → ${category} (${items.length} items)`);

    if (items.length === 0) {
      console.log("   (geen items)\n");
      continue;
    }

    // Show first 3 items as preview
    for (const item of items.slice(0, 3)) {
      console.log(`   ${item.bookNumber} | ${item.author || "—"} | ${item.title}`);
    }
    if (items.length > 3) {
      console.log(`   ... en ${items.length - 3} meer`);
    }

    if (commitMode) {
      // Use transactions for efficiency (batch per sheet)
      let tx = client.transaction();
      let batchCount = 0;

      for (const item of items) {
        if (!item.bookNumber) {
          console.log(`   ⚠ Overgeslagen (geen boeknummer): "${item.title}"`);
          continue;
        }

        tx = tx.createOrReplace({
          _id: docId(item.bookNumber),
          _type: "libraryItem",
          bookNumber: item.bookNumber,
          title: item.title,
          author: item.author,
          category,
        });
        batchCount++;

        // Sanity transactions have a size limit, flush every 100
        if (batchCount >= 100) {
          await tx.commit();
          tx = client.transaction();
          batchCount = 0;
        }
      }

      if (batchCount > 0) {
        await tx.commit();
      }

      totalCreated += items.length;
      console.log(`   ✓ ${items.length} items geschreven naar Sanity`);
    }

    console.log();
  }

  console.log(`\nTotaal: ${totalItems} items geparsed${commitMode ? `, ${totalCreated} geschreven` : ""}`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
