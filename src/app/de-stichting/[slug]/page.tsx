import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import {
  pageBySlugQuery,
  allBoardMembersQuery,
  allMonumentsQuery,
  allPublicationsQuery,
} from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import { urlFor } from "@/sanity/image";
import { PageHeading } from "@/components/PageHeading";
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
  return {
    title: page?.title || slug.replace(/-/g, " "),
    description: page?.seoDescription,
  };
}

export const revalidate = 60;

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

  // Special page: Publicaties
  if (slug === "publicaties") {
    const publications = await client
      .fetch(allPublicationsQuery)
      .catch(() => []);
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeading
          title="Publicaties"
          backHref="/de-stichting"
          backLabel="De Stichting"
        />

        {page?.body && (
          <div className="mb-10 max-w-3xl">
            <PortableText value={page.body} />
          </div>
        )}

        {publications.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publications.map(
              (pub: {
                _id: string;
                title: string;
                author?: string;
                year?: string;
                description?: string;
                coverImage?: { asset: { _ref: string } };
              }) => (
                <article
                  key={pub._id}
                  className="rounded-sm border border-border bg-white p-6 transition-colors hover:border-gold"
                >
                  {pub.coverImage && (
                    <Image
                      src={urlFor(pub.coverImage).width(300).height(400).url()}
                      alt={pub.title}
                      width={300}
                      height={400}
                      className="mb-4 rounded-sm object-cover"
                    />
                  )}
                  <h3 className="font-serif text-lg font-semibold text-text">
                    {pub.title}
                  </h3>
                  {pub.author && (
                    <p className="font-serif text-sm text-text-light">
                      {pub.author}
                      {pub.year && ` (${pub.year})`}
                    </p>
                  )}
                  {pub.description && (
                    <p className="mt-2 font-serif text-sm text-text-light">
                      {pub.description}
                    </p>
                  )}
                </article>
              ),
            )}
          </div>
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
