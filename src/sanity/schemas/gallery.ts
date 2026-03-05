import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Galerij Afbeelding",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt tekst",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Bijschrift",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Jaar",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Zonder titel", media };
    },
  },
});

export const gallery = defineType({
  name: "gallery",
  title: "Galerij",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Afbeelding",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Afbeeldingen",
      type: "array",
      of: [{ type: "galleryImage" }],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});
