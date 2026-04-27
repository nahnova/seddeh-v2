# Stappenplan Livegang — 30 april 2026

**Doel:** Website Stichting Eygelshoven door de Eeuwen Heen live op het eigen domein.
**Deadline:** 30 april 2026 (woensdag)

---

## Fase 1: Openstaande content (voor 20 april)

Onderstaande punten wachten op input van de opdrachtgever/stichting.

| # | Item | Wie levert | Status |
|---|------|-----------|--------|
| 1 | Agenda events: "Boekenbeurs: & Mijnproject" bij alle data + beschrijving | Opdrachtgever (data + tekst) | Open |
| 2 | "De Vlag van Eygelshoven" sectie + krantenartikel foto | Opdrachtgever | Open |
| 3 | Medewerker foto John Coervers (bij werkgroep Mijnproject) | Pascal Vreuls (pasfoto) | Open |
| 4 | Galerij foto's Mijnproject (actueel) | Opdrachtgever | Open |
| 5 | Nieuws actualiseren — oude berichten verwijderen/updaten | Opdrachtgever (welke?) | Open |
| 6 | Bevestiging: is de Laethof nog stemlocatie? | Opdrachtgever | Open |

## Fase 2: Technische voorbereiding (21–27 april)

| # | Taak | Details |
|---|------|---------|
| 7 | Vercel Git-integratie herstellen | Deploy triggert niet meer automatisch bij push — koppeling controleren onder Settings > Git |
| 8 | Domein instellen | Custom domein (stichting-eygelshovendoordeeeuwenheen.nl) koppelen aan Vercel project |
| 9 | DNS configuratie | A/CNAME records bij domeinhoster aanpassen naar Vercel |
| 10 | SSL certificaat | Wordt automatisch door Vercel geregeld na DNS-propagatie |
| 11 | Sanity schema deployen | `npx sanity deploy` uitvoeren zodat het Studio bereikbaar is voor de stichting |
| 12 | Environment variables controleren | Alle env vars (Sanity, Resend) staan correct in Vercel production |
| 13 | Contactformulier testen | Resend e-mail delivery verifieren op production domein |
| 14 | Redirects oude site | Als er een bestaande site is: redirects opzetten van oude URLs naar nieuwe |

## Fase 3: Controle & acceptatie (28–29 april)

| # | Taak | Details |
|---|------|---------|
| 15 | Volledige doorloop alle pagina's | Elk menu-item, elke subpagina handmatig controleren |
| 16 | Mobiel testen | Alle pagina's op telefoon/tablet controleren |
| 17 | Zoekfunctie testen | Controleer of alle pagina's vindbaar zijn via zoek |
| 18 | Boekenarchief steekproef | Steekproef 20 boeken uit verschillende rubrieken — kloppen boeknummer, titel, auteur? |
| 19 | SEO check | Sitemap, robots.txt, Open Graph tags, JSON-LD breadcrumbs controleren |
| 20 | Performance check | Lighthouse score, Core Web Vitals op production URL |
| 21 | Goedkeuring opdrachtgever | Definitieve akkoord op content en vormgeving |

## Fase 4: Livegang (30 april)

| # | Taak | Details |
|---|------|---------|
| 22 | DNS switch uitvoeren | Definitieve DNS-omzetting naar Vercel |
| 23 | Controleer HTTPS | SSL certificaat actief op custom domein |
| 24 | Rooktest live site | Homepage, agenda, werkgroepen, boekenarchief, contact — alles bereikbaar |
| 25 | Google Search Console | Site aanmelden en sitemap indienen |
| 26 | Oude hosting opzeggen | Pas na bevestiging dat alles werkt (wacht minimaal 1 week) |

---

## Risico's

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| Content niet op tijd aangeleverd | Pagina's onvolledig bij livegang | Deadline 20 april voor alle content; wat niet binnen is gaat zonder live |
| DNS propagatie duurt lang | Site tijdelijk onbereikbaar | TTL van DNS records vooraf verlagen naar 300s |
| Vercel deploy problemen | Kan niet deployen | Vercel Git-integratie vooraf fixen (fase 2) |
