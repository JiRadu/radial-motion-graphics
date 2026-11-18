// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static site: every page is pre-rendered to plain HTML at build time.
export default defineConfig({
  site: "https://radialcons.ro",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      i18n: {
        defaultLocale: "ro",
        locales: { ro: "ro-RO", en: "en-US" },
      },
    }),
  ],
});
