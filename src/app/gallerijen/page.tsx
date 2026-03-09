import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { allGalleriesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Gallerijen",
};

export const revalidate = 60;

export default async function GallerijenPage() {
  const galleries = await client.fetch(allGalleriesQuery).catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-primary-dark sm:text-4xl">
        Gallerijen
      </h1>
      <div className="mt-2 h-1 w-16 bg-gold" />

      {galleries.length === 0 && (
        <p className="mt-8 font-serif text-text-light">
          Er zijn momenteel geen galerijen beschikbaar.
        </p>
      )}

      <section aria-label="Fotogalerijen" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              className="group overflow-hidden rounded-lg border border-border bg-white transition-all hover:border-gold hover:shadow-md"
            >
              {gallery.coverImage && (
                <Image
                  src={urlFor(gallery.coverImage).width(600).height(400).url()}
                  alt={gallery.title}
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform group-hover:scale-105"
                />
              )}
              {!gallery.coverImage && (
                <div className="flex h-48 items-center justify-center bg-cream-dark">
                  <span className="font-serif text-text-light">
                    Geen afbeelding
                  </span>
                </div>
              )}
              <div className="p-4">
                <h2 className="font-serif text-lg font-semibold text-text group-hover:text-primary">
                  {gallery.title}
                </h2>
                {gallery.description && (
                  <p className="mt-1 font-serif text-sm text-text-light line-clamp-2">
                    {gallery.description}
                  </p>
                )}
                <p className="mt-2 font-sans text-xs text-text-light">
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
