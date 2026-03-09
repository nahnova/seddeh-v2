import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { allWerkgroepenQuery } from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import { urlFor } from "@/sanity/image";
import { PageHeading } from "@/components/PageHeading";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Werkgroepen",
};

export const revalidate = 60;

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function WerkgroepenPage() {
  const werkgroepen = await client
    .fetch(allWerkgroepenQuery)
    .catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeading
        title="Werkgroepen"
        description="Onze stichting bestaat uit gespecialiseerde werkgroepen die zich elk richten op een ander aspect van het Eygelshovense erfgoed."
      />

      {werkgroepen.length === 0 && (
        <p className="font-serif text-text-light">
          Informatie over onze werkgroepen volgt binnenkort.
        </p>
      )}

      {/* Quick navigation */}
      {werkgroepen.length > 0 && (
        <nav
          aria-label="Werkgroepen navigatie"
          className="mb-12 rounded-sm border border-border bg-white p-5"
        >
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
            Ga naar werkgroep
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {werkgroepen.map(
              (
                wg: { _id: string; name: string; members?: string[] },
                i: number,
              ) => (
                <li key={wg._id}>
                  <a
                    href={`#${slugify(wg.name)}`}
                    className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 font-serif text-sm text-text transition-colors hover:border-gold hover:text-primary-dark"
                  >
                    <span className="font-sans text-xs font-bold text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {wg.name}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}

      {/* Werkgroepen */}
      <div className="space-y-0">
        {werkgroepen.map(
          (
            wg: {
              _id: string;
              name: string;
              description?: Parameters<typeof PortableText>[0]["value"];
              image?: { asset: { _ref: string } };
              members?: string[];
            },
            index: number,
          ) => (
            <article
              key={wg._id}
              id={slugify(wg.name)}
              className="scroll-mt-24 border-b border-border py-10 first:pt-0 last:border-b-0"
            >
              <div className="md:flex md:gap-8">
                {/* Left column — number + image */}
                <div className="mb-6 flex-shrink-0 md:mb-0 md:w-64">
                  {/* Decorative number */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans text-4xl font-bold leading-none text-gold/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-gold/20" />
                  </div>

                  {wg.image && (
                    <Image
                      src={urlFor(wg.image).width(400).height(300).url()}
                      alt={wg.name}
                      width={400}
                      height={300}
                      className="mt-4 w-full rounded-sm object-cover"
                    />
                  )}

                  {/* Members */}
                  {wg.members && wg.members.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-1.5">
                        <Users
                          className="h-3.5 w-3.5 text-gold"
                          aria-hidden="true"
                        />
                        <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                          Leden
                        </h3>
                      </div>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {wg.members.map((member) => (
                          <li
                            key={member}
                            className="rounded-sm bg-cream-dark px-2.5 py-1 font-serif text-xs text-text"
                          >
                            {member}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right column — content */}
                <div className="min-w-0 flex-1">
                  <h2 className="font-serif text-2xl font-bold text-primary-dark">
                    {wg.name}
                  </h2>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="h-0.5 w-8 bg-gold" />
                    <div className="h-0.5 w-2 bg-gold/40" />
                  </div>

                  {wg.description && (
                    <div className="portable-text mt-4 max-w-2xl">
                      <PortableText value={wg.description} />
                    </div>
                  )}
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </div>
  );
}
