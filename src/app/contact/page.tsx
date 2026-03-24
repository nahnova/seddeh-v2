import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { PageHeading } from "@/components/PageHeading";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone, Clock, Gift, Archive } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeading title="Contact" />

      <div className="grid gap-10 lg:grid-cols-5">
        {/* ── Left: Contact form ─────────────────────── */}
        <div className="lg:col-span-3">
          <div className="rounded-sm border border-border bg-white p-6 sm:p-8">
            <h2 className="font-serif text-xl font-semibold text-primary-dark">
              Stuur ons een bericht
            </h2>
            <p className="mt-2 mb-6 font-serif text-sm text-text-light">
              Heeft u een vraag over onze stichting, het archief of onze
              activiteiten? Vul het formulier in en wij reageren zo snel mogelijk.
            </p>
            <ContactForm />
          </div>
        </div>

        {/* ── Right: Info sidebar ────────────────────── */}
        <div className="space-y-6 lg:col-span-2">
          {/* Contact details */}
          <div className="rounded-sm border border-border bg-white p-6">
            <h2 className="mb-5 font-serif text-lg font-semibold text-primary-dark">
              Contactgegevens
            </h2>

            <div className="space-y-4">
              {settings?.address && (
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                      Adres
                    </h3>
                    <p className="mt-0.5 whitespace-pre-line font-serif text-sm text-text">
                      {settings.address}
                    </p>
                  </div>
                </div>
              )}

              {settings?.contactEmail && (
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                      E-mail
                    </h3>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="mt-0.5 inline-block font-serif text-sm text-primary transition-colors hover:text-gold"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>
              )}

              {settings?.contactPhone && (
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                      Telefoon
                    </h3>
                    <a
                      href={`tel:${settings.contactPhone}`}
                      className="mt-0.5 inline-block font-serif text-sm text-primary transition-colors hover:text-gold"
                    >
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <div>
                  <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                    Openingstijden
                  </h3>
                  <p className="mt-0.5 font-serif text-sm text-text">
                    Maandag: 10:00 – 12:00 &amp; 19:30 – 21:30
                  </p>
                  <p className="font-serif text-sm text-text">
                    Donderdag: 10:00 – 12:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <Link
              href="/archief-aanvraag"
              className="flex items-center gap-3 rounded-sm border border-border bg-white p-4 transition-all hover:border-gold hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-cream-dark">
                <Archive className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-text">
                  Archief aanvragen
                </h3>
                <p className="font-serif text-xs text-text-light">
                  Vraag toegang aan tot ons historisch archief
                </p>
              </div>
            </Link>

            <Link
              href="/contact/schenking"
              className="flex items-center gap-3 rounded-sm border border-border bg-white p-4 transition-all hover:border-gold hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-cream-dark">
                <Gift className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-text">
                  Schenking doen
                </h3>
                <p className="font-serif text-xs text-text-light">
                  Steun de stichting met een bijdrage
                </p>
              </div>
            </Link>
          </div>

          {/* Map embed */}
          <div className="overflow-hidden rounded-sm border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.8!2d6.0478!3d50.8972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c09917b0a0f5a7%3A0x8c0a2e0d9c6c5a0a!2sPutstraat%2017%2C%206471%20GB%20Eygelshoven!5e0!3m2!1snl!2snl!4v1"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locatie De Laethof, Putstraat 17, Eygelshoven"
              className="grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
