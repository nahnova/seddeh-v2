import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import {
  pageBySlugQuery,
  allBoardMembersQuery,
  allMonumentsQuery,
  allPublicationsQuery,
} from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import { urlFor } from "@/sanity/image";
import Image from "next/image";

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

  // Special page: Het Bestuur - show board members
  if (slug === "het-bestuur") {
    const members = await client
      .fetch(allBoardMembersQuery)
      .catch(() => []);
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/de-stichting"
          className="font-sans text-sm text-primary hover:text-primary-dark"
        >
          &larr; De Stichting
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-bold text-primary-dark">
          Het Bestuur
        </h1>
        <div className="mt-2 h-1 w-16 bg-gold" />

        {page?.body && (
          <div className="mt-8 max-w-3xl">
            <PortableText value={page.body} />
          </div>
        )}

        {members.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map(
              (member: {
                _id: string;
                name: string;
                role: string;
                photo?: { asset: { _ref: string } };
              }) => (
                <div
                  key={member._id}
                  className="rounded-lg border border-border bg-white p-6 text-center"
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
                </div>
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
        <Link
          href="/de-stichting"
          className="font-sans text-sm text-primary hover:text-primary-dark"
        >
          &larr; De Stichting
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-bold text-primary-dark">
          Monumenten
        </h1>
        <div className="mt-2 h-1 w-16 bg-gold" />

        {page?.body && (
          <div className="mt-8 max-w-3xl">
            <PortableText value={page.body} />
          </div>
        )}

        {monuments.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {monuments.map(
              (m: {
                _id: string;
                name: string;
                location?: string;
                year?: string;
                image?: { asset: { _ref: string } };
                description?: Parameters<typeof PortableText>[0]["value"];
              }) => (
                <div
                  key={m._id}
                  className="overflow-hidden rounded-lg border border-border bg-white"
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
                      <p className="mt-1 font-sans text-sm text-text-light">
                        {[m.location, m.year].filter(Boolean).join(" — ")}
                      </p>
                    )}
                    {m.description && (
                      <div className="mt-3">
                        <PortableText value={m.description} />
                      </div>
                    )}
                  </div>
                </div>
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
        <Link
          href="/de-stichting"
          className="font-sans text-sm text-primary hover:text-primary-dark"
        >
          &larr; De Stichting
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-bold text-primary-dark">
          Publicaties
        </h1>
        <div className="mt-2 h-1 w-16 bg-gold" />

        {page?.body && (
          <div className="mt-8 max-w-3xl">
            <PortableText value={page.body} />
          </div>
        )}

        {publications.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publications.map(
              (pub: {
                _id: string;
                title: string;
                author?: string;
                year?: string;
                description?: string;
                coverImage?: { asset: { _ref: string } };
              }) => (
                <div
                  key={pub._id}
                  className="rounded-lg border border-border bg-white p-6"
                >
                  {pub.coverImage && (
                    <Image
                      src={urlFor(pub.coverImage).width(300).height(400).url()}
                      alt={pub.title}
                      width={300}
                      height={400}
                      className="mb-4 rounded object-cover"
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
                </div>
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
      <Link
        href="/de-stichting"
        className="font-sans text-sm text-primary hover:text-primary-dark"
      >
        &larr; De Stichting
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-bold text-primary-dark">
        {page.title}
      </h1>
      <div className="mt-2 h-1 w-16 bg-gold" />

      {page.body && (
        <div className="mt-8 max-w-3xl">
          <PortableText value={page.body} />
        </div>
      )}
    </div>
  );
}
