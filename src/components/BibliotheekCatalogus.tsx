"use client";

import Image from "next/image";
import { BookOpen, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface LibraryItem {
  _id: string;
  title: string;
  author?: string;
  year?: string;
  category?: string;
  description?: string;
  isbn?: string;
  format?: string;
  imageUrl?: string;
}

const categoryLabels: Record<string, string> = {
  heemkunde: "Heemkunde",
  genealogie: "Genealogie",
  mijngeschiedenis: "Mijngeschiedenis",
  dialect: "Dialect",
  religie: "Religie",
  overig: "Overig",
};

export function BibliotheekCatalogus({ items }: { items: LibraryItem[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [requestItem, setRequestItem] = useState<LibraryItem | null>(null);

  const categories = Array.from(
    new Set(items.map((i) => i.category).filter(Boolean)),
  ) as string[];

  const filtered = items.filter((item) => {
    const matchesCategory = !activeCategory || item.category === activeCategory;
    if (!query) return matchesCategory;
    const q = query.toLowerCase();
    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.author?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.isbn?.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      {/* Search + filter bar */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek op titel, auteur of ISBN..."
            className="w-full rounded-sm border border-border bg-white py-2.5 pl-10 pr-3 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-sm px-3 py-1.5 font-sans text-xs font-medium uppercase tracking-wider transition-colors ${
                !activeCategory
                  ? "bg-gold text-primary-dark"
                  : "bg-cream-dark text-text-light hover:bg-gold/20"
              }`}
            >
              Alles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`rounded-sm px-3 py-1.5 font-sans text-xs font-medium uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? "bg-gold text-primary-dark"
                    : "bg-cream-dark text-text-light hover:bg-gold/20"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="mb-4 font-serif text-sm text-text-light">
        {filtered.length} {filtered.length === 1 ? "boek" : "boeken"} gevonden
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center font-serif text-text-light">
          Geen boeken gevonden voor uw zoekopdracht.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <LibraryCard
              key={item._id}
              item={item}
              onRequest={() => setRequestItem(item)}
            />
          ))}
        </div>
      )}

      {/* Inzage modal */}
      {requestItem && (
        <InzageModal
          item={requestItem}
          onClose={() => setRequestItem(null)}
        />
      )}
    </>
  );
}

function LibraryCard({
  item,
  onRequest,
}: {
  item: LibraryItem;
  onRequest: () => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-white transition-all hover:border-gold hover:shadow-md">
      {item.imageUrl ? (
        <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/4] items-center justify-center bg-cream-dark">
          <BookOpen className="h-12 w-12 text-gold/30" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-base font-semibold leading-snug text-text sm:text-lg">
          {item.title}
        </h3>

        {item.author && (
          <p className="mt-1 font-serif text-sm text-text-light">
            {item.author}
          </p>
        )}

        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.category && (
            <span className="rounded-sm bg-cream-dark px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider text-text-light">
              {categoryLabels[item.category] || item.category}
            </span>
          )}
          {item.year && (
            <span className="rounded-sm bg-cream-dark px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider text-text-light">
              {item.year}
            </span>
          )}
          {item.format && (
            <span className="rounded-sm bg-cream-dark px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider text-text-light">
              {item.format}
            </span>
          )}
          {item.isbn && (
            <span className="rounded-sm bg-cream-dark px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider text-text-light">
              ISBN {item.isbn}
            </span>
          )}
        </div>

        {item.description && (
          <p className="mt-3 flex-1 font-serif text-sm leading-relaxed text-text-light line-clamp-3">
            {item.description}
          </p>
        )}

        <div className="mt-4 border-t border-border/60 pt-4">
          <button
            onClick={onRequest}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-4 py-2 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light"
          >
            <BookOpen size={14} />
            Inzage aanvragen
          </button>
        </div>
      </div>
    </article>
  );
}

function InzageModal({
  item,
  onClose,
}: {
  item: LibraryItem;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    modal.addEventListener("keydown", handleKeyDown);
    return () => modal.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("loading");
      setErrorMessage("");

      const formData = new FormData(e.currentTarget);
      const data = {
        naam: formData.get("naam") as string,
        email: formData.get("email") as string,
        boek: item.title + (item.author ? ` — ${item.author}` : ""),
        bericht: formData.get("bericht") as string,
        website: formData.get("website") as string,
      };

      try {
        const response = await fetch("/api/inzage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Er is iets misgegaan.");
        }

        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Er is iets misgegaan.",
        );
      }
    },
    [item],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Inzage aanvragen"
      ref={modalRef}
    >
      <div
        className="absolute inset-0 bg-primary-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm border border-border bg-white shadow-xl">
        <div className="h-1 bg-gold" />

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between">
            <h3 className="font-serif text-xl font-bold text-primary-dark">
              Inzage aanvragen
            </h3>
            <button
              onClick={onClose}
              className="p-1 text-text-light transition-colors hover:text-text"
            >
              <X size={20} />
            </button>
          </div>

          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-sm border border-green-200 bg-green-50 p-6"
            >
              <h4 className="font-serif text-lg font-semibold text-green-800">
                Aanvraag verzonden
              </h4>
              <p className="mt-2 font-serif text-sm text-green-700">
                Bedankt voor uw aanvraag! Wij nemen spoedig contact met u op om
                een afspraak in te plannen voor inzage.
              </p>
              <button
                onClick={onClose}
                className="mt-4 rounded-sm bg-green-700 px-5 py-2 font-serif text-sm font-semibold text-white transition-colors hover:bg-green-800"
              >
                Sluiten
              </button>
            </div>
          ) : (
            <>
              {/* Book info */}
              <div className="mb-6 rounded-sm border border-border bg-cream p-4">
                <p className="font-serif text-sm font-semibold text-text">
                  {item.title}
                </p>
                {item.author && (
                  <p className="mt-0.5 font-serif text-sm text-text-light">
                    {item.author}
                    {item.year ? ` (${item.year})` : ""}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="inzage-naam"
                      className="block font-sans text-sm font-medium text-text"
                    >
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="inzage-naam"
                      name="naam"
                      required
                      className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inzage-email"
                      className="block font-sans text-sm font-medium text-text"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="inzage-email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inzage-bericht"
                    className="block font-sans text-sm font-medium text-text"
                  >
                    Toelichting
                  </label>
                  <textarea
                    id="inzage-bericht"
                    name="bericht"
                    rows={3}
                    placeholder="Optioneel: waar bent u naar op zoek in dit boek?"
                    className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                {/* Honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="inzage-website">Website</label>
                  <input
                    type="text"
                    id="inzage-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="rounded-sm border border-red-200 bg-red-50 p-3"
                  >
                    <p className="font-serif text-sm text-red-700">
                      {errorMessage}
                    </p>
                  </div>
                )}

                <p className="font-serif text-xs text-text-light">
                  Inzage is mogelijk op afspraak bij De Laethof, Putstraat 17 te
                  Eygelshoven. Wij nemen contact op om een moment af te spreken.
                </p>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-sm bg-gold px-6 py-3 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light disabled:opacity-50"
                >
                  {status === "loading"
                    ? "Verzenden..."
                    : "Inzage aanvragen"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
