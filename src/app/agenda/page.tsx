import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { allEventsQuery } from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import { PageHeading } from "@/components/PageHeading";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Agenda",
};

export const revalidate = 60;

export default async function AgendaPage() {
  const events = await client.fetch(allEventsQuery).catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeading title="Agenda" />

      {events.length === 0 && (
        <p className="font-serif text-text-light">
          Er staan momenteel geen evenementen gepland.
        </p>
      )}

      <div className="space-y-4">
        {events.map(
          (event: {
            _id: string;
            title: string;
            date: string;
            endDate?: string;
            location?: string;
            description?: Parameters<typeof PortableText>[0]["value"];
          }) => {
            const startDate = new Date(event.date);
            return (
              <article
                key={event._id}
                className="flex gap-5 rounded-sm border border-border bg-white p-5 transition-colors hover:border-gold sm:p-6"
              >
                {/* Date badge — matches homepage style */}
                <time
                  dateTime={event.date}
                  className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-sm border border-gold/30 bg-cream-dark"
                >
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-light">
                    {startDate.toLocaleDateString("nl-NL", {
                      month: "short",
                    })}
                  </span>
                  <span className="font-serif text-2xl font-bold leading-none text-primary-dark">
                    {startDate.getDate()}
                  </span>
                </time>

                <div className="flex-1 min-w-0">
                  <h2 className="font-serif text-lg font-semibold text-text sm:text-xl">
                    {event.title}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-3 font-serif text-sm text-text-light">
                    <span>
                      {startDate.toLocaleDateString("nl-NL", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin
                          className="h-3.5 w-3.5 flex-shrink-0 text-gold"
                          aria-hidden="true"
                        />
                        {event.location}
                      </span>
                    )}
                  </div>
                  {event.description && (
                    <div className="mt-3">
                      <PortableText value={event.description} />
                    </div>
                  )}
                </div>
              </article>
            );
          },
        )}
      </div>
    </div>
  );
}
