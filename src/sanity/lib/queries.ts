import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  heroImage,
  body,
  seoDescription
}`;

export const allPagesQuery = groq`*[_type == "page"]{
  title,
  slug
}`;

export const allNewsQuery = groq`*[_type == "news"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage
}`;

export const newsBySlugQuery = groq`*[_type == "news" && slug.current == $slug][0]{
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  body
}`;

export const allWerkgroepenQuery = groq`*[_type == "werkgroep"]{
  _id,
  name,
  slug,
  description,
  image,
  members
}`;

export const allGalleriesQuery = groq`*[_type == "gallery"]{
  _id,
  title,
  slug,
  description,
  coverImage,
  "imageCount": count(images)
}`;

export const galleryBySlugQuery = groq`*[_type == "gallery" && slug.current == $slug][0]{
  title,
  slug,
  description,
  images
}`;

export const allEventsQuery = groq`*[_type == "event" && date >= now()] | order(date asc){
  _id,
  title,
  date,
  endDate,
  location,
  description,
  image
}`;

export const allKennisbankLinksQuery = groq`*[_type == "kennisbankLink"]{
  _id,
  title,
  url,
  description,
  featured,
  category->{
    _id,
    name,
    slug,
    description,
    order
  }
}`;

export const allKennisbankCategoriesQuery = groq`*[_type == "kennisbankCategory"] | order(order asc){
  _id,
  name,
  slug,
  description,
  order
}`;

export const allBoardMembersQuery = groq`*[_type == "boardMember"] | order(order asc){
  _id,
  name,
  role,
  photo
}`;

export const allMonumentsQuery = groq`*[_type == "monument"]{
  _id,
  name,
  slug,
  description,
  image,
  location,
  year
}`;

export const allMembersQuery = groq`*[_type == "member"] | order(order asc){
  _id,
  name,
  role,
  bio,
  photo
}`;

export const allPublicationsQuery = groq`*[_type == "publication"]{
  _id,
  title,
  author,
  year,
  description,
  coverImage,
  file
}`;
