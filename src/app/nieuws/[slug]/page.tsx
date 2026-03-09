import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { newsBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import { urlFor } from "@/sanity/image";
import { PageHeading } from "@/components/PageHeading";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await client
    .fetch(newsBySlugQuery, { slug })
    .catch(() => null);
  return {
    title: article?.title,
    description: article?.excerpt,
  };
}

export const revalidate = 60;

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await client
    .fetch(newsBySlugQuery, { slug })
    .catch(() => null);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <article>
        <time
          dateTime={article.publishedAt}
          className="font-sans text-xs font-medium uppercase tracking-wider text-text-light"
        >
          {new Date(article.publishedAt).toLocaleDateString("nl-NL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <PageHeading title={article.title} backHref="/nieuws" backLabel="Terug naar nieuws" />

        {article.mainImage && (
          <Image
            src={urlFor(article.mainImage).width(800).height(400).url()}
            alt={article.title}
            width={800}
            height={400}
            className="rounded-sm object-cover"
          />
        )}

        {article.body && (
          <div className="mt-8">
            <PortableText value={article.body} />
          </div>
        )}
      </article>
    </div>
  );
}
