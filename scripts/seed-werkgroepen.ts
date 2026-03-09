/**
 * Seed script: importeert werkgroepen content van de oude SEDDEH website in Sanity.
 *
 * Gebruik: npx tsx scripts/seed-werkgroepen.ts
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

// Helper to create a portable text block
function block(
  key: string,
  text: string,
  style: string = "normal",
  opts?: { listItem?: string; level?: number; marks?: string[]; markDefs?: Array<{ _key: string; _type: string; [k: string]: unknown }> }
) {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: opts?.markDefs ?? [],
    ...(opts?.listItem ? { listItem: opts.listItem, level: opts.level ?? 1 } : {}),
    children: [
      {
        _type: "span",
        _key: `${key}s`,
        text,
        marks: opts?.marks ?? [],
      },
    ],
  };
}

const werkgroepen = [
  {
    _id: "werkgroep-archief",
    _type: "werkgroep",
    name: "Archief",
    slug: { _type: "slug", current: "archief" },
    members: ["Ria Berikoven"],
    description: [
      block("ar1", "De werkgroep Archief staat onder leiding van Ria Berikoven. Bent u op zoek naar historische informatie over de Eygelshovense gemeenschap? Of wilt u meer weten over de regionale of Limburgse geschiedenis in bredere zin? Bij onze werkgroep kunt u terecht voor inzage in een schat aan archiefstukken."),
      block("ar2", "Onze Collectie", "h2"),
      block("ar3", "In ons archief bewaren we een aanzienlijke verzameling documenten en publicaties over vrijwel elk aspect van de Eygelshovense samenleving, waaronder:"),
      block("ar4", "Documentatie: Een omvangrijke bibliotheek, krantenknipsels en diverse publicaties over het heden en verleden.", "normal", { listItem: "bullet" }),
      block("ar5", "Kaartmateriaal: Een grote verzameling oude landkaarten en kadastrale kaarten.", "normal", { listItem: "bullet" }),
      block("ar6", "Thema's: Van de steenkoolmijnen, handel en industrie tot het verenigingsleven, parochiele geschiedenis en monumenten.", "normal", { listItem: "bullet" }),
      block("ar7", "Persoonlijk: Informatie over families, personen, jubilea en tradities.", "normal", { listItem: "bullet" }),
      block("ar8", "Leefomgeving: Gegevens over woningbouw, straten, wegen en de bestuurlijke geschiedenis.", "normal", { listItem: "bullet" }),
      block("ar9", "Modern Beheer", "h2"),
      block("ar10", "De werkgroep draagt zorg voor het zorgvuldig verzamelen, inventariseren en rubriceren van al dit materiaal. Dankzij onze digitale database kunnen we gevraagde informatie snel lokaliseren en aan u ter beschikking stellen."),
    ],
  },
  {
    _id: "werkgroep-boekenbeurs",
    _type: "werkgroep",
    name: "Boekenbeurs",
    slug: { _type: "slug", current: "boekenbeurs" },
    members: ["Margot Spapens", "Jana Fiala", "Maria Brull"],
    description: [
      block("bk1", 'De werkgroep Boekenbeurs maakt deel uit van de stichting "Eygelshoven door de eeuwen heen". Elke eerste zaterdag van de maand bent u van harte welkom in de oude raadszaal van de Laethof. Onze beurs heeft inmiddels een uitstekende reputatie in de regio en een trouwe klantenkring opgebouwd. Naast het snuffelen tussen de boeken is de beurs een belangrijke sociale ontmoetingsplaats.'),
      block("bk2", "Ruim assortiment en scherpe prijzen", "h2"),
      block("bk3", "Dankzij de maandelijkse nieuwe aanvoer is er altijd iets nieuws te ontdekken. Prijzen: EUR 0,50 | EUR 1,00 | EUR 2,00 of EUR 5,00."),
      block("bk4", "Romans, thrillers en oorlogsboeken.", "normal", { listItem: "bullet" }),
      block("bk5", "Reisgidsen, hobbyboeken, kookboeken en tuinboeken.", "normal", { listItem: "bullet" }),
      block("bk6", "Een uitgebreide collectie Limburgensia.", "normal", { listItem: "bullet" }),
      block("bk7", "Legpuzzels, posters, lp's (langspeelplaten), singles en dvd's.", "normal", { listItem: "bullet" }),
      block("bk8", "De eigen uitgaven van de stichting en de jaarlijkse kalender.", "normal", { listItem: "bullet" }),
      block("bk9", "Beleef de historie in het Mijnmuseum", "h2"),
      block("bk10", "Tijdens de openingstijden kunt u bovendien het mijnmuseum bezoeken. Hier ervaart u aan de hand van zien, ruiken en voelen hoe het leven en werken tussen de schachten van de mijnen Laura en Julia er vroeger uitzag."),
      block("bk11", "Boeken inleveren?", "h2"),
      block("bk12", "Gaat u verhuizen of bent u aan het opruimen? U kunt boeken bij ons inleveren. Contact via 045-2057088:"),
      block("bk13", "Maandag: 10.00 - 12.00 uur en 19.30 - 21.30 uur.", "normal", { listItem: "bullet" }),
      block("bk14", "Donderdag: 10.00 - 12.00 uur.", "normal", { listItem: "bullet" }),
      block("bk15", "Praktische Informatie", "h2"),
      block("bk16", "Wanneer: Elke eerste zaterdag van de maand, het hele jaar door.", "normal", { listItem: "bullet" }),
      block("bk17", "Tijd: 11.00 tot 15.00 uur.", "normal", { listItem: "bullet" }),
      block("bk18", "Locatie: De Laethof (oude raadszaal), Putstraat 17, Eygelshoven.", "normal", { listItem: "bullet" }),
    ],
  },
  {
    _id: "werkgroep-fotografie",
    _type: "werkgroep",
    name: "Fotografie en fotoarchief",
    slug: { _type: "slug", current: "fotografie-en-fotoarchief" },
    members: ["Joep Prevo", "Pascal Vreuls"],
    description: [
      block("fo1", "De werkgroep Fotografie en Fotoarchief wordt gevormd door Dhr. Joep Prevo en Dhr. Pascal Vreuls. Zij dragen zorg voor de uitgebreide beeldcollectie van de stichting. Hun hoofdtaak is het beheren en archiveren van alle foto's die aan de stichting zijn toevertrouwd."),
      block("fo2", "Wat zij doen", "h2"),
      block("fo3", "Digitalisering: Het professioneel inscannen van oude foto's, dia's en negatieven die aan ons worden geschonken of ter beschikking worden gesteld.", "normal", { listItem: "bullet" }),
      block("fo4", "Ondersteuning: Zij vormen de spil bij het samenstellen van onze jaarlijkse kalenders en tentoonstellingen door te zorgen voor hoogwaardig beeldmateriaal.", "normal", { listItem: "bullet" }),
      block("fo5", "Gemeenschap: Het aanleveren van historisch beeldmateriaal voor diverse projecten binnen de Eygelshovense gemeenschap.", "normal", { listItem: "bullet" }),
      block("fo6", "Help ons archief groeien!", "h2"),
      block("fo7", 'Hoewel stichting "Eygelshoven door de eeuwen heen" al over een uitgebreid archief beschikt, zijn aanvullingen altijd van harte welkom. Bent u aan het opruimen en komt u oude foto\'s, dia\'s, negatieven, filmbanden of videocassettes tegen die te maken hebben met Eygelshoven? Gooi ze niet weg! Wij doen een dringend beroep op u om contact met ons op te nemen. Mogelijk zitten er waardevolle "juweeltjes" tussen die ons fotoarchief kunnen verrijken.'),
      block("fo8", "Schenken of lenen?", "h2"),
      block("fo9", "Wilt u uw beeldmateriaal niet definitief afstaan? Geen probleem. Als u foto's tijdelijk ter beschikking stelt, maken wij een digitale kopie en krijgt u de originelen uiteraard onbeschadigd van ons terug."),
      block("fo10", "Contact: info.seddeh@gmail.com of via het contactformulier op de website."),
    ],
  },
  {
    _id: "werkgroep-genealogie",
    _type: "werkgroep",
    name: "Genealogie",
    slug: { _type: "slug", current: "genealogie" },
    members: [],
    description: [
      block("ge1", "Deze werkgroep zal te zijner tijd worden opgezet."),
    ],
  },
  {
    _id: "werkgroep-historie",
    _type: "werkgroep",
    name: "Historie",
    slug: { _type: "slug", current: "historie" },
    members: ["Wiel Handels"],
    description: [
      block("hi1", "De werkgroep Historie staat onder leiding van Wiel Handels. Deze werkgroep richt zich op het verzamelen en diepgaand bestuderen van historische gegevens over Eygelshoven. In nauwe samenwerking met de werkgroep Archief wordt deze informatie geordend en zorgvuldig bewaard voor de toekomst."),
      block("hi2", "Onderzoek en Publicaties", "h2"),
      block("hi3", "De werkgroep vertaalt historisch onderzoek naar boeiende verhalen. De bevindingen worden regelmatig gedeeld met de gemeenschap via diverse kanalen:"),
      block("hi4", "Artikelen: In onder andere de Anselbode, de jaarlijkse reeks Kerkrade onderweg en het Senior Bledsje.", "normal", { listItem: "bullet" }),
      block("hi5", 'Eigen uitgaven: Via de publicaties van stichting "Eygelshoven door de eeuwen heen".', "normal", { listItem: "bullet" }),
      block("hi6", "Lezingen: Wanneer een onderwerp zich daarvoor leent, organiseert de werkgroep interessante lezingen voor geinteresseerden.", "normal", { listItem: "bullet" }),
      block("hi7", "Het ontcijferen van het verleden", "h2"),
      block("hi8", "Een bijzonder aspect van deze werkgroep is het werken met oude, handgeschreven documenten. Veel van deze stukken zijn geschreven in handschriften die vandaag de dag nauwelijks nog leesbaar zijn. Door middel van transcriptie (het overzetten naar leesbare tekst) en specialistische kennis van paleografie (oud schrift), maakt de werkgroep deze documenten toegankelijk. Hierbij worden ook verouderde woorden en afkortingen verklaard, zodat de oorspronkelijke betekenis van de teksten niet verloren gaat."),
      block("hi9", "Advies en Begeleiding", "h2"),
      block("hi10", "Heeft u zelf plannen voor een historisch onderzoek of heeft u hulp nodig bij het interpreteren van oude teksten? Belangstellenden kunnen bij de werkgroep Historie terecht voor deskundig advies en begeleiding."),
    ],
  },
  {
    _id: "werkgroep-mijnproject",
    _type: "werkgroep",
    name: "Mijnproject",
    slug: { _type: "slug", current: "mijnproject" },
    members: ["John Coervers", "Jos Hubben"],
    description: [
      block("mp1", 'Geschiedenis is meer dan het verleden; het is een les in identiteit. Vragen als "Wie zijn we en waar komen we vandaan?" zijn vandaag de dag relevanter dan ooit. In onze regio spelen de voormalige mijnen daar een hoofdrol in. Hoewel de mijnen Laura (gesloten in 1970) en Julia (gesloten in 1974) fysiek nagenoeg uit het straatbeeld zijn verdwenen door het plan "van zwart naar groen", leeft het verleden voort bij onze stichting. Onder het motto "Er is geen heden zonder verleden" laten wij de mijnindustrie herleven.'),
      block("mp2", "Educatie: De jeugd laten ontdekken", "h2"),
      block("mp3", "Het mijnproject heeft een uitgesproken educatief karakter. Wij willen de jeugd laten ontdekken hoe wezenlijk de mijnindustrie deel uitmaakte van onze regionale identiteit."),
      block("mp4", "Doelgroep: Groep 7 en 8 van de basisschool en de onderbouw van het voortgezet onderwijs.", "normal", { listItem: "bullet" }),
      block("mp5", "Lesmateriaal: Wij hebben een speciale lesbrief, een vraag- en opdrachtenboekje en een dvd met beeldmateriaal ontwikkeld.", "normal", { listItem: "bullet" }),
      block("mp6", 'Samenwerking: Scholen zoals "De Veldhof" en basisschool Schaesberg zijn vaste bezoekers. Zij kunnen gratis gebruikmaken van onze lesmaterialen.', "normal", { listItem: "bullet" }),
      block("mp7", "Bezoek met uw groep of vereniging", "h2"),
      block("mp8", "Niet alleen scholen, maar ook families, verenigingen en andere groepen zijn van harte welkom. Wij bieden een uniek en interactief programma van ongeveer 2,5 uur:"),
      block("mp9", "Inleiding: Een boeiende introductie over het mijnverleden en onze doelstellingen.", "normal", { listItem: "bullet" }),
      block("mp10", "Beeldverhaal: Een indrukwekkende presentatie over het leven van de mijnwerker, zowel boven- als ondergronds, met live commentaar door John Coervers.", "normal", { listItem: "bullet" }),
      block("mp11", "Mijnmuseum: Een bezoek aan de tentoonstellingsruimte waar u attributen die daadwerkelijk ondergronds zijn gebruikt, niet alleen kunt zien, maar ook echt kunt vasthouden.", "normal", { listItem: "bullet" }),
      block("mp12", "Extra service: Op aanvraag maken wij uw bezoek compleet met de fotoservice van onze verenigingsfotograaf en natuurlijk koffie met echte Limburgse vlaai (tegen een geringe vergoeding).", "normal", { listItem: "bullet" }),
      block("mp13", "Contact: mijnproject.seddeh@gmail.com"),
    ],
  },
  {
    _id: "werkgroep-pr",
    _type: "werkgroep",
    name: "PR & Voorlichting",
    slug: { _type: "slug", current: "pr" },
    members: ["Wim Simons", "Boudewijn Nols"],
    description: [
      block("pr1", "De werkgroep P.R. verzorgt de communicatie en de presentatie van de stichting naar buiten toe."),
      block("pr2", "Wat doet de werkgroep P.R.?", "h2"),
      block("pr3", "De activiteiten van deze werkgroep zijn zeer divers en gericht op het zichtbaar maken van de historie van Eygelshoven:"),
      block("pr4", "Publiciteit: Het schrijven en publiceren van berichten over onze boekenbeurzen, lezingen, open dagen en andere stichtingsactiviteiten.", "normal", { listItem: "bullet" }),
      block("pr5", "Tentoonstellingen: Het organiseren van exposities, onder andere in de Openbare Bibliotheek, om ons archiefmateriaal met het publiek te delen.", "normal", { listItem: "bullet" }),
      block("pr6", "Promotie: Het verzorgen van reclamemateriaal en het beheren van de uitgaande correspondentie van de stichting.", "normal", { listItem: "bullet" }),
      block("pr7", "Informatiepunt: Het geven van algemene voorlichting over de stichting aan iedereen die meer wil weten over ons werk.", "normal", { listItem: "bullet" }),
      block("pr8", "Rondleidingen en Educatie", "h2"),
      block("pr9", "In nauwe samenwerking met de werkgroepen Mijnproject en Historie, verzorgt de P.R. rondleidingen en voorlichting voor groepen en scholen. Wij vertellen u graag alles over:"),
      block("pr10", "De voormalige mijnen (Laura en Julia).", "normal", { listItem: "bullet" }),
      block("pr11", "Het Oude Kerkje van Eygelshoven.", "normal", { listItem: "bullet" }),
      block("pr12", "Andere historische bezienswaardigheden in de buurt.", "normal", { listItem: "bullet" }),
    ],
  },
];

async function seed() {
  console.log("🏗️  Seeding werkgroepen...\n");

  // First delete the drafts created by the MCP tool (they have random IDs)
  const existingDrafts = await client.fetch(
    `*[_type == "werkgroep" && _id in path("drafts.**")]._id`
  );
  if (existingDrafts.length > 0) {
    console.log(`→ Deleting ${existingDrafts.length} existing draft werkgroepen...`);
    const tx = client.transaction();
    for (const id of existingDrafts) {
      tx.delete(id);
    }
    await tx.commit();
  }

  // Create werkgroepen with stable IDs
  for (const wg of werkgroepen) {
    console.log(`→ ${wg.name}`);
    await client.createOrReplace(wg);
  }

  console.log(`\n✅ ${werkgroepen.length} werkgroepen aangemaakt!`);
}

seed().catch(console.error);
