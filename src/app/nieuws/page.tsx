import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { allNewsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/image";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Nieuws",
  description:
    "Het laatste nieuws van Stichting Eygelshoven door de Eeuwen Heen. Blijf op de hoogte van activiteiten, ontdekkingen en publicaties over de historie van Eygelshoven.",
  openGraph: {
    title: "Nieuws | Stichting Eygelshoven door de Eeuwen Heen",
    description:
      "Het laatste nieuws van Stichting Eygelshoven door de Eeuwen Heen. Blijf op de hoogte van activiteiten, ontdekkingen en publicaties over de historie van Eygelshoven.",
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
      name: "Nieuws",
    },
  ],
};

export default async function NieuwsPage() {
  const news = await client.fetch(allNewsQuery).catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeading title="Nieuws" />

      {news.length === 0 && (
        <p className="font-serif text-text-light">
          Er zijn momenteel geen nieuwsberichten.
        </p>
      )}

      <section aria-label="Nieuwsberichten" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map(
          (item: {
            _id: string;
            title: string;
            slug: { current: string };
            publishedAt: string;
            excerpt?: string;
            mainImage?: { asset: { _ref: string } };
          }) => (
            <Link
              key={item._id}
              href={`/nieuws/${item.slug.current}`}
              className="group overflow-hidden rounded-sm border border-border bg-white transition-all hover:border-gold hover:shadow-md"
            >
              {item.mainImage && (
                <Image
                  src={urlFor(item.mainImage).width(600).height(300).url()}
                  alt={item.title}
                  width={600}
                  height={300}
                  className="w-full object-cover"
                />
              )}
              <div className="p-6">
                <time
                  dateTime={item.publishedAt}
                  className="font-sans text-xs font-medium uppercase tracking-wider text-text-light"
                >
                  {new Date(item.publishedAt).toLocaleDateString("nl-NL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 font-serif text-lg font-semibold leading-snug text-text transition-colors group-hover:text-primary">
                  {item.title}
                </h2>
                {item.excerpt && (
                  <p className="mt-2 font-serif text-sm leading-relaxed text-text-light line-clamp-3">
                    {item.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ),
        )}
      </section>
    </div>
  );
}
