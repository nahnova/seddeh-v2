# SEDDEH v2 — Stichting Eygelshoven door de Eeuwen Heen

Nieuwe website voor de heemkundevereniging van Eygelshoven, gebouwd met een moderne stack maar met behoud van de authentieke uitstraling van de stichting.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **CMS:** Sanity v5 (embedded studio op `/studio`)
- **Styling:** Tailwind CSS v4 met heritage-thema (EB Garamond serif, goud accenten)
- **E-mail:** Resend (archief aanvragen, lid worden)
- **Afbeeldingen:** Sanity Asset CDN + fotobescherming met logo watermerk
- **Hosting:** Vercel Pro (team `nahnova-org`)
- **SEO:** JSON-LD structured data, sitemap, canonical URLs

## Pagina's

| Route | Beschrijving |
|-------|-------------|
| `/` | Homepage met hero, features, nieuws, agenda |
| `/de-stichting` | Over de stichting + 7 subpagina's (Bestuur, Monumenten, etc.) |
| `/nieuws` + `/nieuws/[slug]` | Nieuwsberichten |
| `/werkgroepen` | Werkgroepen met genummerde secties en quick-nav |
| `/leden` | Ledenprofielen |
| `/lid-worden` | Aanmeldformulier om lid te worden |
| `/gallerijen` + `/gallerijen/[slug]` | Fotogalerijen met beschermde afbeeldingen |
| `/agenda` | Evenementen (automatisch gefilterd op toekomstige data) |
| `/kennisbank` | Gecategoriseerde links voor historisch onderzoek |
| `/archief-aanvraag` | Formulier om archiefstukken aan te vragen |
| `/contact` + `/contact/schenking` | Contactgegevens + donatiepagina |
| `/studio` | Sanity CMS Studio (beheer) |

## Features

- **Zoekbalk** — `⌘K` opent een command palette met fuzzy search over alle pagina's en dynamische content
- **Fotobescherming** — Rechtermuisknop + drag blokkering, transparante overlay, logo watermerk op galerijtfoto's
- **E-mail formulieren** — Archief aanvragen en lid worden via Resend
- **SEO** — JSON-LD (NGO schema), keywords, canonical URL, dynamische sitemap

## Aan de slag

### 1. Environment variables

```bash
cp .env.local.example .env.local
```

Vul in:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=sglv0dfa
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<token>
RESEND_API_KEY=<key>
ARCHIVE_REQUEST_EMAIL=info.seddeh@gmail.com
```

### 2. Installatie

```bash
yarn install
```

### 3. Development

```bash
yarn dev
```

- Website: [localhost:3000](http://localhost:3000)
- Studio: [localhost:3000/studio](http://localhost:3000/studio)

### 4. Schema deployen

```bash
npx sanity@latest login
npx sanity@latest schema deploy
```

## Deployment

Automatisch via GitHub → Vercel bij push naar `main`.

Handmatig:
```bash
vercel --prod
```

## Documentatie

Zie `/docs` voor:
- `HANDOFF.md` — Status en technische details
- `FEEDBACK.md` — Feedback tracker
- `KOSTEN.md` — Kostenoverzicht
- `FOTOLIJST-PASCAL.md` — Benodigde foto's

## Licentie

Eigendom van Stichting Eygelshoven door de Eeuwen Heen.
