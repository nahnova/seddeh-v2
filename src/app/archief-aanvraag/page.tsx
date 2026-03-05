import type { Metadata } from "next";
import { ArchiefAanvraagForm } from "@/components/ArchiefAanvraagForm";

export const metadata: Metadata = {
  title: "Archief Aanvraag",
  description:
    "Vraag toegang aan tot het historisch archief van Stichting Eygelshoven door de Eeuwen Heen.",
};

export default function ArchiefAanvraagPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-primary-dark">
        Archief Aanvraag
      </h1>
      <div className="mt-2 h-1 w-16 bg-gold" />

      <div className="mt-6 rounded-lg border border-gold bg-cream-dark p-6">
        <h2 className="font-serif text-lg font-semibold text-primary-dark">
          Hoe werkt het?
        </h2>
        <ol className="mt-3 list-inside list-decimal space-y-2 font-serif text-sm text-text-light">
          <li>Vul onderstaand formulier in met uw onderzoeksvraag.</li>
          <li>
            Wij beoordelen uw aanvraag en nemen contact met u op.
          </li>
          <li>
            Na goedkeuring kunt u langskomen bij De Laethof om de stukken in
            te zien.
          </li>
        </ol>
        <p className="mt-3 font-serif text-sm text-text-light">
          Ons archief is niet publiek toegankelijk, maar wel beschikbaar op
          aanvraag. Wij helpen u graag met uw onderzoek.
        </p>
      </div>

      <div className="mt-8">
        <ArchiefAanvraagForm />
      </div>
    </div>
  );
}
