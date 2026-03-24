import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Instellingen",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Titel",
      type: "string",
      initialValue: "Stichting Eygelshoven door de Eeuwen Heen",
    }),
    defineField({
      name: "description",
      title: "Site Beschrijving",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo / Wapenschild",
      type: "image",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact E-mail",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Telefoonnummer",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImages",
      title: "Hero Carousel Afbeeldingen",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Beschrijving",
              type: "string",
            }),
          ],
        },
      ],
      description: "Sfeerbeelden die op de homepagina als carousel worden getoond.",
    }),
    defineField({
      name: "archiveRequestInfo",
      title: "Archief Aanvraag Informatie",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Tekst die wordt getoond op de archief aanvraag pagina (uitleg over het proces)",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Instellingen" };
    },
  },
});
