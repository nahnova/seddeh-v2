import { defineField, defineType } from "sanity";

export const kennisbankLink = defineType({
  name: "kennisbankLink",
  title: "Kennisbank Link",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "reference",
      to: [{ type: "kennisbankCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Uitgelicht",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "url", category: "category.name" },
    prepare({ title, subtitle, category }) {
      return {
        title,
        subtitle: `${category || "Geen categorie"} — ${subtitle}`,
      };
    },
  },
});
