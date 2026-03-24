"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface OrderModalProps {
  publicatie: string;
  prijs: string;
  onClose: () => void;
}

export function OrderModal({ publicatie, prijs, onClose }: OrderModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      publicatie,
      prijs,
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
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Er is iets misgegaan.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary-dark/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-sm border border-border bg-white shadow-xl">
        {/* Gold top accent */}
        <div className="h-1 bg-gold" />

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-primary-dark">Bestelling plaatsen</h3>
              <p className="mt-1 font-serif text-sm text-text-light">
                {publicatie} &mdash; {prijs}
              </p>
            </div>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="order-naam" className="block font-sans text-sm font-medium text-text">
                    Naam *
                  </label>
                  <input
                    type="text"
                    id="order-naam"
                    name="naam"
                    required
                    className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label htmlFor="order-email" className="block font-sans text-sm font-medium text-text">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="order-email"
                    name="email"
                    required
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
                    type="tel"
                    id="order-telefoon"
                    name="telefoon"
                    className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label htmlFor="order-adres" className="block font-sans text-sm font-medium text-text">
                    Adres (voor verzending)
                  </label>
                  <input
                    type="text"
                    id="order-adres"
                    name="adres"
                    placeholder="Straat, huisnr, postcode, plaats"
                    className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
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
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-sm bg-gold px-6 py-3 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light disabled:opacity-50"
              >
                {status === "loading" ? "Verzenden..." : `Bestelling plaatsen — ${prijs}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
