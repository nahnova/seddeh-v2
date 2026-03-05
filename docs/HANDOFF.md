# SEDDEH v2 — Handoff Document

> Laatst bijgewerkt: 5 maart 2026

## Status: Basisopzet Compleet

De volledige website structuur staat, alle pagina's zijn aangemaakt, en de eerste content is geïmporteerd in Sanity CMS.

---

## Wat is gedaan

### Infrastructuur
- [x] Next.js 15 project aangemaakt (`/Users/noaheutz/Developer/seddeh-v2`)
- [x] GitHub repo: `nahnova/seddeh-v2`
- [x] Sanity CMS project (ID: `sglv0dfa`, dataset: `production`, org: NahNova)
- [x] Project-specifiek editor token aangemaakt
- [x] CORS origin `localhost:3000` geconfigureerd
- [x] 12 Sanity schema's (content types) gedefinieerd
- [x] Sanity Studio embedded op `/studio`

### Pagina's (alle routes functioneel)
- [x] `/` — Homepage met hero, features, nieuws, agenda, CTA
- [x] `/de-stichting` — Overzichtspagina met 7 subpagina links
- [x] `/de-stichting/[slug]` — Dynamische subpagina's (Bestuur, Doelstellingen, etc.)
- [x] `/nieuws` + `/nieuws/[slug]` — Nieuwsoverzicht + detailpagina
- [x] `/werkgroepen` — Werkgroepen overzicht
- [x] `/gallerijen` + `/gallerijen/[slug]` — Galerij overzicht + masonry layout
- [x] `/agenda` — Evenementen
- [x] `/kennisbank` — Gecategoriseerde links met featured sectie + archief CTA
- [x] `/archief-aanvraag` — Formulier met Resend e-mail integratie
- [x] `/contact` — Contactgegevens + archief CTA
- [x] `/contact/schenking` — Donatiepagina

### Content geïmporteerd in Sanity (via seed script)
- [x] Site instellingen (adres, e-mail, telefoon)
- [x] 7 pagina's (De Stichting, Laethof, Doelstellingen, Geschiedenis, Wapen, Publicaties, Monumenten)
- [x] 4 bestuursleden (Joep Prevo, Wim Simons, Maria Brull, Ria Berikoven)
- [x] 1 publicatie (Memoires van luitenant Henckels)
- [x] 1 evenement (Boekenbeurs)
- [x] 5 kennisbank categorieën
- [x] 19 kennisbank links (AlleLimburgers, WieWasWie, Aezel/Kadaster, etc.)

---

## Wat nog gedaan moet worden

### Hoge Prioriteit

#### 1. Resend instellen
- Account aanmaken op https://resend.com
- API key genereren
- Toevoegen aan `.env.local`: `RESEND_API_KEY=re_xxxxx`
- Optioneel: eigen domein verifiëren voor `from` adres (nu `onboarding@resend.dev`)
- `ARCHIVE_REQUEST_EMAIL` aanpassen naar gewenst ontvangstadres

#### 3. Ontbrekende content van oude site
De volgende content was niet automatisch te scrapen (dynamisch geladen) en moet **handmatig** worden overgenomen via `/studio`:

| Content | Status | Actie |
|---------|--------|-------|
| Werkgroepen | Leeg | Namen + beschrijvingen toevoegen |
| Monumenten | Placeholder tekst | Individuele monumenten aanmaken |
| Galerijen | Leeg | Foto's uploaden + galerijen aanmaken |
| Nieuwsberichten | Leeg | Bestaande artikelen overnemen |
| Publicaties | 1 van ? | Overige publicaties + prijzen toevoegen |
| Bestuursleden foto's | Geen | Foto's uploaden per bestuurslid |
| Wapen beschrijving | Incompleet | Volledige heraldische beschrijving + afbeelding |

#### 4. Afbeeldingen
- Logo/wapenschild uploaden in Site Instellingen
- Hero afbeeldingen voor pagina's toevoegen
- Foto's van bestuursleden uploaden
- Galerij foto's van de oude site overnemen
- Monument foto's toevoegen

### Gemiddelde Prioriteit

#### 5. Contact formulier pagina updaten
De contact pagina toont nu hardcoded info. Optie:
- Contactgegevens dynamisch ophalen uit `siteSettings` in Sanity
- Contactformulier toevoegen (vergelijkbaar met archief aanvraag)

#### 6. Productie CORS origin toevoegen
Na deployment, voeg het productie-domein toe:
```bash
curl -X POST "https://api.sanity.io/v2021-06-07/projects/sglv0dfa/cors" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"origin": "https://jouw-domein.nl", "allowCredentials": true}'
```

#### 7. Vercel deployment
- `vercel` draaien in project root
- Environment variables instellen in Vercel dashboard
- Productie-domein koppelen

#### 8. Boekenbeurs als terugkerend evenement
De boekenbeurs is elke eerste zaterdag. Momenteel staat er 1 als voorbeeld. Overweeg:
- Meerdere datums toevoegen
- Of een "terugkerend" veld aan het event schema toevoegen

### Lage Prioriteit

#### 9. SEO & Social
- Open Graph images genereren
- Favicon/wapenschild als site icon
- sitemap.xml (Next.js kan dit automatisch)
- robots.txt

#### 10. Zoekfunctionaliteit
- Optioneel: zoekbalk toevoegen aan kennisbank
- Optioneel: globale site-zoekfunctie

#### 11. Analytics
- Vercel Analytics of Plausible/Umami toevoegen

---

## Technische Details

### Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=sglv0dfa
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<editor token in .env.local>
RESEND_API_KEY=<nog in te vullen>
ARCHIVE_REQUEST_EMAIL=info@stichting-eygelshovendoordeeeuwenheen.nl
```

### Seed Script
Content opnieuw importeren of updaten:
```bash
npx tsx scripts/seed.ts
```
Het script gebruikt `createOrReplace` dus is veilig om meerdere keren te draaien.

### Sanity Studio
Toegankelijk op `/studio` — hier kan alle content worden beheerd:
- Pagina's bewerken (rich text met afbeeldingen)
- Nieuws toevoegen
- Galerijen aanmaken met foto's
- Kennisbank links beheren
- Evenementen plannen
- Bestuursleden bijwerken

### Key Files
| Bestand | Doel |
|---------|------|
| `src/sanity/schemas/` | Alle CMS content types |
| `src/sanity/lib/queries.ts` | GROQ queries |
| `src/components/Header.tsx` | Navigatie (client-side) |
| `src/app/api/archief-aanvraag/route.ts` | E-mail API route |
| `scripts/seed.ts` | Database seed script |
| `sanity.config.ts` | Sanity Studio configuratie |
