import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Evenement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Datum",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Einddatum",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Locatie",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Datum (opkomend)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", media: "image" },
    prepare({ title, date, media }) {
      return {
        title,
        media,
        subtitle: date
          ? new Date(date).toLocaleDateString("nl-NL")
          : "Geen datum",
      };
    },
  },
});
