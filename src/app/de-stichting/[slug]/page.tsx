import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import {
  pageBySlugQuery,
  allBoardMembersQuery,
  allMonumentsQuery,
  allPublicationsQuery,
  allLibraryItemsQuery,
} from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import { urlFor } from "@/sanity/image";
import { PageHeading } from "@/components/PageHeading";
import { PublicationShop } from "@/components/PublicationShop";
import { BibliotheekCatalogus } from "@/components/BibliotheekCatalogus";
import Image from "next/image";
import { Navigation } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await client
    .fetch(pageBySlugQuery, { slug })
    .catch(() => null);
  const title = page?.title || slug.replace(/-/g, " ");
  const description =
    page?.seoDescription ||
    `Informatie over ${title} van Stichting Eygelshoven door de Eeuwen Heen, heemkundevereniging in Eygelshoven, Limburg.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export const revalidate = 60;

function BreadcrumbJsonLd({ title, slug }: { title: string; slug: string }) {
  const jsonLd = {
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
        name: title,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function DeStichtingSubPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await client
    .fetch(pageBySlugQuery, { slug })
    .catch(() => null);

  // Special page: Het Bestuur
  if (slug === "het-bestuur") {
    const members = await client
      .fetch(allBoardMembersQuery)
      .catch(() => []);
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadcrumbJsonLd title="Het Bestuur" slug="het-bestuur" />
        <PageHeading
          title="Het Bestuur"
          backHref="/de-stichting"
          backLabel="De Stichting"
        />

        {page?.body && (
          <div className="mb-10 max-w-3xl">
            <PortableText value={page.body} />
          </div>
        )}

        {members.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map(
              (member: {
                _id: string;
                name: string;
                role: string;
                photo?: { asset: { _ref: string } };
              }) => (
                <article
                  key={member._id}
                  className="rounded-sm border border-border bg-white p-6 text-center"
                >
                  {member.photo && (
                    <Image
                      src={urlFor(member.photo).width(200).height(200).url()}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="mx-auto mb-4 rounded-full object-cover"
                    />
                  )}
                  <h3 className="font-serif text-lg font-semibold text-text">
                    {member.name}
                  </h3>
                  <p className="font-serif text-sm text-text-light">
                    {member.role}
                  </p>
                </article>
              ),
            )}
          </div>
        )}
      </div>
    );
  }

  // Special page: Monumenten
  if (slug === "monumenten") {
    const monuments = await client
      .fetch(allMonumentsQuery)
      .catch(() => []);
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadcrumbJsonLd title="Monumenten" slug="monumenten" />
        <PageHeading
          title="Monumenten"
          backHref="/de-stichting"
          backLabel="De Stichting"
        />

        {page?.body && (
          <div className="mb-10 max-w-3xl">
            <PortableText value={page.body} />
          </div>
        )}

        {monuments.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {monuments.map(
              (m: {
                _id: string;
                name: string;
                location?: string;
                year?: string;
                image?: { asset: { _ref: string } };
                description?: Parameters<typeof PortableText>[0]["value"];
              }) => (
                <article
                  key={m._id}
                  className="overflow-hidden rounded-sm border border-border bg-white transition-colors hover:border-gold"
                >
                  {m.image && (
                    <Image
                      src={urlFor(m.image).width(600).height(300).url()}
                      alt={m.name}
                      width={600}
                      height={300}
                      className="w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-semibold text-text">
                      {m.name}
                    </h3>
                    {(m.location || m.year) && (
                      <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wider text-text-light">
                        {[m.location, m.year].filter(Boolean).join(" — ")}
                      </p>
                    )}
                    {m.description && (
                      <div className="mt-3">
                        <PortableText value={m.description} />
                      </div>
                    )}
                    {m.location && (
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(m.location + ", Eygelshoven")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-sm border-2 border-gold bg-cream-dark px-4 py-2 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold hover:text-white"
                      >
                        <Navigation className="h-4 w-4" aria-hidden="true" />
                        Navigeer hierheen
                      </a>
                    )}
                  </div>
                </article>
              ),
            )}
          </div>
        )}
      </div>
    );
  }

  // Special page: Publicaties (webshop-style)
  if (slug === "publicaties") {
    const publications = await client
      .fetch(allPublicationsQuery)
      .catch(() => []);
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadcrumbJsonLd title="Publicaties" slug="publicaties" />
        <PageHeading
          title="Publicaties"
          backHref="/de-stichting"
          backLabel="De Stichting"
        />

        {page?.body && (
          <div className="mb-6 max-w-3xl">
            <PortableText value={page.body} />
          </div>
        )}

        {/* Shipping note */}
        <div className="mb-8 rounded-sm border border-gold/30 bg-cream px-5 py-3">
          <p className="font-serif text-sm text-text-light">
            Alle genoemde prijzen zijn excl. eventuele verzendkosten.
            Publicaties zijn ook verkrijgbaar tijdens de maandelijkse boekenbeurs in de Laethof.
          </p>
        </div>

        {publications.length > 0 && (
          <PublicationShop
            publications={publications.map(
              (pub: {
                _id: string;
                title: string;
                slug?: { current: string };
                description?: string;
                price?: number;
                isbn?: string;
                format?: string;
                coverImage?: { asset: { _ref: string } };
              }) => ({
                _id: pub._id,
                title: pub.title,
                slug: pub.slug?.current,
                description: pub.description,
                price: pub.price,
                isbn: pub.isbn,
                format: pub.format,
                imageUrl: pub.coverImage
                  ? urlFor(pub.coverImage).width(600).height(800).url()
                  : undefined,
              }),
            )}
          />
        )}
      </div>
    );
  }

  // Special page: Boekenarchief
  if (slug === "boekenarchief") {
    const libraryItems = await client
      .fetch(allLibraryItemsQuery)
      .catch(() => []);
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadcrumbJsonLd title="Boekenarchief" slug="boekenarchief" />
        <PageHeading
          title="Boekenarchief"
          backHref="/de-stichting"
          backLabel="De Stichting"
        />

        {page?.body && (
          <div className="mb-6 max-w-3xl">
            <PortableText value={page.body} />
          </div>
        )}

        {/* Info note */}
        <div className="mb-8 rounded-sm border border-gold/30 bg-cream px-5 py-3">
          <p className="font-serif text-sm text-text-light">
            Ons boekenarchief is toegankelijk op afspraak bij De Laethof,
            Putstraat 17 te Eygelshoven. Klik op &ldquo;Inzage aanvragen&rdquo;
            om een afspraak te maken voor een specifiek boek.
          </p>
        </div>

        {libraryItems.length > 0 && (
          <BibliotheekCatalogus
            items={libraryItems.map(
              (item: {
                _id: string;
                title: string;
                author?: string;
                year?: string;
                category?: string;
                description?: string;
                isbn?: string;
                format?: string;
                coverImage?: { asset: { _ref: string } };
              }) => ({
                _id: item._id,
                title: item.title,
                author: item.author,
                year: item.year,
                category: item.category,
                description: item.description,
                isbn: item.isbn,
                format: item.format,
                imageUrl: item.coverImage
                  ? urlFor(item.coverImage).width(600).height(800).url()
                  : undefined,
              }),
            )}
          />
        )}
      </div>
    );
  }

  // Generic page
  if (!page) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd title={page.title} slug={slug} />
      <PageHeading
        title={page.title}
        backHref="/de-stichting"
        backLabel="De Stichting"
      />

      {page.body && (
        <div className="max-w-3xl">
          <PortableText value={page.body} />
        </div>
      )}
    </div>
  );
}
