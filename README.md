# SEDDEH v2 — Stichting Eygelshoven door de Eeuwen Heen

Nieuwe website voor de heemkundevereniging van Eygelshoven, gebouwd met een moderne stack maar met behoud van de authentieke uitstraling van de stichting.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Sanity v3 (embedded studio op `/studio`)
- **Styling:** Tailwind CSS v4 met heritage-thema (EB Garamond serif)
- **E-mail:** Resend (archief aanvragen)
- **Afbeeldingen:** Sanity Asset CDN
- **Hosting:** Vercel

## Pagina's

| Route | Beschrijving |
|-------|-------------|
| `/` | Homepage |
| `/de-stichting` | Over de stichting + subpagina's (Bestuur, Doelstellingen, etc.) |
| `/nieuws` | Nieuwsberichten |
| `/werkgroepen` | Werkgroepen van de stichting |
| `/gallerijen` | Fotogalerijen |
| `/agenda` | Evenementen kalender |
| `/kennisbank` | Publieke kennisbron met gecategoriseerde links |
| `/archief-aanvraag` | Formulier om archiefstukken aan te vragen |
| `/contact` | Contactgegevens |
| `/contact/schenking` | Schenkingen |
| `/studio` | Sanity CMS Studio (beheer) |

## Aan de slag

### 1. Sanity project aanmaken

Ga naar [sanity.io/manage](https://www.sanity.io/manage) en maak een nieuw project aan.

### 2. Environment variables

Kopieer `.env.local.example` naar `.env.local` en vul de waarden in:

```bash
cp .env.local.example .env.local
```

### 3. Installatie

```bash
yarn install
```

### 4. Development

```bash
yarn dev
```

- Website: [http://localhost:3000](http://localhost:3000)
- CMS Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## Kennisbank

De kennisbank bevat gecategoriseerde links naar publieke bronnen voor genealogisch en historisch onderzoek. Links worden beheerd via het Sanity CMS.

### Initiële categorieën:
- Genealogie & Stambomen
- Kadaster & Archieven
- Regionale Historie
- Heemkundeverenigingen
- Overige Websites

## Archief Aanvraag

Het archief van de stichting is niet publiek toegankelijk maar wel op aanvraag. Bezoekers kunnen via het formulier een aanvraag indienen. De aanvraag wordt via Resend gemaild naar de stichting.

## Deployment

```bash
vercel
```

## Licentie

Eigendom van Stichting Eygelshoven door de Eeuwen Heen.
