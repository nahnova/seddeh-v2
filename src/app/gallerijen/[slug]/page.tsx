import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { galleryBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/image";

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
  return {
    title: gallery?.title,
    description: gallery?.description,
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/gallerijen"
        className="font-sans text-sm text-primary hover:text-primary-dark"
      >
        &larr; Terug naar gallerijen
      </Link>

      <h1 className="mt-4 font-serif text-3xl font-bold text-primary-dark">
        {gallery.title}
      </h1>
      <div className="mt-2 h-1 w-16 bg-gold" />

      {gallery.description && (
        <p className="mt-4 max-w-2xl font-serif text-text-light">
          {gallery.description}
        </p>
      )}

      {gallery.images && gallery.images.length > 0 && (
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
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
                <Image
                  src={urlFor(img.image).width(600).url()}
                  alt={img.alt || gallery.title}
                  width={600}
                  height={400}
                  className="w-full rounded-lg"
                />
                {(img.caption || img.year) && (
                  <figcaption className="mt-1 px-1 font-serif text-sm text-text-light">
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
