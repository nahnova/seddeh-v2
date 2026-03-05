import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { newsBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import { urlFor } from "@/sanity/image";

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
      <Link
        href="/nieuws"
        className="font-sans text-sm text-primary hover:text-primary-dark"
      >
        &larr; Terug naar nieuws
      </Link>

      <article className="mt-6">
        <time className="font-sans text-sm text-text-light">
          {new Date(article.publishedAt).toLocaleDateString("nl-NL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-2 font-serif text-3xl font-bold text-primary-dark">
          {article.title}
        </h1>
        <div className="mt-2 h-1 w-16 bg-gold" />

        {article.mainImage && (
          <Image
            src={urlFor(article.mainImage).width(800).height(400).url()}
            alt={article.title}
            width={800}
            height={400}
            className="mt-6 rounded-lg object-cover"
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
