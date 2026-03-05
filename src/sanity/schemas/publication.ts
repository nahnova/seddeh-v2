import { defineField, defineType } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publicatie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Jaar",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Omslagafbeelding",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "file",
      title: "Bestand (PDF)",
      type: "file",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "author", media: "coverImage" },
  },
});
