import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { allNewsQuery, allEventsQuery } from "@/sanity/lib/queries";
import { BookOpen, Calendar, Archive, Users } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [news, events] = await Promise.all([
    client.fetch(allNewsQuery).catch(() => []),
    client.fetch(allEventsQuery).catch(() => []),
  ]);

  const latestNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark py-20 text-white">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Image
            src="/wapen.png"
            alt="Wapen van Eygelshoven"
            width={80}
            height={96}
            className="mx-auto mb-6 h-24 w-auto drop-shadow-lg"
            priority
          />
          <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Eygelshoven
            <br />
            <span className="text-gold">door de Eeuwen Heen</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-white/80">
            Wij verzamelen, bewaren en ontsluiten de rijke historie van
            Eygelshoven. Opgericht in 1981 ter gelegenheid van het 850-jarig
            bestaan van ons dorp.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/de-stichting"
              className="rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-primary-dark transition-colors hover:bg-gold-light"
            >
              Ontdek onze geschiedenis
            </Link>
            <Link
              href="/archief-aanvraag"
              className="rounded-md border border-white/30 px-6 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Archief aanvragen
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              title: "Kennisbank",
              description:
                "Ontdek een uitgebreide verzameling links naar genealogische en historische bronnen.",
              href: "/kennisbank",
            },
            {
              icon: Archive,
              title: "Archief",
              description:
                "Vraag toegang aan tot ons uitgebreide archief over de geschiedenis van Eygelshoven.",
              href: "/archief-aanvraag",
            },
            {
              icon: Calendar,
              title: "Evenementen",
              description:
                "Bekijk onze agenda met lezingen, rondleidingen en andere activiteiten.",
              href: "/agenda",
            },
            {
              icon: Users,
              title: "Werkgroepen",
              description:
                "Maak kennis met onze werkgroepen die zich inzetten voor het behoud van ons erfgoed.",
              href: "/werkgroepen",
            },
          ].map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group rounded-lg border border-border bg-white p-6 transition-all hover:border-gold hover:shadow-md"
            >
              <feature.icon className="mb-3 h-8 w-8 text-gold" />
              <h3 className="mb-2 font-serif text-lg font-semibold text-primary-dark group-hover:text-primary">
                {feature.title}
              </h3>
              <p className="font-serif text-sm leading-relaxed text-text-light">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="border-t border-border bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-serif text-2xl font-bold text-primary-dark">
                Laatste Nieuws
              </h2>
              <Link
                href="/nieuws"
                className="font-sans text-sm text-primary hover:text-primary-dark"
              >
                Bekijk alles &rarr;
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestNews.map(
                (item: {
                  _id: string;
                  title: string;
                  slug: { current: string };
                  publishedAt: string;
                  excerpt: string;
                }) => (
                  <Link
                    key={item._id}
                    href={`/nieuws/${item.slug.current}`}
                    className="group rounded-lg border border-border bg-cream p-6 transition-all hover:border-gold hover:shadow-md"
                  >
                    <time className="font-sans text-xs text-text-light">
                      {new Date(item.publishedAt).toLocaleDateString("nl-NL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="mt-2 font-serif text-lg font-semibold text-text group-hover:text-primary">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="mt-2 font-serif text-sm leading-relaxed text-text-light line-clamp-3">
                        {item.excerpt}
                      </p>
                    )}
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-serif text-2xl font-bold text-primary-dark">
                Agenda
              </h2>
              <Link
                href="/agenda"
                className="font-sans text-sm text-primary hover:text-primary-dark"
              >
                Volledige agenda &rarr;
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map(
                (item: {
                  _id: string;
                  title: string;
                  date: string;
                  location: string;
                }) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-6 rounded-lg border border-border bg-white p-4"
                  >
                    <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-md bg-primary-dark text-white">
                      <span className="font-sans text-xs uppercase">
                        {new Date(item.date).toLocaleDateString("nl-NL", {
                          month: "short",
                        })}
                      </span>
                      <span className="font-serif text-lg font-bold">
                        {new Date(item.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-text">
                        {item.title}
                      </h3>
                      {item.location && (
                        <p className="font-sans text-sm text-text-light">
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-bold">
            Onderzoek de geschiedenis van Eygelshoven
          </h2>
          <p className="mt-4 font-serif text-white/70">
            Ons archief is op aanvraag toegankelijk. Heeft u vragen over de
            geschiedenis van Eygelshoven of wilt u stukken inzien? Neem contact
            met ons op.
          </p>
          <Link
            href="/archief-aanvraag"
            className="mt-6 inline-block rounded-md bg-gold px-6 py-3 font-sans text-sm font-medium text-primary-dark transition-colors hover:bg-gold-light"
          >
            Archief Aanvragen
          </Link>
        </div>
      </section>
    </>
  );
}
