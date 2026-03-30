import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { client } from "@/sanity/client";
import { publicationBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@/components/PortableText";
import { PageHeading } from "@/components/PageHeading";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pub = await client
    .fetch(publicationBySlugQuery, { slug })
    .catch(() => null);
  if (!pub) return { title: "Publicatie niet gevonden" };

  return {
    title: `${pub.title} | Publicaties`,
    description:
      pub.description ||
      `Lees meer over de publicatie "${pub.title}" van Stichting Eygelshoven door de Eeuwen Heen.`,
    openGraph: {
      title: `${pub.title} | Publicaties`,
      description:
        pub.description ||
        `Lees meer over de publicatie "${pub.title}" van Stichting Eygelshoven door de Eeuwen Heen.`,
    },
  };
}

export const revalidate = 60;

export default async function PublicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pub = await client
    .fetch(publicationBySlugQuery, { slug })
    .catch(() => null);

  if (!pub) notFound();

  const imageUrl = pub.coverImage
    ? urlFor(pub.coverImage).width(800).height(1067).url()
    : null;

  const priceLabel = pub.price
    ? `€ ${pub.price.toFixed(2).replace(".", ",")}`
    : "Prijs op aanvraag";

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
        item: "https://stichting-eygelshovendoordeeeuwenheen.nl/de-stichting",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Publicaties",
        item: "https://stichting-eygelshovendoordeeeuwenheen.nl/de-stichting/publicaties",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: pub.title,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeading
        title={pub.title}
        backHref="/de-stichting/publicaties"
        backLabel="Publicaties"
      />

      <div className="mt-8 grid gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr]">
        {/* Cover image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-border bg-cream-dark">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={pub.title}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-gold/30" />
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {/* Metadata */}
          <div className="flex flex-wrap gap-2">
            {pub.author && (
              <span className="rounded-sm bg-cream-dark px-3 py-1 font-serif text-sm text-text-light">
                {pub.author}
              </span>
            )}
            {pub.year && (
              <span className="rounded-sm bg-cream-dark px-3 py-1 font-serif text-sm text-text-light">
                {pub.year}
              </span>
            )}
            {pub.format && (
              <span className="rounded-sm bg-cream-dark px-3 py-1 font-serif text-sm text-text-light">
                {pub.format}
              </span>
            )}
            {pub.isbn && (
              <span className="rounded-sm bg-cream-dark px-3 py-1 font-serif text-sm text-text-light">
                ISBN {pub.isbn}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-4">
            <span className="font-serif text-2xl font-bold text-primary-dark">
              {priceLabel}
            </span>
          </div>

          {/* Short description */}
          {pub.description && (
            <p className="mt-4 font-serif text-base leading-relaxed text-text-light">
              {pub.description}
            </p>
          )}

          {/* Rich body content */}
          {pub.body && (
            <div className="mt-6 border-t border-border/60 pt-6">
              <PortableText value={pub.body} />
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/de-stichting/publicaties"
              className="flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 font-serif text-sm font-semibold text-text transition-colors hover:border-gold hover:text-primary-dark"
            >
              <ArrowLeft size={14} />
              Terug naar publicaties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
