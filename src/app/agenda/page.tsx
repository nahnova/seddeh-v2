import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { allEventsQuery } from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";

export const metadata: Metadata = {
  title: "Agenda",
};

export const revalidate = 60;

export default async function AgendaPage() {
  const events = await client.fetch(allEventsQuery).catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-primary-dark sm:text-4xl">
        Agenda
      </h1>
      <div className="mt-2 h-1 w-16 bg-gold" />

      {events.length === 0 && (
        <p className="mt-8 font-serif text-text-light">
          Er staan momenteel geen evenementen gepland.
        </p>
      )}

      <div className="mt-8 space-y-6">
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
              <div
                key={event._id}
                className="flex gap-6 rounded-lg border border-border bg-white p-6"
              >
                <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-primary-dark text-white">
                  <span className="font-sans text-xs uppercase">
                    {startDate.toLocaleDateString("nl-NL", { month: "short" })}
                  </span>
                  <span className="font-serif text-2xl font-bold">
                    {startDate.getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-xl font-semibold text-text">
                    {event.title}
                  </h2>
                  <div className="mt-1 flex flex-wrap gap-3 font-sans text-sm text-text-light">
                    <span>
                      {startDate.toLocaleDateString("nl-NL", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {event.location && <span>| {event.location}</span>}
                  </div>
                  {event.description && (
                    <div className="mt-3">
                      <PortableText value={event.description} />
                    </div>
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
