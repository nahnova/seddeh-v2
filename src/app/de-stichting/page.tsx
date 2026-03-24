import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "De Stichting",
  description:
    "Leer meer over Stichting Eygelshoven door de Eeuwen Heen: opgericht in 1981 als heemkundevereniging voor het behoud van de geschiedenis van Eygelshoven, Limburg.",
  openGraph: {
    title: "De Stichting | Stichting Eygelshoven door de Eeuwen Heen",
    description:
      "Leer meer over Stichting Eygelshoven door de Eeuwen Heen: opgericht in 1981 als heemkundevereniging voor het behoud van de geschiedenis van Eygelshoven, Limburg.",
  },
};

export const revalidate = 60;

const subpages = [
  {
    title: "Wat is De Laethof",
    slug: "wat-is-de-laethof",
    description: "Informatie over ons onderkomen",
  },
  {
    title: "Het Bestuur",
    slug: "het-bestuur",
    description: "De bestuursleden van de stichting",
  },
  {
    title: "De Doelstellingen",
    slug: "de-doelstellingen",
    description: "Onze missie en doelen",
  },
  {
    title: "Publicaties",
    slug: "publicaties",
    description: "Uitgaven en publicaties",
  },
  {
    title: "Geschiedenis",
    slug: "geschiedenis",
    description: "Historische achtergrond",
  },
  {
    title: "Het Wapen van Eygelshoven",
    slug: "het-wapen-van-eygelshoven",
    description: "Het gemeentewapen",
  },
  {
    title: "Monumenten",
    slug: "monumenten",
    description: "Historische monumenten in Eygelshoven",
  },
];

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
      name: "De Stichting",
    },
  ],
};

export default async function DeStichtingPage() {
  const page = await client
    .fetch(pageBySlugQuery, { slug: "de-stichting" })
    .catch(() => null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeading title="De Stichting" />

      {page?.body && (
        <div className="max-w-3xl">
          <PortableText value={page.body} />
        </div>
      )}

      {!page?.body && (
        <p className="max-w-3xl font-serif text-lg leading-relaxed text-text-light">
          Stichting Eygelshoven door de Eeuwen Heen fungeert als
          heemkundevereniging voor Eygelshoven. Opgericht op 30 november 1981
          ter gelegenheid van het 850-jarig bestaan van Eygelshoven, zetten wij
          ons in voor het verzamelen, bewaren en ontsluiten van de rijke
          historie van ons dorp.
        </p>
      )}

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subpages.map((sub) => (
          <Link
            key={sub.slug}
            href={`/de-stichting/${sub.slug}`}
            className="group relative overflow-hidden rounded-sm border border-border bg-white p-6 transition-all hover:border-gold hover:shadow-md"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gold opacity-0 transition-opacity group-hover:opacity-100" />
            <h2 className="font-serif text-lg font-semibold text-text transition-colors group-hover:text-primary">
              {sub.title}
            </h2>
            <p className="mt-1 font-serif text-sm text-text-light">
              {sub.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
