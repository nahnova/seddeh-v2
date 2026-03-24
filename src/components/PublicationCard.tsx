"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { OrderModal } from "./OrderModal";

interface Publication {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  isbn?: string;
  format?: string;
  imageUrl?: string;
}

export function PublicationCard({ pub }: { pub: Publication }) {
  const [showOrder, setShowOrder] = useState(false);
  const priceLabel = pub.price
    ? `€ ${pub.price.toFixed(2).replace(".", ",")}`
    : null;

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-white transition-all hover:border-gold hover:shadow-md">
        {/* Cover image */}
        {pub.imageUrl ? (
          <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
            <Image
              src={pub.imageUrl}
              alt={pub.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-[3/4] items-center justify-center bg-cream-dark">
            <ShoppingBag className="h-12 w-12 text-gold/30" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-base font-semibold leading-snug text-text sm:text-lg">
            {pub.title}
          </h3>

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
            <p className="mt-3 flex-1 font-serif text-sm leading-relaxed text-text-light line-clamp-4">
              {pub.description}
            </p>
          )}

          {/* Price + order */}
          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
            {priceLabel ? (
              <span className="font-serif text-xl font-bold text-primary-dark">
                {priceLabel}
              </span>
            ) : (
              <span className="font-serif text-sm text-text-light">Prijs op aanvraag</span>
            )}
            <button
              onClick={() => setShowOrder(true)}
              className="flex items-center gap-2 rounded-sm bg-gold px-4 py-2 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light"
            >
              <ShoppingBag size={14} />
              Bestellen
            </button>
          </div>
        </div>
      </article>

      {showOrder && (
        <OrderModal
          publicatie={pub.title}
          prijs={priceLabel || "Op aanvraag"}
          onClose={() => setShowOrder(false)}
        />
      )}
    </>
  );
}
