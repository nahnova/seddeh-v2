"use client";

import { useState } from "react";

export function ArchiefAanvraagForm() {
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
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      description: formData.get("description") as string,
      preferredDate: formData.get("preferredDate") as string,
    };

    try {
      const response = await fetch("/api/archief-aanvraag", {
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
      <div role="status" aria-live="polite" className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h3 className="font-serif text-lg font-semibold text-green-800">
          Aanvraag verzonden
        </h3>
        <p className="mt-2 font-serif text-sm text-green-700">
          Bedankt voor uw aanvraag. Wij nemen zo spoedig mogelijk contact met
          u op om een afspraak in te plannen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block font-sans text-sm font-medium text-text"
          >
            Naam *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            aria-required="true"
            className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
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
            className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="block font-sans text-sm font-medium text-text"
          >
            Telefoonnummer
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label
            htmlFor="preferredDate"
            className="block font-sans text-sm font-medium text-text"
          >
            Voorkeursdatum bezoek
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 font-serif text-text shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block font-sans text-sm font-medium text-text"
        >
          Onderwerp van onderzoek *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          aria-required="true"
          placeholder="Bijv. familiegeschiedenis, kadaster, specifieke periode..."
          className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block font-sans text-sm font-medium text-text"
        >
          Beschrijving van uw aanvraag *
        </label>
        <textarea
          id="description"
          name="description"
          required
          aria-required="true"
          rows={5}
          placeholder="Beschrijf zo specifiek mogelijk welke stukken of informatie u zoekt..."
          className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 font-serif text-text shadow-sm placeholder:text-text-light/50 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {status === "error" && (
        <div role="alert" aria-live="assertive" className="rounded-md border border-red-200 bg-red-50 p-3">
          <p className="font-serif text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="rounded-md bg-primary px-6 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
      >
        {status === "loading" ? "Verzenden..." : "Aanvraag Indienen"}
      </button>
    </form>
  );
}
