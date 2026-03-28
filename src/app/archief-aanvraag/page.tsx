import type { Metadata } from "next";
import { ArchiefAanvraagForm } from "@/components/ArchiefAanvraagForm";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Archief Aanvraag",
  description:
    "Vraag toegang aan tot het historisch archief van Stichting Eygelshoven door de Eeuwen Heen. Ons archief bevat unieke bronnen over de geschiedenis van Eygelshoven.",
  openGraph: {
    title: "Archief Aanvraag | Stichting Eygelshoven door de Eeuwen Heen",
    description:
      "Vraag toegang aan tot het historisch archief van Stichting Eygelshoven door de Eeuwen Heen. Ons archief bevat unieke bronnen over de geschiedenis van Eygelshoven.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://stichting-eygelshovendoordeeeuwenheen.nl",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Archief Aanvraag",
    },
  ],
};

const archiveCollections = [
  {
    title: "Genealogische collectie",
    description:
      "Stambomen, doopregisters, trouwakten en overlijdensakten van Eygelshovense families. Bidprentjes en rouwkaarten.",
  },
  {
    title: "Foto- en beeldarchief",
    description:
      "Duizenden historische foto's van Eygelshoven: straatbeelden, portretten, luchtfoto's, schoolfoto's en evenementen.",
  },
  {
    title: "Mijnarchief",
    description:
      "Documentatie over de mijnbouw in Eygelshoven en omgeving: personeelskaarten, bedrijfsfoto's, kaarten en rapporten.",
  },
  {
    title: "Kaarten en plattegronden",
    description:
      "Historische kaarten, kadasterkaarten en plattegronden van Eygelshoven door de eeuwen heen.",
  },
  {
    title: "Krantenknipsels en publicaties",
    description:
      "Verzameling krantenartikelen, tijdschriften en publicaties over de geschiedenis van Eygelshoven en Zuid-Limburg.",
  },
  {
    title: "Kerkelijk archief",
    description:
      "Documenten over de parochie, kerkgebouwen, processies en het religieuze leven in Eygelshoven.",
  },
];

export default function ArchiefAanvraagPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeading title="Archief Aanvraag" />

      {/* Archive overview */}
      <div className="mb-10">
        <p className="font-serif text-lg leading-relaxed text-text-light">
          Het archief van Stichting Eygelshoven door de Eeuwen Heen bevat een
          uitgebreide collectie bronnen over de geschiedenis van Eygelshoven.
          Hieronder vindt u een overzicht van wat er beschikbaar is.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {archiveCollections.map((col) => (
            <div
              key={col.title}
              className="rounded-sm border border-border bg-white p-5"
            >
              <h3 className="font-serif text-sm font-semibold text-primary-dark">
                {col.title}
              </h3>
              <p className="mt-1 font-serif text-sm leading-relaxed text-text-light">
                {col.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-sm border border-gold/50 bg-cream-dark p-6">
        <h2 className="font-serif text-lg font-semibold text-primary-dark">
          Hoe werkt het?
        </h2>
        <ol className="mt-3 list-inside list-decimal space-y-2 font-serif text-sm text-text-light">
          <li>Vul onderstaand formulier in met uw onderzoeksvraag.</li>
          <li>
            Wij beoordelen uw aanvraag en nemen contact met u op.
          </li>
          <li>
            Na goedkeuring kunt u langskomen bij De Laethof om de stukken in
            te zien.
          </li>
        </ol>
        <p className="mt-3 font-serif text-sm text-text-light">
          Ons archief is niet publiek toegankelijk, maar wel beschikbaar op
          aanvraag. Wij helpen u graag met uw onderzoek.
        </p>
      </div>

      <div className="mt-8">
        <ArchiefAanvraagForm />
      </div>
    </div>
  );
}
