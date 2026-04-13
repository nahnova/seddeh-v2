"use client";

import { BookOpen, ChevronRight, Library, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface LibraryItem {
  _id: string;
  bookNumber?: string;
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
  archeologie: "Archeologie",
  archieven: "Archieven",
  dialecten: "Dialecten",
  "eygelshoven-gemeente": "Eygelshoven/Kerkrade Gemeente",
  "eygelshoven-historie": "Eygelshoven Historie",
  "eygelshoven-parochies": "Eygelshoven Parochies",
  "eygelshoven-verenigingen": "Eygelshoven Verenigingen",
  godsdienst: "Godsdienst",
  genealogie: "Genealogie",
  hopel: "Hopel",
  "limburg-historie": "Limburg Historie",
  "mijnbouw-algemeen": "Mijnbouw Algemeen",
  "mijnbouw-laura-vereeniging": "Mijnbouw Laura & Vereeniging",
  oorlog: "Oorlog",
  onderwijs: "Onderwijs",
  paleografie: "Paleografie",
  "regio-historie": "Regio Historie",
  diverse: "Diverse onderwerpen",
};

const ITEMS_PER_PAGE = 50;

export function BibliotheekCatalogus({ items }: { items: LibraryItem[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [requestItem, setRequestItem] = useState<LibraryItem | null>(null);
  const [page, setPage] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of items) {
      if (item.category) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    }
    return counts;
  }, [items]);

  const categories = useMemo(
    () =>
      Object.keys(categoryCounts).sort((a, b) =>
        (categoryLabels[a] || a).localeCompare(categoryLabels[b] || b),
      ),
    [categoryCounts],
  );

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        !activeCategory || item.category === activeCategory;
      if (!query) return matchesCategory;
      const q = query.toLowerCase();
      const matchesQuery =
        item.title.toLowerCase().includes(q) ||
        item.author?.toLowerCase().includes(q) ||
        item.bookNumber?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.isbn?.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, activeCategory, query]);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [activeCategory, query]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  function goToPage(p: number) {
    setPage(p);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectCategory(cat: string | null) {
    setActiveCategory(cat);
    setMobileSidebarOpen(false);
  }

  return (
    <>
      <div className="lg:flex lg:gap-8" ref={listRef}>
        {/* ── Sidebar ──────────────────────────────────── */}
        {/* Mobile: toggle button */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="mb-4 flex w-full items-center justify-between rounded-sm border border-border bg-white px-4 py-3 font-serif text-sm text-text transition-colors hover:border-gold lg:hidden"
        >
          <span className="flex items-center gap-2">
            <Library size={16} className="text-gold" />
            {activeCategory
              ? categoryLabels[activeCategory] || activeCategory
              : `Alle rubrieken (${items.length})`}
          </span>
          <ChevronRight
            size={16}
            className={`text-text-light transition-transform ${mobileSidebarOpen ? "rotate-90" : ""}`}
          />
        </button>

        {/* Sidebar content */}
        <aside
          className={`${mobileSidebarOpen ? "block" : "hidden"} mb-6 lg:sticky lg:top-24 lg:block lg:mb-0 lg:h-fit lg:w-64 lg:flex-shrink-0`}
        >
          <nav className="rounded-sm border border-border bg-white">
            {/* Sidebar header */}
            <div className="border-b border-border px-4 py-3">
              <h2 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                Rubrieken
              </h2>
            </div>

            {/* "All" option */}
            <button
              onClick={() => selectCategory(null)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left font-serif text-sm transition-colors ${
                !activeCategory
                  ? "bg-cream-dark font-semibold text-primary-dark"
                  : "text-text hover:bg-cream"
              }`}
            >
              <span>Alle boeken</span>
              <span
                className={`font-sans text-xs tabular-nums ${!activeCategory ? "font-bold text-gold" : "text-text-light"}`}
              >
                {items.length}
              </span>
            </button>

            {/* Category list */}
            <div className="max-h-[60vh] overflow-y-auto border-t border-border/50 lg:max-h-[calc(100vh-16rem)]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    selectCategory(activeCategory === cat ? null : cat)
                  }
                  className={`flex w-full items-center justify-between border-b border-border/30 px-4 py-2.5 text-left font-serif text-sm transition-colors last:border-b-0 ${
                    activeCategory === cat
                      ? "bg-cream-dark font-semibold text-primary-dark"
                      : "text-text hover:bg-cream"
                  }`}
                >
                  <span className="mr-2 leading-snug">
                    {categoryLabels[cat] || cat}
                  </span>
                  <span
                    className={`flex-shrink-0 font-sans text-xs tabular-nums ${activeCategory === cat ? "font-bold text-gold" : "text-text-light"}`}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* ── Main content ─────────────────────────────── */}
        <div className="min-w-0 flex-1">
          {/* Search bar */}
          <div className="relative mb-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek op titel, auteur of boeknummer..."
              className="w-full rounded-sm border border-border bg-white py-3 pl-12 pr-10 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-light transition-colors hover:text-text"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Results header */}
          <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
            <p className="font-serif text-sm text-text-light">
              <span className="font-semibold text-text">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "boek" : "boeken"}
              {activeCategory &&
                ` in ${categoryLabels[activeCategory] || activeCategory}`}
              {query && ` voor "${query}"`}
            </p>
            {totalPages > 1 && (
              <p className="font-sans text-xs text-text-light">
                Pagina {page + 1} van {totalPages}
              </p>
            )}
          </div>

          {/* Item list */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Search size={32} className="mb-4 text-border" />
              <p className="font-serif text-text-light">
                Geen boeken gevonden.
              </p>
              <p className="mt-1 font-serif text-sm text-text-light/70">
                Probeer een andere zoekterm of rubriek.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/60 rounded-sm border border-border bg-white">
              {/* Table header (desktop) */}
              <div className="hidden items-center gap-4 bg-cream-dark/50 px-4 py-2 sm:flex">
                <span className="w-20 flex-shrink-0 font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                  Nr.
                </span>
                <span className="min-w-0 flex-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                  Titel &amp; Auteur
                </span>
                <span className="w-24 flex-shrink-0 text-right font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                  Inzage
                </span>
              </div>

              {pageItems.map((item) => (
                <CatalogRow
                  key={item._id}
                  item={item}
                  onRequest={() => setRequestItem(item)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Paginatie"
              className="mt-6 flex items-center justify-center gap-1"
            >
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="rounded-sm border border-border px-3 py-2 font-serif text-sm text-text transition-colors hover:border-gold hover:bg-cream disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-transparent"
              >
                Vorige
              </button>

              {paginationRange(page, totalPages).map((p, i) =>
                p === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-1 font-serif text-sm text-text-light"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p as number)}
                    className={`min-w-[2.25rem] rounded-sm border px-2 py-2 font-serif text-sm transition-colors ${
                      page === p
                        ? "border-gold bg-gold font-semibold text-primary-dark"
                        : "border-border text-text hover:border-gold hover:bg-cream"
                    }`}
                  >
                    {(p as number) + 1}
                  </button>
                ),
              )}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages - 1}
                className="rounded-sm border border-border px-3 py-2 font-serif text-sm text-text transition-colors hover:border-gold hover:bg-cream disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-transparent"
              >
                Volgende
              </button>
            </nav>
          )}
        </div>
      </div>

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

/* ── Catalog row ───────────────────────────────── */

function CatalogRow({
  item,
  onRequest,
}: {
  item: LibraryItem;
  onRequest: () => void;
}) {
  return (
    <div className="group flex items-start gap-4 px-4 py-3 transition-colors hover:bg-cream/60 sm:items-center">
      {/* Book number */}
      <span className="w-20 flex-shrink-0 font-sans text-xs font-bold tabular-nums text-gold">
        {item.bookNumber || "—"}
      </span>

      {/* Title + Author */}
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-sm font-medium leading-snug text-text sm:text-[0.9375rem]">
          {item.title}
        </h3>
        {item.author && item.author !== "NN" && (
          <p className="mt-0.5 font-serif text-xs text-text-light">
            {item.author}
          </p>
        )}
      </div>

      {/* Inzage button */}
      <button
        onClick={onRequest}
        className="flex-shrink-0 rounded-sm border border-transparent px-3 py-1.5 font-serif text-xs font-medium text-gold opacity-0 transition-all hover:border-gold hover:bg-gold hover:text-primary-dark group-hover:opacity-100 sm:text-sm"
        aria-label={`Inzage aanvragen voor ${item.title}`}
      >
        <span className="hidden sm:inline">Inzage</span>
        <BookOpen size={14} className="sm:hidden" />
      </button>
    </div>
  );
}

/* ── Pagination helper ─────────────────────────── */

function paginationRange(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);

  const pages: (number | "...")[] = [];

  // Always show first page
  pages.push(0);

  if (current > 2) pages.push("...");

  // Pages around current
  for (
    let i = Math.max(1, current - 1);
    i <= Math.min(total - 2, current + 1);
    i++
  ) {
    pages.push(i);
  }

  if (current < total - 3) pages.push("...");

  // Always show last page
  pages.push(total - 1);

  return pages;
}

/* ── Inzage modal (unchanged) ──────────────────── */

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
              <div className="mb-6 rounded-sm border border-border bg-cream p-4">
                <p className="font-serif text-sm font-semibold text-text">
                  {item.bookNumber && (
                    <span className="mr-2 font-sans text-xs font-bold text-gold">
                      {item.bookNumber}
                    </span>
                  )}
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
                  {status === "loading" ? "Verzenden..." : "Inzage aanvragen"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
