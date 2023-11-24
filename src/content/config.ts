import { z, defineCollection } from "astro:content";

const articlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string() || z.undefined(),
    author: z.string(),
    image:
      z.object({
        src: z.string(),
        alt: z.string(),
      }) || z.undefined(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  articles: articlesCollection,
};
