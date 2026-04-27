# SEDDEH v2 — Handoff

**Project:** Website Stichting Eygelshoven door de Eeuwen Heen
**Status:** LIVE
**URL:** https://www.stichting-eygelshovendoordeeeuwenheen.nl
**Datum livegang:** 27 april 2026

---

## Stack

| Component | Technologie |
|-----------|-------------|
| Framework | Next.js 16 (App Router) |
| Hosting | Vercel (team: nahnova-org, project: seddeh-v2) |
| CMS | Sanity (project: sglv0dfa, dataset: production, workspace: seddeh) |
| E-mail | Resend (free tier, API key in Vercel env) |
| Domein | TransIP (DNS naar Vercel) |
| Repository | github.com/nahnova/seddeh-v2 |

## Toegang

| Wat | Waar |
|-----|------|
| Sanity Studio | /studio op de live site |
| Vercel dashboard | vercel.com/nahnova-org/seddeh-v2 |
| Resend dashboard | resend.com (account NahNova) |
| TransIP domeinbeheer | transip.nl |

## Environment Variables (Vercel Production)

| Variabele | Doel |
|-----------|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (production) |
| `SANITY_API_READ_TOKEN` | Sanity leestoegang |
| `RESEND_API_KEY` | E-mail verzending via Resend |
| `ARCHIVE_REQUEST_EMAIL` | Ontvangstadres formulieren (info.seddeh@gmail.com) |

## Formulieren & E-mail

5 API routes versturen e-mails via Resend naar `info.seddeh@gmail.com`:

| Route | Doel |
|-------|------|
| `/api/contact` | Contactformulier |
| `/api/archief-aanvraag` | Archief aanvragen |
| `/api/inzage` | Boekenarchief inzage aanvragen |
| `/api/lid-worden` | Medewerker aanmelding |
| `/api/bestelling` | Publicatie bestelling |

Afzender is momenteel `onboarding@resend.dev`. Voor eigen domein-afzender: domein verifieren in Resend dashboard.

## Content beheer (Sanity)

Alle content is bewerkbaar via Sanity Studio:

- **Pagina's** (De Stichting subpagina's) — dynamisch in navigatie
- **Nieuws** — berichten met publicatiedatum
- **Werkgroepen** — leden, beschrijving, afbeelding
- **Evenementen** — agenda, alleen toekomstige events worden getoond
- **Publicaties** — webshop-achtige weergave
- **Boekenarchief** — 988 items in 18 rubrieken (geimporteerd uit Excel catalogus)
- **Gallerijen** — fotogalerijen met watermerk
- **Kennisbank** — externe links per categorie
- **Monumenten** — met locatie en navigatielink
- **Bestuursleden & Medewerkers**

## CORS Origins (Sanity)

| Origin | Doel |
|--------|------|
| `https://stichting-eygelshovendoordeeeuwenheen.nl` | Production |
| `https://www.stichting-eygelshovendoordeeeuwenheen.nl` | Production (www) |
| `https://seddeh-v2.vercel.app` | Vercel preview |
| `http://localhost:3000` | Lokale ontwikkeling |
| `http://localhost:3333` | Sanity Studio lokaal |

## Openstaande punten (content — bij stichting)

| Item | Status |
|------|--------|
| Agenda events: "Boekenbeurs & Mijnproject" toevoegen | Wacht op stichting |
| "De Vlag van Eygelshoven" sectie + foto | Wacht op foto |
| Medewerker foto John Coervers | Wacht op pasfoto (bij Pascal Vreuls) |
| Galerij foto's Mijnproject (actueel) | Wacht op foto's |
| Nieuws actualiseren | Wacht op stichting |
| Bevestiging stemlocatie Laethof | Wacht op stichting |
| Resend domein verifieren (eigen afzenderadres) | Optioneel |

## Deployments

Vercel Git-integratie triggert niet automatisch. Deployen via:
```bash
npx vercel --prod
```

## Import script

Het boekenarchief is geimporteerd via `scripts/import-catalogus.mjs`. Kan opnieuw gedraaid worden bij een update van de Excel catalogus:
```bash
SANITY_AUTH_TOKEN=<token> node scripts/import-catalogus.mjs --commit
```
