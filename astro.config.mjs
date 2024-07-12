import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// import node from "@astrojs/node";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()]

  // output: "hybrid",
  // adapter: node({
  //   mode: "standalone"
  // })
  ,
  output: "hybrid",
  adapter: cloudflare()
});