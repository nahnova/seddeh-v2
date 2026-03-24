import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { galleryBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/image";
import { PageHeading } from "@/components/PageHeading";
import { ProtectedImage } from "@/components/ProtectedImage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await client
    .fetch(galleryBySlugQuery, { slug })
    .catch(() => null);
  const title = gallery?.title || slug.replace(/-/g, " ");
  const description =
    gallery?.description ||
    `Fotogalerij van Stichting Eygelshoven door de Eeuwen Heen met historische beelden van Eygelshoven.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(gallery?.images?.[0]?.image && {
        images: [
          {
            url: urlFor(gallery.images[0].image).width(1200).height(630).url(),
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

export default async function GalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const gallery = await client
    .fetch(galleryBySlugQuery, { slug })
    .catch(() => null);

  if (!gallery) {
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
        name: "Gallerijen",
        item: "https://stichting-eygelshovendoordeeeuwenheen.nl/gallerijen",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: gallery.title,
      },
    ],
  };

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: gallery.title,
    description:
      gallery.description ||
      `Historische fotogalerij over ${gallery.title} van Eygelshoven.`,
    url: `https://stichting-eygelshovendoordeeeuwenheen.nl/gallerijen/${slug}`,
    ...(gallery.images &&
      gallery.images.length > 0 && {
        image: gallery.images.map(
          (img: { image: { asset: { _ref: string } }; alt?: string }) =>
            urlFor(img.image).width(800).url(),
        ),
      }),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, galleryJsonLd]),
        }}
      />
      <PageHeading
        title={gallery.title}
        backHref="/gallerijen"
        backLabel="Terug naar gallerijen"
        description={gallery.description}
      />

      {gallery.images && gallery.images.length > 0 && (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.images.map(
            (
              img: {
                image: { asset: { _ref: string } };
                alt?: string;
                caption?: string;
                year?: string;
              },
              index: number,
            ) => (
              <figure key={index} className="mb-4 break-inside-avoid">
                <ProtectedImage
                  src={urlFor(img.image).width(600).url()}
                  alt={img.alt || gallery.title}
                  width={600}
                  height={400}
                  className="w-full rounded-sm"
                />
                {(img.caption || img.year) && (
                  <figcaption className="mt-1.5 px-1 font-serif text-sm text-text-light">
                    {img.caption}
                    {img.caption && img.year && " — "}
                    {img.year}
                  </figcaption>
                )}
              </figure>
            ),
          )}
        </div>
      )}
    </div>
  );
}
