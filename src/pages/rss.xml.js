import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
  return rss({
    title: "Once Upon an Ipsum",
    description:
      "Hi, I'm Mike Ambrozaitis and I author Once Upon an Ipsum, a blog about web development, design, and other things I find interesting.",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
    customData: `<language>en-us</language>`,
  });
}
