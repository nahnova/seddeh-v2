import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import {
  allKennisbankLinksQuery,
  allKennisbankCategoriesQuery,
} from "@/sanity/lib/queries";
import { ExternalLink, Star } from "lucide-react";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Kennisbank",
  description:
    "Publieke kennisbron met links naar genealogische en historische websites over Eygelshoven en Limburg. Bronnen voor stamboomonderzoek, heemkunde en erfgoed.",
  openGraph: {
    title: "Kennisbank | Stichting Eygelshoven door de Eeuwen Heen",
    description:
      "Publieke kennisbron met links naar genealogische en historische websites over Eygelshoven en Limburg. Bronnen voor stamboomonderzoek, heemkunde en erfgoed.",
  },
};

export const revalidate = 60;

interface KennisbankLink {
  _id: string;
  title: string;
  url: string;
  description?: string;
  featured: boolean;
  category: {
    _id: string;
    name: string;
    slug: { current: string };
    description?: string;
    order: number;
  };
}

interface KennisbankCategory {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  order: number;
}

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
      name: "Kennisbank",
    },
  ],
};

export default async function KennisbankPage() {
  const [links, categories] = await Promise.all([
    client.fetch<KennisbankLink[]>(allKennisbankLinksQuery).catch(() => []),
    client
      .fetch<KennisbankCategory[]>(allKennisbankCategoriesQuery)
      .catch(() => []),
  ]);

  const linksByCategory = categories.map((cat) => ({
    ...cat,
    links: links.filter((link) => link.category?._id === cat._id),
  }));

  const featuredLinks = links.filter((link) => link.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeading
        title="Kennisbank"
        description="Een verzameling publieke bronnen voor genealogisch en historisch onderzoek over Eygelshoven, Limburg en omstreken. Deze links zijn vrij toegankelijk."
      />

      {/* Archive CTA */}
      <div className="rounded-sm border border-gold/50 bg-cream-dark p-6">
        <h2 className="font-serif text-lg font-semibold text-primary-dark">
          Op zoek naar meer?
        </h2>
        <p className="mt-2 font-serif text-sm text-text-light">
          Ons archief bevat uitgebreide collecties die niet publiek
          toegankelijk zijn. U kunt een aanvraag indienen om stukken in te
          zien bij De Laethof.
        </p>
        <Link
          href="/archief-aanvraag"
          className="mt-3 inline-block rounded-sm border-2 border-gold bg-gold px-5 py-2 font-serif text-sm font-semibold text-primary-dark transition-colors hover:border-gold-light hover:bg-gold-light"
        >
          Archief Aanvragen
        </Link>
      </div>

      {/* Featured links */}
      {featuredLinks.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-gold" aria-hidden="true" />
            <h2 className="font-serif text-xl font-semibold text-primary-dark">
              Uitgelichte bronnen
            </h2>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-0.5 w-12 bg-gold" />
            <div className="h-0.5 w-3 bg-gold/40" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredLinks.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-sm border border-gold/50 bg-white p-5 transition-all hover:border-gold hover:shadow-md"
              >
                <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <h3 className="font-serif font-semibold text-text transition-colors group-hover:text-primary">
                    {link.title}
                    <span className="sr-only">(opent in nieuw venster)</span>
                  </h3>
                  {link.description && (
                    <p className="mt-1 font-serif text-sm text-text-light">
                      {link.description}
                    </p>
                  )}
                  <span className="mt-1 inline-block font-sans text-xs font-medium uppercase tracking-wider text-primary">
                    {link.category?.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Links by category */}
      <div className="mt-14 space-y-12">
        {linksByCategory.map((cat) => (
          <section key={cat._id} id={cat.slug.current}>
            <h2 className="font-serif text-xl font-semibold text-primary-dark">
              {cat.name}
            </h2>
            {cat.description && (
              <p className="mt-1 font-serif text-sm text-text-light">
                {cat.description}
              </p>
            )}
            <div className="mt-3 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-border" />
              <div className="h-0.5 flex-1 bg-border/50" />
            </div>
            {cat.links.length === 0 && (
              <p className="mt-3 font-serif text-sm text-text-light">
                Nog geen links in deze categorie.
              </p>
            )}
            <div className="mt-4 space-y-3">
              {cat.links.map((link) => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-sm border border-border bg-white p-4 transition-all hover:border-gold hover:shadow-sm"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-text-light transition-colors group-hover:text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="font-serif font-medium text-text transition-colors group-hover:text-primary">
                      {link.title}
                      <span className="sr-only">(opent in nieuw venster)</span>
                    </h3>
                    {link.description && (
                      <p className="mt-0.5 font-serif text-sm text-text-light">
                        {link.description}
                      </p>
                    )}
                    <span className="mt-0.5 inline-block font-sans text-xs text-text-light/70">
                      {(() => {
                        try {
                          return new URL(link.url).hostname;
                        } catch {
                          return link.url;
                        }
                      })()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Category navigation */}
      {categories.length > 0 && (
        <nav aria-label="Categorieën" className="mt-14 rounded-sm border border-border bg-white p-6">
          <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
            Categorieën
          </h3>
          <ul className="mt-3 space-y-2">
            {categories.map((cat) => (
              <li key={cat._id}>
                <a
                  href={`#${cat.slug.current}`}
                  className="font-serif text-sm text-primary transition-colors hover:text-gold"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
