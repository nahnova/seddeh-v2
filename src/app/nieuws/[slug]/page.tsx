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
  const title = article?.title || slug.replace(/-/g, " ");
  const description =
    article?.excerpt ||
    `Lees dit nieuwsbericht van Stichting Eygelshoven door de Eeuwen Heen over de geschiedenis van Eygelshoven.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(article?.publishedAt && {
        publishedTime: article.publishedAt,
      }),
      ...(article?.mainImage && {
        images: [
          {
            url: urlFor(article.mainImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
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
        item: "https://stichting-eygelshovendoordeeeuwenheen.nl/nieuws",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt || "",
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Stichting Eygelshoven door de Eeuwen Heen",
      url: "https://stichting-eygelshovendoordeeeuwenheen.nl",
    },
    publisher: {
      "@type": "Organization",
      name: "Stichting Eygelshoven door de Eeuwen Heen",
      logo: {
        "@type": "ImageObject",
        url: "https://stichting-eygelshovendoordeeeuwenheen.nl/wapen.png",
      },
    },
    ...(article.mainImage && {
      image: urlFor(article.mainImage).width(1200).height(630).url(),
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://stichting-eygelshovendoordeeeuwenheen.nl/nieuws/${slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, articleJsonLd]),
        }}
      />
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
