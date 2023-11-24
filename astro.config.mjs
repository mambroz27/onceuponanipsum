import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://onceuponanipsum.dev",
  integrations: [astroImageTools, tailwind(), svelte(), mdx()],
});

// TODO: Add a custom 404 page
// TODO: Add Expessive Code
