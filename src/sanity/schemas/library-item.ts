import { defineField, defineType } from "sanity";

export const libraryItem = defineType({
  name: "libraryItem",
  title: "Boekenarchief Item",
  type: "document",
  fields: [
    defineField({
      name: "bookNumber",
      title: "Boeknummer",
      type: "string",
      description: "Uniek catalogusnummer, bijv. AC001, LH042",
      validation: (rule) => rule.required(),
    }),
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
      title: "Rubriek",
      type: "string",
      options: {
        list: [
          { title: "Archeologie", value: "archeologie" },
          { title: "Archieven", value: "archieven" },
          { title: "Dialecten", value: "dialecten" },
          { title: "Eygelshoven/Kerkrade Gemeente", value: "eygelshoven-gemeente" },
          { title: "Eygelshoven Historie", value: "eygelshoven-historie" },
          { title: "Eygelshoven Parochies", value: "eygelshoven-parochies" },
          { title: "Eygelshoven Verenigingen", value: "eygelshoven-verenigingen" },
          { title: "Godsdienst", value: "godsdienst" },
          { title: "Genealogie", value: "genealogie" },
          { title: "Hopel", value: "hopel" },
          { title: "Limburg Historie", value: "limburg-historie" },
          { title: "Mijnbouw Algemeen", value: "mijnbouw-algemeen" },
          { title: "Mijnbouw Laura & Vereeniging", value: "mijnbouw-laura-vereeniging" },
          { title: "Oorlog", value: "oorlog" },
          { title: "Onderwijs", value: "onderwijs" },
          { title: "Paleografie", value: "paleografie" },
          { title: "Regio Historie", value: "regio-historie" },
          { title: "Diverse onderwerpen", value: "diverse" },
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
  orderings: [
    {
      title: "Boeknummer",
      name: "bookNumberAsc",
      by: [{ field: "bookNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      bookNumber: "bookNumber",
      author: "author",
      media: "coverImage",
    },
    prepare({ title, bookNumber, author, media }) {
      return {
        title: `${bookNumber || "?"} — ${title}`,
        subtitle: author,
        media,
      };
    },
  },
});
