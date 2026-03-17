# SEDDEH v2 — Handoff

> Laatst bijgewerkt: 17 maart 2026

---

## Projectoverzicht

| Item | Waarde |
|------|--------|
| Repo | `nahnova/seddeh-v2` |
| Live | `https://seddeh-v2.vercel.app` (Vercel, team `nahnova-org`) |
| Sanity | Project `sglv0dfa`, dataset `production`, workspace `seddeh` |
| Studio | `/studio` op de live URL |
| Stack | Next.js 16 + Sanity CMS + Tailwind v4 + Resend |

---

## Wat is gedaan

### Pagina's & Routes
- `/` — Homepage met hero, features, nieuws, agenda, CTA
- `/de-stichting` — Overzicht + 7 subpagina's (dynamisch via `[slug]`)
- `/nieuws` + `/nieuws/[slug]` — Nieuwsoverzicht + detail
- `/werkgroepen` — Genummerde secties, quick-nav, leden-pills
- `/leden` — Ledenprofielen met placeholder icons + CTA naar lid-worden
- `/lid-worden` — Aanmeldformulier + voordelen (mailt via Resend)
- `/gallerijen` + `/gallerijen/[slug]` — Galerij met fotobescherming + logo watermerk
- `/agenda` — Evenementen (automatisch gefilterd op `date >= now()`)
- `/kennisbank` — Gecategoriseerde links
- `/contact` + `/contact/schenking` — Contactgegevens + donatiepagina
- `/archief-aanvraag` — Aanvraagformulier (mailt via Resend)

### Features
- **Zoekbalk** — `⌘K` / klik opent command palette met fuzzy search over alle pagina's + dynamische content
- **Fotobescherming** — ProtectedImage: rechtermuisknop blokkering, drag-preventie, transparante overlay, logo watermerk
- **SEO** — JSON-LD structured data (NGO), keywords meta, canonical URL, sitemap met statische + dynamische routes
- **E-mail** — Resend integratie voor archief-aanvraag en lid-worden formulieren

### Sanity Content
- 13 schema's: page, news, werkgroep, gallery, event, kennisbankLink, kennisbankCategory, boardMember, member, monument, siteSettings, publication
- 5 bestuursleden (incl. Andre Kok)
- 7 werkgroepen met leden
- 19 kennisbank links (incl. Anselbode)
- 1 maquette galerij (wacht op foto's)

---

## Wat nog moet gebeuren

### Wacht op foto's (Pascal)
Zie `FOTOLIJST-PASCAL.md` voor de volledige checklist.

| Item | Status |
|------|--------|
| Foto's bestuursleden (5 personen) | Wacht op Pascal |
| Sfeerbeelden werkgroepen (7 stuks) | Wacht op Pascal |
| Maquette galerij foto's | Wacht op Pascal, galerij staat klaar |
| Homepage hero foto's/video | Wacht op Pascal |

### Technisch

| Item | Prioriteit | Notities |
|------|-----------|----------|
| Custom domein koppelen | Hoog | Wacht tot stichting domein heeft, daarna DNS + Vercel instellen |
| Productie CORS origin | Hoog | Na domein: toevoegen in Sanity projectinstellingen |
| Resend domein verifiëren | Gemiddeld | Nu `onboarding@resend.dev`, eigen domein mooier |
| Homepage hero carousel | Gemiddeld | Wacht op foto's, dan carousel/video bouwen |
| Analytics | Laag | Vercel Analytics of Plausible overwegen |

---

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=sglv0dfa
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<in .env.local en Vercel>
RESEND_API_KEY=<in .env.local en Vercel>
ARCHIVE_REQUEST_EMAIL=info.seddeh@gmail.com
```

---

## Key Files

| Bestand | Doel |
|---------|------|
| `src/sanity/schemas/` | Alle CMS content types |
| `src/sanity/lib/queries.ts` | GROQ queries |
| `src/components/Header.tsx` | Navigatie + SearchPalette |
| `src/components/ProtectedImage.tsx` | Fotobescherming + watermerk |
| `src/components/SearchPalette.tsx` | Zoekbalk (⌘K) |
| `src/app/api/` | API routes (archief-aanvraag, lid-worden, search) |
| `sanity.config.ts` | Sanity Studio configuratie |
