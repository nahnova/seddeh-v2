"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
export interface Publication {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  price?: number;
  isbn?: string;
  format?: string;
  imageUrl?: string;
}

interface CartItem {
  pub: Publication;
  qty: number;
}

function formatPrice(price: number) {
  return `€ ${price.toFixed(2).replace(".", ",")}`;
}

/* ------------------------------------------------------------------ */
/*  Main shop wrapper                                                 */
/* ------------------------------------------------------------------ */
export function PublicationShop({ publications }: { publications: Publication[] }) {
  const [cart, setCart] = useState<Map<string, CartItem>>(new Map());
  const [showOrder, setShowOrder] = useState(false);

  function addToCart(pub: Publication) {
    setCart((prev) => {
      const next = new Map(prev);
      const existing = next.get(pub._id);
      next.set(pub._id, { pub, qty: existing ? existing.qty + 1 : 1 });
      return next;
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) => {
      const next = new Map(prev);
      const item = next.get(id);
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        next.delete(id);
      } else {
        next.set(id, { ...item, qty: newQty });
      }
      return next;
    });
  }

  const cartItems = Array.from(cart.values());
  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, i) => sum + (i.pub.price || 0) * i.qty,
    0,
  );

  return (
    <>
      {/* Product grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publications.map((pub) => {
          const inCart = cart.get(pub._id);
          return (
            <ProductCard
              key={pub._id}
              pub={pub}
              inCart={inCart}
              onAdd={() => addToCart(pub)}
              onUpdateQty={(delta) => updateQty(pub._id, delta)}
            />
          );
        })}
      </div>

      {/* Floating cart bar */}
      {totalItems > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-primary-dark shadow-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-serif text-sm font-bold text-primary-dark">
                {totalItems}
              </div>
              <div>
                <p className="font-serif text-sm font-semibold">
                  {totalItems} {totalItems === 1 ? "publicatie" : "publicaties"}
                </p>
                <p className="font-serif text-xs text-white/60">
                  Totaal: {formatPrice(totalPrice)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowOrder(true)}
              className="flex items-center gap-2 rounded-sm bg-gold px-6 py-2.5 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light"
            >
              <ShoppingBag size={16} />
              Bestelling plaatsen
            </button>
          </div>
        </div>
      )}

      {/* Bottom padding when cart bar is visible */}
      {totalItems > 0 && <div className="h-20" />}

      {/* Order modal */}
      {showOrder && (
        <OrderModal
          items={cartItems}
          totalPrice={totalPrice}
          onClose={() => setShowOrder(false)}
          onSuccess={() => setCart(new Map())}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Product card                                                      */
/* ------------------------------------------------------------------ */
function ProductCard({
  pub,
  inCart,
  onAdd,
  onUpdateQty,
}: {
  pub: Publication;
  inCart?: CartItem;
  onAdd: () => void;
  onUpdateQty: (delta: number) => void;
}) {
  const priceLabel = pub.price ? formatPrice(pub.price) : null;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-sm border bg-white transition-all hover:shadow-md ${
        inCart ? "border-gold" : "border-border hover:border-gold"
      }`}
    >
      {/* Cover image */}
      {pub.imageUrl ? (
        <Link href={pub.slug ? `/de-stichting/publicaties/${pub.slug}` : "#"} className="relative aspect-[3/4] overflow-hidden bg-cream-dark block">
          <Image
            src={pub.imageUrl}
            alt={pub.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {inCart && (
            <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold shadow">
              <Check size={14} className="text-primary-dark" strokeWidth={3} />
            </div>
          )}
        </Link>
      ) : (
        <Link href={pub.slug ? `/de-stichting/publicaties/${pub.slug}` : "#"} className="flex aspect-[3/4] items-center justify-center bg-cream-dark">
          <ShoppingBag className="h-12 w-12 text-gold/30" />
        </Link>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={pub.slug ? `/de-stichting/publicaties/${pub.slug}` : "#"} className="font-serif text-base font-semibold leading-snug text-text hover:text-primary sm:text-lg">
          {pub.title}
        </Link>

        {/* Metadata pills */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {pub.format && (
            <span className="rounded-sm bg-cream-dark px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider text-text-light">
              {pub.format}
            </span>
          )}
          {pub.isbn && (
            <span className="rounded-sm bg-cream-dark px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider text-text-light">
              ISBN {pub.isbn}
            </span>
          )}
        </div>

        {pub.description && (
          <p className="mt-3 font-serif text-sm leading-relaxed text-text-light line-clamp-3">
            {pub.description}
          </p>
        )}

        {pub.slug && (
          <Link
            href={`/de-stichting/publicaties/${pub.slug}`}
            className="mt-2 inline-block font-serif text-sm font-semibold text-primary hover:text-primary-dark"
          >
            Lees meer &rarr;
          </Link>
        )}

        <div className="flex-1" />

        {/* Price + add/qty */}
        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
          {priceLabel ? (
            <span className="font-serif text-xl font-bold text-primary-dark">
              {priceLabel}
            </span>
          ) : (
            <span className="font-serif text-sm text-text-light">Prijs op aanvraag</span>
          )}

          {inCart ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onUpdateQty(-1)}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-text-light transition-colors hover:border-gold hover:text-primary-dark"
                aria-label="Eén minder"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-serif text-sm font-semibold text-primary-dark">
                {inCart.qty}
              </span>
              <button
                onClick={() => onUpdateQty(1)}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-text-light transition-colors hover:border-gold hover:text-primary-dark"
                aria-label="Eén meer"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 rounded-sm bg-gold px-4 py-2 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light"
            >
              <ShoppingBag size={14} />
              Toevoegen
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Order modal (multi-item)                                          */
/* ------------------------------------------------------------------ */
function OrderModal({
  items,
  totalPrice,
  onClose,
  onSuccess,
}: {
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

  const orderSummary = items
    .map((i) => `${i.qty}× ${i.pub.title} (${i.pub.price ? formatPrice(i.pub.price) : "Op aanvraag"})`)
    .join("\n");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      naam: formData.get("naam") as string,
      email: formData.get("email") as string,
      telefoon: formData.get("telefoon") as string,
      adres: formData.get("adres") as string,
      publicatie: orderSummary,
      prijs: formatPrice(totalPrice),
      website: formData.get("website") as string,
    };

    try {
      const response = await fetch("/api/bestelling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Er is iets misgegaan.");
      }

      setStatus("success");
      onSuccess();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Er is iets misgegaan.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Bestelling plaatsen" ref={modalRef}>
      <div className="absolute inset-0 bg-primary-dark/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm border border-border bg-white shadow-xl">
        <div className="h-1 bg-gold" />

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between">
            <h3 className="font-serif text-xl font-bold text-primary-dark">Bestelling plaatsen</h3>
            <button onClick={onClose} className="p-1 text-text-light transition-colors hover:text-text">
              <X size={20} />
            </button>
          </div>

          {status === "success" ? (
            <div role="status" aria-live="polite" className="rounded-sm border border-green-200 bg-green-50 p-6">
              <h4 className="font-serif text-lg font-semibold text-green-800">Bestelling ontvangen</h4>
              <p className="mt-2 font-serif text-sm text-green-700">
                Bedankt voor uw bestelling! Wij nemen spoedig contact met u op over de betaling en levering.
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
              {/* Order summary */}
              <div className="mb-6 rounded-sm border border-border bg-cream p-4">
                <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-text-light">
                  Uw bestelling
                </h4>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.pub._id} className="flex items-center justify-between gap-4">
                      <span className="font-serif text-sm text-text">
                        {item.qty}× {item.pub.title}
                      </span>
                      <span className="shrink-0 font-serif text-sm font-semibold text-primary-dark">
                        {item.pub.price ? formatPrice(item.pub.price * item.qty) : "Op aanvraag"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                  <span className="font-serif text-sm font-semibold text-text">Totaal</span>
                  <span className="font-serif text-lg font-bold text-primary-dark">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="order-naam" className="block font-sans text-sm font-medium text-text">
                      Naam *
                    </label>
                    <input
                      type="text" id="order-naam" name="naam" required
                      className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="order-email" className="block font-sans text-sm font-medium text-text">
                      E-mail *
                    </label>
                    <input
                      type="email" id="order-email" name="email" required
                      className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="order-telefoon" className="block font-sans text-sm font-medium text-text">
                      Telefoon
                    </label>
                    <input
                      type="tel" id="order-telefoon" name="telefoon"
                      className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="order-adres" className="block font-sans text-sm font-medium text-text">
                      Adres (voor verzending)
                    </label>
                    <input
                      type="text" id="order-adres" name="adres"
                      placeholder="Straat, huisnr, postcode, plaats"
                      className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                {/* Honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="order-website">Website</label>
                  <input type="text" id="order-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                {status === "error" && (
                  <div role="alert" className="rounded-sm border border-red-200 bg-red-50 p-3">
                    <p className="font-serif text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <p className="font-serif text-xs text-text-light">
                  Alle prijzen zijn excl. eventuele verzendkosten. Na uw bestelling nemen wij contact op over betaling en levering.
                </p>

                <button
                  type="submit" disabled={status === "loading"}
                  className="w-full rounded-sm bg-gold px-6 py-3 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light disabled:opacity-50"
                >
                  {status === "loading" ? "Verzenden..." : `Bestelling plaatsen — ${formatPrice(totalPrice)}`}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
