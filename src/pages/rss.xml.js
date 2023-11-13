import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

// TODO: Include projects in the RSS feed

export async function GET(context) {
  const articlesCollection = await getCollection("articles");

  return rss({
    title: "Once Upon an Ipsum",
    description:
      "Hi, I'm Mike Ambrozaitis and I author Once Upon an Ipsum, a blog about web development, design, and other things I find interesting.",
    site: context.site,
    items: articlesCollection.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: `/articles/${article.data.slug}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
