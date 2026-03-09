import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-primary-dark sm:text-4xl">
        Contact
      </h1>
      <div className="mt-2 h-1 w-16 bg-gold" />

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-xl font-semibold text-text">
            Neem contact met ons op
          </h2>
          <p className="mt-3 font-serif leading-relaxed text-text-light">
            Heeft u vragen over de stichting, onze activiteiten of het
            historisch archief? Neem gerust contact met ons op.
          </p>

          <div className="mt-6 space-y-4">
            {settings?.address && (
              <div>
                <h2 className="font-sans text-xs font-medium uppercase tracking-wide text-text-light">
                  Adres
                </h2>
                <p className="mt-1 whitespace-pre-line font-serif text-text">
                  {settings.address}
                </p>
              </div>
            )}
            {settings?.contactEmail && (
              <div>
                <h2 className="font-sans text-xs font-medium uppercase tracking-wide text-text-light">
                  E-mail
                </h2>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="mt-1 font-serif text-primary hover:text-primary-dark"
                >
                  {settings.contactEmail}
                </a>
              </div>
            )}
            {settings?.contactPhone && (
              <div>
                <h2 className="font-sans text-xs font-medium uppercase tracking-wide text-text-light">
                  Telefoon
                </h2>
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="mt-1 font-serif text-primary hover:text-primary-dark"
                >
                  {settings.contactPhone}
                </a>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link
              href="/contact/schenking"
              className="inline-block rounded-md border border-gold bg-cream-dark px-4 py-2 font-sans text-sm font-medium text-primary-dark transition-colors hover:bg-gold hover:text-white"
            >
              Schenking doen
            </Link>
          </div>
        </div>

        {/* Archive request CTA */}
        <div className="rounded-lg border border-gold bg-cream-dark p-6">
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
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Aanvraag indienen
          </Link>
        </div>
      </div>
    </div>
  );
}
