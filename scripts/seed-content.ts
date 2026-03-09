/**
 * Seed script: importeert nieuws, monumenten en publicaties van de oude SEDDEH website.
 *
 * Gebruik: npx tsx scripts/seed-content.ts
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

function block(
  key: string,
  text: string,
  style: string = "normal",
  opts?: { listItem?: string; level?: number }
) {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    ...(opts?.listItem ? { listItem: opts.listItem, level: opts.level ?? 1 } : {}),
    children: [
      { _type: "span", _key: `${key}s`, text, marks: [] },
    ],
  };
}

// ══════════════════════════════════════════════
// NEWS ARTICLES
// ══════════════════════════════════════════════
const newsArticles = [
  {
    _id: "news-tentoonstelling-100-jaar-markt",
    _type: "news",
    title: "Tentoonstelling 100 jaar Eygelshovense markt",
    slug: { _type: "slug", current: "tentoonstelling-100-jaar-eygelshovense-markt" },
    publishedAt: "2025-09-08T00:00:00.000Z",
    excerpt:
      "Op zaterdag 4 en zondag 5 oktober besteedt de Stichting aandacht aan het 100-jarig bestaan van de weekmarkt in Eygelshoven.",
    body: [
      block("n1b1", 'Op zaterdag 4 en zondag 5 oktober besteedt de Stichting "Eygelshoven door de eeuwen heen" aandacht aan het feit dat het 100 jaar geleden is dat de gemeente Eygelshoven is gestart met een weekmarkt.'),
      block("n1b2", "Op zaterdag 4 oktober wordt de Putstraat afgesloten en komen er hier marktkramen met speciale producten. Op zondag 5 oktober worden er in de Laethof een aantal marktkooplieden gehuldigd die al decennia vertegenwoordigd zijn in Eygelshoven."),
      block("n1b3", "Op beide dagen is er op de binnenplaats van de Laethof een markt met een tentoonstelling, oude foto's en toneeluitvoering."),
    ],
  },
  {
    _id: "news-rabo-clubsupport-2025",
    _type: "news",
    title: "Rabo ClubSupport 2025",
    slug: { _type: "slug", current: "rabo-clubsupport-2025" },
    publishedAt: "2025-09-04T00:00:00.000Z",
    excerpt:
      "Samen houden we de geschiedenis van Eygelshoven levend! Heemkunde Eygelshoven doet weer mee aan Rabo ClubSupport.",
    body: [
      block("n2b1", "Samen houden we de geschiedenis van Eygelshoven levend! Heemkunde Eygelshoven doet weer mee aan Rabo ClubSupport! Vorig jaar hebben jullie ons fantastisch gesteund. Dit jaar doen wij opnieuw een beroep op uw stem."),
    ],
  },
  {
    _id: "news-koelleeve-mit-krismes",
    _type: "news",
    title: "'t Koelleeve mit Krismes — 50 jaar na de mijnsluiting",
    slug: { _type: "slug", current: "t-koelleeve-mit-krismes-50-jaar-na-de-mijnsluiting" },
    publishedAt: "2024-12-02T00:00:00.000Z",
    excerpt:
      "Op zaterdag 7 december organiseert de stichting \"'t Koelleeve mit Krismes\" in de Oude Laethof, als onderdeel van Het Geluk van Kerkrade.",
    body: [
      block("n3b1", "Op zaterdag 7 december 2024 organiseert Stichting Eygelshoven door de Eeuwen Heen van 11.00 uur tot 16.00 uur \"'t Koelleeve mit Krismes\" in de Oude Laethof, Putstraat 17. Deze activiteit is onderdeel van het Kerkraadse Kerst- en Winterevenement Het Geluk van Kerkrade."),
      block("n3b2", "De Laethof zal hiervoor speciaal in feestelijke kerstsfeer worden aangekleed. Aan \"'t Koelleeve mit Krismes\" wordt meegewerkt door verschillende organisaties en verenigingen uit Eygelshoven."),
      block("n3b3", "De harmonie St. Caecilia Eygelshoven zal met haar jeugdorkest de Caecilia Kidz het kerstevenement muzikaal opluisteren. De KV Burgerhut houdt op deze dag een inzamelingsactie voor de Voedselbank."),
      block("n3b4", "De Heemkundevereniging organiseert een fototentoonstelling over de opkomst en de gloriejaren van de mijnen Laura en Julia; tevens het naar bovenhalen van de laatste kolen op de mijn Julia op 20 december 1974 en ook de sluiting en sloop krijgen tijdens deze tentoonstelling voldoende aandacht in de bovenruimten van de Laethof."),
    ],
  },
  {
    _id: "news-overlijden-martin-rheinfeld",
    _type: "news",
    title: "Overlijden Martin Rheinfeld",
    slug: { _type: "slug", current: "overlijden-martin-rheinfeld" },
    publishedAt: "2024-07-01T00:00:00.000Z",
    excerpt:
      "Met grote verslagenheid ontvingen wij het bericht dat ons zeer gewaardeerd lid Martin Rheinfeld op 15 juni 2024 overleden is.",
    body: [
      block("n4b1", "Met grote verslagenheid en verbijstering ontvingen wij het bericht dat ons zeer gewaardeerd lid Martin Rheinfeld op 15 juni 2024 overleden is."),
      block("n4b2", 'Na zijn werkzaam leven zocht Martin binnen Eygelshoven naar activiteiten om zijn leven een nieuwe invulling te geven. Martin was sinds 2011 lid van de Heemkundevereniging, stichting Eygelshoven door de eeuwen heen. Daar werd hij lid van het bestuur en fungeerde enige tijd als secretaris van de stichting.'),
      block("n4b3", 'Het archief van de stichting was de plaats waar hij zich thuis voelde. Daar vond je hem op werkdagen zittend aan zijn bureau omringd door stapels boeken en tijdschriften, speurend naar de naam "Eygelshoven". Als hij de naam Eygelshoven tegenkwam moest het document bewaard worden, maar dat stuitte wel eens op verzet, immers alles kon niet bewaard worden.'),
      block("n4b4", "Vaak trof men Martin aan, wandelend door Eygelshoven, met de sigaar in z'n mond. Helaas hebben wij te vroeg afscheid van Martin moeten nemen, wij zullen hem missen. Laat alle herinneringen aan Martin voor ons een steun en troost zijn. Martin adiee."),
    ],
  },
  {
    _id: "news-overlijden-wil-dirks",
    _type: "news",
    title: "Overlijden Wil Dirks",
    slug: { _type: "slug", current: "overlijden-wil-dirks" },
    publishedAt: "2024-02-15T00:00:00.000Z",
    excerpt:
      "Met grote verslagenheid hebben wij vernomen dat ons zeer gewaardeerd lid Wil Dirks op 28 januari 2024 is overleden.",
    body: [
      block("n5b1", "Met grote verslagenheid hebben wij vernomen dat ons zeer gewaardeerd lid, Wil Dirks, op 28 januari 2024 is overleden."),
      block("n5b2", 'Wil kwam in Oktober 2022 onze gelederen versterken hetgeen in eerste instantie voor hem even wennen was, "ik moet de draai nog vinden", zo vertelde hij. Na enige tijd rondgeneusd te hebben vond hij zijn plek bij het archiveren van documenten, met name de Cartografie.'),
      block("n5b3", "Elke maandagmorgen ging Wil naar zijn plek om aldaar de kaarten, en dat zijn er nogal wat, te sorteren en op waarde te schatten. Hij had net de stappen ondernomen om het een en ander te digitaliseren toen het noodlot hem trof."),
      block("n5b4", 'Na een kort ziekbed is hij helaas van ons heengegaan, wij zullen hem gaan missen. De leden van de "Stichting Eygelshoven door de eeuwen heen" wensen Jose en familie heel veel sterkte toe. Mogen de herinneringen aan Wil een troost zijn voor ons allen.'),
    ],
  },
  {
    _id: "news-kalenders-2024",
    _type: "news",
    title: "Wij versturen de kalenders dit jaar ook weer!",
    slug: { _type: "slug", current: "wij-versturen-de-kalenders-dit-jaar-ook-weer" },
    publishedAt: "2023-11-25T00:00:00.000Z",
    excerpt:
      "Onze nieuwe kalenders van 2024 zijn beschikbaar. Dit jaar versturen wij ze ook weer per post.",
    body: [
      block("n6b1", "Onze graag gewilde nieuwe Kalenders van 2024 vliegen weer de deur uit, echter willen wij nu ook weer iets meer de mensen tegemoetkomen die slecht ter been zijn of net iets te ver van Eygelshoven wonen om de kalender te kopen op de bekende verkoopadressen. Wij versturen de kalenders dit jaar ook weer!"),
      block("n6b2", "Mocht u dat willen, dan kunt u een mail sturen naar info.seddeh@gmail.com, niet via Facebook om het overzicht en goede afwikkeling te garanderen. Wij reageren dan met info en vragen. Tegen betaling van de kalender en de verzendkosten zorgen wij dat u de kalender (waar dan ter wereld) krijgt."),
      block("n6b3", "De kalender is te koop voor de prijs van 5,00 euro op de Oude Laethof, Putstraat 17, tijdens de openingsuren van de stichting (op maandag van 19.30 tot 22.00 uur en op donderdag van 10.00 tot 12.00 uur). En natuurlijk ook tijdens de boekenbeurs op 2 december."),
      block("n6b4", "U kunt ook terecht bij onze bekende verkooppunten: Chocolaterie Bruns, Bakkerij Wido Thuis, firma Benly, Bistro Socio en de Openbare Bibliotheek."),
    ],
  },
  {
    _id: "news-open-dagen-de-bronk",
    _type: "news",
    title: 'Open dagen "de Bronk" 7 en 8 oktober',
    slug: { _type: "slug", current: "open-dagen-de-bronk-7-en-8-oktober" },
    publishedAt: "2023-09-26T00:00:00.000Z",
    excerpt:
      "Tijdens de open dagen besteedt de heemkundevereniging aandacht aan de voorbereidingen rondom een kermiszondag in de jaren '50-'60.",
    body: [
      block("n7b1", "Tijdens de open dagen op 7 en 8 oktober a.s. zal de heemkundevereniging 'Eygelshoven door de eeuwen heen' aandacht besteden aan de voorbereidingen en gebeurtenissen rondom een kermiszondag in de jaren '50-'60 van de vorige eeuw (o.a. kirmesvlaam bakken; jaarlijkse processie: de bronk; familie-bezoeken; kermis-attracties)."),
      block("n7b2", "Op de binnenplaats van de oude Laethof zal een suikerspin, een 'ballengooien'-stand en een echte, in werking zijnde, draaimolen aanwezig zijn. Naast foto's en vlaggen zijn er veel voorwerpen te zien, die herinneren aan de jaren '50-'60 van de vorige eeuw."),
      block("n7b3", "Om 12:00 en 14:00 uur zal er ook een echte (korte) bronk trekken. Eveneens zal het gezinsleven van toen, met familiebezoek en vlaam dan daadwerkelijk tot leven komen."),
      block("n7b4", "Kortom: als u nog eens wilt meemaken hoe de kermisdagen zo'n 70 jaar geleden werden beleefd, bent u op 7 en 8 oktober van 11:00 uur tot 16:00 uur van harte welkom en kunt u om 12:00 uur en 14:00 uur genieten van een live uitgevoerd stukje toneel. Ook de boekenbeurs is op die dagen toegankelijk."),
    ],
  },
];

// ══════════════════════════════════════════════
// MONUMENTS
// ══════════════════════════════════════════════
const monuments = [
  {
    _id: "monument-villa-gluck-auf",
    _type: "monument",
    name: 'Villa "Gluck Auf"',
    slug: { _type: "slug", current: "villa-gluck-auf" },
    location: "Torenstraat 28, Eygelshoven",
    year: "1901",
    description: [
      block("m1b1", 'Dit prachtige bouwwerk gelegen in de Torenstraat nr. 28, dat ook wel villa Pierre wordt genoemd, werd in 1901 gebouwd in opdracht van de eerste directeur van Laura & Vereeniging: Paul Hubert Raymond Pierre.'),
      block("m1b2", "Deze mijnbouwkundige ingenieur, die op 26 juli 1857 te Maastricht werd geboren, was voor zijn Laura-tijd directeur bij de Ombilin steenkoolmijnen op Sumatra (huidig Indonesie). Hij is er vanaf 29-02-1902 met zijn echtgenote komen wonen."),
      block("m1b3", 'Het was een vrijstaande woning met het karakter van een landhuis met 10 tot 12 kamers, een centrale hal, een terras, elektriciteit en een lage druk stoomverwarming. Het werd uiteindelijk een huis in koloniale stijl met vroege Jugendstil invloeden.'),
      block("m1b4", 'De frontgevel is voorzien van rijke stucwerk decoraties o.a. boven de deur, boven de balkondeur en in de topgevel. Deze decoraties symboliseren de mijnarbeid. Boven de hoofdingang bevindt zich de tekst "GLUCK AUF".'),
      block("m1b5", "De tuinaanleg vond plaats in 1905. Na 1925 werd de villa verbouwd tot hoofdkantoor van Laura & Vereeniging. In 1937 vond een forse aanbouw plaats aan de achterkant van de oorspronkelijke villa, daarna nog een keer in 1968. Op het ogenblik is de villa een appartementen complex."),
    ],
  },
  {
    _id: "monument-het-oude-kerkje",
    _type: "monument",
    name: "Het Oude Kerkje",
    slug: { _type: "slug", current: "het-oude-kerkje" },
    location: "Kruising Brunssum-Herzogenrath en Eygelshoven-Schaesberg-Heerlen, op een kerkheuvel",
    year: "11e/12e eeuw",
    description: [
      block("m2b1", "Een laatgotisch hallenkerkje, omgeven door een rustiek grasveld en eeuwenoude kerkhofkruisen. De oorsprong is van zeer hoge ouderdom."),
      block("m2b2", "De noordelijke muur en de voet van de toren bevatten nog resten van het oudste bouwwerk, waaronder mogelijk zelfs Romeinse bouwfragmenten. Bijzonder is de weerbare toren uit de 11e of 12e eeuw, een van de oudste voorbeelden uit de Romaanse bouwperiode in Nederland."),
      block("m2b3", "Oorspronkelijk had de toren geen ingang van buitenaf en slechts zeer kleine lichtopeningen; toegang alleen via een losse ladder vanuit de kerk. In tijden van nood vluchtte de bevolking naar de bovenverdieping."),
      block("m2b4", "In 1507 begon de bouw van het gotische koor onder pastoor Gerard Vas. In 1746 werden de gewelven vernieuwd, maar de oude kraagstenen zijn bewaard gebleven. In 1807 dreigde de toren om te vallen."),
      block("m2b5", "Tijdens de Tweede Wereldoorlog raakte het kerkje zwaar beschadigd door granaatvuur. Na restauraties in 1939, 1989 en 2004 (nieuwe glas-in-loodramen) is het vandaag een geliefde plek voor bijzondere diensten en huwelijken."),
    ],
  },
  {
    _id: "monument-huize-henckens",
    _type: "monument",
    name: "Huize Henckens en zijn befaamde zoon",
    slug: { _type: "slug", current: "huize-henckens-en-zijn-befaamde-zoon" },
    location: "Torenstraat 2 en 4, Eygelshoven",
    year: "1796",
    description: [
      block("m3b1", "Het huis Henckens vormde in oude tijden vermoedelijk een geheel met de hoeve Valkenberg en wordt reeds in de 15de eeuw vermeld."),
      block("m3b2", 'Het pand werd in 1796 gebouwd in opdracht van Joannes Henckens, gehuwd met Maria Joanna Bischoff (initialen IHK en IHB op de sluitsteen boven de poort). Joannes was herbergier en tevens burgemeester ("maire") van de nieuwe gemeente Eygelshoven van 1801 tot 1811 tijdens de Franse overheersing.'),
      block("m3b3", "Gebouwd in de typische oud-Limburgse boerderijstijl, raakte het in de jaren veertig danig in verval door oorlogsgeweld. Toenmalig burgemeester Boijens heeft zich ingezet voor het behoud en restauratie. Feestelijke heropening in 1957 met een tentoonstelling uit het tijdperk van Napoleon."),
      block("m3b4", "De oudste zoon van de \"maire\", Joannes Leonardus (geboren 1780), diende onder Napoleon en hield een dagboek bij, dat in 1910 in het Frans werd uitgegeven en in 2004 in Nederlandse vertaling verscheen bij de stichting."),
    ],
  },
  {
    _id: "monument-hoeve-valkenberg",
    _type: "monument",
    name: "De Hoeve Valkenberg",
    slug: { _type: "slug", current: "de-hoeve-valkenberg" },
    location: "Nabij Torenstraat, Eygelshoven",
    year: "1797",
    description: [
      block("m4b1", 'In de volksmond "boerderij Haeren" genoemd, naar de vier generaties (1886-1978) die hier als pachters woonden. De officiele geschiedenis voert terug naar de familie Valkenberg en het jaar 1797.'),
      block("m4b2", "De familie Valkenberg speelde een prominente rol in Eygelshoven en leverde twee burgemeesters: Jan Wijnand Valkenberg (1842-1845) en Frans Martin Valkenberg (1881-1886)."),
      block("m4b3", 'Gebouwd in de karakteristieke Limburgse carre-stijl: een gesloten vierkant met een centrale binnenplaats. Vermoedelijk oorspronkelijk deel van het grotere "Valkenbergs Goed" (Terbruggenhof), dat een geheel vormde met het naastgelegen Henckenshuis.'),
      block("m4b4", "In 1941 raakte de hoeve zwaar beschadigd door een bombardement. In 1980 kocht de heer J. (Jup) Burggraaf uit Simpelveld het pand en voerde samen met zijn zonen een grootschalige restauratie uit, waarbij de schuren een nieuwe bestemming als woningen en opslagruimte kregen."),
    ],
  },
  {
    _id: "monument-de-preekstoel",
    _type: "monument",
    name: "De Preekstoel",
    slug: { _type: "slug", current: "de-preekstoel" },
    location: "Laurastraat 21, Eygelshoven",
    year: "1631",
    description: [
      block("m5b1", 'Een vakwerkhuisje, iconisch voorbeeld van de Limburgse vakwerkstijl. Bijnaam "d\'r Preedigsjtool" (de Preekstoel), naar de oorspronkelijke trap van zes treden naar de voordeur.'),
      block("m5b2", "Onderzoek door architect P.A. Schols in 1962 wees uit dat het met grote vakkundigheid was gebouwd. Een eikenhouten balk in de oostgevel draagt het jaartal 1631."),
      block("m5b3", "Onder het huis bevindt zich een fraaie gewelfde kelder uit veldkeien en Nievelsteiner zandsteen, mogelijk van voor 1700. Tijdens de restauratie van de kelder in 1962 werden zeven munten uit de eerste helft van de 17e eeuw gevonden."),
      block("m5b4", "In 1974 werd het pand slachtoffer van mijnschade en raakte het ernstig verzakt. Laura & Vereeniging heeft het huis centimeter voor centimeter \"rechtgezet\" in een operatie van ruim twee dagen."),
      block("m5b5", "In mei 2020 kwam er een einde aan het originele bouwwerk door jarenlang achterstallig onderhoud; de gevel bezweek en het huisje moest gesloopt worden. Onder leiding van Jos Schneiders is op dezelfde plek een getrouwe replica gerealiseerd."),
    ],
  },
];

// ══════════════════════════════════════════════
// PUBLICATIONS (8 new, update existing 1)
// ══════════════════════════════════════════════
const publications = [
  {
    _id: "pub-memoires-henckels",
    _type: "publication",
    title: "Memoires van luitenant Henckens",
    description:
      "Het dagboek van Leonard Henckens uit Eygelshoven, in dienst van Napoleon. Het boek bevat geen systematische beschrijvingen van veldslagen, maar wel tal van bijzonderheden over o.a. de Russische veldtocht en persoonlijke belevenissen, die een verrassende kijk geven op de toestanden en gebeurtenissen uit die tijd. Prijs: EUR 10,00.",
  },
  {
    _id: "pub-historische-wandeling",
    _type: "publication",
    title: "Historische wandeling door Eygelshoven",
    description:
      "Een geschiedenisboekje in het klein. Een wandeling langs historisch waardevolle monumenten, huizen, en overige objecten met veel beschrijvingen van het geen men onderweg tegenkomt, maar ook van wat helaas verloren is gegaan. Nederlands en Duits. Prijs: EUR 1,00.",
  },
  {
    _id: "pub-25-jaar-stichting",
    _type: "publication",
    title: '25 jaar Stichting "Eygelshoven door de eeuwen heen"',
    description:
      "Een compilatie van een 25-tal geschiedkundige en genealogische verhandelingen met betrekking tot diverse aspecten van de Eygelshovense samenleving, zoals: gemeente, parochie, historische gebouwen, bevolking en industrie. Prijs: EUR 19,50.",
  },
  {
    _id: "pub-raymond-pierre",
    _type: "publication",
    title: "Raymond Pierre en de steenkolenmijn",
    description:
      "Het verblijf van Raymond Pierre als ingenieur-directeur van de Ombilinmijnen in Sawah-Loento (Sumatra) en als eerste directeur van Laura & Vereeniging. Beschrijft de bouw van villa Gluck Auf en de woningbouw voor arbeiders in Eygelshoven. 190 pagina's, A4 formaat, meer dan 100 illustraties. Prijs: EUR 19,95.",
  },
  {
    _id: "pub-eygelshoven-herdenkt",
    _type: "publication",
    title: "Eygelshoven herdenkt",
    description:
      "Herdenking van burgers en militairen uit Eygelshoven die door oorlogsgeweld in 1940-1945 stierven, militairen die tijdens gewapende conflicten na 1945 het leven lieten en geallieerde militairen die in 1943/1944 in of boven Eygelshoven sneuvelden. Bevat korte levensverhalen met foto's en de oorlogsdagboeken van kapelaan Pierre Keybets en Christiaan Henskens. Prijs: EUR 7,00.",
  },
  {
    _id: "pub-heiligschennende-diefstal",
    _type: "publication",
    title: "Heiligschennende diefstal te Eygelshoven",
    description:
      "Een weergave van de berichtgeving in de landelijke pers over een gebeurtenis die destijds een grote schok teweegbracht in het katholieke deel van Nederland. Het boekje bestaat grotendeels uit letterlijke weergave van krantenartikelen, met verklarende teksten en ruim twintig foto's. ISBN 978-90-813726-3-3. Prijs: EUR 6,00.",
  },
  {
    _id: "pub-de-hotskoel",
    _type: "publication",
    title: "De Hotskoel",
    description:
      "De geschiedenis van woningen/boerderijen en hun bewoners, wegen/paden en landerijen in de Holzkuil, gelegen tussen Eygelshoven en Vink/Chevremont. Bevat de opgraving van een Romeinse villa, de ontginning van bruinkoolvelden, oude landbouwwerktuigen. Voorzien van een vijftigtal foto's, schetsen, tekeningen en kaarten. A4 formaat. ISBN 978-90-813726-5-7. Prijs: EUR 10,00.",
  },
  {
    _id: "pub-romeinse-sporen",
    _type: "publication",
    title: "Romeinse sporen in Eygelshoven",
    description:
      "Beschrijving van een negental Romeinse vindplaatsen in Eygelshoven en directe omgeving, waaronder een compleet Romeins villacomplex in de Holzkuil. Tevens inzicht in de omvang en aard van de vondsten en het vermoedelijke tracé van de Via Belgica. A4 formaat. ISBN 978-90-813726-88. Prijs: EUR 8,50.",
  },
  {
    _id: "pub-land-terheiden",
    _type: "publication",
    title: "Het land Terheiden met de enclave Eygelshoven",
    description:
      "De ruim vier eeuwen durende verbondenheid van het dorp Eygelshoven met het land Terheiden. Bevat een uitgebreid overzicht van de heren van de heerlijkheid Terheiden, het huis Heiden, de Anselderbeek, de geschiedenis van Eygelshoven met de Laethof, de ontginning van steenkool en de bokkenrijders. A4 formaat. ISBN 978-90-821390-5-1. Prijs: EUR 9,50.",
  },
];

async function seed() {
  console.log("📰 Seeding nieuws, monumenten en publicaties...\n");

  console.log("→ Nieuwsberichten...");
  for (const article of newsArticles) {
    console.log(`  - ${article.title}`);
    await client.createOrReplace(article);
  }

  console.log("\n→ Monumenten...");
  for (const mon of monuments) {
    console.log(`  - ${mon.name}`);
    await client.createOrReplace(mon);
  }

  console.log("\n→ Publicaties...");
  for (const pub of publications) {
    console.log(`  - ${pub.title}`);
    await client.createOrReplace(pub);
  }

  console.log(`\n✅ Seed voltooid!`);
  console.log(`   - ${newsArticles.length} nieuwsberichten`);
  console.log(`   - ${monuments.length} monumenten`);
  console.log(`   - ${publications.length} publicaties`);
}

seed().catch(console.error);
