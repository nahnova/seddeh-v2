"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchItem {
  title: string;
  href: string;
  type: string;
}

/** Simple fuzzy match — checks if all query chars appear in order. */
function fuzzyMatch(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  // Exact substring match gets highest score
  if (t.includes(q)) return 2;

  // Fuzzy: every char in query must appear in order
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length ? 1 : 0;
}

export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch search index on first open
  useEffect(() => {
    if (!open || items.length > 0) return;
    fetch("/api/search")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});
  }, [open, items.length]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Filter results
  const results = query.length > 0
    ? items
        .map((item) => ({ ...item, score: fuzzyMatch(query, item.title) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
    : [];

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.children[activeIndex] as HTMLElement;
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      navigate(results[activeIndex].href);
    }
  }

  const typeLabels: Record<string, string> = {
    pagina: "Pagina",
    nieuws: "Nieuws",
    werkgroep: "Werkgroep",
    galerij: "Galerij",
    monument: "Monument",
    agenda: "Agenda",
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 border-b-2 border-transparent px-2 py-3.5 text-text-light transition-colors hover:text-primary-dark lg:px-3"
        aria-label="Zoeken (⌘K)"
        title="Zoeken (⌘K)"
      >
        <Search size={16} aria-hidden="true" />
        <span className="hidden font-serif text-sm lg:inline">Zoeken</span>
      </button>

      {/* Backdrop + Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 pt-[15vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Zoeken"
        >
          <div className="w-full max-w-lg overflow-hidden border border-border bg-white shadow-xl">
            {/* Gold top accent */}
            <div className="h-0.5 bg-gold" />

            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search size={18} className="shrink-0 text-text-light" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Zoek een pagina..."
                className="w-full bg-transparent font-serif text-text outline-none placeholder:text-text-light/50"
                aria-autocomplete="list"
                aria-controls="search-results"
                role="combobox"
                aria-expanded={results.length > 0}
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 text-text-light transition-colors hover:text-text"
                aria-label="Sluiten"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              id="search-results"
              role="listbox"
              className="max-h-72 overflow-y-auto"
            >
              {query.length > 0 && results.length === 0 && (
                <p className="px-4 py-6 text-center font-serif text-sm text-text-light">
                  Geen resultaten voor &ldquo;{query}&rdquo;
                </p>
              )}
              {results.map((item, index) => (
                <button
                  key={`${item.href}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => navigate(item.href)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors ${
                    index === activeIndex
                      ? "bg-cream-dark"
                      : "hover:bg-cream-dark/50"
                  }`}
                >
                  <span className="font-serif text-sm text-text">
                    {item.title}
                  </span>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                    {typeLabels[item.type] || item.type}
                  </span>
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <div className="border-t border-border px-4 py-2">
              <p className="font-sans text-[10px] text-text-light">
                <kbd className="rounded border border-border bg-cream-dark px-1 py-0.5 font-mono text-[10px]">↑↓</kbd>
                {" "}navigeren{" "}
                <kbd className="rounded border border-border bg-cream-dark px-1 py-0.5 font-mono text-[10px]">↵</kbd>
                {" "}openen{" "}
                <kbd className="rounded border border-border bg-cream-dark px-1 py-0.5 font-mono text-[10px]">esc</kbd>
                {" "}sluiten
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
