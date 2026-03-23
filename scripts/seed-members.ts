import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: "sglv0dfa",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
});

const members = [
  { _id: "member-joep-prevo", name: "Joep Prevo", role: "Voorzitter · Fotografie en fotoarchief", order: 1 },
  { _id: "member-wim-simons", name: "Wim Simons", role: "1e Secretaris · PR & Voorlichting", order: 2 },
  { _id: "member-maria-brull", name: "Maria Brull", role: "1e Penningmeester · Boekenbeurs", order: 3 },
  { _id: "member-ria-berikoven", name: "Ria Berikoven", role: "Algemeen Bestuurslid · Archief", order: 4 },
  { _id: "member-andre-kok", name: "Andre Kok", role: "Algemeen Bestuurslid", order: 5 },
  { _id: "member-margot-spapens", name: "Margot Spapens", role: "Boekenbeurs", order: 6 },
  { _id: "member-jana-fiala", name: "Jana Fiala", role: "Boekenbeurs", order: 7 },
  { _id: "member-pascal-vreuls", name: "Pascal Vreuls", role: "Fotografie en fotoarchief", order: 8 },
  { _id: "member-wiel-handels", name: "Wiel Handels", role: "Historie", order: 9 },
  { _id: "member-john-coervers", name: "John Coervers", role: "Mijnproject", order: 10 },
  { _id: "member-boudewijn-nols", name: "Boudewijn Nols", role: "PR & Voorlichting", order: 11 },
];

async function main() {
  const tx = client.transaction();
  for (const m of members) {
    tx.createOrReplace({ ...m, _type: "member" });
  }
  const result = await tx.commit();
  console.log(`✓ ${result.documentIds.length} leden aangemaakt`);
}

main().catch((err) => {
  console.error("Fout:", err.message);
  if (err.message.includes("permission")) {
    console.error("\nJe hebt een write token nodig. Maak er een aan op:");
    console.error("https://www.sanity.io/manage/project/sglv0dfa/api#tokens");
    console.error("\nVoeg toe aan .env.local:");
    console.error("SANITY_API_WRITE_TOKEN=sk...");
  }
  process.exit(1);
});
