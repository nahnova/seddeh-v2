import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import {
  allKennisbankLinksQuery,
  allKennisbankCategoriesQuery,
} from "@/sanity/lib/queries";
import { ExternalLink, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Kennisbank",
  description:
    "Publieke kennisbron met links naar genealogische en historische websites over Eygelshoven en Limburg.",
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

export default async function KennisbankPage() {
  const [links, categories] = await Promise.all([
    client.fetch<KennisbankLink[]>(allKennisbankLinksQuery).catch(() => []),
    client
      .fetch<KennisbankCategory[]>(allKennisbankCategoriesQuery)
      .catch(() => []),
  ]);

  // Group links by category
  const linksByCategory = categories.map((cat) => ({
    ...cat,
    links: links.filter((link) => link.category?._id === cat._id),
  }));

  // Featured links
  const featuredLinks = links.filter((link) => link.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-primary-dark sm:text-4xl">
          Kennisbank
        </h1>
        <div className="mt-2 h-1 w-16 bg-gold" />
        <p className="mt-4 font-serif text-lg text-text-light">
          Een verzameling publieke bronnen voor genealogisch en historisch
          onderzoek over Eygelshoven, Limburg en omstreken. Deze links zijn
          vrij toegankelijk.
        </p>
      </div>

      {/* Archive CTA */}
      <div className="mt-8 rounded-lg border border-gold bg-cream-dark p-6">
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
          className="mt-3 inline-block rounded-md bg-primary px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Archief Aanvragen
        </Link>
      </div>

      {/* Featured links */}
      {featuredLinks.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-primary-dark">
            <Star className="h-5 w-5 text-gold" />
            Uitgelichte bronnen
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredLinks.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-gold bg-white p-4 transition-all hover:shadow-md"
              >
                <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                <div>
                  <h3 className="font-serif font-semibold text-text group-hover:text-primary">
                    {link.title}
                  </h3>
                  {link.description && (
                    <p className="mt-1 font-serif text-sm text-text-light">
                      {link.description}
                    </p>
                  )}
                  <span className="mt-1 inline-block font-sans text-xs text-primary">
                    {link.category?.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Links by category */}
      <div className="mt-12 space-y-10">
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
            <div className="mt-4 h-px bg-border" />
            {cat.links.length === 0 && (
              <p className="mt-3 font-serif text-sm text-text-light">
                Nog geen links in deze categorie.
              </p>
            )}
            <div className="mt-3 space-y-3">
              {cat.links.map((link) => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-md border border-border bg-white p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-text-light group-hover:text-primary" />
                  <div>
                    <h3 className="font-serif font-medium text-text group-hover:text-primary">
                      {link.title}
                    </h3>
                    {link.description && (
                      <p className="mt-0.5 font-serif text-sm text-text-light">
                        {link.description}
                      </p>
                    )}
                    <span className="mt-0.5 inline-block font-sans text-xs text-text-light/70">
                      {new URL(link.url).hostname}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Table of contents sidebar-like navigation */}
      {categories.length > 0 && (
        <nav className="mt-12 rounded-lg border border-border bg-white p-6">
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-text-light">
            Categorieën
          </h3>
          <ul className="mt-3 space-y-2">
            {categories.map((cat) => (
              <li key={cat._id}>
                <a
                  href={`#${cat.slug.current}`}
                  className="font-serif text-sm text-primary hover:text-primary-dark"
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
