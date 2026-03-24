import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-sans text-sm font-semibold uppercase tracking-wider text-gold">
        404
      </p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-primary-dark sm:text-4xl">
        Pagina niet gevonden
      </h1>
      <p className="mt-4 font-serif text-text-light">
        De pagina die u zoekt bestaat niet of is verplaatst.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-sm border-2 border-gold bg-gold px-6 py-2.5 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light"
        >
          Naar de homepagina
        </Link>
        <Link
          href="/contact"
          className="rounded-sm border-2 border-border px-6 py-2.5 font-serif text-sm font-semibold text-text transition-colors hover:border-gold"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
