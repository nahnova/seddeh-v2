import type { Metadata } from "next";
import { LidWordenForm } from "@/components/LidWordenForm";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Lid Worden",
  description:
    "Word lid van Stichting Eygelshoven door de Eeuwen Heen en draag bij aan het behoud van Eygelshovens erfgoed.",
};

export const revalidate = 60;

const benefits = [
  "Toegang tot ons uitgebreide archief",
  "Deelname aan excursies en activiteiten",
  "Ontvang onze periodieke nieuwsbrief",
  "Draag bij aan het behoud van Eygelshovens erfgoed",
  "Word onderdeel van een actieve gemeenschap",
];

export default function LidWordenPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeading
        title="Lid Worden"
        description="Word lid van onze stichting en help mee het rijke erfgoed van Eygelshoven te bewaren voor toekomstige generaties."
      />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left column — benefits */}
        <div>
          <h2 className="font-serif text-xl font-semibold text-primary-dark">
            Waarom lid worden?
          </h2>
          <ul className="mt-6 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span
                  className="mt-1 text-gold"
                  aria-hidden="true"
                >
                  &#9670;
                </span>
                <span className="font-serif text-text">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-sm border border-gold/30 bg-cream-dark p-5">
            <p className="font-serif text-sm font-semibold text-primary-dark">
              Contributie
            </p>
            <p className="mt-1 font-serif text-text">
              Het lidmaatschap bedraagt &euro;15,- per jaar.
            </p>
          </div>
        </div>

        {/* Right column — form */}
        <div className="rounded-sm border border-border bg-white p-6 shadow-sm lg:p-8">
          <h2 className="mb-6 font-serif text-xl font-semibold text-primary-dark">
            Aanmeldformulier
          </h2>
          <LidWordenForm />
        </div>
      </div>
    </div>
  );
}
