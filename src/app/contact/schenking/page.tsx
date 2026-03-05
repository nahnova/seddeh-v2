import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Schenking",
};

export default function SchenkingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/contact"
        className="font-sans text-sm text-primary hover:text-primary-dark"
      >
        &larr; Terug naar contact
      </Link>

      <h1 className="mt-4 font-serif text-3xl font-bold text-primary-dark">
        Schenking
      </h1>
      <div className="mt-2 h-1 w-16 bg-gold" />

      <div className="mt-8 space-y-6">
        <p className="font-serif leading-relaxed text-text-light">
          Met uw schenking ondersteunt u het werk van Stichting Eygelshoven
          door de Eeuwen Heen. Wij zetten ons in voor het behoud en de
          ontsluiting van de geschiedenis van Eygelshoven.
        </p>

        <div className="rounded-lg border border-border bg-white p-6">
          <h2 className="font-serif text-lg font-semibold text-text">
            Bankgegevens
          </h2>
          <p className="mt-3 font-serif text-text-light">
            Neem contact met ons op voor de bankgegevens of andere manieren
            om een bijdrage te leveren.
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-block font-sans text-sm text-primary hover:text-primary-dark"
          >
            Neem contact op &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
