"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-sans text-sm font-semibold uppercase tracking-wider text-red-500">
        Fout
      </p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-primary-dark sm:text-4xl">
        Er is iets misgegaan
      </h1>
      <p className="mt-4 font-serif text-text-light">
        Er is een onverwachte fout opgetreden. Probeer het opnieuw.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-sm border-2 border-gold bg-gold px-6 py-2.5 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light"
      >
        Probeer opnieuw
      </button>
    </div>
  );
}
