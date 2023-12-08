import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
import rehypeExternalLinks from "rehype-external-links";
import { remarkReadingTime } from "./integrations/remark-reading-time.mjs";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

// TODO: ⏬ Build custom  Astro Expressive Code theme

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const expressiveCodeOptions = {
  themes: ["one-dark-pro"],
};

// https://astro.build/config
export default defineConfig({
  site: "https://onceuponanipsum.dev",
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["external", "noopener"],
        },
      ],
    ],
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    astroImageTools,
    tailwind(),
    expressiveCode(expressiveCodeOptions),
    mdx(),
    svelte(),
  ],
});
