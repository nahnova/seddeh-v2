import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { allWerkgroepenQuery } from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import { urlFor } from "@/sanity/image";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Werkgroepen",
};

export const revalidate = 60;

export default async function WerkgroepenPage() {
  const werkgroepen = await client
    .fetch(allWerkgroepenQuery)
    .catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeading title="Werkgroepen" />

      {werkgroepen.length === 0 && (
        <p className="font-serif text-text-light">
          Informatie over onze werkgroepen volgt binnenkort.
        </p>
      )}

      <div className="space-y-5">
        {werkgroepen.map(
          (wg: {
            _id: string;
            name: string;
            description?: Parameters<typeof PortableText>[0]["value"];
            image?: { asset: { _ref: string } };
            members?: string[];
          }) => (
            <article
              key={wg._id}
              className="overflow-hidden rounded-sm border border-border bg-white transition-colors hover:border-gold md:flex"
            >
              {wg.image && (
                <Image
                  src={urlFor(wg.image).width(400).height(300).url()}
                  alt={wg.name}
                  width={400}
                  height={300}
                  className="w-full object-cover md:w-80"
                />
              )}
              <div className="p-6">
                <h2 className="font-serif text-xl font-semibold text-primary-dark">
                  {wg.name}
                </h2>
                {wg.description && (
                  <div className="mt-3">
                    <PortableText value={wg.description} />
                  </div>
                )}
                {wg.members && wg.members.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                      Leden
                    </h3>
                    <p className="mt-1 font-serif text-sm text-text">
                      {wg.members.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </article>
          ),
        )}
      </div>
    </div>
  );
}
