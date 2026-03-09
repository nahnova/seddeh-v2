import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { allMembersQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/image";
import { PageHeading } from "@/components/PageHeading";
import { UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Leden",
  description:
    "De leden van Stichting Eygelshoven door de Eeuwen Heen — samen zetten wij ons in voor het Eygelshovense erfgoed.",
};

export const revalidate = 60;

export default async function LedenPage() {
  const members = await client.fetch(allMembersQuery).catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeading
        title="Onze Leden"
        description="De mensen achter de stichting — samen zetten wij ons in voor het behoud en de ontsluiting van het Eygelshovense erfgoed."
      />

      {members.length === 0 && (
        <p className="font-serif text-text-light">
          Informatie over onze leden volgt binnenkort.
        </p>
      )}

      {members.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map(
            (member: {
              _id: string;
              name: string;
              role?: string;
              bio?: string;
              photo?: { asset: { _ref: string } };
            }) => (
              <article
                key={member._id}
                className="group rounded-sm border border-border bg-white transition-all hover:border-gold hover:shadow-sm"
              >
                {/* Photo or placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                  {member.photo ? (
                    <Image
                      src={urlFor(member.photo)
                        .width(480)
                        .height(360)
                        .url()}
                      alt={member.name}
                      width={480}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <UserRound
                        className="h-20 w-20 text-border"
                        strokeWidth={1}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  {/* Gold accent line at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-serif text-lg font-semibold text-text">
                    {member.name}
                  </h2>
                  {member.role && (
                    <p className="mt-0.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-gold">
                      {member.role}
                    </p>
                  )}
                  {member.bio && (
                    <p className="mt-2 font-serif text-sm leading-relaxed text-text-light">
                      {member.bio}
                    </p>
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
