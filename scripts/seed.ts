/**
 * Seed script: importeert alle content van de oude SEDDEH website in Sanity.
 *
 * Gebruik: npx tsx scripts/seed.ts
 *
 * Vereist: SANITY_API_READ_TOKEN in .env.local (met write-rechten)
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

async function seed() {
  console.log("🌱 Seeding Sanity dataset...\n");

  // ──────────────────────────────────────────────
  // 1. Site Settings
  // ──────────────────────────────────────────────
  console.log("→ Site instellingen...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Stichting Eygelshoven door de Eeuwen Heen",
    description:
      "Heemkundevereniging voor Eygelshoven. Wij verzamelen, bewaren en ontsluiten de rijke historie van ons dorp.",
    contactEmail: "info.seddeh@gmail.com",
    contactPhone: "045-2057088",
    address: "Laethof Putstraat 17\n6471 GB Eygelshoven\nNederland",
    archiveRequestInfo: [
      {
        _type: "block",
        _key: "archinfo1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "archinfo1span",
            text: "Ons archief is niet publiek toegankelijk, maar wel beschikbaar op aanvraag. U kunt langskomen bij De Laethof om stukken in te zien na het indienen van een aanvraag.",
          },
        ],
        markDefs: [],
      },
    ],
  });

  // ──────────────────────────────────────────────
  // 2. Pages - De Stichting hoofdpagina
  // ──────────────────────────────────────────────
  console.log("→ Pagina's...");

  await client.createOrReplace({
    _id: "page-de-stichting",
    _type: "page",
    title: "De Stichting",
    slug: { _type: "slug", current: "de-stichting" },
    body: [
      {
        _type: "block",
        _key: "ds1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "ds1s",
            text: 'Stichting "Eygelshoven door de eeuwen heen" werd opgericht op 30 november 1981. Hoewel wij officieel een stichting zijn, vervullen wij de rol van de heemkundevereniging voor Eygelshoven. Ons doel is het verzamelen, bewaren en ontsluiten van de rijke historie van ons dorp en zijn inwoners.',
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "ds2",
        style: "h2",
        children: [
          { _type: "span", _key: "ds2s", text: "Het ontstaan" },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "ds3",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "ds3s",
            text: "De stichting is voortgekomen uit het 850-jarig bestaan van Eygelshoven in 1981. Ter gelegenheid van dit jubileum stelde de toenmalige gemeente Eygelshoven een werkgroep samen om een gedenkboek te schrijven. De hoeveelheid informatie en uniek fotomateriaal die tijdens dit onderzoek naar boven kwam was zo overweldigend, dat de leden besloten een blijvende historische organisatie op te richten.",
          },
        ],
        markDefs: [],
      },
    ],
    seoDescription:
      "Stichting Eygelshoven door de eeuwen heen - heemkundevereniging opgericht in 1981",
  });

  // Wat is De Laethof
  await client.createOrReplace({
    _id: "page-wat-is-de-laethof",
    _type: "page",
    title: "Wat is De Laethof",
    slug: { _type: "slug", current: "wat-is-de-laethof" },
    body: [
      {
        _type: "block",
        _key: "la1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "la1s",
            text: "De Laethof is het onderkomen van de stichting en heeft een rijke historische betekenis. De naam verwijst naar de Laetbank, welke eeuwenlang daar haar zetel had. Dit instituut had jurisdictie over het grondgebied van Eygelshoven en omliggende gemeentegronden.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "la2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "la2s",
            text: "De ontstaan van deze Laetbank hangt nauw samen met de vorming van Eygelshoven als zelfstandige plaats.",
          },
        ],
        markDefs: [],
      },
    ],
    seoDescription: "De Laethof - historische zetel van de Laetbank in Eygelshoven",
  });

  // De Doelstellingen
  await client.createOrReplace({
    _id: "page-de-doelstellingen",
    _type: "page",
    title: "De Doelstellingen",
    slug: { _type: "slug", current: "de-doelstellingen" },
    body: [
      {
        _type: "block",
        _key: "doel1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "doel1s",
            text: "De stichting stelt zich ten doel onderzoek te verrichten omtrent de geschiedenis van Eygelshoven in de ruimste zin des woords en de resultaten hiervan beschikbaar te stellen aan de gemeenschap.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "doel2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "doel2s",
            text: "De organisatie tracht haar doel te bereiken door:",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "doel3",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            _key: "doel3s",
            text: "Het verzamelen, catalogiseren, bewaren en toegankelijk maken van documenten",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "doel4",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [
          {
            _type: "span",
            _key: "doel4s",
            text: "Het behouden van publicaties, foto's en films over het verleden",
          },
        ],
        markDefs: [],
      },
    ],
    seoDescription: "Doelstellingen van Stichting Eygelshoven door de eeuwen heen",
  });

  // Geschiedenis
  await client.createOrReplace({
    _id: "page-geschiedenis",
    _type: "page",
    title: "Geschiedenis",
    slug: { _type: "slug", current: "geschiedenis" },
    body: [
      {
        _type: "block",
        _key: "gesch1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "gesch1s",
            text: "Eygelshoven (lokaal: Egelze; Kerkraads: Ejelser) is een dorp in het zuidoosten van Limburg dat deel uitmaakt van de gemeente Kerkrade. Tot de gemeentelijke herindeling van 1982 was het een zelfstandige gemeente. De kern had rond 2005 ongeveer 2.240 inwoners; samen met de buurtschappen Hopel, De Vink en Waubacherveld groeide dit aantal aanzienlijk.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "gesch2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "gesch2s",
            text: 'De stichting "Eygelshoven door de eeuwen heen" werd opgericht op 30 november 1981. Het ontstond naar aanleiding van het 850-jarig bestaan van Eygelshoven datzelfde jaar. De gemeente Eygelshoven vormde een werkgroep voor het samenstellen van een gedenkboek. Door de grote hoeveelheid verzameld informatie- en fotomateriaal ontstond het initiatief om een historische vereniging op te richten.',
          },
        ],
        markDefs: [],
      },
    ],
    seoDescription:
      "Geschiedenis van Eygelshoven en de stichting",
  });

  // Het wapen van Eygelshoven
  await client.createOrReplace({
    _id: "page-het-wapen-van-eygelshoven",
    _type: "page",
    title: "Het Wapen van Eygelshoven",
    slug: { _type: "slug", current: "het-wapen-van-eygelshoven" },
    body: [
      {
        _type: "block",
        _key: "wapen1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "wapen1s",
            text: "Hoewel Eygelshoven in 1931 al 800 jaar bestond, bezat zij tot die tijd geen eigen gemeentewapen. De jubileumfeesten gaven aanleiding voor de gemeenteraad om een verzoek bij de koningin in te dienen om als gemeente een eigen wapen te mogen voeren.",
          },
        ],
        markDefs: [],
      },
    ],
    seoDescription: "Het gemeentewapen van Eygelshoven",
  });

  // Publicaties (placeholder - meer content handmatig toevoegen)
  await client.createOrReplace({
    _id: "page-publicaties",
    _type: "page",
    title: "Publicaties",
    slug: { _type: "slug", current: "publicaties" },
    body: [
      {
        _type: "block",
        _key: "pub1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "pub1s",
            text: 'Bij de Stichting "Eygelshoven door de eeuwen heen" zijn de volgende eigen uitgaven nog verkrijgbaar (alle genoemde prijzen zijn excl. eventuele verzendkosten).',
          },
        ],
        markDefs: [],
      },
    ],
    seoDescription: "Publicaties van Stichting Eygelshoven door de eeuwen heen",
  });

  // Monumenten (placeholder)
  await client.createOrReplace({
    _id: "page-monumenten",
    _type: "page",
    title: "Monumenten",
    slug: { _type: "slug", current: "monumenten" },
    body: [
      {
        _type: "block",
        _key: "mon1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "mon1s",
            text: "Eygelshoven kent verschillende historische monumenten die getuigen van de rijke geschiedenis van het dorp.",
          },
        ],
        markDefs: [],
      },
    ],
    seoDescription: "Monumenten in Eygelshoven",
  });

  // ──────────────────────────────────────────────
  // 3. Board Members
  // ──────────────────────────────────────────────
  console.log("→ Bestuursleden...");

  const boardMembers = [
    { name: "Joep Prevo", role: "Voorzitter — Fotoarchief", order: 1 },
    { name: "Wim Simons", role: "1e Secretaris — P.R. & Mijnproject", order: 2 },
    { name: "Maria Brull", role: "1e Penningmeester — Boekenbeurs", order: 3 },
    { name: "Ria Berikoven", role: "Algemeen Bestuurslid — Archief", order: 5 },
  ];

  for (const member of boardMembers) {
    await client.createOrReplace({
      _id: `board-${member.name.toLowerCase().replace(/\s/g, "-")}`,
      _type: "boardMember",
      name: member.name,
      role: member.role,
      order: member.order,
    });
  }

  // ──────────────────────────────────────────────
  // 4. Publication
  // ──────────────────────────────────────────────
  console.log("→ Publicaties...");

  await client.createOrReplace({
    _id: "pub-memoires-henckels",
    _type: "publication",
    title: "Memoires van luitenant Henckels",
    description:
      "Het dagboek van Leonard Henckels uit Eygelshoven, in dienst van Napoleon. In dit boek komen geen systematische beschrijvingen van veldslagen voor, maar wel tal van persoonlijke ervaringen.",
  });

  // ──────────────────────────────────────────────
  // 5. Events
  // ──────────────────────────────────────────────
  console.log("→ Evenementen...");

  await client.createOrReplace({
    _id: "event-boekenbeurs",
    _type: "event",
    title: "Boekenbeurs",
    date: "2026-04-04T11:00:00.000Z",
    location: "De Laethof, Putstraat 17, Eygelshoven",
    description: [
      {
        _type: "block",
        _key: "bk1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "bk1s",
            text: "Maandelijkse boekenbeurs, elke eerste zaterdag van de maand vanaf 11:00 uur in De Laethof (oude raadszaal). De boekenbeurs heeft een vaste klantenkring opgebouwd en enige bekendheid in de regio. Elke maand is er nieuwe voorraad met diverse boekselecties.",
          },
        ],
        markDefs: [],
      },
    ],
  });

  // ──────────────────────────────────────────────
  // 6. Kennisbank Categories
  // ──────────────────────────────────────────────
  console.log("→ Kennisbank categorieën...");

  const categories = [
    {
      id: "cat-genealogie",
      name: "Genealogie & Stambomen",
      slug: "genealogie-stambomen",
      description: "Websites voor stamboomonderzoek en familiegeschiedenis",
      order: 1,
    },
    {
      id: "cat-kadaster",
      name: "Kadaster & Archieven",
      slug: "kadaster-archieven",
      description: "Kadastergegevens en archiefdiensten",
      order: 2,
    },
    {
      id: "cat-regionale-historie",
      name: "Regionale Historie",
      slug: "regionale-historie",
      description: "Historische bronnen over Limburg en omstreken",
      order: 3,
    },
    {
      id: "cat-heemkunde",
      name: "Heemkundeverenigingen",
      slug: "heemkundeverenigingen",
      description: "Zusterorganisaties en heemkundekringen",
      order: 4,
    },
    {
      id: "cat-overige",
      name: "Overige Websites",
      slug: "overige-websites",
      description: "Diverse nuttige websites",
      order: 5,
    },
  ];

  for (const cat of categories) {
    await client.createOrReplace({
      _id: cat.id,
      _type: "kennisbankCategory",
      name: cat.name,
      slug: { _type: "slug", current: cat.slug },
      description: cat.description,
      order: cat.order,
    });
  }

  // ──────────────────────────────────────────────
  // 7. Kennisbank Links
  // ──────────────────────────────────────────────
  console.log("→ Kennisbank links...");

  const links = [
    // Kadaster & Archieven
    {
      id: "link-kadaster-eygelshoven",
      title: "Kadaster Eygelshoven",
      url: "https://aezel.eu/en/onderzoeken/ada/NL-LI-EGH00",
      description: "Kadasteronderzoek Eygelshoven via Aezel.eu",
      category: "cat-kadaster",
      featured: true,
    },
    {
      id: "link-aezel",
      title: "Aezel.eu",
      url: "https://aezel.eu/en",
      description: "Platform voor historisch onderzoek en kadastergegevens",
      category: "cat-kadaster",
      featured: true,
    },
    // Genealogie
    {
      id: "link-allelimburgers",
      title: "AlleLimburgers",
      url: "https://www.allelimburgers.nl",
      description: "Doorzoek Limburgse genealogische bronnen",
      category: "cat-genealogie",
      featured: true,
    },
    {
      id: "link-familienaam-kaart",
      title: "Familienaam op kaart van Nederland",
      url: "https://www.cbgfamilienamen.nl/nfb/",
      description: "Bekijk de verspreiding van familienamen op de kaart",
      category: "cat-genealogie",
      featured: false,
    },
    {
      id: "link-geneaknowhow",
      title: "Geneaknowhow",
      url: "https://www.geneaknowhow.net",
      description: "Genealogische zoekmachine en bronnenportaal",
      category: "cat-genealogie",
      featured: false,
    },
    {
      id: "link-genealogie-limburg",
      title: "Genealogie in Limburg",
      url: "https://www.genealogielimburg.net",
      description: "Genealogische bronnen specifiek voor Limburg",
      category: "cat-genealogie",
      featured: false,
    },
    {
      id: "link-foine-hendriks",
      title: "Genealogische server Foine Hendriks",
      url: "https://www.foinehendriks.nl",
      description: "Genealogische database van Foine Hendriks",
      category: "cat-genealogie",
      featured: false,
    },
    {
      id: "link-genpals",
      title: "Genpals",
      url: "https://www.genpals.nl",
      description: "Genealogisch samenwerkingsplatform",
      category: "cat-genealogie",
      featured: false,
    },
    {
      id: "link-genver",
      title: "Genver (toegang op FamilySearch)",
      url: "https://www.genver.nl",
      description: "Nederlandse toegang tot FamilySearch bronnen",
      category: "cat-genealogie",
      featured: false,
    },
    {
      id: "link-wiewaswie",
      title: "Wie Was Wie",
      url: "https://www.wiewaswie.nl",
      description: "Zoek in miljoenen historische aktes en documenten",
      category: "cat-genealogie",
      featured: true,
    },
    {
      id: "link-watwaswaar",
      title: "WatWasWaar",
      url: "https://www.watwaswaar.nl",
      description: "Historische bronnen doorzoeken op locatie",
      category: "cat-genealogie",
      featured: false,
    },
    {
      id: "link-ned-familienamen",
      title: "Nederlandse Familienamen Databank",
      url: "https://www.meertens.knaw.nl/nfb/",
      description: "Onderzoek naar Nederlandse familienamen (Meertens Instituut)",
      category: "cat-genealogie",
      featured: false,
    },
    {
      id: "link-stamboomgids",
      title: "Stamboomgids",
      url: "https://www.stamboomgids.nl",
      description: "Wegwijzer voor genealogisch onderzoek in Nederland",
      category: "cat-genealogie",
      featured: false,
    },
    {
      id: "link-kwartierstraat",
      title: "Kwartierstraat.nl",
      url: "https://www.kwartierstraat.nl",
      description: "Genealogisch platform",
      category: "cat-genealogie",
      featured: false,
    },
    // Regionale Historie
    {
      id: "link-genwiki-limburg",
      title: "Genwiki Limburg",
      url: "https://www.genwiki.nl/limburg",
      description: "Wiki met genealogische en historische informatie over Limburg",
      category: "cat-regionale-historie",
      featured: false,
    },
    {
      id: "link-historie-roermond",
      title: "Historie Roermond",
      url: "https://www.historieroermond.nl",
      description: "Historische informatie over de stad Roermond",
      category: "cat-regionale-historie",
      featured: false,
    },
    {
      id: "link-limburgse-emigranten",
      title: "Limburgse emigranten",
      url: "https://www.limburgseemigranten.nl",
      description: "Database van Limburgse emigranten",
      category: "cat-regionale-historie",
      featured: false,
    },
    {
      id: "link-limburgs-museum",
      title: "Limburgs Museum",
      url: "https://www.limburgsmuseum.nl",
      description: "Museum voor de geschiedenis en cultuur van Limburg",
      category: "cat-regionale-historie",
      featured: false,
    },
    // Overige
    {
      id: "link-uniformen",
      title: "Uniformen",
      url: "https://www.uniformen.nl",
      description: "Informatie over historische uniformen",
      category: "cat-overige",
      featured: false,
    },
  ];

  for (const link of links) {
    await client.createOrReplace({
      _id: link.id,
      _type: "kennisbankLink",
      title: link.title,
      url: link.url,
      description: link.description,
      category: { _type: "reference", _ref: link.category },
      featured: link.featured,
    });
  }

  console.log("\n✅ Seed voltooid!");
  console.log(`   - 7 pagina's`);
  console.log(`   - ${boardMembers.length} bestuursleden`);
  console.log(`   - 1 publicatie`);
  console.log(`   - 1 evenement`);
  console.log(`   - ${categories.length} kennisbank categorieën`);
  console.log(`   - ${links.length} kennisbank links`);
  console.log(`   - 1 site instellingen`);
}

seed().catch(console.error);
