import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Schenking",
  description:
    "Steun Stichting Eygelshoven door de Eeuwen Heen met een schenking. Uw bijdrage helpt bij het behoud en de ontsluiting van het Eygelshovense erfgoed.",
  openGraph: {
    title: "Schenking | Stichting Eygelshoven door de Eeuwen Heen",
    description:
      "Steun Stichting Eygelshoven door de Eeuwen Heen met een schenking. Uw bijdrage helpt bij het behoud en de ontsluiting van het Eygelshovense erfgoed.",
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
      name: "Contact",
      item: "https://stichting-eygelshovendoordeeeuwenheen.nl/contact",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Schenking",
    },
  ],
};

export default function SchenkingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeading
        title="Schenking"
        backHref="/contact"
        backLabel="Terug naar contact"
      />

      <div className="space-y-6">
        <p className="font-serif leading-relaxed text-text-light">
          Met uw schenking ondersteunt u het werk van Stichting Eygelshoven
          door de Eeuwen Heen. Wij zetten ons in voor het behoud en de
          ontsluiting van de geschiedenis van Eygelshoven.
        </p>

        <div className="rounded-sm border border-border bg-white p-6">
          <h2 className="font-serif text-lg font-semibold text-text">
            Bankgegevens
          </h2>
          <p className="mt-3 font-serif text-text-light">
            Neem contact met ons op voor de bankgegevens of andere manieren
            om een bijdrage te leveren.
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-block font-serif text-sm text-primary transition-colors hover:text-gold"
          >
            Neem contact op <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
