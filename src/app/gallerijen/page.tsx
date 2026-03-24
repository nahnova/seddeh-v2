import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { allGalleriesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/image";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Gallerijen",
  description:
    "Bekijk historische foto's en beeldmateriaal van Eygelshoven. Fotogalerijen over het dorpsleven, mijngeschiedenis, monumenten en meer.",
  openGraph: {
    title: "Gallerijen | Stichting Eygelshoven door de Eeuwen Heen",
    description:
      "Bekijk historische foto's en beeldmateriaal van Eygelshoven. Fotogalerijen over het dorpsleven, mijngeschiedenis, monumenten en meer.",
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
      name: "Gallerijen",
    },
  ],
};

export default async function GallerijenPage() {
  const galleries = await client.fetch(allGalleriesQuery).catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeading title="Gallerijen" />

      {galleries.length === 0 && (
        <p className="font-serif text-text-light">
          Er zijn momenteel geen galerijen beschikbaar.
        </p>
      )}

      <section aria-label="Fotogalerijen" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.map(
          (gallery: {
            _id: string;
            title: string;
            slug: { current: string };
            description?: string;
            coverImage?: { asset: { _ref: string } };
            imageCount: number;
          }) => (
            <Link
              key={gallery._id}
              href={`/gallerijen/${gallery.slug.current}`}
              className="group overflow-hidden rounded-sm border border-border bg-white transition-all hover:border-gold hover:shadow-md"
            >
              {gallery.coverImage && (
                <div className="overflow-hidden">
                  <Image
                    src={urlFor(gallery.coverImage).width(600).height(400).url()}
                    alt={gallery.title}
                    width={600}
                    height={400}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              {!gallery.coverImage && (
                <div className="flex h-48 items-center justify-center bg-cream-dark">
                  <span className="font-serif text-text-light">
                    Geen afbeelding
                  </span>
                </div>
              )}
              <div className="p-5">
                <h2 className="font-serif text-lg font-semibold text-text transition-colors group-hover:text-primary">
                  {gallery.title}
                </h2>
                {gallery.description && (
                  <p className="mt-1 font-serif text-sm text-text-light line-clamp-2">
                    {gallery.description}
                  </p>
                )}
                <p className="mt-2 font-sans text-xs font-medium uppercase tracking-wider text-text-light">
                  {gallery.imageCount}{" "}
                  {gallery.imageCount === 1 ? "afbeelding" : "afbeeldingen"}
                </p>
              </div>
            </Link>
          ),
        )}
      </section>
    </div>
  );
}
