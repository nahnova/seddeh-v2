import Link from "next/link";

/**
 * Consistent page heading with gold ornamental rule.
 * Used across all content pages for visual uniformity.
 */
export function PageHeading({
  title,
  backHref,
  backLabel,
  description,
}: {
  title: string;
  backHref?: string;
  backLabel?: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      {backHref && backLabel && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 font-serif text-sm text-primary transition-colors hover:text-gold"
        >
          <span aria-hidden="true">&larr;</span> {backLabel}
        </Link>
      )}
      <h1
        className={`font-serif text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl ${backHref ? "mt-3" : ""}`}
      >
        {title}
      </h1>
      {/* Gold ornamental rule — matches homepage SectionHeading */}
      <div className="mt-3 flex items-center gap-3">
        <div className="h-0.5 w-12 bg-gold" />
        <div className="h-0.5 w-3 bg-gold/40" />
      </div>
      {description && (
        <p className="mt-4 max-w-3xl font-serif text-lg leading-relaxed text-text-light">
          {description}
        </p>
      )}
    </div>
  );
}
