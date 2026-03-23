"use client";

import { useState } from "react";

export function LidWordenForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
      motivatie: formData.get("motivatie") as string,
    };

    try {
      const response = await fetch("/api/lid-worden", {
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
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-sm border border-green-200 bg-green-50 p-6"
      >
        <h3 className="font-serif text-lg font-semibold text-green-800">
          Aanmelding ontvangen
        </h3>
        <p className="mt-2 font-serif text-sm text-green-700">
          Bedankt voor uw interesse! Wij nemen spoedig contact met u op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="naam"
            className="block font-sans text-sm font-medium text-text"
          >
            Naam *
          </label>
          <input
            type="text"
            id="naam"
            name="naam"
            required
            aria-required="true"
            className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block font-sans text-sm font-medium text-text"
          >
            E-mailadres *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-required="true"
            className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="telefoon"
            className="block font-sans text-sm font-medium text-text"
          >
            Telefoonnummer
          </label>
          <input
            type="tel"
            id="telefoon"
            name="telefoon"
            className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>
        <div>
          <label
            htmlFor="adres"
            className="block font-sans text-sm font-medium text-text"
          >
            Adres
          </label>
          <input
            type="text"
            id="adres"
            name="adres"
            placeholder="Straat, huisnr, postcode, plaats"
            className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="motivatie"
          className="block font-sans text-sm font-medium text-text"
        >
          Waarom wilt u medewerker worden?
        </label>
        <textarea
          id="motivatie"
          name="motivatie"
          rows={4}
          placeholder="Vertel ons wat u motiveert om medewerker te worden..."
          className="mt-1 block w-full rounded-sm border border-border bg-white px-3 py-2 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-gold focus:ring-1 focus:ring-gold"
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-sm border border-red-200 bg-red-50 p-3"
        >
          <p className="font-serif text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="rounded-sm bg-gold px-6 py-3 font-serif text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-light disabled:opacity-50"
      >
        {status === "loading" ? "Verzenden..." : "Aanmelding Versturen"}
      </button>
    </form>
  );
}
