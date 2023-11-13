import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://onceuponanipsum.dev",
  integrations: [astroImageTools, tailwind(), svelte()],
});
