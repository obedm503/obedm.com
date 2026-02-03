import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { remarkMermaid } from "./remark-mermaid.js";
import { remarkReadingTime } from "./remark-reading-time.js";

// https://astro.build/config
export default defineConfig({
  site: "https://obedm.com",
  markdown: {
    remarkPlugins: [remarkMermaid, remarkReadingTime],
  },
  integrations: [solid(), sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
