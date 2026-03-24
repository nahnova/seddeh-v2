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

export default function ArchiefAanvraagPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeading title="Archief Aanvraag" />

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
