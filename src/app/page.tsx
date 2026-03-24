import Link from "next/link";
import { client } from "@/sanity/client";
import { allNewsQuery, allEventsQuery } from "@/sanity/lib/queries";
import { BookOpen, Calendar, Archive, Users, MapPin } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";

export const revalidate = 60;

/* ------------------------------------------------------------------ */
/*  Reusable section heading with gold ornamental rule                */
/* ------------------------------------------------------------------ */
function SectionHeading({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-end justify-between">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-primary-dark sm:text-3xl">
          {title}
        </h2>
        {href && linkLabel && (
          <Link
            href={href}
            className="hidden font-serif text-sm text-primary transition-colors hover:text-gold sm:block"
          >
            {linkLabel}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        )}
      </div>
      {/* Gold ornamental rule */}
      <div className="mt-3 flex items-center gap-3">
        <div className="h-0.5 w-12 bg-gold" />
        <div className="h-0.5 w-3 bg-gold/40" />
      </div>
      {/* Mobile-only link below the rule */}
      {href && linkLabel && (
        <Link
          href={href}
          className="mt-3 inline-block font-serif text-sm text-primary transition-colors hover:text-gold sm:hidden"
        >
          {linkLabel}
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default async function HomePage() {
  const [news, events] = await Promise.all([
    client.fetch(allNewsQuery).catch(() => []),
    client.fetch(allEventsQuery).catch(() => []),
  ]);

  const latestNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO — Carousel with historical sfeerbeelden                */}
      {/* ============================================================ */}
      <HeroCarousel />

      {/* ============================================================ */}
      {/*  FEATURES — Four pillars of the foundation                   */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group relative overflow-hidden rounded-sm border border-border bg-white p-6 transition-all hover:border-gold hover:shadow-md"
              >
                {/* Top gold accent line */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gold opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-cream-dark">
                  <feature.icon
                    className="h-5 w-5 text-gold"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-primary-dark transition-colors group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="font-serif text-sm leading-relaxed text-text-light">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LATEST NEWS                                                 */}
      {/* ============================================================ */}
      {latestNews.length > 0 && (
        <section className="border-t border-border bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Laatste Nieuws"
              href="/nieuws"
              linkLabel="Alle nieuwsberichten"
            />

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
                    className="group flex flex-col rounded-sm border border-border bg-cream p-6 transition-all hover:border-gold hover:shadow-md"
                  >
                    <time
                      dateTime={item.publishedAt}
                      className="font-sans text-xs font-medium uppercase tracking-wider text-text-light"
                    >
                      {new Date(item.publishedAt).toLocaleDateString("nl-NL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-text transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="mt-2 flex-1 font-serif text-sm leading-relaxed text-text-light line-clamp-3">
                        {item.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-block font-serif text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Lees meer &rarr;
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  UPCOMING EVENTS                                             */}
      {/* ============================================================ */}
      {upcomingEvents.length > 0 && (
        <section className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Agenda"
              href="/agenda"
              linkLabel="Volledige agenda"
            />

            <div className="space-y-3">
              {upcomingEvents.map(
                (item: {
                  _id: string;
                  title: string;
                  date: string;
                  location: string;
                }) => (
                  <article
                    key={item._id}
                    className="flex items-center gap-5 rounded-sm border border-border bg-white p-4 transition-colors hover:border-gold sm:p-5"
                  >
                    {/* Date badge */}
                    <time
                      dateTime={item.date}
                      className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-sm border border-gold/30 bg-cream-dark"
                    >
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                        {new Date(item.date).toLocaleDateString("nl-NL", {
                          month: "short",
                        })}
                      </span>
                      <span className="font-serif text-2xl font-bold leading-none text-primary-dark">
                        {new Date(item.date).getDate()}
                      </span>
                    </time>

                    <div className="min-w-0">
                      <h3 className="font-serif text-base font-semibold text-text sm:text-lg">
                        {item.title}
                      </h3>
                      {item.location && (
                        <p className="mt-0.5 flex items-center gap-1.5 font-serif text-sm text-text-light">
                          <MapPin
                            className="h-3.5 w-3.5 flex-shrink-0 text-gold"
                            aria-hidden="true"
                          />
                          {item.location}
                        </p>
                      )}
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  CTA — Archief                                               */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-primary-dark py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          {/* Ornamental top accent */}
          <div className="mx-auto mb-8 flex items-center justify-center gap-2">
            <span className="block h-px w-10 bg-gold/40" />
            <span className="block h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="block h-px w-10 bg-gold/40" />
          </div>

          <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
            Onderzoek de geschiedenis van Eygelshoven
          </h2>
          <p className="mt-4 font-serif text-base leading-relaxed text-white/70 sm:text-lg">
            Ons archief is op aanvraag toegankelijk. Heeft u vragen over de
            geschiedenis van Eygelshoven of wilt u stukken inzien? Neem contact
            met ons op.
          </p>
          <Link
            href="/archief-aanvraag"
            className="mt-8 inline-block rounded-sm border-2 border-gold bg-gold px-7 py-3 font-serif text-sm font-semibold tracking-wide text-primary-dark transition-colors hover:bg-gold-light hover:border-gold-light"
          >
            Archief Aanvragen
          </Link>
        </div>
      </section>
    </>
  );
}
