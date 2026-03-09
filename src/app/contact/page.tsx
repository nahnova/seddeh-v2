import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeading title="Contact" />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-xl font-semibold text-text">
            Neem contact met ons op
          </h2>
          <p className="mt-3 font-serif leading-relaxed text-text-light">
            Heeft u vragen over de stichting, onze activiteiten of het
            historisch archief? Neem gerust contact met ons op.
          </p>

          <div className="mt-6 space-y-5">
            {settings?.address && (
              <div>
                <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                  Adres
                </h3>
                <p className="mt-1 whitespace-pre-line font-serif text-text">
                  {settings.address}
                </p>
              </div>
            )}
            {settings?.contactEmail && (
              <div>
                <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                  E-mail
                </h3>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="mt-1 inline-block font-serif text-primary transition-colors hover:text-gold"
                >
                  {settings.contactEmail}
                </a>
              </div>
            )}
            {settings?.contactPhone && (
              <div>
                <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                  Telefoon
                </h3>
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="mt-1 inline-block font-serif text-primary transition-colors hover:text-gold"
                >
                  {settings.contactPhone}
                </a>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link
              href="/contact/schenking"
              className="inline-block rounded-sm border-2 border-gold bg-cream-dark px-5 py-2 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold hover:text-white"
            >
              Schenking doen
            </Link>
          </div>
        </div>

        {/* Archive request CTA */}
        <div className="rounded-sm border border-gold/50 bg-cream-dark p-6">
          <h2 className="font-serif text-xl font-semibold text-primary-dark">
            Archief inzien
          </h2>
          <p className="mt-3 font-serif text-sm leading-relaxed text-text-light">
            Ons archief is niet publiek toegankelijk, maar wel op aanvraag in
            te zien. U kunt langskomen bij De Laethof om stukken te
            bekijken na het indienen van een aanvraag.
          </p>
          <Link
            href="/archief-aanvraag"
            className="mt-4 inline-block rounded-sm border-2 border-gold bg-gold px-5 py-2 font-serif text-sm font-semibold text-primary-dark transition-colors hover:border-gold-light hover:bg-gold-light"
          >
            Aanvraag indienen
          </Link>
        </div>
      </div>
    </div>
  );
}
