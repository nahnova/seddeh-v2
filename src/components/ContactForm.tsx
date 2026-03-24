"use client";

import { useState } from "react";

export function ContactForm() {
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
      onderwerp: formData.get("onderwerp") as string,
      bericht: formData.get("bericht") as string,
      website: formData.get("website") as string,
    };

    try {
      const response = await fetch("/api/contact", {
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

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-sm border border-green-200 bg-green-50 p-6">
        <h3 className="font-serif text-lg font-semibold text-green-800">Bericht verzonden</h3>
        <p className="mt-2 font-serif text-sm text-green-700">
          Bedankt voor uw bericht! Wij nemen zo spoedig mogelijk contact met u op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-naam" className="block font-sans text-sm font-medium text-text">
            Naam *
          </label>
          <input
            type="text"
            id="contact-naam"
            name="naam"
            required
            aria-required="true"
            className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2.5 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block font-sans text-sm font-medium text-text">
            E-mailadres *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            aria-required="true"
            className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2.5 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-onderwerp" className="block font-sans text-sm font-medium text-text">
          Onderwerp
        </label>
        <input
          type="text"
          id="contact-onderwerp"
          name="onderwerp"
          placeholder="Waar gaat uw vraag over?"
          className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2.5 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-gold focus:ring-1 focus:ring-gold"
        />
      </div>

      <div>
        <label htmlFor="contact-bericht" className="block font-sans text-sm font-medium text-text">
          Bericht *
        </label>
        <textarea
          id="contact-bericht"
          name="bericht"
          rows={5}
          required
          aria-required="true"
          placeholder="Stel uw vraag of laat een bericht achter..."
          className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2.5 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-gold focus:ring-1 focus:ring-gold"
        />
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div role="alert" aria-live="assertive" className="rounded-sm border border-red-200 bg-red-50 p-3">
          <p className="font-serif text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="rounded-sm bg-gold px-6 py-3 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light disabled:opacity-50"
      >
        {status === "loading" ? "Verzenden..." : "Bericht versturen"}
      </button>
    </form>
  );
}
