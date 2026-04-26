import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Pagina",
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
      name: "showInNavigation",
      title: "Tonen in navigatie",
      description:
        "Als dit aanstaat verschijnt de pagina in het 'De Stichting' menu en op het overzicht.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Volgorde in navigatie",
      description:
        "Lager nummer = eerder in het menu. Pagina's zonder volgorde komen alfabetisch achteraan.",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Korte omschrijving",
      description:
        "Wordt getoond op de overzichtspagina van 'De Stichting' onder de titel.",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Afbeelding",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Inhoud",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt tekst",
              type: "string",
            },
            {
              name: "caption",
              title: "Bijschrift",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Beschrijving",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
