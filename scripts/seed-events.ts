/**
 * Seed script: creates Boekenbeurs events for April–December 2026.
 *
 * The Boekenbeurs takes place every first Saturday of the month at De Laethof.
 *
 * Gebruik: npx tsx scripts/seed-events.ts
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

/** Returns the day-of-month for the first Saturday of a given year/month. */
function firstSaturday(year: number, month: number): number {
  const day = new Date(Date.UTC(year, month - 1, 1)).getUTCDay(); // 0=Sun … 6=Sat
  return 1 + ((6 - day + 7) % 7);
}

async function seedEvents() {
  console.log("🌱 Seeding Boekenbeurs events (Apr–Dec 2026)...\n");

  const year = 2026;
  const events: { id: string; date: string; month: string }[] = [];

  for (let m = 4; m <= 12; m++) {
    const day = firstSaturday(year, m);
    const mm = String(m).padStart(2, "0");
    const dd = String(day).padStart(2, "0");

    const id = `event-boekenbeurs-${year}-${mm}`;
    const date = `${year}-${mm}-${dd}T11:00:00.000Z`;

    events.push({ id, date, month: mm });

    await client.createOrReplace({
      _id: id,
      _type: "event",
      title: "Boekenbeurs",
      date,
      location: "De Laethof, Putstraat 17, Eygelshoven",
      description: [
        {
          _type: "block",
          _key: `bk-${mm}-1`,
          style: "normal",
          children: [
            {
              _type: "span",
              _key: `bk-${mm}-1s`,
              text: "Maandelijkse boekenbeurs, elke eerste zaterdag van de maand van 11:00 tot 15:00 uur in De Laethof (oude raadszaal). Gratis toegang.",
            },
          ],
          markDefs: [],
        },
      ],
    });
  }

  console.log("\n✅ Seed voltooid!");
  console.log(`   - ${events.length} Boekenbeurs evenementen aangemaakt:`);
  for (const e of events) {
    console.log(`     ${e.id}  →  ${e.date}`);
  }
}

seedEvents().catch(console.error);
