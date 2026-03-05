import { defineField, defineType } from "sanity";

export const monument = defineType({
  name: "monument",
  title: "Monument",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
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
    defineField({
      name: "location",
      title: "Locatie",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Jaar",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
