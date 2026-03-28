import type { Metadata } from "next";
import { client } from "@/sanity/client";
import {
  pageBySlugQuery,
  allArchiveCollectionsQuery,
} from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
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

export const revalidate = 60;

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

export default async function ArchiefAanvraagPage() {
  const [page, collections] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: "archief-aanvraag" }).catch(() => null),
    client
      .fetch<{ _id: string; title: string; description?: string }[]>(
        allArchiveCollectionsQuery,
      )
      .catch(() => []),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeading title="Archief Aanvraag" />

      {/* Editable intro text from Sanity */}
      {page?.body && (
        <div className="mb-10 max-w-3xl">
          <PortableText value={page.body} />
        </div>
      )}

      {/* Archive collections from Sanity */}
      {collections.length > 0 && (
        <div className="mb-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {collections.map((col) => (
              <div
                key={col._id}
                className="rounded-sm border border-border bg-white p-5"
              >
                <h3 className="font-serif text-sm font-semibold text-primary-dark">
                  {col.title}
                </h3>
                {col.description && (
                  <p className="mt-1 font-serif text-sm leading-relaxed text-text-light">
                    {col.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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
