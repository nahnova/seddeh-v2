import { defineField, defineType } from "sanity";

export const libraryItem = defineType({
  name: "libraryItem",
  title: "Bibliotheek Item",
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
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Heemkunde", value: "heemkunde" },
          { title: "Genealogie", value: "genealogie" },
          { title: "Mijngeschiedenis", value: "mijngeschiedenis" },
          { title: "Dialect", value: "dialect" },
          { title: "Religie", value: "religie" },
          { title: "Overig", value: "overig" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isbn",
      title: "ISBN",
      type: "string",
    }),
    defineField({
      name: "format",
      title: "Formaat",
      type: "string",
      description: "Bijv. Hardcover, Paperback, A4",
    }),
    defineField({
      name: "coverImage",
      title: "Omslagafbeelding",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "author", media: "coverImage" },
  },
});
